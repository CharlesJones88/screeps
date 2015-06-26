module.exports = function (creep) {
        var sources = creep.memory.target
        if(sources == undefined || sources == 1)
        {
              sources = creep.pos.findClosest(FIND_SOURCES)
        }
        else
        {
            sources = Game.getObjectById(sources["id"])
        }
        //var sources = Game.getObjectById(creep.memory.target["id"]);
//todo    var emptySpawn = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter: function(object) {return (object.structureType == STRUCTURE_EXTENSION) }});
        if(creep.energy < creep.energyCapacity) {
            creep.memory.task = "coming";
            creep.moveTo(sources);
            creep.memory.task = "working";
            creep.harvest(sources);
        }
        else {
            creep.memory.task = "going";
            var nearby = creep.pos.findInRange(FIND_MY_CREEPS,1,{task:"coming"})
            for(var x in nearby)
            {
                nearby[x].move(TOP_RIGHT);
            }
            creep.moveTo(Game.spawns.Spawn1);
            
            creep.transferEnergy(Game.spawns.Spawn1)

        }
    
    
}