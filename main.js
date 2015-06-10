/**
 * Created by charlesjones on 5/26/15.
 */
var courier = require("courier");
var builder = require("builder");
var spawn = require("spawn");
var worker = require("worker");
var transfer = require("transfer");
var warrior = require("warrior");
var construct = require("construct");
var janitor = require("janitor");
var totCouriers = 0;
var totBuilders = 0;
var totTransfer = 0;
var totHarvesters = 0;
var totWorkers = 0;
var totWarriors = 0;
var totJanitor = 0;

Memory.totalEnergy = 0;
Memory.energyCapacity = 0;

var spawn1 = Game.spawns.Spawn1;
Memory.totalEnergy += spawn1.energy;
//ADD SEPARATE MODULE JUST FOR SPAWN LOGIC AND ROLE ASSIGNMENT
var totalEnergy = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES,
    {
        filter:function(object) {
            if(object.structureType == "extension") {
             Memory.totalEnergy += object.energy;
            }
        }
    });

for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    var dropped = creep.room.find(FIND_DROPPED_ENERGY);
    if(creep.pos.isNearTo(dropped)) {
        creep.pickup(dropped);
    }
    if(creep.memory.role == "courier") {
        courier(creep);
        totCouriers++;
    }
    else if(creep.memory.role == 'builder') {
        builder(creep);
        totBuilders++;
    }
    else if(creep.memory.role == 'worker') {
        worker(creep);
        totWorkers++;
    }
    else if(creep.memory.role == 'transfer') {
        transfer(creep);
        totTransfer++;
    }
    else if(creep.memory.role == undefined) {
        creep.memory.role = "worker";
        creep.memory.task = "coming";
        creep.memory.target = Memory.safeSources[Memory.curSource];
    }
    else if(creep.memory.role == 'warrior') {
        warrior(creep);
        totWarriors++;
    }
    else if(creep.memory.role == 'harvester') {
        harvester(creep);
        totHarvesters++;
    }
    else if(creep.memory.role == 'janitor') {
        janitor(creep);
        totJanitor++;
    }
}

//MemoryAssignment
Memory.couriers = totCouriers;
Memory.harvesters = totHarvesters;
Memory.builders = totBuilders;
Memory.workers = totWorkers;
Memory.transfers = totTransfer;
Memory.warriors = totWarriors;
spawn();