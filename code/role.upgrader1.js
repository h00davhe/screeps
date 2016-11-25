module.exports = {
    //todo change all this to use states instead of a bunch of booleans to keep track of the current task

    run: function(creep) {

        //we ran out of energy upgrading, get more energy
        if (creep.carry.energy == 0) {
            creep.memory.upgrading = false;

            //check container for energy
            if (Game.getObjectById('58374c1ab2c90fb35402dee3').store[RESOURCE_ENERGY] > 0) {
                creep.memory.pickupFromContainer = true;
            }
            else{
                creep.memory.pickupFromContainer = false;
            }
        }
        //check if inventory is full, if it is, upgrade controller
        if(creep.carry.energy == creep.carryCapacity){
            if (creep.memory.upgrading == false) {
                creep.say("upgrading")
                creep.memory.upgrading = true;
            }
        }
        /*
        //check if the container still has energy
        if (Game.getObjectById('58374c1ab2c90fb35402dee3').store[RESOURCE_ENERGY] == 0) {
            creep.memory.pickupFromContainer = false;
        }
        */

        //There is energy in the container, pick it up
        if(creep.memory.pickupFromContainer && creep.memory.upgrading == false){

            let result = creep.withdraw(Game.getObjectById('58374c1ab2c90fb35402dee3'), RESOURCE_ENERGY)

            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById('58374c1ab2c90fb35402dee3').pos);
            }
            else if(result == OK){
                creep.memory.upgrading = true;
                creep.memory.pickupFromContainer = false;
            }
        }
        //Gather energy
	    else if(creep.carry.energy < creep.carryCapacity && creep.memory.upgrading == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0].pos);
            }
        }
        //Upgrade controller
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }        
	}
};


