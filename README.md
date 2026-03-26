# Sai Shritha Pamula Couture

A sophisticated, custom-designed portfolio website for Sai Shritha Pamula Couture — where every stitch tells a story. Built with Django and featuring thoughtful design details, expressive layouts, and poetic storytelling.

## 🎨 Features

- **Elegant Hero Section** — Captivating introduction with parallax effects
- **Featured Designs** — Showcase of couture pieces with mood descriptions
- **Founder's Story** — Personal narrative with character-reveal animations
- **Design Portfolio** — Detailed product pages with rich descriptions
- **Responsive Design** — Optimized for all screen sizes
- **Smooth Animations** — Letter-by-letter reveals, scroll animations, and transitions
- **Professional Contact** — Easy-to-use contact form for inquiries

## 🛠️ Tech Stack

- **Backend:** Django 5.2.3
- **Frontend:** HTML5, CSS3 (with custom design tokens), JavaScript
- **Database:** SQLite (development) / PostgreSQL (production)
- **Server:** Gunicorn (production)

## 📋 Prerequisites

- Python 3.10+
- pip (Python package manager)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ssp-couture.git
cd ssp-couture
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your required variables (especially `SECRET_KEY` for production).

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 7. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 8. Run Development Server

```bash
python manage.py runserver
```

Visit `http://localhost:8000` to view the site.

## 📁 Project Structure

```
ssp-couture/
├── ssp_website/          # Main Django project
│   ├── settings.py       # Project settings
│   ├── urls.py           # URL routing
│   └── wsgi.py           # WSGI config
├── ssp_portfolio/        # Main app
│   ├── models.py         # Database models
│   ├── views.py          # View logic
│   ├── urls.py           # App routes
│   └── templates/        # HTML templates
├── static/               # Static files
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── images/           # Images
├── manage.py             # Django management
└── requirements.txt      # Python dependencies
```

## 🌍 Deployment

### Using Gunicorn

```bash
gunicorn ssp_website.wsgi:application --bind 0.0.0.0:8000
```

### Environment Variables for Production

Set these in your production environment:

- `DEBUG=False`
- `SECRET_KEY=<strong-random-key>`
- `ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com`
- Update database configuration for production database

### Recommended Production Services

- **Hosting:** Heroku, Railway, PythonAnywhere, DigitalOcean, AWS
- **Database:** PostgreSQL (with AWS RDS, Heroku Postgres, etc.)
- **Static Files:** AWS S3, Cloudinary, or similar
- **Domain:** Namecheap, GoDaddy, or your preferred registrar

## 🎯 Admin Panel

Access the Django admin panel at `/admin` to manage:

- Design portfolio items
- Contact inquiries
- Site content

## 📝 License

This project is private and proprietary to Sai Shritha Pamula Couture.

## 👤 Author

**Sai Shritha Pamula**

- Portfolio: [Your Domain]
- Email: [Your Email]
- Instagram: [@yourhandle]

## 📧 Support

For inquiries or to start a design conversation, visit the [Contact Page](http://localhost:8000/contact).

---

_Where every piece belongs to a story, not just a collection._
