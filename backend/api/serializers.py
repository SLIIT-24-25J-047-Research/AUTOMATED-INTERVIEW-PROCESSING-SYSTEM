from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True} }

    # override the create method
    # to create a user with a hashed password
    # instead of plain text password
    # this method is called when we call serializer.save()
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) 
        return user # return the user object