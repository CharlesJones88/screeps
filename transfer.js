/**
 * Created by charlesjones on 5/26/15.
 */
module.exports = function(creep)
{
    var spawn = Game.spawns.Spawn1;

    if(creep.energy < .45*creep.energyCapacity)
    {
        var target;
        if(creep.memory.target == "none" || creep.memory.target == undefined || creep.memory.target.name == creep.name)
        {

            target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){if(object.memory.role =="worker" && object.memory.task == "going")return object;}});
            if(target)
            {
                creep.memory.target = target;
                target.memory.task = "meeting";
            }
            else
            {
                target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){if(object.memory.role =="worker" && object.memory.task == "working")return object;}});
                creep.moveTo(target);
            }
        }
        else
        {
            var target = Game.getObjectById(creep.memory.target.id);
            if(creep.memory.target.energy == 0 || creep.memory.target.ticksToLive < 25 || creep.ticksToLive < 25 || creep.memory.target == undefined)
            {
                creep.memory.target = "none";
                var target = Game.getObjectById(creep.memory.target.id);

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

        if(Game.spawns.Spawn1.energy >= .95*Game.spawns.Spawn1.energyCapacity)
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
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1);
        }

    }

};