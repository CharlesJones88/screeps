/**
 * Created by charles on 6/10/15.
 */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('janitor'); // -> 'a thing'
 */
module.exports = function(creep) {
    var spawn = creep.memory.home;
    var sources = creep.memory.target;
    var target;
    if(creep.energy < creep.energyCapacity) {
        target = creep.pos.findClosest(FIND_DROPPED_ENERGY);
        if(target) {
            creep.moveTo(target);
            creep.pickup(target);
        }
        if(creep.pos.isNearTo(transfer))
            creep.transferEnergy(transfer);
    }
    else {
        if(creep.memory.task == "meeting") {
            target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                function(object){
                    if(object.memory.role =="transfer" && object.memory.target.id == creep.id)return object;}});

            if(target == undefined) {
                creep.memory.task ="going";
            }
            else {
                creep.moveTo(target);
                creep.transferEnergy(target);
            }
        }
        else {
            target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                function(object){
                    if(object.memory.role =="transfer" && object.memory.target.id == creep.id)return object;}});
            if(target != undefined && target != null) {
                creep.memory.task = "meeting";
            }
            creep.memory.task = "going";
            creep.moveTo(spawn);
            creep.transferEnergy(spawn);
        }
    }
};

