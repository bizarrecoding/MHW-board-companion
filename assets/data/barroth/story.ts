import { StoryEntry } from "../types"


const story: StoryEntry[] = [{
  entry: 1,
  get: ["Potion"],
  content: "You get given jobs all the time; that's the nature of being a monster hunter. This is the first time you've been asked to defend ants' nests though. Turns out the ants round here are being used for some important scientific research; new technology could be unlocked through understanding how ants carry so much weight, they say. The issue is Barroth, smashing its way through every nest in the region, eating the insects before they can be studied. So, here you are. You've got a target, and you know the foetid, marsh-ridden region Barroth inhabits.",
  options: [{
    text: "Get Hunting",
    effect: ["Discard 1 time card", "Gain 1 track token"],
    next: 17
  }]
}, {
  entry: 6,
  content:"You race along after Barroth. It hasn’t tried to conceal its tracks at all, simply forced its way through the environment as brutally, and efficiently, as it can. Its path is easy to see, and to follow... but that doesn’t mean it’s safe. Do you try and follow the same path as the creature, or hold back, taking your time?",
  options:[{
    text:"Hurry! Every second counts!",
    effect:["Each hunter suffers 1 damage,", "Discard 2 time card"],
    get:["Barroth Ridge"],
    next:23
  },{
    text:"Be wary, no point in risking anything yet.",
    effect:["Discard 1 time card"],
    next:15
  }]
}, {
  entry: 7,
  content: "You curse. Not footprints. The mud here is different to that elsewhere in the swamp, and, with the light distorting your vision, it was an easy mistake. Still, the mud should be useful in itself, and you've time to rest now.",
  options: [{
    text: "Rest",
    get: ["Potion", "Fertile mud"],
    effect: ["Discard 1 time card"],
    next: 21
  }]
}, {
  entry: 8,
  get: ["Carbalite Ore", "Malachite Ore"],
  content: "A discarded hunter's pack lies open. You wait a while, to see if anyone returns, but whoever it belonged to is long gone. There's something glinting beneath the fabric, though. Might be worth investigating.",
  options: [{
    text: "Investigate the mysterious cloud to the east.",
    effect: ["Discard 1 time card"],
    next: 23
  }, {
    text: "Open the pack and root through.",
    effect: ["Discard 2 time cards"],
    get: [],
    next: 28
  }]
}, {
  entry: 11,
  content:"There’s no sign the creature intends to return to the area, but you find more of its spore. It was a brutal fight, by the looks of thing. Remnants of it are everywhere. But the beast isn’t returning.",
  options:[{
    text:"Collect the relics of the battle.",
    effect:["Discard 2 time card"],
    get:["Monster Bone large","Barroth Shell."],
    next:27
  },{
    text:"Make up for lost time!",
    next:6,
  }]
}, {
  entry: 12,
  content:"The area around the ant colony is a mass of disrupted, uprooted earth. Almost as though Barroth was less a beast than a plough. You're uncertain what move to make next. You could conduct a more thorough search of the nest – there might be something in there a researcher would pay handsomely for. Or you could rest up. The area is open, and anything that might attack you was probably scared off by Barroth. Or you can keep up the hunt. What's your next move?",
  options: [{
    text: "You swear you can hear something, just beyond that hill. Keep going.",
    effect: ["Shuffle the Rushed Advance card into the time deck."],
    next: 30
  },{
    text: "Rest. You're going to need it, tomorrow.",
    effect: ["Discard 2 time cards", "All hunters heal to full"],
    next: 21
  },{
    text:"Digging in the ant colony, ruined though\nit may be, was a good idea.",
    effect:["Discard 1 track token", "Shuffle the Researcher's Favour card into the time deck"],
    next:7
  }]
}, {
  entry: 15,
  content:"Skirting the most dangerous elements of the swamp proves an effective tactic. And you’re still on the track of Barroth. The scent of freshly turned earth is rich in your nostrils, and it’s dug up more than simply wet mud. The remnants of a long dead beast are scattered across the earth, exposed to the dying sun for the first time in centuries.",
  options:[{
    text:"Stop to collect what you can.",
    effect:["Discard 1 time card"],
    get:["Ancient Bone"],
    next:22
  },{
    condition: "Fertile Mud",
    text:"Offer the creature a silent prayer.",
    effect:["Discard 1 time card","Shuffle an Ancient Guardian card into time deck."],
    next:29
  }]
}, {
  entry: 16,
  content:"Footprints. Large footprints, set deep into the mud. Only Barroth are big enough to leave track like this. You know you're gaining on your prey...",
  options:[{
    text:"Keep up the pursuit. It's only a matter of time.",
    effect:["Gain 2 track token", "Discard 1 time card"],
    next:30
  },{
    text:"Explore this area more closely. The Barroth has been here. There may be further clues.",
    effect:["Discard 1 time card", "Reveal up to three tokens from the pool."],
    next:29
  }]
}, {
  entry: 17,
  get: ["Monster Bone M"],
  content: "Creatures get sucked into the marsh land around here all the time. One step too deep, the quicksand seizes them...and this is the result. This beast died a few weeks ago. The carcass is picked clean, only a few strands of mummified flesh cling to the skeleton of the beast, like ragged banners above a slaughtered army. But there's no time to dwell on such things. Your hunt needs to continue. Each hunter gains 1 Monster Bone M.",
  options: [{
    text: "Press on.",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 8
  }, {
    text: "Stay and root through the carcass.",
    effect: ["Discard 1 time card"],
    get: ["Quality bone", "Monster Bone S"],
    next: 8
  }]
}, {
  entry: 21,
  content:"You awake feeling refreshed. You might not have made much progress in the hunt, but at least you'll be in decent shape when you encounter Barroth. You begin stalking the beast again, exploring deeper into the swamp. Barroths aren't subtle creatures, and it isn't long before you're convinced you're on its tail...",
  options:[{
    text:"You're approaching the beast.",
    effect:["If the group has four or less track tokens, gain 1 track token."],
    next:30
  }]
}, {
  entry: 22,
  content: "It's been a bad start. Your arms and face sting from the bites, and you've barely seen anything to hint Barroth hunts these marshes at all. Until now. A collection of the hardy trees growing in the swamp have been torn up and flung apart by something big, and heavy. The marks on the trunks look like they were made by Barroth plates...",
  options: [{
    text: "Pursue this lead!",
    effect: ["Gain 2 track tokens", "Discard 1 time card"],
    next: 29
  }, {
    text: "Hunker down and wait. The beast might still be in the area.",
    next: 30
  }]
}, {
  entry: 23,
  get: [],
  content: "Hornets! Hornets! Or, at least, something that looks a lot like hornets and stings a lot like them too. A cloud of the foul things surrounds you, jabbing and swooping, as you try to fight them off!",
  options: [{
    text: "Flee from the hideous swarm!",
    effect: ["All hunters suffer 2 damage."],
    next: 22
  }, {
    text: "Fight them off!",
    effect: ["Discard 1 potion"],
    get: [],
    next: 22
  }]
}, {
  entry: 28,
  content: "Another hunter's pack. Or perhaps this belonged to a researcher. It's difficult to tell. Something happened to a group of people exploring this area, that's certain. Their belongings are scattered about this place, most of them smashed or ruined. An encampment broken to pieces by a charging Barroth. Worth examining the wreckage, perhaps... or get straight on the creature's path.",
  options: [{
    text: "Attack!",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 11
  }, {
    text: "Examine the debris.",
    effect: ["Discard 1 time card"],
    "roll": ["Dragonite Ore", "Dragonite Ore", "Fucium Ore", "Fucium Ore", "Ancient bone", "Ancient bone"],
    next: 16
  }, {
    text: "No time for that. Keep hunting.",
    next: 30
  }]
}, {
  entry: 29,
  content: "A smashed ant nest confronts you as you chase Barroth. The colony lies open, its inhabitants either eaten or crushed under huge, charging feet. No wonder the researchers want the beast dealt with. It leaves little behind to give you a clue as to its next move, now it's fed. Time to make a choice.",
  options: [{
    text: "Those might be footprints...",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 7
  }, {
    text: "Spend a little more time with the nest.",
    effect: ["Discard 1 time card"],
    next: 12
  }]
}, {
  entry: 30,
  content: "Your instincts are good. Only a few minutes later, you hear the odd trumpeting cry of Barroth, the grunting and smashing as it hurls aside great clumps of sodden earth in search of food. It's nearly upon you. Brace yourselves for the fight.",
  monster: "Barroth"
}]

export default story;