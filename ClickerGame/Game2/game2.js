/**
 * Elden Ring Text Dungeon Crawler Engine
 */

// --- SCALING MULTIPLIERS ---
const SCALING_TIERS = {
    E: 0.10,
    D: 0.25,
    C: 0.50,
    B: 0.75,
    A: 1.00,
    S: 1.40
};

// --- ELDEN RING 10 BASE CLASSES ---
const CLASSES = {
    vagabond:  { name: "Vagabond",  level: 9,  vig: 15, mnd: 10, end: 11, str: 14, dex: 13, int: 9,  fai: 9,  arc: 7,  weaponId: 11 }, // Longsword
    warrior:   { name: "Warrior",   level: 8,  vig: 11, mnd: 12, end: 11, str: 10, dex: 16, int: 10, fai: 8,  arc: 9,  weaponId: 18 }, // Scimitar
    hero:      { name: "Hero",      level: 7,  vig: 14, mnd: 9,  end: 12, str: 16, dex: 9,  int: 7,  fai: 8,  arc: 11, weaponId: 36 }, // Battle Axe
    bandit:    { name: "Bandit",    level: 5,  vig: 10, mnd: 11, end: 10, str: 9,  dex: 13, int: 9,  fai: 8,  arc: 14, weaponId: 0 },  // Great Knife
    astrologer:{ name: "Astrologer",level: 6,  vig: 9,  mnd: 15, end: 9,  str: 8,  dex: 12, int: 16, fai: 7,  arc: 9,  weaponId: 1 },  // Shortsword
    prophet:   { name: "Prophet",   level: 7,  vig: 10, mnd: 14, end: 8,  str: 11, dex: 10, int: 7,  fai: 16, arc: 11, weaponId: 1 },  // Shortsword
    samurai:   { name: "Samurai",   level: 9,  vig: 12, mnd: 11, end: 13, str: 12, dex: 15, int: 9,  fai: 8,  arc: 8,  weaponId: 8 },  // Uchigatana
    prisoner:  { name: "Prisoner",  level: 9,  vig: 11, mnd: 12, end: 11, str: 11, dex: 14, int: 14, fai: 6,  arc: 9,  weaponId: 23 }, // Estoc
    confessor: { name: "Confessor", level: 10, vig: 10, mnd: 13, end: 10, str: 12, dex: 12, int: 9,  fai: 14, arc: 9,  weaponId: 10 }, // Broadsword
    wretch:    { name: "Wretch",    level: 1,  vig: 10, mnd: 10, end: 10, str: 10, dex: 10, int: 10, fai: 10, arc: 10, weaponId: 1 }   // Shortsword
};

