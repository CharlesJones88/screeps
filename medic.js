/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('medic'); // -> 'a thing'
 */
 module.exports = function(object)
 {
     var attackFlag = Game.flags.Attack
        if(attackFlag && creep.room != Game.flags.Attack.room)
        {
            creep.moveTo(Game.flags.Attack);
            console.log("Moving To Attack Flag")
        }
        else
        {
        	var target = creep.pos.findClosest(FIND_MY_CREEPS, {filter:function(object){
        	    if(object.memory.role ="warrior" && object.energy < object.energyCapacity)
        	    {
        	        return object;
        	    }
        	}});
        	if(target) {
        	   creep.moveTo(target);

        	   creep.heal(target);
        	}
        	else
        	{
        	    var target = creep.pos.findClosest(FIND_HOSTILE_STRUCTURES, {filter:function(object){

        	    if(object.owner != undefined && object.owner.username != "Source Keeper" && object.owner.username != "nuclearfalcon")
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

            		var post = creep.memory.post
            		post = Game.getObjectById(post.id)
            		creep.moveTo(post)
            	}
        	}
        }
        if(creep.energy < creep.energyCapacity)
        {
            creep.heal(creep);
        }
 }
