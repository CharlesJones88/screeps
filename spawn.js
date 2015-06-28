var doLinks = require('links');
module.exports = function() {
	for(var room in Memory.rooms) {
		room = Game.rooms[room];

		if(room == undefined)continue;
		if(room.memory.safeSources == undefined)
		{
			room.memory.safeSources = getSafeSources(room);
			room.memory.curSource = 0;
		}
		var roomEnergy = calculateRoomEnergy(room);
		room.memory.roomEnergy = roomEnergy;

		var transfers= 0;
		var couriers = 0;
		var builders = 0;
		var workers = 0;
		var warriors = 0;
		var keeperKillers = 0;
		var kMedics = 0;
		var linkWorkers = 0;
		var squads = 0;
		var repairs = 0;
		var nomads = 0;

		var Tbuilders= room.memory.builders.length;
		var Ttransfers= room.memory.transfers.length;
		var Tcouriers= room.memory.couriers.length;
		var Tworkers= room.memory.workers.length;
		var Twarriors= room.memory.warriors.length;
		var TkeeperKillers = room.memory.keeperKillers.length;
		var TkMedics = room.memory.kMedics.length;
		var TlinkWorkers = room.memory.linkWorkers.length;
		var Trepairs = room.memory.repairs.length;
		var Tnomads = room.memory.nomads.length;

		var sSources = room.memory.safeSources.length;

		//Bodies
		//Bodies
		var keeperKillerBody = [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
		var kMedicBody = [MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL];
		var linkWorkerBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
		var nomadBody = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
		var workerBody;
		var transferBody;
		var courierBody;
		var warriorBody;
		var builderBody;
		var medicBody;
		var repairBody;

		if(roomEnergy >= 1600){
			workerBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
		}
		else if(roomEnergy >= 1200)
		{
			workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];
		}
		else if(roomEnergy >= 900)
		{
			workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];

		}
		else if(roomEnergy >= 700)
		{
			workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];
		}
		else if(roomEnergy >= 600)
		{
			workerBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]
		}
		else if(roomEnergy >= 500)
		{
			workerBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,CARRY,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE]
		}
		else
		{
			workerBody = [WORK,WORK,CARRY,MOVE];
			transferBody = [CARRY,MOVE,MOVE,MOVE];
			courierBody = [CARRY,WORK,MOVE];
			warriorBody = [ATTACK,ATTACK,MOVE,MOVE];
			builderBody = [WORK,CARRY,MOVE,MOVE];
		}

		//Total creeps per room
		if(roomEnergy > 2000){
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 3;
			repairs = 2;
			transfers = workers+2;
			keeperKillers = 0;
			kMedics = 0;
		}
		else if(roomEnergy > 1650){
			workers = 2 * (1+ sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 2;
			repairs = 2;
			transfers = workers + 2;
			keeperKillers = 0;
			kMedics = 0
		}
		else if(roomEnergy > 1200)
		{
			workers = 2 * (1 + sSources + 1);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 1;
			repairs = 2;
			transfers = workers + 2;
			keeperKillers = 0;
			kMedics = 0
		}
		else if(roomEnergy > 1100) {
			workers = 3 * (1 + sSources + 1);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 1;
			repairs = 1;
			transfers = workers + 2;
			keeperKillers = 0;
			kMedics = 0

		}
		else if(roomEnergy > 950) {
			workers = 3 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 1;
			repairs = 1;
			transfers = workers + 2;
			keeperKillers = 0;
			kMedics = 0
		}
		else if(roomEnergy > 700) {
			workers = 3 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			repairs = 1;
			squads = 0;
			transfers = workers + 2;
			keeperKillers = 0;
			kMedics = 0;
		}
		else if(roomEnergy > 525) {
			workers = 3 * (1 + sSources);
			warriors = 2;
			couriers = 3;
			builders = 1;
			repairs = 1;
			transfers = workers + 2;
		}
		else if(roomEnergy > 450) {
			warriors = 0;
			workers = 2 * (1 + sSources);
			builders = 1;
			couriers = 1;
			transfers = workers
		}
		else {
			workers =2 * (1 + sSources);
			couriers = 1;
			builders = 1;
			transfers = workers;
			if(room.controller.level > 1) {
				couriers = 0;
			}
		}

		if(room.controller.level == 1) {
			couriers = 1;
		}
		if(room.name == "E1S2"){workers = 1; transfers = 2; }
		var links = room.find(FIND_MY_STRUCTURES, {filter:{structureType:STRUCTURE_LINK}});
		if(links.length > 1)
		{
			if(roomEnergy > 1300){
				linkWorkers = 1;
				couriers = 2;
				courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			}
			else
				linkWorkers = 0;


			doLinks(links);
		}
		warriors = 0;
//SPAWN LOGIC

		var spawns = room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_SPAWN}});
		for(var spawn in spawns) {
			var spawn = spawns[spawn];
			if(spawn.spawning != null )continue;
			var Tsquads = checkSquads();

			if(Tworkers < workers ){
				var index = room.memory.curSource;
				console.log(spawn.name + " Spawning worker for " + room.memory.curSource);

				var target = room.memory.safeSources[index];
				var result = spawn.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming",home:spawn,room:spawn.room});
				if(typeof(result == 'string')){
					room.memory.curSource++;
					if(room.memory.curSource == room.memory.safeSources.length){room.memory.curSource = 0}
				}
			}
			else if(Ttransfers < transfers){
				console.log(spawn.name + " spawning Transfer");
				var count = spawn.room.find(FIND_MY_CREEPS, {filter:
					function(object){
						if(object.memory.role =="transfer" && object.memory.task == "extension")return object;}});
				var task;
				if(count.length < 1 && room.memory.transfers > 11) {
					task = "sharing";
				}
				else {
					task = "source";
				}
				spawn.createCreep(transferBody,undefined, {role:"transfer", target:"none", task:task,home:spawn});
			}
			else if(TlinkWorkers < linkWorkers) {
				var target;

				for(var link in links) {
					console.log(spawn.name + " Spawning linkWorker");
					link = links[link];
					if(link.pos.inRangeTo(link.room.controller,3))continue;
					else{
						target = link;
						break;
					}
				}
				spawn.createCreep(linkWorkerBody,undefined, {role:"linkWorker", target:link, task:"none",home:spawn,room:spawn.room});
			}
			else if(TkeeperKillers < keeperKillers) {
				console.log(spawn.name + " Spawning KeeperKiller");
				spawn.createCreep(keeperKillerBody,undefined, {role:"keeperKiller", home:spawn, task:"none",room:spawn.room});
			}
			else if(Tcouriers < couriers){
				console.log(spawn.name + " Spawning courier");
				console.log(Tcouriers + " " + couriers);
				spawn.createCreep(courierBody,undefined, {role:"courier",home:spawn,target:"none",room:spawn.room});
			}

			else if(Tbuilders < builders && ((spawn.room.find(FIND_CONSTRUCTION_SITES).length)||Game.flags.bMove!=undefined)) {
				console.log(spawn.name + " Spawning builder");
				spawn.createCreep(builderBody,undefined, {role:"builder", home:spawn,target:"none", task:"none",room:spawn.room});
			}
			else if(Trepairs < repairs) {
				console.log(spawn.name + " Spawning repair");
				var roads = false;
				task = "none"
				for(var creep in room.memory.repairs){
					creep = room.memory.repairs[creep];
					if(creep.memory.task == "roads"){
						roads = true;
						break;
					}
				}
				if(roads == false){
					task = "roads";
					console.log("Making the repair do roads")
				}

				spawn.createCreep(repairBody,undefined, {role:"repair", home:spawn,target:"none", task:task,room:spawn.room});
			}
			else if(Tnomads < nomads && Game.flags.nomad != undefined){
				console.log(spawn.name + " Spawning nomad");
				spawn.createCreep(nomadBody,undefined, {role:"nomad",task:"none", home:spawn,room:spawn.room});
			}
			else if(roomEnergy == room.energyCapacity){
				//spawnForNeighbors(spawn)
			}
		}
		if(room.name != 'E3N2' && room.name != 'E4N2')
			checkSquads(spawn,squads,roomEnergy);
		if(spawn == undefined)return;
		var near = spawn.pos.findInRange(FIND_MY_CREEPS,1);
		if(near.length > 6){
			for(var creep in near){
				console.log("Move dang it!");
				creep = near[creep];
				creep.move(TOP)
			}
		}
	}
};

