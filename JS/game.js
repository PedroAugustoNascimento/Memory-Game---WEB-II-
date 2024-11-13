const grid = document.querySelector('.grid');
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

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const createCard = (letter)=>{
     const card = createElement('div','card');
     const front = createElement('div','face front');   
     const back = createElement('div','face back');
    
     console.log('Criando carta: ',letter.value);
     front.innerHTML = letter.value;
     front.dataset.id = letter.id;
     front.dataset.value = letter.value;
     

     card.appendChild(front);
     card.appendChild(back);

     return card;
}

const loadGame = () => {
    const lettersRand  = shuffle([...letters]);
    const lettersRand2 = shuffle([...letters]);
    const duplicateLetters = [...lettersRand, ...lettersRand2];

    duplicateLetters.forEach((letter)=>{

        const card = createCard(letter);
        grid.appendChild(card);

    });
}

const shuffle = (array) =>{
    for (let i = array.length - 1; i > 0; i--) {
        // Gera um índice aleatório entre 0 e i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Troca os elementos de índices i e j
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.slice();
    }

loadGame();