//var _ = require('lodash');
module.exports = function(creep)
{
    var spawn = creep.memory.home;
    spawn = Game.getObjectById(spawn.id);

    //Logic to avoid source keepers
    //var avoidPosArray = [{39,37}];
    //avoidPosArray = _.map(avoidPosArray, function(o) {return room.getPositionAt(o.x, o.y);});
    //avoidPosArray.push(KnownSourceKeeper.pos);
    //Urist.moveTo(room.getPositionAt(12,12), {avoid: avoidPosArray});
    if(creep.energy < .45*creep.energyCapacity)
    {
        var target;
        if(creep.memory.target == "none" || creep.memory.target == undefined || creep.memory.target.name == creep.name)
        {

            target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){if(object.memory.role =="worker" && object.memory.task == "going" && object.memory.home.id == creep.memory.home.id)return object;}});
            if(target)
            {
                creep.memory.target = target;
                target.memory.task = "meeting";

            }
        else
            {
                target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){if(object.memory.role =="worker" && object.memory.task == "working" && object.memory.home.id == creep.memory.home.id)return object;}})
                creep.moveTo(target);
            }


        }
        else
        {
            var target = Game.getObjectById(creep.memory.target.id)
            if(creep.memory.target.energy == 0 || creep.memory.target.ticksToLive < 25 || creep.ticksToLive < 25 || creep.memory.target == undefined)
            {
                creep.memory.target = "none";
                var target = Game.getObjectById(creep.memory.target.id)

            }
            else if(target != null)
            {

                var target = Game.getObjectById(creep.memory.target.id);

                creep.moveTo(target);
            }
            else
            {
                creep.memory.target = "none";
            }

        }



    }
    else
    {
        creep.memory.target = "none";

        if(spawn.energy >= .95*spawn.energyCapacity)
        {
            //console.log("SPAWN REACHING CAPACITY, MOVING TO HELP COURIERS")
            var target = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter:function(object){if(object.structureType =="extension" && object.energy < object.energyCapacity)return object;}});
            //console.log(target)
            if(target == undefined || target == null)
            {
                target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){if(object.memory.role =="courier" && object.energy < object.energyCapacity)return object;}})
            }
            creep.moveTo(target);
            creep.transferEnergy(target)
        }
        else
        {
            creep.moveTo(spawn);
            creep.transferEnergy(spawn)
        }

    }

}