// --- FULL 50 WEAPON ROSTER ---
const WEAPONS_DATABASE = [
    // Daggers & Light (0-7)
    { id: 0, name: "Great Knife", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "B", stat2: "arc", tier2: "D", aowName: "Blood Slash", aowDice: 1, aowSides: 8 },
    { id: 1, name: "Shortsword", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "D", stat2: "dex", tier2: "D", aowName: "Impaling Thrust", aowDice: 1, aowSides: 8 },
    { id: 2, name: "Parrying Dagger", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Parry Strike", aowDice: 1, aowSides: 6 },
    { id: 3, name: "Misericorde", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Critical Thrust", aowDice: 1, aowSides: 10 },
    { id: 4, name: "Wakizashi", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Blade Rush", aowDice: 1, aowSides: 8 },
    { id: 5, name: "Cinquedea", diceNum: 1, diceSides: 6, ap: 1, stat1: "str", tier1: "S", tier2: null, aowName: "Beastial Slice", aowDice: 1, aowSides: 8 },
    { id: 6, name: "Scorpion’s Stinger", diceNum: 1, diceSides: 4, ap: 1, stat1: "dex", tier1: "B", stat2: "arc", tier2: "C", aowName: "Toxic Sting", aowDice: 1, aowSides: 6 },
    { id: 7, name: "Celebration’s Sickle", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "C", tier2: null, aowName: "Harvest Flail", aowDice: 1, aowSides: 8 },

    // Katanas & Straight Swords (8-17)
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

    // Curved & Thrusting (18-25)
    { id: 18, name: "Scimitar", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "E", aowName: "Spinning Slash", aowDice: 1, aowSides: 8 },
    { id: 19, name: "Falchion", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Vacuum Slice", aowDice: 1, aowSides: 10 },
    { id: 20, name: "Grossmesser", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", tier2: null, aowName: "Heavy Cleave", aowDice: 1, aowSides: 10 },
    { id: 21, name: "Bandit’s Curved Sword", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "S", tier2: null, aowName: "Bloodblade Dance", aowDice: 1, aowSides: 8 },
    { id: 22, name: "Rapier", diceNum: 1, diceSides: 6, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Repeating Thrust", aowDice: 1, aowSides: 6 },
    { id: 23, name: "Estoc", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Shield Crash", aowDice: 1, aowSides: 8 },
    { id: 24, name: "Cleanrot Knight’s Sword", diceNum: 1, diceSides: 8, ap: 1, stat1: "dex", tier1: "B", stat2: "fai", tier2: "D", aowName: "Sacred Phalanx", aowDice: 1, aowSides: 10 },
    { id: 25, name: "Great Epee", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Giant Hunt", aowDice: 1, aowSides: 12 },

    // Greatswords & Colossals (26-34)
    { id: 26, name: "Claymore", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Lion’s Claw", aowDice: 1, aowSides: 12 },
    { id: 27, name: "Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Stamp (Upward Cut)", aowDice: 2, aowSides: 10 },
    { id: 28, name: "Zweihänder", diceNum: 3, diceSides: 6, ap: 2, stat1: "str", tier1: "A", stat2: "dex", tier2: "D", aowName: "Waves of Darkness", aowDice: 1, aowSides: 12 },
    { id: 29, name: "Flamberge", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Bloody Slash", aowDice: 1, aowSides: 10 },
    { id: 30, name: "Knight’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "dex", tier1: "A", tier2: null, aowName: "Spinning Slash", aowDice: 1, aowSides: 10 },
    { id: 31, name: "Banished Knight’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Impaling Thrust", aowDice: 1, aowSides: 12 },
    { id: 32, name: "Lordsworn’s Greatsword", diceNum: 2, diceSides: 6, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Upward Slash", aowDice: 1, aowSides: 10 },
    { id: 33, name: "Troll’s Golden Sword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "A", tier2: null, aowName: "Troll’s Roar", aowDice: 2, aowSides: 8 },
    { id: 34, name: "Royal Greatsword", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "B", stat2: "int", tier2: "C", aowName: "Wolf’s Assault", aowDice: 2, aowSides: 10 },

    // Axes & Hammers (35-42)
    { id: 35, name: "Crescent Axe", diceNum: 1, diceSides: 12, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "C", aowName: "War Cry", aowDice: 2, aowSides: 6 },
    { id: 36, name: "Battle Axe", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Wild Strikes", aowDice: 1, aowSides: 8 },
    { id: 37, name: "Highland Axe", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Barbaric Roar", aowDice: 1, aowSides: 10 },
    { id: 38, name: "Executioner’s Greataxe", diceNum: 2, diceSides: 8, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Heavy Chop", aowDice: 2, aowSides: 10 },
    { id: 39, name: "Warhammer", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Ground Slam", aowDice: 1, aowSides: 12 },
    { id: 40, name: "Mace", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "A", tier2: null, aowName: "Endure Strike", aowDice: 1, aowSides: 8 },
    { id: 41, name: "Morning Star", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "arc", tier2: "D", aowName: "Heavy Spike", aowDice: 1, aowSides: 10 },
    { id: 42, name: "Flail", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Spinning Chain", aowDice: 1, aowSides: 8 },

    // Polearms & Spears (43-49)
    { id: 43, name: "Cross-Naginata", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Repeating Thrust", aowDice: 1, aowSides: 6 },
    { id: 44, name: "Pike", diceNum: 1, diceSides: 8, ap: 1, stat1: "str", tier1: "B", stat2: "dex", tier2: "D", aowName: "Charge", aowDice: 1, aowSides: 10 },
    { id: 45, name: "Partisan", diceNum: 1, diceSides: 10, ap: 1, stat1: "str", tier1: "C", stat2: "dex", tier2: "C", aowName: "Spectral Lance", aowDice: 1, aowSides: 8 },
    { id: 46, name: "Nightrider Glaive", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Phantom Slash", aowDice: 2, aowSides: 8 },
    { id: 47, name: "Lucerne", diceNum: 1, diceSides: 10, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "C", aowName: "Giant Hunt", aowDice: 1, aowSides: 12 },
    { id: 48, name: "Gargoyle’s Halberd", diceNum: 2, diceSides: 6, ap: 2, stat1: "str", tier1: "S", tier2: null, aowName: "Vacuum Slice", aowDice: 2, aowSides: 6 },
    { id: 49, name: "Vulgar Militia Saw", diceNum: 1, diceSides: 12, ap: 1, stat1: "dex", tier1: "B", stat2: "str", tier2: "D", aowName: "Serrated Slash", aowDice: 1, aowSides: 10 }
];

const MONSTERS = [
    { name: "Godrick Soldier", hp: 14, dice: 1, sides: 6, bonus: 1, xp: 25 },
    { name: "Kaiden Sellsword", hp: 26, dice: 1, sides: 8, bonus: 2, xp: 50 },
    { name: "Omen Brawler", hp: 50, dice: 2, sides: 6, bonus: 3, xp: 110 }
];

let gameState = {
    player: null,
    enemy: null,
    droppedItem: null,
    pendingStatPoint: false
};

// --- FORMULAS ---

function calculateMaxHp(vig) {
    return 10 + (vig * 2);
}

function calculateMaxAp(end) {
    return 2 + Math.floor(end / 5);
}

function calculateScaledHp(baseHp, level) {
    const multiplier = 1 + (level - 1) * 0.25;
    return Math.ceil(baseHp * multiplier);
}

function calculateWeaponBonus(weapon, stats) {
    if (!weapon) return 0;

    let bonus = 0;
    if (weapon.stat1 && weapon.tier1) {
        const val = stats[weapon.stat1] || 0;
        bonus += val * SCALING_TIERS[weapon.tier1];
    }
    if (weapon.stat2 && weapon.tier2) {
        const val = stats[weapon.stat2] || 0;
        bonus += val * SCALING_TIERS[weapon.tier2];
    }
    return Math.floor(bonus);
}

function rollDice(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
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
    try {
        localStorage.setItem("er_dungeon_save", JSON.stringify(gameState));
    } catch (e) {
        console.error("Save failed", e);
    }
}

function loadGame() {
    const savedData = localStorage.getItem("er_dungeon_save");
    if (savedData) {
        try {
            gameState = JSON.parse(savedData);
            log("Saved game loaded.", "system-msg");
            return true;
        } catch (e) {
            console.error("Save corrupted.", e);
            return false;
        }
    }
    return false;
}

function resetGame() {
    localStorage.removeItem("er_dungeon_save");
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
        stats: {
            vig: base.vig,
            mnd: base.mnd,
            end: base.end,
            str: base.str,
            dex: base.dex,
            int: base.int,
            fai: base.fai,
            arc: base.arc
        },
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
    let maxIdx = 0;
    if (playerLevel >= 12) maxIdx = 1;
    if (playerLevel >= 20) maxIdx = 2;

    const template = MONSTERS[Math.floor(Math.random() * (maxIdx + 1))];
    const scaledHp = calculateScaledHp(template.hp, playerLevel);

    gameState.enemy = {
        name: template.name,
        maxHp: scaledHp,
        currentHp: scaledHp,
        dice: template.dice,
        sides: template.sides,
        bonus: template.bonus,
        xp: template.xp + (playerLevel * 2)
    };

    log(`Encountered <strong class="damage-text">${gameState.enemy.name}</strong> (${gameState.enemy.currentHp} HP)!`);
}

function gainXP(amount) {
    const p = gameState.player;
    p.xp += amount;
    log(`Obtained <span class="highlight">${amount} Runes (XP)</span>.`, "system-msg");

    if (p.xp >= p.maxXp) {
        levelUp();
    }
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

    // Recalculate derivative stats
    p.maxHp = calculateMaxHp(p.stats.vig);
    p.currentHp = p.maxHp;
    p.maxAp = calculateMaxAp(p.stats.end);
    p.currentAp = p.maxAp;

    log(`Increased <span class="highlight">${statKey.toUpperCase()}</span> to ${p.stats[statKey]}. HP & AP fully restored!`, "system-msg");

    saveGame();
    renderUI();
}

function triggerLootDrop() {
    if (Math.random() < 0.60) {
        const randWeapon = WEAPONS_DATABASE[Math.floor(Math.random() * WEAPONS_DATABASE.length)];
        gameState.droppedItem = randWeapon;
        log(`🎁 Monster dropped: <strong class="highlight">${randWeapon.name}</strong>! Inspect left panel.`, "system-msg");
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

    const damage = rollDice(e.dice, e.sides) + e.bonus;
    p.currentHp = Math.max(0, p.currentHp - damage);

    log(`The <strong>${e.name}</strong> attacks for <span class="damage-text">${damage} damage</span>!`);

    if (p.currentHp <= 0) {
        log(`☠️ <strong class="damage-text">YOU DIED</strong>`, "system-msg");
        setTimeout(() => resetGame(), 3000);
    }
}

function checkEnemyDefeated() {
    const e = gameState.enemy;
    if (e && e.currentHp <= 0) {
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

// --- ATTACK EXECUTION ---

function executeSingleAttack(slot) {
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
    const p = gameState.player;
    const e = gameState.enemy;

    if (!p.mainHand || !p.offHand) return;

    const dualAp = p.mainHand.ap + 1;
    if (p.currentAp < dualAp) {
        log(`Not enough AP for Dual-Wield strike! Requires ${dualAp} AP.`, "system-msg");
        return;
    }

    const bonus1 = calculateWeaponBonus(p.mainHand, p.stats);
    const bonus2 = calculateWeaponBonus(p.offHand, p.stats);

    const dmg1 = rollDice(p.mainHand.diceNum, p.mainHand.diceSides) + bonus1;
    const dmg2 = rollDice(p.offHand.diceNum, p.offHand.diceSides) + bonus2;
    const totalDmg = dmg1 + dmg2;

    p.currentAp -= dualAp;
    e.currentHp = Math.max(0, e.currentHp - totalDmg);

    log(`<strong>Dual-Wield Strike</strong> (${p.mainHand.name} + ${p.offHand.name}) dealt <span class="damage-text">${totalDmg} damage</span>!`);

    if (!checkEnemyDefeated() && p.currentAp === 0) {
        enemyTurn();
        p.currentAp = p.maxAp;
    }

    saveGame();
    renderUI();
}

function executeAshOfWar(slot) {
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

    log(`<strong>Ash of War: ${weapon.aowName}</strong> (${remainingAp} AP spent) dealt <span class="damage-text">${totalDmg} damage</span>!`);

    if (!checkEnemyDefeated()) {
        enemyTurn();
        p.currentAp = p.maxAp;
    }

    saveGame();
    renderUI();
}

function passTurn() {
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

    // 3. Loot Panel
    if (gameState.droppedItem) {
        const item = gameState.droppedItem;
        const tempBonus = calculateWeaponBonus(item, p.stats);
        dropElem.innerHTML = `
            <div class="item-card">
                <div class="item-name">${item.name}</div>
                <div class="item-stats">
                    Base: ${item.diceNum}d${item.diceSides}+${tempBonus}<br>
                    Scales: ${item.stat1.toUpperCase()} (${item.tier1}) ${item.stat2 ? '/ ' + item.stat2.toUpperCase() + ' (' + item.tier2 + ')' : ''}
                </div>
                <button class="btn btn-success" onclick="equipDroppedItem('main')">Equip Main-Hand</button>
                <button class="btn btn-success" onclick="equipDroppedItem('off')">Equip Off-Hand</button>
                <button class="btn btn-danger" style="margin-left:0;" onclick="discardDroppedItem()">Discard</button>
            </div>
        `;
    } else {
        dropElem.innerHTML = `<p class="empty-msg">No item dropped. Defeat monsters to find gear.</p>`;
    }

    // 4. Level-Up Stat Panel
    if (gameState.pendingStatPoint) {
        levelPanel.classList.remove("hidden");
        statButtons.innerHTML = "";
        ['vig', 'mnd', 'end', 'str', 'dex', 'int', 'fai', 'arc'].forEach(s => {
            statButtons.innerHTML += `<button class="btn" onclick="allocateStat('${s}')">+1 ${s.toUpperCase()} (${p.stats[s]})</button>`;
        });
    } else {
        levelPanel.classList.add("hidden");
    }

    // 5. Stats Header Display
    statsElem.innerHTML = `
        <div class="stat-item">Class: <span class="stat-value">${p.className}</span></div>
        <div class="stat-item">Lvl: <span class="stat-value">${p.level}</span></div>
        <div class="stat-item">XP: <span class="stat-value">${p.xp}/${p.maxXp}</span></div>
        <div class="stat-item">HP: <span class="stat-value stat-hp">${p.currentHp}/${p.maxHp}</span></div>
        <div class="stat-item">AP: <span class="stat-value">${p.currentAp}/${p.maxAp}</span></div>
        <div class="stat-item">STR: <span class="stat-value">${p.stats.str}</span> DEX: <span class="stat-value">${p.stats.dex}</span> END: <span class="stat-value">${p.stats.end}</span> ARC: <span class="stat-value">${p.stats.arc}</span></div>
        <div class="stat-item">Target: <span class="damage-text">${e ? e.name : 'None'} (${e ? e.currentHp : 0}/${e ? e.maxHp : 0} HP)</span></div>
    `;

    // 6. Action Buttons (*d*+* for *AP)
    if (p.currentHp > 0) {
        if (p.mainHand) {
            const b1 = calculateWeaponBonus(p.mainHand, p.stats);
            const label1 = formatDiceLabel(p.mainHand.name, p.mainHand.diceNum, p.mainHand.diceSides, b1, p.mainHand.ap);
            actionsElem.innerHTML += `<button class="btn" onclick="executeSingleAttack('main')">${label1}</button>`;

            const aowLabel1 = formatDiceLabel(`AoW: ${p.mainHand.aowName}`, p.mainHand.aowDice, p.mainHand.aowSides, b1, "All");
            actionsElem.innerHTML += `<button class="btn" onclick="executeAshOfWar('main')">${aowLabel1}</button>`;
        }

        if (p.offHand) {
            const b2 = calculateWeaponBonus(p.offHand, p.stats);
            const label2 = formatDiceLabel(`Off: ${p.offHand.name}`, p.offHand.diceNum, p.offHand.diceSides, b2, p.offHand.ap);
            actionsElem.innerHTML += `<button class="btn" onclick="executeSingleAttack('off')">${label2}</button>`;
        }

        if (p.mainHand && p.offHand) {
            const b1 = calculateWeaponBonus(p.mainHand, p.stats);
            const b2 = calculateWeaponBonus(p.offHand, p.stats);
            const dualCost = p.mainHand.ap + 1;
            const dualDiceNum = p.mainHand.diceNum + p.offHand.diceNum;
            const dualSides = p.mainHand.diceSides;
            const dualBonus = b1 + b2;

            const dualLabel = formatDiceLabel("Dual Attack", dualDiceNum, dualSides, dualBonus, dualCost);
            actionsElem.innerHTML += `<button class="btn" onclick="executeDualAttack()">${dualLabel}</button>`;
        }

        actionsElem.innerHTML += `<button class="btn" onclick="passTurn()">End Turn</button>`;
    }

    actionsElem.innerHTML += `<button class="btn btn-danger" onclick="resetGame()">Reset Game</button>`;
}

// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
    loadGame();
    renderUI();
});