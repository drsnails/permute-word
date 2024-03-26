'use strict'

const ALPHABET_MAP = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
    8: 'i',
    9: 'j',
    10: 'k',
    11: 'l',
    12: 'm',
    13: 'n',
    14: 'o',
    15: 'p',
    16: 'q',
    17: 'r',
    18: 's',
    19: 't',
    20: 'u',
    21: 'v',
    22: 'w',
    23: 'x',
    24: 'y',
    25: 'z',
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
    'i': 8,
    'j': 9,
    'k': 10,
    'l': 11,
    'm': 12,
    'n': 13,
    'o': 14,
    'p': 15,
    'q': 16,
    'r': 17,
    's': 18,
    't': 19,
    'u': 20,
    'v': 21,
    'w': 22,
    'x': 23,
    'y': 24,
    'z': 25
}


var gLastWord
var gLastEl
var gIntervalId

function onInit() {
    centerWords()
    document.body.classList.remove('hide')
    window.addEventListener('resize', centerWords)
}

function permuteWord(elWord) {
    let word = elWord.innerText
    gLastWord = word
    gLastEl = elWord
    clearInterval(gIntervalId)
    gIntervalId = setInterval(() => {
        word = permute(word)
        elWord.innerText = word
    }, 1);
}


function unPermuteWord() {
    clearInterval(gIntervalId)
    gLastEl.innerText = gLastWord
    gLastWord = null
    gLastEl = null
}


function permute(word) {

    const newWordLetters = []
    let isLooped = true
    for (var i = word.length - 1; i >= 0 && isLooped; i--) {
        let letter = word[i]
        if (!isLetter(letter)) {
            newWordLetters.unshift(letter)
            continue
        }
        const isCapital = isCapitalLetter(letter)
        if (isCapital) letter = letter.toLowerCase()

        const newLetterIdx = ALPHABET_MAP[letter] + 1
        const newLetter = ALPHABET_MAP[newLetterIdx] || 'a'
        newWordLetters.unshift(isCapital ? newLetter.toUpperCase() : newLetter)

        isLooped = false
        if (newLetterIdx > 25) {
            isLooped = true
        }
    }

    return word.substring(0, i + 1) + newWordLetters.join('')
}



function isCapitalLetter(letter) {
    if (typeof letter !== 'string' || letter.length !== 1) {
        return false;
    }
    const charCode = letter.charCodeAt(0);
    return charCode >= 65 && charCode <= 90;
}

function isLetter(char) {
    return /[a-zA-Z]/.test(char)
}


function centerWords() {
    const elWords = document.querySelectorAll('.permute span')
    elWords.forEach(elWord => {
        const wordRect = elWord.getBoundingClientRect()
        const elPermute = elWord.parentElement
        elPermute.style.left = (window.innerWidth - wordRect.width) / 2 + 'px'
    })
}
