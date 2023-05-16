// diapositivasBase es la data que tomaremos como base para empezar a trabajar
// solo es un arreglo de diapositivas. este arreglo lo guardaremos en el local storage para tener una persistencia de datos

let diapositivasBase = [
    {
        id: 'dm-1',
        titulo: 'Diapositiva 1',
        subtitulo: 'Este es el subtitulo 1',
        contenido: 'lorem ipsum dollor sit amet',
        imagen: '',
        video: '',
        audio: '',
        my_field: '',
        posicion: '1',
    },
    {
        id: 'dm-2',
        titulo: 'Diapositiva 2',
        subtitulo: 'Este es el subtitulo 2',
        contenido: 'lorem ipsum dollor sit amet de la diaposita 2',
        imagen: '',
        video: '',
        audio: '',
        my_field: '',
        posicion: '2',
    },
    {
        id: 'dm-3',
        titulo: 'Diapositiva 3',
        subtitulo: 'Este es el subtitulo 3',
        contenido: 'lorem ipsum dollor sit amet de la diapositiva 3',
        imagen: '',
        video: '',
        audio: '',
        my_field: '',
        posicion: '3',
    },
    {
        id: 'dm-4',
        titulo: 'Diapositiva 4',
        subtitulo: 'Este es el subtitulo 4',
        contenido: 'lorem ipsum dollor sit amet de la diaposita 4',
        imagen: '',
        video: '',
        audio: '',
        my_field: '',
        posicion: '4',
    }
]

//miniaturasDiv es el contenedor en el que colocaremos nuestras diapositivas
//este contenedor ya esta en el html
let miniaturasDiv = document.querySelector('.miniaturas')
let visorDiv = document.querySelector('#result-div')



diapositivasBase.forEach(diapositiva => {
    //creamos un nuevo li, este li encerrara nuestra diapositiva
    let listItemElement = document.createElement("li");
    listItemElement.setAttribute("id", diapositiva.id)

    // diapositivaDiv sera nuestra diapositiva
    let diapositivaDiv = document.createElement("div");

    //Debemos colocar la diapositiva dentro de nuestro li
    listItemElement.appendChild(diapositivaDiv);

    //C R E A C I Ó N - D E L - T I T U L O
    //Creamos el elemento h2 para nuestro titulo
    let diapositivaTitleH2 = document.createElement('h2');

    //Creamos el texto de nuestro titulo
    let diapositivaTitleText = document.createTextNode(diapositiva.titulo);

    //Insertamos el texto en nuestro elemento h2
    diapositivaTitleH2.appendChild(diapositivaTitleText);

    //insertamos el titulo en la diapositiva
    diapositivaDiv.appendChild(diapositivaTitleH2);

    //C R E A C I Ó N - D E L - S U B T I T U L O
    //Creamos un elemento h4 para nuestro subtitulo
    let diapositivaSubTituloH4 = document.createElement("h4");

    //Creamos el texto del subtitulo
    let diapositivaSubTituloText = document.createTextNode(diapositiva.subtitulo)

    //Montamos el texto del subtitulo en el elemento h4
    diapositivaSubTituloH4.appendChild(diapositivaSubTituloText)

    //Montamos el subtitulo en la diapositiva
    diapositivaDiv.appendChild(diapositivaSubTituloH4)

    //C R E A C I Ó N - D E L - C O N T E N I D O
    //Creamos un elemento p en el cual se mostrara nuestro contenido
    let diapositivaContenidoP = document.createElement('p')

    //creamos el texto que se mostrara en el P
    let diapositivaContenidoText = document.createTextNode(diapositiva.contenido)

    //Montamos el texto del contenido dentro del P
    diapositivaContenidoP.appendChild(diapositivaContenidoText)

    //Montamos el P dentro de la diapositiva
    diapositivaDiv.appendChild(diapositivaContenidoP)

    //Creamos un evento de clickDerecho para la diapositiva
    listItemElement.addEventListener('contextmenu', e => {
        e.preventDefault()
        openActionMenu(listItemElement, diapositiva)
    })

    listItemElement.addEventListener('click', e => {
        let prevH1 = document.querySelector('#h1-visor')
        let prevH2 = document.querySelector('#h2-visor')
        let prevP = document.querySelector('#p-visor')

        prevH1?.remove()
        prevH2?.remove()
        prevP?.remove()

        visorDiv.setAttribute('name', diapositiva.id)
        console.log(visorDiv)
        //<h1 contenteditable="true" class="draggable resizable" data-editor="editor-1" id="h1-visor">Título</h1>
        let h1Visor = document.createElement('h1')
        let h2Visor = document.createElement('h2')
        let pVisor = document.createElement('p')

        h1Visor.setAttribute('contenteditable', 'true')
        h1Visor.setAttribute('class', 'draggable resizable')
        h1Visor.setAttribute('data-editor', 'editor-1')
        h1Visor.setAttribute('id', 'h1-visor')
        let tituloh1Visor = document.createTextNode(diapositiva.titulo)
        h1Visor.appendChild(tituloh1Visor)
        visorDiv.appendChild(h1Visor)
        h1Visor.addEventListener('input', (e) => {
            let inputValue = e.target.textContent
            diapositivaTitleH2.textContent = inputValue
        })
        //<h2 contenteditable="true" class="draggable resizable" data-editor="editor-2">Subtítulo</h2>

        h2Visor.setAttribute('contenteditable', 'true')
        h2Visor.setAttribute('class', 'draggable resizable')
        h2Visor.setAttribute('data-editor', 'editor-2')
        h2Visor.setAttribute('id', 'h2-visor')
        let subtituloh2Visor = document.createTextNode(diapositiva.subtitulo)
        h2Visor.appendChild(subtituloh2Visor)
        visorDiv.appendChild(h2Visor)
        h2Visor.addEventListener('input', (e) => {
            let inputValue = e.target.textContent
            diapositivaSubTituloH4.textContent = inputValue
        })
        //<p contenteditable="true" class="draggable resizable" data-editor="editor-3">Contenido</p>

        pVisor.setAttribute('contenteditable', 'true')
        pVisor.setAttribute('class', 'draggable resizable')
        pVisor.setAttribute('data-editor', 'editor-3')
        pVisor.setAttribute('id', 'p-visor')
        let contenidopVisor = document.createTextNode(diapositiva.contenido)
        pVisor.appendChild(contenidopVisor)
        visorDiv.appendChild(pVisor)
        pVisor.addEventListener('input', (e) => {
            let inputValue = e.target.textContent
            diapositivaContenidoP.textContent = inputValue
        })
    })
    //Montamos la diapositiva en miniaturasDiv
    miniaturasDiv.appendChild(listItemElement);
})


