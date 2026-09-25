// Game State
const state = {
    gold: 0,
    goldPerClick: 1,
    clickLevel: 0,
    clickUpgradeCost: 10,
    buyMode: 1, // '1', '5', '10', '100', oder 'max'
    
    buildings: {
        goblin: { count: 0, cost: 20 },
        miner: { count: 0, cost: 100 },
        golem: { count: 0, cost: 400 },
        pickaxeFactory: { count: 0, cost: 1200 },
        cultist: { count: 0, cost: 5000 },
        dungeonPortal: { count: 0, cost: 18000 },
        dragon: { count: 0, cost: 75000 },
        voidHarvester: { count: 0, cost: 300000 },
        titanExcavator: { count: 0, cost: 600000 },
        alchemicalRefining: { count: 0, cost: 2500000 },
        chronosDrill: { count: 0, cost: 12000000 },
        celestialForge: { count: 0, cost: 60000000 },
        multiversalCore: { count: 0, cost: 300000000 },
        quantumSiphon: { count: 0, cost: 150000000 },
        stellarEngine: { count: 0, cost: 7500000000 },
        dysonSwarm: { count: 0, cost: 37500000000 },
        singularityExtractor: { count: 0, cost: 180000000000 },
        nebulaDrill: { count: 0, cost: 900000000000 },
        antimatterFabricator: { count: 0, cost: 4500000000000 },
        darkEnergySiphon: { count: 0, cost: 22000000000000 },
        cosmicDisruptor: { count: 0, cost: 110000000000000 },
        dimensionalTearer: { count: 0, cost: 550000000000000 },
        realityWeaver: { count: 0, cost: 2700000000000000 },
        astralForge: { count: 0, cost: 13500000000000000 },
        chronosNexus: { count: 0, cost: 67500000000000000 },
        voidEngine: { count: 0, cost: 330000000000000000 },
        subspacePump: { count: 0, cost: 1650000000000000000 },
        entropyReverser: { count: 0, cost: 8200000000000000000 },
        infinityCore: { count: 0, cost: 41000000000000000000 },
        supernovaDrill: { count: 0, cost: 200000000000000000000 },
        galacticRift: { count: 0, cost: 1000000000000000000000 },
        aetherExtractor: { count: 0, cost: 5000000000000000000000 },
        tachyonCondenser: { count: 0, cost: 25000000000000000000000 },
        hypercubeFurnace: { count: 0, cost: 120000000000000000000000 },
        planckScaleSiphon: { count: 0, cost: 600000000000000000000000 },
        stringTensioner: { count: 0, cost: 3000000000000000000000000 },
        darkMatterForge: { count: 0, cost: 15000000000000000000000000 },
        quasarHarvester: { count: 0, cost: 75000000000000000000000000 },
        zeropointReactor: { count: 0, cost: 370000000000000000000000000 },
        eventHorizonRig: { count: 0, cost: 1800000000000000000000000000 },
        nexusMatrix: { count: 0, cost: 9000000000000000000000000000 },
        etheriumWell: { count: 0, cost: 45000000000000000000000000000 },
        genesisChamber: { count: 0, cost: 220000000000000000000000000000 },
        omegaDrill: { count: 0, cost: 1100000000000000000000000000000 },
        transcendentCore: { count: 0, cost: 5500000000000000000000000000000 },
        godForge: { count: 0, cost: 27000000000000000000000000000000 },
        infinityExcavator: { count: 0, cost: 13500000000000000000000000000000 },
        existentialSiphon: { count: 0, cost: 67500000000000000000000000000000 },
        omniverseAnchor: { count: 0, cost: 330000000000000000000000000000000 }
    }
};

const clickTimestamps = [];

const elements = {
    number: document.getElementById('number'),
    clickPower: document.getElementById('clickPower'),
    goblinCount: document.getElementById('goblinCount'),
    upgrades: document.getElementById('upgrades'),
    backBtn: document.getElementById('backBtn'),
    cpsDisplay: document.getElementById('cpsDisplay'),
    buyModeBtn: null
};

