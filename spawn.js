var doLinks = require('links');
module.exports = function() {
	for(var room in Memory.rooms) {
		room = Game.rooms[room];

		if(room == undefined)continue;
		if(room.memory.safeSources == undefined) {
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
		var keeperKillerBody = [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
		var kMedicBody = [MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL];
		var linkWorkerBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
		var nomadBody = [CARRY,CARRY,CARRY,MOVE,MOVE,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,MOVE];
		var workerBody;
		var transferBody;
		var courierBody;
		var warriorBody;
		var builderBody;
		var medicBody;
		var repairBody;

		if(roomEnergy >= 2000) {
			workerBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
		}
		else if(roomEnergy >= 1600) {
			workerBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
		}
		else if(roomEnergy >= 1200) {
			workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
		}
		else if(roomEnergy >= 900) {
			workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE,MOVE,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			medicBody = [HEAL,HEAL,HEAL,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];

		}
		else if(roomEnergy >= 700) {
			workerBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,WORK,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];
		}
		else if(roomEnergy > 600) {
			workerBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]
		}
		else if(roomEnergy >= 500) {
			workerBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			transferBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			courierBody = [WORK,WORK,WORK,WORK,CARRY,MOVE];
			warriorBody = [TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
			builderBody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
			repairBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE]
		}
		else {
			workerBody = [WORK,WORK,CARRY,MOVE];
			transferBody = [CARRY,MOVE,MOVE,MOVE];
			courierBody = [CARRY,WORK,MOVE];
			warriorBody = [ATTACK,ATTACK,MOVE,MOVE];
			builderBody = [WORK,CARRY,MOVE,MOVE];
		}

		//Total creeps per room
		if(roomEnergy > 2000) {
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 3;
			repairs = 2;
			transfers = workers + 1;
			keeperKillers = 0;
			kMedics = 0;
			nomads = 0;
		}
		else if(roomEnergy > 1650) {
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 2;
			repairs = 2;
			transfers = workers + 1;
			keeperKillers = 0;
			kMedics = 0;
			nomads = 0;
		}
		else if(roomEnergy > 1200) {
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 1;
			repairs = 2;
			transfers = workers + 1;
			keeperKillers = 0;
			kMedics = 0;
			nomads = 0;
		}
		else if(roomEnergy > 1100) {
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 1;
			repairs = 1;
			transfers = workers + 1;
			keeperKillers = 0;
			kMedics = 0;
		}
		else if(roomEnergy > 950) {
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			squads = 1;
			repairs = 1;
			transfers = workers + 1;
			keeperKillers = 0;
			kMedics = 0
		}
		else if(roomEnergy > 700) {
			workers = 2 * (1 + sSources);
			warriors = 5;
			couriers = 3;
			builders = 2;
			repairs = 1;
			squads = 0;
			transfers = workers + 1;
			keeperKillers = 0;
			kMedics = 0;
		}
		else if(roomEnergy > 525) {
			workers = 2 * (1 + sSources);
			warriors = 2;
			couriers = 3;
			builders = 1;
			repairs = 1;
			transfers = workers;
		}
		else if(roomEnergy > 450) {
			warriors = 0;
			workers = 2 * (1 + sSources);
			builders = 1;
			couriers = 1;
			transfers = workers;
		}
		else {
			workers = 2 * (1 + sSources);
			couriers = 1;
			builders = 1;
			transfers = workers;
		}
		//var links = room.find(FIND_MY_STRUCTURES, {filter:{structureType:STRUCTURE_LINK}});
		var sourceLinks = room.memory.structures.links.sourceLinks;
        var controllerLink = room.memory.structures.links.controller;
        if(sourceLinks.length > 0 && controllerLink != undefined) {
            if(roomEnergy > 1300) {
                linkWorkers = sourceLinks.length;
                couriers = 2;
            }
            else {
                linkWorkerBody = workerBody;
            }
        }
			//doLinks(links);
		warriors = 0;
//SPAWN LOGIC

		var spawns = room.find(FIND_MY_STRUCTURES,{filter:{structureType:STRUCTURE_SPAWN}});
		for(var spawn in spawns) {
			var spawn = spawns[spawn];
			if(spawn.spawning != null )continue;
			var Tsquads = checkSquads();
			if(room.name == 'E3S4') {
				keeperKillers = 1;
				kMedics = 2;
				couriers = 3;
			}
			if(room.name == 'E5S3') {
				couriers = 1;
				courierBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE];
			}
			if(Tworkers < workers ) {
				var index = room.memory.curSource;
				console.log(spawn.name + " spawning worker for " + room.memory.curSource);

				var target = room.memory.safeSources[index];
                if(spawn.canCreateCreep(workerBody) == OK) {
                    var result = spawn.createCreep(workerBody,undefined, {role:"worker",target:target,task:"coming",home:spawn,room:spawn.room});
                    if(typeof(result == 'string')) {
                        room.memory.curSource++;
                        if (room.memory.curSource == room.memory.safeSources.length) {
                            room.memory.curSource = 0;
                        }
                    }
				}
			}
			else if(Ttransfers < transfers){
				console.log(spawn.name + " spawning Transfer");
				var task = 'source';
				if(spawn.canCreateCreep(transferBody) == OK) {
					var result = spawn.createCreep(transferBody, undefined, {role:"transfer", target:"none", task:task,home:spawn,room:spawn.room});
                    spawn.room.memory.transfers.push(Game.creeps[result]);
				}
			}
			else if(TlinkWorkers < linkWorkers) {
                console.log(spawn.name + " spawning linkWorker");
                var sourceLinks = room.memory.structures.links.sourceLinks;
                var linkers = room.memory.linkWorkers;
                var target;

				for(var link in sourceLinks) {
					link = Game.getObjectById(sourceLinks[link]);
                    for(linker in linkers) {
                        var hasTarget = false;
                        linker = linkers[linker];
                        if(linker.memory.target.id == link.id) {
                            hasTarget = true;
                            break;
                        }
                    }
                    if(hasTarget)
                        continue;
					else
                        target = link;
				}

                if(spawn.canCreateCreep(linkWorkerBody) == OK) {
                    var result = spawn.createCreep(linkWorkerBody, undefined, {role:"linkWorker", target:target, task:"none", home:spawn, room:spawn.room});
                    spawn.room.memory.linkWorkers.push(Game.creeps[result]);
                }
			}
			else if(TkMedics < kMedics) {
				console.log(spawn.name + " spawning kMedic");
                if(spawn.canCreateCreep(kMedicBody) == OK) {
                    var result = spawn.createCreep(kMedicBody, undefined,{role:"kMedic", home:spawn, task:"none", room:spawn.room})
                    spawn.room.memory.kMedics.push(Game.creeps[result]);
                }
			}
			else if(TkeeperKillers < keeperKillers) {
				console.log(spawn.name + " spawning KeeperKiller");
                if(spawn.canCreateCreep(keeperKillerBody) == OK) {
                    var result = spawn.createCreep(keeperKillerBody, undefined, {role:"keeperKiller", home:spawn, task:"none", room:spawn.room});
                    spawn.room.memory.keeperKillers.push(Game.creeps[result]);
                }
			}
			else if(Tcouriers < couriers){
				console.log(spawn.name + " Spawning courier");
				if(spawn.canCreateCreep(courierBody) == OK) {
                    spawn.createCreep(courierBody, undefined, {role:"courier", home:spawn, target:"none", room:spawn.room});
                    spawn.room.memory.couriers.push(Game.creeps[result]);
                }
			}
			else if(Tbuilders < builders && ((spawn.room.find(FIND_CONSTRUCTION_SITES).length) || Game.flags.bMove!=undefined)) {
				console.log(spawn.name + " Spawning builder");
				if(spawn.canCreateCreep(builderBody) == OK) {
                    spawn.createCreep(builderBody,undefined, {role:"builder", home:spawn,target:"none", task:"none",room:spawn.room});
                    spawn.room.memory.builders.push(Game.creeps[result]);
                }
			}
			else if(Trepairs < repairs) {
				console.log(spawn.name + " spawning repair");
				var roads = false;
				task = "none";
				for(var creep in room.memory.repairs) {
					creep = room.memory.repairs[creep];
					if(creep.memory.task == "roads") {
						roads = true;
						break;
					}
				}
				if(roads == false) {
					task = "roads";
					console.log("Making the repair do roads")
				}
                if(spawn.canCreateCreep(repairBody) == OK) {
                    spawn.createCreep(repairBody, undefined, {role:"repair", home:spawn, target:"none", task:task, room:spawn.room});
                    spawn.room.memory.repairs.push(Game.creeps[result]);
                }
			}
			else if(Tnomads < nomads && Game.flags.nomad != undefined) {
				console.log(spawn.name + " spawning nomad");
				if(spawn.canCreateCreep(nomadBody) == OK) {
                    var result = spawn.createCreep(nomadBody, undefined, {role: "nomad", task: "none", home: spawn, room: spawn.room});
                    spawn.room.memory.nomads.push(Game.creeps[result]);
                }
			}
			else if(roomEnergy == room.energyCapacity) {
				//spawnForNeighbors(spawn)
			}
		}
		if(room.name != 'E3N2' && room.name != 'E4N2')
			checkSquads(spawn,squads,roomEnergy);
		if(spawn == undefined)return;
		var near = spawn.pos.findInRange(FIND_MY_CREEPS,1);
		if(near.length > 6) {
			for(var creep in near) {
				creep = near[creep];
				creep.move(TOP);
			}
		}
	}
};

