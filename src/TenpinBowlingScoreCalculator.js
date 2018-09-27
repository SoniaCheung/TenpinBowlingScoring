var maxRound = 10;

function formatData(str){
  var maxData = 21;
  var dataIndex = 0;
  var round = 0;
  
  var input = str.split(",").map(Number);
  var data = new Array(maxData).fill(0);

  for (i = 0; i < input.length; i++){
      data[dataIndex] = input[i]
      if (input[i] == 10 && round < maxRound-1){
          dataIndex += 2;
          round += 1;
      } else {
          dataIndex += 1;
          round += 0.5;
      }
  }
  return data;
}

function getIndexByRound(round){
	return round*2;
}

function isStrike(round, data){
  	var dataIndex = getIndexByRound(round);
  	if(data[dataIndex] == 10){
		return true;
    } else {
    	return false;
    }
}

function isSpare(round, data){
  	var dataIndex = getIndexByRound(round);
  	if(data[dataIndex] + data[dataIndex+1] == 10){
		return true;
    } else {
    	return false;
    }
}

function calStrikeScore(round, data){
	var dataIndex = getIndexByRound(round);
  	return data[dataIndex] + data[dataIndex+2] + data[dataIndex+3];
}

function calDoubleStrikeScore(round, data){
	var dataIndex = getIndexByRound(round);
  	return data[dataIndex] + data[dataIndex+2] + data[dataIndex+4];
}

function calSpareScore(round, data){
 	var dataIndex = getIndexByRound(round);
	return data[dataIndex] + data[dataIndex+1] + data[dataIndex+2];
}

function calNormalScore(round, data){
	var dataIndex = getIndexByRound(round);
  	return data[dataIndex] + data[dataIndex+1];
}

function calLastRoundScore(round, data){
	var dataIndex = getIndexByRound(round);
  	return data[dataIndex] + data[dataIndex+1] + data[dataIndex+2];
}

function calScore(str){
  var data = formatData(str);
  var score = 0;

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
      score += roundScore;
  }

  window.alert("Total score = " + score)
  return score;
}