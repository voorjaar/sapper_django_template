from django.urls import path
from .views import (
    api_article_detail_view,
    ApiArticleListView,
)

urlpatterns = [
    path('<slug:slug>/detail', api_article_detail_view, name='article_detail'),
    path('list', ApiArticleListView.as_view(), name='article_list')
]