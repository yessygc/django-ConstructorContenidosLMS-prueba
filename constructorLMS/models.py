from django.db import models
from tinymce import models as tinymce_models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.
class Componentes(models.Model):
    titulo = models.CharField(max_length=200)
    subtitulo = models.CharField(max_length=200)
    contenido = models.TextField()
    imagen = models.ImageField(upload_to='imagenes/')
    video = models.FileField(upload_to='videos/')
    audio = models.FileField(upload_to='audios/')
    my_field = tinymce_models.HTMLField()
    posicion = models.PositiveIntegerField()

    class Meta:
        ordering = ['posicion']

class ElementoTitulo(models.Model):
    titulo = models.ForeignKey(Componentes, on_delete=models.CASCADE)
    texto = models.CharField(max_length=200)
    tamano = models.IntegerField()
    color = models.CharField(max_length=20)

class ElementoSubtitulo(models.Model):
    subtitulo = models.ForeignKey(Componentes, on_delete=models.CASCADE)
    texto = models.CharField(max_length=200)
    tamano = models.IntegerField()
    color = models.CharField(max_length=20)

class ElementoContenido(models.Model):
    contenido = models.ForeignKey(Componentes, on_delete=models.CASCADE)
    texto = models.CharField(max_length=5000)
    tamano = models.IntegerField()
    color = models.CharField(max_length=20)

class ElementoImagen(models.Model):
    imagen = models.ForeignKey(Componentes, on_delete=models.CASCADE)
    thumbnail = ImageSpecField(source='imagenes/',
                               processors=[ResizeToFill(100, 100)],
                               format='JPEG' 'PNG',
                               options={'quality': 60})

class ElementoVideo(models.Model):
    video = models.ForeignKey(Componentes, on_delete=models.CASCADE)

class ElementoAudio(models.Model):
    audio = models.ForeignKey(Componentes, on_delete=models.CASCADE)


