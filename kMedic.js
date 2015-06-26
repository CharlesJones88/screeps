module.exports = function(creep){
var spawn = creep.memory.home
spawn = Game.getObjectById(spawn.id)
	var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){
	    if(object.memory.role == "keeperKiller")return object;
	}})
	//console.log(target)
	if(target != null){
	        creep.moveTo(target)
	        creep.heal(target)
	    }
			else{
			    creep.moveTo(spawn)
			}

}
