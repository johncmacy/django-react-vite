import json
from rest_framework import serializers
from api.viewsets import ProjectionsAndFilters
from core.models import CustomModel


class Serializers:
    class Summary(serializers.ModelSerializer):
        class Meta:
            model = CustomModel
            fields = [
                "id",
            ]

    class Detail(serializers.ModelSerializer):
        class Meta:
            model = CustomModel
            fields = [
                "id",
            ]

    for_ = {
        "summary": Summary,
        "detail": Detail,
    }


class Viewset(ProjectionsAndFilters):
    serializer_class = Serializers.Summary
    serializers = Serializers
    queryset = CustomModel.objects.all()
    ordering_fields = "__all__"

    filters = {
        "id": lambda q, v, _: q.filter(id=v),
    }