function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toLocaleString();

    const suffixes = [
        "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td"
    ];

    const i = Math.floor(Math.log10(num) / 3);
    if (i >= suffixes.length) {
        return num.toExponential(2);
    }

    const formatted = num / Math.pow(10, i * 3);
    
    return formatted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    }) + " " + suffixes[i];
}

// Hilfsfunktion zur Preis- und Mengenberechnung (Geometrische Summe)
function getBulkPurchaseInfo(baseCost, rate, mode, maxGold) {
    if (mode === 1) {
        return { count: 1, totalCost: baseCost };
    }

    if (typeof mode === 'number') {
        // Formel: BaseCost * (rate^N - 1) / (rate - 1)
        const totalCost = baseCost * (Math.pow(rate, mode) - 1) / (rate - 1);
        return { count: mode, totalCost: Math.round(totalCost) };
    }

    if (mode === 'max') {
        if (maxGold < baseCost) {
            return { count: 1, totalCost: baseCost };
        }
        // N = floor( log( (Gold * (rate - 1) / BaseCost) + 1 ) / log(rate) )
        let count = Math.floor(Math.log((maxGold * (rate - 1) / baseCost) + 1) / Math.log(rate));
        if (count < 1) count = 1;

        const totalCost = baseCost * (Math.pow(rate, count) - 1) / (rate - 1);
        return { count: count, totalCost: Math.round(totalCost) };
    }

    return { count: 1, totalCost: baseCost };
}

