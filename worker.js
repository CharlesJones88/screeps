module.exports = function (creep) {
    var spawn = creep.memory.home;
    spawn = Game.getObjectById(spawn.id);
    var sources = creep.memory.target;
    if(sources == undefined || sources == 1)
    {
        sources = creep.pos.findClosest(FIND_SOURCES);
    }
    else{
        var sources = creep.memory.target;
        sources = Game.getObjectById(sources["id"])
    }

    if(creep.energy < creep.energyCapacity) {

        creep.moveTo(sources);
        creep.memory.task = "working";
        creep.harvest(sources);
        var transfer = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
            function(object){
                if(object.memory.role =="transfer" && object.memory.target == "none")return object;}});
        if(creep.pos.isNearTo(transfer))
        {
            creep.transferEnergy(transfer);
        }
    }
    else {
        var nearby = creep.pos.findInRange(FIND_MY_CREEPS,1,{task:"coming"});
        for(var x in nearby)
        {
            nearby[x].move(TOP_RIGHT);
        }

        if(creep.memory.task == "meeting")
        {
            var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                function(object){
                    if(object.memory.role =="transfer" && object.memory.target.id == creep.id)return object;}});

            if(target  == undefined)
            {
                creep.memory.task ="going";
            }
            else
            {
                creep.moveTo(target);
                creep.transferEnergy(target);
            }
        }
        else
        {
            var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                function(object){
                    if(object.memory.role =="transfer" && object.memory.target.id == creep.id)return object;}});
            if(target != undefined && target != null)
            {
                creep.memory.task = "meeting";
            }
            creep.memory.task = "going";
            creep.moveTo(spawn);
            creep.transferEnergy(spawn);
        }



    }
};
