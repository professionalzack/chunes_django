from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
import json
from django.http import JsonResponse
from .models import Tag, Tune, Library, Post, Comment

#(X:), the title (T:), the time signature (M:), the default note length (L:), the type of tune (R:) and the key (K:)

# Create your views here.
# @login_required
# def tune_create(request):
#   if request.method == 'POST':

def tunes(request):
  print('hey')
  # req = json.loads(request.body.decode('utf-8'))
  # print(req)
  # print('user user', request.user)
  if request.user.is_authenticated:
    tunes = Tune.objects.all().values()
    print(tunes)
    return JsonResponse({"tunes": list(tunes)}, safe=False)
  else:
    return JsonResponse({'status': 401, 'message': 'Not authorized'}, status=401)
  # tunes = Tune.objects.all().values()
  # return JsonResponse({"tunes": list(tunes)}, safe=False)

def tune_show(request, pk):
  tune = Tune.objects.filter(pk=pk).values().first()
  # tune2 = tune.values()
  # add_inf = ''    
  # notation = f'X:{tune['id']}\nT:{tune.title}\nR:{tune.tune_type}\nM:{tune.time_signature}\nL:{tune.default_note_length}\nK:{tune.key_signature}\n{tune.melody_line}'
  return JsonResponse({"meta": tune})
  # return JsonResponse({"meta": tune2, "itself": notation})


# class Tune(models.Model):
#   title = models.CharField(max_length=100)
#   time_signature = models.CharField(max_length=100, default='4/4')
#   default_note_length = models.CharField(max_length=100, default='1/8')
#   tune_type = models.CharField(max_length=100)
#   key_signature = models.CharField(max_length=100)
#   additional_info = models.TextField(null=True, blank=True)
  
#   poster = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, related_name='tunes')
#   fork_off = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='forks')
#   tags = models.ManyToManyField(Tag, null=True, blank=True)
#   is_public = models.BooleanField(default=False)

def library(request):
  profile = request.user.profile
  lib_tunes = Tunes.objects.filter()
# class Library(models.Model):
#   profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='library')
#   tunes = models.ManyToManyField(Tune, blank=True, related_name='library')

def post_show(request, pk):
  tune = Tune.objects.filter(pk=pk)
  post = Post.objects.filter(tune=tune[0])
  # comments = Comment.objects.filter(post=post).values()[::1]
  # comments = []
  # for comment in comment_set:
  #   comments.insert(0, comment).values()
  tune = tune.values().first()
  post = post.values().first()
  return JsonResponse({"post": post, "tune": tune})
  # return JsonResponse({"post": post, "tune": tune, "comments": list(comments)}, safe=False)


# class Post(models.Model):
#   poster = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, related_name='posts')
#   tune = models.ForeignKey(Tune, on_delete=models.CASCADE, related_name='posts')
#   content = models.TextField()
#   media = models.CharField(max_length=255, null=True, blank=True)
#   time_stamp = models.DateTimeField(default=now)

# class Comment(models.Model):
#   poster = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
#   content = models.TextField()
#   time_stamp = models.DateTimeField(default=now)
#   post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, related_name='comments')
#   comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='comments')


