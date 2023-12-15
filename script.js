const searchBtn = document.getElementById("search-btn");
const container = document.querySelector('.container ul');
const inputWord = document.getElementById("inp-word");
const wordCtr = document.getElementById("wordCtr");
const pronounciationCtr = document.getElementById("pronounciationCtr");
const meaningCtr = document.getElementById("meaningCtr");
const exampleCtr = document.getElementById("exampleCtr");
const synonymsCtr = document.getElementById("synonymsCtr");
const messageCtr = document.querySelector('.message');

const clearPrevious = function (a) {
    inputWord.value = '';
    container.style.display = 'none';
    pronounciationCtr.style.display = 'none';
    pronounciationCtr.closest('li').style.display = 'none';
    meaningCtr.closest('li').style.display = 'none';
    synonymsCtr.closest('li').style.display = 'none';
    exampleCtr.closest('li').style.display = 'none';


    meaningCtr.textContent
        = wordCtr.textContent
        = pronounciationCtr.textContent
        = synonymsCtr.textContent
        = '';

    if (a) {
        messageCtr.textContent = '';

    }
}

const displayData = function (data) {

    container.style.display = 'inline';

    // name
    wordCtr.textContent = data.word.toUpperCase();
    pronounciationCtr.closest('li').style.display = 'inline';

    // pronounciation
    pronounciationCtr.style.display = 'inline';
    pronounciationCtr.textContent = data.phonetic || '';

    // meaning
    meaningCtr.textContent = data.meanings[0].definitions[0].definition;
    meaningCtr.closest('li').style.display = 'flex';

    // synonyms
    console.log(data.meanings[0].synonyms)
    if (data.meanings[0].synonyms?.length) {
        synonymsCtr.textContent = data.meanings[0].synonyms.join(', ');
        synonymsCtr.closest('li').style.display = 'flex';
    }

    // example
    if (data.meanings[0].definitions[0].example) {
        exampleCtr.textContent = data.meanings[0].definitions[0].example;
        exampleCtr.closest('li').style.display = 'flex';
    }
}

const fetchData = async function (word) {
    try {

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error('Sonething went wrong');
        }

        const [data] = await response.json();

        return data;
    } catch (err) {

        messageCtr.textContent = `It's a Invalid Word, enter some another Word`;

    }
}


const getEnteredWord = () => inputWord.value.trim();

const searchWord = function () {
    const word = getEnteredWord();

    if (word === '') {
        messageCtr.textContent = `Enter a word to search`;
        inputWord.focus();
        clearPrevious(false);
        return;
    }

    (async function () {
        const data = await fetchData(word);
        console.log(data);

        if (data) {
            clearPrevious(true);
            displayData(data);
        } else
            clearPrevious(false);

    })();

}

const searchByEnter = function (e) {
    if (e.key === 'Enter')
        searchWord();
}


clearPrevious(true);
searchBtn.addEventListener('click', searchWord);
document.addEventListener('keydown', searchByEnter);