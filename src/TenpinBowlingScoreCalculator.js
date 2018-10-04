var maxRound = 10;

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

function getIndexByRound(round){
	return round*2;
}

function isStrike(round, data){
  	var index = getIndexByRound(round);
  	if(data[index] == 10){
		return true;
    } else {
    	return false;
    }
}

function isSpare(round, data){
  	var index = getIndexByRound(round);
  	if(data[index] + data[index+1] == 10){
		return true;
    } else {
    	return false;
    }
}

function calStrikeScore(round, data){
	var index = getIndexByRound(round);
  	return data[index] + data[index+2] + data[index+3];
}

function calDoubleStrikeScore(round, data){
	var index = getIndexByRound(round);
	if (round != maxRound-1){
		return data[index] + data[index+2] + data[index+4];
	} else {
		return data[index] + data[index+2] + data[index+3];
	}
}

function calSpareScore(round, data){
 	var index = getIndexByRound(round);
	return data[index] + data[index+1] + data[index+2];
}

function calNormalScore(round, data){
	var index = getIndexByRound(round);
  	return data[index] + data[index+1];
}

function calLastRoundScore(round, data){
	var index = getIndexByRound(round);
  	return data[index] + data[index+1] + data[index+2];
}

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