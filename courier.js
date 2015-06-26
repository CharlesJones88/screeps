module.exports = function (creep) {

  var spawn = creep.memory.home
  spawn = Game.getObjectById(spawn.id)
    var ctrl = creep.room.controller;
    var task = creep.memory.task;
   // if(creep.memory.role == "controller")
    {
        if(creep.energy == 0)
        {
            creep.memory.task = "going";
            var link = creep.room.controller.pos.findClosest(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_LINK},algorithm:"astar",maxOps:50})

            if(link != null)
            if(creep.room.controller.pos.getRangeTo(link) < 5){
                creep.moveTo(link);
                link.transferEnergy(creep);
                return;
            }

            creep.moveTo(spawn);
            if(Memory.totalEnergy < 500)
            {
                spawn.transferEnergy(creep,50);
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
            //var nearCreep = creep.pos.findClosest(FIND_MY_CREEPS, {filter:{role:"coureir",task:"working"}});
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
