var roleHarvester1 = require('role.harvester1');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader1 = require('role.upgrader1');
var roleUpgrader2 = require('role.upgrader2');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
            console.log('Clearing non-existing creep memory:', i);
        }
    }
    
    //find number of creeps by role
    var harvester1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var harvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var upgrader1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
    var upgrader2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Harvesters: ' + harvesters.length);

    //auto-spawn
    if(upgrader1.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader1'});
        console.log('Spawning new upgrader1: ' + newName);
    }
    if(upgrader2.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader2'});
        console.log('Spawning new upgrader2: ' + newName);
    }
    if(harvester1.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester1'});
        console.log('Spawning new harvester1: ' + newName);
    }
    if(harvester2.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester2'});
        console.log('Spawning new harvester2: ' + newName);
    }
    if(builder.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }

    //run creep roles
    for(var i in Game.creeps) {
        var creep = Game.creeps[i];
        if(creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
        }
        else if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        else if(creep.memory.role == 'upgrader1') {
            roleUpgrader1.run(creep);
        }
        else if(creep.memory.role == 'upgrader2') {
            roleUpgrader2.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
