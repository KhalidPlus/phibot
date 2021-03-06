var minecraftFacts = [
    "Endermen can't choose where they teleport.",
    "When you name a mob \"Dinnerbone\" or \"Grumm\" it turns upside-down.",
    "When a creeper is shot by a skeleton it drops a music disc.",
    "When you name a sheep \"jeb_\" it's wool becomes a rainbow.",
    "When a creeper gets struck by lightning, it becomes a charged creeper which has a huge explosion.",
    "Ghasts were voiced by a sleeping cat.",
    "Creepers were the result of a coding mistake.",
    "Endermen won't see you if you have a pumpkin on your head.",
    "The color of a dog's collar can be changed with a command.",
    "It's easier to catch fish while it's raining.",
    "An egg has a 1/256 chance to hatch 4 chickens at once.",
    "You can't hit endermen with projectiles, they will always teleport away.",
    "You can't open chests if there's a cat sitting on it.",
    "An arrow shot at primed TNT will bounce back.",
    "There is a 1 in a 10,000 chance that the title will say Minceraft instead of Minecraft.",
    "Potions of harming and healing have swapped effects on undead mobs.",
    "Iron golems and wolves are the only two mobs wich can become hostile in peaceful difficulty.",
    "Despite their lack of arms, creepers can climb ladders.",
    "The chances of a sheep spawning with pink wool is 0.5%",
    "The biome of the nether is called Hell.",
    "No hostile mobs spawn in mushroom biomes.",
    "Cats and golems don't take fall damage.",
    "If you spectate inside a creeper the world will be green and pixelated.",
    "If you spectate inside a spider you will see triple vision.",
    "The creeper hiss and TNT fuse use the same sound file at a different pitch.",
    "Mobs have a 5% chance of spawning left-handed.",
    "Ender Dragon heads animate when powered with redstone.",
    "Herobrine was never actually in Minecraft, despite the changelogs saying he was removed.",
    "In creative mode, the player is able acquire any item, with any NBT data. Thus some hacked clients have a give command.",
    "Eggs and snowballs don't do any damage but they do aggrovate mobs.",
    "When you sneak over redstone ore it doesn't light up.",
    "When you sneak on magma blocks you don't take damage.",
    "Water and lava only drips through opaque blocks; they don???t drip through slabs, stairs, glass, signs, etc.",
    "You can use sheers to remove the pumpkin from a snowman and you'll see a smiley face.",
    "Depsite being transparent, barrier blocks conduct redstone signals.",
    "Snow golems are harmed by water, similarly to Endermen. This includes rain, but not snow.",
    "Players in Spectator mode can see invisible entities.",
    "Glowstone emits a light level of 15, while torches only emit 14.",
    "The name of a chest, hopper, dropper, dispenser, or other containers is limited to 32 characters. If you give a container a longer name, opening the container will disconnect your client.",
    "As of Minecraft 1.8, Jack o'Lanterns cannot be used to make golems.",
    "Apples have a 0.5% chance of dropping when a block of oak/dark oak leaves is broken.",
    "It is possible to ignite a creeper by right-clicking it with flint and steel.",
    "Small slimes will attempt to attack players, but they don???t do any damage.",
    "Creepers are scared of cats, and will run away if they get too close to an ocelot or tamed cat.",
    "Cacti and sugar cane can be planted underwater, though sugar cane must be placed on an edge, because they still require a block of water.",
    "A single coal block can smelt 80 items, while nine coal items can only smelt 72.",
    "Wooden buttons produce longer pulses than stone buttons.",
    "Fence gates placed between cobblestone walls are lower than normal, to match the height of the wall.",
    "There are 16,777,216 possible colours for leather armour.",
    "Leaving a server and rejoining will cause any hostile endermen and wolves to become neutral again.",
    "TNT minecarts will explode if they crash into each other or fall too far onto solid ground.",
    "Silverfish stone (monster egg) can be found underneath extreme hills."
]

function randomPick(array){
    return array[Math.floor(Math.random() * Math.floor(array.length))];
}
function mcfact(){
    greenText(randomPick(minecraftFacts));
}

module.exports = function(greenTextFunc){
    greenText = greenTextFunc;
    return mcfact;
}
