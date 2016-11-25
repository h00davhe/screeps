module.exports = {
  run: function(creep){
      if(creep.pos.roomName != creep.memory.destinationRoom) {
          //move to room
          //let target = new RoomPosition(25,25,creep.memory.destinationRoom);
          let target = new RoomPosition(25,25,'E68N26');

          creep.moveTo(target);
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