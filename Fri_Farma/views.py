# Create your views here.
# -*- coding: utf8 -*-
from django.shortcuts import render
from django.http import HttpResponseRedirect

import models
import stopwords


def main(request):
    if request.method == 'GET':
        try:
            clients = models.Client.objects.all()
            if len(clients) > 3:
                clients = clients[0:3]
            if request.GET['language'] == 'es':
                return render(request, 'index_new.html',
                              {
                                  'language': request.GET['language'],
                                  'clients': clients
                              }
                )
            return render(request, 'index_new_en.html',
                          {
                              'language': request.GET['language'],
                              'clients': clients
                          }
            )
        except KeyError:
            return render(request, 'index_new.html',
                          {
                              'language': 'es',
                              'clients': clients
                          }
            )


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
                              'result': remove_none(result)
                          }
            )
        return render(request, 'search_en.html',
                      {
                          'query': request.POST['query'],
                          'language': request.POST['language'],
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