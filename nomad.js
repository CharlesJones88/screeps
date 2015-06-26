/**
 * Created by charlesjones on 6/26/15.
 */
module.exports = function (creep) {
    if(creep.fatigue > 0)return;
    if(creep.energy == 0 || creep.memory.task == "harvest")
    {

        creep.memory.task = "harvest"
        if(creep.room != Game.flags.nomad.room){
            creep.moveTo(Game.flags.nomad)

        }
        else
        {
            if(creep.memory.target == undefined)
            {
                creep.memory.target = Game.flags.nomad.pos.findClosest(FIND_SOURCES)
            }
            var target = creep.memory.target;
            target = Game.getObjectById(target.id);
            creep.moveTo(target)
            creep.harvest(target)
        }
        if(creep.energy == creep.energyCapacity){
            creep.memory.task = "work"
        }
    }
    else
    {
        var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(sites.length > 0){
            creep.moveTo(sites[0]);
            creep.build(sites[0]);
        }
        else{
            var ctrl = Game.flags.nomad.room.controller;

            creep.moveTo(ctrl);
            if(Game.flags.nomad.color == COLOR_RED){
                creep.unclaimController(ctrl)
            }
            else if(ctrl.my == false)
            {
                creep.claimController(ctrl)
            }
            else{
                creep.upgradeController(ctrl);
            }

        }

    }

}