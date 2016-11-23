module.exports = {
    run: function(creep,attackTarget){
        if(creep.pos.roomName != attackTarget.roomName) {
            //move to room
            creep.moveTo(attackTarget);
        }
        else{
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
            if(targets.length) {
                if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else if(var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) {
                //kill creeps
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                let target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                if(target) {
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
};