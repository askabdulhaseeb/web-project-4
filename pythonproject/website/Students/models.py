from django.db import models

# Create your models here.
class Student(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    registrationDate = models.DateField()
