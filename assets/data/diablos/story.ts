import { StoryEntry } from "../types"

const story: StoryEntry[] = [{
  entry: 1,
  get: ["Potion"],
  content: "The Wildspire Waste is a land of extremes. You've been sent to investigate reports of a massive Diablos. As you step into the blinding sun, you spot two sets of tracks. One set is the familiar, heavy ploughing of a Barroth. The other, deeper and spaced wider, belongs to the 'Tyrant of the Desert'.",
  options: [{
    text: "Decide to follow the Barroth clues; it might lead you to its predator.",
    effect: ["Discard 1 time card", "Gain 1 track token"],
    next: 10
  }, {
    text: "Ignore the Barroth; head straight for the open desert to find Diablos tracks.",
    effect: ["Discard 2 time cards", "Gain 2 track tokens"],
    next: 20
  }]
}, {
  // 10: Follow Barroth
  entry: 10,
  content: "The Barroth's trail is erratic, marked by fresh mud and broken trees. It's moving fast, clearly agitated by something in the area. You pick up your pace, the smell of damp earth leading the way.",
  options: [{
    text: "Start the chase.",
    effect: ["Discard 1 time card"],
    next: 11
  }]
}, {
  // 11: Chase
  entry: 11,
  content: "The chase takes you through a winding canyon. The vibrations in the ground are growing stronger, rhythmic and deep. You reach a fork in the path where the Barroth's mud trail splits from a set of massive, dragged tail marks.",
  options: [{
    text: "The Barroth's trail seems to end at a rocky wall.",
    effect: ["Discard 1 time card"],
    next: 13
  }, {
    text: "Follow the path that leads clearly toward the Barroth's current position.",
    effect: ["Discard 1 time card", "Gain 1 track token"],
    next: 14
  }]
}, {
  // 13: Path ends -> 21
  entry: 13,
  content: "You reach the end of the mud trail, only to find the Barroth has leaped across a gap you cannot follow. However, in the ravine below, you spot the unmistakable, massive footprints of a Diablos heading deeper into the waste.",
  options: [{
    text: "Descend and follow the Diablos tracks.",
    effect: ["Discard 2 time card"],
    next: 21
  }]
}, {
  // 14: Path leads to Barroth
  entry: 14,
  content: "You find the Barroth huddled in a narrow cove, its head lowered in a defensive stance. It hasn't noticed you yet, but it's staring intently at the shifting sands in the center of the clearing.",
  options: [{
    text: "Wait and see what happens.",
    effect: ["Discard 1 time card"],
    next: 15
  }, {
    text: "The Barroth senses a shift in the wind and flees toward the caves!",
    next: 16
  }]
}, {
  // 15: Barroth ambushed -> 30
  entry: 15,
  content: "The ground explodes! A pair of massive horns erupt from beneath the Barroth, tossing the multishell beast into the air like a toy. The Diablos has arrived, and it is hungry. It turns its gaze toward you, the real prize.",
  options: [{
    text: "Engage the Diablos!",
    effect: ["Gain 1 track token"],
    next: 30
  }]
}, {
  // 16: Barroth flees -> 22
  entry: 16,
  content: "The Barroth lets out a panicked trumpeting cry and disappears into a dark cave opening. You have no choice but to follow if you want to stay on the trail of whatever it was running from.",
  options: [{
    effect: ["Discard 2 time card"],
    text: "Search the caves.",
    next: 22
  }]
}, {
  // 20: Ignore Barroth
  entry: 20,
  content: "You focus on the scorched salt flats. The heat is oppressive, but the open ground makes tracking easier. You look for the signature sinkholes and dragged tail marks of the desert's king.",
  options: [{
    text: "Follow the Diablos tracks.",
    effect: ["Discard 1 time card", "Gain 1 track token"],
    next: 21
  }, {
    text: "The terrain is too open. Search the nearby caves for a better vantage point.",
    effect: ["Discard 1 time card"],
    next: 22
  }]
}, {
  // 21: Follow Diablos tracks
  entry: 21,
  content: "The tracks are fresh—so fresh that the sand hasn't even begun to slide back into the depressions. The air feels heavy with the scent of sulfur. You are very close.",
  options: [{
    text: "Press on quickly.",
    effect: ["Discard 1 time card"],
    next: 23
  }, {
    text: "Watch from a distance.",
    effect: ["Discard 2 time cards"],
    next: 24
  }]
}, {
  // 22: Search caves -> 40
  entry: 22,
  content: "The cooling shadows of the caves are a relief. The walls are covered in ancient scratches, and the floor is littered with the bones of herbivores. You've entered a network of tunnels that seem to run beneath the entire waste.",
  options: [{
    text: "Follow the tracks leading back to the surface.",
    effect: ["Gain 1 track token", "Discard 1 time card"],
    next: 25
  }, {
    text: "Explore deeper into the cavern system.",
    effect: ["Discard 1 time card"],
    next: 26
  }]
}, {
  // 23: Diablos ambushes team -> 30
  entry: 23,
  content: "A sudden tremor knocks you off your feet. Before you can recover, the sand beneath you gives way. You fall into a shallow pit just as the Diablos lunges from the earth. It was waiting for you!",
  options: [{
    text: "Brace for the ambush!",
    effect: ["All hunters suffer 1 damage"],
    next: 30
  }]
}, {
  // 24: Diablos chases Barroth -> 15
  entry: 24,
  content: "As you watch, a Barroth wanders into the clearing. The Diablos tracks you were following suddenly accelerate, heading straight for the unsuspecting creature. The predator is on the move.",
  options: [{
    text: "Follow the attack.",
    next: 15
  }]
}, {
  // 25: Follow tracks -> 21
  entry: 25,
  content: "The path leads you back out onto the salt flats. The bright light is blinding, but you immediately find yourself back on the main trail of the Diablos.",
  options: [{
    text: "Return to the tracks.",
    effect: ["Discard 1 time card"],
    next: 21
  }]
}, {
  // 26: Found Diablos -> 30
  entry: 26,
  content: "You step into the chamber and find the Diablos resting. Its massive horns are tucked against its chest. As your foot snaps a dry bone, its eyes snap open. There is nowhere to run.",
  options: [{
    text: "Initiate the fight!",
    effect: ["Gain 2 track tokens"],
    next: 30
  }]
}, {
  // 30: Diablos Encounter
  entry: 30,
  content: "The Tyrant of the Desert stands before you, its twin horns gleaming like polished bone. The air is thick with dust and the smell of ozone. There is no more tracking to be done. The hunt has reached its climax.",
  monster: "Diablos"
}]

export default story;

/* 
Graph Logic:
1 (Intro)
├── 10 (Follow Barroth)
│   └── 11 (Chase)
│       ├── 13 (Path ends) ──> 21
│       └── 14 (Path to Barroth)
│           ├── 15 (Barroth Ambushed) ──> 30
│           └── 16 (Barroth Flees) ──> 22
└── 20 (Ignore Barroth)
    ├── 21 (Follow Diablos tracks)
    │   ├── 23 (Ambush Team) ──> 30
    │   └── 24 (Chase Barroth) ──> 15
    └── 22 (Search Caves)
        ├── 25 (Follow tracks) ──> 21
        └── 26 (Found Diablos) ──> 30
30 (Monster Encounter)
*/
