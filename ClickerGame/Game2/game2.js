/**
 * Elden Ring Text Dungeon Crawler Engine
 */

const SCALING_TIERS = { E: 0.10, D: 0.25, C: 0.50, B: 0.75, A: 1.00, S: 1.40 };

// --- 10 BASE CLASSES ---
const CLASSES = {
    vagabond:  { name: "Vagabond",  level: 9,  vig: 15, mnd: 10, end: 11, str: 14, dex: 13, int: 9,  fai: 9,  arc: 7,  weaponId: 11 },
    warrior:   { name: "Warrior",   level: 8,  vig: 11, mnd: 12, end: 11, str: 10, dex: 16, int: 10, fai: 8,  arc: 9,  weaponId: 18 },
    hero:      { name: "Hero",      level: 7,  vig: 14, mnd: 9,  end: 12, str: 16, dex: 9,  int: 7,  fai: 8,  arc: 11, weaponId: 36 },
    bandit:    { name: "Bandit",    level: 5,  vig: 10, mnd: 11, end: 10, str: 9,  dex: 13, int: 9,  fai: 8,  arc: 14, weaponId: 0 },
    astrologer:{ name: "Astrologer",level: 6,  vig: 9,  mnd: 15, end: 9,  str: 8,  dex: 12, int: 16, fai: 7,  arc: 9,  weaponId: 50 }, // Catalyst Staff
    prophet:   { name: "Prophet",   level: 7,  vig: 10, mnd: 14, end: 8,  str: 11, dex: 10, int: 7,  fai: 16, arc: 11, weaponId: 51 }, // Sacred Seal
    samurai:   { name: "Samurai",   level: 9,  vig: 12, mnd: 11, end: 13, str: 12, dex: 15, int: 9,  fai: 8,  arc: 8,  weaponId: 8 },
    prisoner:  { name: "Prisoner",  level: 9,  vig: 11, mnd: 12, end: 11, str: 11, dex: 14, int: 14, fai: 6,  arc: 9,  weaponId: 23 },
    confessor: { name: "Confessor", level: 10, vig: 10, mnd: 13, end: 10, str: 12, dex: 12, int: 9,  fai: 14, arc: 9,  weaponId: 10 },
    wretch:    { name: "Wretch",    level: 1,  vig: 10, mnd: 10, end: 10, str: 10, dex: 10, int: 10, fai: 10, arc: 10, weaponId: 1 }
};

