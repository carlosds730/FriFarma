__author__ = 'Roly'
# -*- coding: utf8 -*-
from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin

import models


class PicturesInline(admin.TabularInline):
    model = models.Pictures


class AdminCategories(admin.ModelAdmin):
    list_display = ['es_name', 'en_name', 'parent']


class AdminNews(admin.ModelAdmin):
    inlines = [PicturesInline]
    list_display = ['title', 'date']


class AdminProducts(AdminImageMixin, admin.ModelAdmin):
    filter_horizontal = ('suppliers',)
    fields = ['en_name', 'es_name', 'en_description', 'es_description', 'sort_order', 'image', 'url', 'develop_products', 'category', 'suppliers']
    list_display = ['es_name', 'en_name', 'develop_products']


class AdminSupplier(AdminImageMixin, admin.ModelAdmin):
    pass


class AdminClient(AdminImageMixin, admin.ModelAdmin):
    list_display = ['en_name', 'es_name']


admin.site.register(models.Categories, AdminCategories)
admin.site.register(models.Client, AdminClient)
admin.site.register(models.Supplier, AdminSupplier)
admin.site.register(models.Products, AdminProducts)
admin.site.register(models.News, AdminNews)