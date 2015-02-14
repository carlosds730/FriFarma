# -*- coding: utf8 -*-

from django.db import models
from sorl.thumbnail import ImageField

import stopwords


class MainLines(models.Model):
    class Meta:
        verbose_name = 'Main'
        verbose_name_plural = 'Main'
        ordering = ['sort_order']

    en_name = models.CharField(verbose_name='English name', max_length=50)

    es_name = models.CharField(verbose_name='Spanish name', max_length=50)

    sort_order = models.PositiveIntegerField(verbose_name='Sort order', help_text='Number that represents priority')

    def __unicode__(self, language='en'):
        if language == 'es':
            return self.es_name
        return self.en_name


class Categories(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['sort_order']

    en_name = models.CharField(verbose_name='English name', max_length=50)

    es_name = models.CharField(verbose_name='Spanish name', max_length=50)

    sort_order = models.PositiveIntegerField(verbose_name='Sort order', help_text='Number represents priority')

    sub_line = models.ForeignKey('MainLines', verbose_name='Main Line', related_name='categories',
                                 help_text='sub line that belong a category')

    parent = models.ForeignKey('Categories', verbose_name='parent', related_name='Sons', help_text='Category father')

    def __unicode__(self, language='en'):
        if language == 'es':
            return self.es_name
        return self.en_name


class Supplier(models.Model):
    class Meta:
        verbose_name = 'Supplier'
        verbose_name_plural = 'Suppliers'

    en_name = models.CharField(verbose_name='English name', unique=True, max_length=100)

    es_name = models.CharField(verbose_name='Spanish name', unique=True, max_length=100)

    url = models.URLField(verbose_name='url', blank=True)

    image = models.ImageField(verbose_name='Image', upload_to='media', blank=True)


class Client(models.Model):
    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'
        ordering = ['sort_order']

    en_name = models.CharField(verbose_name='English name', db_index=True, unique=True, null=True, blank=True, max_length=100)

    es_name = models.CharField(verbose_name='Spanish name', db_index=True, unique=True,
                               null=True, blank=True, max_length=100)

    sort_order = models.IntegerField(verbose_name='Sort Order', blank=True, null=True, help_text="Number that represent priority")

    telephone = models.CharField(verbose_name='Telephone', null=True, blank=True, max_length=50)

    address = models.CharField(verbose_name='Address', null=True, blank=True, max_length=200)

    image = ImageField(verbose_name='Image', upload_to='media', blank=True, null=True)

    url = models.URLField(verbose_name='Url', null=True, blank=True)


class Products(models.Model):
    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['sort_order']

    en_name = models.CharField(verbose_name='english name', db_index=True, max_length=50)

    _en_name = models.CharField(verbose_name='_english name', max_length=50)

    _es_name = models.CharField(verbose_name='_spanish name', max_length=50)

    es_name = models.CharField(verbose_name='spanish name', db_index=True, max_length=50)

    sort_order = models.PositiveIntegerField(verbose_name='Sort order', help_text='Number that represents priority')

    image = ImageField(verbose_name='Image', upload_to='media', blank=True)

    en_description = models.TextField(verbose_name='English description')

    _en_description = models.TextField(verbose_name='_English description')

    _es_description = models.TextField(verbose_name='_Spanish description')

    es_description = models.TextField(verbose_name='Spanish description')

    url = models.URLField(verbose_name='Url', blank=True)

    category = models.ForeignKey(Categories, verbose_name='Category', related_name='products',
                                 help_text='Category that belong a product', blank=True, null=True)

    suppliers = models.ManyToManyField(Supplier, verbose_name='Suppliers', blank=True, null=True, related_name='products', help_text='Products associated with suppliers')

    clients = models.ManyToManyField(Client, verbose_name='Clients', blank=True, null=True, related_name='products', help_text='Products associated with suppliers')

    def save(self, *args, **kwargs):
        tmp = stopwords.word_tokenize(self.en_description)
        self._en_description = stopwords.remove_stopwords(tmp, 'en')
        tmp = stopwords.word_tokenize(self.es_description)
        self._es_description = stopwords.remove_stopwords(tmp)
        tmp = stopwords.word_tokenize(self.en_name)
        self._en_name = stopwords.remove_stopwords(tmp, 'en')
        tmp = stopwords.word_tokenize(self.es_name)
        self._es_name = stopwords.remove_stopwords(tmp)
        super(Products, self).save(*args, **kwargs)

    def __unicode__(self, language='en'):
        if language == 'es':
            return self.es_name
        return self.en_name






