from pathlib import Path
import os
import dj_database_url
from dotenv import load_dotenv
load_dotenv()
# all works well, this commit is a test
# Paths
BASE_DIR = Path(__file__).resolve().parent.parent

# Seguridad
SECRET_KEY = os.getenv(
    'SECRET_KEY', 'hkgu#!$-&r@dz+3rt#8-k+2ikyjsrk#ld!3&u5^wdi$8!se^6_')
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'registerbootcamp.onrender.com']

# Aplicaciones
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'applicants',
]

# Middleware
MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URLs y WSGI
ROOT_URLCONF = 'register.urls'
WSGI_APPLICATION = 'register.wsgi.application'

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Base de Datos (Render usa dj_database_url)
DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))

}

# Seguridad adicional para producción
SECURE_SSL_REDIRECT = not DEBUG
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG

# CORS (permite conexión con tu frontend en GitHub Pages)
CORS_ALLOWED_ORIGINS = [
    'https://advance-and-technology.github.io',
]
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = [
    'https://advance-and-technology.github.io',
]

# Autenticación REST
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
}

# Archivos estáticos (para producción con WhiteNoise)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Internacionalización
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Primary key
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
