//==================//
// 		Part 1	 	//
//==================//

var userBalance = 0;

// Gets called whenever the money finished tweening to the bottom.
function addFromCatch(value) {
	onUpdate({delta: 2000 / parseInt(value)})
}

// Gets called every frame. 
// Time elapsed since the last update is passed into the function(milliseconds)

// The following solution assumes that tracking interval needs to happen inside
// the onUpdate function, but this logic could easily be moved to the addFromCatch
function onUpdate({ delta }) {
	let intervalRevolutions = 0

	const intervalId = setInterval(() => {
		// Handle when delta is a whole number
		if (delta >= 1) {
			userBalance++
			// ""+ is the fastest conversion from num to string
			updateBalance(''+userBalance)
			// Cancel interval when 2 seconds has been reached
			intervalRevolutions++
			if ((intervalRevolutions * delta) === 2000) {
				clearInterval(intervalId)
			}
		}
		// Handle when delta is < 1, due to a value of > 2000 dollars
		else {
			userBalance += parseInt(1 / delta)
			updateBalance(''+userBalance)
			intervalRevolutions++
			if (intervalRevolutions === 2000) {
				clearInterval(intervalId)
			}
		}
		// set interval amount to whole number
	}, delta <= 1 ? 1 : delta)
}

addFromCatch(4000)

// You have access to a function updateBalance which 
// takes in a string and sets the ui to that value
// updateBalance("1");




//==================//
// 		Part 2	 	//
//==================//
function processTopLeft(input, wins, i, j, winConditionMet) {
	let zeroZero = input[i][j]
	let oneOne = input[i + 1][j + 1]
	let twoTwo = input[i + 2][j + 2]
	let oneThree = input[i + 1][j + 3]
	let zeroFour = input[i][j + 4]
	// 5 points
	if (zeroZero === oneOne && oneOne === twoTwo && twoTwo === oneThree && oneThree === zeroFour) {
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "5" : "5"
		winConditionMet = true
	}
	// 3 points
	if (!winConditionMet && zeroZero === oneOne && oneOne === twoTwo) {
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "3" : "3"
		winConditionMet = true
	}
}

function processBottomLeft(input, wins, i, j, winConditionMet) {
	let zeroZero = input[i][j]
	let oneNOne = input[i - 1][j - 1]
	let twoNTwo = input[i - 2][j - 2]
	let oneNThree = input[i - 1][j - 3]
	let zeroNFour = input[i][j - 4]
	// 5 points
	if (zeroZero === oneNOne && oneNOne === twoNTwo && twoNTwo === oneNThree && oneNThree === zeroNFour) {
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "5" : "5"
		winConditionMet = true
	}
	// 3 points
	if (!winConditionMet && zeroZero === oneNOne && oneNOne === twoNTwo) {
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "3" : "3"
		winConditionMet = true
	}
}

function processHorizontal(input, wins, i, j, winConditionMet) {
	let zero = input[i][j]
	let one = input[i][j + 1]
	let two = input[i][j + 2]
	let three = input[i][j + 3]
	let four = input[i][j + 4]
	// 5 points
	if (!winConditionMet && zero === one && one === two && two === three && three === four) {
		// if the key doesn't exist, instantiate with the consecutive symbols
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "5" : "5"
		winConditionMet = true
	}
	// 4 points
	if (!winConditionMet && zero === one && one === two && two === three) {
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "4" : "4"
		winConditionMet = true
	}
	// 3 points
	if (!winConditionMet && zero === one && one === two) {
		wins[input[i][j]] = wins[input[i][j]] ? wins[input[i][j]] + "3" : "3"
	}
}

function processWin(wins) {
	let winCount = 0
	let points = 0
	for (let key in wins) {
		let winCombos = wins[key].split('')
		if (key === "1") {
			winCount += winCombos.length
			winCombos.forEach(num => {
				let inARow = parseInt(num)
				if (inARow === 3) points += 5
				if (inARow === 4) points += 10
				if (inARow === 5) points += 20
			})
		}
		if (key === "2") {
			winCount += winCombos.length
			winCombos.forEach(num => {
				let inARow = parseInt(num)
				if (inARow === 3) points += 10
				if (inARow === 4) points += 25
				if (inARow === 5) points += 50
			})
		}
		if (key === "3") {
			winCount += winCombos.length
			winCombos.forEach(num => {
				let inARow = parseInt(num)
				if (inARow === 3) points += 25
				if (inARow === 4) points += 50
				if (inARow === 5) points += 100
			})
		}
	}
	return `${winCount} winning line${winCount > 1 ? "s" : ""}, scoring ${points} points.`
}


function processSlots(input) {
	// Object to later check win conditions
	let wins = {}
	for (let i = 0; i < input.length; i++) {
		let j = 0

		let winConditionMet = false

		// Check for wins from top left corner
		if (i === 0) {
			processTopLeft(input, wins, i, j, winConditionMet)
		}
		// Check for wins from bottom left corner
		if (i === 2) {
			processBottomLeft(input, wins, i, j, winConditionMet)
		}
		// Check for horizontal wins
		processHorizontal(input, wins, i, j, winConditionMet)
	}
	// Process wins for points & win count - return victory statement
	return processWin(wins)
};

// examples input
var array = [
	[1, 0, 0, 0, 1],
	[0, 1, 0, 1, 0],
	[0, 0, 1, 0, 0]
];
//Output: '1 winning line, scoring 20 points.'

var array2 = [
	[2, 1, 4, 3, 3],
	[1, 1, 1, 4, 1],
	[3, 3, 3, 4, 2]
];
//Output: '2 winning lines, scoring a total 30 points.'

console.log(processSlots(array2))
