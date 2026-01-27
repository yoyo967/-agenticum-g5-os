/**
 * AGENTICUM G5 | DASHBOARD ENHANCEMENTS V1.0
 * C-Level Maximum Excellence Features
 */

// ============================================
// DASHBOARD PARTICLES (Background Effect)
// ============================================
class DashboardParticles {
    constructor() {
        this.canvas = document.getElementById('dashboard-particles');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 60;
    }
    
    init() {
        const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 25000);
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(0, 243, 255, 0.5)',   // Teal
            'rgba(255, 0, 255, 0.3)',   // Magenta
            'rgba(255, 72, 0, 0.3)',    // Orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 * (1 - dist / 100)})`;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// NODE CLUSTER RENDERER
// ============================================
function renderNodeClusters() {
    const strategyNodes = [
        { id: 'SN-00', name: 'Orchestrator', active: true },
        { id: 'SP-01', name: 'Strategist', active: true },
        { id: 'SP-99', name: 'Hegemony', active: true },
        { id: 'SP-77', name: 'Logic', active: false }
    ];
    
    const creationNodes = [
        { id: 'CC-01', name: 'Copy Chief', active: true },
        { id: 'CC-06', name: 'Video Dir', active: true },
        { id: 'CC-08', name: 'Voice', active: false },
        { id: 'CC-13', name: 'Music', active: false }
    ];
    
    const intelNodes = [
        { id: 'RA-01', name: 'Auditor', active: true },
        { id: 'RA-06', name: 'Forecaster', active: true },
        { id: 'RA-52', name: 'Red Team', active: false },
        { id: 'MI-01', name: 'Compliance', active: true }
    ];
    
    renderCluster('strategy-nodes', strategyNodes);
    renderCluster('creation-nodes', creationNodes);
    renderCluster('intel-nodes', intelNodes);
}

function renderCluster(containerId, nodes) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = nodes.map(node => `
        <div class="node-chip ${node.active ? 'active' : ''}" data-node-id="${node.id}">
            <span class="node-id">${node.id}</span>
            <span class="node-status">${node.active ? '●' : '○'}</span>
        </div>
    `).join('');
}

// ============================================
// ENHANCED CLOCK
// ============================================
function initEnhancedClock() {
    const clockElement = document.getElementById('system-clock');
    if (!clockElement) return;
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// ============================================
// LOG SYSTEM
// ============================================
function log(message, type = 'sys') {
    const logStream = document.getElementById('log-stream');
    if (!logStream) return;
    
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const typeClass = type === 'sys' ? 'sys' : 'node';
    const typeLabel = type === 'sys' ? '[SYS]' : `[${type.toUpperCase()}]`;
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="time">${time}</span> <span class="${typeClass}">${typeLabel}</span> ${message}`;
    
    logStream.appendChild(entry);
    logStream.scrollTop = logStream.scrollHeight;
}

function clearLog() {
    const logStream = document.getElementById('log-stream');
    if (logStream) {
        logStream.innerHTML = '<div class="log-entry"><span class="time">--:--:--</span> <span class="sys">[SYS]</span> Log cleared.</div>';
    }
}

// ============================================
// FULLSCREEN TOGGLE
// ============================================
function toggleFullscreen() {
    const warRoom = document.getElementById('war-room-display');
    if (!warRoom) return;
    
    if (!document.fullscreenElement) {
        warRoom.requestFullscreen().catch(err => {
            console.log('Fullscreen not available:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// ============================================
// SEND COMMAND (Enhanced Terminal)
// ============================================
function sendCommand() {
    const input = document.getElementById('command-input');
    if (!input || !input.value.trim()) return;
    
    executeCommand(input.value);
    input.value = '';
}

// ============================================
// ASSET MODAL
// ============================================
function openAssetModal(title, content) {
    const modal = document.getElementById('asset-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    modalTitle.textContent = title;
    modalBody.innerHTML = `<pre style="color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.8rem; white-space: pre-wrap;">${content}</pre>`;
    modal.style.display = 'flex';
}

function closeAssetModal() {
    const modal = document.getElementById('asset-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ============================================
// LATENCY SIMULATOR
// ============================================
function simulateLatency() {
    const latencyDisplay = document.getElementById('latency-display');
    if (!latencyDisplay) return;
    
    setInterval(() => {
        const latency = Math.floor(Math.random() * 50) + 80;
        latencyDisplay.textContent = `~${latency}ms`;
    }, 3000);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Enter to send command
        if (e.key === 'Enter' && document.activeElement.id === 'command-input') {
            sendCommand();
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            closeAssetModal();
        }
        
        // Ctrl+K to focus command input
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('command-input')?.focus();
        }
    });
}

// ============================================
// NODE ACTIVATION ENHANCEMENT
// ============================================
function activateNodeChip(nodeId) {
    const chip = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (chip) {
        chip.classList.add('active', 'pulsing');
    }
}

function deactivateNodeChip(nodeId) {
    const chip = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (chip) {
        chip.classList.remove('pulsing');
    }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('G5 Dashboard Enhancements Loading...');
    
    // Initialize particles
    new DashboardParticles();
    
    // Render node clusters
    renderNodeClusters();
    
    // Initialize clock
    initEnhancedClock();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Start latency simulator
    simulateLatency();
    
    // Log initialization
    setTimeout(() => {
        log('Dashboard enhancements loaded.', 'sys');
        log('All 52 nodes synchronized.', 'sn-00');
    }, 500);
    
    console.log('G5 Dashboard Enhancements Loaded ✓');
});

// Expose functions globally
window.log = log;
window.clearLog = clearLog;
window.toggleFullscreen = toggleFullscreen;
window.sendCommand = sendCommand;
window.openAssetModal = openAssetModal;
window.closeAssetModal = closeAssetModal;
