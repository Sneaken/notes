编码自动检测

from bs4 import UnicodeDammit
dammit = UnicodeDammit(u'编码')
print(dammit.unicode_markup)