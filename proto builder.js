/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 module.exports = function(creep){
     	var spawn = creep.memory.home
	    spawn = Game.getObjectById(spawn.id)

	    var target;
	if(creep.memory.target == "none"){
	    target = getTarget(creep,creep.memory.task)
	}
	target = Game.getObjectById(creep.memory.target.id)

	if(creep.energy == 0 && Memory.workers > 1 && Memory.transfers > 1 ) {
		creep.moveTo(spawn);
		spawn.transferEnergy(creep);
	}
	else if(creep.memory.target != 'none' && creep.memory.task != 'construction'){

	    creep.moveTo(target)
	    creep.build(target)
	    if(target.progress >= target.progressTotal)creep.memory.target = "none";
	}
	else if(creep.memory.target != 'none' && creep.memory.task == "construction"){

	}
    else if(Game.flags.bMove != undefined)
    {
      var targets = Game.flags.bMove.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
      }
    }
}

function getTarget(creep,task){
    var target;
    if(task == "construction"){
       target = creep.room.find(FIND_CONSTRUCTION_SITES);
    }
    if(task == "roads" || target == 'undefined'){
            targets = creep.room.find(FIND_STRUCTURES, {filter: function(object){
            if(object.hits < object.hitsMax*.5 && object.structureType == STRUCTURE_ROAD)return object;
          }})
        }
    if(task == "roads"|| target.length==0){
            targets = creep.room.find(FIND_STRUCTURES, {filter: function(object){
            if(object.hits < object.hitsMax*.5 && object.structureType == STRUCTURE_ROAD)return object;
          }})
        }
    if(task == "ramparts"|| target.length==0){
            targets = creep.room.find(FIND_STRUCTURES, {filter: function(object){
            if(object.hits < 1000000 && (object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL))return object;
          }})
        }

    return target[0];
}
