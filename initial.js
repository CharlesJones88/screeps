/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Initial'); // -> 'a thing'
 */


 Memory.curSource = 0;
 Memory.safeSources = 0;
if(Game.spawns.Spawn1.room.name = "sim"){Memory.safeSources= Game.spawns.Spawn1.room.find(FIND_SOURCES);return;}
var spawn = Game.spawns.Spawn1;
 var sources = spawn.room.find(FIND_SOURCES);
 var lairs = spawn.room.find(FIND_HOSTILE_STRUCTURES);
 var count = 0;
 for(var lair in lairs)
 {
     lair = lairs[count];
     var right = lair.pos.x + 6;
     var bottom = lair.pos.y + 6;
     var left = lair.pos.x - 6;
     var top = lair.pos.y - 6;

     var indices = lair.room.lookForAtArea('source',top,left,bottom,right);

     var hit;
     for(var x in indices)
     {
         for(var y in indices[x])
         {

             var target = indices[x][y];
             var index = sources.indexOf(target);
             if (index > -1) {
                 sources.splice(index, 1);
             }
         }
     }
    count++;
 }
 Memory.safeSources = sources;
