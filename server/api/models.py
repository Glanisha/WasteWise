from django.db import models



class Event(models.Model):
    name = models.CharField(max_length=255)
    points = models.IntegerField(default=0)
    reason = models.TextField(default="Default reason")

    timestamp = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name
    


class Bin(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    status = models.CharField(max_length=20)
    image = models.ImageField(upload_to='bin_images/', blank=True, null=True)  # Image field to store the image
    comment = models.TextField(blank=True, null=True)  # Text field for additional comments
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically sets the timestamp when a record is created

    class Meta:
        ordering = ['-created_at']  # Order by created_at in descending order (latest first)

    def __str__(self):
        return f"Bin at ({self.lat}, {self.lng}) - Status: {self.status}"

