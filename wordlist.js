let arr
let wordle_words = []

fetch("https://www.mit.edu/~ecprice/wordlist.10000")
  .then((res) => res.text())
  .then((text) => {
    // do something with "text"
    arr = text.split("\n")
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length == 5) {
            wordle_words.push(arr[i])
        } 
    }
   })
  .catch((e) => console.error(e));

console.log(`${wordle_words[10]}`)