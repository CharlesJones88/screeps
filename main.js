//Add squad status tracker for room. Make them all return if they are near their flag and the status is PEACE

var doRoles = require('doRoles');
var prototypes = require('prototypes');
var rooms = require('rooms');
var spawn = require('spawn');
var cpuSpawn;

var cpuInit = Game.getUsedCpu();


for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}
prototypes();
//Init Rooms
var couriers = {};
var builders = {};
var workers = {};
var transfers = {};
var keeperKillers = {};
var kMedics = {};
var linkWorkers = {};
var repairs = {};
var nomads = {};

var squads = [];

var squadGroups = {};
for (var i = 1; i < 4; i++) {
    squadGroups[i] = {};
    squadGroups.medic = {};
    squadGroups.melee = {};
    squadGroups.ranged = {};
}

Memory.spawns = Game.spawns;

var cpuRooms = Game.getUsedCpu();
rooms();
console.log("ROOMS: " + (Game.getUsedCpu() - cpuRooms));
for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    //if(creep.fatigue > 0)continue;
    if(creep.memory.room == undefined){
        creep.memory.room = creep.room
    }
    var room = Game.rooms[creep.memory.room.name];

    if(creep.memory.role == "courier")
    {
        couriers[creep.name] = creep;
        room.memory.couriers.push(creep);
    }
    else if(creep.memory.role == "squad"){
        squads.push(creep);
        squadGroups[creep.memory.squad][creep.memory.task][creep.name] = creep;
        room.memory.squads.push(creep);
    }
    else if(creep.memory.role == 'builder') {
        builders[creep.name] = creep;
        room.memory.builders.push(creep);
    }
    else if(creep.memory.role == 'worker') {
        workers[creep.name] = creep;
        room.memory.workers.push(creep);
    }
    else if(creep.memory.role == 'transfer') {
        transfers[creep.name] = creep;
        room.memory.transfers.push(creep);
    }
    else if(creep.memory.role == "keeperKiller"){
        keeperKillers[creep.name] = creep;
        room.memory.keeperKillers.push(creep);
    }
    else if(creep.memory.role == "kMedic"){
        kMedics[creep.name] = creep;
        room.memory.kMedics.push(creep);
    }
    else if(creep.memory.role == "linkWorker"){
        linkWorkers[creep.name] = creep;
        room.memory.linkWorkers.push(creep);
    }
    else if(creep.memory.role == "repair"){
        repairs[creep.name] = creep;
        room.memory.repairs.push(creep);
    }
    else if(creep.memory.role == "nomad"){
        nomads[creep.name] = creep;
        room.memory.nomads.push(creep);
    }
    if(creep.name == "test"){
        creep.moveTo(Game.flags.TEST);
    }

}


Memory.couriers = couriers;
Memory.builders = builders;
Memory.workers = workers;
Memory.transfers = transfers;
Memory.keeperKillers = keeperKillers;
Memory.kMedics = kMedics;
Memory.linkWorkers = linkWorkers;
Memory.repairs = repairs;
Memory.nomads = nomads;
Memory.squads = squads;




doRoles();

cpuSpawn = Game.getUsedCpu();
spawn();
cpuSpawn = Game.getUsedCpu() - cpuSpawn;


//console.log("#############MEMORY USAGE#################")
console.log("SPAWN: " + cpuSpawn);