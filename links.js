module.exports=function(links){
	for(var link in links){
			link = links[link];
		if(link.pos.inRangeTo(link.room.controller,3)){
			var creep = link.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){if(object.memory.role =="courier" && object.energy < object.energyCapacity)return object;}})
			link.transferEnergy(creep);
		}
		else{
			if(link.energy > 0){
				var controlLink = link.room.controller.pos.findClosest(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_LINK}})
				link.transferEnergy(controlLink);
			}
		}
	}
}
