class ClickSpark {
    constructor(options = {}) {
        this.sparkColor = options.sparkColor || '#ff6b6b';
        this.sparkSize = options.sparkSize || 9;
        this.sparkRadius = options.sparkRadius || 120;
        this.sparkCount = options.sparkCount || 15;
        this.duration = options.duration || 1000;
        this.easing = options.easing || 'ease-out';
        this.extraScale = options.extraScale || 1.0;

        this.sparks = [];
        this.initCanvas();
        this.bindEvents();
        this.animate();
    }

    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        Object.assign(this.canvas.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: '999999'
        });

        document.body.appendChild(this.canvas);
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        window.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const now = performance.now();

            for (let i = 0; i < this.sparkCount; i++) {
                this.sparks.push({
                    x,
                    y,
                    angle: (2 * Math.PI * i) / this.sparkCount,
                    startTime: now
                });
            }
        });
    }

    easeFunc(t) {
        switch (this.easing) {
            case 'linear':
                return t;
            case 'ease-in':
                return t * t;
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default:
                return t * (2 - t);
        }
    }

    animate(timestamp = performance.now()) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparks = this.sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= this.duration) {
                return false;
            }

            const progress = elapsed / this.duration;
            const eased = this.easeFunc(progress);

            const distance = eased * this.sparkRadius * this.extraScale;
            const lineLength = this.sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            this.ctx.strokeStyle = this.sparkColor;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();

            return true;
        });

        requestAnimationFrame((ts) => this.animate(ts));
    }
}

// Initialisiere den Effekt für die gesamte Website
document.addEventListener('DOMContentLoaded', () => {
    new ClickSpark({
        sparkColor: '#ffd700',
        sparkSize: 9,
        sparkRadius: 120,
        sparkCount: 15,
        duration: 800
    });
});