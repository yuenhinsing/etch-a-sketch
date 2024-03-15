const gridContainer = document.querySelector(".grid-container");
const colorsContainer = document.querySelector(".colors");
const colors = Array.from(colorsContainer.childNodes).filter(node => node.nodeType === 1);
const densityButton = document.querySelector(".change-density");

/* initial settings */
let color = "black";
let density = 20;
let randomMode = false;
let eraseMode = false;

/* initial grid container  */
addGrid(density);

/* density button event */
densityButton.addEventListener('click', () => {
    let newDensity = prompt("how dense do you want the grids to be? higher number = higher density (10 - 30)")
    if (newDensity === null || !Number.isInteger(parseInt(newDensity))) {
        alert("input is not valid")
    } else if (newDensity > 30) {
        alert("the maximum density is 100")
    } else if (newDensity < 10) {
        alert("the minimum density is 10")
    } else {
        density = newDensity;
        addGrid(density);
    }
})

/* color event */
colors.forEach((item) => {
    item.addEventListener("mouseover", () => {
        if (item.className == "random") {
            randomMode = true;
        } else if (item.className == "erase") {
            eraseMode = true;
        } else {
            color = item.className;
            randomMode = false;
            eraseMode = false;
        }
    });
});

/* add grid function */
function addGrid(density) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    for (let i = 0; i < density; i++) {
        const column = document.createElement("div")
        column.setAttribute("class", "column");

        gridContainer.appendChild(column)
        for (let j = 0; j < density; j++) {
            const grid = document.createElement("div")
            grid.setAttribute("class", "grid")

            grid.style.width = 400/density + "px";
            grid.style.height = 400/density + "px";

            grid.addEventListener("mouseover", () => {
                if (eraseMode) {
                    let opacity = parseFloat(grid.style.opacity || 0);
                    opacity = Math.max(opacity - 0.1, 0);
                    grid.style.opacity = opacity.toString();
                } else {
                    if (randomMode) {
                        color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
                    };
                    grid.style.backgroundColor = color;
                    let opacity = parseFloat(grid.style.opacity || 0);
                    opacity = Math.min(opacity + 0.1, 1);
                    grid.style.opacity = opacity.toString();
                };
            });
            column.appendChild(grid)
        };
    };
};