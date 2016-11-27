//var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], undefined, {role: 'staticHarvester', destinationRoom: 'E67N26', containerId: '5837b16c23eca9532f5b25f5', state: 'moving'});
//if (!(newName < 0)) console.log('Spawning new staticHarvester: ' + newName);

module.exports = {
    run: function(creep){

        if(creep.memory.state == 'moving'){
            if(creep.pos.roomName != creep.memory.destinationRoom) {
                creep.moveTo(new RoomPosition(25,25,creep.memory.destinationRoom));
            }
            else{
                //in correct room, move to position
                let destination = Game.getObjectById(creep.memory.containerId);
                if(creep.pos != destination.pos){
                    creep.moveTo(destination.pos);
                }
                else{
                    creep.memory.state = 'harvesting'
                }
            }
        }
        if(creep.state == 'harvesting'){
            let container = Game.getObjectById(creep.memory.containerId);

            if(container.store[RESOURCE_ENERGY] != container.storeCapacity){
                creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES))
            }
        }
    }
};
