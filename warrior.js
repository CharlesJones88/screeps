/**
 * Created by charlesjones on 5/26/15.
 */
module.exports = function(creep)
{
    var attackFlag = Game.flags.Attack;
    if(attackFlag && creep.room != Game.flags.Attack.room) {
        creep.moveTo(Game.flags.Attack);
        console.log("Moving To Attack Flag")
    }
    else {
        var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object){
            if(object.owner.username != "Source Keeper")
                return object;
        }});
        if(target) {
            creep.moveTo(target);
            console.log("Move to hostile creep");
            creep.attack(target);
            creep.memory.task = 'attacking'
        }
        else {
            var target = creep.pos.findClosest(FIND_HOSTILE_STRUCTURES, {filter:function(object){
                if(object.owner != undefined && object.owner.username != "Source Keeper")
                    return object;
            }});
            if(target) {
                creep.moveTo(target);
                console.log("warrior move to target");
                creep.attack(target);
            }
            else if (creep.pos.findInRange(Game.flags.sRally, 3) && creep.memory.task != "moving") {
                var post = Game.flags.sRally;
                creep.moveTo(post.pos);
                console.log("warrior move to " + post.name);
                creep.memory.task = "moving";
            }
        }
    }
    if(creep.energy < creep.energyCapacity) {
        creep.heal(creep);
    }
};