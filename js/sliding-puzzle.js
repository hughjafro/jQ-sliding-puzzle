$(function () {

	//wrapper function that will execute after the page has loaded

	var numberOfPieces = 12,
		aspect = "3:4",
		aspectW = parseInt(aspect.split(":")[0]),
		aspectH = parseInt(aspect.split(":")[1]),
		container = $("#puzzle"),
		imgContainer = container.find("figure"),
		img = imgContainer.find("img"),
		path = img.attr("src"),
		piece = $("<div/>"),
		pieceW = Math.floor(img.width() / aspectW),
		pieceH = Math.floor(img.height() / aspectH),
		idCounter = 0,
		positions = [],
		empty = {
			top: 0, 
			left: 0,
			bottom: pieceH,
			right: pieceW
		},
		previous = {},
		timer,
		currentTime = {},
		timerDisplay = container.find("#time").find("span");

	for (var x = 0, y = aspectH; x < y; x++) {
		for (var a = 0, b = aspectW; a < b; a++) {
			var top = pieceH * x,
				left = pieceW * a;

//clones the original piece and adds attributes to it
//Use array literal with .join instead of string concat for cleaner code. This is faster than + operation
			piece.clone()
				.attr("id", idCounter++)
				.css({
					width: pieceW,
					height: pieceH,
					position: "absolute",
					top: top,
					left: left,
					backgroundImage: ["url(", path, ")"].join(""),
					backgroundPosition: [
						"-", pieceW * a, "px ",
						"-", pieceH * x, "px "
						].join("")
				}).appendTo(imgContainer);

				positions.push({top: top, left: left});
		}
	}
//removes the original image from the page
	img.remove();

//removes the first piece of the puzzle
	container.find("#0").remove();

//Removes first item in the positions array
	positions.shift();

//shuffles using the start button event handler
// .on takes 2 arguments, 1 to listen for and 2nd to be executed each time the event is detected

	$("#start").on("click", function(e) {
		var pieces = imgContainer.children();

		function shuffle(array) {
			var i = array.length;

			if (i === 0) {
				return false;
			}

//this picks current index and a random index then swaps them 
			while (--i) {
				var j = Math.floor(Math.random() * (i + 1)),
						tempi = array[i],
						tempj = array[j];

						array[i] = tempj;
						array[j] = tempi;
			}
		}
//where the actual shuffling occurs
//already defined the shuffle function that needs and input of array. Pieces is the array from line 68
		shuffle(pieces);


//sets the position of the newly shuffled images
		$.each(pieces, function (i) {
			pieces.eq(i).css(positions[i]);
		});

//replaces existing pieces in container with shuffled
//appends back to the page, use variable as the argument instead of a container...so much easier,nicer
		pieces.appendTo(imgContainer);

//ensures empty slot is at 0 when timer starts
		empty.top = 0;
		empty.left = 0;

//remove any previous message not with id time
		container.find("#ui").find("p").not("#time").remove();

	});



});