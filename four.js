mygame = new Game()
 mygame.displayScore()
 
 function play(n){ mygame.play(n); mygame.draw();} 
 
 var c = document.getElementById("newboard")
 var ctx = c.getContext("2d")
 for(i = 0; i < 6; i++) {for(j = 0; j < 7; j++){
 
ctx.beginPath();
ctx.arc(j * 100 + 50, i * 100 + 50, 40, 0, 2 * Math.PI);
ctx.stroke(); 
 
 
 } }  
    
//json save and load minds
//AI is yellow, human is red and plays first
function DicEquals(a,b){
var aux = Object.keys(a)
for(i in aux){
//a and b must have same keys
if(a[aux[i]]!=b[aux[i]])
{ return 0}} return 1}

function dicMax(dic){
var keys = Object.keys(dic)
if(keys.length==0){return 0}
var max = keys[0]
var index = 0
for(i in keys){
if(dic[keys[i]] > max){max = keys[i]; index = i }} return [keys[index],i] }


function dicCopy(dic){
copy = {}
var keys = Object.keys(dic)
for(i in keys){
copy[keys[i]] = dic[keys[i]]
}
return copy
}


function Game(){
this.score = [1,0,0]

this.displayScore = function(){

document.getElementById("number").innerHTML=this.score[0]
document.getElementById("won").innerHTML=this.score[1]
document.getElementById("lost").innerHTML=this.score[2]
}

this.mind = []
//  [[..., [board, move, color],...], winningcolor ]
this.currentGame = [[],""]
this.board = {}

this.clearboard = function(){
for(i = 0; i < 6; i++) {for(j = 0; j < 7; j++){this.board[[j,i]]= 0}}}

this.clearboard()

// match a board to some board in a single stored game
this.findMove = function(game){
for(var j = 0; j < game[0].length; j++){
if(DicEquals(game[0][j][0], this.board)==1){

console.log("found match")
if(game[0][j][2]== game[1]){
return [game[0][j][1],1]

}else{return [game[0][j][1],-1] }}}
return 0}

// extract data on moves for a certain board according to memory (mind)

this.dataMoves = function(){
var data ={}
if(this.mind.length==0){return data}
for(var i = 0; i < this.mind.length; i++){
//create an array which for each game with matching board gives is won or lost
if(this.findMove(this.mind[i],this.board)!=0){
if(!Object.keys(data).includes(this.findMove(this.mind[i],this.board)[0])){
data[this.findMove(this.mind[i],this.board)[0]] = this.findMove(this.mind[i],this.board)[1]
}else{data[this.findMove(this.mind[i],this.board)[0]] 
= data[this.findMove(this.mind[i],this.board)[0]] + this.findMove(this.mind[i],this.board)[1]}
}} return data }

// find favorable move according to mind or else pick random move

this.processMove = function(){

//anticipation comes first


for(var i = 0; i < 7; i++){
if(this.firstrow(i, this.board)!= - 1){
var h = this.firstrow(i, this.board)
var future = dicCopy(this.board)
future[[i,h]] ="yellow"
if(this.win(future) ==1){
return i}}}




for(var i = 0; i < 7; i++){
if(this.firstrow(i, this.board)!= - 1){
var h = this.firstrow(i, this.board)
var future = dicCopy(this.board)
future[[i,h]] ="red"
if(this.win(future) ==1){
return i}}}





if(this.mind.length>0){
var data = this.dataMoves()
var best = dicMax(data)
if (best[1] > 0 && this.firstrow(best[0], this.board)!= - 1){
return best[0]}else{
return this.randomMove()}}

return this.randomMove()

}

this.randomMove = function(){
var choice = Math.round( 6* Math.random())
while(this.firstrow(choice, this.board)==-1){
choice = Math.round( 6* Math.random())
}return choice}

this.firstrow = function(n,board){
for(i = 0; i < 6; i++){
if(board[[n,i]]==0){return i}
}return -1}

this.play = function(n){
var i = this.firstrow(n, this.board)
if(i!=-1){
this.board[[n,i]]= "red"
this.currentGame[0].push([this.board, n,"red"])

if(this.win(this.board) == 1){
this.draw()

alert("You Won !")
this.currentGame[1] ="red"
this.mind.push(this.currentGame)
this.currentGame = [[],""]
this.score[0]++
this.score[1]++
this.displayScore()


this.clearboard()
this.newclear()
return
}


var machine = this.processMove()
var i = this.firstrow(machine, this.board)
this.board[[machine,i]]= "yellow"
this.currentGame[0].push([this.board, n,"yellow"])

if(this.win(this.board) == 1){
this.draw()

alert("You Lost !");
this.currentGame[1] ="yellow"
this.mind.push(this.currentGame)
this.currentGame = [[],""]
this.score[0]++
this.score[2]++
this.displayScore()
this.clearboard()
this.newclear()
}


}

if(this.tie(this.board)==1){

alert("Tie")

this.currentGame = [[],""]
this.score[0]++
this.displayScore()
this.clearboard()
this.newclear()
}

}


this.tie = function(board){

for(var i = 0; i < 7; i++){

if(this.firstrow(i,board)!=-1 ){return 0}

}
return 1
}


this.win = function(board){
// row check

for(j = 0; j < 6; j++){

for(k = 0; k < 4; k++){

if(board[[k,j]]==board[[k+1,j]] &&board[[k+1,j]] ==board[[k+2,j]] && board[[k+2,j]] ==board[[k+3,j]]&&(board[[k,j]]!=0)){
return 1}}
}

//column check
for(j = 0; j < 7; j++){

for(k = 0; k < 3; k++){

if(board[[j,k]]==board[[j, k+1]] &&board[[j, k+1]] ==board[[j, k+2]] &&board[[j, k+2]] ==board[[j,k+3]] &&(board[[j,k]]!=0)  ){
return 1}}
}
//diagonal-down check
for(i = 0; i < 4; i++){

for(j = 0; j < 3; j++){

if(board[[i,3+j]]==board[[i+1, 3+j-1]] &&board[[i+1, 3+j-1]]==board[[i+2, 3+j-2]] && board[[i+2, 3+j-2]]==board[[i+3,3+j-3]] &&(board[[i,3+j]]!=0)){
return 1}
}}
//diagonal-up check
for(i = 0; i < 4; i++){

for(j = 0; j < 3; j++){

if(board[[i,j]]==board[[i+1, j+1]]&&board[[i+1, j+1]]==board[[i+2, j+2]] && board[[i+2, j+2]]==board[[i+3,j+3]]&&(board[[i,j]]!=0)){
return 1}
}}return 0}

this.display = function(){
aux = ""
for(j = 0; j < 6; j++){
for(i = 0; i < 7; i++){

if(this.board[[i,5-j]]!=0){

if(this.board[[i,5-j]]=="red")
{aux = aux.concat("O")}else{
aux = aux.concat("X")}

}else{aux = aux.concat(" ")} }aux = aux +"\n"}

return aux.slice(0,aux.length-1)

}

this.draw = function(){


 var c = document.getElementById("newboard")
 var ctx = c.getContext("2d")
 
 for(j = 0; j < 6; j++) {for(i = 0; i < 7; i++){
 
 
if(this.board[[i,5-j]]!=0){

if(this.board[[i,5-j]]=="red"){ 
 
ctx.beginPath();
ctx.arc(i * 100 + 50, j * 100 + 50, 40, 0, 2 * Math.PI);
ctx.fillStyle="red"
ctx.fill();}else{

ctx.beginPath();
ctx.arc(i * 100 + 50, j * 100 + 50, 40, 0, 2 * Math.PI);
ctx.fillStyle="yellow"
ctx.fill();}

} }  }  }

this.newclear = function(){

 var c = document.getElementById("newboard")
 var ctx = c.getContext("2d")
 ctx.rect(0,0,700,600);
 ctx.fillStyle="blue"
ctx.fill();


 for(i = 0; i < 6; i++) {for(j = 0; j < 7; j++){
 
ctx.beginPath();
ctx.arc(j * 100 + 50, i * 100 + 50, 40, 0, 2 * Math.PI); 
ctx.stroke();

}}

}
}
