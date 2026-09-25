/**
 * Dungeon Crawler Game Engine v4.0
 * Features: Multiplier HP Scaling, Split Item Drop Interface, Formatted Attack Labels (*d*+* for *AP)
 */

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
            name: "Apprentice Staff",
            isCatalyst: true,
            basicAttack: { name: "Staff Bonk", diceNum: 1, diceSides: 4, bonus: 0 }
        },
        spells: [
            { name: "Firebolt", costAP: 1, diceNum: 1, diceSides: 8, bonus: 2 },
            { name: "Fireball", costAP: 2, diceNum: 3, diceSides: 6, bonus: 0 }
        ]
    }
};

const MONSTER_TYPES = [
    { name: "Goblin", hp: 10, atkDice: 1, atkSides: 4, atkBonus: 0, xpReward: 20 },
    { name: "Skeleton", hp: 18, atkDice: 1, atkSides: 6, atkBonus: 1, xpReward: 40 },
    { name: "Orc", hp: 35, atkDice: 2, atkSides: 6, atkBonus: 2, xpReward: 85 }
];

const LOOT_TABLE = [
    {
        name: "Steel Longsword",
        isCatalyst: false,
        basicAttack: { name: "Heavy Slash", diceNum: 2, diceSides: 6, bonus: 4 },
        ashOfWar: { name: "Spin Slash", diceNum: 1, diceSides: 10, bonus: 2 }
    },
    {
        name: "Archmage Catalyst Wand",
        isCatalyst: true,
        basicAttack: { name: "Wand Tap", diceNum: 1, diceSides: 6, bonus: 1 }
    }
];

let gameState = {
    player: null,
    enemy: null,
    droppedItem: null
};

// --- FORMULAS ---

function calculateMaxAP(level) {
    if (level < 3) return 3;
    return 3 + Math.floor((level - 1) / 2);
}

function getXpForNextLevel(level) {
    return level * 50;
}

/**
 * Monster HP Scaling Formula:
 * Level 1 = 1x base HP
 * Level 2 = 1.25x base HP
 * Level 3 = 1.50x base HP ... rounded up to whole number
 */
