//todo: spawn builders only when there are unfinished buildings - then despawn them
//todo do something about creeps dying while carrying energy

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