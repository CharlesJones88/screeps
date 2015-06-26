
module.exports = function(creep, flag){
	if(flag.color == COLOR_CYAN){
		rally(creep,flag)
	}
	else if(flag.color == COLOR_RED){
        rally(creep,flag)
	}
	else if(flag.color == COLOR_YELLOW){

	}
	else if(flag.color == COLOR_GREY){
		if(creep.room != flag.room){
			creep.moveTo(flag)
		}
		else{
			creep.moveTo(flag.room.controller)
			creep.claimController(flag.room.controller)
		}

	}
	else if(flag.color == COLOR_WHITE){

	}
	else if(flag.color == COLOR_BLUE){
		rally(creep,flag)
	}

}

function rally(creep,flag){
	var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){
			if(object.memory.squad == creep.memory.squad && object.hits < object.hitsMax && object != creep)
			{
			        creep.memory.target = object;
					return object;
			}
		}});
		if(target == undefined || creep.memory.target == "none"){
			creep.moveTo(flag)
			creep.memory.target = "none"
			if(creep.hits < creep.hitsMax)creep.heal(creep)
		}
		else{

			creep.moveTo(target)
			creep.heal(target);
		}
}
