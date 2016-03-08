var player = 1;

function setMark(element) {
	var imgFile;
	var selected = element.getAttribute('sel');
	console.dir(element);
	if (selected !== "y")
	{
		element.setAttribute('sel', 'y');
		if (player === 1)
		{
			imgFile = "img/o.png";
			player = 2;
		} else {
			imgFile = "img/x.png";
			player = 1;
		}
		element.children[0].src = imgFile;
		document.getElementById('turn').innerHTML = "Player's " + player + " turn.";
	
   		// ----- now count number of selected to see if game is over
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
}

// ----- Not yet ready for primetime. need to figure out if there are 3 in a row versus looking
// ----- for all squares to be filled.
function isGameOver() 
{
	var squares = document.getElementsByClassName("square");
	var numSelected = 0;
	for (var x = 0; x<squares.length; x++)
	{
		var sel = squares[x].getAttribute('sel');
		if (sel === 'y') {
			numSelected++;
		}
	}
	if (numSelected === 9) {
		document.getElementById('startOverBtn').style.display = "block";
		document.getElementById('turn').innerHTML = "Game Over";
	}
}