function countType(room,type) {
	var count = room.find(FIND_MY_CREEPS, {
		filter: function(creep)
		{ if(creep.memory.role == type)
			return true;

			return false;
		}
	}).length;
	return count
}

function calculateRoomEnergy(room) {

	var totalEnergy = 0;
	var energyCap = 0;
	room.find(FIND_MY_STRUCTURES, {filter:function(object){
		if(object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN){totalEnergy += object.energy;energyCap += object.energyCapacity }
	}});
	room.memory.energyCapacity = energyCap;
	return totalEnergy;
}

function getSafeSources(room) {
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
		for(var x in indices) {
			for(var y in indices[x]) {

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

function checkSquads(spawn,squads,roomEnergy) {
	medicBody = [TOUGH,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE];
	meleeBody = [TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];
	rangedBody = [TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
	if(roomEnergy > 1200) {
		medicBody = [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE];
		meleeBody = [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];
		rangedBody = [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
	}

	var sCreeps = Memory.squads;
	for(var i=1;i<=squads;i++) {
		var medic = 0;
		var ranged = 0;
		var melee = 0;
		for(var creep in sCreeps) {
			creep = sCreeps[creep];
			if(creep.memory.squad == i) {
				var task = creep.memory.task;
				if(task == "melee")melee++;
				else if(task == "ranged")ranged++;
				else if(task == "medic")medic++;
			}
		}

		//Spawn LOGIC
		if(medic < 4) {
			if(spawn.canCreateCreep(medicBody) == OK) {
				console.log(spawn.name + " Spawning medic");
				spawn.createCreep(medicBody,undefined,{role:"squad",task:"medic",target:"none",status:"none",squad:i,room:spawn.room});
			}
		}
		else if(melee < 4){
			if(spawn.canCreateCreep(meleeBody) == OK){
				console.log(spawn.name + " Spawning melee");
				spawn.createCreep(meleeBody,undefined,{role:"squad",task:"melee",target:"none",status:"none",squad:i,room:spawn.room});
			}
		}
		else if(ranged < 4){
			if(spawn.canCreateCreep(rangedBody) == OK){
				console.log(spawn.name + " Spawning ranged");
				spawn.createCreep(rangedBody,undefined,{role:"squad",task:"ranged",target:"none",status:"none",squad:i,room:spawn.room});
			}
		}


	}
	//Check each role in the squad and get a count of what is in it.

	//If there is a deficiency, spawn whatever is defficient.
}
function spawnSquads(spawn, role){
	//Spawn based on role
}
