// Tomamos los datos mediante fetch, en este caso de un arc JSON ubicado en el proyecto.
// Estos datos, los cuales estaran en forma de array, ya que .json() retorna el contenido en forma de un objeto de JS
// Posteriormente los utilizaremos para generar nuestras cartas
fetch("shows.json")
.then((res) => res.json())
.then( res => showGenerator(res));

const cardRoot = document.getElementById("cards");

// Utilizando foreach, creamos la estructura de carta para cada elementoHTML, ademas del elementoHTML para agregar el contenido de las cartas.
const showGenerator = (arr) => {
    arr.forEach(e => {
        // Creación de elementos HTML.
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const genre = document.createElement("p");
        const date = document.createElement("span");
        //Creación del boton de compras
        const buyBtn = document.createElement("a");
        buyBtn.innerText = `Buy ticket for ${e.nombre}`;
        buyBtn.href = "#0";
        buyBtn.classList.add("btn");
        // Agregando los datos de cada elemento a nuestros elementosHTML
        title.append(e.nombre);
        genre.append(e.genero);
        date.append(e.fecha);
        // Agregando las piezas necesarias para formar nuestra carta, agregandole la clase carta y agregandola finalmente a el contenedor de cartas.
        card.append(title, genre, date, buyBtn);
        card.classList.add("card", "p-3", "w-50", "h-50");
        cardRoot.append(card);
    });
}

// Seleccionamos todos los elementos button que esten en el contenedor con id filters, en este caso 4.
// Nos retornara un nodelist.
const buttons = document.querySelectorAll("#filters > button");

function filterShow(genre) {
    // Tomamos todos los hijos directos de nuestro div cardRoot y los pasamos a un array con Array.from()
    const arr = Array.from(cardRoot.children);
    // Hacemos las comparaciones necesarias con un forEach para comprobar que elementos pasan o no a ser parte del contenedor de cartas.
    arr.forEach(card => {
        if (genre === "Todos"){
            card.classList.remove("d-none");
            return
        }

        const cardGenre = card.querySelector("p").innerText;
        card.classList.toggle("d-none", cardGenre !== genre);

    })
}
// Al ser un nodeList podemos trabajarlo con el metodo forEach, en este caso, al llegar un evento de uno de esos botones, se ejecutara la función filterShow utilizando la data de ese evento, desestructurando hasta llegar a su innerText, finalmente pasado como argumento.
buttons.forEach( button => {
    button.addEventListener("click", (e) => {
        const {innerText} = e.target;
        filterShow(innerText);
    })
});

