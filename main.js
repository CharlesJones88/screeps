/**
 * Created by charlesjones on 5/26/15.
 */
var creep = Game.creeps.Worker1;
var sources = creep.room.find(FIND_SOURCES);
creep.moveTo(sources[0]);
creep.harvest(sources[0]);