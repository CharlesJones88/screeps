/**
 * Created by charlesjones on 5/26/15.
 */
module.exports = function(spawn1)
{
    var transfers;
    var couriers;
    var builders;
    var warriors;
    var harvesters;
    var workers;
    //var medics;
    this.spawn1 = spawn1;
    //Bodies
    var workerBody = [WORK,WORK,CARRY,MOVE];
    var transferBody = [CARRY,MOVE,MOVE,MOVE];
    var courierBody = [CARRY,WORK,WORK,MOVE];
    var warriorBody = [TOUGH,ATTACK,ATTACK,MOVE,MOVE];
    /*
     var target;
     for(var source in Memory.safeSources)
     {
     source = Memory.safeSources[source];
     var creeps = spawn1.room.find(FIND_MY_CREEPS,{filter:{target:source}})
     if(creeps.length < 3)
     {
     target = source;
     spawn1.createCreep(workerBody,undefined,{role:"worker",target:target});
     break;
     }
     }
     var creeps = spawn1.room.find(FIND_MY_CREEPS,{filter:{role:"trasfer",target:source}})
     */


    //First tier
    if(this.spawn1.energy > 5500)
    {
        workers = 15;
        couriers = 12;
        warriors = 12;
        builders = 5;
    }
    else if(this.spawn1.energy > 4250)
    {
        workers = 15;
        warriors = 9;
        couriers = 9;
        builders = 5;
    }
    else if(this.spawn1.energy > 3500)
    {
        workers = 13;
        warriors = 6;
        couriers = 6;
        builders = 5;
    }
    else if(this.spawn1.energy > 1500)
    {
        workers = 9;
        warriors = 3;
        couriers = 4;
        builders =4;

    }
    else if(this.spawn1.energy > 1000)
    {
        workers = 7;
        warriors = 1;
        couriers = 3;
        builders = 3;
    }
    else if(this.spawn1.energy > 750)
    {
        harvesters = 10;
        workers = 5;
        couriers = 2;
    }
    else
    {
        harvesters = 5;
        workers = 2;
        couriers = 0;
        builders = 0;
    }
    transfers = workers;

    // CREATE LOGIC
    var target;
    if(Memory.warriors < warriors)
    {
        var flags = this.spawn1.room.find(FIND_FLAGS, {filter:{color:COLOR_RED}});

        for(var flag in flags)
        {
            flag = flags[flag];
            var creeps = flag.room.find(FIND_MY_CREEPS, {filter:{role:"warrior",post: flag}});
            if(creeps.length < warriors/flags.length) {
                target = flag; break;
            }
        }
        this.spawn1.createCreep(warriorBody,undefined,{role:"warrior",post:target,task:"waiting"})
    }
    else if(Memory.workers < workers ) {
        var index = Memory.curSource;
        console.log(Memory.curSource);
        console.log("Spawning worker for " + Memory.curSource);
        Memory.curSource += 1;
        if(Memory.curSource >= Memory.safeSources.length) {
            Memory.curSource = 0;
        }
        target = Memory.safeSources[index];

        this.spawn1.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming"});
    }
    else if(Memory.couriers < couriers) {
        console.log("Spawning courier");
        this.spawn1.createCreep(courierBody,undefined, {role:"courier"});
    }
    else if(Memory.transfers < transfers) {
        console.log("Spawning Transfer");
        var count = this.spawn1.room.find(FIND_MY_CREEPS, {filter:
            function(object) {
                if(object.memory.role =="transfer" && object.memory.task == "extension")
                    return object;
            }
        });
        var eCount = spawn1.room.find(FIND_MY_STRUCTURES, {filter:
            function(object) {
                return object.structureType == "extension";
            }
        });
        var task;
        if(count.length <= eCount.length*.5) {
            task="extension"
        }
        else {
            task ="source";
        }
        this.spawn1.createCreep(transferBody,undefined, {role:"transfer", target:"none", task:task});
    }
    else if(Memory.builders < builders && this.spawn1.room.find(FIND_CONSTRUCTION_SITES).length) {
        console.log("Spawning builder");
        this.spawn1.createCreep([WORK,CARRY,MOVE,MOVE],undefined, {role:"builder"});
    }
}