var arr = [[], [], [], [], [], [], [], [], []]
let numSelected=null;
let flag=0;
let ans_seen=0;
let undo_b=null;
let redo_b=null;
let redo_num=0;

//for timer
// let start_time=.1;
// let time=start_time*60;
// var check=null;

// var timer=document.getElementById('timer');

// function set_timer()
// {
// 	var min=Math.floor(time/60);
// 	var sec=time%60;

// 	sec=sec<10 ? '0'+sec : sec;
// 	timer.innerHTML=`${min}:${sec}`;
// 	time--;

// 	if(time===0)
// 	{
// 		stop_timer()
// 		alert('Time Out !!!');
// 		for(let i=0;i<9;i++)
// 		{
// 			for(let j=0;j<9;j++)
// 			{
// 				board[i][j]=0;
// 			}
// 		}
// 		FillBoard(board);
// 		time=start_time*60;
// 		timer.innerHTML=`${10}:${00}`;
// 	}
// }



//each arr[i][j] pointing to the id-0,1,2,.....,80 respt. the ids of the small box(html)
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
		arr[i][j].addEventListener("click",selectTile);
	}
}


var board = [[], [], [], [], [], [], [], [], []]
var board_copy = [[], [], [], [], [], [], [], [], []]
var ans = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j] //changing inner content of the small box with the no. of board
			}

			else
				arr[i][j].innerText = '';
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');
let RestartPuzzle = document.getElementById('RestartPuzzle');
let SubmitPuzzle = document.getElementById('SubmitPuzzle');
let undo = document.getElementById('undo');
let redo = document.getElementById('redo');


//New Game button -> on clicking the button GetPuzzle , fetching the API that contents the board
GetPuzzle.onclick = function () {
	new_game();
};

//Answer button
SolvePuzzle.onclick = () => {
	ans_seen=1;
	FillBoard(ans);
};

//Restart button -> fill board with old puzzle
RestartPuzzle.onclick = function(){

	if(flag==0) //if new-game button is not placed then return
		return ;
	undo_b=null;
	redo_b=null;
	if(ans_seen==1)
	{
		alert('You have seen the Answer !!!');
		return;
	}
	FillBoard(board_copy);
	if (numSelected != null) {
        numSelected.classList.remove("number-selected");
		numSelected=null;
    }
}
//submit button
SubmitPuzzle.onclick =function()
{
	if(ans_seen==1)
	{
		alert('Can not Submit after watching the Answer !!!');
		return;
	}
	check(board);
	new_game();
}

//Undo
undo.onclick = function()
{
	if(ans_seen)
	{
		return;
	}
	if(undo_b!=null)
	{
		undo_b.innerText='';
	}
}

//Redo
redo.onclick = function()
{
	if(ans_seen)
	{
		return;
	}
	if(redo_b!=null)
	{
		redo_b.innerText=redo_num;
	}
}

function new_game()
{
	flag=1; //to manipulate the digit plate is active only after New Game button is pressed 
	ans_seen=0;//not submited yet
	undo_b=null;
    redo_b=null;
	// undo_stack=[];
	// redo_stack=[];

	 //check=setInterval(set_timer,1000);//calling the set_time() in every second;

	 //removing selected digit plate
	if (numSelected != null) {
        numSelected.classList.remove("number-selected");
		numSelected=null;
    }
		

	//generate a new board
	 generate_board(board,ans);
	 
		
		//making copy of the board to solve it using backtracking
		for(let i=0;i<9;i++)
		{
			for(let j=0;j<9;j++)
			{
				if(board[i][j]!=0)
				{
					arr[i][j].style.color='yellow';
				}
				board_copy[i][j]=board[i][j];
				//ans[i][j]=board[i][j];
			}
		}
		FillBoard(board);
		
}

