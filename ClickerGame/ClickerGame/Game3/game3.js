// --- MONSTER DATA TIERS (Elden Ring References) ---
// moveSpeed   = tiles per second (higher = faster)
// attackSpeed = multiplier for wind-up AND recovery (higher = faster attacks; base wind-up 0.9s)
// dmg         = [min, max] per hit
// range       = tiles in a straight line the attack reaches
// combo       = number of chained hits per attack
// behavior    = melee | rush (lunges in) | brute (knockback, stands still to recover)
//               | lurker (hit-and-run) | ranged (kites to keep its distance)
function mob(name, hp, dmgMin, dmgMax, moveSpeed, attackSpeed, range, aggroRange, xp, behavior = 'melee', combo = 1) {
  return { name, hp, dmg: [dmgMin, dmgMax], moveSpeed, attackSpeed, range, aggroRange, xp, behavior, combo };
}

const MONSTER_TIERS = [
  // STAGE 1: Limgrave / Early Game
  [
    mob("Forgotton Noble",        12,  2,  4, 1.6, 1.0, 1, 5,  15),
    mob("Stray Dog",              14,  3,  7, 3.2, 1.8, 1, 7,  20, 'rush'),
    mob("Sub-Human Fiend",        16,  3,  6, 2.2, 1.3, 1, 6,  22, 'melee', 2),
    mob("Grafted Soldier",        18,  4,  8, 1.6, 1.0, 1, 5,  25),
    mob("Cave Bat",               12,  2,  5, 3.4, 1.7, 1, 7,  18, 'lurker'),
    mob("Wolf of the Wilds",      20,  3,  8, 3.0, 1.6, 1, 7,  30, 'rush'),
    mob("Large Crab",             26,  4,  9, 1.3, 0.9, 1, 4,  35),
    mob("Sellsword",              28,  5, 10, 2.0, 1.2, 1, 6,  45, 'melee', 2),
    mob("Grafted Knight",         34,  6, 12, 1.5, 0.9, 2, 6,  60),
    mob("Bell Hunter",            36,  7, 13, 2.2, 1.2, 1, 7,  65, 'melee', 2),
    mob("Giant Land Monstrocity", 42,  9, 16, 0.9, 0.5, 1, 4,  70, 'brute'),
    mob("Pumpkin Brute",          45,  8, 13, 1.1, 0.7, 1, 5,  75, 'brute'),
    mob("Headless Orc",           48,  8, 14, 1.2, 0.7, 1, 5,  85, 'brute'),
    mob("Oathbreaker Knight",     38,  7, 13, 1.8, 1.1, 2, 7,  95, 'melee', 2)
  ],
  // STAGE 2: Liurnia & Caelid
  [
    mob("Pale Archer",            28,  5, 10, 1.4, 1.0, 3, 8,  70, 'ranged'),
    mob("Pudrid Stray",           30,  6, 12, 3.0, 1.6, 1, 8,  80, 'rush'),
    mob("Ice Witchs Soldier",     32,  5, 10, 1.7, 1.1, 1, 5,  55),
    mob("Recusant Warrior",       36,  8, 16, 1.4, 0.8, 1, 7,  85),
    mob("Follower of Desiease",   42,  7, 13, 1.6, 1.0, 2, 6, 110),
    mob("Lesser Kindred of Rot",  45,  6, 12, 2.4, 1.4, 1, 8,  95, 'lurker'),
    mob("Maddend Knight",         48,  8, 15, 1.5, 1.1, 1, 7,  90, 'melee', 2),
    mob("Starstruck Knight",      55,  7, 14, 1.5, 1.0, 2, 6, 100),
    mob("Crystal Warrior",        60,  8, 15, 1.2, 1.1, 1, 6, 120),
    mob("Cleansed Knight",        65,  9, 16, 1.3, 0.9, 2, 7, 140),
    mob("Stone Gargoyle",         70, 10, 18, 1.6, 1.0, 2, 7, 150),
    mob("Skin-God Apostle",       70,  9, 16, 1.5, 1.0, 2, 8, 155, 'melee', 2),
    mob("Horned Brawler",         75, 12, 20, 1.1, 0.6, 1, 6, 160, 'brute'),
    mob("Firey Knight",           80, 10, 18, 1.4, 1.0, 2, 8, 190, 'melee', 2),
    mob("Lion-Blooded Outcast",   85, 13, 22, 1.8, 0.9, 1, 7, 200, 'melee', 2)
  ],
  // STAGE 3: Altus Plateau & Leyndell
  [
    mob("Capital Soldier",        58,  8, 14, 1.7, 1.1, 1, 6, 130),
    mob("Assassin",               70, 12, 22, 3.0, 1.8, 1, 9, 280, 'lurker', 2),
    mob("Scent Mistress",         75, 10, 16, 1.5, 1.0, 3, 8, 230, 'ranged'),
    mob("Wormface",               85, 10, 18, 1.4, 0.9, 2, 6, 210),
    mob("Bloodthirsty Noble",     90, 11, 20, 2.2, 1.2, 1, 8, 260, 'rush'),
    mob("Sworn Captain",          95, 12, 20, 1.6, 1.1, 2, 7, 250),
    mob("Capital Knight",        100, 12, 20, 1.5, 1.0, 2, 7, 240),
    mob("Ill-Omen Killer",       110, 14, 24, 2.0, 1.2, 1, 8, 310, 'melee', 2),
    mob("Stone Warrior",         130, 16, 26, 1.0, 0.5, 1, 5, 320, 'brute'),
    mob("Iron Maiden",           140, 14, 24, 1.4, 0.9, 1, 8, 330),
    mob("Grim Deathbird",        140, 16, 26, 2.0, 1.0, 2, 8, 360, 'rush'),
    mob("Heavy Knight",          150, 16, 26, 1.2, 0.7, 2, 6, 380, 'brute'),
    mob("Golden Tree Avatar",    170, 18, 28, 0.8, 0.5, 3, 8, 420, 'brute'),
    mob("Dargonborn Sentinel",   180, 18, 30, 1.2, 0.7, 3, 8, 450)
  ],
  // STAGE 4: Mountaintops & Crumbling Farum Azula
  [
    mob("Skeletal Swordsman",     95, 12, 20, 1.8, 1.3, 1, 7, 320, 'melee', 3),
    mob("Fire Monk",             110, 12, 22, 1.5, 1.0, 3, 8, 300, 'ranged'),
    mob("Beastman of Crumbling Lands", 125, 16, 26, 2.6, 1.1, 1, 8, 400, 'rush'),
    mob("Ice Knight of Zamor",   150, 15, 26, 1.8, 1.2, 1, 8, 430, 'melee', 2),
    mob("Banished Knight (Crumbling Lands)", 160, 17, 28, 1.5, 1.0, 2, 7, 480, 'melee', 2),
    mob("Night's Rider",         175, 18, 30, 2.4, 1.2, 2, 9, 550, 'rush'),
    mob("Godkiller Apostle",     190, 20, 32, 1.4, 0.9, 2, 9, 650),
    mob("Death Champion",        190, 20, 34, 1.4, 1.0, 2, 9, 680, 'melee', 2),
    mob("Rotted Tree Spirit",    200, 20, 32, 1.0, 0.7, 2, 8, 620, 'brute'),
    mob("Harbinger of Flame",    210, 18, 28, 1.6, 1.0, 3, 8, 520, 'ranged'),
    mob("Dark Blade Kindred",    210, 22, 36, 2.0, 1.0, 3, 9, 720, 'rush'),
    mob("Godkiller Noble",       220, 22, 36, 1.5, 0.9, 2, 8, 700),
    mob("Star-Fallen Beast",     240, 24, 38, 0.9, 0.6, 2, 8, 760, 'brute'),
    mob("Sentinel Commander",    260, 26, 42, 1.3, 0.7, 3, 9, 900, 'brute')
  ],
  // STAGE 5: Haligtree & The Elden Throne
  [
    mob("Nocturn Swordswoman",   240, 22, 38, 2.8, 1.6, 1, 9, 1100, 'rush', 3),
    mob("Haligtree Soldier",     260, 24, 38, 1.8, 1.1, 1, 8,  900),
    mob("Silver Drop Husk",      300, 26, 42, 1.5, 1.0, 2, 8, 1000),
    mob("Reflection Wraith",     320, 28, 44, 2.0, 1.3, 1, 9, 1500, 'melee', 2),
    mob("Cleanrot Champion",     340, 28, 44, 1.6, 1.1, 2, 9, 1200, 'melee', 2),
    mob("Rot Spirit Ashen",      360, 26, 42, 2.2, 1.2, 1, 9, 1300, 'lurker', 2),
    mob("Ritual Knight",         380, 30, 46, 1.4, 0.9, 2, 9, 1400, 'melee', 2),
    mob("Skin-God Noble",        400, 30, 46, 1.5, 1.0, 2, 9, 1450, 'melee', 2),
    mob("Iron Bride",            400, 30, 44, 1.2, 0.8, 2, 9, 1500, 'brute'),
    mob("Draconic Tree Sentinel", 420, 34, 52, 1.0, 0.6, 3, 9, 1600, 'brute')
  ]
];

// Three bosses per stage (Elden Ring bosses, renamed)
const BOSS_TIERS = [
  // Stage 1
  [
    mob("Marrit the Fallen Omen",     150, 10, 20, 1.8, 1.2, 2, 12,  450, 'melee', 2),
    mob("Tree Sentinel Rex",          130, 10, 18, 1.0, 0.8, 2, 12,  380, 'brute'),
    mob("Git the Good",               110, 10, 18, 1.6, 1.1, 2, 12,  350, 'melee', 2)
  ],
  // Stage 2
  [
    mob("Crimson Wolf of Rogan",      200, 12, 22, 2.6, 1.5, 1, 12,  800, 'rush', 3),
    mob("Renilla, Queen of the Half Moon", 230, 12, 24, 1.6, 1.0, 3, 12, 950, 'ranged', 2),
    mob("Grafted Lord",               240, 14, 26, 1.2, 0.8, 2, 12,  800, 'brute', 2)
  ],
  // Stage 3
  [
    mob("Mogg, Lord of Gore",         340, 20, 34, 2.4, 1.3, 1, 12, 1900, 'rush', 3),
    mob("Godfree the First Lord",     380, 22, 36, 1.4, 1.0, 2, 12, 2100, 'melee', 3),
    mob("The Mighyest Demigod",       420, 20, 34, 1.4, 1.0, 2, 12, 1800, 'melee', 3)
  ],
  // Stage 4
  [
    mob("Malikeh the Dark Blade",     520, 26, 42, 2.4, 1.5, 2, 12, 4500, 'rush', 3),
    mob("Dragonlord Placidax",        600, 30, 46, 1.2, 0.7, 3, 12, 5000, 'brute', 2),
    mob("Flame Titan",                700, 34, 50, 0.8, 0.5, 3, 12, 5500, 'brute')
  ],
  // Stage 5
  [
    mob("The Swordswoman of the Putrid God", 650, 26, 44, 2.4, 1.4, 2, 12, 9000, 'rush', 4),
    mob("Radagoon, Golden Warden",    800, 34, 56, 1.6, 1.0, 3, 12, 11000, 'ranged', 2),
    mob("The Throne Beast",          1100, 40, 64, 1.2, 0.9, 3, 12, 15000, 'brute', 3)
  ]
];

