const board= document.querySelector(".board");

const blockheight= 30 ;
const blockwidth= 30 ;

const column= Math.floor(board.clientWidth/blockwidth) ;
const row= Math.floor(board.clientHeight/blockheight) ;

for(let i=0;i<row*column;i++){
    const block=document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
}