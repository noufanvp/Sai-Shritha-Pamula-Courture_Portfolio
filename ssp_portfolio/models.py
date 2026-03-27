from django.db import models

# Create your models here.


class ContactInquiry(models.Model):
	full_name = models.CharField(max_length=120)
	email = models.EmailField()
	phone = models.CharField(max_length=25, blank=True)
	subject = models.CharField(max_length=160, blank=True)
	message = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-created_at"]

	def __str__(self):
		return f"{self.full_name} ({self.email})"
