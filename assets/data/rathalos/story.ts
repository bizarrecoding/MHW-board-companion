import { StoryEntry } from "../types"

const story: StoryEntry[] = [{
  entry: 1,
  get: ["Potion"],
  content: "The Research Commission's letter arrived at dawn. Fires have been spreading through the Ancient Forest — not natural wildfires, but concentrated bursts of flame that leave perfect circles of ash among the towering trunks. Something is burning the canopy from above. The Commission needs answers, and more importantly, they need the burning to stop before the forest's oldest trees are lost. You pack your gear and head into the mist-shrouded treeline.",
  options: [{
    text: "Head straight for the burn zone",
    effect: ["Gain 2 track tokens", "Discard 1 time card"],
    next: 6
  }, {
    text: "Investigate the lower forest first",
    get: ["Monster Bone S", "Herb"],
    effect: ["Discard 2 time cards"],
    next: 8
  }]
}, {
  entry: 6,
  content: "The burn zone is worse than the letter suggested. Entire sections of canopy have been reduced to blackened skeletons, their charred branches clawing at the sky like the ribs of some great beast. The ground is littered with ash and half-consumed foliage. But among the destruction, you find something useful — the fire has exposed mineral deposits that were previously hidden beneath the forest floor.",
  options: [{
    text: "Collect the exposed minerals",
    get: ["Malachite Ore", "Carbalite Ore"],
    effect: ["Discard 1 time card"],
    next: 15
  }, {
    text: "Press on — the trail is fresh",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 22
  }]
}, {
  entry: 8,
  content: "The lower forest is eerily quiet. The usual chorus of insects and small monsters has fallen silent — they know something is hunting above. Ancient trees rise around you, their roots thick as houses, their canopies lost in the mist far overhead. A narrow game trail winds deeper into the woods, marked by the occasional scorch mark on the bark. Whatever is causing the fires is methodical, almost territorial.",
  options: [{
    text: "Follow the scorch marks upward",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 12
  }, {
    text: "Search for signs of other hunters",
    effect: ["Discard 1 time card"],
    next: 15
  }]
}, {
  entry: 12,
  content: "An abandoned hunter's camp sits at the base of a massive Ancient Tree. The tent has been partially melted — not by accident, but by something hot enough to fuse the fabric into the ground. A journal lies open on a supply crate, its pages singed at the edges. The last entry reads: 'It nests in the highest branches. Fire from above. No warning. We ran.' The supplies here are still usable, if you're willing to sort through the ash.",
  options: [{
    text: "Salvage what you can",
    get: ["Potion", "Ration"],
    effect: ["Discard 1 time card"],
    next: 15
  }, {
    text: "Study the scorch patterns for clues",
    effect: ["Gain 2 track tokens", "Discard 2 time cards"],
    next: 19
  }]
}, {
  entry: 15,
  content: "You find an Aptonoth carcass near a stream — or what's left of one. The creature has been torn apart with brutal efficiency, but it's the burns that catch your attention. Deep claw marks crisscross the flesh, and the hide is seared in long, sweeping arcs. This wasn't a ground attack. The predator struck from above, swooping down with talons blazing. The size of the wounds tells you one thing: this is no ordinary wyvern.",
  options: [{
    text: "Harvest what materials you can",
    get: ["Monster Bone M", "Quality bone"],
    effect: ["Discard 1 time card"],
    next: 23
  }, {
    text: "Follow the drag marks to the kill site",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 19
  }]
}, {
  entry: 19,
  content: "The roots of the Ancient Tree form a natural cathedral, their twisted mass creating hollow chambers beneath the trunk. Here, in the shadows, you find evidence of the creature's poison. The bark is stained with dark, viscous fluid — the tail of a Rathalos, dripping venom into the soil. The poison has killed a patch of fungi that normally glow with bioluminescence. Whatever monster claims this territory, it is well-armed and well-established.",
  options: [{
    text: "Collect samples of the poison",
    get: ["Antidote", "Herb"],
    effect: ["Discard 1 time card"],
    next: 23
  }, {
    text: "Look for the creature's flight path",
    effect: ["Gain 2 track tokens"],
    next: 29
  }]
}, {
  entry: 22,
  content: "The nesting site sits on a broad plateau of the Ancient Tree's highest accessible branch. The platform is constructed of scorched branches and melted resin — Rathalos uses fire not just as a weapon, but as a building material. The nest itself is enormous, lined with the bones of countless prey. Among the debris, you spot materials that have survived the heat: scales that shimmer with an inner fire, and fragments of wing membrane tough as steel.",
  options: [{
    text: "Collect the nest materials",
    get: ["Rathalos Scale", "Rathalos Webbing"],
    effect: ["Discard 2 time cards"],
    next: 23
  }, {
    text: "Set a watch and wait for its return",
    effect: ["Discard 1 time card", "All hunters heal to full"],
    next: 29
  }]
}, {
  entry: 23,
  content: "The canopy opens above you, revealing a sky stained orange with distant smoke. You can hear it now — the deep, trumpeting cry of a Rathalos echoing through the Ancient Forest. The sound bounces between the towering trunks, impossible to pinpoint. But you don't need to. The heat tells you everything. The air grows warmer with each passing moment, and the shadow that passes over the canopy is vast enough to blot out the sun.",
  options: [{
    text: "Take position and prepare for the dive",
    effect: ["Discard 1 time card"],
    next: 30
  }, {
    text: "Use the Ancient Tree for cover",
    get: ["Rathalos Shell"],
    effect: ["Discard 1 time card"],
    next: 30
  }]
}, {
  entry: 29,
  content: "A sudden rush of wind. The canopy parts like a curtain, and Rathalos descends — wings spread wide, tail dripping poison, jaws already gathering flame. The King of the Skies has found you. There is no more tracking, no more preparation. The ancient forest holds its breath as the wyvern circles once, twice, and then commits to its strike. Draw your weapon. The hunt begins.",
  monster: "Rathalos"
}, {
  entry: 30,
  content: "Rathalos lands on the highest branch with a crash of splintering wood. Flame licks from its jaws as it surveys you with eyes like molten gold. The Ancient Forest trembles. This is its domain — the fire that burns among the oldest trees, the shadow that rules the canopy. And you are the intruder. The wyvern spreads its wings, and the sky catches fire.",
  monster: "Rathalos"
}]

export default story;
