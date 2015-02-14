__author__ = 'Roly'
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'FriFarma.settings'
import Fri_Farma.models as models
import Fri_Farma.stopwords as stopwords

if __name__ == '__main__':
    with open('clients.txt', 'r') as f:
        cont = 1
        for line in f.readlines():
            line = line.split()
            res = ''
            if len(line) > 1:
                for word in line:
                    word = word.lower()
                    if word in stopwords.en_stopwords or word in stopwords.es_stopwords:
                        res += word + ' '
                    else:
                        if word[0] == '(':
                            res += word[0] + word[1].upper() + word[2:] + ' '
                        else:
                            res += word[0].upper() + word[1:] + ' '
            else:
                res = line[0]
            # print(res)
            client = models.Client.objects.create(es_name=res, sort_order=cont * 100)
            client.save()
            cont += 1
