/**
 * Created by charlesjones on 5/26/15.
 */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Initial'); // -> 'a thing'
 */
var Setup = function() {
    function Setup() {
        Memory.curSource = 0;
        this.spawn = Game.spawns.Spawn1;
        this.sources = this.spawn.room.find(FIND_SOURCES);
        this.lairs = spawn.room.find(FIND_HOSTILE_STRUCTURES);
        this.count = 0;
    }

    Setup.prototype.init = function() {
        for (var lair in this.lairs) {
            lair = this.lairs[this.count];
            var right = lair.pos.x + 6;
            var bottom = lair.pos.y + 6;
            var left = lair.pos.x - 6;
            var top = lair.pos.y - 6;

            var indices = lair.room.lookAtArea('source', top, left, bottom, right);
            for (var x in indices) {
                for (var y in indices[x]) {

                    var target = indices[x][y];
                    var index = this.sources.indexOf(target);
                    if (index > -1) {
                        this.sources.splice(index, 1);
                    }
                }
            }
            this.count++;
        }
        Memory.safeSources = this.sources;
    };
    return setup;
};