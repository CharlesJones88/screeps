/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
module.exports = function(creep) {
    var targets;
    if(creep.energy == 0 && Memory.workers > 1 && Memory.transfers > 1 ) {
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
    }
    else if(Game.flags.bMove) {
        creep.moveTo(Game.flags.bMove);
        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        }
    }
    else {
        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        }
    }
};