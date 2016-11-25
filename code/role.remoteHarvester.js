module.exports = {
    run: function(creep) {

        if (creep.carry.energy == 0) creep.memory.harvesting = true;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.harvesting = false;

        /*
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER  ||
                structure.structureType == STRUCTURE_SPAWN  ||
                structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
        });
        */

        //harvest energy
        if(creep.memory.harvesting == true) {
            //Move to room
            if(creep.pos.roomName != creep.memory.destinationRoom) {
                creep.moveTo(new RoomPosition(25,25,creep.memory.destinationRoom));
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[creep.memory.sourceNumber]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.sourceNumber].pos);
                }
            }
        }
        //Otherwise leave energy
        else {
            let result = creep.transfer(Game.getObjectById('58374c1ab2c90fb35402dee3'), RESOURCE_ENERGY)

            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            /* not doing this, just wait for storage to get enough space
            else if(result == ERR_FULL){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            */
        }
        //otherwise upgrade controller
        /*
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);

                if (creep.memory.harvesting == true) {
                    creep.say("upgrading")
                    creep.memory.harvesting = false;
                }
            }
        }
        */
    }
};


