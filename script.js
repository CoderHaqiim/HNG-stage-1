const colorBox = document.querySelector('#color-box');
const selectButtons = document.querySelectorAll('.select-btn')
const restartBtn = document.querySelector('#restart-btn')
const restartImg = document.querySelector('#restart-img')
const count = document.querySelector('#count')
const message = document.querySelector('#message')
const buttonColors = new Set()

const predefinedColors = [
    "#f63030","#3a3ac1","#2b6d2b",
    "#880d88","#2582aa","#e18916",
    "#8a84a9","#20381e","#f68e9f"
]

let randomColor;
let score = 0;
let correctGuess;

const reset = () =>{
    randomColor = getRandomColor()
    buttonColors.clear()
    setColorToBox()
    setColorToButtons()
}

function getRandomColor(){
    const randomNumber = Math.floor(Math.random() * predefinedColors.length)
    const choice = predefinedColors[randomNumber]
    return choice
}

function setColorToBox(){
    buttonColors.add(randomColor)
    colorBox.style.backgroundColor = `${randomColor}`
}

function arrayRandomSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function setColorToButtons() {
    while (buttonColors.size < 6) {
        const colorChoice = Math.floor(Math.random() * predefinedColors.length)
        buttonColors.add(predefinedColors[colorChoice])
    }
    const buttonArray = [...buttonColors]
    arrayRandomSort(buttonArray)

    selectButtons.forEach((btn, index) => {
        btn.style.backgroundColor = buttonArray[index];
    });
}

selectButtons.forEach((btn) => {
    btn.addEventListener('mouseout', defaultMessage)
});

function startGame(){
   reset()
}

function restartGame(){
    score = 0
    reset()
    count.textContent = `${score}`
}

function continueGame (){
    reset()
    message.style.display="block"
    score++
    count.textContent = `${score}`
    message.textContent = `Yay! You guessed right 🎉🎉`
    message.style.animation = 'popin .8s'
    setTimeout(()=>{
        message.style.animation = ''
   },500)
}

restartBtn.addEventListener("click",()=>{
    restartImg.style.animation = "spin .8s  linear"
    restartGame()
    setTimeout(()=>{
        restartImg.style.animation = 'none'
    },500)
})

function gameLogic(btn){
    const boxColor = getComputedStyle(colorBox, null).getPropertyValue('background-color')
    const btnStyles = getComputedStyle(btn, null).getPropertyValue('background-color')
    
    if(btnStyles === boxColor){
        continueGame()
    }else{
        message.style.display="block"
        message.textContent = `Wrong guess, try again ❌`
        message.style.animation = 'fadein .8s'
        setTimeout(()=>{
             message.style.animation = ''
        },500)
    }
}

function defaultMessage(){
    message.textContent = "Play the color match game!"
}



selectButtons.forEach(btn => {
    btn.addEventListener('click',()=>{
        gameLogic(btn)
    })
})

startGame()

