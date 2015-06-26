module.exports = function(creep, flag){
    console.log(flag)
	if(flag.color == COLOR_CYAN){

		creep.moveTo(flag)
	}
	else if(flag.color == COLOR_RED){
        attack(creep,flag)
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
	var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object){
			if(object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman")
			{
					return object;
			}
		}});
		if(target == undefined){
			creep.moveTo(flag)
			creep.memory.target = "none"
		}
		else{
			creep.moveTo(target)
			creep.attack(target);
		}
}
function attack(creep,flag){
    if(creep.room != flag.room)
    {
        creep.moveTo(flag);
        console.log("Moving")
    }
    else
    {
    	var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object){
    	    if(object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman")
    	    {
    	        return object;
    	    }
    	}});

    	if(target) {
    	   creep.moveTo(target);
    	   creep.attack(target);
    	}
    	else
    	{

    	    var target = creep.pos.findClosest(FIND_HOSTILE_STRUCTURES, {filter:function(object){
    	    if(object.owner != undefined && object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman" && object.owner.username !="hesto2" && object.structureType != STRUCTURE_CONTROLLER)
    	    {
    	        return object;
    	    }
    	}});
            if(target)
            {
                creep.moveTo(target);
                creep.attack(target);

            }
        	else
        	{
        		creep.moveTo(flag)
        	}
    	}
    }
}
