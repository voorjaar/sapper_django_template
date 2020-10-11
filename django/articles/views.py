from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from .serializers import ArticleSerializer, ArticleSlugSerializer
from .models import Article


@api_view(['GET'])
def api_article_detail_view(request, slug):
    """GET ARTICLE DETAIL"""
    try:
        article = Article.objects.get(slug=slug)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class ApiArticleListView(ListAPIView):
    """GET ARTICLE LIST"""
    queryset = Article.objects.all()
    serializer_class = ArticleSlugSerializer