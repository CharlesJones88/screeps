module.exports = function(links) {
	var sourceLinks = links.sourceLinks;
	var nodes = links.nodes;
	var controller = links.controller;
	controller = Game.getObjectById(controller);
	for(var link in sourceLinks) {
			link = Game.getObjectById(sourceLinks[link]);
		if(link.energy > .5 * link.energyCapacity) {
			for(var node in nodes) {
				node = Game.getObjectById(nodes[node]);
				if(node.energy < .75 * node.energyCapacity) {
					link.transferEnergy(node);
					return;
				}
			}
			link.transferEnergy(controller);
		}
	}
};
