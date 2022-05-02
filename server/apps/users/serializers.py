from rest_framework import serializers
from .  import models


class UserSerializer(serializers.ModelSerializer):

    re_password = serializers.CharField(write_only=True)

    class Meta:
        model = models.User
        fields = '__all__'
        extra_kwargs = {
            'id': { 'read_only': True },
            'password': { 'write_only': True },
            'username': { 'required': False },
            'last_login': { 'read_only': True },
            'date_joined': { 'read_only': True },
        }

    def validate(self, data):
        if 'password' in data and 're_password' in data:
            if data['password'] != data['re_password']:
                raise serializers.ValidationError({ 're_password': ["Las contraseñas no coinciden"] })

        return data

    def create(self, validated_data):
        is_superuser = validated_data.get('is_superuser', False)

        if is_superuser:
            user = models.User.objects.create_superuser(**validated_data)
        else:
            user = models.User.objects.create_user(**validated_data)

        return user

    def update(self, instance, validated_data):
        if 'email' in validated_data:
            validated_data['email'] = validated_data.get('email').lower()

        if 'first_name' in validated_data:
            validated_data['first_name'] = validated_data.get('first_name').title()

        if 'last_name' in validated_data:
            validated_data['last_name'] = validated_data.get('last_name').title()

        password = validated_data.pop('password', None)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return super().update(instance, validated_data)
