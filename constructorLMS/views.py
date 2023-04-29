from django.shortcuts import render


# Create your views here.

def constructor(request):
    title = 'Constructor'
    return render(request, 'constructor.html', {
        'title': title
    })

def tres(request):
    return render(request, 'tres.html')

