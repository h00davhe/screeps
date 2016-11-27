//var roleBuilder = {
module.exports = {

    run: function(creep) {

        //go to destinationRoom
        if(creep.memory.destinationRoom != undefined && creep.pos.roomName != creep.memory.destinationRoom) {
            //move to room
            let target = new RoomPosition(25,25,creep.memory.destinationRoom);
            //let target = new RoomPosition(25,25,'E68N26');

            creep.moveTo(target);
            return;
        }

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

            else if(creep.memory.repairMostDamagedFirst == true) {
	            //find something to repair
	            var damagedStructure = creep.room.find(FIND_STRUCTURES, {
				    filter: (object) => {
				        if (object.structureType === STRUCTURE_WALL) return false;
				        if (object.hits < object.hitsMax) return true;
				    }
				});

	            //console.log(damagedStructure);
				damagedStructure.sort((a,b) => a.hits - b.hits);
				//console.log(damagedStructure[0].structureType);

				if(damagedStructure.length > 0) {
				    if(creep.repair(damagedStructure[0]) == ERR_NOT_IN_RANGE) {
				        creep.moveTo(damagedStructure[0]);    
				    }
				}
			}
			else {
				//find closest non-wall to repair
				var damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (object) => {
				        if (object.structureType === STRUCTURE_WALL) return false;
				        if (object.hits < object.hitsMax) return true;
				    }
				});
				//console.log(damagedStructure);

				if(creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
				        creep.moveTo(damagedStructure);    
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
