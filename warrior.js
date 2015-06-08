/**
 * Created by charlesjones on 5/26/15.
 */
module.exports = function(creep)
{
    var attackFlag = Game.flags.Attack;
    if(attackFlag && creep.room != Game.flags.Attack.room)
    {
        creep.moveTo(Game.flags.Attack);
        console.log("Moving To Attack Flag")
    }
    else
    {
        var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object){
            if(object.owner.username != "Source Keeper" && object.owner.username != "nuclearfalcon")
            {
                return object;
            }
        }});
        if(target) {
            creep.moveTo(target);
            console.log("Move to hostile creep");
            creep.attack(target);
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
                console.log("warrior move to target");
                creep.attack(target);
            }
            else
            {

                var post = creep.memory.post;
                //post = Game.getObjectById(post.id);
                creep.moveTo(post);
                console.log("warrior move to post");
            }
        }
    }
    if(creep.energy < creep.energyCapacity)
    {
        creep.heal(creep);
    }
};