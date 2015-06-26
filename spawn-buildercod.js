module.exports = function()
{
  for(var room in Memory.rooms)
   {
     room = Game.rooms[room];

    if(room == undefined)continue;
     if(room.memory.safeSources == undefined)
     {
       room.memory.safeSources = getSafeSources(room);
       room.memory.curSource = 0;
     }
     var roomEnergy = calculateRoomEnergy(room);
     room.memory.roomEnergy = roomEnergy;


     var builders;
     var transfers;
     var couriers;
     var builders;
     var workers;
     var warriors;
     var medics;

     //Builders
     var buildings;
     var roads;
     var ramparts;
     var construction

     var Tbuilders= Memory.builders //countType(room,"builder");
     var Ttransfers= countType(room,"transfer");
     var Tcouriers= countType(room,"courier");
     var Tbuilders= countType(room,"builder");
     var Tworkers= countType(room,"worker");
     var Twarriors= countType(room,"warrior");
     var Tmedics= countType(room,"medic");

     var sSources = room.memory.safeSources.length

       //Bodies

       if(roomEnergy >= 900)
        {
          var workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
          var transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
          var courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE,MOVE,MOVE];
          var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
          var builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        }
      else if(roomEnergy >= 700)
       {
         var workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
         var transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
         var courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE];
         var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
         var builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
       }
       else if(roomEnergy >= 600)
       {
         var workerBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
         var transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
         var courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
         var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
         var builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
       }
       else if(roomEnergy >= 500)
       {
         var workerBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
         var transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
         var courierBody = [WORK,WORK,WORK,WORK,CARRY,MOVE];
         var warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
         var builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
       }
       else
       {
         var workerBody = [WORK,CARRY,MOVE];
         var transferBody = [CARRY,MOVE,MOVE,MOVE];
         var courierBody = [CARRY,WORK,WORK,MOVE];
         var warriorBody = [ATTACK,ATTACK,MOVE,MOVE];
         var builderBody = [WORK,CARRY,MOVE,MOVE];
       }

       if(roomEnergy > 1100)
         {
             workers = 3 * sSources + 1
             warriors = 12;
             couriers = 3;
             builders = 2;
             transfers = workers+4;

       }
       else if(roomEnergy > 950)
         {
             workers = 3 * sSources
             warriors = 12;
             couriers = 3;
             builders = 2;
             roads = 1;
             ramparts = 1;
             transfers = workers+4;

       }
     else if(roomEnergy > 700)
       {
           workers = 3 * sSources
           warriors = 5;
           couriers = 3;
           builders = 2;
           roads = 1;
           transfers = workers+4;
           if(Tworkers > 6 && Ttransfers > 9 && Tcouriers > 2)
           {
               warriors = 10;
           }
     }
     else if(roomEnergy > 525)
     {
         workers = 3 * sSources
         warriors = 2;
         couriers = 3;
         builders = 1;
         transfers = workers+2;
     }
     else if(roomEnergy > 450)
     {
         warriors = 0;
         workers = 2 * sSources
         builders = 1;
         couriers = 1;
         transfers = workers
     }
     else
     {
         workers =2*sSources;
         couriers = 1;
         builders = 1;
         transfers = workers
     }

     if(room.name == "E1S2"){workers = 1; transfers = 2 }
//SPAWN LOGIC

     var spawns = room.find(FIND_MY_SPAWNS);
     for(var spawn in spawns)
     {
       var spawn = spawns[spawn];
       if(spawn.spawning != null )continue;



       	if(Tworkers < workers ){
       	    var index = room.memory.curSource;
       	    console.log("Spawning worker for " + room.memory.curSource);

       	    var target = room.memory.safeSources[index];
       	    var result = spawn.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming",home:spawn});
             if(typeof(result == 'string')){
               room.memory.curSource++;
         	    if(room.memory.curSource == room.memory.safeSources.length){room.memory.curSource = 0}
             }
       	}

       else if(Ttransfers < transfers){
             console.log("Spawning Transfer");
              var count = spawn.room.find(FIND_MY_CREEPS, {filter:
                           function(object){
                               if(object.memory.role =="transfer" && object.memory.task == "extension")return object;}})
              var eCount = spawn.room.find(FIND_MY_STRUCTURES, {filter:
                       function(object){
                           return object.structureType == "extension"

                       }})
              if(count.length <= eCount.length*.5){var task="extension"}
              else{var task ="source"}
             spawn.createCreep(transferBody,undefined, {role:"transfer", target:"none", task:task,home:spawn});
         }
         else if(Twarriors < warriors)
         {
           var flags = spawn.room.find(FIND_FLAGS, {filter:{color:COLOR_RED}})

           //TODO: ADD ERROR HANDLING HERE FOR NO FLAG
           var target;
           for(var flag in flags)
           {
             flag = flags[flag]
             var creeps = flag.room.find(FIND_MY_CREEPS, {filter:{role:"warrior",post: flag}})
             if(creeps.length < warriors/flags.length){target = flag; break;}
           }

           console.log("Creating warrior for " + target.name);
           spawn.createCreep(warriorBody,undefined,{role:"warrior",post:target,task:"waiting",target:"none"})
         }
       	else if(Tcouriers < couriers){
       	    console.log("Spawning courier");
       	    console.log(Tcouriers + " " + couriers)
       	    spawn.createCreep(courierBody,undefined, {role:"courier",home:spawn});
       	}



       	else if(Tbuilders < builders && (spawn.room.find(FIND_CONSTRUCTION_SITES).length|| Game.flags.bMove != undefined || roomEnergy >= 700)){
       	    console.log("Spawning builder");
       	    var tConstruction = 0 ;
       	    var tRamparts = 0;
       	    var tBuildings = 0;
       	    var tRoads = 0;

       	    var task; // construction, ramparts, buildings, roads
       	    spawn.room.find(FIND_MY_CREEPS, {filter:
                           function(object){
                               if(object.memory.role =="builder" ){
                                   if(object.memory.task == "construction"){
                                        tConstruction++;
                                   }
                                   else if(object.memory.task == "ramparts"){
                                       tRamparts++;
                                   }
                                   else if(object.memory.task == "buildings"){
                                       tBuildings++;
                                   }
                                   else if(object.memory.task == "roads"){
                                       tRoads++;
                                   }
                               }
                           }
                       });
            if(tConstruction < construction)task = "construction";
            else if(tRoads < roads)task = "roads";
            else if(tRamparts < ramparts)task = "ramparts";


       	    //spawn.createCreep(builderBody,undefined, {role:"builder", home:spawn, target: "none",task:task});
       	}
     }
   }



}

function countType(room,type){
   var count = room.find(FIND_MY_CREEPS, {
		filter: function(creep)
		{ if(creep.memory.role == type)
				return true;

			return false;
		}
	}).length;
  return count
}
function calculateRoomEnergy(room)
{

  var totalEnergy = 0
  room.find(FIND_MY_STRUCTURES, {filter:function(object){
        if(object.structureType == "extension"){totalEnergy += object.energy}
    }})
  var spawns = room.find(FIND_MY_SPAWNS)
  for(var spawn in spawns )
  {
    spawn = spawns[spawn]
    totalEnergy += spawn.energy
  }

  return totalEnergy;
}

function getSafeSources(room)
{
   var sources = room.find(FIND_SOURCES);
   var lairs = room.find(FIND_HOSTILE_STRUCTURES);
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
   return sources;
}
