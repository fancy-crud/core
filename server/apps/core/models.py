from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Genre(models.Model):

    name = models.CharField(max_length=10)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Artist(models.Model):

    GENDERS = (
        ('m', 'Masculino'),
        ('f', 'Femenino'),
    )

    name = models.CharField(max_length=5)
    gender = models.CharField(max_length=1, choices=GENDERS)
    image = models.ImageField(upload_to='artists', null=True)
    image2 = models.ImageField(upload_to='artists', null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Album(models.Model):

    artist = models.ForeignKey(Artist, related_name='albums', on_delete=models.DO_NOTHING)
    featuring = models.ManyToManyField(Artist, related_name='featuring_albums')
    genres = models.ManyToManyField(Genre, related_name='albums')

    name = models.CharField(max_length=10)
    publish_date = models.DateTimeField()

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Track(models.Model):

    album = models.ForeignKey(Album, related_name='albums', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=10)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

