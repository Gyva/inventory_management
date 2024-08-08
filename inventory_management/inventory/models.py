from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    role_choices = (
        ('LogisticOfficer', 'Logistic Officer'),
        ('Coordinator', 'Coordinator'),
        ('HoD', 'HoD'),
    )
    role = models.CharField(max_length=20, choices=role_choices, default='Coordinator')

class Equipment(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(null=True)
    description = models.TextField(null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

class Request(models.Model):
    status_choices = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    coordinator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    requested_quantity = models.IntegerField()
    request_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=status_choices, default='Pending')
    approved_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='approved_requests')
