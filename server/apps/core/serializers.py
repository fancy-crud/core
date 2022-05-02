from rest_framework import serializers

from apps.core import models


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Genre
        fields = '__all__'


class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Artist
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):

    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Artist.objects.all(),
        source='artist',
        write_only=True
    )

    featuring_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Artist.objects.all(),
        source='artist',
        many=True,
        write_only=True
    )

    genres_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Genre.objects.all(),
        source='artist',
        many=True,
        write_only=True
    )

    class Meta:
        model = models.Album
        fields = '__all__'
        depth = 1


class TrackSerializer(serializers.ModelSerializer):

    album_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Album.objects.all(),
        source='album',
        write_only=True
    )

    class Meta:
        model = models.Track
        fields = '__all__'
        depth = 1

