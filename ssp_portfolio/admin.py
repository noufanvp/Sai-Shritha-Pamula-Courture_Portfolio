from django.contrib import admin

from .models import ContactInquiry

# Register your models here.


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
	list_display = ("full_name", "email", "subject", "created_at")
	search_fields = ("full_name", "email", "subject", "message")
	list_filter = ("created_at",)
