from django.urls import path

from . import views

urlpatterns = [
    path('tunes/', views.tunes, name='tunes'),
    path('tunes/<int:pk>', views.tune_show, name='tune_show'),
    path('post/<int:pk>', views.post_show, name='post_show'),
    path('library/', views.library, name='library'),
]