__author__ = 'Roly'
# -*- coding: utf8 -*-
from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin

import models


class AdminCategories(admin.ModelAdmin):
    pass


class AdminMainLine(admin.ModelAdmin):
    pass


class AdminSubLine(admin.ModelAdmin):
    pass


class AdminProducts(admin.ModelAdmin, AdminImageMixin):
    filter_horizontal = ('suppliers', 'clients')
    fields = ['en_name', 'es_name', 'en_description', 'es_description', 'sort_order', 'image', 'url', 'category', 'suppliers', 'clients']
    list_display = ['en_name']


class AdminSupplier(admin.ModelAdmin, AdminImageMixin):
    pass


class AdminClient(admin.ModelAdmin, AdminImageMixin):
    list_display = ['en_name', 'es_name']


admin.site.register(models.Categories, AdminCategories)
admin.site.register(models.Client, AdminClient)
admin.site.register(models.Supplier, AdminSupplier)
admin.site.register(models.MainLines, AdminMainLine)
admin.site.register(models.SubLines, AdminSubLine)
admin.site.register(models.Products, AdminProducts)
