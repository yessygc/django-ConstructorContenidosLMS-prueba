from django.test import TestCase
from constructorLMS.models import Componentes, ElementoTitulo, ElementoSubtitulo, ElementoContenido, ElementoImagen, ElementoVideo, ElementoAudio
from django.core.files.uploadedfile import SimpleUploadedFile

class ComponentesTest(TestCase):

    def setUp(self):
        self.componente = Componentes.objects.create(
            titulo='Test titulo',
            subtitulo='Test subtitulo',
            contenido='Test contenido',
            imagen=SimpleUploadedFile(name='test_image.jpg', content=b'', content_type='image/jpeg'),
            video=SimpleUploadedFile(name='test_video.mp4', content=b'', content_type='video/mp4'),
            audio=SimpleUploadedFile(name='test_audio.mp3', content=b'', content_type='audio/mpeg'),
            my_field='Test field',
            posicion=1,
        )

    def test_componentes_creation(self):
        self.assertEqual(self.componente.titulo, 'Test titulo')
        self.assertEqual(self.componente.subtitulo, 'Test subtitulo')
        self.assertEqual(self.componente.contenido, 'Test contenido')
        self.assertEqual(self.componente.imagen.name, 'test_image.jpg')
        self.assertEqual(self.componente.video.name, 'test_video.mp4')
        self.assertEqual(self.componente.audio.name, 'test_audio.mp3')
        self.assertEqual(self.componente.my_field, 'Test field')
        self.assertEqual(self.componente.posicion, 1)

class ElementoTituloTest(TestCase):

    def setUp(self):
        self.componente = Componentes.objects.create(
            titulo='Test titulo',
            subtitulo='Test subtitulo',
            contenido='Test contenido',
            imagen=SimpleUploadedFile(name='test_image.jpg', content=b'', content_type='image/jpeg'),
            video=SimpleUploadedFile(name='test_video.mp4', content=b'', content_type='video/mp4'),
            audio=SimpleUploadedFile(name='test_audio.mp3', content=b'', content_type='audio/mpeg'),
            my_field='Test field',
            posicion=1,
        )

        self.elemento_titulo = ElementoTitulo.objects.create(
            titulo=self.componente,
            texto='Test texto',
            tamano=12,
            color='blue',
        )

    def test_elemento_titulo_creation(self):
        self.assertEqual(self.elemento_titulo.titulo, self.componente)
        self.assertEqual(self.elemento_titulo.texto, 'Test texto')
        self.assertEqual(self.elemento_titulo.tamano, 12)
        self.assertEqual(self.elemento_titulo.color, 'blue')

class ElementoSubtituloTest(TestCase):

    def setUp(self):
        self.componente = Componentes.objects.create(
            titulo='Test titulo',
            subtitulo='Test subtitulo',
            contenido='Test contenido',
            imagen=SimpleUploadedFile(name='test_image.jpg', content=b'', content_type='image/jpeg'),
            video=SimpleUploadedFile(name='test_video.mp4', content=b'', content_type='video/mp4'),
            audio=SimpleUploadedFile(name='test_audio.mp3', content=b'', content_type='audio/mpeg'),
            my_field='Test field',
            posicion=1,
        )

        self.elemento_subtitulo = ElementoSubtitulo.objects.create(
            subtitulo=self.componente,
            texto='Test texto',
            tamano=12,
            color='blue',
        )

    def test_elemento_subtitulo_creation(self):
        self.assertEqual(self.elemento_subtitulo.subtitulo, self.componente)
        self.assertEqual(self.elemento_subtitulo.texto, 'Test texto')
        self.assertEqual(self.elemento_subtitulo.tamano, 12)
        self.assertEqual(self.elemento_subtitulo.color, )

    def test_object_name_is_titulo(self):
        elemento_titulo = ElementoTitulo.objects.get(id=1)
        expected_object_name = f"{elemento_titulo.texto} ({elemento_titulo.titulo.titulo})"
        self.assertEqual(str(elemento_titulo), expected_object_name)

    def test_elemento_contenido_color_choices(self):
        elemento_contenido = ElementoContenido.objects.get(id=1)
        choices = elemento_contenido._meta.get_field('color').choices
        self.assertEqual(choices, [('red', 'Red'), ('blue', 'Blue'), ('green', 'Green'), ('black', 'Black')])

    def test_elemento_imagen_thumbnail_created(self):
        elemento_imagen = ElementoImagen.objects.get(id=1)
        self.assertTrue(elemento_imagen.thumbnail.name.startswith('imagenes/test_thumbnail'))

    def test_elemento_audio_audio_upload_to(self):
        elemento_audio = ElementoAudio.objects.get(id=1)
        upload_to = elemento_audio._meta.get_field('audio').upload_to(elemento_audio, 'test.mp3')
        self.assertEqual(upload_to, 'audios/test.mp3')

    def test_componentes_posicion_default_value(self):
        componente = Componentes.objects.create(titulo='Test titulo', subtitulo='Test subtitulo', contenido='Test contenido',
                                                 imagen='test.jpg', video='test.mp4', audio='test.mp3', my_field='Test field')
        self.assertEqual(componente.posicion, 0)

    def test_componentes_posicion_ordering(self):
        componente1 = Componentes.objects.create(titulo='Test titulo 1', subtitulo='Test subtitulo', contenido='Test contenido',
                                                 imagen='test.jpg', video='test.mp4', audio='test.mp3', my_field='Test field', posicion=1)
        componente2 = Componentes.objects.create(titulo='Test titulo 2', subtitulo='Test subtitulo', contenido='Test contenido',
                                                 imagen='test.jpg', video='test.mp4', audio='test.mp3', my_field='Test field', posicion=2)
        componentes = Componentes.objects.all()
        self.assertEqual(list(componentes), [componente1, componente2])

