const carrito = document.getElementById('carrito');
const cafes = document.getElementById('lista-cafe');
const listasCafes = document.querySelector('tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const countCart = document.querySelector('.count-Cart');
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

cargarEventListener();

function cargarEventListener () {
    cafes.addEventListener('click', comprarCafe)
    carrito.addEventListener('click', eliminarCafe);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
    countCart.textContent = 0;
}

function countListCart(){
    let contCart = listasCafes.children.length;
    if (contCart === 0) {
        contCart = 0;
    }
    countCart.textContent = contCart;
}

span.onclick = function() {
    modal.style.display = "none";
  }

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let header = document.querySelector('.header');
  
    if (scrollPosition > 100) {
      header.style.opacity= '0.7';
    } else {
        header.style.opacity= '1';

    }
  });


function comprarCafe(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cafe = e.target.parentElement.parentElement;
        leerDatosCafe(cafe);
    }
}

function leerDatosCafe(cafe){
    const infoCarro = {
        img: cafe.querySelector('img').src,
        tittle: cafe.querySelector('h4').textContent,
        precio: cafe.querySelector('.precio').textContent,
        id: cafe.querySelector('a').getAttribute('date-id'),
    }

    insertarCarrito(infoCarro);
    countListCart();
}

function insertarCarrito(cafe){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td class="td__img"><img src="${cafe.img}" width=100>${cafe.tittle}</td>
    <td>${cafe.precio}</td>
    <td>
        <a href="#" class="borrar-cafe" data-id="${cafe.id}">X</a>
    </td>
    `;
    row.classList.add('linea2');
    listasCafes.appendChild(row)
    guardarCafeLocalStorage(cafe);
    modal.style.display = "block";
}

function eliminarCafe(e){
    e.preventDefault();

    let cafe,
    cafeId
    if (e.target.classList.contains('borrar-cafe')) {
        e.target.parentElement.parentElement.remove();
        cafe = e.target.parentElement.parentElement;
        cafeId = cafe.querySelector('a').getAttribute('data-id');
    }
    eliminarCafeLocalStorage(cafeId);
    countListCart()
}

function vaciarCarrito(){
    while(listasCafes.firstChild){
        listasCafes.removeChild(listasCafes.firstChild);
    }

    vaciarLocalStorage();
    countListCart()
    return false;
}

function guardarCafeLocalStorage(cafe){
    let cafes;
    cafes = obtenerCafesLocalStorage();
    cafes.push(cafe);
    localStorage.setItem('cafe',JSON.stringify(cafes))
}

function obtenerCafesLocalStorage(){
    let cafesLS;

    if (localStorage.getItem('cafes') === null) {
        cafesLS = [];
    }else{
        cafesLS = JSON.parse(localStorage.getItem('cafes'));
    }

    return cafesLS;
}

function leerLocalStorage(){
    let cafesLS;

    cafesLS = obtenerCafesLocalStorage();

    cafesLS.forEach(cafe => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${cafe.img}">
        </td>
        <td>${cafe.tittle}</td>
        <td>${cafe.precio}</td>
        <td>
            <a href="#" class="borrar-cafe" data-id="${cafe.id}">X</a>
        </td>
        `;
        listasCafes.appendChild(row);
    });

}

function eliminarCafeLocalStorage(cafe){
    let cafesLS;

    cafesLS = obtenerCafesLocalStorage();

    cafesLS.forEach(function(cafesLS,index){
        if (cafesLS.id === cafe) {
            cafesLS.splice(index,1)
        }
    });

    localStorage.setItem('cafes',JSON.stringify(cafesLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}

//1:39:02