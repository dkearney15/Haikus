var fs = require('fs');

var wordSylObj = makeWordSylObj('./cmudict.txt');

function makeWordSylObj(file){
	wordSyl = {}
	var lines = fs.readFileSync(file).toString().split("\n")
	for(i = 0; i < lines.length; i += 1) {
		var lineBreakdown = lines[i].split('  ')
		var word = lineBreakdown[0]
		var phonemes = lineBreakdown[1]
		var sylCount = phonemes.replace(/[^aeiou ]/gi,'')
			.split(' ')
			.filter(function(str) {
				return str !== ''
			})
			.length
		wordSyl[word] = sylCount
	}
	return wordSyl
}

var wordCount = Object.keys(wordSyl).length

randWordAndSyl = function() {
	output =[]
	var randNum = Math.round(Math.random() *  wordCount)
	var randWord = Object.keys(wordSylObj)[randNum]
	var randWordSyl = wordSylObj[randWord]
	output.push(randWord, randWordSyl)
	return output
}

makeLineOne = function() {
	var lineOne = []
	var lineOneSylCount = 0
	do {
		var randCombo = randWordAndSyl()
		if (lineOneSylCount > 5) {
			lineOne = []
			lineOneSylCount = 0
		}
		else if (lineOneSylCount < 5) {
			lineOne.push(randCombo[0])
			lineOneSylCount += randCombo[1]
		}
	}
	while ( lineOneSylCount !== 5 )
	return lineOne.join(' ')
}

makeLineTwo = function() {
	var lineTwo = []
	var lineTwoSylCount = 0
	do {
		var randCombo = randWordAndSyl()
		if (lineTwoSylCount > 7) {
			lineTwo = []
			lineTwoSylCount = 0
		}
		else if (lineTwoSylCount < 7) {
			lineTwo.push(randCombo[0])
			lineTwoSylCount += randCombo[1]
		}
	}
	while ( lineTwoSylCount !== 7 )
	return lineTwo.join(' ')
}

makeHaiku = function() {
	console.log(makeLineOne() + "\n" + makeLineTwo() + "\n" + makeLineOne())
}

console.log(makeHaiku())