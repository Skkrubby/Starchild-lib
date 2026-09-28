(() => {
	"use strict";

	const canvas = document.querySelector("#arena");
	const ctx = canvas.getContext("2d");
	const startScreen = document.querySelector("#startScreen");
	const startButton = document.querySelector("#startButton");
	const screenTitle = document.querySelector("#screenTitle");
	const screenCopy = document.querySelector("#screenCopy");
	const roundCallout = document.querySelector("#roundCallout");
	const keys = new Set();
	const targetWins = 3;
	const maxRunSpeed = 420;
	const arena = { left: 0, right: 0, top: 0, bottom: 0 };
	let width = 0;
	let height = 0;
	let pixelRatio = 1;
	let lastTime = 0;
	let gameState = "ready";
	let roundTimer = 0;
	let shake = 0;
	let particles = [];
	let roundWins = [0, 0];

	const players = [
		makePlayer(0, 1, 0, "#5fe0bd", "#cbe36b", { left: "KeyA", right: "KeyD", up: "KeyW", down: "KeyS", attack: "KeyF" }),
		makePlayer(1, -1, 0, "#ff765f", "#ffd06f", { left: "ArrowLeft", right: "ArrowRight", up: "ArrowUp", down: "ArrowDown", attack: "Enter" })
	];

	function makePlayer(index, facingX, facingY, color, accent, controls) {
		return { index, x: 0, y: 0, vx: 0, vy: 0, facingX, facingY, color, accent, controls, health: 100,
			attackTimer: 0, attackCooldown: 0, attackHasHit: false, stun: 0,
			invulnerable: 0, animationTime: 0 };
	}

	function resize() {
		pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = Math.round(width * pixelRatio);
		canvas.height = Math.round(height * pixelRatio);
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		arena.left = Math.max(32, width * 0.075);
		arena.right = width - arena.left;
		arena.top = Math.max(104, height * 0.17);
		arena.bottom = height - Math.max(76, height * 0.13);
		if (gameState === "ready") resetPlayers();
		for (const player of players) {
			player.x = Math.max(arena.left + 30, Math.min(arena.right - 30, player.x));
			player.y = Math.max(arena.top + 30, Math.min(arena.bottom - 30, player.y));
		}
	}

	function resetPlayers() {
		players[0].x = arena.left + (arena.right - arena.left) * 0.32;
		players[1].x = arena.left + (arena.right - arena.left) * 0.68;
		for (const player of players) {
			player.y = (arena.top + arena.bottom) * 0.5;
			player.vx = 0;
			player.vy = 0;
			player.health = 100;
			player.facingX = player.index === 0 ? 1 : -1;
			player.facingY = 0;
			player.attackTimer = 0;
			player.attackCooldown = 0;
			player.attackHasHit = false;
			player.stun = 0;
			player.invulnerable = 0;
			player.animationTime = 0;
		}
		updateHud();
	}

	function updateHud() {
		document.querySelector("#healthOne").style.width = `${players[0].health}%`;
		document.querySelector("#healthTwo").style.width = `${players[1].health}%`;
		document.querySelector("#winsOne").textContent = `${roundWins[0]} W`;
		document.querySelector("#winsTwo").textContent = `${roundWins[1]} W`;
		document.querySelector("#roundCount").textContent = `FIRST TO ${targetWins}`;
	}

	function startMatch() {
		startButton.blur();
		roundWins = [0, 0];
		updateHud();
		resetPlayers();
		particles = [];
		gameState = "playing";
		roundCallout.classList.remove("visible");
		startScreen.classList.add("hidden");
	}

	function beginNextRound() {
		resetPlayers();
		particles = [];
		gameState = "playing";
		roundCallout.classList.remove("visible");
	}

	function showMatchOver(winnerIndex) {
		gameState = "matchOver";
		screenTitle.innerHTML = `${winnerIndex === 0 ? "Mica" : "Brick"}<br><em>owns the roof</em>`;
		screenCopy.textContent = `Final score ${roundWins[0]} - ${roundWins[1]}. Run it back?`;
		startButton.querySelector("span").textContent = "Play again";
		startScreen.classList.remove("hidden");
	}

	function finishRound(loserIndex) {
		if (gameState !== "playing") return;
		const winnerIndex = 1 - loserIndex;
		roundWins[winnerIndex]++;
		updateHud();
		gameState = "roundOver";
		roundTimer = 1.35;
		roundCallout.textContent = `${winnerIndex === 0 ? "MICA" : "BRICK"} TAKES THE ROUND`;
		roundCallout.classList.add("visible");
		if (roundWins[winnerIndex] >= targetWins) roundTimer = 1.6;
	}

	function punch(player) {
		if (gameState !== "playing" || player.attackCooldown > 0 || player.stun > 0) return;
		player.attackTimer = 0.28;
		player.attackCooldown = 0.52;
		player.attackHasHit = false;
	}

	function burst(x, y, color, count, force) {
		for (let i = 0; i < count; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = force * (0.35 + Math.random() * 0.75);
			particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
				life: 0.18 + Math.random() * 0.24, maxLife: 0.42, size: 2 + Math.random() * 4, color });
		}
	}

	function checkHit(attacker, defender) {
		if (attacker.attackTimer <= 0.17 && attacker.attackTimer >= 0.04 && !attacker.attackHasHit && defender.invulnerable <= 0) {
			const dx = defender.x - attacker.x;
			const dy = defender.y - attacker.y;
			const forward = dx * attacker.facingX + dy * attacker.facingY;
			const lateral = Math.abs(dx * attacker.facingY - dy * attacker.facingX);
			if (forward > 0 && forward < 92 && lateral < 42) {
				attacker.attackHasHit = true;
				defender.health = Math.max(0, defender.health - 22);
				const distance = Math.max(1, Math.hypot(dx, dy));
				defender.vx = dx / distance * 500;
				defender.vy = dy / distance * 500;
				defender.stun = 0.24;
				defender.invulnerable = 0.38;
				shake = 7;
				burst(defender.x, defender.y, attacker.accent, 12, 180);
				updateHud();
				if (defender.health <= 0) finishRound(defender.index);
			}
		}
	}

	function updatePlayer(player, other, dt) {
		player.attackCooldown = Math.max(0, player.attackCooldown - dt);
		player.attackTimer = Math.max(0, player.attackTimer - dt);
		player.stun = Math.max(0, player.stun - dt);
		player.invulnerable = Math.max(0, player.invulnerable - dt);

		if (player.stun <= 0) {
			let moveX = (keys.has(player.controls.right) ? 1 : 0) - (keys.has(player.controls.left) ? 1 : 0);
			let moveY = (keys.has(player.controls.down) ? 1 : 0) - (keys.has(player.controls.up) ? 1 : 0);
			const moveLength = Math.hypot(moveX, moveY);
			if (moveLength > 0) {
				moveX /= moveLength;
				moveY /= moveLength;
				player.vx += moveX * 2200 * dt;
				player.vy += moveY * 2200 * dt;
				player.facingX = moveX;
				player.facingY = moveY;
			} else {
				player.vx *= Math.exp(-9 * dt);
				player.vy *= Math.exp(-9 * dt);
			}
			const speed = Math.hypot(player.vx, player.vy);
			if (speed > maxRunSpeed) {
				player.vx = player.vx / speed * maxRunSpeed;
				player.vy = player.vy / speed * maxRunSpeed;
			}
		} else {
			player.vx *= Math.exp(-2.4 * dt);
			player.vy *= Math.exp(-2.4 * dt);
		}

		player.animationTime += dt * (Math.hypot(player.vx, player.vy) > 30 ? 10 : 3);
		player.x += player.vx * dt;
		player.y += player.vy * dt;
		const radius = 23;
		if (player.x < arena.left + radius) { player.x = arena.left + radius; player.vx = Math.max(0, player.vx); }
		if (player.x > arena.right - radius) { player.x = arena.right - radius; player.vx = Math.min(0, player.vx); }
		if (player.y < arena.top + radius) { player.y = arena.top + radius; player.vy = Math.max(0, player.vy); }
		if (player.y > arena.bottom - radius) { player.y = arena.bottom - radius; player.vy = Math.min(0, player.vy); }
		checkHit(player, other);
	}

	function update(dt) {
		if (gameState === "playing") {
			updatePlayer(players[0], players[1], dt);
			updatePlayer(players[1], players[0], dt);
		} else if (gameState === "roundOver") {
			roundTimer -= dt;
			if (roundTimer <= 0) {
				const winnerIndex = roundWins[0] > roundWins[1] ? 0 : 1;
				if (roundWins[winnerIndex] >= targetWins) showMatchOver(winnerIndex);
				else beginNextRound();
			}
		}

		for (const particle of particles) {
			particle.x += particle.vx * dt;
			particle.y += particle.vy * dt;
			particle.life -= dt;
		}
		particles = particles.filter(particle => particle.life > 0);
		shake = Math.max(0, shake - 28 * dt);
	}

	function roundedRect(x, y, w, h, r, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.roundRect(x, y, w, h, r);
		ctx.fill();
	}

	function drawBackground() {
		ctx.fillStyle = "#173a3b";
		ctx.fillRect(0, 0, width, height);
		for (let row = 0, y = -30; y < height + 40; row++, y += 88) {
			for (let col = 0, x = (row % 2) * 45 - 35; x < width + 45; col++, x += 108) {
				const shade = (row * 7 + col * 11) % 4;
				ctx.fillStyle = ["#244849", "#28504d", "#214344", "#2b514d"][shade];
				ctx.fillRect(x, y, 94, 70);
				ctx.fillStyle = "rgba(8, 28, 30, .22)";
				ctx.fillRect(x + 8, y + 9, 78, 53);
				ctx.fillStyle = "rgba(207, 190, 126, .2)";
				ctx.fillRect(x + 17 + (col % 3) * 13, y + 18, 24, 3);
			}
		}
	}

	function drawArena() {
		const left = arena.left;
		const right = arena.right;
		const top = arena.top;
		const bottom = arena.bottom;
		const roofWidth = right - left;
		const roofHeight = bottom - top;

		roundedRect(left - 13, top - 13, roofWidth + 26, roofHeight + 26, 15, "#102c2f");
		roundedRect(left - 7, top - 7, roofWidth + 14, roofHeight + 14, 12, "#b78d59");
		roundedRect(left, top, roofWidth, roofHeight, 9, "#748b78");

		ctx.save();
		ctx.beginPath();
		ctx.roundRect(left, top, roofWidth, roofHeight, 9);
		ctx.clip();
		ctx.strokeStyle = "rgba(27, 57, 52, .2)";
		ctx.lineWidth = 1;
		for (let x = left + 56; x < right; x += 56) {
			ctx.beginPath();
			ctx.moveTo(x, top);
			ctx.lineTo(x, bottom);
			ctx.stroke();
		}
		for (let y = top + 52; y < bottom; y += 52) {
			ctx.beginPath();
			ctx.moveTo(left, y);
			ctx.lineTo(right, y);
			ctx.stroke();
		}
		ctx.fillStyle = "rgba(228, 205, 144, .13)";
		ctx.beginPath();
		ctx.arc((left + right) / 2, (top + bottom) / 2, Math.min(roofWidth, roofHeight) * 0.2, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "rgba(228, 205, 144, .25)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc((left + right) / 2, (top + bottom) / 2, Math.min(roofWidth, roofHeight) * 0.2, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();

		ctx.lineWidth = 4;
		ctx.strokeStyle = "#d8bf82";
		ctx.beginPath();
		ctx.roundRect(left - 7, top - 7, roofWidth + 14, roofHeight + 14, 12);
		ctx.stroke();

		const vents = [
			[left + roofWidth * 0.17, top + roofHeight * 0.21],
			[left + roofWidth * 0.83, top + roofHeight * 0.79]
		];
		for (const [x, y] of vents) {
			roundedRect(x - 30, y - 22, 60, 44, 5, "#526e65");
			roundedRect(x - 24, y - 16, 48, 32, 3, "#829180");
			ctx.strokeStyle = "rgba(31, 58, 52, .45)";
			ctx.lineWidth = 2;
			for (let line = -10; line <= 10; line += 7) {
				ctx.beginPath();
				ctx.moveTo(x - 15, y + line);
				ctx.lineTo(x + 15, y + line);
				ctx.stroke();
			}
		}

		for (const [x, y] of [[left, top], [right, top], [left, bottom], [right, bottom]]) {
			ctx.fillStyle = "#d4b675";
			ctx.fillRect(x - 8, y - 8, 16, 16);
			ctx.fillStyle = "#f4d98c";
			ctx.fillRect(x - 3, y - 3, 6, 6);
		}
	}

	function drawPlayer(player) {
		const blink = player.invulnerable > 0 && Math.floor(player.invulnerable * 24) % 2 === 0;
		if (blink) return;

		ctx.fillStyle = "rgba(17, 41, 39, .3)";
		ctx.beginPath();
		ctx.ellipse(player.x + 3, player.y + 6, 27, 23, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.save();
		ctx.translate(player.x, player.y);
		ctx.rotate(Math.atan2(player.facingY, player.facingX));

		ctx.fillStyle = player.color;
		ctx.beginPath();
		ctx.arc(0, 0, 23, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#173839";
		ctx.lineWidth = 4;
		ctx.stroke();

		ctx.fillStyle = "rgba(13, 47, 45, .45)";
		ctx.beginPath();
		ctx.ellipse(-4, 0, 12, 15, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#e9cfaa";
		ctx.beginPath();
		ctx.arc(2, 0, 13, 0, Math.PI * 2);
		ctx.fill();
		roundedRect(7, -8, 12, 16, 4, "#1a3d3d");
		ctx.fillStyle = player.accent;
		ctx.fillRect(12, -5, 4, 10);

		ctx.lineCap = "round";
		ctx.strokeStyle = "#5b4936";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(7, 14);
		ctx.lineTo(19, 10);
		ctx.stroke();
		ctx.strokeStyle = "#e0e7df";
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(17, 10);
		ctx.lineTo(43, 1);
		ctx.stroke();
		ctx.strokeStyle = "#d6b765";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(13, 4);
		ctx.lineTo(20, 16);
		ctx.stroke();

		if (player.attackTimer > 0) {
			ctx.globalAlpha = Math.min(0.8, player.attackTimer * 4);
			ctx.strokeStyle = player.accent;
			ctx.lineWidth = 8;
			ctx.beginPath();
			ctx.arc(0, 0, 64, -0.72, 0.72);
			ctx.stroke();
			ctx.globalAlpha = 1;
			ctx.strokeStyle = "#f3ead0";
			ctx.lineWidth = 6;
			ctx.beginPath();
			ctx.moveTo(18, 0);
			ctx.lineTo(76, 0);
			ctx.stroke();
		}
		ctx.restore();
	}

	function drawParticles() {
		for (const particle of particles) {
			ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
			ctx.fillStyle = particle.color;
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
	}

	function draw() {
		ctx.save();
		if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
		drawBackground();
		drawArena();
		drawParticles();
		for (const player of players) drawPlayer(player);
		ctx.restore();
	}

	function frame(now) {
		const dt = Math.min(0.032, (now - (lastTime || now)) / 1000);
		lastTime = now;
		update(dt);
		draw();
		requestAnimationFrame(frame);
	}

	startButton.addEventListener("click", startMatch);
	window.addEventListener("keydown", event => {
		const gameKeys = ["KeyA", "KeyD", "KeyW", "KeyS", "KeyF", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", "KeyR"];
		if (gameKeys.includes(event.code)) event.preventDefault();
		if (event.repeat) return;
		keys.add(event.code);
		if (event.code === "KeyR") {
			if (gameState === "playing") resetPlayers();
			else if (gameState === "roundOver") beginNextRound();
		}
		for (const player of players) {
			if (event.code === player.controls.attack) punch(player);
		}
	});
	window.addEventListener("keyup", event => keys.delete(event.code));
	window.addEventListener("blur", () => keys.clear());
	window.addEventListener("resize", resize);

	resize();
	resetPlayers();
	requestAnimationFrame(frame);
})();
