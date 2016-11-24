module.exports = {
  run: function(creep){
      if(creep.pos.roomName != creep.memory.destinationRoom.roomName) {
          //move to room
          creep.moveTo(creep.memory.destinationRoom);
      }
      else{
          //reserve controller
          if(creep.room.controller) {
              if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.controller);
              }
          }
      }
  }
};