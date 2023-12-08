export const classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
] as const;

export type DndClass = (typeof classes)[number];

export const races = [
  "Human",
  "Elf",
  "Dwarf",
  "Halfling",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Tiefling",
  "Dragonborn",
  "Aasimar",
];

export type DndRace = (typeof races)[number];

const classColors: Record<DndClass, string> = {
  "Barbarian": 'red',
  "Bard": 'fuchsia' ,
  "Cleric": 'rose',
  "Druid": 'orange',
  "Fighter": 'brown',
  "Monk": 'emerald',
  "Paladin": 'pink',
  "Ranger": 'green',
  "Rogue": 'yellow',
  "Sorcerer": 'blue',
  "Warlock": 'purple',
  "Wizard": 'violet',
}

export function classTailwindColor(dndClass: DndClass) {
  return `${classColors[dndClass]}-200`
}