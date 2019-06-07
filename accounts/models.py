from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
  email_public = models.BooleanField(default=False)
  location = models.CharField(max_length=150, null=True, blank=True)
  website = models.CharField(max_length=255, null=True, blank=True)

  def __str__(self):
    return self.user.email