const cards = document.querySelectorAll(".card");
const timerElement = document.getElementById("timer")
const resetButton = document.querySelector("reset-btn")
const matchedCardsElement = document.getElementById("matched-cards")
const mismatchedCardsElement = document.getElementById("mismatched-cards")

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let mismatchedCard = 0;
let timerStarted = false;
let timerInterval;
let elapsedTime = 0;
const timerDuration = 30;

function startTimer() {
    timerStarted = true;
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerElement.textContent = `Timer: ${elapsedTime}seconds`;

        if (elapsedTime >= timerDuration) {
            stopTimer();
            alert("Time's up! Game over!")
            disableDeck = true;
        } 
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval);
    timerStarted = false;
}

function updateMatchedCardsCount() {
    matchedCardsElement.textContent = `Matched: ${matchedCard}`
}
function updateMismatchedCardsCount() {
    mismatchedCardsElement.textContent = `Mismatched: ${mismatchedCard}`
}

if (!timerStarted) {
    disableDeck = false;
    shuffleCard();
}

function resetGame() {
    stopTimer();
    elapsedTime = 0;
    timerElement.textContent = "Timer: 0 seconds";
    shuffleCard();
}



function flipCard(e) {
    if (!timerStarted) {
        startTimer();
    }
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip")
        if (!cardOne) {
            return cardOne = clickedCard
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        updateMatchedCardsCount();
        if (matchedCard === 8) {
            setTimeout(() => {
                stopTimer(30);
                alert("Congratulations! You've won the game!")
                resetGame();
                return shuffleCard();
            }, 1000)
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    } else {
        mismatchedCard++;
        updateMismatchedCardsCount();

        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake")
        }, 400);
        
        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false
        }, 1200);
    
    }
}
    
function shuffleCard() {
    matchedCard = 0;
    mismatchedCard = 0;
    updateMatchedCardsCount();
    updateMismatchedCardsCount();
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, index) => {
        card.classList.remove("flip")
        let imgTag = card.querySelector("img")
        imgTag.src = `images/img${arr[index]}.jpg`
        card.addEventListener("click", flipCard)
    })
}
shuffleCard();

cards.forEach(card => {
    
    card.addEventListener("click", flipCard);
});