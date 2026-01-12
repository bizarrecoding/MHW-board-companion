import { StoryEntry } from "../types"

const story: StoryEntry[] = [{
  entry: 1,
  get: ["Potion"],
  content: "The Elder's Recess is a place of heat and pressure, where the very earth bleeds crystals. You've been sent to investigate reports of a Brachydios that has been unusually aggressive, even for its species. As you descend into the volcanic tunnels, you find walls coated in a glowing green slime that pulses with a faint, dangerous light.",
  options: [{
    text: "Follow the trail of slime deeper into the tunnels.",
    effect: ["Discard 1 time card", "Gain 1 track token"],
    next: 10
  }, {
    text: "Climb the outer obsidian ridges to get a better view.",
    effect: ["Discard 2 time cards", "Gain 2 track tokens"],
    next: 20
  }]
}, {
  entry: 10,
  content: "The slime on the walls is still fresh, dripping slowly. You notice footprints that are melted into the rock. Suddenly, you hear a frantic scuttling. A small monster pulls its foot out of a puddle of slime, only to have it explode a second later.",
  options: [{
    text: "Stay cautious and maintain distance.",
    effect: ["Discard 1 time card"],
    next: 11
  }, {
    text: "Hurry past the unstable pools.",
    effect: ["Discard 1 time card", "Each hunter suffers 1 damage"],
    next: 12
  }]
}, {
  entry: 11,
  content: "By moving slowly, you avoid the most volatile clusters. You find a discarded research notes from a previous expedition. It notes that the Brachydios' slime is actually a symbiotic mold. Interesting, but you have a hunt to finish.",
  options: [{
    text: "Press on towards the rhythmic pounding sounds.",
    next: 30
  }]
}, {
  entry: 12,
  content: "You make it through the corridor, but several small explosions leave you singed. However, you've gained significant ground. You see a massive, obsidian-hued creature ahead, licking its fists.",
  options: [{
    text: "Take the initiative and attack!",
    next: 30
  }]
}, {
  entry: 20,
  content: "The heat on the ridges is searing, but the air is clear of the mold's fumes. From here you can see the Brachydios patrolling a central plaza below. It seems to be marking its territory with explosive headbutts.",
  options: [{
    text: "Set up an ambush point from the heights.",
    effect: ["Discard 3 time cards"],
    next: 21
  }]
}, {
  entry: 21,
  content: "You wait for the perfect moment. As the monster passes below a loose rock formation, you trigger a landslide. It doesn't pin the beast, but it certainly disorients it.",
  options: [{
    text: "Drop down and engage!",
    get: ["Brachydios Shell"],
    next: 30
  }]
}, {
  entry: 30,
  content: "The Brachydios roars, its fists glowing a bright, angry orange. The slime it has spread across the area is primed to explode. This is going to be an explosive encounter.",
  monster: "Brachydios"
}]

export default story
