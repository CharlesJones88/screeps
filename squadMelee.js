module.exports = function(creep, flag) {
	if(flag.color == COLOR_CYAN) {
		creep.moveTo(flag);
	}
	else if(flag.color == COLOR_RED) {
		if(creep.room != flag.room) {
			creep.moveTo(flag);
			return;
		}
		if(creep.room.memory.hostileCreep.length > 0) {
			creep.findAndAttack();
		}
		else {
			if(creep.pos.inRangeTo(flag,2)) {
				return;
			}
			creep.moveTo(flag, {reusePath:20});
		}
	}
	else if(flag.color == COLOR_YELLOW) {
		attackPoint(creep,flag);
	}
	else if(flag.color == COLOR_GREY) {
		if(creep.room != flag.room) {
			creep.moveTo(flag, {reusePath:20});
		}
		else {
			creep.moveTo(flag.room.controller);
			creep.claimController(flag.room.controller);
		}
	}
	else if(flag.color == COLOR_WHITE) {
		holdPosition(creep,flag);
	}
	else if(flag.color == COLOR_BLUE) {
		rally(creep,flag);
	}
};

function holdPosition(creep,flag) {
	var order = flag.name.split('-')[1];
	var x = flag.pos.x;
	var y = flag.pos.y;
	if(creep.room != flag.room) {
		creep.moveTo(flag);
		return;
	}
	if(order == "Top") {
		y+=2;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			x++;
		}
	}
	else if(order == "Bottom"){
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			x++;
		}
	}
	else if(order == "Left") {
		x+=2;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			y++;
		}
	}
	else if(order == "Right") {
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			y++
		}
	}

	if(creep.pos.x == x && creep.pos.y == y) {
		attackNear(creep);
	}
	else{
		creep.moveTo(x,y);
	}
}

function attackPoint(creep,flag) {
	if(creep.room != flag.room) {
		creep.moveTo(flag);
		return;
	}
	var target = creep.room.lookForAt('structure',flag);

	if(target == undefined)
		target = flag.pos.findClosest(FIND_HOSTILE_STRUCTURES, {filter:function(object) {
			if(object.owner != undefined && object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman" && object.owner.username !="hesto2" && object.structureType != STRUCTURE_CONTROLLER) {
				return object;
			}
		}});
	else {
		target = target[0];
	}
	if(target) {
		creep.moveTo(flag);
		creep.attack(target);
	}
	else {
		creep.moveTo(flag);
	}
}

function attackNear(creep) {
	var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
		if(object.owner.username != "Source Keeper" && object.owner.username != "hesto2") {
			return object;
		}
	}});
	if(target != undefined) {
		if(creep.pos.isNearTo(target)) {
			creep.attack(target);
		}
	}
}

function rally(creep,flag) {
	if(creep.room != flag.room) {
		creep.moveTo(flag);
	}
	else {
		if(creep.room.memory.status == 'WAR') {
			creep.findAndAttack();
		}
		else if(creep.room.memory.status == 'PEACE') {
			if(creep.pos.inRangeTo(flag,2)) {
				return;
			}
			creep.moveTo(flag,{reusePath:20});
		}
	}
}

function attack(creep,flag) {
	var order = flag.name.split('-')[1];
	if(creep.room != flag.room) {
		creep.moveTo(flag);
		console.log("Moving melee");
	}
	else {
		var target;
		if(order == "Workers") {
			target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
				if(object.owner.username != "Source Keeper" && object.owner.username != "hesto2") {
					if(object.getActiveBodyparts(WORK) > 0 || object.getActiveBodyparts(CARRY) > 0 ) {
						return object;
					}
				}
			}});
		}
		else {
			target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
				if(object.owner.username != "Source Keeper" && object.owner.username != "hesto2") {
					if(object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0 || object.getActiveBodyparts(HEAL) > 0) {
						return object;
					}
				}
			}});

			target1 = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
				if(object.owner.username != "Source Keeper" && object.owner.username != "hesto2") {
					return object;
				}
			}});

			if(target) {
				creep.moveTo(target);
				creep.attack(target);
			}
			else if(target1) {
				target = target1;
			}
			else {
				target = creep.pos.findClosest(FIND_HOSTILE_STRUCTURES, {filter:function(object) {
					if(object.owner != undefined && object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman" && object.owner.username != "hesto2" && object.structureType != STRUCTURE_CONTROLLER) {
						return object;
					}
				}});
			}
		}
		if(target != undefined && target != null) {
			creep.moveTo(target);
			creep.attack(target);
		}
		else {
			creep.moveTo(flag);
		}
	}
}
