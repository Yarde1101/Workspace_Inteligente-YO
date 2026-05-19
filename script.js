const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const botonesFiltro = document.querySelectorAll("[data-filtro]");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

let filtroActual = sessionStorage.getItem("filtro") || "todas";

function guardarTareas(){
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas(){

    listaTareas.innerHTML = "";

    let tareasFiltradas = tareas;

    if(filtroActual === "pendientes"){
        tareasFiltradas = tareas.filter(t => !t.completada);
    }

    if(filtroActual === "completadas"){
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    tareasFiltradas.forEach((tarea, index) => {

        const li = document.createElement("li");

        if(tarea.completada){
            li.classList.add("completada");
        }

        li.innerHTML = `
            <span>${tarea.texto}</span>

            <div>
                <button onclick="completarTarea(${index})">✔</button>
                <button onclick="eliminarTarea(${index})">❌</button>
            </div>
        `;

        listaTareas.appendChild(li);

    });

}

btnAgregar.addEventListener("click", () => {

    const texto = inputTarea.value.trim();

    if(texto === ""){
        return;
    }

    const nuevaTarea = {
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);

    guardarTareas();

    mostrarTareas();

    inputTarea.value = "";

});

function completarTarea(index){

    tareas[index].completada = !tareas[index].completada;

    guardarTareas();

    mostrarTareas();

}

function eliminarTarea(index){

    tareas.splice(index, 1);

    guardarTareas();

    mostrarTareas();

}
botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        filtroActual = boton.dataset.filtro;

        sessionStorage.setItem("filtro", filtroActual);

        mostrarTareas();

    });

});