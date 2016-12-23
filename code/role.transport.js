module.exports = {
    run: function(creep){

        //handle states
        if (creep.carry.energy == 0) {
            creep.memory.state = 'pickup';
        }


        if(creep.memory.state == 'pickup'){
            let container = Game.getObjectById(creep.memory.sourceContainerId);

            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }

            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'dropoff';
                //creep.say("upgrading")
            }
        }

        if(creep.state == 'dropoff'){
            let container = Game.getObjectById(creep.memory.destContainerId);

            if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
};
