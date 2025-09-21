let getForm = document.getElementById("form")
let getUserchoice = document.getElementById("get-user-choice")
let showJoke = document.getElementById("show-jokes")
let hideElement = document.getElementById("hide-when-click")
let copyJoke = document.getElementById("copy-joke")
let createp1 = document.createElement("p")
let createp2 = document.createElement("p")
copyJoke.hidden = true

function showJokes(memeques, memeans) {
    
    hideElement.hidden = true
    
    if(memeques === undefined || memeans === undefined) {
        createp1.textContent = `Joke not Found!`
        createp2.textContent = `Joke not Found!`
        copyJoke.hidden = true
    } else {
        createp1.textContent = `${memeques}`
        createp2.textContent = `${memeans}`
        copyJoke.hidden = false
    }

    copyJoke.textContent = "Copy"
    
    showJoke.insertAdjacentElement("beforeend", createp1)
    showJoke.insertAdjacentElement("beforeend", createp2)
    
}


copyJoke.addEventListener("click", function(e) {
    e.preventDefault()

    copyJoke.textContent = "Copied!"

    setTimeout(() => {
       copyJoke.textContent = "Copy"
    }, 2000)

    let convertOnetext = `${createp1.textContent} ${createp2.textContent}`

    navigator.clipboard.writeText(convertOnetext)

})

async function getJoke(uservalue) {

    let query;
    
    if(uservalue === "Choose") {
        query = "Any"
    } else {
        query = `${uservalue}`
    }

    fetch(`https://v2.jokeapi.dev/joke/${query}?blacklistFlags=religious`)
    .then((response) => {
        if(!response) {
            throw new Error("api limit is full")
        }
        return response.json()
    })
    .then((data) => {
        console.log(data.setup, data.delivery);

        showJokes(data.setup, data.delivery) 
    })
    .catch((error) => {
        throw new Error("Failed to fetch data", error)
    })
}

getForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let getValue = getUserchoice.value

    getJoke(getValue)
    
})