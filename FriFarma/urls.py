# -*- coding: utf8 -*-
from django.conf.urls import patterns, include, url

from django.conf import settings
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
from django.contrib import admin

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from Fri_Farma import views

admin.autodiscover()

urlpatterns = static(settings.MEDIA_URL,
                     document_root=settings.MEDIA_ROOT) + patterns('',
                                                                   # Examples:
                                                                   # url(r'^$', 'FriFarma.views.home', name='home'),
                                                                   # url(r'^FriFarma/', include('FriFarma.foo.urls')),

                                                                   # Uncomment the admin/doc line below to enable admin documentation:
                                                                   url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                                                                   # Uncomment the next line to enable the admin:
                                                                   url(r'^admin/', include(admin.site.urls)),
                                                                   url(r'^main/?$', views.main, name='main'),
                                                                   url(r'^search/?$', views.search, name='search'),
                                                                   url(r'^change_language/?$', views.change_language, name='change_language'),
                                                                   url(r'^clients/?$', views.clients, name='clients'),
                                                                   url(r'^company/?$', views.company, name='company'),
                                                                   url(r'^categories/(?P<id>\d+)/?$', views.categories, name='categories'),
                                                                   url(r'^categories/?$', views.categories_all, name='categories all'),
                                                                   url(r'', views.begin, name='begin')
)

urlpatterns += staticfiles_urlpatterns()
