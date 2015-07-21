module.exports = function(creep) {
	var startCpu = Game.getUsedCpu();
	if(creep.room.memory.roomEnergy == creep.room.memory.energyCapacity && creep.energy > .5 * creep.energyCapacity && creep.room.controller.level > 5)
		return;
	if(creep.fatigue > 0)return;
	var spawn = creep.memory.home;
	spawn = Game.getObjectById(spawn.id);
	if(spawn == null) {
		spawn = Game.spawns.Spawn1;
		console.log(spawn + "XXXXXX");
	}
	var room;
	if(creep.memory.room != undefined)
		room = Game.rooms[creep.memory.room.name];
	else
		room = Game.rooms[creep.memory.home.pos.roomName];
	var workers = room.memory.workers;
	var couriers = room.memory.couriers;
	var task = 'init';

	if(creep.energy < .5 * creep.energyCapacity && creep.memory.task != 'depositing') {
		var target;
		var nodes = creep.room.memory.structures.links.nodes;
		var node
		if(nodes.length > 0) {
			for(node in nodes) {
				node = Game.getObjectById(nodes[node]);
				if(node.energy > 0) {
					creep.memory.target = 'node';
					break;
				}
			}
		}
		if(creep.memory.target == 'node') {
			if(creep.pos.isNearTo(node)) {
				node.transferEnergy(creep);
			}
			else {
				creep.moveTo(node);
			}
		}
		if(creep.memory.target == "none" || creep.memory.target == undefined || creep.memory.target.name == creep.name) {
			target = creep.pos.findClosest(workers, {filter:function(object) {
				if(object.memory.task == "going")
					return object;
			}});
			if(target) {
				creep.memory.target = target;
                target.memory.transfer = creep;
				target.memory.task = "meeting";
			}
			else {
				target = creep.pos.findClosest(workers, {filter:function(object) {
					if(object.memory.task == "working" && object.energy >= .3 * object.energyCapacity)
						return object;
				}});
				creep.moveTo(target);
			}
		}
		else {
			var target = Game.getObjectById(creep.memory.target.id);
			if(creep.memory.target.energy == 0 || creep.memory.target.ticksToLive < 25 || creep.ticksToLive < 25 || creep.memory.target == undefined) {
				creep.memory.target = "none";
				var target = Game.getObjectById(creep.memory.target.id);
			}
			else if(target != null) {
				var target = Game.getObjectById(creep.memory.target.id);
				creep.moveTo(target);
			}
			else {
				creep.memory.target = "none";
			}
		}
	}
	else {
        creep.memory.target = "none";
        creep.memory.task = 'depositing';
        creep.depositEnergy();
        if (creep.energy == 0) {
            creep.memory.task = 'Getting energy';
        }
    }
	var elapsed = Game.getUsedCpu() - startCpu;
	if(elapsed > 5) {
		//console.log("XXXXXXXXXXXXXXXXXX: " + task + " " + elapsed + " " + creep.memory.room.name)
	}
};
