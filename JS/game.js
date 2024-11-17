const grid = document.querySelector('.grid');
const timerDisplay = document.getElementById('timer');

const letters = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'D' },
    { id: 5, value: 'E' },
    { id: 6, value: 'F' },
    { id: 7, value: 'G' },
    { id: 8, value: 'H' },
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let first = '';
let second = '';
let locks = false;
let timerInterval;
let timeElapsed = 0;
let timerStarted = false;

const startTimer = () => {
    if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(() => {
            timeElapsed++;
            timerDisplay.textContent = timeElapsed;
        }, 1000);
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    timerStarted = false;
};

const resetTimer = () => {
    stopTimer();
    timeElapsed = 0;
    timerDisplay.textContent = timeElapsed;
};

const checkCard = () => {
    locks = true;
    const firstLetter = first.getAttribute('data-letter');
    const secondLetter = second.getAttribute('data-letter');

    if (firstLetter === secondLetter) {
        first.firstChild.classList.add('matched');
        second.firstChild.classList.add('matched');

        first = '';
        second = '';

        if (endGame()) {
            stopTimer();
        }
    } else {
        setTimeout(() => {
            first.classList.remove('reveal-card');
            second.classList.remove('reveal-card');

            first = '';
            second = '';
        }, 500);
    }
    locks = false;
};

const resetGame = () => {
    document.getElementById('reset-button').addEventListener('click', () => {
        grid.innerHTML = '';

        first = '';
        second = '';
        locks = false;

        resetTimer();

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('reveal-card', 'matched');
        });

        loadGame();
    });
};

const endGame = () => {
    const matched = document.querySelectorAll('.matched');
    if (matched.length === letters.length * 2) {
        alert(`Parabéns! Você finalizou o jogo em ${timeElapsed} segundos.`);
        return true;
    }
    return false;
};

const revealCard = ({ target }) => {
    if (locks) return;

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    startTimer();

    if (first === '') {
        target.parentNode.classList.add('reveal-card');
        first = target.parentNode;
    } else if (second === '') {
        target.parentNode.classList.add('reveal-card');
        second = target.parentNode;
        checkCard();
    }
};

const createCard = letter => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.innerHTML = letter.value;
    front.dataset.id = letter.id;
    front.dataset.value = letter.value;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-letter', letter.value);

    return card;
};

const loadGame = () => {
    grid.innerHTML = '';

    const lettersRand = shuffle([...letters]);
    const lettersRand2 = shuffle([...letters]);
    const duplicateLetters = [...lettersRand, ...lettersRand2];

    duplicateLetters.forEach(letter => {
        const card = createCard(letter);
        grid.appendChild(card);
    });
};

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice();
};

resetGame();
loadGame();
