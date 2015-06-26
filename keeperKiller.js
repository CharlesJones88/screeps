module.exports = function(creep){

	var medics = creep.room.find(FIND_MY_CREEPS, {filter:function(object){
		if(object.memory.role == "kMedic")
		{
						creep.memory.target = object;
				return object;
		}
	}});

	medics = creep.pos.findInRange(medics,2)
    if( medics.length >=2){
                var flag = Game.flags.keeperFlag;
				var enemy = flag.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object){
					if(object.owner.username == "Source Keeper"){
						return object;
					}
				}})

				if(enemy != null)
        if(creep.pos.inRangeTo(enemy,3)){
            creep.rangedAttack(enemy)
            return;
        }

        creep.moveTo(enemy)


    }
    else{
				if(medics.length > 0)
				if(creep.pos.getRangeTo(medics[0])>10){
					creep.moveTo(medics[[0]])
				}
    }
}
