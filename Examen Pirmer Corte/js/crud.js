
btnRegistro.addEventListener('click',()=>{accion()})
btnInicio.addEventListener('click',()=>{accion2()})

function accion(){
   AbrirRegistro();
}

function accion2(){
AbrirIncio();
}

function AbrirRegistro(){
    cont.innerHTML =  `<iframe class="Inicio" src="Inicio.html" ></iframe>`;
}

function AbrirIncio(){
    cont.innerHTML =  `<iframe class="Inicio" src="Presentacion.html" ></iframe>`
}

let listElements = document.querySelectorAll('.list__button--click');

listElements.forEach(listElement => {
    listElement.addEventListener('click', ()=>{
        
        listElement.classList.toggle('arrow');

        let height = 0;
        let menu = listElement.nextElementSibling;
        if(menu.clientHeight == "0"){
            height=menu.scrollHeight;
        }

        menu.style.height = `${height}px`;

    })
});