const upgradeConfig = [
    { 
        id: 'click', 
        getName: () => '1. Sharpen Pickaxe (+1 Gold/click)', 
        unlockReq: 5, 
        rate: 1.1,
        getPurchaseInfo: () => getBulkPurchaseInfo(state.clickUpgradeCost, 1.1, state.buyMode, state.gold),
        getTypeLevel: () => state.clickLevel, 
        onPurchase: (count) => { 
            state.goldPerClick += count; 
            state.clickLevel += count; 
            state.clickUpgradeCost = Math.round(state.clickUpgradeCost * Math.pow(1.1, count)); 
        } 
    },
    ...[
        { id: 'goblin', name: '2. Hire Goblin', unlockReq: 10, baseCps: 1 },
        { id: 'miner', name: '3. Hire Dwarf Miner', unlockReq: 50, baseCps: 5 },
        { id: 'golem', name: '4. Construct Stone Golem', unlockReq: 200, baseCps: 20 },
        { id: 'pickaxeFactory', name: '5. Automated Forge', unlockReq: 600, baseCps: 75, extra: () => state.buildings.pickaxeFactory.count === 0 ? ' & 2x Click Mult' : '' },
        { id: 'cultist', name: '6. Shadow Cultist', unlockReq: 2500, baseCps: 250 },
        { id: 'dungeonPortal', name: '7. Dungeon Portal', unlockReq: 9000, baseCps: 900 },
        { id: 'dragon', name: '8. Dragon Tamer', unlockReq: 35000, baseCps: 3500 },
        { id: 'voidHarvester', name: '9. Void Harvester', unlockReq: 150000, baseCps: 12000, extra: () => state.buildings.voidHarvester.count === 0 ? ' & 2x Click Mult' : '' },
        { id: 'titanExcavator', name: '10. Titan Excavator', unlockReq: 600000, baseCps: 45000 },
        { id: 'alchemicalRefining', name: '11. Alchemical Refinery', unlockReq: 2500000, baseCps: 180000 },
        { id: 'chronosDrill', name: '12. Chronos Time-Drill', unlockReq: 12000000, baseCps: 750000, extra: () => ' & CPS Scaling' },
        { id: 'celestialForge', name: '13. Celestial Forge', unlockReq: 60000000, baseCps: 3000000 },
        { id: 'multiversalCore', name: '14. Multiversal Core', unlockReq: 300000000, baseCps: 15000000 },
        { id: 'quantumSiphon', name: '15. Quantum Siphon', unlockReq: 1500000000, baseCps: 75000000 },
        { id: 'stellarEngine', name: '16. Stellar Engine', unlockReq: 7500000000, baseCps: 350000000 },
        { id: 'dysonSwarm', name: '17. Dyson Swarm', unlockReq: 37500000000, baseCps: 1800000000 },
        { id: 'singularityExtractor', name: '18. Singularity Extractor', unlockReq: 180000000000, baseCps: 9000000000 },
        { id: 'nebulaDrill', name: '19. Nebula Drill', unlockReq: 900000000000, baseCps: 45000000000 },
        { id: 'antimatterFabricator', name: '20. Antimatter Fabricator', unlockReq: 4500000000000, baseCps: 220000000000 },
        { id: 'darkEnergySiphon', name: '21. Dark Energy Siphon', unlockReq: 22000000000000, baseCps: 1100000000000 },
        { id: 'cosmicDisruptor', name: '22. Cosmic Disruptor', unlockReq: 110000000000000, baseCps: 5500000000000 },
        { id: 'dimensionalTearer', name: '23. Dimensional Tearer', unlockReq: 550000000000000, baseCps: 27000000000000 },
        { id: 'realityWeaver', name: '24. Reality Weaver', unlockReq: 2700000000000000, baseCps: 135000000000000 },
        { id: 'astralForge', name: '25. Astral Forge', unlockReq: 13500000000000000, baseCps: 675000000000000 },
        { id: 'chronosNexus', name: '26. Chronos Nexus', unlockReq: 67500000000000000, baseCps: 3300000000000000 },
        { id: 'voidEngine', name: '27. Void Engine', unlockReq: 330000000000000000, baseCps: 16500000000000000 },
        { id: 'subspacePump', name: '28. Subspace Pump', unlockReq: 1650000000000000000, baseCps: 82000000000000000 },
        { id: 'entropyReverser', name: '29. Entropy Reverser', unlockReq: 8200000000000000000, baseCps: 410000000000000000 },
        { id: 'infinityCore', name: '30. Infinity Core', unlockReq: 41000000000000000000, baseCps: 2000000000000000000 },
        { id: 'supernovaDrill', name: '31. Supernova Drill', unlockReq: 200000000000000000000, baseCps: 10000000000000000000 },
        { id: 'galacticRift', name: '32. Galactic Rift', unlockReq: 1000000000000000000000, baseCps: 50000000000000000000 },
        { id: 'aetherExtractor', name: '33. Aether Extractor', unlockReq: 5000000000000000000000, baseCps: 250000000000000000000 },
        { id: 'tachyonCondenser', name: '34. Tachyon Condenser', unlockReq: 25000000000000000000000, baseCps: 1200000000000000000000 },
        { id: 'hypercubeFurnace', name: '35. Hypercube Furnace', unlockReq: 120000000000000000000000, baseCps: 6000000000000000000000 },
        { id: 'planckScaleSiphon', name: '36. Planck-Scale Siphon', unlockReq: 600000000000000000000000, baseCps: 30000000000000000000000 },
        { id: 'stringTensioner', name: '37. Cosmic String Tensioner', unlockReq: 3000000000000000000000000, baseCps: 150000000000000000000000 },
        { id: 'darkMatterForge', name: '38. Dark Matter Forge', unlockReq: 15000000000000000000000000, baseCps: 750000000000000000000000 },
        { id: 'quasarHarvester', name: '39. Quasar Harvester', unlockReq: 75000000000000000000000000, baseCps: 3700000000000000000000000 },
        { id: 'zeropointReactor', name: '40. Zero-Point Reactor', unlockReq: 370000000000000000000000000, baseCps: 18000000000000000000000000 },
        { id: 'eventHorizonRig', name: '41. Event Horizon Rig', unlockReq: 1800000000000000000000000000, baseCps: 90000000000000000000000000 },
        { id: 'nexusMatrix', name: '42. Nexus Matrix', unlockReq: 9000000000000000000000000000, baseCps: 450000000000000000000000000 },
        { id: 'etheriumWell', name: '43. Etherium Well', unlockReq: 45000000000000000000000000000, baseCps: 2200000000000000000000000000 },
        { id: 'genesisChamber', name: '44. Genesis Chamber', unlockReq: 220000000000000000000000000000, baseCps: 11000000000000000000000000000 },
        { id: 'omegaDrill', name: '45. Omega Drill', unlockReq: 1100000000000000000000000000000, baseCps: 55000000000000000000000000000 },
        { id: 'transcendentCore', name: '46. Transcendent Core', unlockReq: 5500000000000000000000000000000, baseCps: 270000000000000000000000000000 },
        { id: 'godForge', name: '47. God Forge', unlockReq: 27000000000000000000000000000000, baseCps: 1350000000000000000000000000000 },
        { id: 'infinityExcavator', name: '48. Infinity Excavator', unlockReq: 13500000000000000000000000000000, baseCps: 6750000000000000000000000000000 },
        { id: 'existentialSiphon', name: '49. Existential Siphon', unlockReq: 67500000000000000000000000000000, baseCps: 33000000000000000000000000000000 },
        { id: 'omniverseAnchor', name: '50. Omniverse Anchor', unlockReq: 330000000000000000000000000000000, baseCps: 165000000000000000000000000000000 }
    ].map(b => ({
        id: b.id,
        getName: () => `${b.name} (+${formatNumber(b.baseCps)} Gold/sec${b.extra ? b.extra() : ''})`,
        unlockReq: b.unlockReq,
        rate: 1.2,
        getPurchaseInfo: () => getBulkPurchaseInfo(state.buildings[b.id].cost, 1.2, state.buyMode, state.gold),
        getTypeLevel: () => state.buildings[b.id].count,
        onPurchase: (count) => {
            state.buildings[b.id].count += count;
            state.buildings[b.id].cost = Math.round(state.buildings[b.id].cost * Math.pow(1.2, count));
        }
    }))
];

