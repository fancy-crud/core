from rest_framework.viewsets import ModelViewSet
from apps.core import serializers
from apps.core import models


class GenreViewSet(ModelViewSet):

    queryset = models.Genre.objects.all()
    serializer_class = serializers.GenreSerializer


class ArtistViewSet(ModelViewSet):

    queryset = models.Artist.objects.all()
    serializer_class = serializers.ArtistSerializer


class AlbumViewSet(ModelViewSet):

    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer


class TrackViewSet(ModelViewSet):

    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
