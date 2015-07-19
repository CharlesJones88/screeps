module.exports = function () {
    var courier = require("courier");
    var builder = require("builder");
    var worker = require("worker");
    var transfer = require("transfer");
    var squad = require("squad");
    var keeperKiller = require("keeperKiller");
    var kMedic = require("kMedic");
    var linkWorker = require("linkWorker");
    var repair = require("repair");
    var nomad = require("nomad");

    var startCpu;
    var elapsed;

    startCpu = Game.getUsedCpu();
    for(creep in Memory.transfers) {
        creep = Memory.transfers[creep];
        transfer(creep);
        elapsed = Game.getUsedCpu() - startCpu;
        if(elapsed > 130) {
            console.log('TRANSFERS EXCEEDED LIMIT, BREAKING');
            break;
        }
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("TRANSFERS: " + elapsed);
    startCpu = Game.getUsedCpu();
    for(creep in Memory.squads) {
        creep = Memory.squads[creep];
        squad(creep);
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("SQUADS: " + elapsed);
    startCpu = Game.getUsedCpu();
    for(creep in Memory.linkWorkers) {
        creep = Memory.linkWorkers[creep];
        linkWorker(creep);
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("LINKWORKERS: " + elapsed);
    startCpu = Game.getUsedCpu();
    for(creep in Memory.couriers) {
        creep = Memory.couriers[creep];
        courier(creep);
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("COURIERS: " + elapsed);
    startCpu = Game.getUsedCpu();
    for(creep in Memory.builders) {
        creep = Memory.builders[creep];
        builder(creep);
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("BUILDERS: " + elapsed);
    startCpu = Game.getUsedCpu();
    for(creep in Memory.repairs) {
        creep = Memory.repairs[creep];
        creep.say("HI");
        repair(creep);
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("REPAIRS: " + elapsed);
    for(creep in Memory.keeperKillers) {
        creep = Memory.keeperKillers[creep];
        keeperKiller(creep);
    }
    for(creep in Memory.kMedics) {
        creep = Memory.kMedics[creep];
        kMedic(creep);
    }
    for(creep in Memory.nomads) {
        creep = Memory.nomads[creep];
        nomad(creep);
    }
    startCpu = Game.getUsedCpu();
    for(creep in Memory.workers) {
        creep = Memory.workers[creep];
        worker(creep);
    }
    elapsed = Game.getUsedCpu()-startCpu;
    console.log("WORKERS: " + elapsed);
};