function loadGame() {
    const savedState = localStorage.getItem('miner_game_state');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            if (parsed.number !== undefined && parsed.gold === undefined) {
                parsed.gold = parsed.number;
                delete parsed.number;
            }
            if (parsed.pointsPerClick !== undefined && parsed.goldPerClick === undefined) {
                parsed.goldPerClick = parsed.pointsPerClick;
                delete parsed.pointsPerClick;
            }
            Object.assign(state.buildings, parsed.buildings);
            Object.assign(state, parsed);
        } catch (e) {
            console.error('Failed to parse saved game data', e);
        }
    }
}

function saveGame() {
    localStorage.setItem('miner_game_state', JSON.stringify(state));
}

function resetGame() {
    if (confirm('Are you sure you want to reset all game progress?')) {
        localStorage.removeItem('miner_game_state');
        window.location.reload();
    }
}

function triggerAnticheatReset() {
    alert("Anticheat ausgelöst! Du hast 20 CPS erreicht. Spielfortschritt wurde auf 0 zurückgesetzt.");
    localStorage.removeItem('miner_game_state');
    window.location.reload();
}

function getCurrentCPS() {
    const now = Date.now();
    while (clickTimestamps.length > 0 && clickTimestamps[0] <= now - 5000) {
        clickTimestamps.shift();
    }
    return clickTimestamps.length / 5;
}

function getEffectiveGoldPerClick(cps) {
    let baseClick = state.goldPerClick;

    if (state.buildings.chronosDrill && state.buildings.chronosDrill.count > 0) {
        baseClick += (cps * 0.1) * state.buildings.chronosDrill.count;
    }

    let clickMultiplier = 1;

    if (state.buildings.pickaxeFactory && state.buildings.pickaxeFactory.count > 0) {
        clickMultiplier *= 2;
    }

    if (state.buildings.voidHarvester && state.buildings.voidHarvester.count > 0) {
        clickMultiplier *= 2;
    }

    if (cps >= 10) {
        clickMultiplier *= 1.5;
    }

    let totalClickGold = baseClick * clickMultiplier;

    if (cps >= 5) {
        totalClickGold *= 1.5;
    }

    return totalClickGold;
}

