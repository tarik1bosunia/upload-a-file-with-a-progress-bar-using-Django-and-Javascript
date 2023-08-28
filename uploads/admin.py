from django.contrib import admin
from uploads.models import Upload


@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    list_display = ['pk', 'image']

