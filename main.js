var courier = require("courier");
var builder = require("builder");
var spawn = require("spawn");
var worker = require("worker");
var transfer = require("transfer");
var warrior = require("warrior");
var construct = require("construct");
var squad = require("squad");
//var keeperKiller = require("keeperKiller");
var kMedic = require("kMedic");
var linkWorker = require("linkWorker");
for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}
var totCouriers=0;
var totHarvesters=0;
var totBuilders = 0;
var totJanitors=0;
var totTransfer = 0;
var totWorkers =0;
var totWarriors=0;
Memory.totalEnergy = 0;
Memory.energyCapacity = 0;
var spawn1 = Game.spawns.Spawn1;
Memory.totalEnergy += spawn1.energy
//ADD SEPARATE MODULE JUST FOR SPAWN LOGIC AND ROLE ASSIGNMENT
var totalEnergy = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter:function(object){
    if(object.structureType == "extension"){Memory.totalEnergy += object.energy}
}})
var squads = [];
for(var name in Game.creeps) {

    var creep = Game.creeps[name];

    var dropped = creep.pos.findClosest(FIND_DROPPED_ENERGY)
    if(creep.pos.isNearTo(dropped))
    {
        creep.pickup(dropped);
    }
    if(creep.memory.role == "courier")
    {
        courier(creep);
        totCouriers++;
    }
    else if(creep.memory.role == "squad"){
        squads.push(creep);
        squad(creep);
    }
    else if(creep.memory.role == 'builder') {
        builder(creep);
        totBuilders++;
    }
    else if(creep.memory.role == 'worker') {
        if(creep.memory.target == undefined)creep.memory.source = Memory.safeSources[Memory.curSource];
        worker(creep);
        totWorkers++;
    }
    else if(creep.memory.role == 'transfer') {
        transfer(creep);
        totTransfer++;
    }
    else if(creep.memory.role == "warrior")
    {
        warrior(creep);
        totWarriors++;
    }
    else if(creep.memory.role == "keeperKiller"){
        keeperKiller(creep);
    }
    else if(creep.memory.role == "kMedic"){
        kMedic(creep);
    }
    else if(creep.memory.role == "linkWorker"){
        linkWorker(creep);
    }
}

//MemoryAssignment
Memory.couriers = totCouriers;
Memory.builders = totBuilders;
Memory.workers = totWorkers;
Memory.transfers = totTransfer;
Memory.warriors = totWarriors;
Memory.squads = squads;

if(Game.spawns.Spawn1.room.name == "sim")
{
    Game.creeps.test.memory.role = "keeperKiller"
    Game.creeps.test1.memory.role = "kMedic"
    Game.creeps.test2.memory.role = "kMedic"
    keeperKiller(Game.creeps.test)
    kMedic(Game.creeps.test1)
    kMedic(Game.creeps.test2)

    return;
}
else
{
    spawn();
}
