/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rooms'); // -> 'a thing'
 */
var doLinks = require('links');
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
        room.memory.sources = [];
        room.memory.structures = [];
        room.getStructures();

        if(room.memory.nomadTargets == undefined)
            room.memory.nomadTargets = [];

        //Room Status
        if(room.memory.hostileCreeps.length == 0) {
            room.memory.status = 'PEACE';
        }
        else {
            room.memory.status = 'WAR';
        }
        var links = room.memory.structures.links;
        doLinks(links);
    }
};

function getStructures(room) {

}

function adjacentRooms(room) {
    var name = room.name;
    name = name.split(/([A-Z])(\d+)/);
    var xCard = name[1];
    var xCoord = name[2];
    var yCard = name[4];
    var yCoord = name[5];

    if(xCard == 'W') {
        xCoord *= -1;
    }
    if(yCard == "S") {
        yCoord *= -1;
    }
}