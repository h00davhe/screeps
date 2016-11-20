var roleHarvester1 = {

    run: function(creep) {
        
        if (creep.carry.energy == 0) creep.memory.upgrading = false;
        
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
        });
        
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.upgrading == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0].pos);
            }
        }
        else if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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
        /*
        if (creep.memory.upgrading = true) {
            creep.upgradeController(creep.room.controller);
            if (creep.carry.energy == 0) creep.memory.upgrading = false;
            
        }
        */
        
	}
};

module.exports = roleHarvester1;
