const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values:{
        hitposition: 0,
        result: 0,
        currentTime: 61,
        lives: 10,
    },
    actions:{
        timerID: null,
        countdownTimerId: null,
    }
}

function countdown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime
    if (state.values.currentTime <= 0){
        clearInterval(state.actions.countdownTimerId)
        clearInterval(state.actions.timerID)
        alert(`Game Over! O tempo acabou. Sua pontuação foi de ${state.values.result} pontos!`)
        location.reload()
    }
}

function playSound(audioName){
    let audio =  new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.08; 
    audio.play();
}


function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitposition = randomSquare.id
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () =>{
            if(square.id === state.values.hitposition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null
                playSound('hit');
            }
            else if(square.id != state.values.hitposition){
                state.values.lives--
                state.view.lives.textContent = state.values.lives
                if(state.values.lives === 0){
                    alert(`Game Over! Suas vidas acabaram. Sua pontuação foi de ${state.values.result} pontos!`)
                    clearInterval(state.actions.countdownTimerId)
                    clearInterval(state.actions.timerID)
                    state.values.lives = 1
                    location.reload()
                }
            }
        } )
    })
}


function main(){
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, 1000)
    state.actions.countdownTimerId = setInterval(countdown, 1000)
    main = function(){}
}




