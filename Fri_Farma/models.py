# -*- coding: utf8 -*-

import datetime

from django.db import models
from sorl.thumbnail import ImageField

import stopwords


class Categories(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['sort_order']

    en_name = models.CharField(verbose_name='English name', max_length=50)

    es_name = models.CharField(verbose_name='Spanish name', max_length=50)

    sort_order = models.PositiveIntegerField(verbose_name='Sort order', blank=True, null=True, help_text='Number represents priority')

    parent = models.ForeignKey('Categories', verbose_name='parent', related_name='sons', help_text='Category father', null=True, blank=True)

    def __str__(self):
        if self.en_name:
            return self.en_name
        return self.es_name.encode(encoding='utf-8')


class Supplier(models.Model):
    class Meta:
        verbose_name = 'Supplier'
        verbose_name_plural = 'Suppliers'

    en_name = models.CharField(verbose_name='English name', max_length=100)

    es_name = models.CharField(verbose_name='Spanish name', max_length=100)

    url = models.URLField(verbose_name='url', blank=True)

    image = ImageField(verbose_name='Image', upload_to='media', blank=True)

    def __str__(self):
        if self.en_name:
            return self.en_name
        else:
            return self.es_name.encode(encoding='utf-8')


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

    image = ImageField(verbose_name='Image', upload_to='Products', blank=True)

    en_description = models.TextField(verbose_name='English description')

    _en_description = models.TextField(verbose_name='_English description')

    _es_description = models.TextField(verbose_name='_Spanish description')

    es_description = models.TextField(verbose_name='Spanish description')

    form = models.CharField(verbose_name='Method', max_length=50, help_text='Method used for products')

    principio_activo = models.CharField(verbose_name='Principio Activo', max_length=50)

    en_principio_activo = models.CharField(verbose_name='Principio Activo', max_length=50)

    accion_terapeutica = models.CharField(verbose_name='Accion Terapeutica', max_length=100)

    en_accion_terapeutica = models.CharField(verbose_name='Accion Terapeutica', max_length=100)

    concentracion = models.CharField(verbose_name='Concentracion', max_length=50)

    en_concentracion = models.CharField(verbose_name='Concentracion', max_length=50)

    presentacion = models.CharField(verbose_name='Presentacion', max_length=50)

    en_presentacion = models.CharField(verbose_name='Presentacion', max_length=50)

    url = models.URLField(verbose_name='Url', blank=True)

    category = models.ForeignKey('Categories', verbose_name='Category', related_name='products',
                                 help_text='Category that belong a product', blank=True, null=True)

    suppliers = models.ManyToManyField('Supplier', verbose_name='Suppliers', blank=True, null=True, related_name='products', help_text='Products associated with suppliers')

    # clients = models.ManyToManyField('Client', verbose_name='Clients', blank=True, null=True, related_name='products', help_text='Products associated with suppliers')

    develop_products = models.BooleanField(verbose_name='Develop Products', help_text='Tag used for mark develop products')

    def save(self, *args, **kwargs):
        self._en_description = stopwords.save_description(self.en_principio_activo, self.en_accion_terapeutica, self.en_presentacion, self.en_concentracion, self.form, 'en')
        self._es_description = stopwords.save_description(self.principio_activo, self.accion_terapeutica, self.presentacion, self.concentracion, self.form, 'es')
        tmp = stopwords.word_tokenize(self.en_name)
        self._en_name = stopwords.remove_stopwords(tmp, 'en')
        tmp = stopwords.word_tokenize(self.es_name)
        self._es_name = stopwords.remove_stopwords(tmp)
        super(Products, self).save(*args, **kwargs)
        import views

        views.collection_es = views.get_collection('es')
        views.collection_en = views.get_collection('en')

    def __str__(self):
        if self.en_name:
            return self.en_name
        return self.es_name.encode(encoding='utf-8')


languages = (('en', 'English'), ('es', 'Español'))


class News(models.Model):
    class Meta:
        verbose_name = "News"
        verbose_name_plural = 'News'
        ordering = ['date']

    title = models.CharField(verbose_name='Title', help_text='The title of the news', max_length=200)

    description = models.TextField(verbose_name='description', help_text='The body of news')

    date = models.DateField(verbose_name='Date', help_text='Date of news', default=datetime.datetime.now())

    language = models.CharField(choices=languages, name='Language', help_text='Language of news', max_length=20)

    def __str__(self):
        return self.title.encode(encoding='utf-8')


class Pictures(models.Model):
    class Meta:
        verbose_name = 'Picture'
        verbose_name_plural = 'Pictures'

    picture = ImageField(verbose_name='Picture', upload_to='Pictures')

    new = models.ForeignKey('News', verbose_name='notice', related_name='pictures', blank=True, null=True)







