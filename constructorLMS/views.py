from django.shortcuts import render, redirect
from .models import Componentes

# Create your views here.

def constructor(request):
    title = 'Constructor'
    return render(request, 'constructor.html', {
        'title': title
    })

def tres(request):
    if request.method == 'POST':
        # Get data from form
        titulo = request.POST['h1-visor']
        subtitulo = request.POST['subtitulo']
        contenido = request.POST['contenido']
        imagen = request.FILES['imagen']
        video = request.FILES['video']
        audio = request.FILES['audio']
        my_field = request.POST['my_field']
        posicion = request.POST['posicion']
        
        # Create new Componentes object and save to database
        componente = Componentes(titulo=titulo, subtitulo=subtitulo, contenido=contenido,
                                 imagen=imagen, video=video, audio=audio, my_field=my_field,
                                 posicion=posicion)
        componente.save()
        
        # Redirect to success page
        return redirect('tres.html')
    return render(request, 'tres.html')

