/**
 * Elden Ring Text Dungeon Crawler Engine
 */

const SCALING_TIERS = { E: 0.10, D: 0.25, C: 0.50, B: 0.75, A: 1.00, S: 1.40 };
const COLOSSAL_WEAPON_IDS = new Set([27, 28, 33, 34]);
const HEAVY_WEAPON_IDS = new Set([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 46, 47, 48]);

// --- 6 BASE CLASSES ---
const CLASSES = {
    vagabond:  { name: "Outcast",  level: 9,  vig: 15, end: 11, str: 14, dex: 13, int: 9,  fai: 9,  weaponId: 11 },
    bandit:    { name: "Bandit",    level: 5,  vig: 10, end: 10, str: 9,  dex: 19, int: 9,  fai: 8,  weaponId: 0 },
    astrologer:{ name: "Stargazer",level: 6,  vig: 9,  end: 9,  str: 8,  dex: 12, int: 16, fai: 7,  weaponId: 50 },
    prophet:   { name: "Bishhop",   level: 7,  vig: 10, end: 8,  str: 11, dex: 10, int: 7,  fai: 16, weaponId: 51 },
    samurai:   { name: "Ronin",   level: 9,  vig: 13, end: 14, str: 10, dex: 15, int: 9,  fai: 8,  weaponId: 8 },
    wretch:    { name: "Deserted",    level: 1,  vig: 10, end: 10, str: 10, dex: 10, int: 10, fai: 10, weaponId: 1 }
};

