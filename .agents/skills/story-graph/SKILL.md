---
name: story-graph
description: Create multi-branch story graphs for monsters with interconnected events, choices, and outcomes
---

# Story Graph

This skill creates branching story narratives for MHW Board Companion monsters. Stories are choose-your-own-adventure style journeys where player choices determine the path through events, leading to rewards, encounters, and ultimately the final hunt.

## When to use

When the user wants to:
- Add story content to a monster ("create story for Rathalos", "add story entries")
- Build a multi-branch narrative with choices and consequences
- Design the story mode flow for a new monster
- Expand an existing story with more branches or events

## Story Framework Overview

Each monster's story lives in `assets/data/<monster>/story.ts` as an array of `StoryEntry` objects.

**StoryEntry structure:**
```ts
{
  entry: number,           // Unique identifier (doesn't need to be sequential)
  content: string,         // Narrative text displayed to the player
  options?: StoryOption[], // Player choices that branch the story
  get?: string[],          // Items awarded at this entry
  roll?: string[],         // Random item roll from a pool
  monster?: MonsterKind    // Triggers the hunt (final entry only)
}
```

**StoryOption structure:**
```ts
{
  text: string,            // Button text shown to player
  effect?: string[],       // Narrative effects (e.g., "Discard 1 time card")
  condition?: string,      // Required item/state to see this option
  get?: string[],          // Items awarded for choosing this option
  roll?: string[],         // Random item roll for this choice
  next: number             // Entry number to jump to
}
```

## Story Design Principles

### 1. Entry Numbering

Entries don't need sequential numbering. Use gaps to allow future expansion:
- **Entry 1**: Always the opening/setup
- **Entries 2-10**: Early exploration and tracking
- **Entries 11-20**: Mid-story complications and discoveries
- **Entries 21-29**: Pre-hunt tension and final preparations
- **Entry 30**: Final confrontation trigger (has `monster` field)

### 2. Branching Structure

Each entry should have 2-4 options that create meaningful divergence:
- **Convergent branches**: Different paths that merge back together
- **Divergent branches**: Paths that lead to unique content
- **Conditional branches**: Options only visible with certain items/states

### 3. Pacing

A complete story should have:
- **Opening** (1-3 entries): Set the scene, establish the hunt
- **Tracking** (3-8 entries): Follow clues, face obstacles, gather resources
- **Complications** (2-4 entries): Unexpected events, rival hunters, environmental hazards
- **Climax** (1-2 entries): Final approach to the monster
- **Hunt trigger** (1 entry): The `monster` field that starts the battle

### 4. Rewards and Consequences

- Every meaningful choice should have a reward (`get`) or cost (`effect`)
- Use `roll` for randomized rewards from a pool
- Use `condition` to gate options behind item collection
- Use `effect` for narrative consequences (time loss, damage, etc.)

## Instructions

### Step 1: Gather story requirements

Ask the user for:
1. **Monster name** — which monster this story is for
2. **Story theme** — what's the narrative hook? (e.g., "defending a village", "investigating disappearances", "rival hunter conflict")
3. **Number of entries** — how many story events (typically 10-20)
4. **Key story beats** — major plot points the story should hit
5. **Reward items** — what items should be obtainable through the story

If the user doesn't have specifics, create a thematic story with placeholder content they can refine.

### Step 2: Design the story graph

Before writing code, map out the story structure:

```
Entry 1 (Opening)
  ├── Option A → Entry 6 (Risky path, better rewards)
  │     ├── Option A1 → Entry 15
  │     └── Option A2 → Entry 22
  └── Option B → Entry 8 (Safe path, slower progress)
        ├── Option B1 → Entry 15 (converges)
        └── Option B2 → Entry 29

Entry 15 (Mid-story complication)
  ├── Option A → Entry 23 (Danger encounter)
  └── Option B → Entry 12 (Investigation)

Entry 23 (Pre-hunt)
  └── Option A → Entry 30 (Hunt trigger)

Entry 30 (Hunt)
  monster: "MonsterName"
```

### Step 3: Write the story.ts file

Use this template structure:

