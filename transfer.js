module.exports = function(creep) {
	var startCpu = Game.getUsedCpu();
	if(creep.fatigue > 0)return;
	var spawn = creep.memory.home;
	spawn = Game.getObjectById(spawn.id);
	if(spawn == null) {
		spawn = Game.spawns.Spawn1;
		console.log(spawn + "XXXXXX");
	}
	var room = Game.rooms[creep.memory.room.name];
	var workers = room.memory.workers;
	var couriers = room.memory.couriers;
	var task = 'init';

	if(creep.energy < .15*creep.energyCapacity) {
		var target;
		if(creep.memory.target == "none" || creep.memory.target == undefined || creep.memory.target.name == creep.name) {
			task = 'assign target find going';
			target = creep.pos.findClosest(workers, {filter:function(object) {
				if(object.memory.task == "going")
					return object;
			},maxOps:100});
			if(target) {
				creep.memory.target = target;
				target.memory.task = "meeting";
			}
			else {
				task = 'assign target find working';
				target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object) {
					if(object.memory.task == "working" && object.memory.role == "worker" && object.energy >= .3*object.energyCapacity )
						return object;
				},maxOps:100});
				creep.moveTo(target);
			}
		}
		else {
			task = 'move to target';
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
		if(spawn.energy >= .95*spawn.energyCapacity) {
			if(creep.room.memory.roomEnergy < creep.room.memory.energyCapacity) {
				task = 'assign target extension'
				var target = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter:function(object) {
					if(object.structureType =="extension" && object.energy < object.energyCapacity)
						return object;
				},algorithm:'dijkstra',maxOps:100});
				//console.log(target)
			}
			if(target == undefined || target == null)
			{
				task = 'assign target courier';
				target = creep.pos.findClosest(couriers, {filter:function(object) {
					if(object.energy < object.energyCapacity)
						return object;
				},algorithm:'astar',maxOps:100});
			}
			if(creep.pos.isNearTo(target)) {
				creep.transferEnergy(target);
			}
			else {
				creep.moveTo(target);
			}
		}
		else {
			creep.moveTo(spawn);
			creep.transferEnergy(spawn);
		}
	}
	creep.memory.task = task;
	var elapsed = Game.getUsedCpu() - startCpu;
	if(elapsed > 5) {
		//console.log("XXXXXXXXXXXXXXXXXX: " + task + " " + elapsed + " " + creep.memory.room.name)
	}
};