from django.urls import path

from . import views

urlpatterns = [
    path('tunes/', views.tunes, name='tunes'),
    path('tunes/edit/<int:pk>', views.tune_edit, name='tune_edit'),
    path('tunes/delete/<int:pk>', views.tune_delete, name='tune_delete'),
    path('tunes/<int:pk>', views.tune_show, name='tune_show'),
    path('tunes/new/', views.tune_create, name='tune_create'),
    path('post/<int:pk>', views.post_show, name='post_show'),
    path('library/', views.library, name='library'),
]