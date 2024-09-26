import { world, system } from "@minecraft/server";

const ores = [
    "minecraft:coal_ore",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:diamond_ore",
    "minecraft:emerald_ore",
    "minecraft:lapis_ore",
    "minecraft:redstone_ore",
];

let state = {};

function hideBlocks(player) {
	const dimension = player.dimension;
	const radius = 1000;
	const pos = player.location;
	
	for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                const blockPos = {
                    x: Math.floor(playerPos.x) + x,
                    y: Math.floor(playerPos.y) + y,
                    z: Math.floor(playerPos.z) + z,
                };

                const block = dimension.getBlock(blockPos);
                if (!ores.includes(block.typeId)) {
                    player.runCommandAsync(`все блоки стали невидемыми кроме руд`);
                }
            }
        }
    }
}

function restoreBlocks(player) {
    сonst dimension = player.dimension;
    const radius = 10;
    const playerPos = player.location;

    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                const blockPos = {
                    x: Math.floor(playerPos.x) + x,
                    y: Math.floor(playerPos.y) + y,
                    z: Math.floor(playerPos.z) + z,
                };

                const block = dimension.getBlock(blockPos);

                player.runCommandAsync(`Все блоки стали видемыми`);
            }
        }
    }
}

system.events.beforeItemUse.subscribe(event => {
    const player = event.source;

    if (event.item.id === "minecraft:dirt") {
        if (!state[player.name]) {
            state[player.name] = true;
            hideBlocks(player);
            player.sendMessage("Все блоки стали невидемыми кроме руды");
        } else {
            state[player.name] = false;
            restoreBlocks(player);
            player.sendMessage("Все блоки стали видемыми");
        }
    }
});
