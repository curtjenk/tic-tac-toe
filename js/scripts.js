var player = 1;

function setMark(element) {
	var imgFile;
	var selected = element.getAttribute('sel');
	//console.dir(element);
	if (selected !== "o" && selected !=="x")
	{
		
		if (player === 1)
		{
			imgFile = "img/o.png";
			element.setAttribute('sel', 'o');
			player = 2;
		} else {
			imgFile = "img/x.png";
			element.setAttribute('sel', 'x');
			player = 1;
		}
		element.children[0].src = imgFile;
		document.getElementById('turn').innerHTML = "Player's " + player + " turn.";
	
   		// ----- check if there is a winner!
   		isGameOver();
	}

}

function resetAll()
{
	var squares = document.getElementsByClassName("square");
	for (var x = 0; x<squares.length; x++)
	{
		squares[x].setAttribute('sel', 'n');
		squares[x].children[0].src ="";
		
	}
	player = 1;
	document.getElementById('turn').innerHTML = "Player's " + player + " turn.";
	document.getElementById('startOverBtn').style.display = "none";

	var winlines = document.getElementsByClassName("winline");
	for (var x = 0; x<winlines.length; x++)
	{
		winlines[x].style.display = "none";
	}
}



function isGameOver() 
{
	var winningPatternsArr = [ ['a1', 'a2', 'a3'], 
							['b1', 'b2', 'b3'], 
							['c1', 'c2', 'c3'], 
	                       	['a1', 'b2', 'c3'], 
	                       	['a3', 'b2', 'c1'], 
	                       	['a1', 'b1', 'c1'], 
	                        ['a2', 'b2', 'c2'], 
	                        ['a3', 'b3', 'c3']
							];
							
	var squares = document.getElementsByClassName("square");
	var exesArr = [];
	var ohsArr = [];
	var numSelected = 0;
	var winningPattern;

	for (var x = 0; x<squares.length; x++)
	{
		var sel = squares[x].getAttribute('sel');
		if (sel === 'x')
		{
			// console.log("adding x");
			exesArr.push(squares[x].getAttribute('id'));
		} else if (sel === 'o') {
			// console.log("adding o");
			ohsArr.push(squares[x].getAttribute('id'));
		}
	}
	var winner = 0;
	for (var i=0; i<winningPatternsArr.length; i++) {
		var numXHits = 0;
		var numOHits = 0;
		for (var x = 0; x<winningPatternsArr[i].length && winner===0; x++) {
			for (var z =0; z<exesArr.length; z++) {
				if (winningPatternsArr[i][x] == exesArr[z]) {
					numXHits++;
				}
			}
			for (var z =0; z<ohsArr.length; z++) {
				if (winningPatternsArr[i][x] == ohsArr[z]) {
					numOHits++;
				}
			}
			console.log(numXHits);
			if (numXHits === 3) {
				winner=2;
				winningPattern = winningPatternsArr[i];
				//alert("exes win");
			}
			if (numOHits === 3) {
				winner=1;
				winningPattern = winningPatternsArr[i];
				//alert("ohs win");
			}
		}
	}
	
	if (winner !== 0) {
		document.getElementById('turn').innerHTML = "Player " + winner + " won!";
		document.getElementById('startOverBtn').style.display = "block";

		drawWinLine(winningPattern);
	}

}

function drawWinLine(winPattern) {
	if (winPattern[0] === 'a1' && winPattern[1] == 'b1')
	{ document.getElementById('left-vert').style.display = "block"; }
	
	if (winPattern[0] === 'a2' && winPattern[1] == 'b2')
	{ document.getElementById('mid-vert').style.display = "block"; }
	
	if (winPattern[0] === 'a3' && winPattern[1] == 'b3')
	{ document.getElementById('right-vert').style.display = "block"; }
	
	if (winPattern[0] === 'a1' && winPattern[1] == 'a2')
	{ document.getElementById('top-horiz').style.display = "block"; }
	
	if (winPattern[0] === 'b1' && winPattern[1] == 'b2')
	{ document.getElementById('mid-horiz').style.display = "block"; }
	
	if (winPattern[0] === 'c1' && winPattern[1] == 'c2')
	{ document.getElementById('bottom-horiz').style.display = "block"; }
	
	if (winPattern[0] === 'a1' && winPattern[1] == 'b2')
	{ document.getElementById('left-diag').style.display = "block"; }
	
	if (winPattern[0] === 'a3' && winPattern[1] == 'b2')
	{ document.getElementById('right-diag').style.display = "block"; }

}


