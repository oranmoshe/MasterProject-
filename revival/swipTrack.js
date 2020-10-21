var SwipTrack = function(swipLength, trashHold, callback){
  
  var lastX = 0;
  var movement = 'right';
  var length = 0;
  var start = 

  SwipTrack.update = function(x,hands){
    if(Math.abs(lastX-x)>trashHold){
      var newMovement = lastX<x?'right':'left';
      if(movement!=newMovement || hands<2){
        movement = newMovement;
        length = 0;
//        console.log("reset length");
      }
      lastX = x;
      length++;
      console.log("length: " + length);
      if(length>swipLength){
        callback(movement);
      }
    }
  }
}