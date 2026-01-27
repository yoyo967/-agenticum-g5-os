/**
 * AGENTICUM G5 | HEGEMONY_VISUALIZER V2.0
 * 
 * High-fidelity neural network visualization for the War Room.
 */

class WarRoomVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.pulseRadius = 0;
        this.isPulsing = false;
        
        this.resize();
        this.initNodes();
        window.addEventListener('resize', () => this.resize());
        this.animate();
        
        // Color Palette
        this.colors = {
            accent: '#00f3ff',
            subtle: 'rgba(0, 243, 255, 0.1)',
            connect: 'rgba(0, 243, 255, 0.05)',
            glow: '#ff00ff'
        };
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    initNodes() {
        // Create a central cluster and satellite nodes
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Central Orchestrator Node
        this.nodes.push({
            x: centerX,
            y: centerY,
            vx: 0,
            vy: 0,
            radius: 4,
            isCore: true,
            label: 'SN-00'
        });

        // 52 satellite nodes (representing the G5 fabric)
        for (let i = 0; i < 52; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 50 + Math.random() * 250;
            this.nodes.push({
                x: centerX + Math.cos(angle) * dist,
                y: centerY + Math.sin(angle) * dist,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radius: 1.5,
                isCore: false
            });
        }
    }

    triggerPulse() {
        this.isPulsing = true;
        this.pulseRadius = 0;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw Connections
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.colors.connect;
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dist = Math.hypot(this.nodes[i].x - this.nodes[j].x, this.nodes[i].y - this.nodes[j].y);
                if (dist < 100) {
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                }
            }
        }
        this.ctx.stroke();

        // Draw Nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.isCore ? this.colors.accent : 'rgba(255,255,255,0.3)';
            this.ctx.fill();
            
            if (node.isCore) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = this.colors.accent;
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        });

        // Global Pulse (The "Thinking" Wave)
        if (this.isPulsing) {
            this.pulseRadius += 5;
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.pulseRadius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(255, 0, 255, ${Math.max(0, 1 - this.pulseRadius / 400)})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            if (this.pulseRadius > 400) this.isPulsing = false;
        }

        requestAnimationFrame(() => this.animate());
    }
}
