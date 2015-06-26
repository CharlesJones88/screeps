module.exports = function(creep)
{

	var spawn = creep.memory.home
	spawn = Game.getObjectById(spawn.id)
    var room = Game.rooms[creep.memory.room.name]
    var workers = room.memory.workers;
    var couriers = room.memory.couriers;
		if(creep.energy < .45*creep.energyCapacity)
		{
		    var target;
			if(creep.memory.target == "none" || creep.memory.target == undefined || creep.memory.target.name == creep.name)
			{

				target = creep.pos.findClosest(workers, {filter:function(object){if(object.memory.task == "going")return object;},algorithm:"dijkstra"})
				if(target)
				{
				    creep.memory.task = "going to meet"
	    			creep.memory.target = target;
	    			target.memory.task = "meeting";

				}
				else
				{
				    target = creep.pos.findClosest(workers, {filter:function(object){if(object.memory.task == "working" )return object;},algorithm:"astar"})
				    creep.moveTo(target);
				    creep.memory.task = "going to working"
				}


			}
			else
			{
				var target = Game.getObjectById(creep.memory.target.id)
				if(creep.memory.target.energy == 0 || creep.memory.target.ticksToLive < 25 || creep.ticksToLive < 25 || creep.memory.target == undefined)
				{
					creep.memory.target = "none";
					var target = Game.getObjectById(creep.memory.target.id)

				}
				else if(target != null)
				{

					var target = Game.getObjectById(creep.memory.target.id)

					creep.moveTo(target);
				}
				else
				{
					creep.memory.target = "none";
				}

			}



		}
		else
		{
			creep.memory.target = "none";

			if(spawn.energy >= .95*spawn.energyCapacity)
			    {
			        creep.memory.task = "going to extension"
			        //console.log("SPAWN REACHING CAPACITY, MOVING TO HELP COURIERS")
			        var target = creep.pos.findClosest(FIND_MY_STRUCTURES, {filter:function(object){if(object.structureType =="extension" && object.energy < object.energyCapacity)return object;},algorithm:"astar"})
			        //console.log(target)
			        creep.memory.task = "going to courier"
			        if(target == undefined || target == null)
			        {
			            target = creep.pos.findClosest(couriers, {filter:function(object){if(object.energy < object.energyCapacity)return object;},algorithm:"astar"})
			        }
			        creep.moveTo(target)
			        creep.transferEnergy(target)
			    }
		    else
			    {
			        creep.memory.task = "going to spawn"
			        creep.moveTo(spawn);
	                creep.transferEnergy(spawn)
			    }

		}

}
