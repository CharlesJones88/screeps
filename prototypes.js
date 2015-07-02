/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototypes'); // -> 'a thing'
 */
module.exports = function() {

    Room.prototype.findHostileCreeps = function() {
        if(this.memory == undefined)return [];
        var creeps = [];
        var room = this;
        this.find(FIND_HOSTILE_CREEPS, {filter:function(object) {
            if(object.owner.username != "Source Keeper" && object.owner.username != "ultramixerman" && object.owner.username != 'hesto2') {
                if(object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0 || object.getActiveBodyparts(HEAL) > 0) {
                    room.memory.armedHostiles.push(object);
                }
                creeps.push(object);
            }
        }});
        return creeps;
    };

    Room.prototype.findHostileStructures = function() {
        var structures = [];
        var spawnRamparts = [];
    };

    RoomPosition.prototype.findEnemiesInAttackRange = function(opts) {
        if(this.room.memory.hostileCreeps != undefined) {
            if(this.room.memory.armedHostiles.length > 0) {
                targets = this.room.memory.armedHostiles
            }
            else {
                targets = this.room.memory.hostileCreeps;
            }
            return this.pos.findInRange(targets, 3, opts);
        }
    };

    Creep.prototype.findAndAttack = function() {
        var method;
        var targets;

        //Choose what targets to go for
        if(this.room.memory.armedHostiles.length > 0) {
            targets = this.room.memory.armedHostiles;
            console.log("1");
        }
        else if(this.room.memory.hostileCreeps.length > 0) {
            targets = this.room.memory.hostileCreeps;
            console.log(2);
        }
        else {
            return;
        }
        console.log(targets);
        //Determine which method to use
        if(targets.length < 5) {
            method = 'astar';
        }
        else {
            method = 'dijkstra';
        }

        //Assign target and based off of what tools you have, move to Target
        var target = this.pos.findClosest(this.room.memory.hostileCreeps,{algorithm:method});
        var partsAttack = this.getActiveBodyparts(ATTACK);
        var partsRanged = this.getActiveBodyparts(RANGED_ATTACK);
        if(partsAttack > 0 || (partsAttack > 0 && partsRanged > 0)) {
            if(this.pos.isNearTo(target)) {
                this.attack(target);
            }
            else {
                this.moveTo(target);
            }

            if(partsRanged > 0) {
                if(this.pos.inRangeTo(target,3)) {
                    this.rangedAttack(target);
                }
            }
        }
        else if(partsRanged > 0) {
            this.kite(2,target);
            if(this.pos.inRangeTo(target,3)) {
                this.rangedAttack(target);
            }
        }
        else {
            this.kite(4,target);
        }
    };

    Creep.prototype.kite = function(distance,target) {
        if(this.pos.inRangeTo(target,distance)) {
            this.moveTo(this.pos.x + this.pos.x - target.pos.x, this.pos.y + this.pos.y - target.pos.y );
        }
    };

    Creep.prototype.depositEnergy = function() {
        var spawn = this.memory.home;
        spawn = Game.getObjectById(spawn.id);
        var target;
        if(spawn.energy >= .95*spawn.energyCapacity) {
            if(this.room.memory.roomEnergy < this.room.memory.energyCapacity){
                var method = 'astar';
                if(spawn.room.controller.level > 3) {
                    method = 'dijkstra';
                }
                task = 'assign target extension';
                target = this.pos.findClosest(FIND_MY_STRUCTURES, {filter:function(object) {
                    if(object.structureType =="extension" && object.energy < object.energyCapacity)
                        return object;
                },algorithm:method})

            }
            else if(target == undefined || target == null) {
                task = 'assign target courier';
                target = spawn.room.controller.pos.findInRange('creep',5,{filter:function(object) {
                    if(object.memory.role == 'courier' && object.energy < object.energyCapacity) {
                        return object;
                    }
                }});
                if(target.length > 0){
                    target = target[0];
                }
                else {
                    return;
                }
            }

            if(this.pos.isNearTo(target)) {
                this.transferEnergy(target);
            }
            else {
                this.moveTo(target,{reusePath:20});
            }
        }
        else {
            this.moveTo(spawn,{reusePath:20});
            this.transferEnergy(spawn);
        }
    };
};