function countType(room,type) {
	var count = room.find(FIND_MY_CREEPS, {
		filter: function(creep) {
			if(creep.memory.role == type)
				return true;

			return false;
		}
	}).length;
	return count
}

function calculateRoomEnergy(room) {

	var totalEnergy = 0;
	var energyCap = 0;
	room.find(FIND_MY_STRUCTURES, {filter:function(object) {
		if(object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN) {
			totalEnergy += object.energy;
			energyCap += object.energyCapacity;
		}
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
		var right = lair.pos.x + 4;
		var bottom = lair.pos.y + 4;
		var left = lair.pos.x - 4;
		var top = lair.pos.y - 4;

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
	meleeBody = [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];
	rangedBody = [TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    if(roomEnergy > 1800){
        medicBody = [TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
        meleeBody = [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];
        rangedBody = [TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    }
    else if(roomEnergy > 1200) {
		medicBody = [TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
		meleeBody = [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];
		rangedBody = [TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
	}

	var sCreeps = Memory.squads;
	for(var i = 1; i <= squads; i++) {
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
				var creep = spawn.createCreep(medicBody, undefined,{role:"squad", task:"medic", target:"none", status:"none", squad:i, room:spawn.room});
			    Memory.squads.push(Game.creeps[creep]);
            }
		}
		else if(melee < 4) {
			if(spawn.canCreateCreep(meleeBody) == OK) {
				console.log(spawn.name + " Spawning melee");
				var creep = spawn.createCreep(meleeBody, undefined,{role:"squad", task:"melee", target:"none", status:"none", squad:i, room:spawn.room});
                Memory.squads.push(Game.creeps[creep]);
			}
		}
		else if(ranged < 4) {
			if(spawn.canCreateCreep(rangedBody) == OK) {
				console.log(spawn.name + " Spawning ranged");
				var creep = spawn.createCreep(rangedBody, undefined,{role:"squad", task:"ranged", target:"none", status:"none", squad:i, room:spawn.room});
                Memory.squads.push(Game.creeps[creep]);
			}
		}
	}
	//Check each role in the squad and get a count of what is in it.

	//If there is a deficiency, spawn whatever is defficient.
}
function spawnSquads(spawn, role){
	//Spawn based on role
}
