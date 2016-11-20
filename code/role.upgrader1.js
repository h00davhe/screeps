
module.exports = {

    run: function(creep) {
        
        if (creep.carry.energy == 0) creep.memory.upgrading = false;
        

        
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.upgrading == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0].pos);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                
                if (creep.memory.upgrading == false) {
                    creep.say("upgrading")
                    creep.memory.upgrading = true;
                }
            }
        }        
	}
};