// --- LOOT TABLES ---
const WEAPONS_DATABASE = [
    { id: 0, name: "Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Stamp (Upward Cut)", aowDice: 2, aowSides: 10 },
    { id: 1, name: "Executioner's Greataxe", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Heavy Chop", aowDice: 2, aowSides: 10 },
    { id: 2, name: "Riders Glaive", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Phantom Slash", aowDice: 2, aowSides: 8 },
    { id: 3, name: "Great Halberd", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Vacuum Slice", aowDice: 2, aowSides: 6 },
    { id: 4, name: "Troll's Colossal Sword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "A", tier2: null, aowName: "Troll's Roar", aowDice: 2, aowSides: 8 },
    { id: 5, name: "Zweihänder", diceNum: 3, diceSides: 6, ap: 2, stat1: "str", tier1: "A", stat2: "dex", tier2: "D", aowName: "Waves of Darkness", aowDice: 1, aowSides: 12 },
    { id: 6, name: "Dragon Scale Blade", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Ice Lightning Sword", aowDice: 2, aowSides: 6 },
    { id: 7, name: "Misericorde", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Backhanded Thrust", aowDice: 1, aowSides: 10 },
    { id: 8, name: "Five Fingered Dagger", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "S", tier2: null, aowName: "Beastial Slice", aowDice: 1, aowSides: 8 },
    { id: 9, name: "Exiled Knight's Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Impaling Thrust", aowDice: 1, aowSides: 12 },
    { id: 10, name: "Knight's Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Spinning Slash", aowDice: 1, aowSides: 10 },
    { id: 11, name: "Warhammer", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Ground Slam", aowDice: 1, aowSides: 12 },
    { id: 12, name: "Mace", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Endure Strike", aowDice: 1, aowSides: 8 },
    { id: 13, name: "Odachi", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "A", stat2: "str", tier2: "E", aowName: "Piercing Fang", aowDice: 1, aowSides: 12 },
    { id: 14, name: "Serpentine Blade", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "A", stat2: "dex", tier2: "D", aowName: "Venomous Flurry", aowDice: 1, aowSides: 8 },
    { id: 15, name: "Royal Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "B", stat2: "int", tier2: "C", aowName: "Wolf's Assault", aowDice: 2, aowSides: 10 },
    { id: 16, name: "Forgotten Katana", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Unsheathe", aowDice: 2, aowSides: 6 },
    { id: 17, name: "Claymore", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Lion's Claw", aowDice: 1, aowSides: 12 },
    { id: 18, name: "Flamberge", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Bloody Slash", aowDice: 1, aowSides: 10 },
    { id: 19, name: "Sorcerers Staff", isCatalyst: true, type: "sorcery" },
    { id: 20, name: "Holy Seal", isCatalyst: true, type: "incantation" }
];

const SPELLS_DATABASE = [
    { name: "Shard of the Sky", type: "sorcery", reqStat: "int", minStat: 10, ap: 1, diceNum: 1, diceSides: 8, tier: "B" },
    { name: "Swift Shard of the Sky", type: "sorcery", reqStat: "int", minStat: 12, ap: 1, diceNum: 1, diceSides: 6, tier: "A" },
    { name: "Cometshard of the Sky", type: "sorcery", reqStat: "int", minStat: 18, ap: 2, diceNum: 2, diceSides: 8, tier: "A" },
    { name: "Comet", type: "sorcery", reqStat: "int", minStat: 24, ap: 2, diceNum: 3, diceSides: 8, tier: "S" },
    { name: "Star Shower", type: "sorcery", reqStat: "int", minStat: 20, ap: 2, diceNum: 2, diceSides: 10, tier: "B" },
    { name: "Rock Throw", type: "sorcery", reqStat: "int", minStat: 16, ap: 2, diceNum: 3, diceSides: 6, tier: "A" },
    { name: "Sky Slicer", type: "sorcery", reqStat: "int", minStat: 14, ap: 1, diceNum: 2, diceSides: 6, tier: "B" },
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
    { name: "Burn, O Flame!", type: "incantation", reqStat: "fai", minStat: 27, ap: 3, diceNum: 3, diceSides: 12, tier: "A" }
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

// --- SCALING / DAMAGE SYSTEM (ported from the text crawler) ---
const SCALING_TIERS = { E: 0.10, D: 0.25, C: 0.50, B: 0.75, A: 1.00, S: 1.40 };
const COLOSSAL_WEAPON_IDS = new Set([4]);
const HEAVY_WEAPON_IDS = new Set([0, 1, 2, 3, 5, 9, 10, 15]);
const WEAPON_REACH = { 2: 2, 3: 2, 5: 2 }; // Riders Glaive, Great Halberd, Zweihander reach 2 tiles

function isColossalWeapon(w) { return Boolean(w && COLOSSAL_WEAPON_IDS.has(w.id)); }
function isHeavyWeapon(w) { return Boolean(w && HEAVY_WEAPON_IDS.has(w.id)); }
function isDualWieldableWeapon(w) { return Boolean(w && !w.isCatalyst && !isHeavyWeapon(w) && !isColossalWeapon(w)); }

function getEquippedTalismans(p) {
  return (Array.isArray(p.talismans) ? p.talismans : [])
    .map(id => TALISMAN_DATABASE.find(t => t.id === id)).filter(Boolean);
}
function hasTalisman(p, id) { return getEquippedTalismans(p).some(t => t.id === id); }

function talismanNameMarkup(t) {
  if (t.rarity === "legendary") return `<span class="shard-text">${t.name}</span>`;
  if (t.rarity === "epic") return `<span class="epic-text">${t.name}</span>`;
  return t.name;
}

function getTalismanStatBonus(p, stat) {
  return getEquippedTalismans(p).filter(t => t.stat === stat).reduce((n, t) => n + t.amount, 0);
}
function getEffectiveStats(p) {
  return Object.fromEntries(Object.entries(p.stats).map(([s, v]) => [s, v + getTalismanStatBonus(p, s)]));
}
function getApBonus(p) {
  return getEquippedTalismans(p).filter(t => t.effect === "apBonus").reduce((n, t) => n + t.amount, 0);
}
function getMaxKnownSpells(p) {
  return 4 + getEquippedTalismans(p).filter(t => t.effect === "spellSlots").reduce((n, t) => n + t.amount, 0);
}

function getSuccessiveWeaponDamageBonus(p, hitOffset = 0) {
  const hits = Math.max(0, (p.weaponAttackStreak || 0) + hitOffset);
  return getEquippedTalismans(p).filter(t => t.effect === "successiveWeaponDamage")
    .reduce((n, t) => n + Math.min(t.maxPercentage, hits * t.percentagePerHit), 0);
}
function getFullHealthDamageBonus(p) {
  return p.hp >= p.maxHp && hasTalisman(p, "ritual-sword-talisman") ? 10 : 0;
}
function getWeaponTalismanDamageBonus(p, weapon, isAsh, hitOffset = 0) {
  let pct = getFullHealthDamageBonus(p) + getSuccessiveWeaponDamageBonus(p, hitOffset);
  if (isAsh && hasTalisman(p, "shard-of-alexander")) pct += 15;
  if (isColossalWeapon(weapon) && hasTalisman(p, "great-jars-arsenal")) pct += 15;
  if (weapon === p.mainHand && !p.offHand && !isColossalWeapon(weapon) && hasTalisman(p, "blue-dancer-talisman")) pct += 20;
  return pct;
}
function applyWeaponTalismanDamage(p, weapon, damage, isAsh = false, hitOffset = 0) {
  const percentage = getWeaponTalismanDamageBonus(p, weapon, isAsh, hitOffset);
  const bonusDamage = Math.floor(damage * percentage / 100);
  return { damage: damage + bonusDamage, bonusDamage, percentage };
}
function applySpellTalismanDamage(p, damage) {
  const percentage = getFullHealthDamageBonus(p);
  const bonusDamage = Math.floor(damage * percentage / 100);
  return { damage: damage + bonusDamage, bonusDamage, percentage };
}
function applyConsecutiveAttackHealing(p) {
  p.basicAttackStreak = (p.basicAttackStreak || 0) + 1;
  if (p.basicAttackStreak < 2 || !hasTalisman(p, "godskin-swaddling-cloth")) return 0;
  const healed = Math.min(2, p.maxHp - p.hp);
  p.hp += healed;
  return healed;
}

function getWeaponPrimaryStat(w) {
  if (isHeavyWeapon(w) || isColossalWeapon(w)) return "str";
  return w.stat1 === "arc" ? "dex" : w.stat1;
}
function calculateWeaponBonus(w, stats) {
  if (!w || w.isCatalyst) return 0;
  let bonus = 0;
  const primary = getWeaponPrimaryStat(w);
  if (primary && w.tier1) bonus += (stats[primary] || 0) * SCALING_TIERS[w.tier1];
  const secondary = w.stat2 === "arc" ? "dex" : w.stat2;
  if (secondary && secondary !== primary && w.tier2) bonus += (stats[secondary] || 0) * SCALING_TIERS[w.tier2];
  return Math.floor(bonus);
}
function getAshOfWarProfile(w, stats) {
  const weaponBonus = calculateWeaponBonus(w, stats);
  const diceTier = Math.floor((w.diceNum * w.diceSides + weaponBonus) * 1.5);
  const bonus = Math.floor(weaponBonus / 2);
  let diceNum = 3, diceSides = 4;
  if (diceTier > 12 && diceTier <= 18) diceSides = 6;
  else if (diceTier > 18 && diceTier <= 24) diceSides = 8;
  else if (diceTier > 24 && diceTier <= 36) { diceNum = 4; diceSides = 10; }
  else if (diceTier > 36) { diceNum = 5; diceSides = 12; }
  return { diceNum, diceSides, bonus, maxDamage: diceNum * diceSides + bonus, apCost: w.ap };
}
function calculateSpellBonus(spell, stats) {
  const val = stats[spell.reqStat] || 0;
  const scaling = SCALING_TIERS[spell.tier];
  const base = val * scaling;
  if (spell.ap !== 2) return Math.floor(base);
  return Math.floor(base * 0.75 + Math.max(0, val - spell.minStat) * scaling);
}
function getSpellAttackProfile(spell, stats) {
  return {
    diceNum: spell.ap === 2 ? Math.ceil(spell.diceNum * 1.5) : spell.diceNum,
    diceSides: spell.diceSides,
    bonus: calculateSpellBonus(spell, stats)
  };
}

function getStartingSpells(type, stats, limit = 4) {
  return SPELLS_DATABASE.filter(s => s.type === type && stats[s.reqStat] >= s.minStat).slice(0, limit).map(s => s.name);
}
function getAvailableSpellDrops(p) {
  if (!p.magicType) return [];
  const stats = getEffectiveStats(p);
  return SPELLS_DATABASE.filter(s => s.type === p.magicType && stats[s.reqStat] >= s.minStat && !p.knownSpells.includes(s.name));
}
function createSpellLootItem(spell) {
  return {
    kind: "spell", id: spell.name, name: spell.name,
    description: `${spell.type === "sorcery" ? "Sorcery" : "Incantation"}; requires ${spell.reqStat.toUpperCase()} ${spell.minStat}; ${spell.diceNum}d${spell.diceSides}, ${spell.ap} AP.`
  };
}

// --- REAL-TIME DERIVATIONS (turn-based dice/AP -> seconds/stamina/FP) ---
function getWeaponRT(w) {
  const avg = w.diceNum * (w.diceSides + 1) / 2;
  const colossal = isColossalWeapon(w);
  return {
    windup: +(0.2 + avg * 0.03 + (w.ap - 1) * 0.25 + (colossal ? 0.15 : 0)).toFixed(2),
    cost: Math.round(8 + avg * 1.2 + (w.ap - 1) * 8 + (colossal ? 8 : 0)),
    range: WEAPON_REACH[w.id] || 1
  };
}
function getSpellRT(spell) {
  return {
    windup: +(0.4 + spell.ap * 0.2).toFixed(2),
    fpCost: 6 * spell.ap + 2 * spell.ap * spell.ap,
    spCost: 6 * spell.ap,
    range: 3 + spell.ap
  };
}

function calculateScaledHp(baseHp, level) { return Math.ceil(baseHp * (1 + (level - 1) * 0.25)); }
function getMaxHealingPotions(level) { return Math.max(1, Math.floor(level / 3)); }

function rollDice(dice, sides, bonus = 0) {
  let total = bonus;
  for (let i = 0; i < dice; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
}

// --- TOOLTIPS ---
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const tipAttr = t => `data-tip="${esc(t)}"`;
function setTip(id, text) { const el = document.getElementById(id); if (el) el.dataset.tip = text; }

function weaponTip(w, st = getEffectiveStats(player)) {
  if (!w) return 'Empty slot.';
  if (w.isCatalyst) {
    return `${w.name}: ${w.type === 'sorcery' ? 'sorcery catalyst. Casts Sorceries, which scale with INT' : 'incantation seal. Casts Incantations, which scale with FAI'}. Cast spells with keys 1-${getMaxKnownSpells(player)}. It cannot make weapon attacks.`;
  }
  const rt = getWeaponRT(w), ash = getAshOfWarProfile(w, st);
  const scaling = `${getWeaponPrimaryStat(w).toUpperCase()} (${w.tier1})` +
    (w.tier2 ? ` and ${String(w.stat2 === 'arc' ? 'dex' : w.stat2).toUpperCase()} (${w.tier2})` : '');
  const type = isColossalWeapon(w) ? ' Colossal: forces two-handing and locks the off-hand.'
    : isHeavyWeapon(w) ? ' Heavy: cannot be dual-wielded.'
    : ' Light: two light weapons enable Dual Strike.';
  return `${w.name}: basic attack ${w.diceNum}d${w.diceSides}+${calculateWeaponBonus(w, st)} damage, reach ${rt.range} tile(s), swing ${rt.windup}s, costs ${rt.cost} stamina. Scales with ${scaling}. Ash of War "${w.aowName}": ${ash.diceNum}d${ash.diceSides}+${ash.bonus} damage, reach ${rt.range + 2}, costs 20 stamina + 10 FP.${type}`;
}

function spellTip(spell, st = getEffectiveStats(player)) {
  if (!spell) return '';
  const pr = getSpellAttackProfile(spell, st), rt = getSpellRT(spell);
  return `${spell.name} (${spell.type}, needs ${spell.reqStat.toUpperCase()} ${spell.minStat}): ${pr.diceNum}d${pr.diceSides}+${pr.bonus} magic damage to the first enemy within ${rt.range} tiles in a straight line. Cast time ${rt.windup}s, costs ${rt.fpCost} FP + ${rt.spCost} stamina.`;
}

function talismanTip(t) {
  return t ? `${t.name} (${t.rarity} talisman): ${t.description}` : 'Empty talisman slot. Equip a talisman from a drop or your backpack.';
}

function itemTip(item) {
  if (item.kind === 'talisman') return talismanTip(item);
  if (item.kind === 'spell') return spellTip(SPELLS_DATABASE.find(s => s.name === item.id));
  return weaponTip(item);
}

const STAT_TIPS = {
  vig: '+1 Vigor: +10 max HP and +1 max poise.',
  end: '+1 Endurance: +8 max stamina.',
  str: '+1 Strength: +2 max poise and more damage with STR-scaling weapons (all heavy and colossal weapons scale with STR).',
  dex: '+1 Dexterity: more damage with DEX-scaling weapons and +1% off-hand damage share in Dual Strike.',
  int: '+1 Intelligence: +6 max FP, stronger sorceries, and unlocks higher-requirement sorceries.',
  fai: '+1 Faith: +4 max FP, stronger incantations, and unlocks higher-requirement incantations.'
};

function equipTip(item, slot) {
  const p = player;
  if (slot === 'learn') return `Learn ${item.name} in a free spell slot (${p.knownSpells.length}/${getMaxKnownSpells(p)} used).`;
  if (String(slot).startsWith('spell-')) {
    const old = p.knownSpells[Number(slot.slice(6))];
    return `Forget ${old} and learn ${item.name} in its place. ${old} is lost permanently.`;
  }
  if (String(slot).startsWith('talisman-')) {
    const prev = TALISMAN_DATABASE.find(t => t.id === p.talismans[slot === 'talisman-1' ? 0 : 1]);
    return `Equip ${item.name} in talisman slot ${slot.slice(-1)}. ${prev ? `${prev.name} moves to the backpack.` : 'The slot is empty.'} Effect: ${item.description}`;
  }
  if (slot === 'main') {
    return `Equip ${item.name} in the main hand.${p.mainHand ? ` ${p.mainHand.name} moves to the backpack.` : ''}${isColossalWeapon(item) ? ' Colossal: forces two-handing and sends your off-hand to the backpack.' : ''} Resets attack streaks. Gear can only be changed between fights.`;
  }
  if (slot === 'off') {
    return `Equip ${item.name} in the off-hand.${p.offHand ? ` ${p.offHand.name} moves to the backpack.` : ''} Switches you to one-handed. Two light weapons enable Dual Strike: +30% stamina cost, and the off-hand roll adds damage scaled by your DEX%. Gear can only be changed between fights.`;
  }
  return '';
}

function keyTip(key) {
  const p = player, st = getEffectiveStats(p), k = String(key).toLowerCase();
  const w = p.mainHand && !p.mainHand.isCatalyst ? p.mainHand : null;
  if (!p.classData) return '';
  if (/^[1-6]$/.test(k)) {
    const sp = SPELLS_DATABASE.find(s => s.name === p.knownSpells[Number(k) - 1]);
    return sp ? spellTip(sp, st) : 'No spell in this slot. Equip a catalyst and learn spells.';
  }
  const turnNames = { w: 'up', arrowup: 'up', a: 'left', arrowleft: 'left', s: 'down', arrowdown: 'down', d: 'right', arrowright: 'right' };
  if (turnNames[k]) return `Turn to face ${turnNames[k]}. ${p.turnCost ? `Costs ${p.turnCost} stamina` : 'Costs no stamina'}, takes ${p.turnDuration}s. Only turns you; use Q to step forward.`;
  switch (k) {
    case 'q':
      return `Move one tile in the direction you face. Costs ${p.moveCost} stamina, takes ${p.moveDuration}s. Blocked by walls and the enemy.`;
    case ' ':
      return `Roll one tile forward. Costs ${p.rollCost} stamina, takes ${p.rollDuration}s, and makes you invulnerable for 0.35s. Resets your attack streaks.`;
    case 'e': case 'j': {
      if (!w) return p.magicType ? 'No weapon: casts your first spell (same as key 1).' : 'You need a weapon to attack.';
      const rt = getWeaponRT(w), dual = canDualStrike();
      return `Basic attack with ${w.name}: ${w.diceNum}d${w.diceSides}+${calculateWeaponBonus(w, st)} damage to the first enemy within ${rt.range} tile(s) ahead. Swing ${rt.windup}s, costs ${Math.round(rt.cost * (dual ? 1.3 : 1))} stamina.${dual ? ' Dual Strike active: also hits with your off-hand (+30% stamina).' : ''}`;
    }
    case 'r': case 'k': {
      if (!w) return 'Ashes of War need a weapon (not a catalyst).';
      const rt = getWeaponRT(w), a = getAshOfWarProfile(w, st);
      return `Ash of War "${w.aowName}": ${a.diceNum}d${a.diceSides}+${a.bonus} damage, reach ${rt.range + 2} tiles, cast time ${(rt.windup + 0.3).toFixed(2)}s. Costs 20 stamina + 10 FP. Chaining them without another action loses 25% damage per use (minimum 25%).`;
    }
    case 'h':
      return `Drink a Healing Flask: restores 50% of max HP (${Math.ceil(p.maxHp * 0.5)}) after 0.9s. Costs no stamina. Flasks: ${p.healingPotions}/${getMaxHealingPotions(p.level)}. Only usable below max HP.`;
    case 't':
      return 'Toggle one-handed / two-handed stance (free, instant). Two-handed lets you hold B to block but disables Dual Strike. Colossal weapons are always two-handed.';
    case 'b':
      return `Hold to block (two-handed only): cuts damage by ${hasTalisman(p, 'pearlshield-talisman') ? 75 : 50}%. Each blocked hit drains stamina (1.5x the damage + 4). At 0 stamina your guard breaks and you are staggered. You cannot act or regain stamina while blocking.`;
    case 'p': case 'escape':
      return 'Pause or resume the game.';
  }
  return '';
}

function initTooltips() {
  const tipEl = document.createElement('div');
  tipEl.id = 'tooltip';
  document.body.appendChild(tipEl);
  let mx = 0, my = 0, hasMouse = false;
  const SEL = '[data-tip], .keybinds button[data-key]';

  const tipFor = el => {
    if (!el) return '';
    if (el.dataset.tip) return el.dataset.tip;
    if (el.dataset.key != null) return keyTip(el.dataset.key);
    return '';
  };
  const refresh = () => {
    if (!hasMouse) return;
    const under = document.elementFromPoint(mx, my);
    const text = tipFor(under && under.closest(SEL));
    if (!text) { tipEl.classList.remove('visible'); return; }
    if (tipEl.textContent !== text) tipEl.textContent = text;
    tipEl.classList.add('visible');
    const pad = 14, w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let x = mx + pad, y = my + pad;
    if (x + w > innerWidth - 4) x = Math.max(4, mx - w - pad);
    if (y + h > innerHeight - 4) y = Math.max(4, my - h - pad);
    tipEl.style.left = x + 'px';
    tipEl.style.top = y + 'px';
  };

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; hasMouse = true; refresh(); });
  document.documentElement.addEventListener('mouseleave', () => { hasMouse = false; tipEl.classList.remove('visible'); });
  setInterval(refresh, 150); // keeps text live and hides it when a panel re-renders under the cursor

  setTip('start-game-btn', 'Begin the run with the selected class. Pick a class card first.');
  setTip('pause-btn', 'Pause or resume the game (P or Esc). The game also pauses on its own while a drop or level-up is waiting.');
}

// --- CLASS ARCHETYPES ---
const CLASS_PRESETS = {
  Outcast:   { title: "Outcast",   desc: "Heavy build, high Vigor & Endurance. Claymore scaling off STR.",            vig: 16, end: 15, dex: 9,  str: 16, int: 7,  fth: 8,  weaponId: 17 },
  Bandit:    { title: "Bandit",    desc: "Dual-wields Five Fingered Dagger & Misericorde. Fast strikes and quick rolls.", vig: 10, end: 14, dex: 16, str: 9,  int: 8,  fth: 8,  weaponId: 8, offHandId: 7 },
  Stargazer: { title: "Stargazer", desc: "Glintstone sorcerer. High INT, long-range spells, fragile HP.",             vig: 8,  end: 10, dex: 11, str: 8,  int: 17, fth: 7,  weaponId: 19 },
  Bishop:    { title: "Bishop",    desc: "Mace and Holy Seal. Combines STR with Faith incantations.",                 vig: 12, end: 11, dex: 8,  str: 14, int: 7,  fth: 16, weaponId: 12, offHandId: 20 },
  Samurai:   { title: "Samurai",   desc: "Balanced stats with a precise Forgotten Katana.",                            vig: 12, end: 12, dex: 14, str: 12, int: 9,  fth: 9,  weaponId: 16 },
  Deserted:  { title: "Deserted",  desc: "Blank slate with even stats. Evolves into any build.",                      vig: 10, end: 10, dex: 10, str: 10, int: 10, fth: 10, weaponId: 12 }
};

// --- DIRECTION VECTORS ---
const DIRS = {
  UP:    { x: 0,  y: -1, angle: 0 },
  RIGHT: { x: 1,  y: 0,  angle: Math.PI / 2 },
  DOWN:  { x: 0,  y: 1,  angle: Math.PI },
  LEFT:  { x: -1, y: 0,  angle: -Math.PI / 2 }
};

// Inventory / progression state
const gameState = {
  droppedItem: null, killCount: 0, pendingStatPoints: 0,
  awaitingChoice: false,   // after a kill: pick normal enemy or stage boss
  paused: false,
  bossesDefeated: [],      // boss names
  backpack: []             // stored items
};

const BACKPACK_SIZE = 10;
const STAGE_START_LEVELS = [1, 11, 21, 31, 41];

// Stage = enemy tier, driven by player level (same rule as the text crawler)
const STAGE_NAMES = ["Limgrave", "Liurnia & Caelid", "Altus Plateau & Leyndell", "Mountaintops & Farum Azula", "Haligtree & The Elden Throne"];
function getStageIndex(level) {
  return level >= 41 ? 4 : level >= 31 ? 3 : level >= 21 ? 2 : level >= 11 ? 1 : 0;
}

// --- GAME ENGINE ---
let canvas = null;
let ctx = null;
const GRID_SIZE = 10;
let TILE_SIZE = 52;

const ENEMY_BASE_WINDUP = 0.9;
const ENEMY_BASE_RECOVERY = 0.9;
const ENEMY_COMBO_WINDUP_FACTOR = 0.55;
const ENEMY_DMG_PER_LEVEL = 0.06;

let lastTime = performance.now();
let selectedClassKey = null;
let gameStarted = false;
const fx = []; // short-lived attack flashes { cells, color, t }

function initCanvas() {
  if (!canvas) {
    canvas = document.getElementById('gameCanvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
      TILE_SIZE = canvas.width / GRID_SIZE;
    }
  }
}

// Player State
const player = {
  x: 2, y: 2, drawX: 2, drawY: 2,
  dir: DIRS.DOWN,
  classData: null,
  level: 1, xp: 0, maxXp: 50,
  stats: { str: 10, dex: 10, int: 10, fai: 10, vig: 10, end: 10 },

  mainHand: null, offHand: null, twoHanding: false, blocking: false,
  talismans: [null, null],
  magicType: null, knownSpells: [],
  healingPotions: 0,
  aowStreak: 0, basicAttackStreak: 0, weaponAttackStreak: 0, streakTimer: 0,

  hp: 100, maxHp: 100,
  sp: 100, maxSp: 100, spRegen: 22,
  fp: 50, maxFp: 50, fpRegen: 1.5,
  poise: 20, maxPoise: 20,

  actionTimer: 0, actionDuration: 0,
  pendingAction: null, pendingSpell: null, targetDir: null,

  turnCost: 0, turnDuration: 0.1,
  moveCost: 5, moveDuration: 0.5,
  rollCost: 25, rollDuration: 0.25, iFrames: 0,

  staggerTimer: 0, hitFlash: 0,
  isFatigued: false, fatigueTimer: 0,
  dead: false, deadTimer: 0
};

// Enemy State
const enemy = {
  x: 7, y: 7, drawX: 7, drawY: 7,
  dir: DIRS.LEFT,
  data: null, isBoss: false, xp: 0,
  hp: 0, maxHp: 0,

  aggro: false, isAttacking: false,
  attackTimer: 0, attackTotal: 0,
  recoverTimer: 0, moveTimer: 0, reactionTimer: 0, wanderTimer: 1, idleTime: 0,
  comboLeft: 0, retreatSteps: 0,
  targetCells: [],
  flash: 0, respawnTimer: 0
};

// --- UI HELPERS ---
function setHTML(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
function setText(id, text) { const el = document.getElementById(id); if (el) el.innerText = text; }
function setBar(id, ratio) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
}
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function addLog(text, cls = '') {
  const box = document.getElementById('log-box');
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'log-entry' + (cls ? ' ' + cls : '');
  el.innerHTML = text;
  box.prepend(el);
  while (box.children.length > 40) box.removeChild(box.lastChild);
}

function pressKey(k) {
  keys[k] = true;
  setTimeout(() => { keys[k] = false; }, 120);
}

// --- INITIALIZATION & CLASS SELECTION ---
function initClassSelection() {
  const container = document.getElementById('class-options-container');
  if (!container) return;

  container.innerHTML = '';
  Object.keys(CLASS_PRESETS).forEach(key => {
    const cls = CLASS_PRESETS[key];
    const weapon = WEAPONS_DATABASE.find(w => w.id === cls.weaponId);
    const card = document.createElement('div');
    card.className = 'class-card';
    const offW = cls.offHandId != null ? WEAPONS_DATABASE.find(w => w.id === cls.offHandId) : null;
    card.dataset.tip = `Select the ${cls.title} class. ${cls.desc} Starts with ${weapon.name}${offW ? ' and ' + offW.name : ''}. Vigor ${cls.vig} (HP), Endurance ${cls.end} (stamina), Strength ${cls.str}, Dexterity ${cls.dex}, Intelligence ${cls.int}, Faith ${cls.fth}.`;
    card.innerHTML = `
      <h3>${cls.title}</h3>
      <p>${cls.desc}</p>
      <p>Weapon: ${weapon.name}</p>
      <p style="margin-top:6px; color:#f0a500;">VIG ${cls.vig} | END ${cls.end} | STR ${cls.str} | DEX ${cls.dex}</p>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedClassKey = key;
      const startBtn = document.getElementById('start-game-btn');
      if (startBtn) startBtn.disabled = false;
    });
    container.appendChild(card);
  });

  const startBtn = document.getElementById('start-game-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (!selectedClassKey) return;
      applyClass(CLASS_PRESETS[selectedClassKey]);
      document.getElementById('class-select-screen').style.display = 'none';
      document.getElementById('game-screen').style.display = 'block';
      initCanvas();
      spawnEnemy();
      gameStarted = true;
      const pb = document.getElementById('pause-btn');
      if (pb) pb.style.display = 'inline-block';
      lastTime = performance.now();
      requestAnimationFrame(gameLoop);
    });
  }

  document.querySelectorAll('.keybinds button[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.key === 'p') togglePause();
      else pressKey(btn.dataset.key);
    });
  });
}

function recalcDerived(fill = false) {
  const stats = getEffectiveStats(player);
  const oldMaxSp = player.maxSp;
  player.maxHp = stats.vig * 10;
  player.maxSp = stats.end * 8 + getApBonus(player) * 8;
  player.maxFp = stats.int * 6 + stats.fai * 4;
  player.maxPoise = stats.str * 2 + stats.vig;
  if (fill) {
    player.hp = player.maxHp; player.sp = player.maxSp; player.fp = player.maxFp; player.poise = player.maxPoise;
  } else {
    player.hp = Math.min(player.hp, player.maxHp);
    player.sp = Math.min(player.maxSp, player.sp + Math.max(0, player.maxSp - oldMaxSp));
    player.fp = Math.min(player.fp, player.maxFp);
    player.poise = player.maxPoise;
  }
}

function applyClass(cls) {
  player.classData = cls;
  player.level = 1; player.xp = 0; player.maxXp = 50;
  player.stats = { str: cls.str, dex: cls.dex, int: cls.int, fai: cls.fth, vig: cls.vig, end: cls.end };
  player.mainHand = WEAPONS_DATABASE.find(w => w.id === cls.weaponId);
  player.offHand = cls.offHandId != null ? WEAPONS_DATABASE.find(w => w.id === cls.offHandId) : null;
  player.twoHanding = isColossalWeapon(player.mainHand);
  player.talismans = [null, null];
  player.healingPotions = 1;
  player.aowStreak = player.basicAttackStreak = player.weaponAttackStreak = 0;
  const catalyst = [player.mainHand, player.offHand].find(w => w && w.isCatalyst);
  player.magicType = catalyst ? catalyst.type : null;
  player.knownSpells = [];
  recalcDerived(true);
  if (player.magicType) {
    player.knownSpells = getStartingSpells(player.magicType, getEffectiveStats(player), getMaxKnownSpells(player));
  }
  gameState.droppedItem = null;
  gameState.killCount = 0;
  gameState.pendingStatPoints = 0;
  gameState.awaitingChoice = false;
  gameState.paused = false;
  gameState.bossesDefeated = [];
  gameState.backpack = [];
  resetPlayerPosition();
  setText('player-class-title', cls.title);
  renderAllPanels();
}

function resetPlayerPosition() {
  player.x = player.drawX = 2;
  player.y = player.drawY = 2;
  player.dir = DIRS.DOWN;
  player.actionTimer = 0;
  player.pendingAction = null;
  player.iFrames = 0;
  player.staggerTimer = 0;
  player.isFatigued = false;
  player.blocking = false;
  player.dead = false;
}

// --- ENEMY SPAWN LOGIC ---
function getEnemyDmgRange() {
  const m = 1 + (player.level - STAGE_START_LEVELS[getStageIndex(player.level)]) * ENEMY_DMG_PER_LEVEL;
  return [Math.round(enemy.data.dmg[0] * m), Math.round(enemy.data.dmg[1] * m)];
}

function spawnEnemy(bossIndex = -1) {
  let template, isBoss = false;
  const stage = getStageIndex(player.level);
  let tierIdx = stage;

  if (bossIndex >= 0) {
    template = BOSS_TIERS[stage][bossIndex];
    isBoss = true;
  } else {
    if (Math.random() < 0.15 && tierIdx < MONSTER_TIERS.length - 1) {
      tierIdx++;
      addLog('<span class="highlight">DANGER! A high-level threat from lower depths approaches!</span>', 'alert');
    }
    const list = MONSTER_TIERS[tierIdx];
    template = list[Math.floor(Math.random() * list.length)];
  }

  enemy.data = template;
  enemy.isBoss = isBoss;
  enemy.stage = stage;
  enemy.maxHp = calculateScaledHp(template.hp, player.level) + 10;
  enemy.hp = enemy.maxHp;
  const rematch = isBoss && gameState.bossesDefeated.includes(template.name);
  enemy.xp = isBoss ? (rematch ? Math.floor(template.xp * 0.2) : template.xp) : template.xp + player.level * 2;

  let tries = 0;
  do {
    enemy.x = Math.floor(Math.random() * GRID_SIZE);
    enemy.y = Math.floor(Math.random() * GRID_SIZE);
    tries++;
  } while (Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y) < 4 && tries < 50);
  enemy.drawX = enemy.x; enemy.drawY = enemy.y;

  enemy.aggro = false; enemy.isAttacking = false; enemy.targetCells = [];
  enemy.comboLeft = 0; enemy.retreatSteps = 0;
  enemy.recoverTimer = 0.5; enemy.moveTimer = 0; enemy.reactionTimer = 0;
  enemy.wanderTimer = 1; enemy.idleTime = 0; enemy.flash = 0;

  if (isBoss) addLog(`<strong class="boss-text">BOSS ENCOUNTER: ${template.name}</strong> (${enemy.maxHp} HP)!${rematch ? ' (rematch: reduced runes)' : ''}`, 'alert');
  else addLog(`Encountered <strong class="damage-text">${template.name}</strong> (${enemy.maxHp} HP).`, 'info');
  renderStatusInfo();
  renderPlayerStats();
  renderBackpack();
}

// --- PANELS ---
function renderStageInfo() {
  const stage = getStageIndex(player.level);
  const bosses = BOSS_TIERS[stage];
  const done = bosses.filter(b => gameState.bossesDefeated.includes(b.name)).length;
  return `Stage ${stage + 1}: ${STAGE_NAMES[stage]}<br>Bosses defeated: <span class="boss-text">${done}/${bosses.length}</span><br>Kills: ${gameState.killCount}`;
}

function renderStatusInfo() {
  if (!enemy.data) return;
  const d = enemy.data;
  const [lo, hi] = getEnemyDmgRange();
  setHTML('status-info', `
    <div class="${enemy.isBoss ? 'boss-text' : 'damage-text'}" style="font-weight:bold;">${d.name}</div>
    <div>HP: ${Math.max(0, Math.ceil(enemy.hp))} / ${enemy.maxHp}</div>
    <div>Damage: ${lo}-${hi}${d.combo > 1 ? ` x${d.combo} combo` : ''}</div>
    <div>Move Speed: ${d.moveSpeed.toFixed(1)} tiles/s</div>
    <div>Attack Speed: x${d.attackSpeed.toFixed(1)}</div>
    <div>Reach: ${d.range} | Style: ${d.behavior}</div>
  `);
}

function renderPlayerStats() {
  if (!player.classData) return;
  const st = getEffectiveStats(player);
  const fmt = k => `${st[k]}${getTalismanStatBonus(player, k) ? ` <span style="color:#73f7a4;">(+${getTalismanStatBonus(player, k)})</span>` : ''}`;
  const w = player.mainHand;
  let atk = '';
  if (w && !w.isCatalyst) {
    atk = `<div>Attack: ${w.diceNum}d${w.diceSides}+${calculateWeaponBonus(w, st)} (${getWeaponRT(w).windup}s)</div>`;
  }
  setHTML('player-stats', `
    <div>Lvl <span class="stat-value">${player.level}</span> &nbsp; XP ${player.xp}/${player.maxXp}</div>
    <div class="xp-bar"><div style="width:${(player.xp / player.maxXp) * 100}%"></div></div>
    <div>VIG ${fmt('vig')} END ${fmt('end')} STR ${fmt('str')}</div>
    <div>DEX ${fmt('dex')} INT ${fmt('int')} FAI ${fmt('fai')}</div>
    ${atk}
    <div>Flasks: ${player.healingPotions}/${getMaxHealingPotions(player.level)} (H)</div>
    <div class="tracker">${renderStageInfo()}</div>
  `);
}

function renderEquipment() {
  if (!player.classData) return;
  setText('main-hand-slot', player.mainHand ? player.mainHand.name : 'None');
  setText('off-hand-slot', isColossalWeapon(player.mainHand)
    ? 'Locked (Colossal)'
    : player.offHand ? `${player.offHand.name}${player.twoHanding ? ' (stowed)' : ''}` : (player.twoHanding ? 'Stowed' : 'None'));
  setText('stance-slot', player.twoHanding ? 'Two-handed (B to block)' : 'One-handed');
  setTip('main-hand-slot', weaponTip(player.mainHand));
  setTip('off-hand-slot', isColossalWeapon(player.mainHand)
    ? 'Locked: colossal weapons are two-handed and block the off-hand slot.'
    : player.offHand ? weaponTip(player.offHand) : 'Empty off-hand. Equip a light weapon for Dual Strike, or a catalyst.');
  setTip('stance-slot', player.twoHanding
    ? 'Two-handed: hold B to block (cuts damage 50%). Dual Strike is disabled. Press T to switch to one-handed.'
    : 'One-handed: no blocking, and two light weapons enable Dual Strike. Press T to switch to two-handed.');

  [0, 1].forEach(i => {
    const t = TALISMAN_DATABASE.find(x => x.id === player.talismans[i]);
    setHTML(`talisman-slot-${i + 1}`, `Slot ${i + 1}: ${t ? talismanNameMarkup(t) : 'Empty'}`);
    setTip(`talisman-slot-${i + 1}`, talismanTip(t));
  });

  const st = getEffectiveStats(player);
  if (!player.magicType) {
    setHTML('spell-list', '<span style="color:#666;">No catalyst equipped</span>');
    return;
  }
  setHTML('spell-list', player.knownSpells.map((name, i) => {
    const sp = SPELLS_DATABASE.find(s => s.name === name);
    const pr = getSpellAttackProfile(sp, st);
    const rt = getSpellRT(sp);
    return `<button class="spell-btn" ${tipAttr(spellTip(sp, st))} onclick="pressKey('${i + 1}')">${i + 1}: ${sp.name} <span>${pr.diceNum}d${pr.diceSides}+${pr.bonus} · ${rt.fpCost} FP</span></button>`;
  }).join(''));
}

function renderDropPanel() {
  const box = document.getElementById('drop-container');
  if (!box) return;
  const item = gameState.droppedItem;
  const full = gameState.backpack.length >= BACKPACK_SIZE;
  box.classList.toggle('drop-box--glowing', Boolean(item));

  if (!item) {
    box.innerHTML = '<p class="empty-msg">No item dropped. Defeat monsters to find gear.</p>';
    return;
  }

  if (item.kind === 'spell') {
    const choices = player.knownSpells.length < getMaxKnownSpells(player)
      ? `<button class="btn btn-success" ${tipAttr(equipTip(item, 'learn'))} onclick="equipDroppedItem('learn')">Learn Spell</button>`
      : player.knownSpells.map((n, i) => `<button class="btn btn-success" ${tipAttr(equipTip(item, 'spell-' + i))} onclick="equipDroppedItem('spell-${i}')">Replace ${n}</button>`).join('');
    box.innerHTML = `
      <div class="item-card">
        <div class="item-name" ${tipAttr(itemTip(item))}>${item.name}</div>
        <div class="item-stats">${item.description}</div>
        ${choices}
        <button class="btn" ${full ? 'disabled' : ''} onclick="storeDroppedItem()" ${tipAttr(`Move ${item.name} to your backpack (${gameState.backpack.length}/${BACKPACK_SIZE}) to use later.`)}>Store in Backpack</button>
        <button class="btn btn-danger" onclick="discardDroppedItem()" ${tipAttr(`Permanently throw away ${item.name}.`)}>Discard Spell</button>
      </div>`;
  } else if (item.kind === 'talisman') {
    const equipped = player.talismans.includes(item.id);
    const label = `${item.rarity.charAt(0).toUpperCase()}${item.rarity.slice(1)} Talisman`;
    const cls = item.rarity === 'legendary' ? 'shard-text' : item.rarity === 'epic' ? 'epic-text' : '';
    box.innerHTML = `
      <div class="item-card">
        <div class="item-name" ${tipAttr(itemTip(item))}>${talismanNameMarkup(item)}</div>
        <div class="talisman-rarity ${cls}">${label}</div>
        <div class="item-stats">${item.description}</div>
        <button class="btn btn-success" ${equipped ? 'disabled' : ''} ${tipAttr(equipTip(item, 'talisman-1'))} onclick="equipDroppedItem('talisman-1')">Equip in Slot 1</button>
        <button class="btn btn-success" ${equipped ? 'disabled' : ''} ${tipAttr(equipTip(item, 'talisman-2'))} onclick="equipDroppedItem('talisman-2')">Equip in Slot 2</button>
        <button class="btn" ${full ? 'disabled' : ''} onclick="storeDroppedItem()" ${tipAttr(`Move ${item.name} to your backpack (${gameState.backpack.length}/${BACKPACK_SIZE}) to use later.`)}>Store in Backpack</button>
        <button class="btn btn-danger" onclick="discardDroppedItem()" ${tipAttr(`Permanently throw away ${item.name}.`)}>Discard Talisman</button>
      </div>`;
  } else {
    const st = getEffectiveStats(player);
    const bonus = calculateWeaponBonus(item, st);
    const rt = getWeaponRT(item);
    const offDisabled = isColossalWeapon(player.mainHand) || isColossalWeapon(item);
    box.innerHTML = `
      <div class="item-card">
        <div class="item-name" ${tipAttr(itemTip(item))}>${item.name}</div>
        <div class="item-stats">
          Base: ${item.diceNum}d${item.diceSides}+${bonus}<br>
          Scales: ${getWeaponPrimaryStat(item).toUpperCase()} (${item.tier1})${item.tier2 ? ` / ${(item.stat2 || '').toUpperCase()} (${item.tier2})` : ''}<br>
          Swing ${rt.windup}s · ${rt.cost} stamina · reach ${rt.range}
        </div>
        <button class="btn btn-success" ${tipAttr(equipTip(item, 'main'))} onclick="equipDroppedItem('main')">Equip Main-Hand</button>
        <button class="btn btn-success" ${offDisabled ? 'disabled' : ''} ${tipAttr(equipTip(item, 'off'))} onclick="equipDroppedItem('off')">Equip Off-Hand</button>
        <button class="btn" ${full ? 'disabled' : ''} onclick="storeDroppedItem()" ${tipAttr(`Move ${item.name} to your backpack (${gameState.backpack.length}/${BACKPACK_SIZE}) to use later.`)}>Store in Backpack (${gameState.backpack.length}/${BACKPACK_SIZE})</button>
        <button class="btn btn-danger" onclick="discardDroppedItem()" ${tipAttr(`Permanently throw away ${item.name}.`)}>Discard Item</button>
      </div>`;
  }
}

function renderLevelPanel() {
  const panel = document.getElementById('level-up-panel');
  if (!panel) return;
  if (gameState.pendingStatPoints <= 0) {
    panel.classList.add('hidden');
    panel.classList.remove('level-up-box--glowing');
    return;
  }
  panel.classList.remove('hidden');
  panel.classList.add('level-up-box--glowing');
  const n = gameState.pendingStatPoints;
  const title = panel.querySelector('.level-title');
  if (title) title.textContent = `Level Up! ${n} Stat Point${n === 1 ? '' : 's'} Ready:`;
  setHTML('stat-buttons', ['vig', 'end', 'str', 'dex', 'int', 'fai'].map(s => {
    const label = s === 'vig' ? 'VIG (+10 HP)' : s === 'end' ? 'END (+8 SP)' : s.toUpperCase();
    return `<button class="btn" ${tipAttr(STAT_TIPS[s] + ' Spending a point fully restores HP, stamina, FP and poise.')} onclick="allocateStat('${s}')">+1 ${label} (${player.stats[s]})</button>`;
  }).join(''));
}

function isChoiceFrozen() {
  return Boolean(gameState.droppedItem) || gameState.pendingStatPoints > 0;
}
function isFrozen() {
  return gameState.paused || isChoiceFrozen();
}

function renderChoicePanel() {
  const panel = document.getElementById('choice-panel');
  if (!panel) return;
  if (!gameState.awaitingChoice || isChoiceFrozen()) {
    panel.classList.add('hidden');
    return;
  }
  panel.classList.remove('hidden');
  const stage = getStageIndex(player.level);
  const bossButtons = BOSS_TIERS[stage].map((boss, i) => {
    const hp = calculateScaledHp(boss.hp, player.level) + 10;
    const done = gameState.bossesDefeated.includes(boss.name);
    return `<button class="btn btn-danger" ${tipAttr(`Fight boss ${boss.name}: ${hp} HP, damage ${boss.dmg[0]}-${boss.dmg[1]}${boss.combo > 1 ? ' x' + boss.combo + ' combo' : ''}, reach ${boss.range}, style ${boss.behavior}. Reward: ${done ? Math.floor(boss.xp * 0.2) + ' runes (rematch, reduced)' : boss.xp + ' runes'}. Your position resets.`)} onclick="chooseNextEnemy(${i})">
      <span class="boss-text">${boss.name}</span>
      <span style="color:#9bb0c9;">(${hp} HP)${done ? ' - defeated, rematch gives reduced runes' : ''}</span>
    </button>`;
  }).join('');
  setHTML('choice-buttons', `
    <button class="btn btn-success" ${tipAttr('Fight a random regular enemy from your stage (15% chance of one from the next stage). Your position resets.')} onclick="chooseNextEnemy(-1)">Fight a normal enemy</button>
    <div class="choice-sub">Or challenge a boss of Stage ${stage + 1} (${STAGE_NAMES[stage]}):</div>
    ${bossButtons}`);
}

function chooseNextEnemy(bossIndex) {
  if (!gameState.awaitingChoice || isChoiceFrozen()) return;
  gameState.awaitingChoice = false;
  resetPlayerPosition();
  spawnEnemy(Number.isInteger(bossIndex) ? bossIndex : -1);
  renderAllPanels();
}

function togglePause() {
  if (!gameStarted || player.dead) return;
  gameState.paused = !gameState.paused;
  const btn = document.getElementById('pause-btn');
  if (btn) btn.innerText = gameState.paused ? 'Resume (P)' : 'Pause (P)';
}

function renderAllPanels() {
  renderChoicePanel();
  renderBackpack();
  renderEquipment();
  renderDropPanel();
  renderLevelPanel();
  renderPlayerStats();
  renderStatusInfo();
}

// --- PROGRESSION ---
function gainXP(amount) {
  player.xp += amount;
  addLog(`Obtained <span class="highlight">${amount} Runes</span>.`, 'info');
  while (player.xp >= player.maxXp) levelUp();
}

function levelUp() {
  player.xp -= player.maxXp;
  player.level += 1;
  player.maxXp = player.level * 50;
  gameState.pendingStatPoints += 1;
  addLog(`<strong class="highlight">LEVEL UP! Reached Level ${player.level}!</strong> Spend your stat point (game paused until you do).`, 'good');
}

function allocateStat(statKey) {
  if (gameState.pendingStatPoints <= 0 || !['vig', 'end', 'str', 'dex', 'int', 'fai'].includes(statKey)) return;
  player.stats[statKey] += 1;
  gameState.pendingStatPoints -= 1;
  recalcDerived(true);
  addLog(`Increased <span class="highlight">${statKey.toUpperCase()}</span> to ${player.stats[statKey]}. HP & stamina restored!`, 'good');
  renderAllPanels();
}

// --- LOOT ---
function triggerLootDrop() {
  if (player.healingPotions < getMaxHealingPotions(player.level) && Math.random() < 0.15) {
    player.healingPotions += 1;
    addLog(`<strong class="healing-text">Healing Flask</strong> found (${player.healingPotions}/${getMaxHealingPotions(player.level)}).`, 'good');
  }

  if (Math.random() < 0.5) {
    const weaponDrops = player.magicType
      ? []
      : WEAPONS_DATABASE.filter(i => !i.isCatalyst).map(item => ({ item, weight: 1 }));
    const pool = [
      ...weaponDrops,
      ...getAvailableSpellDrops(player).map(s => ({ item: createSpellLootItem(s), weight: 1 })),
      ...TALISMAN_DATABASE.map(item => ({ item, weight: { regular: 0.5, epic: 0.25, legendary: 0.125 }[item.rarity] || 0.5 }))
    ];
    const total = pool.reduce((n, e) => n + e.weight, 0);
    let roll = Math.random() * total;
    const dropped = pool.find(e => (roll -= e.weight) < 0).item;
    gameState.droppedItem = dropped;
    const type = dropped.kind === 'talisman' ? 'Talisman' : dropped.kind === 'spell' ? 'Spell' : 'Item';
    const name = dropped.kind === 'talisman' ? talismanNameMarkup(dropped) : dropped.name;
    addLog(`${type} dropped: <strong class="highlight">${name}</strong>! The game is paused until you choose (left panel).`, 'good');
  }
  renderAllPanels();
}

// Gear can only be changed between fights (no swapping mid-combat)
function canManageGear() {
  return !enemy.data || enemy.hp <= 0;
}

// Core equip routine. Replaced gear goes to the backpack. Returns true on success.
// source: 'drop' or a backpack index
function equipItem(item, slot, source) {
  const p = player;
  const bp = gameState.backpack;
  const fromBackpack = Number.isInteger(source);
  const bpAfterRemoval = bp.length - (fromBackpack ? 1 : 0);
  const stash = [];

  if (item.kind === 'spell') {
    const spell = SPELLS_DATABASE.find(s => s.name === item.id);
    if (!spell || spell.type !== p.magicType || p.knownSpells.includes(spell.name)) {
      addLog(`You can't learn ${item.name} right now.`, 'alert');
      return false;
    }
    if (slot === 'learn' && p.knownSpells.length < getMaxKnownSpells(p)) {
      p.knownSpells.push(spell.name);
      addLog(`Learned <strong class="highlight">${spell.name}</strong>.`, 'good');
    } else {
      const idx = Number(String(slot).replace('spell-', ''));
      if (!String(slot).startsWith('spell-') || !Number.isInteger(idx) || idx < 0 || idx >= p.knownSpells.length) return false;
      addLog(`Forgot <strong>${p.knownSpells[idx]}</strong> and learned <strong class="highlight">${spell.name}</strong>.`, 'good');
      p.knownSpells[idx] = spell.name;
    }
  } else if (item.kind === 'talisman') {
    const idx = slot === 'talisman-1' ? 0 : slot === 'talisman-2' ? 1 : -1;
    if (idx < 0) return false;
    if (p.talismans.includes(item.id)) { addLog(`${item.name} is already equipped.`, 'info'); return false; }
    const prev = TALISMAN_DATABASE.find(t => t.id === p.talismans[idx]);
    if (prev) stash.push(prev);
    if (bpAfterRemoval + stash.length > BACKPACK_SIZE) { addLog('Backpack full: free a slot first.', 'alert'); return false; }
    p.talismans[idx] = item.id;
    p.basicAttackStreak = p.weaponAttackStreak = 0;
    recalcDerived(false);
    if (p.magicType && p.knownSpells.length > getMaxKnownSpells(p)) {
      const lost = p.knownSpells.splice(getMaxKnownSpells(p));
      addLog(`The reduced memory slots force you to forget ${lost.join(', ')}.`, 'alert');
    }
    addLog(`Equipped <strong>${talismanNameMarkup(item)}</strong> in Talisman Slot ${idx + 1}.`, 'good');
  } else if (slot === 'main') {
    if (p.mainHand) stash.push(p.mainHand);
    if (isColossalWeapon(item) && p.offHand) stash.push(p.offHand);
    if (bpAfterRemoval + stash.length > BACKPACK_SIZE) { addLog('Backpack full: free a slot first.', 'alert'); return false; }
    p.mainHand = item;
    p.basicAttackStreak = p.weaponAttackStreak = 0;
    if (isColossalWeapon(item)) {
      p.offHand = null;
      p.twoHanding = true;
      addLog('Colossal weapons force two-handing and lock the off-hand slot.', 'info');
    }
    addLog(`Equipped <strong class="highlight">${item.name}</strong> to Main-Hand.`, 'good');
  } else if (slot === 'off') {
    if (isColossalWeapon(p.mainHand) || isColossalWeapon(item)) {
      addLog('Colossal weapons cannot be equipped in the off-hand.', 'alert');
      return false;
    }
    if (p.offHand) stash.push(p.offHand);
    if (bpAfterRemoval + stash.length > BACKPACK_SIZE) { addLog('Backpack full: free a slot first.', 'alert'); return false; }
    p.offHand = item;
    p.twoHanding = false;
    p.basicAttackStreak = p.weaponAttackStreak = 0;
    addLog(`Equipped <strong class="highlight">${item.name}</strong> to Off-Hand.`, 'good');
  } else {
    return false;
  }

  if (fromBackpack) bp.splice(source, 1);
  stash.forEach(old => {
    bp.push(old);
    addLog(`${old.name} was moved to your backpack.`, 'info');
  });
  return true;
}

function equipDroppedItem(slot) {
  const item = gameState.droppedItem;
  if (!item) return;
  if (equipItem(item, slot, 'drop')) gameState.droppedItem = null;
  renderAllPanels();
}

function discardDroppedItem() {
  if (!gameState.droppedItem) return;
  addLog(`Discarded ${gameState.droppedItem.name}.`, 'info');
  gameState.droppedItem = null;
  renderAllPanels();
}

function storeDroppedItem() {
  const item = gameState.droppedItem;
  if (!item) return;
  if (gameState.backpack.length >= BACKPACK_SIZE) { addLog('Backpack full.', 'alert'); return; }
  gameState.backpack.push(item);
  gameState.droppedItem = null;
  addLog(`Stored <strong>${item.kind === 'talisman' ? talismanNameMarkup(item) : item.name}</strong> in your backpack.`, 'info');
  renderAllPanels();
}

function equipFromBackpack(index, slot) {
  const item = gameState.backpack[index];
  if (!item) return;
  if (!canManageGear()) { addLog('You can only change gear between fights.', 'alert'); return; }
  equipItem(item, slot, index);
  renderAllPanels();
}

function discardBackpackItem(index) {
  const item = gameState.backpack[index];
  if (!item) return;
  gameState.backpack.splice(index, 1);
  addLog(`Threw away ${item.name}.`, 'info');
  renderAllPanels();
}

function renderBackpack() {
  const box = document.getElementById('backpack-container');
  if (!box) return;
  const bp = gameState.backpack;
  setText('backpack-count', `${bp.length}/${BACKPACK_SIZE}`);
  if (!bp.length) {
    box.innerHTML = '<p class="empty-msg" style="margin:14px 8px;">Backpack is empty.</p>';
    return;
  }
  const st = getEffectiveStats(player);
  const manage = canManageGear();
  const dis = manage ? '' : 'disabled';

  box.innerHTML = bp.map((item, i) => {
    let name = item.name, sub = '', buttons = '';
    if (item.kind === 'talisman') {
      name = talismanNameMarkup(item);
      sub = item.description;
      buttons = `<button class="bp-btn" ${dis} ${tipAttr(equipTip(item, 'talisman-1'))} onclick="equipFromBackpack(${i}, 'talisman-1')">Slot 1</button>
                 <button class="bp-btn" ${dis} ${tipAttr(equipTip(item, 'talisman-2'))} onclick="equipFromBackpack(${i}, 'talisman-2')">Slot 2</button>`;
    } else if (item.kind === 'spell') {
      sub = item.description;
      const canLearn = item.id && SPELLS_DATABASE.find(s => s.name === item.id && s.type === player.magicType && !player.knownSpells.includes(s.name));
      if (!canLearn) buttons = '<span class="bp-note">Not learnable</span>';
      else if (player.knownSpells.length < getMaxKnownSpells(player)) buttons = `<button class="bp-btn" ${dis} ${tipAttr(equipTip(item, 'learn'))} onclick="equipFromBackpack(${i}, 'learn')">Learn</button>`;
      else buttons = player.knownSpells.map((n, k) => `<button class="bp-btn" ${dis} ${tipAttr(equipTip(item, 'spell-' + k))} onclick="equipFromBackpack(${i}, 'spell-${k}')">Replace ${k + 1}</button>`).join('');
    } else {
      sub = `${item.diceNum}d${item.diceSides}+${calculateWeaponBonus(item, st)} · ${getWeaponPrimaryStat(item).toUpperCase()} (${item.tier1})`;
      const offBlocked = isColossalWeapon(player.mainHand) || isColossalWeapon(item);
      buttons = `<button class="bp-btn" ${dis} ${tipAttr(equipTip(item, 'main'))} onclick="equipFromBackpack(${i}, 'main')">Main</button>
                 <button class="bp-btn" ${manage && !offBlocked ? '' : 'disabled'} ${tipAttr(equipTip(item, 'off'))} onclick="equipFromBackpack(${i}, 'off')">Off</button>`;
    }
    return `<div class="bp-item">
      <div class="bp-name" ${tipAttr(itemTip(item))}>${name}</div>
      <div class="bp-sub">${sub}</div>
      <div class="bp-actions">${buttons}<button class="bp-btn bp-del" ${tipAttr(`Permanently throw away ${item.name}.`)} onclick="discardBackpackItem(${i})">Drop</button></div>
    </div>`;
  }).join('');
}

// --- INPUT SYSTEM ---
const keys = {};
window.addEventListener('keydown', (e) => {
  if ((e.key === 'p' || e.key === 'P' || e.key === 'Escape') && !e.repeat) { togglePause(); return; }
  keys[e.key] = true;
  if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

// --- MAIN GAME LOOP ---
function gameLoop(time) {
  const dt = Math.min(0.05, (time - lastTime) / 1000);
  lastTime = time;
  update(dt);
  render(isFrozen() ? 0 : dt);
  requestAnimationFrame(gameLoop);
}

// --- LOGIC UPDATES ---
function restartGame() {
  // Death = full restart (fresh class selection), like the text crawler
  location.reload();
}

function resetStreaks() {
  player.aowStreak = 0;
  player.basicAttackStreak = 0;
  player.weaponAttackStreak = 0;
}

function update(dt) {
  if (player.dead) {
    player.deadTimer -= dt;
    if (player.deadTimer <= 0) restartGame();
    updateUI();
    return;
  }

  // Frozen while paused, or while a drop / stat point is waiting for a choice
  if (isFrozen()) {
    updateUI();
    return;
  }

  player.iFrames = Math.max(0, player.iFrames - dt);
  player.hitFlash = Math.max(0, player.hitFlash - dt);
  player.staggerTimer = Math.max(0, player.staggerTimer - dt);

  const k = Math.min(1, dt * 14);
  player.drawX += (player.x - player.drawX) * k;
  player.drawY += (player.y - player.drawY) * k;
  enemy.drawX += (enemy.x - enemy.drawX) * k;
  enemy.drawY += (enemy.y - enemy.drawY) * k;

  if (player.streakTimer > 0) {
    player.streakTimer -= dt;
    if (player.streakTimer <= 0) { player.basicAttackStreak = 0; player.weaponAttackStreak = 0; }
  }

  // Blocking (two-handed only)
  const w = player.mainHand;
  player.blocking = Boolean(
    player.twoHanding && w && !w.isCatalyst && (keys['b'] || keys['B']) &&
    player.actionTimer <= 0 && !player.isFatigued && player.staggerTimer <= 0
  );

  if (player.isFatigued) {
    player.fatigueTimer -= dt;
    if (player.fatigueTimer <= 0) player.isFatigued = false;
  } else if (player.actionTimer <= 0 && !player.blocking) {
    player.sp = Math.min(player.maxSp, player.sp + player.spRegen * dt);
  }
  player.fp = Math.min(player.maxFp, player.fp + player.fpRegen * dt);

  if (player.actionTimer > 0) {
    player.actionTimer -= dt;
    if (player.actionTimer <= 0) executePlayerAction();
  } else if (!player.isFatigued && player.staggerTimer <= 0 && !player.blocking) {
    handlePlayerInputs();
  }

  updateEnemyAI(dt);
  updateUI();
}

function isEnemyAt(x, y) {
  return enemy.data && enemy.hp > 0 && enemy.x === x && enemy.y === y;
}

function canDualStrike() {
  return !player.twoHanding && isDualWieldableWeapon(player.mainHand) && isDualWieldableWeapon(player.offHand);
}

function handlePlayerInputs() {
  let requestedDir = null;
  if (keys['w'] || keys['W'] || keys['ArrowUp']) requestedDir = DIRS.UP;
  else if (keys['s'] || keys['S'] || keys['ArrowDown']) requestedDir = DIRS.DOWN;
  else if (keys['a'] || keys['A'] || keys['ArrowLeft']) requestedDir = DIRS.LEFT;
  else if (keys['d'] || keys['D'] || keys['ArrowRight']) requestedDir = DIRS.RIGHT;

  const weapon = player.mainHand && !player.mainHand.isCatalyst ? player.mainHand : null;
  const rt = weapon ? getWeaponRT(weapon) : null;
  const atkCost = rt ? Math.round(rt.cost * (canDualStrike() ? 1.3 : 1)) : 0;

  // Free action: change stance
  if (keys['t'] || keys['T']) {
    keys['t'] = keys['T'] = false;
    if (weapon && !isColossalWeapon(weapon)) {
      player.twoHanding = !player.twoHanding;
      player.basicAttackStreak = player.weaponAttackStreak = 0;
      addLog(player.twoHanding ? 'Two-handed stance. Hold B to block.' : 'One-handed stance.', 'info');
      renderEquipment();
    }
  }

  // Spells: keys 1-6
  if (player.magicType) {
    for (let i = 0; i < player.knownSpells.length; i++) {
      if (!keys[String(i + 1)]) continue;
      keys[String(i + 1)] = false;
      const spell = SPELLS_DATABASE.find(s => s.name === player.knownSpells[i]);
      const srt = getSpellRT(spell);
      if (player.fp < srt.fpCost) { addLog(`Not enough FP for ${spell.name} (${srt.fpCost}).`, 'alert'); return; }
      if (player.sp < srt.spCost) return;
      player.fp -= srt.fpCost;
      player.pendingSpell = spell;
      triggerAction('CAST', srt.windup, srt.spCost);
      return;
    }
  }

  if (requestedDir && player.dir !== requestedDir && player.sp >= player.turnCost) {
    triggerAction('TURN', player.turnDuration, player.turnCost);
    player.targetDir = requestedDir;
  }
  else if ((keys['q'] || keys['Q']) && player.sp >= player.moveCost) {
    triggerAction('MOVE', player.moveDuration, player.moveCost);
  }
  else if (keys[' '] && player.sp >= player.rollCost) {
    keys[' '] = false;
    triggerAction('ROLL', player.rollDuration, player.rollCost);
    player.iFrames = 0.35;
    resetStreaks();
    const nx = player.x + player.dir.x;
    const ny = player.y + player.dir.y;
    if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !isEnemyAt(nx, ny)) {
      player.x = nx; player.y = ny;
    }
  }
  else if ((keys['e'] || keys['E'] || keys['j'] || keys['J'])) {
    if (weapon && player.sp >= atkCost) {
      triggerAction('ATTACK', rt.windup, atkCost);
    } else if (!weapon && player.magicType && player.knownSpells.length) {
      pressKey('1'); // casters: J casts the first spell
      keys['e'] = keys['E'] = keys['j'] = keys['J'] = false;
    }
  }
  else if ((keys['r'] || keys['R'] || keys['k'] || keys['K']) && weapon && player.fp >= 10 && player.sp >= 20) {
    triggerAction('AOW', rt.windup + 0.3, 20);
    player.fp -= 10;
  }
  else if ((keys['h'] || keys['H']) && player.healingPotions > 0 && player.hp < player.maxHp) {
    keys['h'] = keys['H'] = false;
    player.healingPotions -= 1;
    triggerAction('HEAL', 0.9, 0);
    renderPlayerStats();
  }
}

function triggerAction(actionType, duration, staminaCost) {
  player.pendingAction = actionType;
  player.actionDuration = duration;
  player.actionTimer = duration;
  player.sp -= staminaCost;
  if (actionType !== 'ATTACK') player.basicAttackStreak = 0;
  if (actionType !== 'ATTACK' && actionType !== 'AOW') player.weaponAttackStreak = 0;
  if (actionType !== 'AOW') player.aowStreak = 0;

  if (staminaCost > 0 && player.sp <= 0) {
    player.sp = 0;
    player.isFatigued = true;
    player.fatigueTimer = 1.0;
  }
}

function findEnemyInLine(range) {
  for (let i = 1; i <= range; i++) {
    const tx = player.x + player.dir.x * i;
    const ty = player.y + player.dir.y * i;
    if (isEnemyAt(tx, ty)) return { x: tx, y: ty, dist: i };
  }
  return null;
}

function lineCells(range) {
  const cells = [];
  for (let i = 1; i <= range; i++) {
    const x = player.x + player.dir.x * i, y = player.y + player.dir.y * i;
    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) cells.push({ x, y });
  }
  return cells;
}

function damageEnemy(amount, message) {
  enemy.hp = Math.max(0, enemy.hp - amount);
  enemy.flash = 0.15;
  if (!enemy.aggro) { enemy.aggro = true; enemy.reactionTimer = 0.2; }
  addLog(message, 'good');
  if (enemy.hp <= 0) onEnemyDefeated();
  renderStatusInfo();
}

function onEnemyDefeated() {
  enemy.isAttacking = false;
  enemy.targetCells = [];
  gameState.killCount += 1;
  gameState.awaitingChoice = true;
  addLog(`Defeated <strong class="highlight">${enemy.data.name}</strong>!`, 'good');
  if (enemy.isBoss && !gameState.bossesDefeated.includes(enemy.data.name)) gameState.bossesDefeated.push(enemy.data.name);
  gainXP(enemy.xp);
  triggerLootDrop();
}

function executePlayerAction() {
  const action = player.pendingAction;
  player.pendingAction = null;

  if (action === 'TURN') {
    player.dir = player.targetDir;
  }
  else if (action === 'MOVE') {
    const nx = player.x + player.dir.x;
    const ny = player.y + player.dir.y;
    if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !isEnemyAt(nx, ny)) {
      player.x = nx; player.y = ny;
    }
  }
  else if (action === 'HEAL') {
    const amount = Math.min(Math.ceil(player.maxHp * 0.5), player.maxHp - player.hp);
    player.hp += amount;
    addLog(`Used a Healing Flask and restored ${amount} HP.`, 'good');
    renderPlayerStats();
  }
  else if (action === 'ATTACK') {
    const w = player.mainHand;
    const stats = getEffectiveStats(player);
    const range = getWeaponRT(w).range;
    fx.push({ cells: lineCells(range), color: '255,255,255', t: 0.12 });
    const target = findEnemyInLine(range);
    if (!target) { player.basicAttackStreak = player.weaponAttackStreak = 0; return; }

    const r1 = applyWeaponTalismanDamage(player, w, rollDice(w.diceNum, w.diceSides, calculateWeaponBonus(w, stats)), false, 0);
    let total = r1.damage, bonus = r1.bonusDamage, label = w.name;
    if (canDualStrike()) {
      const o = player.offHand;
      const r2 = applyWeaponTalismanDamage(player, o, rollDice(o.diceNum, o.diceSides, calculateWeaponBonus(o, stats)), false, 1);
      total = Math.floor(r1.damage + r2.damage * stats.dex / 100);
      bonus += r2.bonusDamage;
      label = `Dual Strike (${w.name} + ${o.name})`;
      player.weaponAttackStreak += 2;
    } else {
      player.weaponAttackStreak += 1;
    }
    player.streakTimer = 2.5;
    const healed = applyConsecutiveAttackHealing(player);
    damageEnemy(total, `<strong>${label}</strong> hits ${enemy.data.name} for <span class="damage-text">${total}</span>${bonus ? ` (${bonus} talisman bonus)` : ''}.`);
    if (healed) addLog(`Cloth of the Godkillers restores ${healed} HP.`, 'good');
  }
  else if (action === 'AOW') {
    const w = player.mainHand;
    const stats = getEffectiveStats(player);
    const profile = getAshOfWarProfile(w, stats);
    const range = getWeaponRT(w).range + 2;
    fx.push({ cells: lineCells(range), color: '255,200,80', t: 0.18 });
    const target = findEnemyInLine(range);
    if (!target) { player.aowStreak = 0; return; }

    const fatigue = Math.max(0.25, 1 - player.aowStreak * 0.25);
    const rolled = rollDice(profile.diceNum, profile.diceSides, profile.bonus);
    const fatigued = Math.max(1, Math.floor(rolled * fatigue));
    const res = applyWeaponTalismanDamage(player, w, fatigued, true, 0);
    player.aowStreak += 1;
    player.weaponAttackStreak += 1;
    player.streakTimer = 2.5;
    const pen = Math.round((1 - fatigue) * 100);
    damageEnemy(res.damage, `<strong>Ash of War: ${w.aowName}</strong> (${profile.diceNum}d${profile.diceSides}+${profile.bonus}${pen ? `, fatigue -${pen}%` : ''}) hits for <span class="damage-text">${res.damage}</span>${res.bonusDamage ? ` (${res.bonusDamage} talisman bonus)` : ''}.`);
  }
  else if (action === 'CAST') {
    const spell = player.pendingSpell;
    player.pendingSpell = null;
    const stats = getEffectiveStats(player);
    const profile = getSpellAttackProfile(spell, stats);
    const range = getSpellRT(spell).range;
    const color = spell.type === 'sorcery' ? '120,160,255' : '255,170,90';
    fx.push({ cells: lineCells(range), color, t: 0.25 });
    resetStreaks();
    const target = findEnemyInLine(range);
    if (!target) { addLog(`${spell.name} misses.`, 'info'); return; }

    const rolled = rollDice(profile.diceNum, profile.diceSides, profile.bonus);
    const res = applySpellTalismanDamage(player, rolled);
    damageEnemy(res.damage, `Cast <strong class="magic-msg">${spell.name}</strong> (${profile.diceNum}d${profile.diceSides}+${profile.bonus}) for <span class="damage-text">${res.damage}</span> magic damage${res.bonusDamage ? ` (${res.bonusDamage} talisman bonus)` : ''}.`);
  }
}

// --- ENEMY AI: CHASE, POSITION & ATTACK ---
function enemyFacePlayer() {
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  if (Math.abs(dx) > Math.abs(dy)) enemy.dir = dx > 0 ? DIRS.RIGHT : DIRS.LEFT;
  else enemy.dir = dy > 0 ? DIRS.DOWN : DIRS.UP;
}

function enemyTryStep(mx, my) {
  const nx = enemy.x + mx;
  const ny = enemy.y + my;
  if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return false;
  if (nx === player.x && ny === player.y) return false;
  enemy.x = nx; enemy.y = ny;
  return true;
}

function startEnemyAttack(isFollowUp) {
  const d = enemy.data;
  enemyFacePlayer();
  if (!isFollowUp) enemy.comboLeft = d.combo;

  const windup = (ENEMY_BASE_WINDUP * (isFollowUp ? ENEMY_COMBO_WINDUP_FACTOR : 1)) / d.attackSpeed;
  enemy.isAttacking = true;
  enemy.attackTimer = windup;
  enemy.attackTotal = windup;

  enemy.targetCells = [];
  for (let i = 1; i <= d.range; i++) {
    const tx = enemy.x + enemy.dir.x * i;
    const ty = enemy.y + enemy.dir.y * i;
    if (tx >= 0 && tx < GRID_SIZE && ty >= 0 && ty < GRID_SIZE) enemy.targetCells.push({ x: tx, y: ty });
  }
}

function resolveEnemyAttack() {
  const d = enemy.data;
  const hit = enemy.targetCells.some(c => c.x === player.x && c.y === player.y);

  if (hit) {
    if (player.iFrames > 0) {
      addLog(`You dodge ${d.name}'s attack!`, 'info');
    } else {
      const [lo, hi] = getEnemyDmgRange();
      let dmg = randInt(lo, hi);
      let blocked = false;

      if (player.blocking) {
        blocked = true;
        const reduction = hasTalisman(player, 'pearlshield-talisman') ? 0.75 : 0.5;
        dmg = Math.ceil(dmg * (1 - reduction));
        player.sp -= Math.ceil(dmg * 1.5) + 4;
        if (player.sp <= 0) {
          player.sp = 0;
          player.isFatigued = true;
          player.fatigueTimer = 1.2;
          player.staggerTimer = 0.6;
          addLog('Your guard is broken!', 'alert');
        }
      }

      player.hp = Math.max(0, player.hp - dmg);
      player.hitFlash = 0.2;
      player.weaponAttackStreak = 0; // taking damage resets the successive-hit streak

      if (blocked) {
        addLog(`You block ${d.name}: ${dmg} damage taken.`, 'info');
      } else if (dmg > player.poise && player.actionTimer > 0) {
        player.actionTimer = 0;
        player.pendingAction = null;
        player.staggerTimer = 0.4;
        addLog(`STAGGERED! ${d.name} hits you for ${dmg}.`, 'alert');
      } else {
        addLog(`${d.name} hits you for ${dmg}.`, 'alert');
      }

      if (d.behavior === 'brute' && !blocked) {
        const kx = player.x + enemy.dir.x;
        const ky = player.y + enemy.dir.y;
        if (kx >= 0 && kx < GRID_SIZE && ky >= 0 && ky < GRID_SIZE && !isEnemyAt(kx, ky)) {
          player.x = kx; player.y = ky;
        }
      }

      if (player.hp <= 0) {
        player.dead = true;
        player.deadTimer = 3;
        enemy.isAttacking = false;
        enemy.targetCells = [];
        gameState.paused = false;
        addLog('<strong class="damage-text">YOU DIED</strong> - restarting...', 'alert');
        return;
      }
    }
  }

  enemy.comboLeft--;
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const aligned = dx === 0 || dy === 0;
  const dist = Math.abs(dx) + Math.abs(dy);

  if (enemy.comboLeft > 0 && aligned && dist >= 1 && dist <= d.range) {
    startEnemyAttack(true);
    return;
  }

  enemy.isAttacking = false;
  enemy.targetCells = [];
  enemy.comboLeft = 0;
  enemy.recoverTimer = ENEMY_BASE_RECOVERY / d.attackSpeed;
  enemy.moveTimer = 0.15;
  if (d.behavior === 'lurker') enemy.retreatSteps = 2;
}

function updateEnemyAI(dt) {
  if (!enemy.data || enemy.hp <= 0) return;
  const d = enemy.data;

  enemy.flash = Math.max(0, enemy.flash - dt);

  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const ax = Math.abs(dx), ay = Math.abs(dy);
  const dist = ax + ay;
  const aligned = ax === 0 || ay === 0;
  const stepInterval = 1 / d.moveSpeed;
  const noticeRange = d.aggroRange + 5;

  if (enemy.isAttacking) {
    enemy.attackTimer -= dt;
    if (enemy.attackTimer <= 0) resolveEnemyAttack();
    return;
  }

  if (enemy.recoverTimer > 0) enemy.recoverTimer -= dt;

  if (!enemy.aggro) {
    enemy.idleTime += dt;
    if (dist <= noticeRange || enemy.idleTime > 3) {
      enemy.idleTime = 0;
      enemy.aggro = true;
      enemy.reactionTimer = 0.35;
      addLog(`${d.name} notices you!`, 'alert');
    } else {
      enemy.wanderTimer -= dt;
      if (enemy.wanderTimer <= 0) {
        enemy.wanderTimer = 1 + Math.random() * 1.5;
        const dirs = Object.values(DIRS);
        const w = dirs[Math.floor(Math.random() * dirs.length)];
        enemy.dir = w;
        enemyTryStep(w.x, w.y);
      }
      return;
    }
  } else if (dist > noticeRange + 6) {
    enemy.aggro = false;
    return;
  }

  if (enemy.reactionTimer > 0) {
    enemy.reactionTimer -= dt;
    enemyFacePlayer();
    return;
  }

  if (enemy.retreatSteps > 0) {
    enemy.moveTimer -= dt;
    if (enemy.moveTimer <= 0) {
      const away = ax >= ay ? { x: -Math.sign(dx), y: 0 } : { x: 0, y: -Math.sign(dy) };
      if (enemyTryStep(away.x, away.y)) enemy.moveTimer = stepInterval * 0.7;
      else enemy.retreatSteps = 0;
      enemy.retreatSteps--;
    }
    enemyFacePlayer();
    return;
  }

  if (aligned && dist >= 1 && dist <= d.range && enemy.recoverTimer <= 0) {
    startEnemyAttack(false);
    return;
  }

  if (d.behavior === 'brute' && enemy.recoverTimer > 0 && aligned && dist <= d.range) {
    enemyFacePlayer();
    return;
  }

  enemy.moveTimer -= dt;
  if (enemy.moveTimer > 0) { enemyFacePlayer(); return; }

  const sx = Math.sign(dx), sy = Math.sign(dy);
  let primary = null, secondary = null;

  if (d.behavior === 'ranged' && aligned && dist < d.range) {
    primary = { x: -sx, y: -sy };
  } else if (!aligned) {
    if (ax <= ay) { primary = { x: sx, y: 0 }; secondary = { x: 0, y: sy }; }
    else          { primary = { x: 0, y: sy }; secondary = { x: sx, y: 0 }; }
  } else if (dist > d.range) {
    primary = { x: sx, y: sy };
  }

  if (primary) {
    const moved = enemyTryStep(primary.x, primary.y) || (secondary && enemyTryStep(secondary.x, secondary.y));
    let interval = stepInterval;
    if (d.behavior === 'rush' && aligned && dist > d.range && dist <= 4) interval *= 0.4;
    enemy.moveTimer = moved ? interval : 0.15;
  }
  enemyFacePlayer();
}

function updateUI() {
  setBar('hp-bar', player.hp / player.maxHp);
  setBar('sp-bar', player.sp / player.maxSp);
  setBar('fp-bar', player.fp / player.maxFp);
  setText('hp-text', `${Math.ceil(player.hp)} / ${player.maxHp}`);
  setText('sp-text', `${Math.ceil(player.sp)} / ${player.maxSp}`);
  setText('fp-text', `${Math.ceil(player.fp)} / ${player.maxFp}`);
}

// --- RENDER LOGIC ---
function render(dt = 0.016) {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#252a37';
  ctx.lineWidth = 1;
  for (let x = 0; x < GRID_SIZE; x++)
    for (let y = 0; y < GRID_SIZE; y++)
      ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

  if (!player.dead && player.mainHand) {
    const range = player.mainHand.isCatalyst ? 0 : getWeaponRT(player.mainHand).range;
    ctx.fillStyle = 'rgba(0, 180, 216, 0.22)';
    lineCells(range).forEach(c => ctx.fillRect(c.x * TILE_SIZE, c.y * TILE_SIZE, TILE_SIZE, TILE_SIZE));
  }

  // Player attack flashes
  for (let i = fx.length - 1; i >= 0; i--) {
    const f = fx[i];
    f.t -= dt;
    if (f.t <= 0) { fx.splice(i, 1); continue; }
    ctx.fillStyle = `rgba(${f.color}, ${Math.min(0.5, f.t * 3)})`;
    f.cells.forEach(c => ctx.fillRect(c.x * TILE_SIZE, c.y * TILE_SIZE, TILE_SIZE, TILE_SIZE));
  }

  if (enemy.isAttacking && enemy.hp > 0) {
    const progress = 1 - Math.max(0, enemy.attackTimer) / enemy.attackTotal;
    ctx.fillStyle = `rgba(230, 57, 70, ${0.15 + 0.35 * progress})`;
    enemy.targetCells.forEach(c => ctx.fillRect(c.x * TILE_SIZE, c.y * TILE_SIZE, TILE_SIZE, TILE_SIZE));
    if (enemy.targetCells.length > 0) {
      const c = enemy.targetCells[0];
      ctx.fillStyle = '#ffd6d6';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.max(0, enemy.attackTimer).toFixed(1) + 's', c.x * TILE_SIZE + TILE_SIZE / 2, c.y * TILE_SIZE + TILE_SIZE / 2);
    }
  }

  if (!player.dead) {
    const dodging = player.iFrames > 0;
    const color = player.hitFlash > 0 ? '#ffffff' : (dodging ? 'rgba(0,180,216,0.4)' : '#00b4d8');
    drawTriangle(player.drawX, player.drawY, player.dir, color);

    const px = player.drawX * TILE_SIZE + TILE_SIZE / 2;
    const py = player.drawY * TILE_SIZE + TILE_SIZE / 2;
    if (player.actionTimer > 0) {
      const pct = player.actionTimer / player.actionDuration;
      ctx.beginPath();
      ctx.arc(px, py, TILE_SIZE / 2 - 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
      ctx.strokeStyle = '#f0a500';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    if (player.blocking) {
      ctx.beginPath();
      ctx.arc(px, py, TILE_SIZE / 2 - 2, 0, Math.PI * 2);
      ctx.strokeStyle = '#9ad1ff';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  }

  if (enemy.data && enemy.hp > 0) {
    let color = enemy.aggro ? (enemy.isBoss ? '#c0392b' : '#e63946') : '#8a3a40';
    if (enemy.isAttacking) color = '#ff9a3c';
    if (enemy.flash > 0) color = '#ffffff';
    drawTriangle(enemy.drawX, enemy.drawY, enemy.dir, color, enemy.isBoss ? 1.25 : 1);

    const ex = enemy.drawX * TILE_SIZE;
    const ey = enemy.drawY * TILE_SIZE;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(ex + 4, ey + 2, TILE_SIZE - 8, 5);
    ctx.fillStyle = enemy.isBoss ? '#f7c974' : '#e63946';
    ctx.fillRect(ex + 4, ey + 2, (TILE_SIZE - 8) * (enemy.hp / enemy.maxHp), 5);
    ctx.fillStyle = enemy.isBoss ? '#f7c974' : '#edf3ff';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(enemy.data.name, ex + TILE_SIZE / 2, ey - 2);
  }

  if (player.dead) {
    drawOverlay('YOU DIED', 'Restarting...', '#c0392b');
  } else if (gameState.paused) {
    drawOverlay('PAUSED', 'Press P to resume', '#edf3ff');
  } else if (gameState.droppedItem) {
    drawOverlay('ITEM DROPPED', 'Choose an option in the left panel', '#f7c974');
  } else if (gameState.pendingStatPoints > 0) {
    drawOverlay('LEVEL UP', 'Spend your stat point in the right panel', '#f7c974');
  } else if (gameState.awaitingChoice) {
    drawOverlay('VICTORY', 'Choose your next fight (right panel)', '#73f7a4', 0.35);
  }
}

function drawOverlay(title, sub, color, alpha = 0.6) {
  ctx.fillStyle = `rgba(0,0,0,${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = 'bold 38px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 12);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#edf3ff';
  ctx.fillText(sub, canvas.width / 2, canvas.height / 2 + 22);
}

function drawTriangle(gridX, gridY, dir, color, scale = 1) {
  const cx = gridX * TILE_SIZE + TILE_SIZE / 2;
  const cy = gridY * TILE_SIZE + TILE_SIZE / 2;
  const radius = (TILE_SIZE / 3) * scale;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(dir.angle);
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(radius * 0.8, radius * 0.8);
  ctx.lineTo(-radius * 0.8, radius * 0.8);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

window.addEventListener('DOMContentLoaded', () => {
  initClassSelection();
  initTooltips();
});