// --- WEAPONS DATABASE (50 Physical + 2 Catalysts) ---
const WEAPONS_DATABASE = [
    { id: 0, name: "Great Knife", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "B", stat2: "arc", tier2: "D", aowName: "Blood Slash", aowDice: 1, aowSides: 8 },
    { id: 1, name: "Shortsword", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "D", stat2: "dex", tier2: "D", aowName: "Impaling Thrust", aowDice: 1, aowSides: 8 },
    { id: 2, name: "Parrying Dagger", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Parry Strike", aowDice: 1, aowSides: 6 },
    { id: 3, name: "Misericorde", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Critical Thrust", aowDice: 1, aowSides: 10 },
    { id: 4, name: "Wakizashi", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Blade Rush", aowDice: 1, aowSides: 8 },
    { id: 5, name: "Cinquedea", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "S", tier2: null, aowName: "Beastial Slice", aowDice: 1, aowSides: 8 },
    { id: 6, name: "Scorpion’s Stinger", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "B", stat2: "arc", tier2: "C", aowName: "Toxic Sting", aowDice: 1, aowSides: 6 },
    { id: 7, name: "Celebration’s Sickle", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "C", tier2: null, aowName: "Harvest Flail", aowDice: 1, aowSides: 8 },
    { id: 8, name: "Uchigatana", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Unsheathe", aowDice: 2, aowSides: 6 },
    { id: 9, name: "Nagakiba", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "A", stat2: "str", tier2: "E", aowName: "Piercing Fang", aowDice: 1, aowSides: 12 },
    { id: 10, name: "Broadsword", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Square Off", aowDice: 1, aowSides: 10 },
    { id: 11, name: "Longsword", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Impaling Thrust", aowDice: 1, aowSides: 8 },
    { id: 12, name: "Serpentbone Blade", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "A", stat2: "arc", tier2: "D", aowName: "Venomous Flurry", aowDice: 1, aowSides: 8 },
    { id: 13, name: "Dragon Scale Blade", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Ice Lightning Sword", aowDice: 2, aowSides: 6 },
    { id: 14, name: "Cane Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "C", tier2: null, aowName: "Hidden Thrust", aowDice: 1, aowSides: 8 },
    { id: 15, name: "Warhawk’s Talon", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Talon Flurry", aowDice: 1, aowSides: 10 },
    { id: 16, name: "Weathered Straight Sword", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "D", stat2: "dex", tier2: "D", aowName: "Wild Slash", aowDice: 1, aowSides: 8 },
    { id: 17, name: "Miquellan Knight’s Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "fai", tier2: "C", aowName: "Sacred Blade", aowDice: 1, aowSides: 10 },
    { id: 18, name: "Scimitar", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Spinning Slash", aowDice: 1, aowSides: 8 },
    { id: 19, name: "Falchion", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Vacuum Slice", aowDice: 1, aowSides: 10 },
    { id: 20, name: "Grossmesser", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", tier2: null, aowName: "Heavy Cleave", aowDice: 1, aowSides: 10 },
    { id: 21, name: "Bandit’s Curved Sword", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Bloodblade Dance", aowDice: 1, aowSides: 8 },
    { id: 22, name: "Rapier", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Repeating Thrust", aowDice: 1, aowSides: 6 },
    { id: 23, name: "Estoc", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Shield Crash", aowDice: 1, aowSides: 8 },
    { id: 24, name: "Cleanrot Knight’s Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "fai", tier2: "D", aowName: "Sacred Phalanx", aowDice: 1, aowSides: 10 },
    { id: 25, name: "Great Epee", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Giant Hunt", aowDice: 1, aowSides: 12 },
    { id: 26, name: "Claymore", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Lion’s Claw", aowDice: 1, aowSides: 12 },
    { id: 27, name: "Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Stamp (Upward Cut)", aowDice: 2, aowSides: 10 },
    { id: 28, name: "Zweihänder", diceNum: 3, diceSides: 6, ap: 2, stat1: "str", tier1: "A", stat2: "dex", tier2: "D", aowName: "Waves of Darkness", aowDice: 1, aowSides: 12 },
    { id: 29, name: "Flamberge", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Bloody Slash", aowDice: 1, aowSides: 10 },
    { id: 30, name: "Knight’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Spinning Slash", aowDice: 1, aowSides: 10 },
    { id: 31, name: "Banished Knight’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Impaling Thrust", aowDice: 1, aowSides: 12 },
    { id: 32, name: "Lordsworn’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Upward Slash", aowDice: 1, aowSides: 10 },
    { id: 33, name: "Troll’s Golden Sword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "A", tier2: null, aowName: "Troll’s Roar", aowDice: 2, aowSides: 8 },
    { id: 34, name: "Royal Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "B", stat2: "int", tier2: "C", aowName: "Wolf’s Assault", aowDice: 2, aowSides: 10 },
    { id: 35, name: "Crescent Axe", diceNum: 1, diceSides: 12, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "C", aowName: "War Cry", aowDice: 2, aowSides: 6 },
    { id: 36, name: "Battle Axe", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Wild Strikes", aowDice: 1, aowSides: 8 },
    { id: 37, name: "Highland Axe", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Barbaric Roar", aowDice: 1, aowSides: 10 },
    { id: 38, name: "Executioner’s Greataxe", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Heavy Chop", aowDice: 2, aowSides: 10 },
    { id: 39, name: "Warhammer", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Ground Slam", aowDice: 1, aowSides: 12 },
    { id: 40, name: "Mace", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Endure Strike", aowDice: 1, aowSides: 8 },
    { id: 41, name: "Morning Star", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "arc", tier2: "D", aowName: "Heavy Spike", aowDice: 1, aowSides: 10 },
    { id: 42, name: "Flail", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Spinning Chain", aowDice: 1, aowSides: 8 },
    { id: 43, name: "Cross-Naginata", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Repeating Thrust", aowDice: 1, aowSides: 6 },
    { id: 44, name: "Pike", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Charge", aowDice: 1, aowSides: 10 },
    { id: 45, name: "Partisan", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Spectral Lance", aowDice: 1, aowSides: 8 },
    { id: 46, name: "Nightrider Glaive", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Phantom Slash", aowDice: 2, aowSides: 8 },
    { id: 47, name: "Lucerne", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "C", aowName: "Giant Hunt", aowDice: 1, aowSides: 12 },
    { id: 48, name: "Gargoyle’s Halberd", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Vacuum Slice", aowDice: 2, aowSides: 6 },
    { id: 49, name: "Vulgar Militia Saw", diceNum: 1, diceSides: 12, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Serrated Slash", aowDice: 1, aowSides: 10 },
    
    // Catalysts for Magic Spells
    { id: 50, name: "Academy Glintstone Staff", isCatalyst: true, type: "sorcery", diceNum: 1, diceSides: 4, ap: 1, stat1: "int", tier1: "A", aowName: "Staff Bonk", aowDice: 1, aowSides: 4 },
    { id: 51, name: "Finger Seal", isCatalyst: true, type: "incantation", diceNum: 1, diceSides: 4, ap: 1, stat1: "fai", tier1: "A", aowName: "Seal Strike", aowDice: 1, aowSides: 4 }
];

// --- 30 ELDEN RING SPELLS & INCANTATIONS ---
const SPELLS_DATABASE = [
    // Sorceries (INT)
    { name: "Glintstone Pebble", type: "sorcery", reqStat: "int", minStat: 10, ap: 1, diceNum: 1, diceSides: 8, tier: "B" },
    { name: "Swift Glintstone Shard", type: "sorcery", reqStat: "int", minStat: 12, ap: 1, diceNum: 1, diceSides: 6, tier: "A" },
    { name: "Glintstone Cometshard", type: "sorcery", reqStat: "int", minStat: 18, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Comet", type: "sorcery", reqStat: "int", minStat: 24, ap: 2, diceNum: 3, diceSides: 8, tier: "S" },
    { name: "Star Shower", type: "sorcery", reqStat: "int", minStat: 20, ap: 2, diceNum: 2, diceSides: 10, tier: "B" },
    { name: "Rock Sling", type: "sorcery", reqStat: "int", minStat: 16, ap: 2, diceNum: 3, diceSides: 6, tier: "A" },
    { name: "Carian Slicer", type: "sorcery", reqStat: "int", minStat: 14, ap: 1, diceNum: 2, diceSides: 6, tier: "S" },
    { name: "Carian Greatsword", type: "sorcery", reqStat: "int", minStat: 22, ap: 2, diceNum: 2, diceSides: 10, tier: "A" },
    { name: "Cannon of Haima", type: "sorcery", reqStat: "int", minStat: 25, ap: 3, diceNum: 4, diceSides: 8, tier: "S" },
    { name: "Collapsing Stars", type: "sorcery", reqStat: "int", minStat: 28, ap: 2, diceNum: 3, diceSides: 8, tier: "A" },
    { name: "Night Comet", type: "sorcery", reqStat: "int", minStat: 26, ap: 2, diceNum: 3, diceSides: 8, tier: "S" },
    { name: "Magma Shot", type: "sorcery", reqStat: "int", minStat: 19, ap: 2, diceNum: 2, diceSides: 8, tier: "B" },
    { name: "Ranni's Dark Moon", type: "sorcery", reqStat: "int", minStat: 35, ap: 3, diceNum: 5, diceSides: 8, tier: "S" },
    { name: "Comet Azur", type: "sorcery", reqStat: "int", minStat: 40, ap: 4, diceNum: 6, diceSides: 10, tier: "S" },
    { name: "Stars of Ruin", type: "sorcery", reqStat: "int", minStat: 32, ap: 3, diceNum: 4, diceSides: 8, tier: "A" },

    // Incantations (FAI)
    { name: "Catch Flame", type: "incantation", reqStat: "fai", minStat: 10, ap: 1, diceNum: 1, diceSides: 8, tier: "A" },
    { name: "Flame Sling", type: "incantation", reqStat: "fai", minStat: 12, ap: 1, diceNum: 1, diceSides: 10, tier: "B" },
    { name: "Lightning Spear", type: "incantation", reqStat: "fai", minStat: 17, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Honed Lightning", type: "incantation", reqStat: "fai", minStat: 21, ap: 2, diceNum: 2, diceSides: 10, tier: "A" },
    { name: "Black Flame", type: "incantation", reqStat: "fai", minStat: 20, ap: 2, diceNum: 3, diceSides: 6, tier: "S" },
    { name: "Scouring Black Flame", type: "incantation", reqStat: "fai", minStat: 28, ap: 3, diceNum: 4, diceSides: 6, tier: "S" },
    { name: "Giantsflame Take Thee", type: "incantation", reqStat: "fai", minStat: 30, ap: 3, diceNum: 4, diceSides: 8, tier: "S" },
    { name: "Frenzied Burst", type: "incantation", reqStat: "fai", minStat: 22, ap: 2, diceNum: 3, diceSides: 8, tier: "A" },
    { name: "Unendurable Frenzy", type: "incantation", reqStat: "fai", minStat: 31, ap: 3, diceNum: 5, diceSides: 6, tier: "S" },
    { name: "Ancient Dragons' Lightning Spear", type: "incantation", reqStat: "fai", minStat: 32, ap: 3, diceNum: 4, diceSides: 10, tier: "S" },
    { name: "Fortissax's Lightning Spear", type: "incantation", reqStat: "fai", minStat: 35, ap: 3, diceNum: 5, diceSides: 8, tier: "S" },
    { name: "Rotten Breath", type: "incantation", reqStat: "fai", minStat: 15, ap: 2, diceNum: 2, diceSides: 8, tier: "S" },
    { name: "Dragonice", type: "incantation", reqStat: "fai", minStat: 16, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Burn, O Flame!", type: "incantation", reqStat: "fai", minStat: 27, ap: 3, diceNum: 3, diceSides: 12, tier: "A" },
    { name: "Wrath of Gold", type: "incantation", reqStat: "fai", minStat: 32, ap: 2, diceNum: 3, diceSides: 10, tier: "A" }
];

// --- 40 MONSTERS WITH BOSSES EVERY 10 ENCOUNTERS ---
const MONSTER_TIERS = [
    // Tier 1 (Levels 1-10)
    [
        { name: "Wandering Noble", hp: 12, dice: 1, sides: 4, bonus: 0, xp: 15 },
        { name: "Godrick Soldier", hp: 18, dice: 1, sides: 6, bonus: 1, xp: 25 },
        { name: "Stray Dog", hp: 14, dice: 1, sides: 6, bonus: 2, xp: 20 },
        { name: "Demi-Human Fiend", hp: 16, dice: 1, sides: 4, bonus: 2, xp: 22 },
        { name: "Kaiden Sellsword", hp: 28, dice: 1, sides: 8, bonus: 2, xp: 45 },
        { name: "Godrick Knight", hp: 34, dice: 1, sides: 10, bonus: 2, xp: 60 },
        { name: "Giant Land Octopus", hp: 42, dice: 1, sides: 8, bonus: 1, xp: 70 },
        { name: "Pumpkin Head", hp: 48, dice: 2, sides: 6, bonus: 2, xp: 85 },
        { name: "Bloodhound Knight", hp: 38, dice: 2, sides: 4, bonus: 4, xp: 95 }
    ],
    // Tier 2 (Levels 11-20)
    [
        { name: "Raya Lucaria Soldier", hp: 32, dice: 1, sides: 8, bonus: 2, xp: 55 },
        { name: "Cuckoo Knight", hp: 55, dice: 1, sides: 10, bonus: 3, xp: 100 },
        { name: "Glintstone Dragonborn", hp: 48, dice: 2, sides: 6, bonus: 2, xp: 90 },
        { name: "Rotten Stray", hp: 30, dice: 2, sides: 4, bonus: 4, xp: 80 },
        { name: "Cleanrot Knight", hp: 65, dice: 2, sides: 6, bonus: 3, xp: 140 },
        { name: "Omen Brawler", hp: 75, dice: 2, sides: 8, bonus: 3, xp: 160 },
        { name: "Kindred of Rot", hp: 42, dice: 1, sides: 10, bonus: 4, xp: 110 },
        { name: "Vulgar Militia Warrior", hp: 36, dice: 1, sides: 12, bonus: 2, xp: 85 },
        { name: "Redmane Knight", hp: 80, dice: 2, sides: 8, bonus: 4, xp: 190 }
    ],
    // Tier 3 (Levels 21-30)
    [
        { name: "Leyndell Soldier", hp: 58, dice: 1, sides: 10, bonus: 3, xp: 130 },
        { name: "Leyndell Knight", hp: 100, dice: 2, sides: 8, bonus: 4, xp: 240 },
        { name: "Wormface", hp: 85, dice: 2, sides: 6, bonus: 5, xp: 210 },
        { name: "Black Knife Assassin", hp: 70, dice: 3, sides: 4, bonus: 6, xp: 280 },
        { name: "Gargoyle Warrior", hp: 130, dice: 2, sides: 10, bonus: 4, xp: 320 },
        { name: "Crucible Knight", hp: 150, dice: 2, sides: 8, bonus: 6, xp: 380 },
        { name: "Sanguine Noble", hp: 90, dice: 2, sides: 6, bonus: 6, xp: 260 },
        { name: "Abductor Virgin", hp: 140, dice: 3, sides: 6, bonus: 3, xp: 330 },
        { name: "Draconic Tree Sentinel", hp: 180, dice: 2, sides: 10, bonus: 6, xp: 450 }
    ],
    // Tier 4 (Levels 31-40+)
    [
        { name: "Fire Monk", hp: 110, dice: 2, sides: 8, bonus: 4, xp: 300 },
        { name: "Prelate of Flame", hp: 210, dice: 3, sides: 8, bonus: 5, xp: 520 },
        { name: "Banished Knight (Farum)", hp: 160, dice: 2, sides: 10, bonus: 5, xp: 480 },
        { name: "Beastman of Farum Azula", hp: 125, dice: 3, sides: 6, bonus: 4, xp: 400 },
        { name: "Skeletal Swordsman", hp: 95, dice: 2, sides: 6, bonus: 5, xp: 320 },
        { name: "Night's Cavalry", hp: 175, dice: 2, sides: 10, bonus: 6, xp: 550 },
        { name: "Godskin Apostle", hp: 190, dice: 3, sides: 6, bonus: 7, xp: 650 },
        { name: "Godskin Noble", hp: 220, dice: 2, sides: 12, bonus: 6, xp: 700 },
        { name: "Tree Sentinel Commander", hp: 260, dice: 3, sides: 8, bonus: 8, xp: 900 }
    ]
];

const BOSSES = [
    { name: "Margit, the Fell Omen", hp: 110, dice: 2, sides: 8, bonus: 4, xp: 350 },
    { name: "Godrick the Grafted", hp: 240, dice: 3, sides: 6, bonus: 5, xp: 800 },
    { name: "Starscourge Radahn", hp: 420, dice: 3, sides: 8, bonus: 6, xp: 1800 },
    { name: "Malenia, Blade of Miquella", hp: 650, dice: 4, sides: 8, bonus: 8, xp: 4000 }
];

let gameState = {
    player: null,
    enemy: null,
    droppedItem: null,
    killCount: 0,
    pendingStatPoint: false
};

// --- FORMULAS ---

function calculateMaxHp(vig) { return 10 + (vig * 2); }
function calculateMaxAp(end) { return 2 + Math.floor(end / 5); }
function calculateScaledHp(baseHp, level) { return Math.ceil(baseHp * (1 + (level - 1) * 0.25)); }

function calculateWeaponBonus(weapon, stats) {
    if (!weapon) return 0;
    let bonus = 0;
    if (weapon.stat1 && weapon.tier1) bonus += (stats[weapon.stat1] || 0) * SCALING_TIERS[weapon.tier1];
    if (weapon.stat2 && weapon.tier2) bonus += (stats[weapon.stat2] || 0) * SCALING_TIERS[weapon.tier2];
    return Math.floor(bonus);
}

function calculateSpellBonus(spell, stats) {
    const val = stats[spell.reqStat] || 0;
    return Math.floor(val * SCALING_TIERS[spell.tier]);
}

function rollDice(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
    return total;
}

function log(message, type = "combat-msg") {
    const consoleElem = document.getElementById("console");
    const p = document.createElement("p");
    p.className = type;
    p.innerHTML = `> ${message}`;
    consoleElem.appendChild(p);
    consoleElem.scrollTop = consoleElem.scrollHeight;
}

function formatDiceLabel(name, diceNum, diceSides, bonus, apCost) {
    let bonusStr = bonus > 0 ? `+${bonus}` : '';
    return `${name} (${diceNum}d${diceSides}${bonusStr} for ${apCost} AP)`;
}

// --- LOCAL STORAGE ---

function saveGame() {
    try { localStorage.setItem("er_dungeon_save_v2", JSON.stringify(gameState)); } catch (e) {}
}

function loadGame() {
    const saved = localStorage.getItem("er_dungeon_save_v2");
    if (saved) {
        try {
            gameState = JSON.parse(saved);
            log("Saved game loaded.", "system-msg");
            return true;
        } catch (e) {}
    }
    return false;
}

function resetGame() {
    localStorage.removeItem("er_dungeon_save_v2");
    location.reload();
}

// --- GAME LOGIC ---

function selectClass(classKey) {
    const base = CLASSES[classKey];
    if (!base) return;

    const startingWeapon = WEAPONS_DATABASE[base.weaponId];

    gameState.player = {
        className: base.name,
        level: base.level,
        xp: 0,
        maxXp: base.level * 50,
        stats: { vig: base.vig, mnd: base.mnd, end: base.end, str: base.str, dex: base.dex, int: base.int, fai: base.fai, arc: base.arc },
        maxHp: calculateMaxHp(base.vig),
        currentHp: calculateMaxHp(base.vig),
        maxAp: calculateMaxAp(base.end),
        currentAp: calculateMaxAp(base.end),
        mainHand: startingWeapon,
        offHand: null
    };

    log(`Began journey as <span class="highlight">${base.name}</span> with <span class="highlight">${startingWeapon.name}</span>.`);
    spawnEnemy();
    saveGame();
    renderUI();
}

function spawnEnemy() {
    const playerLevel = gameState.player ? gameState.player.level : 1;
    let template;

    // Check for Boss Encounter every 10 kills
    if (gameState.killCount > 0 && gameState.killCount % 10 === 0) {
        const bossIdx = Math.min(Math.floor((gameState.killCount / 10) - 1), BOSSES.length - 1);
        template = BOSSES[bossIdx];
        const scaledHp = calculateScaledHp(template.hp, playerLevel);

        gameState.enemy = { name: template.name, maxHp: scaledHp, currentHp: scaledHp, dice: template.dice, sides: template.sides, bonus: template.bonus, xp: template.xp, isBoss: true };
        log(`🚨 <strong class="boss-text">BOSS ENCOUNTER: ${gameState.enemy.name}</strong> (${gameState.enemy.currentHp} HP)!`);
        return;
    }

    // Determine normal tier index
    let tierIdx = 0;
    if (playerLevel >= 11) tierIdx = 1;
    if (playerLevel >= 21) tierIdx = 2;
    if (playerLevel >= 31) tierIdx = 3;

    // 15% Chance for Out-of-Level higher tier enemy
    if (Math.random() < 0.15 && tierIdx < MONSTER_TIERS.length - 1) {
        tierIdx += 1;
        log(`⚠️ <span class="highlight">DANGER! A high-level threat from lower depths approaches!</span>`, "system-msg");
    }

    const tierList = MONSTER_TIERS[tierIdx];
    template = tierList[Math.floor(Math.random() * tierList.length)];
    const scaledHp = calculateScaledHp(template.hp, playerLevel);

    gameState.enemy = { name: template.name, maxHp: scaledHp, currentHp: scaledHp, dice: template.dice, sides: template.sides, bonus: template.bonus, xp: template.xp + (playerLevel * 2), isBoss: false };
    log(`Encountered <strong class="damage-text">${gameState.enemy.name}</strong> (${gameState.enemy.currentHp} HP)!`);
}

function gainXP(amount) {
    const p = gameState.player;
    p.xp += amount;
    log(`Obtained <span class="highlight">${amount} Runes</span>.`, "system-msg");
    if (p.xp >= p.maxXp) levelUp();
}

function levelUp() {
    const p = gameState.player;
    p.xp -= p.maxXp;
    p.level += 1;
    p.maxXp = p.level * 50;
    gameState.pendingStatPoint = true;
    log(`🌟 <strong class="highlight">LEVEL UP! Reached Level ${p.level}!</strong> Allocate your stat point below.`, "system-msg");
}

function allocateStat(statKey) {
    if (!gameState.pendingStatPoint) return;

    const p = gameState.player;
    p.stats[statKey] += 1;
    gameState.pendingStatPoint = false;

    p.maxHp = calculateMaxHp(p.stats.vig);
    p.currentHp = p.maxHp;
    p.maxAp = calculateMaxAp(p.stats.end);
    p.currentAp = p.maxAp;

    log(`Increased <span class="highlight">${statKey.toUpperCase()}</span> to ${p.stats[statKey]}. HP & AP restored!`, "system-msg");
    saveGame();
    renderUI();
}

function triggerLootDrop() {
    // 60% Chance to drop weapon or catalyst
    if (Math.random() < 0.60) {
        const randWeapon = WEAPONS_DATABASE[Math.floor(Math.random() * WEAPONS_DATABASE.length)];
        gameState.droppedItem = randWeapon;
        log(`🎁 Item Dropped: <strong class="highlight">${randWeapon.name}</strong>! Actions frozen—Choose an option on left.`, "system-msg");
    }
}

function equipDroppedItem(slot) {
    if (!gameState.droppedItem) return;

    if (slot === 'main') {
        gameState.player.mainHand = gameState.droppedItem;
        log(`Equipped <strong class="highlight">${gameState.droppedItem.name}</strong> to Main-Hand.`, "system-msg");
    } else if (slot === 'off') {
        gameState.player.offHand = gameState.droppedItem;
        log(`Equipped <strong class="highlight">${gameState.droppedItem.name}</strong> to Off-Hand.`, "system-msg");
    }

    gameState.droppedItem = null; // Unfreezes combat actions
    saveGame();
    renderUI();
}

function discardDroppedItem() {
    if (!gameState.droppedItem) return;
    log(`Discarded ${gameState.droppedItem.name}.`, "system-msg");
    gameState.droppedItem = null; // Unfreezes combat actions
    saveGame();
    renderUI();
}

function enemyTurn() {
    const e = gameState.enemy;
    const p = gameState.player;
    if (!e || e.currentHp <= 0) return;

    const damage = rollDice(e.dice, e.sides) + e.bonus;
    p.currentHp = Math.max(0, p.currentHp - damage);

    log(`The <strong>${e.name}</strong> strikes for <span class="damage-text">${damage} damage</span>!`);

    if (p.currentHp <= 0) {
        log(`☠️ <strong class="damage-text">YOU DIED</strong>`, "system-msg");
        setTimeout(() => resetGame(), 3000);
    }
}

function checkEnemyDefeated() {
    const e = gameState.enemy;
    if (e && e.currentHp <= 0) {
        gameState.killCount += 1;
        log(`🏆 Defeated <strong class="highlight">${e.name}</strong>!`);
        gainXP(e.xp);
        triggerLootDrop();

        gameState.player.currentAp = gameState.player.maxAp;
        log(`----------------------------------------`, "system-msg");
        spawnEnemy();
        return true;
    }
    return false;
}

// --- ATTACKS & SPELLS ---

function executeSingleAttack(slot) {
    if (gameState.droppedItem) return; // Frozen during loot decision

    const p = gameState.player;
    const e = gameState.enemy;
    const weapon = slot === 'main' ? p.mainHand : p.offHand;

    if (!weapon || p.currentAp < weapon.ap) {
        log("Not enough AP!", "system-msg");
        return;
    }

    const bonus = calculateWeaponBonus(weapon, p.stats);
    const damage = rollDice(weapon.diceNum, weapon.diceSides) + bonus;

    p.currentAp -= weapon.ap;
    e.currentHp = Math.max(0, e.currentHp - damage);

    log(`Struck with <strong>${weapon.name}</strong> dealing <span class="damage-text">${damage} damage</span>!`);

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        enemyTurn();
        p.currentAp = p.maxAp;
    }

    saveGame();
    renderUI();
}

function executeDualAttack() {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    if (!p.mainHand || !p.offHand) return;

    const dualAp = p.mainHand.ap + 1;
    if (p.currentAp < dualAp) {
        log(`Not enough AP for Dual Attack! Requires ${dualAp} AP.`, "system-msg");
        return;
    }

    const b1 = calculateWeaponBonus(p.mainHand, p.stats);
    const b2 = calculateWeaponBonus(p.offHand, p.stats);
    const dmg1 = rollDice(p.mainHand.diceNum, p.mainHand.diceSides) + b1;
    const dmg2 = rollDice(p.offHand.diceNum, p.offHand.diceSides) + b2;
    const totalDmg = dmg1 + dmg2;

    p.currentAp -= dualAp;
    e.currentHp = Math.max(0, e.currentHp - totalDmg);

    log(`<strong>Dual Strike</strong> (${p.mainHand.name} + ${p.offHand.name}) dealt <span class="damage-text">${totalDmg} damage</span>!`);

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        enemyTurn();
        p.currentAp = p.maxAp;
    }

    saveGame();
    renderUI();
}

function executeAshOfWar(slot) {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    const weapon = slot === 'main' ? p.mainHand : p.offHand;
    const remainingAp = p.currentAp;

    if (!weapon || remainingAp < 1) {
        log("Not enough AP!", "system-msg");
        return;
    }

    const bonus = calculateWeaponBonus(weapon, p.stats);
    let totalDmg = 0;
    for (let i = 0; i < remainingAp; i++) {
        totalDmg += rollDice(weapon.aowDice, weapon.aowSides) + bonus;
    }

    p.currentAp = 0;
    e.currentHp = Math.max(0, e.currentHp - totalDmg);

    log(`<strong>Ash of War: ${weapon.aowName}</strong> (${remainingAp} AP) dealt <span class="damage-text">${totalDmg} damage</span>!`);

    if (!checkEnemyDefeated()) {
        enemyTurn();
        p.currentAp = p.maxAp;
    }

    saveGame();
    renderUI();
}

function castSpell(spellIdx) {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    const spell = SPELLS_DATABASE[spellIdx];

    if (p.currentAp < spell.ap) {
        log(`Not enough AP for ${spell.name}! Requires ${spell.ap} AP.`, "system-msg");
        return;
    }

    const bonus = calculateSpellBonus(spell, p.stats);
    const damage = rollDice(spell.diceNum, spell.diceSides) + bonus;

    p.currentAp -= spell.ap;
    e.currentHp = Math.max(0, e.currentHp - damage);

    log(`Casted <strong class="magic-msg">${spell.name}</strong> dealing <span class="damage-text">${damage} magic damage</span>!`);

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        enemyTurn();
        p.currentAp = p.maxAp;
    }

    saveGame();
    renderUI();
}

function passTurn() {
    if (gameState.droppedItem) return;
    log("Turn ended.", "system-msg");
    enemyTurn();
    gameState.player.currentAp = gameState.player.maxAp;
    saveGame();
    renderUI();
}

// --- RENDER ENGINE ---

function renderUI() {
    const statsElem = document.getElementById("stats-display");
    const actionsElem = document.getElementById("actions-panel");
    const dropElem = document.getElementById("drop-container");
    const levelPanel = document.getElementById("level-up-panel");
    const statButtons = document.getElementById("stat-buttons");

    const mainDisplay = document.getElementById("main-hand-display");
    const offDisplay = document.getElementById("off-hand-display");

    actionsElem.innerHTML = "";

    // 1. Class Selection Screen
    if (!gameState.player) {
        statsElem.innerHTML = `<div class="stat-item">Select starting Elden Ring class:</div>`;
        Object.keys(CLASSES).forEach(key => {
            const c = CLASSES[key];
            actionsElem.innerHTML += `<button class="btn" onclick="selectClass('${key}')">${c.name} (Lvl ${c.level})</button>`;
        });
        return;
    }

    const p = gameState.player;
    const e = gameState.enemy;

    // 2. Equipment Slots UI
    mainDisplay.textContent = p.mainHand ? p.mainHand.name : "None";
    offDisplay.textContent = p.offHand ? p.offHand.name : "None";

    // 3. Loot Box Panel
    if (gameState.droppedItem) {
        const item = gameState.droppedItem;
        const tempBonus = calculateWeaponBonus(item, p.stats);
        dropElem.innerHTML = `
            <div class="item-card">
                <div class="item-name">${item.name}</div>
                <div class="item-stats">
                    ${item.isCatalyst ? 'Type: Magic Catalyst' : 'Base: ' + item.diceNum + 'd' + item.diceSides + '+' + tempBonus}<br>
                    Scales: ${item.stat1.toUpperCase()} (${item.tier1})
                </div>
                <button class="btn btn-success" onclick="equipDroppedItem('main')">Equip Main-Hand</button>
                <button class="btn btn-success" onclick="equipDroppedItem('off')">Equip Off-Hand</button>
                <button class="btn btn-danger" style="margin-left:0;" onclick="discardDroppedItem()">Discard Item</button>
            </div>
        `;
    } else {
        dropElem.innerHTML = `<p class="empty-msg">No item dropped. Defeat monsters to find gear.</p>`;
    }

    // 4. Level-Up Panel
    if (gameState.pendingStatPoint) {
        levelPanel.classList.remove("hidden");
        statButtons.innerHTML = "";
        ['vig', 'mnd', 'end', 'str', 'dex', 'int', 'fai', 'arc'].forEach(s => {
            statButtons.innerHTML += `<button class="btn" onclick="allocateStat('${s}')">+1 ${s.toUpperCase()} (${p.stats[s]})</button>`;
        });
    } else {
        levelPanel.classList.add("hidden");
    }

    // 5. Header Stats Bar
    statsElem.innerHTML = `
        <div class="stat-item">Class: <span class="stat-value">${p.className}</span></div>
        <div class="stat-item">Lvl: <span class="stat-value">${p.level}</span></div>
        <div class="stat-item">XP: <span class="stat-value">${p.xp}/${p.maxXp}</span></div>
        <div class="stat-item">HP: <span class="stat-value stat-hp">${p.currentHp}/${p.maxHp}</span></div>
        <div class="stat-item">AP: <span class="stat-value">${p.currentAp}/${p.maxAp}</span></div>
        <div class="stat-item">INT: <span class="stat-value">${p.stats.int}</span> FAI: <span class="stat-value">${p.stats.fai}</span> STR: <span class="stat-value">${p.stats.str}</span> DEX: <span class="stat-value">${p.stats.dex}</span></div>
        <div class="stat-item">Target: <span class="${e && e.isBoss ? 'boss-text' : 'damage-text'}">${e ? e.name : 'None'} (${e ? e.currentHp : 0}/${e ? e.maxHp : 0} HP)</span></div>
    `;

    // 6. Action Buttons (*d*+* for *AP) — Disabled if Loot Choice is active
    const isFrozen = gameState.droppedItem !== null;

    if (p.currentHp > 0) {
        // Main-Hand Action
        if (p.mainHand) {
            const b1 = calculateWeaponBonus(p.mainHand, p.stats);
            const label1 = formatDiceLabel(p.mainHand.name, p.mainHand.diceNum, p.mainHand.diceSides, b1, p.mainHand.ap);
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeSingleAttack('main')">${label1}</button>`;

            const aowLabel1 = formatDiceLabel(`AoW: ${p.mainHand.aowName}`, p.mainHand.aowDice, p.mainHand.aowSides, b1, "All");
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeAshOfWar('main')">${aowLabel1}</button>`;
        }

        // Off-Hand Action
        if (p.offHand) {
            const b2 = calculateWeaponBonus(p.offHand, p.stats);
            const label2 = formatDiceLabel(`Off: ${p.offHand.name}`, p.offHand.diceNum, p.offHand.diceSides, b2, p.offHand.ap);
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeSingleAttack('off')">${label2}</button>`;
        }

        // Dual Attack Option
        if (p.mainHand && p.offHand && !p.mainHand.isCatalyst && !p.offHand.isCatalyst) {
            const b1 = calculateWeaponBonus(p.mainHand, p.stats);
            const b2 = calculateWeaponBonus(p.offHand, p.stats);
            const dualCost = p.mainHand.ap + 1;
            const dualDice = p.mainHand.diceNum + p.offHand.diceNum;
            const dualLabel = formatDiceLabel("Dual Strike", dualDice, p.mainHand.diceSides, b1 + b2, dualCost);
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeDualAttack()">${dualLabel}</button>`;
        }

        // Render Eligible Spells if wielding Catalyst
        const hasCatalyst = (p.mainHand && p.mainHand.isCatalyst) || (p.offHand && p.offHand.isCatalyst);
        if (hasCatalyst) {
            SPELLS_DATABASE.forEach((spell, idx) => {
                if (p.stats[spell.reqStat] >= spell.minStat) {
                    const b = calculateSpellBonus(spell, p.stats);
                    const spellLabel = formatDiceLabel(spell.name, spell.diceNum, spell.diceSides, b, spell.ap);
                    actionsElem.innerHTML += `<button class="btn btn-magic" ${isFrozen ? 'disabled' : ''} onclick="castSpell(${idx})">${spellLabel}</button>`;
                }
            });
        }

        actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="passTurn()">End Turn</button>`;
    }

    actionsElem.innerHTML += `<button class="btn btn-danger" onclick="resetGame()">Reset Save</button>`;
}

// --- ENTRY POINT ---
window.addEventListener("DOMContentLoaded", () => {
    loadGame();
    renderUI();
});