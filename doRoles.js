

module.exports = function (creeps)
{
	var courier = require("courier");
	var builder = require("builder");
	var spawn = require("spawn");
	var worker = require("worker");
	var transfer = require("transfer");
	var warrior = require("warrior");
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var dropped = creep.pos.findClosest(FIND_DROPPED_ENERGY)
        //Pickup dropped energy
        if(creep.pos.isNearTo(dropped)){creep.pickup(dropped);}

        if(creep.memory.role == "courier")
        {
          courier(creep);
        }
        else if(creep.memory.role == 'builder') {
            builder(creep);
        }
        else if(creep.memory.role == 'worker') {
            worker(creep);
        }
        else if(creep.memory.role == 'transfer') {
            transfer(creep);
        }
        else if(creep.memory.role == "warrior")
        {
            warrior(creep);
            totWarriors++;
        }
        else if(creep.memory.role == undefined)
        {
            if(Game.spawns.Spawn1.room.mode == MODE_SIMULATION)
            {

            }
            else
            {
                creep.memory.role = "worker"
                creep.memory.task = "coming"
                creep.memory.target = creep.pos.findClosest(FIND_SOURCES)
            }
        }

  }
}
