__author__ = 'Roly'
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'FriFarma.settings'
from Fri_Farma import models
import csv


def fix(string):
    string = string.strip().decode('utf-8')
    string = u' '.join(string.split())
    return string


if __name__ == '__main__':
    with open('productos.csv') as f:
        excel = csv.reader(f)
        count = 1
        for rows in excel:
            tmp = [fix(x) for x in rows]
            name = tmp[1].split('(')
            tipo = name[1][:- 1]
            name = name[0]
            category = None
            sub_category = None
            if tmp[3]:
                parent, _ = models.Categories.objects.get_or_create(es_name=tmp[2])
                parent.save()
                category, _ = models.Categories.objects.get_or_create(es_name=tmp[3], parent=parent)
                supplier, _ = models.Supplier.objects.get_or_create(es_name=tmp[4])
                supplier.save()
                product = models.Products.objects.create(es_name=name, sort_order=count, form=tipo, category=category, principio_activo=tmp[5], accion_terapeutica=tmp[6], concentracion=tmp[7], presentacion=tmp[8])
                product.suppliers.add(supplier)
                product.save()
                category.save()
            elif tmp[2]:
                category, _ = models.Categories.objects.get_or_create(es_name=tmp[2])
                category.save()
                supplier, _ = models.Supplier.objects.get_or_create(es_name=tmp[4])
                supplier.save()
                product = models.Products.objects.create(es_name=name, sort_order=count, form=tipo, category=category, principio_activo=tmp[5], accion_terapeutica=tmp[6], concentracion=tmp[7], presentacion=tmp[8])
                product.suppliers.add(supplier)
                product.save()
            count += 100

