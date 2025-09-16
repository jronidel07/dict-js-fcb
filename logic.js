// Declaring our variable for our 2d array, score, row and columns

// 2d array, an array of array
let board;
let score = 0;

let rows = 4;
let columns = 4;

let is2048Exist = false;
let is409648Exist = false;
let is8192Exist = false;

function setGame(){
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]

	for(let r = 0 ; r < rows; r++){
		for(let c = 0; c < columns; c++){

			let tile = document.createElement("div");

			tile.id = r + "-" + c;

			console.log(tile.id);

			let num = board[r][c]

			updateTile(tile, num);

			document.getElementById("board").append(tile);



       }
    }

    setTwo()
    setTwo()
}

function updateTile(tile, num){
	tile.innerText = "";

	tile.classList.value = "";
	tile.classList.add('tile');
	if(num > 0){
		tile.innerText = num.toString();

		if(num <= 4096){
			tile.classList.add("x"+num.toString()) ;
		}else{
			tile.classList.add("x8192");
		
	
		}
	}

}

window.onload = function (){
	setGame();
}

// Function that will handle the user's keyboard input when they press.
function handleSlide(event){
	console.log(event.code);

	if(["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.code)){
		// Prevent default behavior(scrolling) on arrow keys.
		event.preventDefault();

		if(event.code == "ArrowLeft" && canMoveLeft()){
			console.log("slide to the left");
			slideLeft();
			setTwo()
		}else if(event.code == "ArrowRight" && canMoveRight()){
			console.log('slide to the left')
			slideRight();
			setTwo()
		}else if (event.code == "ArrowUp" && canMoveUp()){
			console.log('slide upward');
			slideUp();
			setTwo()
		}else if(event.code == "ArrowDown" && canMoveDown()){
			console.log("slide downward");
			slideDown();
			setTwo()
		}
	}

	document.getElementId("score").innerText = score;

	setTimeout(()=> {
		if(hasLost()){
			alert("Game Over! You have lost the game. Game will restart")
			restartGame();
			alert("Click any arrow key to restart");
		}else{
			checkWin();
		}

		}
	}, 100)
}


function restartGame(){
	board = [board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	score = 0;

	setTwo()
	setTwo()


	]
}

document.addEventListener('keyup', handleSlide)

function slideLeft(){
	for(let r = 0; r < rows; r++){
		let row = board[r];

		let originalRow = row.slice();

		row = slide(row);
		board[r] = row;

		for(let c = 0; c < columns; c++){
			let tile = document.getElementById(r + "-" + c);
			let num = board[r][c];

			if(originalRow[c] != num && num !== 0){
				tile.style.animation = "slide-from-right 0.3s";

				setTime(()=> {
					tile.style.animation = "";
				}, 300);
			}
			
			updateTile(tile, num);
		}

	}
}

function slideRight(){
	for(let r = 0; r < rows; r++){
		
		let row = board[r];

		row.reverse();

		row = slide (row);

		row.reverse();

		board[r] = row;

		for(let c = 0; c < columns; c++){
			let tile = document.getElementById(r + "-" + c);
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}		

function slideUp(){
	for(let c = 0; c < columns ; c++){
		// [2,0,0,8]
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
		
		col = slide(col);

		for (let r = 0; r < rows; r++){
			board[r][c]  = col[r];

			let tile = document.getElementById(r + "-" + c);
			let num = board[r][c];
			updateTile(tile, num)
		}
	}
}	

function slideDown(){
	for(let c = 0; c <columns; c++){
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

		col.reverse();
		col = slide(col);
		col.reverse();

		for (let r = 0; r < rows; r++){
			board[r][c]  = col[r];

			let tile = document.getElementById(r + "-" + c);
			let num = board[r][c];
			updateTile(tile, num)
		}

	}

}
    function filterZero(row){
    return row.filter(num => num !== 0);
    }
	function slide(row){
	row = filterZero(row);
	for( let i = 0; i < row.length -1; i++){
		if(row[i] == row[i+1]){
			row[i] *= 2;
			row[i+1] = 0;
			score += row[i]
		}
	}

	
	row = filterZero(row);

	while(row.length < columns){
		//add zero on the end of the array
		row.push(0);
	}
	return row;
}

function hasEmptyTile(){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c< columns; c++){
			if(board[r][c] == 0 ){
				return true;
			}
		}
	}

	//return false if no tile == 0;
	return false;
}

function setTwo(){
	//check if the board has empty tile:
	if(!hasEmptyTile){
		return;
	}

	// Declare a value found(false);
	let found = false;

	while(!found){
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if(board[r][c] == 0){
			board[r][c] = 2;
			let tile = document.getElementById(r + '-' + c);
			tile.innerText = "2";
			tile.classList.add('x2');

			found = true;
		}
	}
}

//function that will check if we can still do left movement:
function canMoveLeft(){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			if(board[r][c] !== 0){
				if(board[r][c - 1] === 0 || board[r][c-1] === board[r][c]){
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveRight(){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			if(board[r][c] !== 0){
				if(board[r][c+1] === 0 || board[r][c+1] === board[r][c]){
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveUp(){
	for(let c = 0 ; c < columns ; c++){
		for (let r = 0; r < rows; r++){
			if(board[r][c]!==0){
				if(board[r-1][c] === 0 || board [r-1][c] === board[r][c]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(){
	for(let r = 0 ; r < rows ; r++){
		for (let c = 0; c < columns; c++){
			if(board[r][c]!==0){
				if(board[r+1][c] === 0 || board [r+1][c] === board[r][c]){
					return true;
				}
			}
		}
	}
	return false;
}

function checkWin(){
	for(let r = 0; r <rows; r++){
		for(let c = 0; c < columns; c++){
			if(board[r][c] == 2048 && is2048Exist == false){
				alert('You win! You got the 2048 tile!');
				is2048Exist = true;
			}else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You are unstoppable at 4096! You are fantastically unsetopplae!");
				is4096Exist = true;
			} else if (board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! You are incredibly awesome");
				is8192Exists = true;
			}
		}
	}
}

function hasLost(){
	for( let r = 0; r < rows ; r++){
		for( let c = 0; c < columns; c++){
			if(board[r][c] === 0){
				return false;
			}

			// check all the adjacent cells per element
			if( r > 0 && board[r-1][c] === board [r][c] || r < rows - 1 && board[r+1][c] === board[r][c] || c > 0 && board [r][c-1] === board[r][c] || c < columns - 1 && board[r][c+1] === board[r][c]){
				return false;
			}
		}
	}

	//no possible movement
	return true;

}