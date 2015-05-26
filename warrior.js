/**
 * Created by charlesjones on 5/26/15.
 */
module.exports = function(creep)
{
    var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS);
    if(target) {
        creep.moveTo(target);
        creep.attack(target);
    }
    else
    {
        var post = creep.memory.post;
        creep.moveTo(post);
        console.log("going to " + post.pos)
    }
}