module.exports = {
  run: function(creep){
      if(creep.pos.roomName != creep.memory.destinationRoom) {
          //move to room
          creep.moveTo(new RoomPosition(25,25,creep.memory.destinationRoom));
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

/*
 var error = creep.moveTo(new RoomPosition(25,25,creep.memory.destinationRoom.roomName));
 console.log(error)
 */