```ts
import { StoryEntry } from "../types"

const story: StoryEntry[] = [
  // Entry 1: Opening
  {
    entry: 1,
    get: ["Starting Item"],
    content: `Opening narrative text. Set the scene, establish why the hunter is pursuing this monster.`,
    options: [{
      text: "Choice text",
      effect: ["Narrative consequence"],
      next: 6
    }, {
      text: "Alternative choice",
      get: ["Reward item"],
      next: 8
    }]
  },
  
  // Entry 6: Branch A
  {
    entry: 6,
    content: `Branch A narrative.`,
    options: [{
      text: "Continue",
      next: 15
    }]
  },
  
  // Entry 30: Hunt trigger (MUST have monster field)
  {
    entry: 30,
    content: `Final confrontation setup. The monster appears.`,
    monster: "MonsterName"
  }
]

export default story;
```

### Step 4: Story writing guidelines

**Content tone:**
- Write in second person ("You track the beast through...")
- Match the monster's habitat and behavior (Barroth = marshes/mud, Rathalos = skies/fire)
- Include sensory details (sounds, smells, environmental cues)
- Reference MHW lore naturally (guild, research commission, other monsters)

**Option text:**
- Keep options concise (under 60 characters when possible)
- Make choices feel meaningful (not just "go left/right")
- Use action-oriented language ("Press the attack", "Study the tracks")

**Effects:**
- Use game-mechanic language: "Discard 1 time card", "Gain 2 track tokens", "All hunters suffer 1 damage"
- Reference items by exact name as they appear in the item database
- Keep effects mechanically relevant to the board game simulation

### Step 5: Register the story

If the monster already exists, the story is auto-registered via the monster's `index.ts` import in `assets/data/story.ts`.

For new monsters, follow the create-monster skill to register the story.

### Step 6: Verify

Run `yarn check-types` to ensure no type errors. Test the story flow in the app by:
1. Selecting the monster in Story mode
2. Playing through each branch to verify all `next` references resolve
3. Checking that rewards and effects display correctly

## Example: Minimal Story Structure

Here's a minimal 5-entry story that demonstrates the core patterns:

```ts
import { StoryEntry } from "../types"

const story: StoryEntry[] = [
  {
    entry: 1,
    get: ["Potion"],
    content: "The guild has tasked you with investigating recent attacks. The trail leads into the dense forest...",
    options: [{
      text: "Follow the fresh tracks",
      effect: ["Gain 1 track token", "Discard 1 time card"],
      next: 6
    }, {
      text: "Search the campsite first",
      get: ["Monster Bone S"],
      effect: ["Discard 2 time cards"],
      next: 8
    }]
  },
  {
    entry: 6,
    content: "The tracks are unmistakable now. The creature is close—you can hear its roar echoing through the trees.",
    options: [{
      text: "Press forward",
      effect: ["Discard 1 time card"],
      next: 15
    }]
  },
  {
    entry: 8,
    content: "The abandoned camp tells a story of panic. Supplies scattered, a journal left open to a page describing the beast.",
    options: [{
      text: "Read the journal",
      get: ["Monster Bone M"],
      effect: ["Discard 1 time card"],
      next: 15
    }]
  },
  {
    entry: 15,
    content: "You find it. The beast stands before you, unaware of your presence. This is your moment.",
    options: [{
      text: "Begin the hunt",
      effect: ["Discard 1 time card"],
      next: 30
    }]
  },
  {
    entry: 30,
    content: "The creature turns, eyes locking onto yours. There's no turning back now.",
    monster: "MonsterName"
  }
]

export default story;
```

## Common Story Patterns

### Pattern 1: The Fork
Two distinct paths that explore different aspects of the monster's territory:
```
Entry 1 → Entry 6 (Forest path) → Entry 15
Entry 1 → Entry 8 (River path) → Entry 15 (converges)
```

### Pattern 2: The Gate
An option locked behind item collection:
```ts
{
  condition: "Ancient Bone",
  text: "Offer the bone at the shrine",
  effect: ["Shuffle a blessing card into the deck"],
  next: 29
}
```

### Pattern 3: The Gamble
A risky choice with a reward roll:
```ts
{
  text: "Search the wreckage",
  effect: ["Discard 1 time card"],
  roll: ["Dragonite Ore", "Fucium Ore", "Ancient bone"],
  next: 16
}
```

### Pattern 4: The Rest
A safe option that heals but costs time:
```ts
{
  text: "Rest and recover",
  effect: ["Discard 2 time cards", "All hunters heal to full"],
  next: 21
}
```

### Pattern 5: The Ambush
A dangerous encounter with damage:
```ts
{
  text: "Fight through the swarm",
  effect: ["All hunters suffer 2 damage"],
  next: 22
}
```
