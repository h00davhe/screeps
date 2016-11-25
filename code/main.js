
var roleHarvester1 = require('role.harvester1');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader1 = require('role.upgrader1');
var roleUpgrader2 = require('role.upgrader2');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleReserver = require('role.reserver');
var roleRemoteHarvester = require('role.remoteHarvester');

module.exports.loop = function () {
    
    //remove unused creep memory
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
            console.log('Clearing non-existing creep memory:', i);
        }
    }

    var attack = false;
    var attackTarget = new RoomPosition(30, 23, 'E68N27');
    //var reserveTarget = new RoomPosition(25, 25, 'E68N26');
    var reserveTarget = 'E68N26';
    const REMOTEHARVESTTARGET = 'E68N26'
    
    //find number of creeps by role
    var harvester1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var harvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var upgrader1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
    var upgrader2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var emergencyHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergencyHarvester');
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var reserver = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');
    var remoteHarvester1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester1');
    var remoteHarvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester2');

    //console.log('Harvesters: ' + harvesters.length);

    //auto-spawn
    if (harvester1.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvester1'});
        if (!(newName < 0)) console.log('Spawning new harvester1: ' + newName);
    }
    if (harvester2.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvester2'});
        if (!(newName < 0)) console.log('Spawning new harvester2: ' + newName);
    }
    if (harvester1.length < 1 && harvester2.length < 1 && emergencyHarvester.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'emergencyHarvester'});
        if (!(newName < 0)) console.log('Spawning new emergencyharvester: ' + newName);
    }
    //Only spawn other creeps if we already have harvesters
    if (harvester1.length > 1 && harvester2.length > 1) {
        if (upgrader1.length < 4) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader1'});
            if (!(newName < 0)) console.log('Spawning new upgrader1: ' + newName);
        }
        if (upgrader2.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader2'});
            if (!(newName < 0)) console.log('Spawning new upgrader2: ' + newName);
        }
        if (builder.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'builder', repairMostDamagedFirst: false});
            if (!(newName < 0)) console.log('Spawning new builder: ' + newName);
        }
        if (attacker.length < 1 && attack) {
            var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, MOVE], undefined, {role: 'attacker'});
            if (!(newName < 0)) console.log('Spawning new attacker: ' + newName);
        }
        if (reserver.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([CLAIM, CLAIM, MOVE, MOVE], undefined, {role: 'reserver', destinationRoom: reserveTarget});
            if (!(newName < 0)) console.log('Spawning new reserver: ' + newName);
        }
        if (remoteHarvester1.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'remoteHarvester1', destinationRoom: REMOTEHARVESTTARGET, sourceNumber: 0});
            if (!(newName < 0)) console.log('Spawning new remoteHarvester1: ' + newName);
        }
        if (remoteHarvester2.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'remoteHarvester2', destinationRoom: REMOTEHARVESTTARGET, sourceNumber: 1});
            if (!(newName < 0)) console.log('Spawning new remoteHarvester2: ' + newName);
        }
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
        else if(creep.memory.role == 'emergencyHarvester') {
            roleHarvester1.run(creep);
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
        else if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep, attackTarget);
        }
        else if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        }
        else if(creep.memory.role == 'remoteHarvester1' || creep.memory.role == 'remoteHarvester2') {
            roleRemoteHarvester.run(creep);
        }
    }

    //run towers
    //todo:make towers repair
    
    var tower = Game.getObjectById('5831e51e80d1b074327a9522');
    //console.log(tower);

    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            tower.attack(closestHostile);
        }
    }

    tower = Game.getObjectById('5835b3171f2aeccc2db73850');

    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            tower.attack(closestHostile);
        }
    }

/*  Needs some more work
    var hostiles = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        //var username = hostiles[0].owner.username;
        //Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.spawns['Spawn1'].room.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
*/

/*  implement this to attack closest creep first
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
*/
}