function toggleBuyMode() {
    const modes = [1, 5, 10, 100, 'max'];
    const currentIndex = modes.indexOf(state.buyMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    state.buyMode = modes[nextIndex];
    
    if (elements.buyModeBtn) {
        elements.buyModeBtn.textContent = `Buy Mode: ${typeof state.buyMode === 'number' ? state.buyMode + 'x' : 'Max'}`;
    }
    updateDisplay();
}

function renderUpgrades() {
    upgradeConfig.forEach(upg => {
        const level = upg.getTypeLevel();
        const info = upg.getPurchaseInfo();
        const cost = info.totalCost;
        const countToBuy = info.count;

        const canAfford = state.gold >= cost;
        const isUnlocked = state.gold >= upg.unlockReq || level > 0;
        const name = upg.getName();

        let card = document.getElementById(`upgrade-${upg.id}`);

        if (!isUnlocked) {
            if (card) card.style.display = 'none';
            return;
        }

        if (!card) {
            card = document.createElement('div');
            card.id = `upgrade-${upg.id}`;
            card.className = 'upgrade-card fade-in-up';
            card.innerHTML = `
                <div class="upgrade-info">
                    <div class="upgrade-title" id="title-${upg.id}">${name}</div>
                    <div class="upgrade-level" id="level-${upg.id}">Owned: ${level}</div>
                </div>
                <div class="upgrade-cost" id="cost-${upg.id}">${formatNumber(cost)} Gold</div>
            `;

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                purchaseUpgrade(upg);
            });

            elements.upgrades.appendChild(card);
        } else {
            card.style.display = 'flex';
        }

        if (canAfford) {
            card.classList.remove('disabled');
        } else {
            card.classList.add('disabled');
        }

        const titleElem = document.getElementById(`title-${upg.id}`);
        const levelElem = document.getElementById(`level-${upg.id}`);
        const costElem = document.getElementById(`cost-${upg.id}`);

        if (titleElem) titleElem.textContent = name;
        if (levelElem) levelElem.textContent = `Owned: ${level}`;
        
        let costText = `${formatNumber(cost)} Gold`;
        if (state.buyMode === 'max') {
            costText = `Buy ${countToBuy}x: ${formatNumber(cost)} Gold`;
        }
        if (costElem) costElem.textContent = costText;
    });
}

function updateDisplay() {
    const cps = getCurrentCPS();

    if (elements.number) elements.number.textContent = Math.floor(state.gold).toLocaleString();
    if (elements.clickPower) elements.clickPower.textContent = formatNumber(getEffectiveGoldPerClick(cps));
    
    if (elements.goblinCount) {
        let totalPassives = 0;
        Object.keys(state.buildings).forEach(bKey => {
            if (state.buildings[bKey]) {
                totalPassives += state.buildings[bKey].count;
            }
        });
        elements.goblinCount.textContent = formatNumber(totalPassives);
    }

    renderUpgrades();
}

function handleGlobalClick(e) {
    if (e.target.closest('button') || e.target.closest('.upgrade-card') || e.target.closest('footer')) {
        return;
    }

    clickTimestamps.push(Date.now());
    const cps = getCurrentCPS();

    if (cps >= 20) {
        triggerAnticheatReset();
        return;
    }

    const earnedGold = getEffectiveGoldPerClick(cps);
    state.gold += earnedGold;
    updateDisplay();
}

function purchaseUpgrade(upgrade) {
    const info = upgrade.getPurchaseInfo();
    if (state.gold >= info.totalCost) {
        state.gold -= info.totalCost;
        upgrade.onPurchase(info.count);
        updateDisplay();
        saveGame();
    }
}

function updateCPS() {
    const cps = getCurrentCPS();
    elements.cpsDisplay.textContent = `CPS: ${cps.toFixed(2)}`;

    if (cps >= 20) {
        triggerAnticheatReset();
        return;
    }

    if (cps >= 10) {
        document.body.style.backgroundImage = "url('10+cps.gif')";
        document.body.style.backgroundSize = "cover";
    } else if (cps >= 5) {
        document.body.style.backgroundImage = "url('5+cps.gif')";
        document.body.style.backgroundSize = "cover";
    } else {
        document.body.style.backgroundImage = "none";
    }
}

