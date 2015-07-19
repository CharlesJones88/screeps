module.exports = function (creep) {
    var cpu = Game.getUsedCpu();
    if(creep.fatigue > 0)return;
    var spawn = creep.memory.home;
    spawn = Game.getObjectById(spawn.id);

    var sources = creep.memory.target;
    if(sources == undefined || sources == 1) {
        sources = creep.pos.findClosest(FIND_SOURCES);
    }
    else {
        sources = creep.memory.target;
        sources = Game.getObjectById(sources["id"]);
    }

    if(creep.energy < creep.energyCapacity && creep.memory.task != 'going') {
        if(creep.pos.inRangeTo(sources, 1)) {
            creep.harvest(sources);
            creep.memory.task = 'working';
        }
        else {
            creep.moveTo(sources, {reusePath:20});
            creep.memory.task = 'going to source';
        }
    }
    else {
        var target;
        if(creep.memory.task == "meeting") {
            if(creep.memory.tranfer == undefined) {
                target = creep.pos.findClosest(creep.room.memory.transfers, {
                    filter: function (object) {
                        if (object.memory.role == "transfer" && object.memory.target.id == creep.id)
                            return object;
                    }
                });

                creep.memory.transfer = target;
                if (target == undefined) {
                    creep.memory.task = 'going';
                }
            }
            else {
                var target = Game.getObjectById(creep.memory.transfer.id);
                if (target == null)
                    creep.memory.task = "going";
                if (target.ticksToLive < 5 || target.memory.target != creep)
                    creep.memory.transfer = undefined;
                if (creep.pos.isNearTo(target)) {
                    if (creep.transferEnergy(target) == 0) {
                        creep.memory.transfer = undefined;
                    }
                }
                else {
                    creep.moveTo(target, {reusePath: 10});
                }
            }
        }
        else {
            var targets = creep.room.memory.transfers;
            var target = creep.pos.findClosest(targets, {filter:function(object) {
                if(object.memory.role == 'transfer' && object.memory.target.id == creep.id)
                    return object;
            }});
            if(target != undefined && target != null) {
                creep.memory.task = 'meeting';
            }
            creep.memory.task = 'going';
            if(creep.room.memory.transfers.length < 3) {
                creep.depositEnergy();
            }
            else{
                creep.moveTo(spawn,{reusePath:20});
                creep.transferEnergy(spawn);
            }
            var transfer = creep.pos.findClosest(FIND_MY_CREEPS, {filter:
                function(object) {
                    if(object.memory.role =="transfer")
                        return object;
                }});
            if(creep.pos.isNearTo(transfer)) {
                creep.transferEnergy(transfer);
            }
            if(creep.energy == 0) {
                creep.memory.task = 'going to source';
            }
        }
    }
};
