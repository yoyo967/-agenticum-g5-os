/**
 * AGENTICUM G5 | NEURAL NETWORK VISUALIZATION
 * Interactive 52-Node Architecture
 */

class NeuralNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.activeNode = null;
        
        this.nodeData = [
            // Strategy Cluster
            { id: 'SN-00', name: 'ORCHESTRATOR', cluster: 'strategy', tier: 0 },
            { id: 'SP-01', name: 'Campaign Strategist', cluster: 'strategy', tier: 1 },
            { id: 'SP-99', name: 'Hegemony Matrix', cluster: 'strategy', tier: 1 },
            { id: 'SP-77', name: 'Logic Patcher', cluster: 'strategy', tier: 2 },
            { id: 'SP-15', name: 'Market Analyst', cluster: 'strategy', tier: 2 },
            // Creation Cluster
            { id: 'CC-06', name: 'Video Director', cluster: 'creation', tier: 1 },
            { id: 'CC-01', name: 'Copy Chief', cluster: 'creation', tier: 1 },
            { id: 'CC-08', name: 'Flash Voice', cluster: 'creation', tier: 2 },
            { id: 'CC-13', name: 'Music Composer', cluster: 'creation', tier: 2 },
            { id: 'CC-21', name: 'Visual Designer', cluster: 'creation', tier: 2 },
            // Intelligence Cluster
            { id: 'RA-01', name: 'Authority Auditor', cluster: 'intel', tier: 1 },
            { id: 'RA-06', name: 'Trend Forecaster', cluster: 'intel', tier: 1 },
            { id: 'RA-52', name: 'The Red Team', cluster: 'intel', tier: 2 },
            { id: 'RA-33', name: 'Competitor Tracker', cluster: 'intel', tier: 2 },
            // More nodes...
            { id: 'DT-02', name: 'Pricing Engine', cluster: 'data', tier: 1 },
            { id: 'DT-04', name: 'Analytics Core', cluster: 'data', tier: 2 },
            { id: 'MI-01', name: 'Compliance', cluster: 'meta', tier: 1 },
            { id: 'MI-07', name: 'Ethics Guardian', cluster: 'meta', tier: 2 }
        ];
        
        // Enterprise color palette - professional and muted
        this.clusterColors = {
            strategy: { primary: '#4a9eff', secondary: 'rgba(74, 158, 255, 0.2)' },
            creation: { primary: '#9775fa', secondary: 'rgba(151, 117, 250, 0.2)' },
            intel: { primary: '#f59e0b', secondary: 'rgba(245, 158, 11, 0.2)' },
            data: { primary: '#34d399', secondary: 'rgba(52, 211, 153, 0.2)' },
            meta: { primary: '#6b7a99', secondary: 'rgba(107, 122, 153, 0.2)' }
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNodes();
        this.setupEvents();
        this.animate();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height || 500;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }
    
    createNodes() {
        const tierRadii = [0, 100, 180, 260];
        const clusterAngles = {
            strategy: 0,
            creation: 72,
            intel: 144,
            data: 216,
            meta: 288
        };
        
        let clusterCounts = {};
        
        this.nodeData.forEach((data, i) => {
            if (!clusterCounts[data.cluster]) {
                clusterCounts[data.cluster] = { 0: 0, 1: 0, 2: 0 };
            }
            
            const baseAngle = clusterAngles[data.cluster];
            const tierRadius = tierRadii[data.tier];
            const countInTier = clusterCounts[data.cluster][data.tier];
            const angleOffset = (countInTier - 1) * 15;
            const angle = (baseAngle + angleOffset) * Math.PI / 180;
            
            clusterCounts[data.cluster][data.tier]++;
            
            const x = this.centerX + Math.cos(angle) * tierRadius;
            const y = this.centerY + Math.sin(angle) * tierRadius;
            
            this.nodes.push({
                ...data,
                x,
                y,
                targetX: x,
                targetY: y,
                radius: data.tier === 0 ? 30 : data.tier === 1 ? 15 : 10,
                pulsePhase: Math.random() * Math.PI * 2,
                active: false
            });
        });
        
        // Create connections
        this.nodes.forEach((node, i) => {
            if (node.tier > 0) {
                // Connect to orchestrator
                this.connections.push({
                    from: 0,
                    to: i,
                    strength: 1 / node.tier
                });
            }
            
            // Connect within cluster
            this.nodes.forEach((other, j) => {
                if (i !== j && node.cluster === other.cluster && Math.abs(node.tier - other.tier) === 1) {
                    if (!this.connections.find(c => (c.from === i && c.to === j) || (c.from === j && c.to === i))) {
                        this.connections.push({
                            from: i,
                            to: j,
                            strength: 0.5
                        });
                    }
                }
            });
        });
    }
    
    setupEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            // Find hovered node
            this.activeNode = null;
            this.nodes.forEach((node, i) => {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < node.radius + 10) {
                    this.activeNode = i;
                }
            });
            
            this.canvas.style.cursor = this.activeNode !== null ? 'pointer' : 'default';
        });
        
        this.canvas.addEventListener('click', () => {
            if (this.activeNode !== null) {
                const node = this.nodes[this.activeNode];
                this.triggerNodeActivation(node);
            }
        });
    }
    
    triggerNodeActivation(node) {
        node.active = true;
        
        // Ripple effect to connected nodes
        setTimeout(() => {
            this.connections.forEach(conn => {
                if (conn.from === this.nodes.indexOf(node) || conn.to === this.nodes.indexOf(node)) {
                    const otherIndex = conn.from === this.nodes.indexOf(node) ? conn.to : conn.from;
                    this.nodes[otherIndex].active = true;
                    setTimeout(() => {
                        this.nodes[otherIndex].active = false;
                    }, 500);
                }
            });
        }, 100);
        
        setTimeout(() => {
            node.active = false;
        }, 800);
        
        // Log to console
        console.log(`🔵 Node Activated: ${node.id} - ${node.name}`);
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const time = Date.now() * 0.001;
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            
            const isActive = from.active || to.active;
            const alpha = isActive ? 0.6 : 0.15;
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = isActive 
                ? this.clusterColors[from.cluster].primary 
                : `rgba(255, 255, 255, ${alpha})`;
            this.ctx.lineWidth = isActive ? 2 : 1;
            this.ctx.stroke();
            
            // Data flow particles
            if (Math.random() < 0.02) {
                this.drawDataParticle(from, to, this.clusterColors[from.cluster].primary);
            }
        });
        
        // Draw nodes
        this.nodes.forEach((node, i) => {
            const colors = this.clusterColors[node.cluster];
            const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.2 + 0.8;
            const isHovered = this.activeNode === i;
            const radiusMod = isHovered ? 1.3 : 1;
            
            // Outer glow
            if (node.active || node.tier === 0) {
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * 2.5 * radiusMod
                );
                gradient.addColorStop(0, colors.secondary);
                gradient.addColorStop(1, 'transparent');
                
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius * 2.5 * radiusMod, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
            
            // Node body
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulse * radiusMod, 0, Math.PI * 2);
            this.ctx.fillStyle = node.active ? colors.primary : `rgba(20, 20, 20, 0.9)`;
            this.ctx.fill();
            this.ctx.strokeStyle = colors.primary;
            this.ctx.lineWidth = node.active ? 3 : 1;
            this.ctx.stroke();
            
            // Node label (only for tier 0 and 1, or hovered)
            if (node.tier <= 1 || isHovered) {
                this.ctx.font = `${node.tier === 0 ? 12 : 9}px "JetBrains Mono", monospace`;
                this.ctx.fillStyle = isHovered ? 'white' : colors.primary;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(node.id, node.x, node.y + 4);
                
                if (isHovered) {
                    this.ctx.font = '10px "Inter", sans-serif';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    this.ctx.fillText(node.name, node.x, node.y + node.radius + 16);
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawDataParticle(from, to, color) {
        // Simple particle animation along connection
        const particle = {
            x: from.x,
            y: from.y,
            progress: 0
        };
        
        const animateParticle = () => {
            particle.progress += 0.03;
            if (particle.progress >= 1) return;
            
            particle.x = from.x + (to.x - from.x) * particle.progress;
            particle.y = from.y + (to.y - from.y) * particle.progress;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            
            requestAnimationFrame(animateParticle);
        };
        
        animateParticle();
    }
}

// Initialize when architecture section is in view
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('neural-network-container');
    if (container) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    new NeuralNetwork('neural-network-container');
                    observer.disconnect();
                    console.log('🔮 Neural Network Visualization Initialized');
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(container);
    }
});