// --- WEAPONS DATABASE ---
const WEAPONS_DATABASE = [
    { id: 0, name: "Cutlass", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "B", stat2: "dex", tier2: "D", aowName: "Blood Slash", aowDice: 1, aowSides: 8 },
    { id: 1, name: "Shortsword", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "D", stat2: "dex", tier2: "D", aowName: "Impaling Thrust", aowDice: 1, aowSides: 8 },
    { id: 2, name: "Main Gauche", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Parry Strike", aowDice: 1, aowSides: 6 },
    { id: 3, name: "Misericorde", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Backhanded Thrust", aowDice: 1, aowSides: 10 },
    { id: 4, name: "Short Katana", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Blade Rush", aowDice: 1, aowSides: 8 },
    { id: 5, name: "Five Fingerd Dagger", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "S", tier2: null, aowName: "Beastial Slice", aowDice: 1, aowSides: 8 },
    { id: 6, name: "Scorpion’s Stinger", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "B", stat2: "dex", tier2: "C", aowName: "Toxic Sting", aowDice: 1, aowSides: 6 },
    { id: 7, name: "Outlander Sickle", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "C", tier2: null, aowName: "Harvest Flail", aowDice: 1, aowSides: 8 },
    { id: 8, name: "Forgotten Katana", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Unsheathe", aowDice: 2, aowSides: 6 },
    { id: 9, name: "Odachi", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "A", stat2: "str", tier2: "E", aowName: "Piercing Fang", aowDice: 1, aowSides: 12 },
    { id: 10, name: "Broadsword", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Square Off", aowDice: 1, aowSides: 10 },
    { id: 11, name: "Longsword", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Impaling Thrust", aowDice: 1, aowSides: 8 },
    { id: 12, name: "Serpentine Blade", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "A", stat2: "dex", tier2: "D", aowName: "Venomous Flurry", aowDice: 1, aowSides: 8 },
    { id: 13, name: "Dragon Scale Blade", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Ice Lightning Sword", aowDice: 2, aowSides: 6 },
    { id: 14, name: "Stone Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "C", tier2: null, aowName: "Hidden Thrust", aowDice: 1, aowSides: 8 },
    { id: 15, name: "Warhawk’s Talon", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Talon Flurry", aowDice: 1, aowSides: 10 },
    { id: 16, name: "Weathered Straight Sword", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "D", stat2: "dex", tier2: "D", aowName: "Wild Slash", aowDice: 1, aowSides: 8 },
    { id: 17, name: "Holy Knight’s Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "fai", tier2: "C", aowName: "Sacred Blade", aowDice: 1, aowSides: 10 },
    { id: 18, name: "Scimitar", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Spinning Slash", aowDice: 1, aowSides: 8 },
    { id: 19, name: "Falchion", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Vacuum Slice", aowDice: 1, aowSides: 10 },
    { id: 20, name: "Grossmesser", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", tier2: null, aowName: "Spinning Slash", aowDice: 1, aowSides: 8 },
    { id: 23, name: "Estoc", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Shield Crash", aowDice: 1, aowSides: 8 },
    { id: 24, name: "Cleanrot Knight’s Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "fai", tier2: "D", aowName: "Sacred Phalanx", aowDice: 1, aowSides: 10 },
    { id: 25, name: "Great Epee", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Giant Hunt", aowDice: 1, aowSides: 12 },
    { id: 26, name: "Claymore", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Lion’s Claw", aowDice: 1, aowSides: 12 },
    { id: 27, name: "Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Stamp (Upward Cut)", aowDice: 2, aowSides: 10 },
    { id: 28, name: "Zweihänder", diceNum: 3, diceSides: 6, ap: 2, stat1: "str", tier1: "A", stat2: "dex", tier2: "D", aowName: "Waves of Darkness", aowDice: 1, aowSides: 12 },
    { id: 29, name: "Flamberge", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Bloody Slash", aowDice: 1, aowSides: 10 },
    { id: 30, name: "Knight’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Spinning Slash", aowDice: 1, aowSides: 10 },
    { id: 31, name: "Exiled Knight’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Impaling Thrust", aowDice: 1, aowSides: 12 },
    { id: 32, name: "Lordsworn’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Upward Slash", aowDice: 1, aowSides: 10 },
    { id: 33, name: "Troll’s Collosal Sword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "A", tier2: null, aowName: "Troll’s Roar", aowDice: 2, aowSides: 8 },
    { id: 34, name: "Royal Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "B", stat2: "int", tier2: "C", aowName: "Wolf’s Assault", aowDice: 2, aowSides: 10 },
    { id: 35, name: "Crescent Axe", diceNum: 1, diceSides: 12, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "C", aowName: "War Cry", aowDice: 2, aowSides: 6 },
    { id: 36, name: "Battle Axe", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Wild Strikes", aowDice: 1, aowSides: 8 },
    { id: 37, name: "Highland Axe", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Barbaric Roar", aowDice: 1, aowSides: 10 },
    { id: 38, name: "Executioner’s Greataxe", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Heavy Chop", aowDice: 2, aowSides: 10 },
    { id: 39, name: "Warhammer", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Ground Slam", aowDice: 1, aowSides: 12 },
    { id: 40, name: "Mace", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Endure Strike", aowDice: 1, aowSides: 8 },
    { id: 41, name: "Morning Star", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Heavy Spike", aowDice: 1, aowSides: 10 },
    { id: 42, name: "Flail", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Spinning Chain", aowDice: 1, aowSides: 8 },
    { id: 43, name: "Naginata", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Repeating Thrust", aowDice: 1, aowSides: 6 },
    { id: 44, name: "Pike", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Charge", aowDice: 1, aowSides: 10 },
    { id: 45, name: "Partisan", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Spectral Lance", aowDice: 1, aowSides: 8 },
    { id: 46, name: "Riders Glaive", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Phantom Slash", aowDice: 2, aowSides: 8 },
    { id: 47, name: "Lucerne", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "C", aowName: "Giant Hunt", aowDice: 1, aowSides: 12 },
    { id: 48, name: "Great Halberd", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Vacuum Slice", aowDice: 2, aowSides: 6 },
    { id: 49, name: "Recusants Saw", diceNum: 1, diceSides: 12, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Serrated Slash", aowDice: 1, aowSides: 10 },
    { id: 50, name: "Scorcerers Staff", isCatalyst: true, type: "sorcery" },
    { id: 51, name: "Holy Seal", isCatalyst: true, type: "incantation" }
];

const TALISMAN_DATABASE = [
    { id: "stargazer-heirloom", kind: "talisman", rarity: "regular", name: "Night Sky's Heirloom", stat: "int", amount: 5, description: "Raises Intelligence by 5." },
    { id: "starscourge-heirloom", kind: "talisman", rarity: "regular", name: "Mighty DemiGods Heirloom", stat: "str", amount: 5, description: "Raises Strength by 5." },
    { id: "two-fingers-heirloom", kind: "talisman", rarity: "regular", name: "Holy Figure Heirloom", stat: "fai", amount: 5, description: "Raises Faith by 5." },
    { id: "prosthesis-wearer-heirloom", kind: "talisman", rarity: "regular", name: "Tricksters Heirloom", stat: "dex", amount: 5, description: "Raises Dexterity by 5." },
    { id: "shard-of-alexander", kind: "talisman", rarity: "legendary", name: "Shard of the Hero", effect: "aowDamage", percentage: 15, description: "Ashes of War deal 15% more damage after their damage roll." },
    { id: "great-jars-arsenal", kind: "talisman", rarity: "epic", name: "Veterans's Arsenal", effect: "colossalDamage", percentage: 15, description: "Colossal weapon damage is increased by 15% after Strength scaling." },
    { id: "godskin-swaddling-cloth", kind: "talisman", rarity: "regular", name: "Cloth of the Godkillers", effect: "consecutiveAttackHeal", amount: 2, description: "Consecutive basic attacks after the first heal 2 HP. Other actions reset the sequence." },
    { id: "blue-dancer-talisman", kind: "talisman", rarity: "regular", name: "Nimble Fairy Talisman", effect: "singleWeaponDamage", percentage: 20, description: "Basic attacks and Ashes of War deal 20% more damage while the off-hand is empty and a non-Colossal weapon is equipped in the main hand." },
    { id: "ritual-sword-talisman", kind: "talisman", rarity: "epic", name: "Rejuvenated Talisman", effect: "fullHealthDamage", percentage: 10, description: "All attacks deal 10% more damage while at full HP." },
    { id: "winged-sword-insignia", kind: "talisman", rarity: "epic", name: "Swift Waters Insignia", effect: "successiveWeaponDamage", percentagePerHit: 5, maxPercentage: 15, description: "Successive weapon hits gain 5% damage each, up to 15%. Non-weapon actions, ending your turn, or taking damage reset the streak." },
    { id: "rotten-winged-sword-insignia", kind: "talisman", rarity: "legendary", name: "Uncelterd Swift Waters Insignia", effect: "successiveWeaponDamage", percentagePerHit: 8, maxPercentage: 24, description: "Successive weapon hits gain 8% damage each, up to 24%. Non-weapon actions, ending your turn, or taking damage reset the streak." },
    { id: "moon-of-nokstella", kind: "talisman", rarity: "legendary", name: "Moon of hidden City", effect: "spellSlots", amount: 2, description: "Magic classes can carry two additional spells." },
    { id: "pearlshield-talisman", kind: "talisman", rarity: "epic", name: "Pearlshield Talisman", effect: "blockDamageReduction", reduction: 0.75, description: "Raises two-handed block damage reduction from 50% to 75%." },
    { id: "viridian-amber-medallion-1", kind: "talisman", rarity: "regular", name: "Medallion of the Champion +1", effect: "apBonus", amount: 1, description: "Raises maximum AP by 1." },
    { id: "viridian-amber-medallion-2", kind: "talisman", rarity: "regular", name: "Medallion of the Champion +2", effect: "apBonus", amount: 2, description: "Raises maximum AP by 2." },
    { id: "viridian-amber-medallion-3", kind: "talisman", rarity: "legendary", name: "Medallion of the Champion +3", effect: "apBonus", amount: 3, description: "Raises maximum AP by 3." }
];

// --- 30 SPELLS ---
const SPELLS_DATABASE = [
    { name: "Shard of the Sky", type: "sorcery", reqStat: "int", minStat: 10, ap: 1, diceNum: 1, diceSides: 8, tier: "B" },
    { name: "Swift Shard of the Sky", type: "sorcery", reqStat: "int", minStat: 12, ap: 1, diceNum: 1, diceSides: 6, tier: "A" },
    { name: "Cometshard of the Sky", type: "sorcery", reqStat: "int", minStat: 18, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Comet", type: "sorcery", reqStat: "int", minStat: 24, ap: 2, diceNum: 3, diceSides: 8, tier: "S" },
    { name: "Star Shower", type: "sorcery", reqStat: "int", minStat: 20, ap: 2, diceNum: 2, diceSides: 10, tier: "B" },
    { name: "Rock Throw", type: "sorcery", reqStat: "int", minStat: 16, ap: 2, diceNum: 3, diceSides: 6, tier: "A" },
    { name: "Sky Slicer", type: "sorcery", reqStat: "int", minStat: 14, ap: 1, diceNum: 2, diceSides: 6, tier: "S" },
    { name: "Skys Greatsword", type: "sorcery", reqStat: "int", minStat: 22, ap: 2, diceNum: 2, diceSides: 10, tier: "A" },
    { name: "Cannon of the Moon", type: "sorcery", reqStat: "int", minStat: 25, ap: 3, diceNum: 4, diceSides: 8, tier: "S" },
    { name: "Imploding Stars", type: "sorcery", reqStat: "int", minStat: 28, ap: 2, diceNum: 3, diceSides: 8, tier: "A" },
    { name: "Comet of the Dark Sky", type: "sorcery", reqStat: "int", minStat: 26, ap: 2, diceNum: 3, diceSides: 8, tier: "S" },
    { name: "Sphere of Lava", type: "sorcery", reqStat: "int", minStat: 19, ap: 2, diceNum: 2, diceSides: 8, tier: "B" },
    { name: "Ice Witch's Dark Moon", type: "sorcery", reqStat: "int", minStat: 35, ap: 3, diceNum: 5, diceSides: 8, tier: "S" },
    { name: "Ray of the Moon", type: "sorcery", reqStat: "int", minStat: 40, ap: 4, diceNum: 6, diceSides: 10, tier: "S" },
    { name: "Stars of Desolation", type: "sorcery", reqStat: "int", minStat: 32, ap: 3, diceNum: 4, diceSides: 8, tier: "A" },
    { name: "Catch Fire", type: "incantation", reqStat: "fai", minStat: 10, ap: 1, diceNum: 1, diceSides: 8, tier: "A" },
    { name: "Fire Ball", type: "incantation", reqStat: "fai", minStat: 12, ap: 1, diceNum: 1, diceSides: 10, tier: "B" },
    { name: "Lightning Toss", type: "incantation", reqStat: "fai", minStat: 17, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Honed Lightning", type: "incantation", reqStat: "fai", minStat: 21, ap: 2, diceNum: 2, diceSides: 10, tier: "A" },
    { name: "Godkillers Flame", type: "incantation", reqStat: "fai", minStat: 20, ap: 2, diceNum: 3, diceSides: 6, tier: "S" },
    { name: "Scouring Godkillers Flame", type: "incantation", reqStat: "fai", minStat: 28, ap: 3, diceNum: 4, diceSides: 6, tier: "S" },
    { name: "Collalflame Take Thee", type: "incantation", reqStat: "fai", minStat: 30, ap: 3, diceNum: 4, diceSides: 8, tier: "S" },
    { name: "Burst of Allconsuming Fire", type: "incantation", reqStat: "fai", minStat: 22, ap: 2, diceNum: 3, diceSides: 8, tier: "A" },
    { name: "Unendurable Allconsuming Fire", type: "incantation", reqStat: "fai", minStat: 31, ap: 3, diceNum: 5, diceSides: 6, tier: "S" },
    { name: "Dragons' Lightning Toss", type: "incantation", reqStat: "fai", minStat: 32, ap: 3, diceNum: 4, diceSides: 10, tier: "S" },
    { name: "Ballssax's Lightning Toss", type: "incantation", reqStat: "fai", minStat: 35, ap: 3, diceNum: 5, diceSides: 8, tier: "S" },
    { name: "Putrid Dragon's Breath", type: "incantation", reqStat: "fai", minStat: 15, ap: 2, diceNum: 2, diceSides: 8, tier: "S" },
    { name: "Dragons' Ice Breath", type: "incantation", reqStat: "fai", minStat: 16, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Burn, O Flame!", type: "incantation", reqStat: "fai", minStat: 27, ap: 3, diceNum: 3, diceSides: 12, tier: "A" },
    { name: "Wrath of Faith", type: "incantation", reqStat: "fai", minStat: 32, ap: 2, diceNum: 3, diceSides: 10, tier: "A" }
];

// --- 40 MONSTERS WITH BOSSES ---
const MONSTER_TIERS = [
    [
        { name: "Frgotton Noble", hp: 12, dice: 1, sides: 4, bonus: 0, xp: 15 },
        { name: "Grafted Soldier", hp: 18, dice: 1, sides: 6, bonus: 1, xp: 25 },
        { name: "Stray Dog", hp: 14, dice: 1, sides: 6, bonus: 2, xp: 20 },
        { name: "Sub-Human Fiend", hp: 16, dice: 1, sides: 4, bonus: 2, xp: 22 },
        { name: "Sellsword", hp: 28, dice: 1, sides: 8, bonus: 2, xp: 45 },
        { name: "Grafted Knight", hp: 34, dice: 1, sides: 10, bonus: 2, xp: 60 },
        { name: "Giant Land Monstrocity", hp: 42, dice: 1, sides: 8, bonus: 1, xp: 70 },
        { name: "Headless Orc", hp: 48, dice: 2, sides: 6, bonus: 2, xp: 85 },
        { name: "Oathbreaker Knight", hp: 38, dice: 2, sides: 4, bonus: 4, xp: 95 }
    ],
    [
        { name: "Ice Witchs Soldier", hp: 32, dice: 1, sides: 8, bonus: 2, xp: 55 },
        { name: "Starstruck Knight", hp: 55, dice: 1, sides: 10, bonus: 3, xp: 100 },
        { name: "Maddend Knight", hp: 48, dice: 2, sides: 6, bonus: 2, xp: 90 },
        { name: "Pudrid Stray", hp: 30, dice: 2, sides: 4, bonus: 4, xp: 80 },
        { name: "Cleansed Knight", hp: 65, dice: 2, sides: 6, bonus: 3, xp: 140 },
        { name: "Horned Brawler", hp: 75, dice: 2, sides: 8, bonus: 3, xp: 160 },
        { name: "Follower of Desiease", hp: 42, dice: 1, sides: 10, bonus: 4, xp: 110 },
        { name: "Recusant Warrior", hp: 36, dice: 1, sides: 12, bonus: 2, xp: 85 },
        { name: "Firey Knight", hp: 80, dice: 2, sides: 8, bonus: 4, xp: 190 }
    ],
    [
        { name: "Capital Soldier", hp: 58, dice: 1, sides: 10, bonus: 3, xp: 130 },
        { name: "Capital Knight", hp: 100, dice: 2, sides: 8, bonus: 4, xp: 240 },
        { name: "Wormface", hp: 85, dice: 2, sides: 6, bonus: 5, xp: 210 },
        { name: "Assassin", hp: 70, dice: 3, sides: 4, bonus: 6, xp: 280 },
        { name: "Stone Warrior", hp: 130, dice: 2, sides: 10, bonus: 4, xp: 320 },
        { name: "Heavy Knight", hp: 150, dice: 2, sides: 8, bonus: 6, xp: 380 },
        { name: "Bloodthirsty Noble", hp: 90, dice: 2, sides: 6, bonus: 6, xp: 260 },
        { name: "Iron Maiden", hp: 140, dice: 3, sides: 6, bonus: 3, xp: 330 },
        { name: "Dargonborn Sentinel", hp: 180, dice: 2, sides: 10, bonus: 6, xp: 450 }
    ],
    [
        { name: "Fire Monk", hp: 110, dice: 2, sides: 8, bonus: 4, xp: 300 },
        { name: "Harbinger of Flame", hp: 210, dice: 3, sides: 8, bonus: 5, xp: 520 },
        { name: "Banished Knight (Crumbling Lands)", hp: 160, dice: 2, sides: 10, bonus: 5, xp: 480 },
        { name: "Beastman of Crumbling Lands", hp: 125, dice: 3, sides: 6, bonus: 4, xp: 400 },
        { name: "Skeletal Swordsman", hp: 95, dice: 2, sides: 6, bonus: 5, xp: 320 },
        { name: "Night's Rider", hp: 175, dice: 2, sides: 10, bonus: 6, xp: 550 },
        { name: "Godkiller Apostle", hp: 190, dice: 3, sides: 6, bonus: 7, xp: 650 },
        { name: "Godkiller Noble", hp: 220, dice: 2, sides: 12, bonus: 6, xp: 700 },
        { name: "Sentinel Commander", hp: 260, dice: 3, sides: 8, bonus: 8, xp: 900 }
    ]
];

const BOSSES = [
    { name: "Git the Good", hp: 110, dice: 2, sides: 8, bonus: 4, xp: 350 },
    { name: "Grafted Lord", hp: 240, dice: 3, sides: 6, bonus: 5, xp: 800 },
    { name: "The Mighyest Demigod", hp: 420, dice: 3, sides: 8, bonus: 6, xp: 1800 },
    { name: "The Swordswoman of the Putrid God", hp: 650, dice: 4, sides: 8, bonus: 8, xp: 4000 }
];

let gameState = {
    player: null,
    enemy: null,
    droppedItem: null,
    killCount: 0,
    pendingStatPoints: 0
};

let tutorialState = null;
let enemyTurnPending = false;
let enemyTurnTimer = null;

// --- FORMULAS ---
function calculateMaxHp(vig) { return vig * 5; }
function calculateMaxAp(end, player = null) {
    const talismanAp = player ? getEquippedTalismans(player)
        .filter(talisman => talisman.effect === "apBonus")
        .reduce((total, talisman) => total + talisman.amount, 0) : 0;
    return 4 + Math.floor((end - 10) / 2) + talismanAp;
}
function calculateScaledHp(baseHp, level) { return Math.ceil(baseHp * (1 + (level - 1) * 0.25)); }

function isColossalWeapon(weapon) {
    return Boolean(weapon && COLOSSAL_WEAPON_IDS.has(weapon.id));
}

function isHeavyWeapon(weapon) {
    return Boolean(weapon && HEAVY_WEAPON_IDS.has(weapon.id));
}

function isDualWieldableWeapon(weapon) {
    return Boolean(weapon && !weapon.isCatalyst && !isHeavyWeapon(weapon) && !isColossalWeapon(weapon));
}

function getEquippedTalismans(player) {
    return (Array.isArray(player.talismans) ? player.talismans : [])
        .map(id => TALISMAN_DATABASE.find(talisman => talisman.id === id))
        .filter(Boolean);
}

function hasTalisman(player, talismanId) {
    return getEquippedTalismans(player).some(talisman => talisman.id === talismanId);
}

function talismanNameMarkup(talisman) {
    if (talisman.rarity === "legendary") return `<span class="shard-text">${talisman.name}</span>`;
    if (talisman.rarity === "epic") return `<span class="epic-text">${talisman.name}</span>`;
    return talisman.id === "shard-of-alexander"
        ? `<span class="shard-text">${talisman.name}</span>`
        : talisman.name;
}

function getMaxKnownSpells(player) {
    return 4 + getEquippedTalismans(player)
        .filter(talisman => talisman.effect === "spellSlots")
        .reduce((total, talisman) => total + talisman.amount, 0);
}

function getSuccessiveWeaponDamageBonus(player, hitOffset = 0) {
    const precedingHits = Math.max(0, (player.weaponAttackStreak || 0) + hitOffset);
    return getEquippedTalismans(player)
        .filter(talisman => talisman.effect === "successiveWeaponDamage")
        .reduce((total, talisman) => total + Math.min(talisman.maxPercentage, precedingHits * talisman.percentagePerHit), 0);
}

function getFullHealthDamageBonus(player) {
    return player.currentHp >= player.maxHp && hasTalisman(player, "ritual-sword-talisman") ? 10 : 0;
}

function getTalismanStatBonus(player, stat) {
    return getEquippedTalismans(player)
        .filter(talisman => talisman.stat === stat)
        .reduce((total, talisman) => total + talisman.amount, 0);
}

function getEffectiveStats(player) {
    return Object.fromEntries(Object.entries(player.stats).map(([stat, value]) => [
        stat,
        value + getTalismanStatBonus(player, stat)
    ]));
}

function getStartingSpells(magicType, stats, limit = 4) {
    return SPELLS_DATABASE
        .filter(spell => spell.type === magicType && stats[spell.reqStat] >= spell.minStat)
        .slice(0, limit)
        .map(spell => spell.name);
}

function getAvailableSpellDrops(player) {
    if (!player.magicType) return [];
    const stats = getEffectiveStats(player);
    const knownSpells = Array.isArray(player.knownSpells) ? player.knownSpells : [];
    return SPELLS_DATABASE.filter(spell =>
        spell.type === player.magicType &&
        stats[spell.reqStat] >= spell.minStat &&
        !knownSpells.includes(spell.name)
    );
}

function createSpellLootItem(spell) {
    const statLabel = spell.reqStat.toUpperCase();
    return {
        kind: "spell",
        id: spell.name,
        name: spell.name,
        description: `${spell.type === "sorcery" ? "Sorcery" : "Incantation"}; requires ${statLabel} ${spell.minStat}; ${spell.diceNum}d${spell.diceSides}, ${spell.ap} AP.`
    };
}

function getWeaponTalismanDamageBonus(player, weapon, isAshOfWar, hitOffset = 0) {
    let percentage = getFullHealthDamageBonus(player) + getSuccessiveWeaponDamageBonus(player, hitOffset);
    if (isAshOfWar && hasTalisman(player, "shard-of-alexander")) percentage += 15;
    if (isColossalWeapon(weapon) && hasTalisman(player, "great-jars-arsenal")) percentage += 15;
    if (weapon === player.mainHand && !player.offHand && !isColossalWeapon(weapon) && hasTalisman(player, "blue-dancer-talisman")) percentage += 20;
    return percentage;
}

function applyWeaponTalismanDamage(player, weapon, damage, isAshOfWar = false, hitOffset = 0) {
    const percentage = getWeaponTalismanDamageBonus(player, weapon, isAshOfWar, hitOffset);
    const bonusDamage = Math.floor(damage * percentage / 100);
    return { damage: damage + bonusDamage, bonusDamage, percentage };
}

function applySpellTalismanDamage(player, damage) {
    const percentage = getFullHealthDamageBonus(player);
    const bonusDamage = Math.floor(damage * percentage / 100);
    return { damage: damage + bonusDamage, bonusDamage, percentage };
}

function applyConsecutiveAttackHealing(player) {
    player.basicAttackStreak = (player.basicAttackStreak || 0) + 1;
    if (player.basicAttackStreak < 2 || !hasTalisman(player, "godskin-swaddling-cloth")) return 0;

    const healed = Math.min(2, player.maxHp - player.currentHp);
    player.currentHp += healed;
    return healed;
}

function getWeaponPrimaryStat(weapon) {
    if (isHeavyWeapon(weapon) || isColossalWeapon(weapon)) return "str";
    return weapon.stat1 === "arc" ? "dex" : weapon.stat1;
}

function calculateWeaponBonus(weapon, stats) {
    if (!weapon) return 0;
    let bonus = 0;
    const primaryStat = getWeaponPrimaryStat(weapon);
    if (primaryStat && weapon.tier1) bonus += (stats[primaryStat] || 0) * SCALING_TIERS[weapon.tier1];
    const secondaryStat = weapon.stat2 === "arc" ? "dex" : weapon.stat2;
    if (secondaryStat && secondaryStat !== primaryStat && weapon.tier2) bonus += (stats[secondaryStat] || 0) * SCALING_TIERS[weapon.tier2];
    return Math.floor(bonus);
}

function getAshOfWarProfile(weapon, stats) {
    const weaponBonus = calculateWeaponBonus(weapon, stats);
    const diceTier = Math.floor((weapon.diceNum * weapon.diceSides + weaponBonus) * 1.5);
    const bonus = Math.floor(weaponBonus / 2);
    let diceNum = 3;
    let diceSides = 4;

    if (diceTier > 12 && diceTier <= 18) diceSides = 6;
    else if (diceTier > 18 && diceTier <= 24) diceSides = 8;
    else if (diceTier > 24 && diceTier <= 36) {
        diceNum = 4;
        diceSides = 10;
    } else if (diceTier > 36) {
        diceNum = 5;
        diceSides = 12;
    }

    const maxDamage = diceNum * diceSides + bonus;
    return { diceNum, diceSides, bonus, maxDamage, apCost: weapon.ap };
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
            gameState = { ...gameState, ...JSON.parse(saved) };
            migratePlayerState();
            saveGame();
            log("Saved game loaded.", "system-msg");
            return true;
        } catch (e) {}
    }
    return false;
}

function migratePlayerState() {
    const savedPendingStatPoints = Number.isInteger(gameState.pendingStatPoints)
        ? Math.max(0, gameState.pendingStatPoints)
        : 0;
    gameState.pendingStatPoints = Math.max(savedPendingStatPoints, gameState.pendingStatPoint ? 1 : 0);
    delete gameState.pendingStatPoint;

    const p = gameState.player;
    if (!p) return;

    p.stats = p.stats || {};
    delete p.stats.arc;
    delete p.stats.mnd;
    const savedTalismans = Array.isArray(p.talismans) ? p.talismans : [];
    p.talismans = [0, 1].map(index => {
        const talismanId = typeof savedTalismans[index] === "string" ? savedTalismans[index] : savedTalismans[index]?.id;
        return TALISMAN_DATABASE.some(talisman => talisman.id === talismanId) ? talismanId : null;
    });
    if (p.talismans[0] && p.talismans[0] === p.talismans[1]) p.talismans[1] = null;
    p.basicAttackStreak = Number.isInteger(p.basicAttackStreak) ? Math.max(0, p.basicAttackStreak) : 0;
    p.weaponAttackStreak = Number.isInteger(p.weaponAttackStreak) ? Math.max(0, p.weaponAttackStreak) : 0;
    p.mainHand = p.mainHand && WEAPONS_DATABASE.find(weapon => weapon.id === p.mainHand.id) || p.mainHand;
    p.offHand = p.offHand && WEAPONS_DATABASE.find(weapon => weapon.id === p.offHand.id) || p.offHand;
    const startingClass = Object.values(CLASSES).find(classData => classData.name === p.className);
    const startingWeapon = startingClass && WEAPONS_DATABASE.find(weapon => weapon.id === startingClass.weaponId);
    p.magicType = p.magicType || (startingWeapon && startingWeapon.isCatalyst ? startingWeapon.type : null);
    if (p.magicType !== "sorcery" && p.magicType !== "incantation") p.magicType = null;
    if (p.magicType) {
        const effectiveStats = getEffectiveStats(p);
        const eligibleSpellNames = new Set(SPELLS_DATABASE
            .filter(spell => spell.type === p.magicType && effectiveStats[spell.reqStat] >= spell.minStat)
            .map(spell => spell.name));
        p.knownSpells = Array.isArray(p.knownSpells)
            ? [...new Set(p.knownSpells.filter(name => eligibleSpellNames.has(name)))].slice(0, getMaxKnownSpells(p))
            : [];
        if (p.knownSpells.length === 0) p.knownSpells = getStartingSpells(p.magicType, effectiveStats, getMaxKnownSpells(p));
    } else {
        p.knownSpells = [];
    }
    if (gameState.droppedItem && gameState.droppedItem.kind === "talisman") {
        gameState.droppedItem = TALISMAN_DATABASE.find(talisman => talisman.id === gameState.droppedItem.id) || null;
    } else if (gameState.droppedItem && gameState.droppedItem.kind === "spell") {
        const spell = SPELLS_DATABASE.find(entry => entry.name === gameState.droppedItem.id);
        gameState.droppedItem = spell ? createSpellLootItem(spell) : null;
    } else {
        gameState.droppedItem = gameState.droppedItem && WEAPONS_DATABASE.find(weapon => weapon.id === gameState.droppedItem.id) || gameState.droppedItem;
    }

    const oldMaxHp = Number.isFinite(p.maxHp) ? p.maxHp : 10 + (p.stats.vig * 5);
    p.maxHp = calculateMaxHp(p.stats.vig || 0);
    p.currentHp = Math.min(p.maxHp, (p.currentHp || 0) + Math.max(0, p.maxHp - oldMaxHp));
    const oldMaxAp = Number.isFinite(p.maxAp) ? p.maxAp : calculateMaxAp(p.stats.end || 0);
    p.maxAp = calculateMaxAp(p.stats.end || 0, p);
    p.currentAp = Math.min(p.maxAp, (p.currentAp || 0) + Math.max(0, p.maxAp - oldMaxAp));
    p.twoHanding = Boolean(p.twoHanding);
    p.isBlocking = false;
    p.aowStreak = Number.isInteger(p.aowStreak) ? Math.max(0, p.aowStreak) : 0;

    if (isColossalWeapon(p.mainHand)) {
        p.offHand = null;
        p.twoHanding = true;
    }
}

function resetGame() {
    clearTimeout(enemyTurnTimer);
    enemyTurnPending = false;
    localStorage.removeItem("er_dungeon_save_v2");
    location.reload();
}

function showDeathScreen() {
    const overlay = document.getElementById("death-overlay");
    if (!overlay) {
        setTimeout(resetGame, 3000);
        return;
    }

    overlay.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => overlay.classList.add("death-overlay--visible"));

    setTimeout(() => {
        const resetAfterFade = event => {
            if (event.target !== overlay || event.propertyName !== "opacity") return;
            overlay.removeEventListener("transitionend", resetAfterFade);
            resetGame();
        };
        overlay.addEventListener("transitionend", resetAfterFade);
        overlay.classList.remove("death-overlay--visible");
        overlay.setAttribute("aria-hidden", "true");
    }, 850);
}

// --- GAME LOGIC ---
function selectClass(classKey) {
    const base = CLASSES[classKey];
    if (!base) return;

    const startingWeapon = WEAPONS_DATABASE.find(weapon => weapon.id === base.weaponId);
    if (!startingWeapon) return;
    gameState.pendingStatPoints = 0;

    gameState.player = {
        className: base.name,
        level: base.level,
        xp: 0,
        maxXp: base.level * 50,
        stats: { vig: base.vig, end: base.end, str: base.str, dex: base.dex, int: base.int, fai: base.fai },
        maxHp: calculateMaxHp(base.vig),
        currentHp: calculateMaxHp(base.vig),
        maxAp: calculateMaxAp(base.end),
        currentAp: calculateMaxAp(base.end),
        mainHand: startingWeapon,
        offHand: null,
        twoHanding: isColossalWeapon(startingWeapon),
        isBlocking: false,
        aowStreak: 0,
        basicAttackStreak: 0,
        weaponAttackStreak: 0,
        talismans: [null, null],
        magicType: startingWeapon.isCatalyst ? startingWeapon.type : null,
        knownSpells: startingWeapon.isCatalyst ? getStartingSpells(startingWeapon.type, base) : []
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
        const scaledHp = calculateScaledHp(template.hp, playerLevel) + 10;

        gameState.enemy = { name: template.name, maxHp: scaledHp, currentHp: scaledHp, dice: template.dice, sides: template.sides, bonus: template.bonus, xp: template.xp, isBoss: true };
        log(`🚨 <strong class="boss-text">BOSS ENCOUNTER: ${gameState.enemy.name}</strong> (${gameState.enemy.currentHp} HP)!`);
        return;
    }

    let tierIdx = 0;
    if (playerLevel >= 11) tierIdx = 1;
    if (playerLevel >= 21) tierIdx = 2;
    if (playerLevel >= 31) tierIdx = 3;

    if (Math.random() < 0.15 && tierIdx < MONSTER_TIERS.length - 1) {
        tierIdx += 1;
        log(`⚠️ <span class="highlight">DANGER! A high-level threat from lower depths approaches!</span>`, "system-msg");
    }

    const tierList = MONSTER_TIERS[tierIdx];
    template = tierList[Math.floor(Math.random() * tierList.length)];
    const scaledHp = calculateScaledHp(template.hp, playerLevel) + 10;

    gameState.enemy = { name: template.name, maxHp: scaledHp, currentHp: scaledHp, dice: template.dice, sides: template.sides, bonus: template.bonus, xp: template.xp + (playerLevel * 2), isBoss: false };
    log(`Encountered <strong class="damage-text">${gameState.enemy.name}</strong> (${gameState.enemy.currentHp} HP)!`);
}

function gainXP(amount) {
    const p = gameState.player;
    p.xp += amount;
    log(`Obtained <span class="highlight">${amount} Runes</span>.`, "system-msg");
    while (p.xp >= p.maxXp) levelUp();
}

function levelUp() {
    const p = gameState.player;
    p.xp -= p.maxXp;
    p.level += 1;
    p.maxXp = p.level * 50;
    gameState.pendingStatPoints += 1;
    log(`🌟 <strong class="highlight">LEVEL UP! Reached Level ${p.level}!</strong> Allocate your stat point below.`, "system-msg");
}

function allocateStat(statKey) {
    if (gameState.pendingStatPoints <= 0 || !["vig", "end", "str", "dex", "int", "fai"].includes(statKey)) return;

    const p = gameState.player;
    p.stats[statKey] += 1;
    gameState.pendingStatPoints -= 1;

    p.maxHp = calculateMaxHp(p.stats.vig);
    p.currentHp = p.maxHp;
    p.maxAp = calculateMaxAp(p.stats.end, p);
    p.currentAp = p.maxAp;

    log(`Increased <span class="highlight">${statKey.toUpperCase()}</span> to ${p.stats[statKey]}. HP & AP restored!`, "system-msg");
    saveGame();
    renderUI();
}

function triggerLootDrop() {
    if (Math.random() < 0.60) {
        const lootPool = [
            ...(gameState.player.magicType ? [] : WEAPONS_DATABASE.map(item => ({ item, weight: 1 }))),
            ...getAvailableSpellDrops(gameState.player).map(spell => ({ item: createSpellLootItem(spell), weight: 1 })),
            ...TALISMAN_DATABASE.map(item => ({
                item,
                weight: { regular: 0.5, epic: 0.25, legendary: 0.125 }[item.rarity] || 0.5
            }))
        ];
        const totalWeight = lootPool.reduce((total, entry) => total + entry.weight, 0);
        let lootRoll = Math.random() * totalWeight;
        const droppedItem = lootPool.find(entry => (lootRoll -= entry.weight) < 0).item;
        gameState.droppedItem = droppedItem;
        const dropType = droppedItem.kind === "talisman" ? "Talisman" : droppedItem.kind === "spell" ? "Spell" : "Item";
        const droppedName = droppedItem.kind === "talisman" ? talismanNameMarkup(droppedItem) : droppedItem.name;
        log(`🎁 ${dropType} Dropped: <strong class="highlight">${droppedName}</strong>! Actions frozen—Choose an option on left.`, "system-msg");
    }
}

function equipDroppedItem(slot) {
    if (!gameState.droppedItem) return;
    const p = gameState.player;
    const item = gameState.droppedItem;

    if (item.kind === "spell") {
        const spell = SPELLS_DATABASE.find(entry => entry.name === item.id);
        if (!spell || spell.type !== p.magicType || p.knownSpells.includes(spell.name)) return;

        let learnedSpell;
        if (slot === "learn" && p.knownSpells.length < getMaxKnownSpells(p)) {
            p.knownSpells.push(spell.name);
            learnedSpell = true;
        } else {
            const spellSlot = Number(slot.replace("spell-", ""));
            if (!slot.startsWith("spell-") || !Number.isInteger(spellSlot) || spellSlot < 0 || spellSlot >= p.knownSpells.length) return;
            const replacedSpell = p.knownSpells[spellSlot];
            p.knownSpells[spellSlot] = spell.name;
            log(`Forgot <strong>${replacedSpell}</strong> and learned <strong class="highlight">${spell.name}</strong>.`, "system-msg");
        }

        gameState.droppedItem = null;
        if (learnedSpell) log(`Learned <strong class="highlight">${spell.name}</strong>.`, "system-msg");
        saveGame();
        renderUI();
        return;
    }

    if (item.kind === "talisman") {
        const talismanSlot = slot === "talisman-1" ? 0 : slot === "talisman-2" ? 1 : -1;
        if (talismanSlot < 0) return;
        if (p.talismans.includes(item.id)) {
            log(`${item.name} is already equipped.`, "system-msg");
            return;
        }

        const previousMaxAp = p.maxAp;
        p.talismans[talismanSlot] = item.id;
        p.basicAttackStreak = 0;
        p.weaponAttackStreak = 0;
        p.maxAp = calculateMaxAp(p.stats.end, p);
        p.currentAp = Math.min(p.maxAp, p.currentAp + Math.max(0, p.maxAp - previousMaxAp));
        if (p.magicType && p.knownSpells.length > getMaxKnownSpells(p)) {
            const forgottenSpells = p.knownSpells.splice(getMaxKnownSpells(p));
            log(`The reduced memory slots force you to forget ${forgottenSpells.join(', ')}.`, "system-msg");
        }
        gameState.droppedItem = null;
        log(`Equipped <strong>${talismanNameMarkup(item)}</strong> in Talisman Slot ${talismanSlot + 1}.`, "system-msg");
        saveGame();
        renderUI();
        return;
    }

    if (slot === 'main') {
        p.mainHand = item;
        p.basicAttackStreak = 0;
        p.weaponAttackStreak = 0;
        if (isColossalWeapon(p.mainHand)) {
            p.offHand = null;
            p.twoHanding = true;
            log("Colossal weapons force two-handing and lock the off-hand slot.", "system-msg");
        }
        log(`Equipped <strong class="highlight">${item.name}</strong> to Main-Hand.`, "system-msg");
    } else if (slot === 'off') {
        if (isColossalWeapon(p.mainHand) || isColossalWeapon(item)) {
            log("Colossal weapons cannot be equipped in the off-hand.", "system-msg");
            return;
        }
        p.offHand = item;
        p.twoHanding = false;
        p.basicAttackStreak = 0;
        p.weaponAttackStreak = 0;
        log(`Equipped <strong class="highlight">${item.name}</strong> to Off-Hand.`, "system-msg");
    }

    gameState.droppedItem = null;
    saveGame();
    renderUI();
}

function discardDroppedItem() {
    if (!gameState.droppedItem) return;
    log(`Discarded ${gameState.droppedItem.name}.`, "system-msg");
    gameState.droppedItem = null;
    saveGame();
    renderUI();
}

function enemyTurn() {
    const e = gameState.enemy;
    const p = gameState.player;
    if (!e || e.currentHp <= 0) return;

    const earlyGameBonus = !e.isBoss && p.level < 11 ? Math.floor(Math.random() * 4) + 3 : 0;
    const rolledDamage = rollDice(e.dice, e.sides) + e.bonus + earlyGameBonus;
    const blockReduction = p.isBlocking
        ? hasTalisman(p, "pearlshield-talisman") ? 0.75 : 0.5
        : 0;
    const damage = blockReduction ? Math.ceil(rolledDamage * (1 - blockReduction)) : rolledDamage;
    p.isBlocking = false;
    p.currentHp = Math.max(0, p.currentHp - damage);
    p.weaponAttackStreak = 0;
    flashBloodScreen();

    log(`The <strong>${e.name}</strong> strikes for <span class="damage-text">${damage} damage</span>!`);

    if (p.currentHp <= 0) {
        log(`☠️ <strong class="damage-text">YOU DIED</strong>`, "system-msg");
        showDeathScreen();
    }
}

function scheduleEnemyTurn() {
    if (enemyTurnPending) return;

    enemyTurnPending = true;
    enemyTurnTimer = setTimeout(() => {
        enemyTurnTimer = null;
        enemyTurn();
        const player = gameState.player;
        if (player && player.currentHp > 0) player.currentAp = player.maxAp;
        enemyTurnPending = false;
        saveGame();
        renderUI();
    }, 500);
}

function flashBloodScreen() {
    document.body.classList.remove("enemy-hit");
    void document.body.offsetWidth;
    document.body.classList.add("enemy-hit");
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

// --- COMBAT ACTIONS ---
function executeSingleAttack(slot) {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    const weapon = slot === 'main' ? p.mainHand : p.offHand;

    if (slot === 'off' && p.twoHanding) return;
    if (!weapon || weapon.isCatalyst) return;

    if (p.currentAp < weapon.ap) {
        log("Not enough AP!", "system-msg");
        return;
    }

    const stats = getEffectiveStats(p);
    const bonus = calculateWeaponBonus(weapon, stats);
    const rolledDamage = rollDice(weapon.diceNum, weapon.diceSides) + bonus;
    const damageResult = applyWeaponTalismanDamage(p, weapon, rolledDamage);
    p.aowStreak = 0;
    p.weaponAttackStreak = (p.weaponAttackStreak || 0) + 1;
    const healed = applyConsecutiveAttackHealing(p);

    p.currentAp -= weapon.ap;
    e.currentHp = Math.max(0, e.currentHp - damageResult.damage);

    log(`Struck with <strong>${weapon.name}</strong> dealing <span class="damage-text">${damageResult.damage} damage</span>${damageResult.bonusDamage ? ` (${rolledDamage} + ${damageResult.bonusDamage} talisman bonus)` : ''}!`, "combat-msg combat-hit");
    if (healed) log(`Godskin Swaddling Cloth restores ${healed} HP.`, "system-msg");

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        scheduleEnemyTurn();
    }

    saveGame();
    renderUI();
}

function executeDualAttack() {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    if (p.twoHanding || !isDualWieldableWeapon(p.mainHand) || !isDualWieldableWeapon(p.offHand)) return;

    const dualAp = p.mainHand.ap + 1;
    if (p.currentAp < dualAp) {
        log(`Not enough AP for Dual Attack! Requires ${dualAp} AP.`, "system-msg");
        return;
    }

    const stats = getEffectiveStats(p);
    const b1 = calculateWeaponBonus(p.mainHand, stats);
    const b2 = calculateWeaponBonus(p.offHand, stats);
    const rolledMainDamage = rollDice(p.mainHand.diceNum, p.mainHand.diceSides) + b1;
    const rolledOffDamage = rollDice(p.offHand.diceNum, p.offHand.diceSides) + b2;
    const dmg1 = applyWeaponTalismanDamage(p, p.mainHand, rolledMainDamage, false, 0).damage;
    const dmg2 = applyWeaponTalismanDamage(p, p.offHand, rolledOffDamage, false, 1).damage;
    const totalDmg = Math.floor(dmg1 + (dmg2 * stats.dex / 100));
    p.aowStreak = 0;
    p.basicAttackStreak = 0;
    p.weaponAttackStreak = (p.weaponAttackStreak || 0) + 2;

    p.currentAp -= dualAp;
    e.currentHp = Math.max(0, e.currentHp - totalDmg);

    log(`<strong>Dual Strike</strong> (${p.mainHand.name} + ${p.offHand.name}; off-hand scaled by DEX ${stats.dex}/100) dealt <span class="damage-text">${totalDmg} damage</span>!`, "combat-msg combat-hit");

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        scheduleEnemyTurn();
    }

    saveGame();
    renderUI();
}

function executeAshOfWar(slot) {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    const weapon = slot === 'main' ? p.mainHand : p.offHand;
    if (!weapon || weapon.isCatalyst || (slot === 'off' && p.twoHanding)) return;

    const stats = getEffectiveStats(p);
    const profile = getAshOfWarProfile(weapon, stats);

    if (p.currentAp < profile.apCost) {
        log("Not enough AP!", "system-msg");
        return;
    }

    const fatigueMultiplier = Math.max(0.25, 1 - (p.aowStreak * 0.25));
    const repeatPenalty = Math.round((1 - fatigueMultiplier) * 100);
    const rolledDamage = rollDice(profile.diceNum, profile.diceSides) + profile.bonus;
    const fatiguedDamage = Math.max(1, Math.floor(rolledDamage * fatigueMultiplier));
    const damageResult = applyWeaponTalismanDamage(p, weapon, fatiguedDamage, true);
    p.aowStreak += 1;
    p.basicAttackStreak = 0;
    p.weaponAttackStreak = (p.weaponAttackStreak || 0) + 1;

    p.currentAp -= profile.apCost;
    e.currentHp = Math.max(0, e.currentHp - damageResult.damage);

    log(`<strong>Ash of War: ${weapon.aowName}</strong> (${profile.diceNum}d${profile.diceSides}+${profile.bonus}, max ${profile.maxDamage}; ${profile.apCost} AP${repeatPenalty ? `; fatigue -${repeatPenalty}%` : ''}) dealt <span class="damage-text">${damageResult.damage} damage</span>${damageResult.bonusDamage ? ` (${fatiguedDamage} + ${damageResult.bonusDamage} talisman bonus)` : ''}!`, "combat-msg combat-hit combat-hit--special");

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        scheduleEnemyTurn();
    }

    saveGame();
    renderUI();
}

function toggleTwoHanding() {
    const p = gameState.player;
    if (!p || !p.mainHand || p.mainHand.isCatalyst || isColossalWeapon(p.mainHand)) return;
    p.twoHanding = !p.twoHanding;
    p.basicAttackStreak = 0;
    p.weaponAttackStreak = 0;
    log(p.twoHanding ? "Two-handing stance set. Blocking is available; weapon damage is unchanged." : "Returned to one-handed stance.", "system-msg");
    saveGame();
    renderUI();
}

function executeBlock() {
    const p = gameState.player;
    if (!p || !p.twoHanding || gameState.droppedItem || p.currentAp <= 0) return;
    p.currentAp = 0;
    p.isBlocking = true;
    p.aowStreak = 0;
    p.basicAttackStreak = 0;
    p.weaponAttackStreak = 0;
    const damageReduction = hasTalisman(p, "pearlshield-talisman") ? 75 : 50;
    log(`You brace with both hands. The next enemy hit is reduced by ${damageReduction}%.`, "system-msg");
    scheduleEnemyTurn();
    saveGame();
    renderUI();
}

function castSpell(spellIdx) {
    if (gameState.droppedItem) return;

    const p = gameState.player;
    const e = gameState.enemy;
    const spell = SPELLS_DATABASE[spellIdx];
    const hasMatchingCatalyst = [p.mainHand, p.offHand].some(item => item && item.isCatalyst && item.type === spell.type);
    if (!hasMatchingCatalyst || (p.magicType && (spell.type !== p.magicType || !p.knownSpells.includes(spell.name)))) return;

    const stats = getEffectiveStats(p);
    if (p.currentAp < spell.ap || stats[spell.reqStat] < spell.minStat) {
        log(`Not enough AP for ${spell.name}! Requires ${spell.ap} AP.`, "system-msg");
        return;
    }

    const bonus = calculateSpellBonus(spell, stats);
    const rolledDamage = rollDice(spell.diceNum, spell.diceSides) + bonus;
    const damageResult = applySpellTalismanDamage(p, rolledDamage);

    p.currentAp -= spell.ap;
    p.aowStreak = 0;
    p.basicAttackStreak = 0;
    p.weaponAttackStreak = 0;
    e.currentHp = Math.max(0, e.currentHp - damageResult.damage);

    log(`Casted <strong class="magic-msg">${spell.name}</strong> dealing <span class="damage-text">${damageResult.damage} magic damage</span>${damageResult.bonusDamage ? ` (${rolledDamage} + ${damageResult.bonusDamage} talisman bonus)` : ''}!`, "combat-msg combat-hit combat-hit--magic");

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        scheduleEnemyTurn();
    }

    saveGame();
    renderUI();
}

function passTurn() {
    if (gameState.droppedItem) return;
    log("Turn ended.", "system-msg");
    gameState.player.aowStreak = 0;
    gameState.player.basicAttackStreak = 0;
    gameState.player.weaponAttackStreak = 0;
    scheduleEnemyTurn();
    saveGame();
    renderUI();
}

function createTutorialState() {
    const stats = { vig: 10, end: 10, str: 12, dex: 14, int: 12, fai: 12 };
    const maxHp = calculateMaxHp(stats.vig);
    const maxAp = calculateMaxAp(stats.end);
    return {
        stats,
        maxHp,
        playerHp: maxHp,
        maxAp,
        ap: maxAp,
        mainHand: WEAPONS_DATABASE.find(weapon => weapon.id === 11),
        offHand: WEAPONS_DATABASE.find(weapon => weapon.id === 18),
        twoHanding: false,
        blocking: false,
        aowStreak: 0,
        enemyMaxHp: 120,
        enemyHp: 120,
        finished: false,
        narration: "Your practice loadout is a Longsword and Scimitar. Choose an action to begin.",
        messages: []
    };
}

function startTutorial() {
    tutorialState = createTutorialState();
    renderTutorial();
}

function tutorialMessage(message) {
    tutorialState.messages.push(message);
    tutorialState.messages = tutorialState.messages.slice(-5);
}

function tutorialEnemyTurn() {
    const t = tutorialState;
    const rawDamage = rollDice(1, 6) + 2;
    const damage = t.blocking ? Math.ceil(rawDamage / 2) : rawDamage;
    t.blocking = false;
    t.playerHp = Math.max(0, t.playerHp - damage);
    tutorialMessage(`The Hollow attacks for ${damage}${damage < rawDamage ? ` damage (blocked from ${rawDamage})` : " damage"}.`);

    if (t.playerHp === 0) {
        t.finished = true;
        t.narration = "You were downed in practice. Restart the spar and try a different action order.";
        return;
    }

    t.ap = t.maxAp;
    tutorialMessage(`Your AP refills to ${t.maxAp}.`);
}

function tutorialDealDamage(damage, actionText, narration, preserveAowStreak = false) {
    const t = tutorialState;
    if (!preserveAowStreak) t.aowStreak = 0;
    t.enemyHp = Math.max(0, t.enemyHp - damage);
    t.narration = narration;
    tutorialMessage(`${actionText} deals ${damage} damage. The Hollow has ${t.enemyHp} HP left.`);

    if (t.enemyHp === 0) {
        t.finished = true;
        t.narration = "The Training Hollow falls. In a real run, kills grant XP, may drop gear, and every 10th kill triggers a boss encounter.";
    } else if (t.ap === 0) {
        tutorialEnemyTurn();
    }

    renderTutorial();
}

function tutorialBasicAttack(slot) {
    const t = tutorialState;
    if (!t || t.finished) return;
    const weapon = slot === "main" ? t.mainHand : t.offHand;
    if (!weapon || weapon.isCatalyst || (slot === "off" && t.twoHanding) || t.ap < weapon.ap) return;

    const damage = rollDice(weapon.diceNum, weapon.diceSides) + calculateWeaponBonus(weapon, t.stats);
    t.ap -= weapon.ap;
    tutorialDealDamage(damage, weapon.name, `${weapon.name} uses its listed AP cost and weapon dice plus scaling.`, false);
}

function tutorialDualStrike() {
    const t = tutorialState;
    if (!t || t.finished || t.twoHanding || !isDualWieldableWeapon(t.mainHand) || !isDualWieldableWeapon(t.offHand)) return;
    const apCost = t.mainHand.ap + 1;
    if (t.ap < apCost) return;

    const mainDamage = rollDice(t.mainHand.diceNum, t.mainHand.diceSides) + calculateWeaponBonus(t.mainHand, t.stats);
    const offDamage = rollDice(t.offHand.diceNum, t.offHand.diceSides) + calculateWeaponBonus(t.offHand, t.stats);
    const damage = Math.floor(mainDamage + (offDamage * t.stats.dex / 100));
    t.ap -= apCost;
    tutorialDealDamage(damage, "Dual Strike", `Dual Strike costs ${apCost} AP. Its off-hand damage is multiplied by DEX ${t.stats.dex}/100.`, false);
}

function tutorialAshOfWar() {
    const t = tutorialState;
    if (!t || t.finished || t.ap < t.mainHand.ap) return;

    const profile = getAshOfWarProfile(t.mainHand, t.stats);
    const fatigue = Math.max(0.25, 1 - (t.aowStreak * 0.25));
    const penalty = Math.round((1 - fatigue) * 100);
    const damage = Math.max(1, Math.floor((rollDice(profile.diceNum, profile.diceSides) + profile.bonus) * fatigue));
    t.ap -= profile.apCost;
    t.aowStreak += 1;
    tutorialDealDamage(damage, `Ash of War${penalty ? ` (-${penalty}% fatigue)` : ""}`, `This AoW rolls ${profile.diceNum}d${profile.diceSides}+${profile.bonus}, costs ${profile.apCost} AP, and deals ${penalty}% repeat fatigue. Switch to another action to reset it.`, true);
}

function tutorialToggleStance() {
    const t = tutorialState;
    if (!t || t.finished || isColossalWeapon(t.mainHand)) return;
    t.twoHanding = !t.twoHanding;
    t.narration = t.twoHanding
        ? "Two-handing stows the off-hand and adds no raw weapon damage. Use Block to reduce the next enemy hit by half."
        : "One-handed stance restores off-hand attacks and eligible Dual Strike.";
    tutorialMessage(t.narration);
    renderTutorial();
}

function tutorialBlock() {
    const t = tutorialState;
    if (!t || t.finished || !t.twoHanding || t.ap <= 0) return;
    t.ap = 0;
    t.blocking = true;
    t.aowStreak = 0;
    t.narration = "Blocking ends your turn and halves the next hit. Your AP refills after the enemy acts.";
    tutorialMessage("You brace behind your two-handed weapon.");
    tutorialEnemyTurn();
    renderTutorial();
}

function tutorialToggleSeal() {
    const t = tutorialState;
    if (!t || t.finished || t.twoHanding) return;
    const hasSeal = t.offHand.isCatalyst;
    t.offHand = WEAPONS_DATABASE.find(weapon => weapon.id === (hasSeal ? 18 : 51));
    t.narration = hasSeal
        ? "Scimitar re-equipped. Eligible light weapons can Dual Strike."
        : "Finger Seal equipped. Catalysts unlock spells when your FAI or INT meets each spell's requirement; Dual Strike is unavailable while it occupies the off-hand.";
    tutorialMessage(t.narration);
    renderTutorial();
}

function tutorialCastSpell() {
    const t = tutorialState;
    const spell = SPELLS_DATABASE.find(entry => entry.name === "Catch Flame");
    if (!t || t.finished || !t.offHand.isCatalyst || t.twoHanding || t.stats[spell.reqStat] < spell.minStat || t.ap < spell.ap) return;

    const damage = rollDice(spell.diceNum, spell.diceSides) + calculateSpellBonus(spell, t.stats);
    t.ap -= spell.ap;
    tutorialDealDamage(damage, spell.name, `${spell.name} costs ${spell.ap} AP and scales with FAI. INT gates sorceries; FAI gates incantations.`, false);
}

function tutorialEndTurn() {
    const t = tutorialState;
    if (!t || t.finished) return;
    t.aowStreak = 0;
    t.narration = "Ending your turn lets the enemy attack now, then restores your AP.";
    tutorialMessage("You end your turn.");
    tutorialEnemyTurn();
    renderTutorial();
}

function renderTutorial() {
    const t = tutorialState;
    if (!t) return;

    const enemyHealthBar = document.getElementById("tutorial-enemy-hp");
    enemyHealthBar.max = t.enemyMaxHp;
    enemyHealthBar.value = t.enemyHp;
    document.getElementById("tutorial-enemy-hp-label").textContent = `${t.enemyHp} / ${t.enemyMaxHp}`;
    const playerHealthBar = document.getElementById("tutorial-player-hp");
    playerHealthBar.max = t.maxHp;
    playerHealthBar.value = t.playerHp;
    document.getElementById("tutorial-player-hp-label").textContent = `${t.playerHp} / ${t.maxHp}`;
    document.getElementById("tutorial-ap-label").textContent = `AP: ${t.ap} / ${t.maxAp}`;
    document.getElementById("tutorial-narration").textContent = t.narration;

    const status = document.getElementById("tutorial-fight-status");
    status.textContent = t.finished ? (t.enemyHp === 0 ? "DEFEATED" : "DOWNED") : "IN COMBAT";
    status.classList.toggle("is-finished", t.finished);

    const messageLog = document.getElementById("tutorial-log");
    messageLog.replaceChildren(...t.messages.map(message => {
        const line = document.createElement("p");
        line.textContent = message;
        return line;
    }));

    const actions = document.getElementById("tutorial-actions");
    actions.replaceChildren();
    const addAction = (label, handler, disabled = false) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.textContent = label;
        button.disabled = disabled || t.finished;
        button.addEventListener("click", handler);
        actions.appendChild(button);
    };

    addAction(`Attack: ${t.mainHand.name} (${t.mainHand.ap} AP)`, () => tutorialBasicAttack("main"), t.ap < t.mainHand.ap);
    if (!t.twoHanding && !t.offHand.isCatalyst) {
        addAction(`Off-hand: ${t.offHand.name} (${t.offHand.ap} AP)`, () => tutorialBasicAttack("off"), t.ap < t.offHand.ap);
        if (isDualWieldableWeapon(t.mainHand) && isDualWieldableWeapon(t.offHand)) {
            const dualCost = t.mainHand.ap + 1;
            addAction(`Dual Strike (${dualCost} AP)`, tutorialDualStrike, t.ap < dualCost);
        }
    }
    addAction(`AoW: ${t.mainHand.aowName} (${t.mainHand.ap} AP)`, tutorialAshOfWar, t.ap < t.mainHand.ap);
    addAction(t.twoHanding ? "Return to one hand" : "Two-hand stance", tutorialToggleStance);
    if (t.twoHanding) addAction("Block (end turn)", tutorialBlock, t.ap <= 0);
    if (!t.twoHanding) {
        addAction(t.offHand.isCatalyst ? "Re-equip Scimitar" : "Equip Finger Seal", tutorialToggleSeal);
        if (t.offHand.isCatalyst) {
            const spell = SPELLS_DATABASE.find(entry => entry.name === "Catch Flame");
            addAction(`Cast ${spell.name} (${spell.ap} AP)`, tutorialCastSpell, t.ap < spell.ap || t.stats[spell.reqStat] < spell.minStat);
        }
    }
    addAction("End Turn", tutorialEndTurn);
}

// --- RENDER ASCII TRACKER ---
function renderAsciiTracker() {
    const trackerElem = document.getElementById("boss-tracker");
    if (!trackerElem) return;

    const currentProgress = gameState.killCount % 10;
    const isBoss = gameState.enemy && gameState.enemy.isBoss;

    let trackerStr = "[ ";
    for (let i = 0; i < 10; i++) {
        if (i === currentProgress) {
            trackerStr += isBoss ? `<span class="boss-text">@</span>` : `<span class="highlight">@</span>`;
        } else if (i === 9) {
            trackerStr += `<span class="boss-text">B</span>`;
        } else {
            trackerStr += `<span style="color:#444;">x</span>`;
        }
        if (i < 9) trackerStr += "-";
    }
    trackerStr += ` ] (${currentProgress}/10)`;

    trackerElem.innerHTML = trackerStr;
}

// --- RENDER ENGINE ---
function renderUI() {
    const statsElem = document.getElementById("stats-display");
    const actionsElem = document.getElementById("actions-panel");
    const dropElem = document.getElementById("drop-container");
    dropElem.classList.toggle("drop-box--glowing", gameState.droppedItem !== null);
    const levelPanel = document.getElementById("level-up-panel");
    const statButtons = document.getElementById("stat-buttons");

    const mainDisplay = document.getElementById("main-hand-display");
    const offDisplay = document.getElementById("off-hand-display");
    const talismanSlot1Display = document.getElementById("talisman-slot-1");
    const talismanSlot2Display = document.getElementById("talisman-slot-2");

    actionsElem.innerHTML = "";

    if (!gameState.player) {
        talismanSlot1Display.textContent = "Empty";
        talismanSlot2Display.textContent = "Empty";
        statsElem.innerHTML = `<div class="stat-item">Choose starting class:</div>`;
        Object.keys(CLASSES).forEach(key => {
            const c = CLASSES[key];
            actionsElem.innerHTML += `<button class="btn class-choice-btn" onclick="selectClass('${key}')">${c.name} (Lvl ${c.level})</button>`;
        });
        renderAsciiTracker();
        return;
    }

    const p = gameState.player;
    const e = gameState.enemy;

    mainDisplay.textContent = p.mainHand ? p.mainHand.name : "None";
    offDisplay.textContent = isColossalWeapon(p.mainHand)
        ? "Locked (Colossal)"
        : p.offHand ? `${p.offHand.name}${p.twoHanding ? " (stowed)" : ""}` : p.twoHanding ? "Stowed" : "None";
    const talisman1 = TALISMAN_DATABASE.find(talisman => talisman.id === p.talismans[0]);
    const talisman2 = TALISMAN_DATABASE.find(talisman => talisman.id === p.talismans[1]);
    talismanSlot1Display.innerHTML = talisman1 ? talismanNameMarkup(talisman1) : "Empty";
    talismanSlot2Display.innerHTML = talisman2 ? talismanNameMarkup(talisman2) : "Empty";

    if (gameState.droppedItem) {
        const item = gameState.droppedItem;
        if (item.kind === "spell") {
            const spellChoices = p.knownSpells.length < getMaxKnownSpells(p)
                ? `<button class="btn btn-success" onclick="equipDroppedItem('learn')">Learn Spell</button>`
                : p.knownSpells.map((spellName, index) => `<button class="btn btn-success" onclick="equipDroppedItem('spell-${index}')">Replace ${spellName}</button>`).join("");
            dropElem.innerHTML = `
                <div class="item-card">
                    <div class="item-name">${item.name}</div>
                    <div class="item-stats">${item.description}</div>
                    ${spellChoices}
                    <button class="btn btn-danger" style="margin-left:0;" onclick="discardDroppedItem()">Discard Spell</button>
                </div>
            `;
        } else if (item.kind === "talisman") {
            const alreadyEquipped = p.talismans.includes(item.id);
            const rarityLabel = `${item.rarity.charAt(0).toUpperCase()}${item.rarity.slice(1)} Talisman`;
            const rarityTextClass = item.rarity === "legendary" ? "shard-text" : item.rarity === "epic" ? "epic-text" : "";
            dropElem.innerHTML = `
                <div class="item-card">
                    <div class="item-name">${talismanNameMarkup(item)}</div>
                    <div class="talisman-rarity talisman-rarity--${item.rarity} ${rarityTextClass}">${rarityLabel}</div>
                    <div class="item-stats">${item.description}</div>
                    <button class="btn btn-success" ${alreadyEquipped ? 'disabled' : ''} onclick="equipDroppedItem('talisman-1')">Equip in Slot 1</button>
                    <button class="btn btn-success" ${alreadyEquipped ? 'disabled' : ''} onclick="equipDroppedItem('talisman-2')">Equip in Slot 2</button>
                    <button class="btn btn-danger" style="margin-left:0;" onclick="discardDroppedItem()">Discard Talisman</button>
                </div>
            `;
        } else {
            const tempBonus = item.isCatalyst ? 0 : calculateWeaponBonus(item, getEffectiveStats(p));
            dropElem.innerHTML = `
                <div class="item-card">
                    <div class="item-name">${item.name}</div>
                    <div class="item-stats">
                        ${item.isCatalyst ? (item.type === 'sorcery' ? 'Sorcery catalyst' : 'Incantation catalyst') : 'Base: ' + item.diceNum + 'd' + item.diceSides + '+' + tempBonus + '<br>Scales: ' + getWeaponPrimaryStat(item).toUpperCase() + ' (' + item.tier1 + ')'}
                    </div>
                    <button class="btn btn-success" onclick="equipDroppedItem('main')">Equip Main-Hand</button>
                    <button class="btn btn-success" ${isColossalWeapon(p.mainHand) || isColossalWeapon(item) ? 'disabled' : ''} onclick="equipDroppedItem('off')">Equip Off-Hand</button>
                    <button class="btn btn-danger" style="margin-left:0;" onclick="discardDroppedItem()">Discard Item</button>
                </div>
            `;
        }
    } else {
        dropElem.innerHTML = `<p class="empty-msg">No item dropped. Defeat monsters to find gear.</p>`;
    }

    if (gameState.pendingStatPoints > 0) {
        levelPanel.classList.remove("hidden");
        levelPanel.classList.add("level-up-box--glowing");
        levelPanel.querySelector(".level-title").textContent = `Level Up! ${gameState.pendingStatPoints} Stat Point${gameState.pendingStatPoints === 1 ? '' : 's'} Ready (allocate one):`;
        statButtons.innerHTML = "";
        ['vig', 'end', 'str', 'dex', 'int', 'fai'].forEach(s => {
            const label = s === 'vig' ? 'VIG (+5 HP)' : s.toUpperCase();
            statButtons.innerHTML += `<button class="btn" onclick="allocateStat('${s}')">+1 ${label} (${p.stats[s]})</button>`;
        });
    } else {
        levelPanel.classList.add("hidden");
        levelPanel.classList.remove("level-up-box--glowing");
    }

    const effectiveStats = getEffectiveStats(p);
    const formatStat = stat => `${effectiveStats[stat]}${getTalismanStatBonus(p, stat) ? ` (+${getTalismanStatBonus(p, stat)})` : ''}`;
    statsElem.innerHTML = `
        <div class="stat-item">Class: <span class="stat-value">${p.className}</span></div>
        <div class="stat-item">Lvl: <span class="stat-value">${p.level}</span></div>
        <div class="stat-item">XP: <span class="stat-value">${p.xp}/${p.maxXp}</span></div>
        <div class="stat-item">HP: <span class="stat-value stat-hp">${p.currentHp}/${p.maxHp}</span></div>
        <div class="stat-item">AP: <span class="stat-value">${p.currentAp}/${p.maxAp}</span></div>
        <div class="stat-item">VIG: <span class="stat-value">${formatStat('vig')}</span> STR: <span class="stat-value">${formatStat('str')}</span> DEX: <span class="stat-value">${formatStat('dex')}</span> INT: <span class="stat-value">${formatStat('int')}</span> FAI: <span class="stat-value">${formatStat('fai')}</span></div>
        <div class="stat-item">Target: <span class="${e && e.isBoss ? 'boss-text' : 'damage-text'}">${e ? e.name : 'None'} (${e ? e.currentHp : 0}/${e ? e.maxHp : 0} HP)</span></div>
    `;

    const isFrozen = gameState.droppedItem !== null || enemyTurnPending;

    if (p.currentHp > 0) {
        if (p.mainHand && !p.mainHand.isCatalyst && !isColossalWeapon(p.mainHand)) {
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="toggleTwoHanding()">${p.twoHanding ? 'One-Hand Stance' : 'Two-Hand Stance'}</button>`;
        }
        if (p.twoHanding) {
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeBlock()">Block (halve next hit)</button>`;
        }
        if (p.mainHand && !p.mainHand.isCatalyst) {
            const b1 = calculateWeaponBonus(p.mainHand, effectiveStats);
            const label1 = formatDiceLabel(p.mainHand.name, p.mainHand.diceNum, p.mainHand.diceSides, b1, p.mainHand.ap);
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeSingleAttack('main')">${label1}</button>`;

            const aow1 = getAshOfWarProfile(p.mainHand, effectiveStats);
            const critTag = p.mainHand.aowName === "Critical Thrust" ? '<span class="crit-text">CRIT</span> ' : '';
            const nextAowPenalty = Math.round((1 - Math.max(0.25, 1 - (p.aowStreak * 0.25))) * 100);
            const aowDamageBonus = getWeaponTalismanDamageBonus(p, p.mainHand, true);
            const fatigueLabel = nextAowPenalty ? `; next use -${nextAowPenalty}%` : '';
            const aowTalismanLabel = aowDamageBonus ? `; +${aowDamageBonus}% talisman damage` : '';
            const aowLabel1 = `${critTag}AoW: ${p.mainHand.aowName} (${aow1.diceNum}d${aow1.diceSides}+${aow1.bonus}, raw max ${aow1.maxDamage}; ${aow1.apCost} AP${fatigueLabel}${aowTalismanLabel})`;
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeAshOfWar('main')">${aowLabel1}</button>`;
        }

        if (p.offHand && !p.offHand.isCatalyst && !p.twoHanding) {
            const b2 = calculateWeaponBonus(p.offHand, effectiveStats);
            const label2 = formatDiceLabel(`Off: ${p.offHand.name}`, p.offHand.diceNum, p.offHand.diceSides, b2, p.offHand.ap);
            actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="executeSingleAttack('off')">${label2}</button>`;
        }

        if (!p.twoHanding && isDualWieldableWeapon(p.mainHand) && isDualWieldableWeapon(p.offHand)) {
            const dualCost = p.mainHand.ap + 1;
            const dualLabel = `Dual Strike: ${p.mainHand.name} + ${p.offHand.name} (${dualCost} AP)`;
            actionsElem.innerHTML += `<button class="btn" title="Damage: main-hand damage + (off-hand damage * DEX / 100)." ${isFrozen ? 'disabled' : ''} onclick="executeDualAttack()">${dualLabel}</button>`;
        }

        const hasCatalyst = (p.mainHand && p.mainHand.isCatalyst) || (p.offHand && p.offHand.isCatalyst);
        if (hasCatalyst) {
            SPELLS_DATABASE.forEach((spell, idx) => {
                const hasMatchingCatalyst = [p.mainHand, p.offHand].some(item => item && item.isCatalyst && item.type === spell.type);
                const isKnownSpell = !p.magicType || (spell.type === p.magicType && p.knownSpells.includes(spell.name));
                if (hasMatchingCatalyst && isKnownSpell && effectiveStats[spell.reqStat] >= spell.minStat) {
                    const b = calculateSpellBonus(spell, effectiveStats);
                    const spellLabel = formatDiceLabel(spell.name, spell.diceNum, spell.diceSides, b, spell.ap);
                    actionsElem.innerHTML += `<button class="btn btn-magic" ${isFrozen ? 'disabled' : ''} onclick="castSpell(${idx})">${spellLabel}</button>`;
                }
            });
        }

        actionsElem.innerHTML += `<button class="btn" ${isFrozen ? 'disabled' : ''} onclick="passTurn()">End Turn</button>`;
    }

    actionsElem.innerHTML += `<button class="btn btn-danger" onclick="resetGame()">Reset Save</button>`;

    renderAsciiTracker();
}

// --- ENTRY POINT ---
window.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "tutorial") {
        document.getElementById("tutorial-restart").addEventListener("click", startTutorial);
        startTutorial();
        return;
    }

    loadGame();
    renderUI();
});