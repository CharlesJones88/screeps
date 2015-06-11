module.exports = function(creep, flag) {
	if(flag.color == COLOR_CYAN) {
		creep.moveTo(flag);
	}
	else if(flag.color == COLOR_RED) {

	}
	else if(flag.color == COLOR_YELLOW) {

	}
	else if(flag.color == COLOR_GREY) {
		if(creep.room != flag.room) {
			creep.moveTo(flag)
		}
		else {
			creep.moveTo(flag.room.controller);
			creep.claimController(flag.room.controller)
		}

	}
	else if(flag.color == COLOR_WHITE) {

	}
	else if(flag.color == COLOR_BLUE) {
		rally(creep,flag)
	}

}
function rally(creep,flag) {
	var target = creep.pos.findClosest(FIND_HOSTILE_CREEPS, {filter:function(object) {
		if(object.owner.username != "Source Keeper" && object.owner.username != "nuclearfalcon") {
			return object;
		}
	}});
	if(target == undefined) {
		creep.moveTo(flag);
		creep.memory.target = "none";
	}
	else {
		creep.moveTo(target);
		creep.attack(target);
	}
}
