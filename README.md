# Ten pins Bowling Score Calculator

This is a Javascript program that calculates and prints ten pin bowling scores.

## Scorling Rules

  - A game of bowling consists of 10 frames with a set of 10 pins.
  - In each frame, the bowler will have two chances.
  - Strike: When all ten pins are knocked down with the first ball, a player is awarded ten pins, plus a bonus of whatever is scored with the next two balls.
  - Spare:When no pins are left standing after the second ball of a frame, a player achieving a spare is awarded ten pins, plus a bonus of whatever is scored with the next ball.
  - If the bowler gets a strike or spare in the 10th frame, a bonus roll is awarded

## Assumptions
  - The input numbers will be between 0 and 10.
  - The sequence of numbers will always be valid but may be incomplete

## My Solution

### Logic
  1. Convert the comma separated string to a number array with 21 elements.
  2. For each round, determine whether that is a strike, a double strike, a spare, a normal round or the last round, then calculate the score of that round according to the rules.
  3. Add the score of each round to the total score.

### Function Descriptions

- calScore (the main function of the calculator)
    - Input: str:String(the comma separated string)
    - Output: totalScore:Number
```js
function calScore(str){
  var data = formatData(str);
  var total = 0;

  for (i = 0; i < maxRound; i++) {
      var roundScore = 0
      if (i < maxRound -1){
        if(isStrike(i, data)){
            if (isStrike(i+1,data)){
              roundScore = calDoubleStrikeScore(i, data)
            } else {
              roundScore = calStrikeScore(i,data);
            }
        } else if (isSpare(i, data)){
            roundScore = calSpareScore(i, data);
        } else {
            roundScore = calNormalScore(i, data);
        }
      } else {
      	roundScore = calLastRoundScore(i,data);
      }
      total += roundScore;
  }

  window.alert("Total score = " + total)
  return total;
}
```

- formatData
    - Input: str:String(the comma separated string)
    - Output: data:Number array
    - Description:
        - The formatData function is for formatting the inputed comma separated string to an array.
        - The resulting array should be a number array with 21 elements (the maximum number of data for 10 frames).
        - The function would fill in the incomplete scores to zeros.
        - The function would fill in the second score to zero if that frame is a strike.
```js
function formatData(str){
  var maxData = 21;
  var index = 0;
  var round = 0;
  
  var input = str.split(",").map(Number);
  var data = new Array(maxData).fill(0);

  for (i = 0; i < input.length; i++){
      data[index] = input[i]
      if (input[i] == 10 && round < maxRound-1){
          index += 2;
          round += 1;
      } else {
          index += 1;
          round += 0.5;
      }
  }
  return data;
}
```

- getIndexByRound
    - Input: round:Number
    - Output: index:Number
    - Description:
        - The getIndexByRound is for calculating the starting data index for the inputed round. 
```js
function getIndexByRound(round){
	return round*2;
}
```

- isStrike
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: boolean
    - Description:
        - The function would return true if the first score of the inputed round is 10; else would return false.
```js
function isStrike(round, data){
  	var index = getIndexByRound(round);
  	if(data[index] == 10){
		return true;
    } else {
    	return false;
    }
}
```

- isSpare
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: boolean
    - Description:
        - The function would return true if the total score of the inputed round is 10; else would return false.
```js
function isSpare(round, data){
  	var index = getIndexByRound(round);
  	if(data[index] + data[index+1] == 10){
		return true;
    } else {
    	return false;
    }
}
```

-  calStrikeScore
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: score:Number
    - Description:
        - The function would calculate the score of the inputed round by adding the score of this round and the next two balls. 
```js
function calStrikeScore(round, data){
	var index = getIndexByRound(round);
  	return data[index] + data[index+2] + data[index+3];
}
```

- calDoubleStrikeScore
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: score:Number
    - Description:
        - The function would calculate the score of the inputed round by adding the score of this round, the next round and the third ball.
```js
function calDoubleStrikeScore(round, data){
	var index = getIndexByRound(round);
  	if (round != maxRound-1){
		return data[index] + data[index+2] + data[index+4];
	} else {
		return data[index] + data[index+2] + data[index+3];
	}

}
```

- calSpareScore
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: score:Number
    - Description:
        - The function would calculate the score of the inputed round by adding the score of this round and the next ball. 
```js
function calSpareScore(round, data){
 	var index = getIndexByRound(round);
	return data[index] + data[index+1] + data[index+2];
}
```

- calNormalScore
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: score:Number
    - Description:
        - The function would calculate the score of the inputed round by adding the first and the second scores in the inputed round.
```js
function calNormalScore(round, data){
	var index = getIndexByRound(round);
  	return data[index] + data[index+1];
}
```

- calLastRoundScore
    - Input: round:Number, data:NumberArray(the formatted array)
    - Output: score:Number
    - Description:
        - The function would calculate the score of the last round by adding up the last three scores.
```js
function calLastRoundScore(round, data){
	var index = getIndexByRound(round);
  	return data[index] + data[index+1] + data[index+2];
}
```
