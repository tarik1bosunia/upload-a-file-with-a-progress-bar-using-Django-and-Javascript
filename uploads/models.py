from django.db import models


class Upload(models.Model):
    image = models.ImageField(upload_to='img')

    def __str__(self) -> str:
        return f"pk: {self.pk}"
