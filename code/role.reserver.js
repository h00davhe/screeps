module.exports = {
  run: function(creep){
      if(creep.pos.roomName != creep.memory.destinationRoom) {
          //move to room
          creep.moveTo(new RoomPosition(25, 25, 'E68N26'));
      }
      else{
          //claim controller
      }
  }
};