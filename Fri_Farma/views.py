# Create your views here.
# -*- coding: utf8 -*-
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.utils.datastructures import SortedDict

import models
import stopwords


def get_collection(language):
    collection = SortedDict()
    for category in models.Categories.objects.all():
        if not category.parent:
            if len(category.sons.all()):
                if language == 'en':
                    collection[(category.en_name, True, category.id)] = SortedDict()
                    for x in category.sons.all():
                        collection[(category.en_name, True, category.id)][x.en_name, x.id] = [(y.en_name, y.image, y.id) for y in x.products.all()]
                else:
                    collection[(category.es_name, True, category.id)] = SortedDict()
                    for x in category.sons.all():
                        collection[(category.es_name, True, category.id)][x.es_name, x.id] = [(y.es_name, y.image, y.id) for y in x.products.all()]
            else:
                if language == 'en':
                    collection[(category.en_name, False, category.id)] = [(x.en_name, x.image, x.id) for x in category.products.all()]
                else:
                    collection[(category.es_name, False, category.id)] = [(x.es_name, x.image, x.id) for x in category.products.all()]
    return collection


collection_en = get_collection('en')
collection_es = get_collection('es')


def main(request):
    if request.method == 'GET':
        try:
            language = request.GET['language']
            # collection = SortedDict()
            # for category in models.Categories.objects.all():
            # if not category.parent:
            # if len(category.sons.all()):
            # if language == 'en':
            # collection[(category.en_name, True, category.id)] = SortedDict()
            # for x in category.sons.all():
            # collection[(category.en_name, True, category.id)][x.en_name, x.id] = [(y.en_name, y.image, y.id) for y in x.products.all()]
            # else:
            # collection[(category.es_name, True, category.id)] = SortedDict()
            # for x in category.sons.all():
            # collection[(category.es_name, True, category.id)][x.es_name, x.id] = [(y.es_name, y.image, y.id) for y in x.products.all()]
            # else:
            # if language == 'en':
            # collection[(category.en_name, False, category.id)] = [(x.en_name, x.image, x.id) for x in category.products.all()]
            # else:
            # collection[(category.es_name, False, category.id)] = [(x.es_name, x.image, x.id) for x in category.products.all()]
            if request.GET['language'] == 'es':
                return render(request, 'index_new.html',
                              {
                                  'language': request.GET['language'],
                                  'categories': collection_es
                              }
                )
            return render(request, 'index_new_en.html',
                          {
                              'language': request.GET['language'],
                              'categories': collection_en
                          }
            )
        except KeyError:
            raise 'Error fix params'


def begin(request):
    if request.method == 'GET':
        try:
            if request.GET['language'] == 'es':
                return render(request, 'main.html',
                              {'language': request.GET['language']}
                )
            return render(request, 'main_en.html',
                          {'language': request.GET['language']}
            )
        except KeyError:
            return render(request, 'main.html',
                          {'language': 'es'}
            )


def remove_none(list):
    res = []
    for x in list:
        if x:
            res.append(x)
    return res


def match(query, name, description):
    for word in query:
        bool_name = False
        bool_description = False
        for word_name in name:
            if word in word_name:
                bool_name = True
                break
        if bool_name:
            continue
        for word_description in description:
            if word in word_description:
                bool_description = True
                break
        if not bool_description and not bool_name:
            return False
    return True


def fix(query, value0, value1):
    name_res = '<p>'
    description_res = '<p>'
    value0 = stopwords.word_tokenize(value0)
    value1 = stopwords.word_tokenize(value1)
    for name in value0:
        _bool = False
        for word in query:
            if word in name:
                name_res += '<strong> ' + str(name) + '</strong>'
                _bool = True
                break
        if not _bool:
            name_res += ' ' + str(name)
    for name2 in value1:
        _bool = False
        for word in query:
            if word in name2:
                description_res += '<strong> ' + str(name2) + '</strong>'
                _bool = True
                break
        if not _bool:
            description_res += ' ' + str(name2)
    return name_res + '</p>', description_res + '</p>'


def process_query(query, stopwords):
    query = [str(x) if str(x) not in stopwords else None for x in query]
    return remove_none(query)


def search(request):
    if request.method == 'POST':
        collection = None
        query = request.POST['query']
        query = stopwords.word_tokenize(query)
        if request.POST['language'] == 'es':
            query = process_query(query, stopwords.es_stopwords)
            collection = [(x.es_name, x.es_description, x._es_name, x._es_description) for x in models.Products.objects.all()]
        else:
            query = process_query(query, stopwords.en_stopwords)
            collection = [(x.en_name, x.en_description, x._en_name, x._en_description) for x in models.Products.objects.all()]
        result = []
        if len(query):
            result = [fix(query, value[0], value[1]) if match(query, stopwords.word_tokenize(value[2]), stopwords.word_tokenize(value[3])) else None for value in collection]

        if request.POST['language'] == 'es':
            return render(request, 'search.html',
                          {
                              'query': request.POST['query'],
                              'language': request.POST['language'],
                              'categories': collection_es,
                              'result': remove_none(result)
                          }
            )
        return render(request, 'search_en.html',
                      {
                          'query': request.POST['query'],
                          'language': request.POST['language'],
                          'categories': collection_en,
                          'result': remove_none(result)
                      }
        )
    else:
        if request.GET['language'] == 'es':
            return render(request, 'search.html',
                          {
                              'query': '',
                              'language': request.GET['language'],
                              'result': []
                          })
        return render(request, 'search_en.html',
                      {
                          'query': '',
                          'language': request.GET['language'],
                          'result': []
                      })


