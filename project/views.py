from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import serializers
from django.contrib.auth.models import Group, Permission

from django.contrib.auth import get_user_model

User = get_user_model()


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = [
            "name",
            "content_type",
            "codename",
        ]


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)

    class Meta:
        model = Group
        fields = [
            "name",
            "permissions",
        ]


class CurrentUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, instance):
        return instance.get_full_name()

    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "full_name",
            "is_authenticated",
            "groups",
        ]


def get_serialized_current_user(request):
    return (
        CurrentUserSerializer(request.user).data
        if request.user.is_authenticated
        else None
    )


@login_required
def index(request, *args, **kwargs):
    return render(
        request, "index.html", {"current_user": get_serialized_current_user(request)}
    )
