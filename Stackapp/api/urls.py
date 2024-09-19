from django.urls import path
from .views import get_books,create_books,book_detail

urlpatterns = [
    path('books/',get_books,name='get_name'),
    path('books/create/',create_books,name='create_name'),
    path('books/<int:pk>',book_detail,name='book_detail')
]