//var roleBuilder = {
module.exports = {

    run: function(creep) {

    	//update state
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	    	//find something to build
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }

            else {
	            //find something to repair, that is not a wall
	            var damagedStructure = creep.room.find(FIND_STRUCTURES, {
				    filter: object => object.hits < object.hitsMax && object.stuctureType != STRUCTURE_WALL
				});

				damagedStructure.sort((a,b) => a.hits - b.hits);

				if(damagedStructure.length > 0) {
				    if(creep.repair(damagedStructure[0]) == ERR_NOT_IN_RANGE) {
				        creep.moveTo(damagedStructure[0]);    
				    }
				}
			}

			//add code: if nothing else, upgrade
	    }

	    else {
	        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
	    }
	}
};

//module.exports = roleBuilder;
