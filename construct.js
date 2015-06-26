/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('construct'); // -> 'a thing'
 */
 module.exports=function()
 {

     var spawn = Game.spawns.Spawn1
     var safeSources = spawn.room.memory.safeSources
     for(var source in safeSources)
     {
       source = safeSources[source];
       var path = spawn.pos.findPathTo(source.pos,{ignoreCreeps:true});
       console.log(path)
     }
     /*
     var futureSites = [
         spawn.room.getPositionAt(11,19),
         spawn.room.getPositionAt(11,20),
         spawn.room.getPositionAt(12,20),
         spawn.room.getPositionAt(13,20),
         spawn.room.getPositionAt(14,20),
         spawn.room.getPositionAt(11,21),
         spawn.room.getPositionAt(10,21),
         spawn.room.getPositionAt(13,21),
         spawn.room.getPositionAt(12,22),
         spawn.room.getPositionAt(15,29)
         ]
     var extensions = spawn.room.find(FIND_MY_STRUCTURES, {filter:function(object){if(object.structureType =="extension")return object;}});
     var sites = spawn.room.find(FIND_CONSTRUCTION_SITES, {filter:function(object){if(object.structureType =="extension")return object;}});
     var total = extensions.length + sites.length
     console.log(spawn.room.controller.level)
     if(spawn.room.controller.level == 3 && total <10)
     {
         console.log("HIT " + total)
         var index = total-1;
         console.log(futureSites[index])
         spawn.room.createConstructionSite(futureSites[index], "extension");
     }
     */


 }
