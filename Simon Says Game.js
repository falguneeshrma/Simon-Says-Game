let gameSeq = [];
let userSeq = [];

let highScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if (started == false){
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash")
    }, 250);
}
    
function levelUp(){
    h2.innerText = `Highest Score: ${highScore}`;
    userSeq = [];
    level++;
    setTimeout(function(){
        h2.innerText = `Level ${level}`;
    }, 1000)
    

    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor)
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameFlash(randomBtn);

    if(level > highScore){
        highScore = level;
    }

}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000)   
        }
    }
    else{
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        setTimeout(function(){
            h2.innerHTML = `GAME OVER! Scored: <b>${level}</b> </br> Highest Score: ${highScore}</br>  Press any key to start again...`;
        }, 1000)


        reset();

    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor =btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")
for( btn of allBtns){   
    btn.addEventListener("click", btnPress)
}


function reset(){
    started = false;

    gameSeq = [];

    userSeq = [];

    level = 0;
}