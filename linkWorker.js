module.exports = function(creep){
   	if(creep.fatigue > 0)return;
	var target = creep.memory.target;
	target = Game.getObjectById(target.id);

	if(creep.energy == creep.energyCapacity) {
		creep.moveTo(target,{reusePath:20});
		creep.transferEnergy(target);
	}
	else {
		if(creep.pos.inRangeTo(target, 3)) {
			var source = creep.pos.findClosest(FIND_SOURCES, {maxOps:50});
			if(creep.pos.isNearTo(source)) {
				creep.harvest(source);
				if(creep.pos.isNearTo(target)) {
					creep.transferEnergy(target);
				}
			}
			else {
				creep.moveTo(source);
			}
		}
		else {
			var x = creep.moveTo(target,{reusePath:25});
		}
	}
};
