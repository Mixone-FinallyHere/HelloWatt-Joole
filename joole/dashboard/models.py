from django.db import models


class Conso_eur(models.Model):
    client_id = models.IntegerField()
    janvier = models.FloatField()
    fevrier = models.FloatField()
    mars = models.FloatField()
    avril = models.FloatField()
    mai = models.FloatField()
    juin = models.FloatField()
    juillet = models.FloatField()
    aout = models.FloatField()
    septembre = models.FloatField()
    octobre = models.FloatField()
    novembre = models.FloatField()
    decembre = models.FloatField()
    year = models.IntegerField()

    def __str__(self):
        return str(self.client_id)


class Conso_watt(models.Model):
    client_id = models.IntegerField()
    janvier = models.FloatField()
    fevrier = models.FloatField()
    mars = models.FloatField()
    avril = models.FloatField()
    mai = models.FloatField()
    juin = models.FloatField()
    juillet = models.FloatField()
    aout = models.FloatField()
    septembre = models.FloatField()
    octobre = models.FloatField()
    novembre = models.FloatField()
    decembre = models.FloatField()
    year = models.IntegerField()

    def __str__(self):
        return str(self.client_id)