from django.db import models
from accounts.models import Profile
from django.utils.timezone import now

#(X:), the title (T:), the time signature (M:), the default note length (L:), the type of tune (R:) and the key (K:)

# Create your models here.
class Tag(models.Model):
  content = models.TextField()
  color_code = models.CharField(max_length=100)

  def __str__(self):
    return self.content

class Tune(models.Model):
  title = models.CharField(max_length=100)
  time_signature = models.CharField(max_length=100, default='4/4')
  default_note_length = models.CharField(max_length=100, default='1/8')
  tune_type = models.CharField(max_length=100)
  key_signature = models.CharField(max_length=100)
  additional_info = models.TextField(null=True, blank=True)
  melody_line = models.TextField(null=True, blank=True)
  
  poster = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, related_name='tunes')
  fork_off = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='forks')
  tags = models.ManyToManyField(Tag, blank=True)
  is_public = models.BooleanField(default=False)

class Library(models.Model):
  profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='library')
  tunes = models.ManyToManyField(Tune, blank=True, related_name='library')

class Post(models.Model):
  poster = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, related_name='posts')
  tune = models.ForeignKey(Tune, on_delete=models.CASCADE, related_name='posts')
  content = models.TextField()
  media = models.CharField(max_length=255, null=True, blank=True)
  time_stamp = models.DateTimeField(default=now)

class Comment(models.Model):
  poster = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
  content = models.TextField()
  time_stamp = models.DateTimeField(default=now)
  post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, related_name='comments')
  comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='comments')


