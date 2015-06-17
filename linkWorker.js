/**
 * Created by charles on 6/16/15.
 */
module.exports = function(creep) {
    var target = creep.memory.target;
    target = Game.getObjectById(target.id);

    if(creep.energy == creep.energyCapacity) {
        creep.moveTo(target);
        creep.transferEnergy(target);
    }
    else {
        if(creep.pos.inRangeTo(target,7)) {
            var source = creep.pos.findClosest(FIND_SOURCES);
            creep.moveTo(source);
            creep.harvest(source);
        }
        else {
            var x = creep.moveTo(target);
            console.log(x);
        }
    }
};