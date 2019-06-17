from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from contextlib import suppress
import json
from django.http import JsonResponse
from .models import Tag, Tune, Library, Post, Comment
from accounts.models import Profile


def tune_create(request):
  print(request.user)
  if request.user.is_authenticated:
    if request.method == 'POST':
      data = json.loads(request.body)
      print('data', data['tune'])
      melody_line = data['tune']
      tune_list = data['tune'].splitlines()
      new_tune = {}
      print(tune_list)
      title = tune_list[0][3:]
      time_signature = tune_list[1][3:]
      default_note_length = tune_list[2][3:]
      tune_type = tune_list[3][3:]
      key_signature = tune_list[4][3:]
      # melody_line = '\n'.join(tune_list[5:])
      poster = Profile.objects.get(user=request.user)
      is_public = True
      tune = Tune.objects.create(title=title, time_signature=time_signature, default_note_length=default_note_length, tune_type=tune_type, key_signature=key_signature, melody_line=melody_line, poster=poster, is_public=is_public)
      Library.objects.get(profile=poster).tunes.add(tune)
      return JsonResponse({'message':'worked'})
    else:
      return JsonResponse({'meggade': 'no psost'})
  else:
    return JsonResponse({'status': 401, 'message': 'Not authorized'}, status=401)

def tune_edit(request, pk):
  print(request.user)
  if request.user.is_authenticated:
    if request.method == 'POST':
      data = json.loads(request.body)
      print('data', data['tune'])
      melody_line = data['tune']
      tune_list = data['tune'].splitlines()
      new_tune = {}
      print(tune_list)
      title = tune_list[0][3:]
      time_signature = tune_list[1][3:]
      default_note_length = tune_list[2][3:]
      tune_type = tune_list[3][3:]
      key_signature = tune_list[4][3:]
      # melody_line = '\n'.join(tune_list[5:])
      poster = Profile.objects.get(user=request.user)
      is_public = True
      tune = Tune.objects.filter(pk=pk).update(title=title, time_signature=time_signature, default_note_length=default_note_length, tune_type=tune_type, key_signature=key_signature, melody_line=melody_line, poster=poster, is_public=is_public)
      return JsonResponse({'tune':tune})
    else:
      return JsonResponse({'meggade': 'no psost'})
  else:
    return JsonResponse({'status': 401, 'message': 'Not authorized'}, status=401)

def tune_delete(request, pk):
    Tune.objects.get(pk=pk).delete()
    return JsonResponse({'meggade': 'gone...'})


def tunes(request):
  print('hey')
  print('user user', request.user)
  tunes = Tune.objects.filter(is_public=True).values()
  print(tunes)
  return JsonResponse({"tunes": list(tunes)}, safe=False)
  

def tune_show(request, pk):
  tune = Tune.objects.get(pk=pk)
  print('showing ', tune)
  chune = Tune.objects.filter(pk=pk).values().first().copy()
  print('choosing ', chune)
  print('mel', chune['melody_line'])
  notato = []
  with suppress(AttributeError, TypeError):
    print('M:'+chune['time_signature'])
    print(f"M: {chune['time_signature']}")
    notato.append('M:'+chune['time_signature'])
  with suppress(AttributeError, TypeError):
    notato.append('L:'+chune['default_note_length'])
  with suppress(AttributeError, TypeError):
    notato.append('R:'+chune['tune_type'])
  with suppress(AttributeError, TypeError):
    notato.append('K:'+chune['key_signature'])
  notato.append(chune['melody_line'])
  # chune = chune.values()
  print('made it this far')
  chune['notato'] = list(notato)
  print('returning', chune)
  return JsonResponse({"chune": chune})


def library(request):
  profile = request.user.profile
  lib_tunes = Tunes.objects.filter()

def post_show(request, pk):
  tune = Tune.objects.filter(pk=pk)
  post = Post.objects.filter(tune=tune[0])

  tune = tune.values().first()
  post = post.values().first()
  return JsonResponse({"post": post, "tune": tune})

