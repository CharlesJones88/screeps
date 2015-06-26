var courier = require("courier");
var builder = require("builder");
var spawn = require("spawn");
var worker = require("worker");
var transfer = require("transfer");
var warrior = require("warrior");
var construct = require("construct");
var squad = require("squad");
var keeperKiller = require("keeperKiller");
var kMedic = require("kMedic");
var linkWorker = require("linkWorker");
var repair = require("repair");
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
    var rooms = Game.rooms;
    for(var room in rooms){
        room = rooms[room]
        room.memory.couriers = [];
        room.memory.squads = [];
        room.memory.builders = [];
        room.memory.workers = [];
        room.memory.transfers = [];
        room.memory.warriors=[];
        room.memory.keeperKillers = [];
        room.memory.kMedics=[];
        room.memory.linkWorkers=[];
        room.memory.repairs=[];
    }
    for(var name in Game.creeps) {
         var startCpu = Game.getUsedCpu();

    // creep logic goes here


        var creep = Game.creeps[name];
        var room = Game.rooms[creep.memory.room.name]

        var dropped = creep.pos.findClosest(FIND_DROPPED_ENERGY)
        if(creep.pos.isNearTo(dropped))
    	{
    	    creep.pickup(dropped);
    	}


        if(creep.memory.role == "courier")
        {
            courier(creep);
            room.memory.couriers.push(creep);
            totCouriers++;
        }
        else if(creep.memory.role == "squad"){
            squads.push(creep);
            room.memory.squads.push(creep);
            squad(creep);
        }
        else if(creep.memory.role == 'builder') {
            builder(creep);
            room.memory.builders.push(creep);
            totBuilders++;
        }
        else if(creep.memory.role == 'worker') {
            worker(creep);
            room.memory.workers.push(creep);
            totWorkers++;
        }
        else if(creep.memory.role == 'transfer') {
            transfer(creep);
            room.memory.transfers.push(creep);
            totTransfer++;
        }
        else if(creep.memory.role == "warrior")
        {
            warrior(creep);
            room.memory.warriors.push(creep);
            totWarriors++;
        }
        else if(creep.memory.role == "keeperKiller"){
          keeperKiller(creep);
          room.memory.keeperKillers.push(creep);
        }
        else if(creep.memory.role == "kMedic"){
          kMedic(creep);
          room.memory.kMedics.push(creep);
        }
        else if(creep.memory.role == "linkWorker"){
          linkWorker(creep);
          room.memory.linkWorkers.push(creep);
        }
        else if(creep.memory.role == "repair"){
            repair(creep);
            room.memory.repairs.push(creep);
        }
        //Print cpu usage per creep
         var elapsed = Game.getUsedCpu() - startCpu;
         if(elapsed > 20)
        console.log('Creep '+creep.memory.role+creep.memory.task +' has used '+elapsed+' CPU time');
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
