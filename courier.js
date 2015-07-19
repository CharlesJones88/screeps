module.exports = function (creep) {
    if(creep.fatigue > 0)return;
    var spawn = creep.memory.home;
    spawn = Game.getObjectById(spawn.id);

    var ctrl = creep.room.controller;
    var task = creep.memory.task;

    if(creep.energy == 0) {
        creep.memory.task = "coming";
        var link = creep.memory.link;
        if(creep.memory.link == undefined) {
            link = Game.getObjectById(creep.room.memory.structures.links.controller);
            creep.memory.link = link;
        }
        if(link != null && link != undefined) {
            link = Game.getObjectById(creep.memory.link.id);
            creep.moveTo(link,{reusePath:20});
            link.transferEnergy(creep);
            return;
        }
        creep.moveTo(spawn,{reusePath:20});
        if(creep.room.memory.roomEnergy < 500) {
            spawn.transferEnergy(creep,50);
        }
        else if(creep.room.memory.roomEnergyy < 300) {
            return;
        }
        else {
            spawn.transferEnergy(creep);
        }
    }
    else {
        if(creep.pos.isNearTo(ctrl)) {
            creep.memory.task = "working";
            creep.upgradeController(ctrl);
        }
        else {
            creep.memory.task = "going";
            creep.moveTo(ctrl,{reusePath:20,heuristicWeight:1});
        }
    }
};