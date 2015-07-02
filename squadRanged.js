module.exports = function(creep, flag) {
	if(flag.color == COLOR_CYAN) {
		creep.moveTo(flag, {reusePath:20});
	}
	else if(flag.color == COLOR_RED) {
		attack(creep,flag);
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

	if(Game.flags.ranged != undefined) {
		creep.moveTo(Game.flags.ranged);
	}

};

function attackPoint(creep,flag) {
	if(creep.room != flag.room) {
		creep.moveTo(flag);
		return;
	}
	var target = creep.room.lookForAt('structure',flag);

	if(target == undefined) {
		target = flag.pos.findClosest(FIND_STRUCTURES, {filter:function(object) {
			if(object.owner != undefined && object.owner.username != 'Source Keeper' && object.owner.username != 'hesto2' && object.owner.username != 'ultramixerman' && object.structureType != STRUCTURE_CONTROLLER) {
				return object;
			}
		}});
		if(target) {
			if(creep.pos.inRangeTo(target,3)) {
				creep.rangedAttack(target);
			}
			else {
				creep.moveTo(target);
			}
		}
		else {
			creep.moveTo(flag);
		}
	}
}

function rally(creep,flag) {
	var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
		if(object.owner.username != "Source Keeper" && object.owner.username != "hesto2") {
			return object;
		}
	}});
	if(target == undefined) {
		if(creep.pos.inRangeTo(flag,1) == false) {
			creep.moveTo(flag, {reusePath:20});
		}
		creep.memory.target = "none";
	}
	else {
		var targets = creep.pos.findInRange(target, 3);
		if(targets != undefined) {
			creep.rangedAttack(targets[0]);
		}
		else {
			creep.moveTo(targets[0]);
		}
	}
}

function holdPosition(creep,flag) {
	var order = flag.name.split('-')[1];
	var x = flag.pos.x;
	var y = flag.pos.y;
	if(creep.room != flag.room) {
		creep.moveTo(flag);
		return;
	}
	if(order == "Top") {
		y += 2;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			x++
		}
	}
	else if(order == "Bottom") {
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			x++;
		}
	}
	else if(order == "Left") {
		x += 2;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			y++;
		}
	}
	else if(order == "Right") {
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			y++;
		}
	}

	if(creep.pos.x == x && creep.pos.y == y) {
		attackNear(creep);
	}
	else {
		creep.moveTo(x,y);
	}
}

function attackNear(creep) {
	var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
		if(object.owner.username != "Source Keeper" && object.owner.username != "hesto2") {
			return object;
		}
	}});
	if(target != undefined) {
		if (creep.pos.inRangeTo(target, 3)) {
			creep.rangedAttack(target);
		}
	}
}

function attack(creep,flag) {
	var order = flag.name.split('-')[1];
	if(creep.room != flag.room) {
		creep.moveTo(flag);
	}
	else {
		var target;
		if(order == "Workers") {
			target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object){
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
					if(object.getActiveBodyparts(ATTACK)>0 || object.getActiveBodyparts(RANGED_ATTACK)>0 || object.getActiveBodyparts(HEAL) > 0 ){
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
				creep.rangedAttack(target);
			}
			else if(target1) {
				target = target1
			}
			else {
				target = creep.pos.findClosest(FIND_HOSTILE_STRUCTURES, {filter:function(object) {
					if(object.owner != undefined && object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman" && object.owner.username !="hesto2" && object.structureType != STRUCTURE_CONTROLLER) {
						return object;
					}
				}});
			}
		}
		if(target != undefined && target != null) {
			if(creep.pos.inRangeTo(target,3)) {
				creep.rangedAttack(target);
			}
			else {
				creep.moveTo(target);
			}

		}
		else {
			creep.moveTo(flag);
		}
	}
}