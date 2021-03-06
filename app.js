
const formulario = document.getElementById('formulario');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const input = document.getElementById('input')
const fragment = document.createDocumentFragment();

let tareas = {

}

//importante para mantener la informacion en localstorage
document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})
formulario.addEventListener('submit', e => {
    e.preventDefault()
    setTarea(e)
})
listaTarea.addEventListener('click', e => {
    btnAccion(e)
})
const setTarea = e =>{
    if (input.value.trim() === ''){
        console.log('esta vacio')
        return
    }

    const tarea={
        id:Date.now(),
        texto: input.value,
        estado: false
    }

    tareas[tarea.id] = tarea
     console.log(tareas)
     formulario.reset()
     input.focus()
     pintarTareas()
}

const pintarTareas = () => {
    //guardar en localStorage

    localStorage.setItem('tareas', JSON.stringify(tareas))

    //para mostrar mensaje si no hay tareas pendientes
    if(Object.values(tareas).length === 0){
        listaTarea.innerHTML = ` <div class="alert alert-dark text-center"> 
        No hay tareas pendientes
    </div>`
        return
    }
    listaTarea.innerHTML = ''
  Object.values(tareas).forEach(tarea =>{
      const clone = template.cloneNode(true)
      clone.querySelector('p').textContent = tarea.texto
 //clone del template para no usar el original
      if(tarea.estado){
          clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
          clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
          clone.querySelector('p').style.textDecoration = 'line-through'
      }
      clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
      clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
      fragment.appendChild(clone)
  })
  listaTarea.appendChild(fragment)
}

//funcionalidad de los botones
const btnAccion = e => {
    if (e.target.classList.contains('fa-check-circle')){ 
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
        console.log(tareas)
    }
    if (e.target.classList.contains('fa-minus-circle')){
     delete tareas[e.target.dataset.id]
     pintarTareas()
    }

    if (e.target.classList.contains('fa-undo-alt')){ 
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}