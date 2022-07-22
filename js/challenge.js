const counter = document.getElementById("counter")
const pauseButton = document.getElementById("pause")
const increaseBtn = document.getElementById("plus")
const decreaseBtn = document.getElementById("minus")
const likeButton = document.getElementById("heart")
const submitButton = document.getElementById("submit")
const likesUl = document.querySelector(".likes")
const form = document.querySelector("#comment-form")

let time = 0
let likesCounter = 0
let intervalId = setInterval(increment, 1000)

pauseButton.addEventListener("click", pause)
increaseBtn.addEventListener("click", increment)
decreaseBtn.addEventListener("click", decrement)
likeButton.addEventListener("click", likeNumber)
form.addEventListener("submit", renderForm)


function increment() {
    time++
    counter.innerText = time
}

function decrement() {
    time--
    counter.innerText = time
}

function pause() {
    if (pauseButton.innerText === "pause") {
        clearInterval(intervalId)
        disableButtons(disable = true)
        pauseButton.innerText = "resume"
    }
    else {
        intervalId = setInterval(increment, 1000)
        pauseButton.innerText = "pause"
        disableButtons(disable = false)
    }
}


function disableButtons(boolVal) {
    increaseBtn.disabled = boolVal
    decreaseBtn.disabled = boolVal
    likeButton.disabled = boolVal
    submitButton.disabled = boolVal
}

function likeNumber() {
    const currentNumber = counter.innerText
    const foundLikeElem = document.querySelector(`[data-num="${currentNumber}"]`)

    if (foundLikeElem !== null) {
        modifyExistingLike(foundLikeElem)
    }

    else {
        addNewLike(currentNumber)
    }

}

function modifyExistingLike(foundLikeElem) {
    const foundSpan = foundLikeElem.querySelector("span")
    let numberOfLikes = parseInt(foundSpan.innerText, 10)
    numberOfLikes++
    
    foundLikeElem.innerHTML = `${foundLikeElem.dataset.num} has been liked 
        <span>${numberOfLikes.toString()}</span>
        times`
}


function addNewLike(currentNumber) {
    const likeLi = document.createElement("li")
    likeLi.setAttribute('data-num', currentNumber)
    
    likeLi.innerHTML = `${likeLi.dataset.num} has been liked 
        <span>1</span>
        time`

    likesUl.append(likeLi)
}


function renderForm(event) {
    event.preventDefault()
    const inputComment = event.target["comment-input"].value
    const commentsList = document.querySelector("#list")
    commentsList.innerHTML += `<li>${inputComment}</li>`
}