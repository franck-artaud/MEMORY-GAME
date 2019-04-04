const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard; 

function flipCard() {
    if (lockboard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        //First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
        hasFlippedCard = false;
        secondCard = this;
        setForMatch();
}

function setForMatch () {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disablecards() : unFlipcards();
}

function disablecards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard ();
}

function unFlipcards() {
    lockboard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard ();
    }, 1500);
}

function resetBoard ()
{
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuttle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener ('click', flipCard));