//todo: spawn builders only when there are unfinished buildings - then despawn them

//make new repair creep, spawn on demand - then despawn, make list of stuff that needs repair - sort lowest hp - finish repairing before getting new target
//update list every 50? ticks when no repairer is active, more often when active or when creep calls for new repair target

//make harvesters deliver energy to closest storage
//pass variable to select which source to harvest from, store in memory - make single harvest class

//priority energy delivery to towers, when below a certain energy limit - fix tower attack and make them resist drain attacks, attack at full range till energy limit

//explore miner/transport setup
//use turret for maintenance?


//saving these room.energyAvailable & room.energyCapacityAvailable
//creep.moveTo(new RoomPosition(25, 25, 'E68N26'));

//Works in console
//Game.creeps.Lila.pickup(Game.creeps.Lila.pos.findClosestByRange(FIND_DROPPED_ENERGY))

var roleHarvester1 = require('role.harvester1');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader1 = require('role.upgrader1');
var roleUpgrader2 = require('role.upgrader2');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');

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
    
    //find number of creeps by role
    var harvester1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var harvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var upgrader1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
    var upgrader2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var emergencyHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergencyHarvester');
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');

    //console.log('Harvesters: ' + harvesters.length);

    //auto-spawn
    if(harvester1.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvester1'});
        if (!(newName < 0)) console.log('Spawning new harvester1: ' + newName);
    }
    if(harvester2.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvester2'});
        if (!(newName < 0)) console.log('Spawning new harvester2: ' + newName);
    } 
    if(upgrader1.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader1'});
        if (!(newName < 0)) console.log('Spawning new upgrader1: ' + newName);
    }
    if(upgrader2.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader2'});
        if (!(newName < 0)) console.log('Spawning new upgrader2: ' + newName);
    }
    if(builder.length < 2 && harvester1.length > 1 && harvester2.length > 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder', repairMostDamagedFirst: false});
        if (!(newName < 0)) console.log('Spawning new builder: ' + newName);        
    }
    if(harvester1.length < 1 && harvester2.length < 1 && emergencyHarvester.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'emergencyHarvester'});
        if (!(newName < 0)) console.log('Spawning new emergencyharvester: ' + newName);
    }
    if(attacker.length < 2 && attack && harvester1.length > 1 && harvester2.length > 1) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], undefined, {role: 'attacker'});
        if (!(newName < 0)) console.log('Spawning new attacker: ' + newName);
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

    var tower = Game.getObjectById('5835b3171f2aeccc2db73850');

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
