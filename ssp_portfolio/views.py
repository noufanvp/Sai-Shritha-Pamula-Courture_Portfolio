from django.contrib import messages
from django.shortcuts import redirect, render

from .models import ContactInquiry

# Create your views here.
def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def designs(request):
    return render(request, 'designs.html')

def contact(request):
    form_data = {
        "full_name": "",
        "email": "",
        "phone": "",
        "subject": "",
        "message": "",
    }

    if request.method == "POST":
        form_data = {
            "full_name": request.POST.get("full_name", "").strip(),
            "email": request.POST.get("email", "").strip(),
            "phone": request.POST.get("phone", "").strip(),
            "subject": request.POST.get("subject", "").strip(),
            "message": request.POST.get("message", "").strip(),
        }

        missing_fields = []
        if not form_data["full_name"]:
            missing_fields.append("Full name")
        if not form_data["email"]:
            missing_fields.append("Email")
        if not form_data["message"]:
            missing_fields.append("Message")

        if missing_fields:
            messages.error(
                request,
                "Please provide the required fields: " + ", ".join(missing_fields) + ".",
            )
        else:
            ContactInquiry.objects.create(**form_data)
            messages.success(
                request,
                "Thank you for reaching out. Your message has been sent successfully.",
            )
            return redirect("contact")

    return render(request, "contact.html", {"form_data": form_data})