fetch('https://raw.githubusercontent.com/dkand-i/wordle/main/words_alpha.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(textData => {


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// TO DO
// better dictionary list
// make shareable

// DEFINING INITIAL/HTML VARIABLES
let letters = document.getElementsByClassName('letter')
let boxes = document.getElementsByClassName('box');
let gameOn = false
let guesses = [0,0,0,0,0,0,0]
let word = null
let keybackgrounds = document.getElementsByClassName('key')
let keys = document.getElementsByClassName('keyletter')

// GETTING WORD LIST
let wordList = textData.split('\n')
let words = []
for (let i = 0; i < wordList.length; i++) {
    let w = wordList[i].substr(0,wordList[i].length-1)
    if (w.length == 5) {
        words.push(w.toUpperCase())
    }
}

// FILLING KEYBOARD
let qwerty = 'QWERTYUIOPASDFGHJKL ZXCVBNM '
for (let i=0; i < qwerty.length; i++) {
    if (keys[i].innerHTML == '') {
        keys[i].innerHTML = qwerty[i]
    }
}




// STARTING NEW GAME
function newGame() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = 'white';
        boxes[i].style.borderColor = 'lightGray'
        letters[i].style.color = 'black'
        letters[i].innerHTML = '';
    }
    for (let i = 0; i < keys.length; i++) {
        keybackgrounds[i].style.backgroundColor = 'white'
        keybackgrounds[i].style.borderColor = 'gray'
        keys[i].style.color = 'black'
    }
    document.getElementById('endgame').style.display = 'none'
    document.getElementById('keyboard').style.display = 'block'
    document.getElementById('choose').value = ''
    guesses = [0,0,0,0,0,0,0]
    gameOn = true
}
function randomWord() {
    if (gameOn == false){
        newGame()
        word =  words[Math.floor(Math.random()*words.length)]
        // document.getElementById('random').innerHTML = `${word}`
    }
    
}
function clearWord() {
    if (document.getElementById('choose').value == 'Choose your own word') {
        document.getElementById('choose').value = ''
    }
}
function chooseWord(e) {
    let myValue = document.getElementById('choose').value
    if (gameOn == false && `${e.key}` == 'Enter' && myValue.length == 5){
        word = document.getElementById('choose').value.toUpperCase()
        newGame()
    }
}



// WORD TEST FUNCTION
function notAWordGone() {
    document.getElementById('notword').style.display = 'none'
}
function notAWord() {
    document.getElementById('notword').style.display = 'block'
    setTimeout(notAWordGone,1600)
}

function word_test(word,line) {

    for (let i = line - 5; i < line; i++) {
        letters[i].style.color = 'white'

        if (letters[i].innerHTML == word[i-(line-5)]) {
            boxes[i].style.backgroundColor = 'darkOrchid'
            boxes[i].style.borderColor = 'darkOrchid'
        } else if (word.includes(letters[i].innerHTML)) {
            boxes[i].style.backgroundColor = 'lightPink'
            boxes[i].style.borderColor = 'lightPink'
        } else {
            boxes[i].style.backgroundColor = 'lightGray'
        }
    }
    for (let i=0; i < keys.length; i++) {
        for (let k=0; k < letters.length; k++) {
            if (keys[i].innerHTML == letters[k].innerHTML) {
                keybackgrounds[i].style.backgroundColor = boxes[k].style.backgroundColor
                keybackgrounds[i].style.borderColor = boxes[k].style.backgroundColor
                keys[i].style.color = 'white'
            }
        }
    }
    
}



// CHECK FOR WIN
function doIWin(word,line) {
    let win = true
    for (let i = line - 5; i < line; i++) {
        if (letters[i].innerHTML != word[i-(line-5)]) {
            win = false
        }
    } if (win) {
        return 1
    } 
}



// TYPING FUNCTION
function write(e) {
    alphabet = "abcdefghijklmnopqrstuvwxyz"   
    if (gameOn == true) {        
        let i = 30
        for (let k = 0; k < letters.length; k++) {
            if (letters[k].innerHTML == "") {
                i = k
                break
            }
        }
        if (`${e.key}` == 'Backspace' && boxes[i-1].style.backgroundColor == 'white') {
            letters[i-1].innerHTML = ""
        } else if ((i != 0 && i%5 == 0 && guesses[i/5] == 0) || i == 30) {
            if (`${e.key}` == 'Enter') {
                let guess = letters[i-5].innerHTML + letters[i-4].innerHTML + letters[i-3].innerHTML + letters[i-2].innerHTML + letters[i-1].innerHTML
                if (words.includes(guess.toUpperCase()) || guess == word) {
                    guesses[i/5] = 1
                    word_test(word,i)
                    if (doIWin(word,i) || (!doIWin(word,i) && i==30)) {
                        gameOn = false
                        document.getElementById('endgame').style.display = 'block'
                        document.getElementById('win').style.display = 'block'
                        document.getElementById('keyboard').style.display = 'none'
                        document.getElementById('choose').value = 'Choose your own word'
                        if (!doIWin(word,i) && i==30) {
                            document.getElementById('winp').innerHTML = `${word}`
                        } else {
                            document.getElementById('winp').innerHTML = 'You win!'
                        }
                    } 
                } else {
                    notAWord()
                }
            }    
        } else if (alphabet.includes(`${e.key}`)) {
            letters[i].innerHTML = `${e.key}`.toUpperCase()
        } 
    }
}
function keyboardType(a) {
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"   
    if (gameOn == true) {
        let i = 30
        for (let k = 0; k < letters.length; k++) {
            if (letters[k].innerHTML == "") {
                i = k
                break
            }
        }
        if (a == 'Back' && boxes[i-1].style.backgroundColor == 'white') {
            letters[i-1].innerHTML = ""
        } else if ((i != 0 && i%5 == 0 && guesses[i/5] == 0) || i == 30) {
            if (a == 'Enter') {
            let guess = letters[i-5].innerHTML + letters[i-4].innerHTML + letters[i-3].innerHTML + letters[i-2].innerHTML + letters[i-1].innerHTML
                if (words.includes(guess.toUpperCase()) || guess==word) {
                    guesses[i/5] = 1
                    word_test(word,i)
                    if (doIWin(word,i) || (!doIWin(word,i) && i==30)) {
                        gameOn = false
                        document.getElementById('endgame').style.display = 'block'
                        document.getElementById('win').style.display = 'block'
                        document.getElementById('keyboard').style.display = 'none'
                        document.getElementById('choose').value = 'Choose your own word'
                        if (!doIWin(word,i) && i==30) {
                            document.getElementById('win').innerHTML = `${word}`
                        } else {
                            document.getElementById('win').innerHTML = 'You win!'
                        }
                    } 
                } else {
                    notAWord()
                }
                
            }    
        } else if (alphabet.includes(a)) {
            letters[i].innerHTML = a
        } 
    }
}




function main(){
    document.getElementById('choose').addEventListener('click',clearWord)
    document.getElementById('random').addEventListener('click',randomWord)
    document.body.addEventListener('keyup',write)
    document.getElementById('choose').addEventListener('keyup',chooseWord)
    for (let i = 0; i < keys.length; i++) {
        keybackgrounds[i].addEventListener('click',function() {
            keyboardType(keys[i].innerHTML)
        })
    }
}
main()

















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});



