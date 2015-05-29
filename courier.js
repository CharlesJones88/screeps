/**
 * Created by charlesjones on 5/26/15.
 */
module.exports = function (creep) {
    if(creep.memory.task == "spawn")
    {
        creep.memory.task = "controller";
    }

    var spawn = Game.spawns.Spawn1;
    var ctrl = creep.room.controller;
    var task = creep.memory.task;
    // if(creep.memory.role == "controller")
    {
        if(creep.energy == 0 )
        {
            creep.memory.task = "going";
            creep.moveTo(spawn);
            if(Memory.totalEnergy < 500)
            {
                spawn.transferEnergy(creep,25);
            }
            else if(Memory.totalEnergy < 100)
            {
                spawn.transferEnergy(creep,5);
            }
            else
            {
                spawn.transferEnergy(creep);
            }
        }
        else
        {
            creep.memory.task = "coming";
            creep.moveTo(ctrl);
            creep.memory.task = "working";
            creep.upgradeController(ctrl);
        }
    }/*
     else if(creep.memory.role == "extension")
     {
     if(creep.energy == 0 )
     {
     creep.moveTo(spawn);
     spawn.transferEnergy(creep);
     }
     else
     {
     var extension = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter:
     function(object){
     return object.structureType == "extension" && object.energy < object.energyCapacity

     }})
     creep.moveTo(extension);
     creep.transferEnergy(extension);
     }
     }
     */
}