function calculateScaledHp(baseHp, level) {
    const multiplier = 1 + (level - 1) * 0.25;
    return Math.ceil(baseHp * multiplier);
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

// Format dice damage strings into "*d*+* for *AP" format
function formatDiceLabel(name, diceNum, diceSides, bonus, apCost) {
    let bonusStr = bonus > 0 ? `+${bonus}` : '';
    return `${name} (${diceNum}d${diceSides}${bonusStr} for ${apCost} AP)`;
}

// --- LOCAL STORAGE ---

function saveGame() {
    try {
        localStorage.setItem("dungeon_crawler_save", JSON.stringify(gameState));
    } catch (e) {
        console.error("Save failed", e);
    }
}

function loadGame() {
    const savedData = localStorage.getItem("dungeon_crawler_save");
    if (savedData) {
        try {
            gameState = JSON.parse(savedData);
            log("Saved game loaded.", "system-msg");
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

function spawnEnemy() {
    const playerLevel = gameState.player ? gameState.player.level : 1;

    let maxIndex = 0;
    if (playerLevel >= 2) maxIndex = 1;
    if (playerLevel >= 4) maxIndex = 2;

    const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    const template = MONSTER_TYPES[randomIndex];

    // Apply linear scaling with ceiling rounding
    const scaledHp = calculateScaledHp(template.hp, playerLevel);

    gameState.enemy = {
        name: template.name,
        maxHp: scaledHp,
        currentHp: scaledHp,
        atkDice: template.atkDice,
        atkSides: template.atkSides,
        atkBonus: template.atkBonus,
        xpReward: template.xpReward + (playerLevel * 3)
    };

    log(`A wild <strong class="damage-text">${gameState.enemy.name}</strong> appears! (${gameState.enemy.currentHp} HP)`);
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

    const hpGain = baseClass.hpPerLevel;
    player.maxHp += hpGain;
    player.currentHp = player.maxHp;

    const oldAp = player.maxAp;
    player.maxAp = calculateMaxAP(player.level);
    player.currentAp = player.maxAp;

    log(`🎉 <strong class="highlight">LEVEL UP! Reached Level ${player.level}!</strong>`, "system-msg");
    log(`+${hpGain} Max HP (Total: ${player.maxHp}). HP fully restored!`, "system-msg");

    if (player.maxAp > oldAp) {
        log(`⚡ <strong class="highlight">Max AP increased to ${player.maxAp}!</strong>`, "system-msg");
    }
}

function triggerLootDrop() {
    // 50% chance to drop an item upon monster death
    if (Math.random() < 0.50) {
        const randomItem = LOOT_TABLE[Math.floor(Math.random() * LOOT_TABLE.length)];
        gameState.droppedItem = randomItem;
        log(`🎁 The monster dropped: <strong class="highlight">${randomItem.name}</strong>! Inspect left panel.`, "system-msg");
    }
}

function equipDroppedItem() {
    if (!gameState.droppedItem || !gameState.player) return;

    gameState.player.weapon = gameState.droppedItem;
    log(`Equipped <strong class="highlight">${gameState.droppedItem.name}</strong>!`, "system-msg");
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
    const enemy = gameState.enemy;
    const player = gameState.player;

    if (!enemy || enemy.currentHp <= 0) return;

    const damage = rollDice(enemy.atkDice, enemy.atkSides) + enemy.atkBonus;
    player.currentHp = Math.max(0, player.currentHp - damage);

    let diceString = `${enemy.atkDice}d${enemy.atkSides}`;
    if (enemy.atkBonus > 0) diceString += `+${enemy.atkBonus}`;

    log(`The <strong>${enemy.name}</strong> attacks for <span class="damage-text">${damage} damage</span>! (${diceString})`);

    if (player.currentHp <= 0) {
        log(`☠️ <strong class="damage-text">YOU DIED!</strong> Resetting...`, "system-msg");
        setTimeout(() => resetGame(), 3000);
    }
}

function checkMonsterDefeated() {
    const enemy = gameState.enemy;
    if (enemy && enemy.currentHp <= 0) {
        log(`🏆 Defeated <strong class="highlight">${enemy.name}</strong>!`);
        gainXP(enemy.xpReward);
        triggerLootDrop();

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

    log(`Executed <strong>${atk.name}</strong> dealing <span class="damage-text">${damage} damage</span>!`);

    if (!checkMonsterDefeated()) {
        if (player.currentAp === 0) {
            enemyTurn();
            player.currentAp = player.maxAp;
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
        log("Not enough AP!", "system-msg");
        return;
    }

    const aow = player.weapon.ashOfWar;
    let totalDamage = 0;

    for (let i = 0; i < remainingAp; i++) {
        totalDamage += rollDice(aow.diceNum, aow.diceSides) + aow.bonus;
    }

    player.currentAp = 0;
    enemy.currentHp = Math.max(0, enemy.currentHp - totalDamage);

    log(`<strong>Ash of War: ${aow.name}</strong> (${remainingAp} AP) dealt <span class="damage-text">${totalDamage} damage</span>!`);

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
        log(`Not enough AP for ${spell.name}! Requires ${spell.costAP} AP.`, "system-msg");
        return;
    }

    const damage = rollDice(spell.diceNum, spell.diceSides) + spell.bonus;
    player.currentAp -= spell.costAP;
    enemy.currentHp = Math.max(0, enemy.currentHp - damage);

    log(`Casted <strong>${spell.name}</strong> dealing <span class="damage-text">${damage} magic damage</span>!`);

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
    const dropElem = document.getElementById("drop-container");

    actionsElem.innerHTML = "";

    // 1. Render Drop Container (Left Panel)
    if (gameState.droppedItem) {
        const item = gameState.droppedItem;
        const atk = item.basicAttack;
        let atkStr = `${atk.diceNum}d${atk.diceSides}` + (atk.bonus > 0 ? `+${atk.bonus}` : '');

        dropElem.innerHTML = `
            <div class="item-card">
                <div class="item-name">${item.name}</div>
                <div class="item-stats">
                    Type: ${item.isCatalyst ? 'Catalyst Staff' : 'Physical Weapon'}<br>
                    Base Attack: ${atkStr}
                </div>
                <button class="btn btn-success" onclick="equipDroppedItem()">Replace current Weapon</button>
                <button class="btn btn-danger" style="margin-left:0;" onclick="discardDroppedItem()">Discard Item</button>
            </div>
        `;
    } else {
        dropElem.innerHTML = `<p class="empty-msg">No item dropped. Defeat monsters to find gear.</p>`;
    }

    // 2. Class Selection Screen
    if (!gameState.player) {
        statsElem.innerHTML = `<div class="stat-item">Select a Character Class:</div>`;
        actionsElem.innerHTML = `
            <button class="btn" onclick="selectClass('warrior')">Warrior (High HP, Ash of War)</button>
            <button class="btn" onclick="selectClass('mage')">Mage (Catalyst Staff, Spells)</button>
        `;
        return;
    }

    // 3. Render Stats Bar
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

    // 4. Render Formatted Attack Buttons (*d*+* for *AP)
    if (p.currentHp > 0) {
        const atk = p.weapon.basicAttack;
        const basicLabel = formatDiceLabel(atk.name, atk.diceNum, atk.diceSides, atk.bonus, 1);
        
        actionsElem.innerHTML += `
            <button class="btn" onclick="executeBasicAttack()">${basicLabel}</button>
        `;

        if (!p.weapon.isCatalyst && p.weapon.ashOfWar) {
            const aow = p.weapon.ashOfWar;
            const aowLabel = formatDiceLabel(`Ash of War: ${aow.name}`, aow.diceNum, aow.diceSides, aow.bonus, "All");
            actionsElem.innerHTML += `
                <button class="btn" onclick="executeAshOfWar()">${aowLabel}</button>
            `;
        }

        if (p.weapon.isCatalyst && p.spells.length > 0) {
            p.spells.forEach((spell, idx) => {
                const spellLabel = formatDiceLabel(spell.name, spell.diceNum, spell.diceSides, spell.bonus, spell.costAP);
                actionsElem.innerHTML += `
                    <button class="btn" onclick="executeSpell(${idx})">${spellLabel}</button>
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