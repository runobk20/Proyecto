const showId = window.sessionStorage.getItem("Selected");

fetch("./shows.json")
.then(res => res.json())
.then(data => {
   const selectedShow = data.find(show => show.id === showId);
   renderShow(selectedShow);
})

const renderShow = (show) => {
    const [banner, title, genre, date] = renderItems();
    title.innerText = show.nombre;
    genre.innerText = show.genero;
    date.innerText = show.fecha;

    /* banner.id = show.id; */
    // Setea un atributo HTML
    banner.setAttribute("id", show.id);
    banner.append(title, genre, date);
    
    const bannerRoot = document.getElementById("show");
    bannerRoot.appendChild(banner);
}



function renderItems() {
    const banner = document.createElement("div");
    const title = document.createElement("h2");
    const genre = document.createElement("p");
    const date = document.createElement("span");

    return [banner, title, genre, date];
}