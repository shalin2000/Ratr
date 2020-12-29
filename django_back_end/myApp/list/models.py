from django.db import models

# Create your models here.
class List(models.Model):
    email = models.EmailField(max_length = 100)
    book_name = models.CharField(max_length = 100)
    book_author = models.CharField(max_length = 100)
    book_url = models.CharField(max_length = 500)
    user_rating = models.CharField(max_length = 100, blank = True)
    user_comment = models.CharField(max_length = 500, blank = True)
    user_progress = models.CharField(max_length = 100)
    book_logged = models.DateTimeField(auto_now_add=True)