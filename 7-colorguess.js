var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();//pickColor() is a function, find it at the bottom of the page! this is how we generate the RGB numbers on the title. 
var colorDisplay = document.getElementById("colorDisplay");//this is how we generate the RGB numbers on the title. 
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");


easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]){
			squares[i].style.background = colors[i];//give 3 new colors
		} else {
			squares[i].style.display = "none";//this is a command to hide the last 3 squares
		}
		
	}
});

hardBtn.addEventListener("click", function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
			squares[i].style.background = colors[i];//give 6 new colors
			squares[i].style.display = "block";//this is a command to SHOW all 6 squares (3 of them are hidden in the Easy mode)
	}
});

resetButton.addEventListener("click", function(){
	//generate new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from the 6 colors array
	pickedColor = pickColor();
	//change the header h1 TEXT (rgb 118,221, 255) colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "NEW COLORS";
	//remove the "correct!" from the message display
	messageDisplay.textContent = "";
	//give new color to every square with a for loop
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
	//change the h1 background color back to default blue
	h1.style.background = "steelblue";
});



colorDisplay.textContent = pickedColor;//this is how we generate the RGB numbers on the title. 
//this below here IS THE MAIN THING! 
for (var i = 0; i < squares.length; i++) {
	//here we add initial (starter) colours to the squares
	squares[i].style.backgroundColor = colors[i];//this will give in the first square the first background, the second square the second background...
	//here we add clickk listeners to the squares
	squares[i].addEventListener("click", function(){
		//grab color of the clicked square
		var clickedColor = (this.style.backgroundColor);//"this"always refers to the clicked item!
		//compare color of the clicked square with the pickedColor variable
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "CORRECT!";
			resetButton.textContent = "Play again"
			changeColors(clickedColor);
			h1.style.background = clickedColor;
		} else {//if it is the wrong color, we just want that square to fade out
			this.style.background = "#232323";//this number is the body background color
			messageDisplay.textContent = "TRY AGAIN!";
		}
	});
}

//here below, we want to in case of the right guess all squares to change their color for the correct color
function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change each "wrong" color to match given (right) color
		squares[i].style.background = color;//here the color is just a placeholder. This function will work with the var clickedColor.
	}
	
}


//Here the software picks a color from the 6 colors, whic will be guessed by the user.
function pickColor(){
	//use a random number (Math.random will create a random number with decimals)
	var random = Math.floor(Math.random() * colors.length);//this is how we generate a random number. Math.floor()removes the decimals.
	//acces a random color from the var colors array
	return colors[random];
}

//Here below we multiply 6x or 3x the randomColor function
function generateRandomColors(num){//we have a num here, because we either generate 6 or 3 colors. So it is not a fix number
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {//repeat num times
		//get random color and push into array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

//we create 1 random color below. Only one.
function randomColor(){//this function will be used inside of the generateRandomColors function (function in a function)
	//pick a red from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a green from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0-255
	var b = Math.floor(Math.random() * 256);
	//now we have to generate the "rgb(r, g, b)" form
	return "rgb(" + r + ", " + g + ", " + b + ")";// r and g and b are here variable, so we need the + sign between them)
}