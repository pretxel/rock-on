import { insert } from '../../api/matches/methods.js';


var name = 'rock-battle';
var algorithm = {
  name: 'fifo'
}
var onMatch = function(user1, user2){

  insert.call({
    text: "MATCH",
    userId1: user1.userId,
    userId2: user2.userId,
  }, function(error){
    if (error){
      console.log(error);
    }else{
      console.log('Match created with:');
      console.log("user1: " + user1.userId);
      console.log("user2: " + user2.userId);
    }
  });
}

var myMatcher = new RandomOpponentMatcher(name, algorithm, onMatch);
