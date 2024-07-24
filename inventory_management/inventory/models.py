from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('LogisticOfficer', 'Logistic Officer'),
        ('Coordinator', 'Coordinator'),
        ('HoD', 'Head of Department'),
    ]
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)

class Equipment(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

class Request(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    coordinator = models.ForeignKey(User, related_name='requests', on_delete=models.CASCADE)
    request_date = models.DateTimeField(auto_now_add=True)
    requested_quantity = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    approved_by = models.ForeignKey(User, null=True, blank=True, related_name='approved_requests', on_delete=models.SET_NULL)

