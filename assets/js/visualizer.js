/* OSCILLOSCOPE & NEURAL VISUALIZATION */
class WarRoomVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.nodes = [];
        this.connections = [];
        this.particles = [];
        
        window.addEventListener('resize', () => this.resize());
        this.initNodes();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    initNodes() {
        // Create visual nodes responding to the grid
        // In a real app, this would map 1:1 to the DOM nodes
        for(let i=0; i<30; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                status: 'idle'
            });
        }
    }

    triggerPulse(sourceIndex) {
        // Create an explosion of connectivity from a random point
        const source = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        source.status = 'active';
        setTimeout(() => source.status = 'idle', 1000);
        
        for(let i=0; i<5; i++) {
            this.particles.push({
                x: source.x,
                y: source.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0
            });
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update Nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce
            if(node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if(node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Draw Node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.status === 'active' ? 4 : 2, 0, Math.PI * 2);
            this.ctx.fillStyle = node.status === 'active' ? '#00f3ff' : '#333';
            this.ctx.fill();

            // Connections
            this.nodes.forEach(other => {
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(node.x, node.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist/100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });

        // Update Particles (Activity)
        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            if(p.life <= 0) {
                this.particles.splice(index, 1);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 72, 0, ${p.life})`;
                this.ctx.fill();
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}