function calculatePassiveIncome() {
    const b = state.buildings;
    const rates = {
        goblin: 1, miner: 5, golem: 20, pickaxeFactory: 75, cultist: 250, dungeonPortal: 900,
        dragon: 3500, voidHarvester: 12000, titanExcavator: 45000, alchemicalRefining: 180000,
        chronosDrill: 750000, celestialForge: 3000000, multiversalCore: 15000000, quantumSiphon: 75000000,
        stellarEngine: 350000000, dysonSwarm: 1800000000, singularityExtractor: 9000000000,
        nebulaDrill: 45000000000, antimatterFabricator: 220000000000, darkEnergySiphon: 1100000000000,
        cosmicDisruptor: 5500000000000, dimensionalTearer: 27000000000000, realityWeaver: 135000000000000,
        astralForge: 675000000000000, chronosNexus: 3300000000000000, voidEngine: 16500000000000000,
        subspacePump: 82000000000000000, entropyReverser: 410000000000000000, infinityCore: 2000000000000000000,
        supernovaDrill: 10000000000000000000, galacticRift: 50000000000000000000, aetherExtractor: 250000000000000000000,
        tachyonCondenser: 1200000000000000000000, hypercubeFurnace: 6000000000000000000000,
        planckScaleSiphon: 30000000000000000000000, stringTensioner: 150000000000000000000000,
        darkMatterForge: 750000000000000000000000, quasarHarvester: 3700000000000000000000000,
        zeropointReactor: 18000000000000000000000000, eventHorizonRig: 90000000000000000000000000,
        nexusMatrix: 450000000000000000000000000, etheriumWell: 2200000000000000000000000000,
        genesisChamber: 11000000000000000000000000000, omegaDrill: 55000000000000000000000000000,
        transcendentCore: 270000000000000000000000000000, godForge: 1350000000000000000000000000000,
        infinityExcavator: 6750000000000000000000000000000, existentialSiphon: 33000000000000000000000000000000,
        omniverseAnchor: 165000000000000000000000000000000
    };

    let incomePerSec = 0;
    Object.keys(b).forEach(key => {
        if (b[key] && rates[key]) {
            incomePerSec += b[key].count * rates[key];
        }
    });

    const cps = getCurrentCPS();
    if (cps >= 5) {
        incomePerSec *= 1.5;
    }

    return incomePerSec / 10;
}

function startLoops() {
    setInterval(() => {
        const income = calculatePassiveIncome();
        if (income > 0) {
            state.gold += income;
            updateDisplay();
        }
    }, 100);

    setInterval(updateCPS, 200);
    setInterval(saveGame, 5000);
}

function init() {
    loadGame();

    const oldBtn = document.getElementById('clickerBtn');
    if (oldBtn) oldBtn.remove();

    // Erstellen des Kaufmodus-Buttons unter dem Geldstand
    if (elements.number && elements.number.parentElement) {
        const btn = document.createElement('button');
        btn.id = 'buyModeBtn';
        btn.className = 'buy-mode-btn';
        btn.textContent = `Buy Mode: ${typeof state.buyMode === 'number' ? state.buyMode + 'x' : 'Max'}`;
        btn.style.marginTop = '10px';
        btn.style.padding = '8px 16px';
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBuyMode();
        });
        elements.number.parentElement.appendChild(btn);
        elements.buyModeBtn = btn;
    }

    document.body.addEventListener('click', handleGlobalClick);

    if (elements.backBtn) {
        elements.backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            saveGame();
            window.location.href = 'index.html';
        });
    }

    const footer = document.querySelector('footer');
    if (footer && !document.getElementById('resetBtn')) {
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetBtn';
        resetBtn.className = 'footer-btn';
        resetBtn.textContent = 'Reset Progress';
        resetBtn.style.marginLeft = '10px';
        resetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetGame();
        });
        footer.insertBefore(resetBtn, elements.cpsDisplay);
    }

    updateDisplay();
    startLoops();
}

document.addEventListener('DOMContentLoaded', init);