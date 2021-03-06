module.exports = {
    run: function(creep,attackTarget){
        if(creep.pos.roomName != creep.memory.attackTarget.roomName) {
            //move to room
            creep.moveTo(attackTarget);
        }
        else{
            //on new room entry, force new pathfinding
            //first tick in new room creep.moveTo(pos, {reusePath: 0});

            //attack stuff
/*
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{
                //attack spawn

            }
*/
            //just rush spawn
            var targets = creep.room.find(FIND_HOSTILE_SPAWNS);
            //console.log(targets);
            var target;
            if(targets.length) {
                if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else if(target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) {
                //kill creeps
//                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
//                    creep.moveTo(target);
//                }
                creep.moveTo(target);
                creep.attack(target);

            }
            else {
                //todo exclude controller from targets
                target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                if(target) {
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
};