// C R E A R - D I A P O S I T I V A S
//Creamos la referencia del button plus
let plusButton = document.querySelector('.plus')

//Creamos la función que agregra una diapositiva vacia al array
let createBlanckDiapositiva = () => {
    let blanckDiapositiva = {
        id: `dm-${diapositivasBase.length + 1}`,
        titulo: `Diapositiva ${diapositivasBase.length + 1}`,
        subtitulo: '',
        contenido: '',
        imagen: '',
        video: '',
        audio: '',
        my_field: '',
        posicion: diapositivasBase.length + 1,
    }
    //Agregamos la nueva diapositiva al array principal
    diapositivasBase.push(blanckDiapositiva)

    //creamos el li
    let liElement = document.createElement('li')
    liElement.setAttribute("id", blanckDiapositiva.id)

    //Creamos el div
    let blanckDiv = document.createElement('div')

    //Crear el titulo
    let tituloH2 = document.createElement('h2')
    let tituloText = document.createTextNode(blanckDiapositiva.titulo)
    tituloH2.appendChild(tituloText)

    //Crear el subtitulo
    let subTituloH4 = document.createElement('h4')
    let subTituloText = document.createTextNode(blanckDiapositiva.subtitulo)
    subTituloH4.appendChild(subTituloText)

    //Crear el contenido
    let contenidoP = document.createElement('p')
    let contenidoText = document.createTextNode(blanckDiapositiva.contenido)
    contenidoP.appendChild(contenidoText)

    //Montamos el titulo, subtitulo y el contenido en el blanckdiv
    blanckDiv.appendChild(tituloH2)
    blanckDiv.appendChild(subTituloH4)
    blanckDiv.appendChild(contenidoP)

    //montamos el blanckdiv en el li
    liElement.appendChild(blanckDiv)

    //Creamos un evento de clickDerecho para la diapositiva
    liElement.addEventListener('contextmenu', e => {
        e.preventDefault()
        openActionMenu(liElement, blanckDiapositiva)
    })
    liElement.addEventListener('click', () => {

    })

    //Montamos el li en el contendor de todas las diapositivas
    miniaturasDiv.appendChild(liElement)
}


//Creamos el evento click al boton de plus para ejecutar nuestra función createBlanckDiapositiva
plusButton.addEventListener('click', createBlanckDiapositiva)

let openActionMenu = (liNode, diapositiva) => {

    //Crear un div que servira como menu de acciones
    let menu = document.createElement('div')
    menu.setAttribute('class', 'menu')

    //creamos un boton para cancelar todo y asi cerrar el menu de acciones
    let BtnCancel = document.createElement('button')
    BtnCancel.textContent = 'Cancel'
    BtnCancel.setAttribute('class', 'btnCancel')
    BtnCancel.addEventListener('click', e => {
        e.preventDefault()
        menu.remove()
    })
    //montamos el boton en el menu
    menu.appendChild(BtnCancel)

    //Crear un boton para eliminar la diapositiva
    let BtnDelete = document.createElement('button')
    BtnDelete.textContent = 'Delete'
    BtnDelete.setAttribute('class', 'btnDelete')
    //montamos el boton en el menu
    BtnDelete.addEventListener('click', e => {
        e.preventDefault()
        deleteOneSpecificDiapositiva(diapositiva)
    })
    menu.appendChild(BtnDelete)


    liNode.appendChild(menu)
}

let deleteOneSpecificDiapositiva = (diapositaToDelete) => {

    //Codigo para eliminar la diapositiva del arr y para eliminarla dle DOM
    let newArrOfDiapositivas = diapositivasBase.filter(diapositiva => diapositiva.id != diapositaToDelete);
    diapositivasBase = newArrOfDiapositivas;
    let nodeToDelete = document.querySelector(`#${diapositaToDelete.id}`)
    nodeToDelete.remove()
}
