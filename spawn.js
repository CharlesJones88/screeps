var medic = require("squadMedic")
var melee = require("squadMelee")
var ranged = require("squadRanged")
module.exports = function(creep){

	//ASSIGN FLAG TO CREEP
	/* Flags:
		purple - All do based on name
		Cyan - Move to Waypoint

		Red- Clear room (creeps + buildings)
		Yellow - Attack source keeper at Point
		Grey - Claim Controller

		White- Hold Point
		Blue - Rally/Guard Room

	*/

	var flag;
	var flags = Game.flags;
	var task = creep.memory.task;
	var squadFlag = [];
	for(var gflag in flags){
    console.log(gflag)
		if(gflag.substr(0,gflag.indexOf('-')) == creep.memory.squad){
			//Check color
			gflag = Game.flags[gflag]

			if(flag == undefined)flag = gflag;
			if(gflag.color == COLOR_CYAN)
			{
				flag = gflag;
				break;
			}
			else if(gflag.color == COLOR_RED && flag.color != COLOR_CYAN){
				flag = gflag;
			}
			else if(gflag.color == COLOR_YELLOW && flag.color != COLOR_CYAN
																		      && flag.color != COLOR_RED){
			  flag = gflag;
			}
			else if(gflag.color == COLOR_GREY && flag.color != COLOR_CYAN
																		    && flag.color != COLOR_RED
																			  && flag.color != COLOR_YELLOW){
				flag = gflag;
			}
			else if(gflag.color == COLOR_WHITE && flag.color != COLOR_CYAN
																		     && flag.color != COLOR_RED
																			   && flag.color != COLOR_YELLOW
																			   && flag.color != COLOR_GREY){
				flag = gflag;
			}
			else if(gflag.color == COLOR_BLUE){

				flag = gflag;
			}

		}
	}

	//Role performance
	if(creep.memory.task == "melee"){
		melee(creep,flag)
	}
	else if(creep.memory.task == "ranged"){
		ranged(creep,flag)
	}
	else if(creep.memory.task == "medic"){
		medic(creep,flag)
	}


}
