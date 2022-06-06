fetch("shows.json")
.then((res) => res.json())
.then( res => cardGenerator(res));

const cardRoot = document.getElementById("cards");

const createElements = () => {
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const genre = document.createElement("p");
    const date = document.createElement("span");
    const buyBtn = document.createElement("button");

    return [card, title, genre, date, buyBtn];
} 

const cardGenerator = (arr) => {
    arr.forEach(show => {
        const [card, title, genre, date, buyBtn] = createElements();

        buyBtn.innerText = `Buy ticket for ${show.nombre}`;
        buyBtn.classList.add("btn");
        buyBtn.addEventListener("click", () => {
            const {id} = show;
            buttonId(id);
        });

        title.append(show.nombre);
        genre.append(show.genero);
        date.append(show.fecha);

        card.append(title, genre, date, buyBtn);
        card.classList.add("card", "p-3", "w-50", "h-50");
        cardRoot.append(card);
    });
}

const buttonId = (id) => {
    window.sessionStorage.setItem("Selected", id);
    window.location.assign("./show.html");
}

const buttons = document.querySelectorAll("#filters > button");

function filterShow(genre) {
    const arr = Array.from(cardRoot.children);

    arr.forEach(card => {
        if (genre === "Todos"){
            card.classList.remove("d-none");
            return
        }

        const cardGenre = card.querySelector("p").innerText;
        card.classList.toggle("d-none", cardGenre !== genre);

    })
}
buttons.forEach( button => {
    button.addEventListener("click", (e) => {
        const {innerText} = e.target;
        filterShow(innerText);
    })
});