from django.contrib import admin

# Register your models here.
from .models import Conso_eur, Conso_watt

admin.site.register(Conso_eur)
admin.site.register(Conso_watt)