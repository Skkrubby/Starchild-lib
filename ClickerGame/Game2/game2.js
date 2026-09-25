/**
 * Dungeon Crawler Game Engine v3.1
 * Features: Basic Monsters (Goblin, Skeleton, Orc), Leveling, AP Scaling & Persistence
 */

// --- CLASS DATA TEMPLATES ---
const CLASSES = {
    warrior: {
        name: "Warrior",
        baseHp: 20,
        hpPerLevel: 5,
        weapon: {
            name: "Iron Broadsword",
            isCatalyst: false,
            basicAttack: { name: "Sword Strike", diceNum: 2, diceSides: 6, bonus: 2 },
            ashOfWar: { name: "Wild Strikes", diceNum: 1, diceSides: 8, bonus: 1 }
        },
        spells: []
    },
    mage: {
        name: "Mage",
        baseHp: 12,
        hpPerLevel: 3,
        weapon: {
            name: "Apprentice Catalyst Staff",
            isCatalyst: true,
            basicAttack: { name: "Staff Bonk", diceNum: 1, diceSides: 4, bonus: 0 }
        },
        spells: [
            { name: "Firebolt", costAP: 1, diceNum: 1, diceSides: 8, bonus: 2 },
            { name: "Fireball", costAP: 2, diceNum: 3, diceSides: 6, bonus: 0 }
        ]
    }
};

// --- MONSTER DATABASE ---
const MONSTER_TYPES = [
    { 
        name: "Goblin", 
        hp: 10, 
        atkDice: 1, 
        atkSides: 4, 
        atkBonus: 0, 
        xpReward: 20,
        description: "A sneaky little creature armed with a crude dagger."
    },
    { 
        name: "Skeleton", 
        hp: 18, 
        atkDice: 1, 
        atkSides: 6, 
        atkBonus: 1, 
        xpReward: 40,
        description: "An animated pile of bones clutching a rusted shortsword."
    },
    { 
        name: "Orc", 
        hp: 35, 
        atkDice: 2, 
        atkSides: 6, 
        atkBonus: 2, 
        xpReward: 85,
        description: "A hulking brute wielding a massive greataxe."
    }
];

// --- GLOBAL GAME STATE ---
let gameState = {
    player: null,
    enemy: null
};

// --- SYSTEM FORMULAS ---

/**
 * AP Progression Rule:
 * Level 1-2: 3 AP
 * Level 3-4: 4 AP (+1 at 3)
 * Level 5-6: 5 AP (+1 at 5)
 * Level 7-8: 6 AP (+1 at 7)...
 */
function calculateMaxAP(level) {
    if (level < 3) return 3;
    return 3 + Math.floor((level - 1) / 2);
}

// XP needed to reach next level
function getXpForNextLevel(level) {
    return level * 50;
}

