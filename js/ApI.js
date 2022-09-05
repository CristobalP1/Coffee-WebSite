const cards = document.querySelector('.cards');


document.addEventListener('DOMContentLoaded',()=>{
    axiosUpdate()
})

const axiosUpdate = () => {
    axios.get("https://res-api-educacion.herokuapp.com/")
    .then((res)=>{
        data = res.data[0].productos
        printCard(data)
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}



const printCard = (data) => {



    data.forEach(el => {
        const row = document.createElement('div');
        row.innerHTML = `
        <div class="card">
            <img src="${el.thumbnailUrl}" class="img__card" alt="coffee">
            <div class="info-card">
                <h4>${el.title}</h4>
                <p>${el.marca}</p>
                <img src="./img/estrellas.png" alt="">
                <div class="precios">
                    <p class="precio">$${el.precio}</p>
                    <span class="span">$${el.precioAntes}</span>
                </div>
                <a href="#" class="agregar-carrito buttom btn-card">Agregar al carrito</a>
            </div>
        </div>
        `
        row.classList.add('frame-card');

        cards.appendChild(row);

    });

}
