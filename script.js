const board= document.querySelector(".board");

const blockheight= 50 ;
const blockwidth= 50 ;

let intervalId=null;

const column= Math.floor(board.clientWidth/blockwidth) ;
const row= Math.floor(board.clientHeight/blockheight) ;

let scoreElement= document.querySelector("#score");
let highscoreElement= document.querySelector("#highscore");
let timeElement= document.querySelector("#timer");

let score=0;
let highscore=0;

const blocks=[]
const snake=[{x:2,y:14}];

let food={x:Math.floor(Math.random()*row),y:Math.floor(Math.random()*column)};

let direction="left";

let seconds = 0;
setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timeElement.textContent = `time : ${m}-${s}`;
  }, 1000);

for(let i=0;i<row;i++){
    for(let j=0;j<column;j++){
        const block=document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${i},${j}`]=block;
    }
}

function render(){

    blocks[`${food.x},${food.y}`].classList.add("food");

      let head=null;
    if(direction==="left"){
        head={x:snake[0].x,y:snake[0].y-1};}
    else if(direction==="right"){
        head={x:snake[0].x,y:snake[0].y+1};}
    else if(direction==="up"){
        head={x:snake[0].x-1,y:snake[0].y};}
    else if(direction==="down"){
        head={x:snake[0].x+1,y:snake[0].y};}

   
    if(head.x<0 || head.x>=row || head.y<0 || head.y>=column){
        alert("Game Over");
        clearInterval(intervalId); 
    }

    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food={x:Math.floor(Math.random()*row),y:Math.floor(Math.random()*column)};
        snake.unshift(head);

        score+=10;
        scoreElement.textContent = score;
        if(score > highscore){
            highscore = score;
            highscoreElement.textContent = highscore;
        }
            return;
    }

    snake.forEach(segment =>{
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    })

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment =>{
        blocks[`${segment.x},${segment.y}`].classList.add("fill");
    })
};

intervalId=setInterval(()=>{
    render();
},500);


document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft" && direction!=="right"){
        direction="left";   }
    else if(e.key==="ArrowRight" && direction!=="left"){
        direction="right";   }
    else if(e.key==="ArrowUp" && direction!=="down"){
        direction="up";   }
    else if(e.key==="ArrowDown" && direction!=="up"){
        direction="down";   }  
    });
