/**
 * Created by charlesjones on 5/26/15.
 */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
module.exports = function(creep){
    if(creep.energy == 0 && Memory.workers > 1 && Memory.transfers > 1 ) {
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
    }
    else if(Game.flags.bMove != undefined)
    {
        creep.moveTo(Game.flags.bMove);
    }
    else{
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        }
        else{
            if(creep.memory.target == "none" || creep.memory.target == undefined) {
                targets = creep.room.find(FIND_MY_STRUCTURES, {filter: function(object) {
                    if(object.hits < object.hitsMax *.5)
                        return object;
                }});
                creep.memory.target = targets[0];
            }
            else {
                var target = creep.memory.target;
                creep.moveTo(target);
                creep.repair(target);
                if(target.hits == target.hitsMax)
                    creep.memory.target = "none";
            }
        }
    }
};