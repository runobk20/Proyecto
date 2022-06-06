fetch("shows.json")
.then((res) => res.json())
.then( res => {
    fillArray(res)
    fillContainer(shows)
});

const cardRoot = document.getElementById("cards");
const buttons = document.querySelectorAll("#filters > button");
const shows = [];

const fillArray = (arr) => {
    arr.forEach(e => {
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const genre = document.createElement("p");
        const date = document.createElement("span");
        const buyBtn = document.createElement("button");

        buyBtn.innerText = `Buy ticket for ${e.nombre}`;
        buyBtn.classList.add("btn");
        buyBtn.addEventListener("click", () => {
            const {id} = e;
            window.sessionStorage.setItem("Selected", id);
        });
    
        title.append(e.nombre);
        genre.append(e.genero);
        date.append(e.fecha);
    
        card.append(title, genre, date, buyBtn);
        card.classList.add("card");
        shows.push(card);
    });
}

const fillContainer = (arr) => {
    arr.forEach(el => {
        cardRoot.appendChild(el);
    })
}

const filteredShow = (genre) => {

    if(genre === "Todos") {
        cardRoot.innerHTML = "";
        fillContainer(shows);
        return
    }

    const filteredArr = shows.filter((e) => {
        const cardGenre = e.querySelector("p").innerText;
        return cardGenre === genre;
     });
    cardRoot.innerHTML = "";
    fillContainer(filteredArr);
}



buttons.forEach( button => {
    button.addEventListener("click", (e) => {
        const {innerText} = e.target;
        filteredShow(innerText);
    })
});