def change_language(request):
    return HttpResponseRedirect(request.environ['HTTP_REFERER'].split('?')[0] + '?language=' + request.GET['language'])


def company(request):
    if request.method == 'GET':
        if request.GET['language'] == 'es':
            return render(request, 'company.html', {
                'categories': collection_es
            })
        else:
            return render(request, 'company_en.html', {
                'categories': collection_en
            })


def clients(request):
    if request.method == 'GET':
        try:
            clients = models.Client.objects.all()
            if request.GET['language'] == 'es':
                return render(request, 'clients.html',
                              {
                                  'language': request.GET['language'],
                                  'clients': clients
                              }
                )
            return render(request, 'clients_en.html',
                          {
                              'language': request.GET['language'],
                              'clients': clients
                          }
            )
        except KeyError:
            return render(request, 'clients.html',
                          {
                              'language': 'es',
                              'clients': clients
                          }
            )


def divide(val, language):
    if language == 'es':
        return [x.strip() for x in val.split(';')]
    else:
        return [x.strip() for x in val.split(';')]


def my_cmp(x, y):
    return cmp(x[0], y[0])


def categories(request, id):
    if request.GET:
        category = models.Categories.objects.get(pk=id)
        collection = SortedDict()
        if len(category.sons.all()):
            if request.GET['language'] == 'en':
                collection[(category.en_name, True)] = SortedDict()
                if request.GET['language'] == 'en':
                    for son in category.sons.all():
                        collection[(category.en_name, True)][son.en_name] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in son.products.all()]
                else:
                    for son in category.sons.all():
                        collection[(category.es_name, True)][son.es_name] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in son.products.all()]
            else:
                collection[(category.es_name, True)] = SortedDict()
                if request.GET['language'] == 'en':
                    for son in category.sons.all():
                        collection[(category.en_name, True)][son.en_name] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in son.products.all()]
                else:
                    for son in category.sons.all():
                        collection[(category.es_name, True)][son.es_name] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in son.products.all()]
        else:
            if request.GET['language'] == 'en':
                collection[(category.en_name, False)] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in category.products.all()]
            else:
                collection[(category.es_name, False)] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in category.products.all()]
        if request.GET['language'] == 'en':
            return render(request, 'productos_en.html', {
                'language': 'en',
                'collection': collection,
                'categories': collection_en
            })
        else:
            return render(request, 'productos.html', {
                'language': 'es',
                'collection': collection,
                'categories': collection_es
            })


def categories_all(request):
    if request.GET:
        categories = models.Categories.objects.all()
        collection = SortedDict()
        for category in categories:
            if not category.parent:
                if len(category.sons.all()):
                    if request.GET['language'] == 'en':
                        collection[(category.en_name, True)] = SortedDict()
                        if request.GET['language'] == 'en':
                            for son in category.sons.all():
                                collection[(category.en_name, True)][son.en_name] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in son.products.all()]
                        else:
                            for son in category.sons.all():
                                collection[(category.es_name, True)][son.es_name] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in son.products.all()]
                    else:
                        collection[(category.es_name, True)] = SortedDict()
                        if request.GET['language'] == 'en':
                            for son in category.sons.all():
                                collection[(category.en_name, True)][son.en_name] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in son.products.all()]
                        else:
                            for son in category.sons.all():
                                collection[(category.es_name, True)][son.es_name] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in son.products.all()]
                else:
                    if request.GET['language'] == 'en':
                        collection[(category.en_name, False)] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in category.products.all()]
                    else:
                        collection[(category.es_name, False)] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in category.products.all()]
                        # if len(category.products.all()):
                        # if request.GET['language'] == 'en':
                        #         collection[('', False)] = [(x.en_name, x.form, x.image, [y.en_name for y in x.suppliers.all()], x.en_principio_activo, x.en_accion_terapeutica, divide(x.en_concentracion, 'en'), divide(x.en_presentacion, 'en')) for x in category.products.all()]
                        #     else:
                        #         collection[('', False)] = [(x.es_name, x.form, x.image, [y.es_name for y in x.suppliers.all()], x.principio_activo, x.accion_terapeutica, divide(x.concentracion, 'es'), divide(x.presentacion, 'es')) for x in category.products.all()]
        if request.GET['language'] == 'en':
            return render(request, 'productos_en.html', {
                'language': 'en',
                'collection': collection,
                'categories': collection_en
            })
        else:
            return render(request, 'productos.html', {
                'language': 'es',
                'collection': collection,
                'categories': collection_es
            })