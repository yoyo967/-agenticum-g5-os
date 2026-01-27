/**
 * AGENTICUM G5 | PARTICLE SYSTEM V1.0
 * Premium ambient visual effects for Industrial Noir aesthetic
 */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    init() {
        const particleCount = Math.floor((this.width * this.height) / 25000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        // Enterprise color palette - muted, professional
        const colors = [
            'rgba(74, 158, 255, 0.4)',    // Professional Blue
            'rgba(107, 122, 153, 0.3)',   // Slate Gray
            'rgba(151, 117, 250, 0.25)',  // Muted Purple
            'rgba(255, 255, 255, 0.15)'   // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw particles
        this.particles.forEach((p, i) => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around edges
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Draw connections to nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(74, 158, 255, ${0.12 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
            
            // Mouse interaction
            const mdx = p.x - this.mouseX;
            const mdy = p.y - this.mouseY;
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
            
            if (mouseDist < 150) {
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(this.mouseX, this.mouseY);
                this.ctx.strokeStyle = `rgba(151, 117, 250, ${0.25 * (1 - mouseDist / 150)})`;
                this.ctx.lineWidth = 0.8;
                this.ctx.stroke();
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particle-canvas');
});
