module.exports=function repair(creep){
    var spawn = creep.memory.home
	spawn = Game.getObjectById(spawn.id)
    var room = Game.rooms[creep.memory.room.name]
    var repairers = room.memory.repairers

    if(spawn.hits < spawn.hitsMax){
        creep.memory.target = spawn;
    }
    //Reload on energy
    else if(creep.energy == 0){
        if(room.energy <= 300)return;
        creep.moveTo(spawn)
        spawn.transferEnergy(creep);
    }
    //Repair Target
    else
    {
        if(creep.memory.target == "none"){

            getTarget(creep,room)
        }
        var target = creep.memory.target;
        target = Game.getObjectById(target.id)
        creep.moveTo(target)
        creep.repair(target)
        checkTarget(creep,target)
    }
}

//Determine what to fix first
function getTarget(creep,room){

    var ramparts =[]
    var roads = []
    var walls = []
    room.find(FIND_STRUCTURES,{filter:function(object){
        if(object.hits < object.hitsMax * .75 ){
            if(object.structureType == STRUCTURE_RAMPART)
            {
                ramparts.push(object)
            }
            else if(object.structureType == STRUCTURE_ROAD){
                roads.push(object)
            }
            else if(object.structureType == STRUCTURE_WALL && object.hits < 1000000){
                var near = object.pos.findInRange(FIND_HOSTILE_STRUCTURES,3)
                if(near == false)
                walls.push(object)
            }
        }
    }})
    if(ramparts.length > 0){
        creep.memory.target = ramparts[0];
    }
    else if(roads.length > 0){
        creep.memory.target = roads[0];
    }
    else if(walls.length > 0 ){
        creep.memory.target = walls[0];
    }

}

//Determine if target should keep being repaired or not
function checkTarget(creep,target){
    if(target.hits == target.hitsMax || target.hits >= 4000000){
        creep.memory.target = "none";
    }
}
