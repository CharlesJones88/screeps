module.exports = function(creep, flag) {
	if(flag.color == COLOR_CYAN) {
		rally(creep,flag);
	}
	else if(flag.color == COLOR_RED) {
		rally(creep,flag);
	}
	else if(flag.color == COLOR_YELLOW) {
		rally(creep,flag);
	}
	else if(flag.color == COLOR_GREY) {
		if(creep.room != flag.room) {
			creep.moveTo(flag);
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
	if(creep.room != flag.room){
		creep.moveTo(flag);
		return;
	}
	if(order == "Top"){
		y +=1
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			x++;
		}
	}
	else if(order == "Bottom") {
		y += 1;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			x++;
		}
	}
	else if(order == "Left") {
		x += 1;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			y++;
		}
	}
	else if(order == "Right"){
		x +=1;
		while(flag.room.lookForAt('creep',x,y) != undefined && flag.room.lookForAt('creep',x,y) != creep) {
			y++;
		}
	}

	if(creep.pos.x == x && creep.pos.y == y) {
		var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object) {
			if(object.memory.squad == creep.memory.squad && object.hits < object.hitsMax && object != creep) {
				creep.memory.target = object;
				return object;
			}
		}});
		if(target != undefined && target != null) {
			if(creep.pos.isNearTo(target)) {
				creep.heal(target);
			}
			else {
				creep.rangedHeal(target);
			}
		}
	}
	else {
		creep.moveTo(x,y);
	}

}

function rally(creep,flag) {
	var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object) {
		if((object.memory.squad == creep.memory.squad || object.owner.username == 'hesto2') && object.hits < object.hitsMax && object != creep && object.memory.task != 'medic') {
			creep.memory.target = object;
			return object;
		}
	}});
	if(target == undefined || creep.memory.target == "none") {
		target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object) {
			if(object.hits < object.hitsMax && object != creep) {
				creep.memory.target = object;
				return object;
			}
		}});
	}
	if(target == undefined || creep.memory.target == "none") {
		if(creep.pos.inRangeTo(flag,3) == false) {
			creep.moveTo(flag, {reusePath:20});
		}
		creep.memory.target = "none";
		if(creep.hits < creep.hitsMax)creep.heal(creep)
	}
	else {
		creep.moveTo(target);
		creep.heal(target);
	}
}