/**
 * Dungeon Crawler Game Engine
 * Features: LocalStorage Persistence, DnD-Style Dice Mechanics, Catalyst & Ash of War Weapons
 */

// --- CLASS DATA TEMPLATES ---
const CLASSES = {
    warrior: {
        name: "Warrior",
        baseHp: 20,
        weapon: {
            name: "Iron Broadsword",
            isCatalyst: false,
            basicAttack: { name: "Sword Strike", diceNum: 2, diceSides: 6, bonus: 2 },
            ashOfWar: { name: "Wild Strikes", diceNum: 1, diceSides: 8, bonus: 1 } // Scales per spent AP
        },
        spells: []
    },
    mage: {
        name: "Mage",
        baseHp: 12,
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

// Global Game State
let gameState = {
    player: null,
    inCombat: false,
    enemy: null
};

// --- SYSTEM FORMULAS ---

/**
 * AP Progression Rule:
 * Level 1-2: 3 AP
 * Level 3-4: 4 AP (+1 at 3)
 * Level 5-6: 5 AP (+1 at 5)
 * Level 7-8: 6 AP (+1 at 7) ...
 */
function calculateMaxAP(level) {
    if (level < 3) return 3;
    return 3 + Math.floor((level - 1) / 2);
}

// DnD Dice Roller (e.g., 2d6 + 2)
function rollDice(count, sides) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

// Log messages into the terminal window
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
        console.error("Could not save game state to localStorage", e);
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

// --- GAME LOGIC ---

function selectClass(classKey) {
    const baseClass = CLASSES[classKey];
    if (!baseClass) return;

    gameState.player = {
        className: baseClass.name,
        level: 1,
        maxHp: baseClass.baseHp,
        currentHp: baseClass.baseHp,
        maxAp: calculateMaxAP(1),
        currentAp: calculateMaxAP(1),
        weapon: baseClass.weapon,
        spells: baseClass.spells
    };

    log(`You entered the dungeon as a <span class="highlight">${baseClass.name}</span>.`);
    saveGame();
    renderUI();
}

function executeBasicAttack() {
    const player = gameState.player;
    if (player.currentAp < 1) {
        log("Not enough Action Points (AP)!", "system-msg");
        return;
    }

    const atk = player.weapon.basicAttack;
    const damage = rollDice(atk.diceNum, atk.diceSides) + atk.bonus;
    player.currentAp -= 1;

    log(`You executed <strong>${atk.name}</strong> dealing <span class="damage-text">${damage} damage</span> (${atk.diceNum}d${atk.diceSides}+${atk.bonus}).`);
    
    saveGame();
    renderUI();
}

function executeAshOfWar() {
    const player = gameState.player;
    const remainingAp = player.currentAp;

    if (remainingAp < 1) {
        log("Not enough Action Points (AP)!", "system-msg");
        return;
    }

    const aow = player.weapon.ashOfWar;
    let totalDamage = 0;

    // Roll damage for each remaining Action Point
    for (let i = 0; i < remainingAp; i++) {
        totalDamage += rollDice(aow.diceNum, aow.diceSides) + aow.bonus;
    }

    player.currentAp = 0; // Consumes all remaining AP

    log(`<strong>Ash of War: ${aow.name}</strong> consumed <span class="highlight">${remainingAp} AP</span>, dealing <span class="damage-text">${totalDamage} total damage</span>!`);

    saveGame();
    renderUI();
}

function executeSpell(spellIndex) {
    const player = gameState.player;
    const spell = player.spells[spellIndex];

    if (!spell) return;

    if (player.currentAp < spell.costAP) {
        log(`Not enough AP to cast <strong>${spell.name}</strong>! Requires ${spell.costAP} AP.`, "system-msg");
        return;
    }

    const damage = rollDice(spell.diceNum, spell.diceSides) + spell.bonus;
    player.currentAp -= spell.costAP;

    log(`Casted <strong>${spell.name}</strong> for ${spell.costAP} AP, dealing <span class="damage-text">${damage} magic damage</span>!`);

    saveGame();
    renderUI();
}

function passTurn() {
    const player = gameState.player;
    player.currentAp = player.maxAp;
    log("Turn ended. All Action Points (AP) restored.", "system-msg");
    saveGame();
    renderUI();
}

// --- RENDER ENGINE ---

function renderUI() {
    const statsElem = document.getElementById("stats-display");
    const actionsElem = document.getElementById("actions-panel");

    actionsElem.innerHTML = "";

    // 1. Render Selection Screen if no save exists
    if (!gameState.player) {
        statsElem.innerHTML = `<div class="stat-item">Select a Character Class to Start:</div>`;
        
        actionsElem.innerHTML = `
            <button class="btn" onclick="selectClass('warrior')">Warrior (High HP, Ash of War)</button>
            <button class="btn" onclick="selectClass('mage')">Mage (Catalyst Staff, Spells)</button>
        `;
        return;
    }

    // 2. Render Player Stats Bar
    const p = gameState.player;
    statsElem.innerHTML = `
        <div class="stat-item">Class: <span class="stat-value">${p.className}</span></div>
        <div class="stat-item">Level: <span class="stat-value">${p.level}</span></div>
        <div class="stat-item">HP: <span class="stat-value stat-hp">${p.currentHp}/${p.maxHp}</span></div>
        <div class="stat-item">AP: <span class="stat-value">${p.currentAp}/${p.maxAp}</span></div>
        <div class="stat-item">Weapon: <span class="stat-value">${p.weapon.name}</span></div>
    `;

    // 3. Render Action Controls
    // Basic Attack Button
    actionsElem.innerHTML += `
        <button class="btn" onclick="executeBasicAttack()">${p.weapon.basicAttack.name} (1 AP)</button>
    `;

    // Non-Catalyst: Ash of War Button
    if (!p.weapon.isCatalyst && p.weapon.ashOfWar) {
        actionsElem.innerHTML += `
            <button class="btn" onclick="executeAshOfWar()">Ash of War: ${p.weapon.ashOfWar.name} (All AP)</button>
        `;
    }

    // Catalyst Weapon: Cast Spells Buttons
    if (p.weapon.isCatalyst && p.spells.length > 0) {
        p.spells.forEach((spell, idx) => {
            actionsElem.innerHTML += `
                <button class="btn" onclick="executeSpell(${idx})">${spell.name} (${spell.costAP} AP)</button>
            `;
        });
    }

    // Turn Control & Storage Reset Buttons
    actionsElem.innerHTML += `<button class="btn" onclick="passTurn()">End Turn</button>`;
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