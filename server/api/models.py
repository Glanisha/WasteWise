from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    points = models.IntegerField(default=0)
    reason = models.TextField(default="Default reason")

    timestamp = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name
