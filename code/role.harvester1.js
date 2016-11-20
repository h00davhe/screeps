var roleHarvester1 = {

    run: function(creep) {
        
        if (creep.carry.energy == 0) creep.memory.harvesting = true;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.harvesting = false;

        //find targets to transfer energy to
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
        });
        
        //harvest energy
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.harvesting == true) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0].pos);
            }
        }
        //move to target and transfer energy
        else if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
            }
        }
        //otherwise upgrade controller
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                
                if (creep.memory.harvesting == true) {
                    creep.say("upgrading")
                    creep.memory.harvesting = false;
                }
            }
        }
	}
};

module.exports = roleHarvester1;