function generate_board(board,ans)
{
	//randomly select a tiles
	//random() -> generates num [0,1)
	let row=Math.floor(Math.random()*10);
	let col=Math.floor(Math.random()*10);
	let i,j;
	//row or col ==9 is invalid
	if(row==9)
	{
		row=8;
	}
	if(col==9)
	{
		col=8;
	}
	for(i=0;i<9;i++)
	{
		for(j=0;j<9;j++)
		{
			ans[i][j]=0;
			board[i][j]=0;
		}
	}
	let num=Math.floor(Math.random()*10);//placing random no. on that tiles

	//num==0 not possible
	if(num==0)
	 ans[row][col]=num+1;
	else
	 ans[row][col]=num;
	 
	SudokuSolver(ans);

	//creating a board by placing some random board[i][j]==ans[row][col]
	//filling 60 places 
	for(i=0;i<60;i++)
	{
		 row=Math.floor(Math.random()*10);
		 col=Math.floor(Math.random()*10);

		 //as row or col ==9 is invalid
		 if(row==9)
		 {
			 row=8;
		 }
		 if(col==9)
		 {
			 col=8;
		 }

		 board[row][col]=ans[row][col];
	}

	
}

//solve puzzle using backtracking
function SudokuSolver(board) {
	if(solve(board)==false)
	{
		alert("Puzzle Can't Be Solved !!!");
	}
	
}

//adding event to the digit plate
document.getElementById('0-1').addEventListener("click",selectNumber);
document.getElementById('0-2').addEventListener("click",selectNumber);
document.getElementById('0-3').addEventListener("click",selectNumber);
document.getElementById('0-4').addEventListener("click",selectNumber);
document.getElementById('0-5').addEventListener("click",selectNumber);
document.getElementById('0-6').addEventListener("click",selectNumber);
document.getElementById('0-7').addEventListener("click",selectNumber);
document.getElementById('0-8').addEventListener("click",selectNumber);
document.getElementById('0-9').addEventListener("click",selectNumber);

//to select number from digit plate
function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

//to fill the board
function selectTile() {

	if(flag==0) //if new-game button is not placed then return
		return;

    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
		undo_b=this;
		redo_b=this;
        let coords = this.id;
        let val = parseInt(coords);
		let r=~~(val/9);
		let c=val%9;
		// "0-0" "0-1" .. "0-9"
		let a=numSelected.id.split("-"); //["0","1"]
		let k=parseInt(a[1]);
		
		if(k==ans[r][c])
		{
			board[r][c]=k;
            this.innerText = k;
			redo_num=k;
		}
        else {
            alert("Wrong Move !!!");
        }
    }
}


function solve( board )
{
	var i,j;
	var k;
	for(i=0;i<9;i++)//row
	{
		for(j=0;j<9;j++) //col
		{
			//finding for empty space
			if(board[i][j]==0)
			{
				for(k=1;k<=9;k++)
				{
					if(isSolve(board,i,j,k))
					{
						board[i][j]=k;
						if(solve(board)) //if one soln is find we will stop finding others and                                                      return it
							{
								return true;
							}
						else
							board[i][j]=0; //placing blank again
					}
				}
				//can't place any no. in a box then return false
				return false;
			}
		}
	}
	//no blank place means get out soln
	return true;
}

function isSolve( board, r, c, k)
{
	var i; 
	for(i=0;i<9;i++)
	{
		//checking along column if char k is already present or not 
		if(board[r][i]==k)
			return false;
		//checking along row if char k is already present or not 
		if(board[i][c]==k)
			return false;
		//checking each boxes if char k is already present or not 
		let a= ~~(r/3); //integer division
		let b= ~~(c/3);
		let d= ~~(i/3);
		let x=3*a+d;
		let y=3*b+i%3;
		if(board[x][y]==k)
			return false;
	}
	return true;
}

function check(board)
{
	let i,j;
	if(flag==0)
		return;

	for(i=0;i<9;i++)
	{
		for(j=0;j<9;j++)
		{
			if(board[i][j]!=ans[i][j])
			{
				alert("You Lost !!!");
				return;
			}
		}
	}

	alert("You Won !!!");
}



