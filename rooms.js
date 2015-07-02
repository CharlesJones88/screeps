/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rooms'); // -> 'a thing'
 */
module.exports = function() {
    var rooms = Game.rooms;
    for(var room in rooms) {
        room = rooms[room];
        room.memory.couriers = [];
        room.memory.squads = [];
        room.memory.builders = [];
        room.memory.workers = [];
        room.memory.transfers = [];
        room.memory.warriors=[];
        room.memory.keeperKillers = [];
        room.memory.kMedics=[];
        room.memory.linkWorkers=[];
        room.memory.repairs=[];
        room.memory.nomads = [];
        room.memory.armedHostiles = [];
        room.memory.sourceKeepers = [];
        room.memory.hostileCreeps = room.findHostileCreeps();
        room.memory.status = '';
        if(room.memory.nomadTargets == undefined)
            room.memory.nomadTargets = [];

        //Room Status
        if(room.memory.hostileCreeps.length == 0) {
            room.memory.status = 'PEACE';
        }
        else{
            room.memory.status = 'WAR';
            /*if(room.controller.owner != undefined){
             if(room.controller.owner.username == 'hesto2'){
             owner = room.memory.hostileCreeps[0].owner.username
             Game.notify("Under Attack by " + owner)
             }
             }*/
        }
    }
};