// DnD Dice Roller (e.g., 2d6 + 2)
function rollDice(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

// Console logger
function log(message, type = "combat-msg") {
    const consoleElem = document.getElementById("console");
    const p = document.createElement("p");
    p.className = type;
    p.innerHTML = `> ${message}`;
    consoleElem.appendChild(p);
    consoleElem.scrollTop = consoleElem.scrollHeight;
}

// --- LOCAL STORAGE MANAGER ---

function saveGame() {
    try {
        localStorage.setItem("dungeon_crawler_save", JSON.stringify(gameState));
    } catch (e) {
        console.error("Could not save game state", e);
    }
}

function loadGame() {
    const savedData = localStorage.getItem("dungeon_crawler_save");
    if (savedData) {
        try {
            gameState = JSON.parse(savedData);
            log("Saved game loaded successfully.", "system-msg");
            return true;
        } catch (e) {
            console.error("Corrupted save data.", e);
            return false;
        }
    }
    return false;
}

function resetGame() {
    localStorage.removeItem("dungeon_crawler_save");
    location.reload();
}

// --- CHARACTER CREATION & LEVELING ---

function selectClass(classKey) {
    const baseClass = CLASSES[classKey];
    if (!baseClass) return;

    gameState.player = {
        classKey: classKey,
        className: baseClass.name,
        level: 1,
        xp: 0,
        maxXp: getXpForNextLevel(1),
        maxHp: baseClass.baseHp,
        currentHp: baseClass.baseHp,
        maxAp: calculateMaxAP(1),
        currentAp: calculateMaxAP(1),
        weapon: baseClass.weapon,
        spells: baseClass.spells
    };

    log(`You entered the dungeon as a <span class="highlight">${baseClass.name}</span>.`);
    spawnEnemy();
    saveGame();
    renderUI();
}

function gainXP(amount) {
    const player = gameState.player;
    player.xp += amount;
    log(`You earned <span class="highlight">${amount} XP</span>!`, "system-msg");

    if (player.xp >= player.maxXp) {
        levelUp();
    }
}

function levelUp() {
    const player = gameState.player;
    const baseClass = CLASSES[player.classKey];

    player.xp -= player.maxXp;
    player.level += 1;
    player.maxXp = getXpForNextLevel(player.level);

    // Stat gains on Level Up
    const hpGain = baseClass.hpPerLevel;
    player.maxHp += hpGain;
    player.currentHp = player.maxHp; // Full heal on level up
    
    // Recalculate AP progression
    const oldAp = player.maxAp;
    player.maxAp = calculateMaxAP(player.level);
    player.currentAp = player.maxAp;

    log(`🎉 <strong class="highlight">LEVEL UP! You reached Level ${player.level}!</strong>`, "system-msg");
    log(`+${hpGain} Max HP (Total: ${player.maxHp}). HP fully restored!`, "system-msg");

    if (player.maxAp > oldAp) {
        log(`⚡ <strong class="highlight">Max AP increased to ${player.maxAp}!</strong>`, "system-msg");
    }
}

// --- MONSTER & ENCOUNTER LOGIC ---

function spawnEnemy() {
    const playerLevel = gameState.player ? gameState.player.level : 1;

    // Determine monster pool based on level progression
    let maxPoolIndex = 0;
    if (playerLevel >= 2) maxPoolIndex = 1; // Unlocks Skeleton
    if (playerLevel >= 4) maxPoolIndex = 2; // Unlocks Orc

    // Pick a random monster from unlocked pool
    const randomIndex = Math.floor(Math.random() * (maxPoolIndex + 1));
    const template = MONSTER_TYPES[randomIndex];

    // Minor stat scaling based on level
    const hpScale = (playerLevel - 1) * 2;

    gameState.enemy = {
        name: template.name,
        description: template.description,
        maxHp: template.hp + hpScale,
        currentHp: template.hp + hpScale,
        atkDice: template.atkDice,
        atkSides: template.atkSides,
        atkBonus: template.atkBonus,
        xpReward: template.xpReward + (playerLevel * 3)
    };

    log(`A wild <strong class="damage-text">${gameState.enemy.name}</strong> appears! (${gameState.enemy.description})`);
}

function enemyTurn() {
    const enemy = gameState.enemy;
    const player = gameState.player;

    if (!enemy || enemy.currentHp <= 0) return;

    // Roll monster damage
    const damage = rollDice(enemy.atkDice, enemy.atkSides) + enemy.atkBonus;
    player.currentHp = Math.max(0, player.currentHp - damage);

    let diceString = `${enemy.atkDice}d${enemy.atkSides}`;
    if (enemy.atkBonus > 0) diceString += `+${enemy.atkBonus}`;

    log(`The <strong>${enemy.name}</strong> attacks you for <span class="damage-text">${damage} damage</span>! (${diceString})`);

    // Check player death
    if (player.currentHp <= 0) {
        log(`☠️ <strong class="damage-text">YOU DIED!</strong> Game resetting...`, "system-msg");
        setTimeout(() => {
            resetGame();
        }, 3000);
    }
}

function checkMonsterDefeated() {
    const enemy = gameState.enemy;
    if (enemy && enemy.currentHp <= 0) {
        log(`🏆 You defeated the <strong class="highlight">${enemy.name}</strong>!`);
        gainXP(enemy.xpReward);

        // Restore player AP for next encounter
        gameState.player.currentAp = gameState.player.maxAp;

        log(`----------------------------------------`, "system-msg");
        spawnEnemy();
        return true;
    }
    return false;
}

// --- COMBAT ACTIONS ---

function executeBasicAttack() {
    const player = gameState.player;
    const enemy = gameState.enemy;

    if (player.currentAp < 1) {
        log("Not enough Action Points (AP)!", "system-msg");
        return;
    }

    const atk = player.weapon.basicAttack;
    const damage = rollDice(atk.diceNum, atk.diceSides) + atk.bonus;
    player.currentAp -= 1;
    enemy.currentHp = Math.max(0, enemy.currentHp - damage);

    log(`You executed <strong>${atk.name}</strong> dealing <span class="damage-text">${damage} damage</span> to ${enemy.name}!`);

    if (!checkMonsterDefeated()) {
        if (player.currentAp === 0) {
            enemyTurn();
            player.currentAp = player.maxAp; // Restore AP at round end
        }
    }

    saveGame();
    renderUI();
}

function executeAshOfWar() {
    const player = gameState.player;
    const enemy = gameState.enemy;
    const remainingAp = player.currentAp;

    if (remainingAp < 1) {
        log("Not enough Action Points (AP)!", "system-msg");
        return;
    }

    const aow = player.weapon.ashOfWar;
    let totalDamage = 0;

    for (let i = 0; i < remainingAp; i++) {
        totalDamage += rollDice(aow.diceNum, aow.diceSides) + aow.bonus;
    }

    player.currentAp = 0;
    enemy.currentHp = Math.max(0, enemy.currentHp - totalDamage);

    log(`<strong>Ash of War: ${aow.name}</strong> consumed <span class="highlight">${remainingAp} AP</span>, dealing <span class="damage-text">${totalDamage} damage</span> to ${enemy.name}!`);

    if (!checkMonsterDefeated()) {
        enemyTurn();
        player.currentAp = player.maxAp;
    }

    saveGame();
    renderUI();
}

function executeSpell(spellIndex) {
    const player = gameState.player;
    const enemy = gameState.enemy;
    const spell = player.spells[spellIndex];

    if (!spell) return;

    if (player.currentAp < spell.costAP) {
        log(`Not enough AP to cast <strong>${spell.name}</strong>! Requires ${spell.costAP} AP.`, "system-msg");
        return;
    }

    const damage = rollDice(spell.diceNum, spell.diceSides) + spell.bonus;
    player.currentAp -= spell.costAP;
    enemy.currentHp = Math.max(0, enemy.currentHp - damage);

    log(`Casted <strong>${spell.name}</strong> for ${spell.costAP} AP, dealing <span class="damage-text">${damage} magic damage</span> to ${enemy.name}!`);

    if (!checkMonsterDefeated()) {
        if (player.currentAp === 0) {
            enemyTurn();
            player.currentAp = player.maxAp;
        }
    }

    saveGame();
    renderUI();
}

function passTurn() {
    log("You ended your turn.", "system-msg");
    enemyTurn();
    gameState.player.currentAp = gameState.player.maxAp;
    saveGame();
    renderUI();
}

// --- RENDER ENGINE ---

function renderUI() {
    const statsElem = document.getElementById("stats-display");
    const actionsElem = document.getElementById("actions-panel");

    actionsElem.innerHTML = "";

    // 1. Class Selection Screen
    if (!gameState.player) {
        statsElem.innerHTML = `<div class="stat-item">Select a Character Class to Start:</div>`;
        actionsElem.innerHTML = `
            <button class="btn" onclick="selectClass('warrior')">Warrior (High HP, Ash of War)</button>
            <button class="btn" onclick="selectClass('mage')">Mage (Catalyst Staff, Spells)</button>
        `;
        return;
    }

    // 2. Render Player & Monster Stats Bar
    const p = gameState.player;
    const e = gameState.enemy;

    statsElem.innerHTML = `
        <div class="stat-item">Class: <span class="stat-value">${p.className}</span></div>
        <div class="stat-item">Level: <span class="stat-value">${p.level}</span></div>
        <div class="stat-item">XP: <span class="stat-value">${p.xp}/${p.maxXp}</span></div>
        <div class="stat-item">HP: <span class="stat-value stat-hp">${p.currentHp}/${p.maxHp}</span></div>
        <div class="stat-item">AP: <span class="stat-value">${p.currentAp}/${p.maxAp}</span></div>
        <div class="stat-item">Target: <span class="damage-text">${e ? e.name : 'None'} (${e ? e.currentHp : 0}/${e ? e.maxHp : 0} HP)</span></div>
    `;

    // 3. Render Combat Actions
    if (p.currentHp > 0) {
        actionsElem.innerHTML += `
            <button class="btn" onclick="executeBasicAttack()">${p.weapon.basicAttack.name} (1 AP)</button>
        `;

        if (!p.weapon.isCatalyst && p.weapon.ashOfWar) {
            actionsElem.innerHTML += `
                <button class="btn" onclick="executeAshOfWar()">Ash of War: ${p.weapon.ashOfWar.name} (All AP)</button>
            `;
        }

        if (p.weapon.isCatalyst && p.spells.length > 0) {
            p.spells.forEach((spell, idx) => {
                actionsElem.innerHTML += `
                    <button class="btn" onclick="executeSpell(${idx})">${spell.name} (${spell.costAP} AP)</button>
                `;
            });
        }

        actionsElem.innerHTML += `<button class="btn" onclick="passTurn()">End Turn</button>`;
    }

    actionsElem.innerHTML += `<button class="btn btn-danger" onclick="resetGame()">Reset Save</button>`;
}

// --- ENTRY POINT ---
window.addEventListener("DOMContentLoaded", () => {
    if (loadGame()) {
        renderUI();
    } else {
        renderUI();
    }
});