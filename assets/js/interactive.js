/**
 * AGENTICUM G5 | INTERACTIVE EXPERIENCE
 * Live Terminal, Command Palette, Audio, Keyboard Shortcuts
 */

// ============================================
// LIVE TERMINAL DEMO
// ============================================
class LiveTerminal {
    constructor(terminalId) {
        this.terminal = document.getElementById(terminalId);
        if (!this.terminal) return;
        
        this.setupLiveInput();
        this.commands = {
            'help': () => this.showHelp(),
            'status': () => this.showStatus(),
            'nodes': () => this.showNodes(),
            'demo': () => this.runDemo(),
            'clear': () => this.clear(),
            'about': () => this.showAbout(),
            'start': () => this.startSystem(),
            'matrix': () => this.matrixMode()
        };
    }
    
    setupLiveInput() {
        // Add input field to terminal
        const inputContainer = document.createElement('div');
        inputContainer.className = 'terminal-input-container';
        inputContainer.innerHTML = `
            <span class="input-prompt">&gt;</span>
            <input type="text" class="terminal-input" placeholder="Type 'help' for commands..." autocomplete="off">
        `;
        this.terminal.appendChild(inputContainer);
        
        this.input = inputContainer.querySelector('.terminal-input');
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.input.value.trim().toLowerCase());
                this.input.value = '';
            }
        });
        
        // Focus on click
        this.terminal.addEventListener('click', () => this.input.focus());
    }
    
    addLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `trace-line ${className}`;
        line.textContent = text;
        this.terminal.insertBefore(line, this.terminal.lastElementChild);
        this.terminal.scrollTop = this.terminal.scrollHeight;
        
        // Play sound
        G5Audio.play('type');
    }
    
    executeCommand(cmd) {
        if (!cmd) return;
        
        this.addLine(`> ${cmd}`, 'prompt');
        G5Audio.play('command');
        
        if (this.commands[cmd]) {
            this.commands[cmd]();
        } else {
            this.addLine(`[SN-00] Processing: "${cmd}"...`, 'thinking');
            setTimeout(() => {
                this.addLine(`[SP-99] HEGEMONY_MATRIX analyzing...`, 'node-active');
                setTimeout(() => {
                    this.addLine(`✓ Response generated. Visit dashboard for full interaction.`, 'success');
                    G5Toast.show('Command processed by 52-node fabric');
                }, 800);
            }, 500);
        }
    }
    
    showHelp() {
        const helpText = [
            '╔══════════════════════════════════════════════╗',
            '║  AVAILABLE COMMANDS                          ║',
            '╠══════════════════════════════════════════════╣',
            '║  help    - Show this help menu               ║',
            '║  status  - Display system status             ║',
            '║  nodes   - List active nodes                 ║',
            '║  demo    - Run demonstration sequence        ║',
            '║  about   - About AGENTICUM G5                ║',
            '║  start   - Initialize full system            ║',
            '║  clear   - Clear terminal                    ║',
            '║  matrix  - ???                               ║',
            '╚══════════════════════════════════════════════╝'
        ];
        helpText.forEach((line, i) => {
            setTimeout(() => this.addLine(line, 'system'), i * 50);
        });
    }
    
    showStatus() {
        const status = [
            '[SYSTEM_STATUS]',
            '├─ Core: GEMINI_3_PRO ✓',
            '├─ Nodes: 52/52 ONLINE',
            '├─ Latency: <100ms',
            '├─ Memory: 2M Token Context',
            '├─ Region: GCP Frankfurt',
            '└─ Status: OPERATIONAL'
        ];
        status.forEach((line, i) => {
            setTimeout(() => this.addLine(line, 'success'), i * 100);
        });
    }
    
    showNodes() {
        const nodes = [
            '[ACTIVE_NODES: 52]',
            '├─ STRATEGY: SN-00, SP-01, SP-99, SP-77...',
            '├─ CREATION: CC-01, CC-06, CC-08, CC-13...',
            '├─ INTELLIGENCE: RA-01, RA-06, RA-52...',
            '├─ DATA: DT-02, DT-04, DT-07...',
            '└─ META: MI-01, MI-07, MI-15...'
        ];
        nodes.forEach((line, i) => {
            setTimeout(() => this.addLine(line, 'node-active'), i * 100);
        });
    }
    
    runDemo() {
        const demo = [
            '[DEMO_SEQUENCE_INITIATED]',
            '',
            '[SN-00] ORCHESTRATOR: Initializing demo...',
            '[SP-01] STRATEGIST: Generating campaign strategy...',
            '[CC-06] VIDEO_DIRECTOR: Preparing Veo 3.1...',
            '[RA-52] RED_TEAM: Running adversarial tests...',
            '',
            '✓ Strategy: Premium Product Launch',
            '✓ Assets: 3 videos, 12 images generated',
            '✓ Copy: 24 variants created',
            '✓ Timeline: 7-day execution plan',
            '',
            '[DEMO_COMPLETE] Enter dashboard for full experience.'
        ];
        
        demo.forEach((line, i) => {
            const cls = line.startsWith('✓') ? 'success' : 
                        line.startsWith('[S') ? 'thinking' : 
                        line.includes('COMPLETE') ? 'success' : '';
            setTimeout(() => this.addLine(line, cls), i * 200);
        });
        
        setTimeout(() => G5Toast.show('Demo sequence complete!', 'success'), demo.length * 200);
    }
    
    showAbout() {
        const about = [
            '╔══════════════════════════════════════════════╗',
            '║  AGENTICUM G5                                ║',
            '║  Industrial Autonomous Marketing OS          ║',
            '╠══════════════════════════════════════════════╣',
            '║  Version: 5.0.1_RC                           ║',
            '║  Core: Gemini 3 Pro                          ║',
            '║  Nodes: 52 Specialized AI Agents             ║',
            '║  Context: 2M Tokens                          ║',
            '║  Operator: Yahya Yildirim                    ║',
            '║  Hackathon: Google DeepMind Gemini 2026      ║',
            '╚══════════════════════════════════════════════╝'
        ];
        about.forEach((line, i) => {
            setTimeout(() => this.addLine(line, 'system'), i * 50);
        });
    }
    
    startSystem() {
        G5Toast.show('Redirecting to Hegemony Console...', 'info');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }
    
    clear() {
        const lines = this.terminal.querySelectorAll('.trace-line');
        lines.forEach(line => line.remove());
        this.addLine('[TERMINAL_CLEARED]', 'system');
    }
    
    matrixMode() {
        document.body.classList.add('matrix-mode');
        this.addLine('[MATRIX_MODE_ACTIVATED]', 'success');
        G5Audio.play('easter');
        G5Toast.show('🔮 Matrix Mode Enabled', 'success');
        
        setTimeout(() => {
            document.body.classList.remove('matrix-mode');
        }, 10000);
    }
}

// ============================================
// COMMAND PALETTE (Cmd+K)
// ============================================
class CommandPalette {
    constructor() {
        this.isOpen = false;
        this.createPalette();
        this.setupShortcuts();
    }
    
    createPalette() {
        const palette = document.createElement('div');
        palette.className = 'command-palette';
        palette.innerHTML = `
            <div class="palette-backdrop"></div>
            <div class="palette-container">
                <div class="palette-header">
                    <input type="text" class="palette-input" placeholder="Type a command or search...">
                    <span class="palette-shortcut">ESC to close</span>
                </div>
                <div class="palette-results">
                    <div class="palette-group">
                        <span class="group-label">NAVIGATION</span>
                        <div class="palette-item" data-action="goto-manifesto">
                            <span class="item-icon">📜</span>
                            <span class="item-label">Go to Manifesto</span>
                            <span class="item-shortcut">M</span>
                        </div>
                        <div class="palette-item" data-action="goto-capabilities">
                            <span class="item-icon">⚡</span>
                            <span class="item-label">Go to Capabilities</span>
                            <span class="item-shortcut">C</span>
                        </div>
                        <div class="palette-item" data-action="goto-architecture">
                            <span class="item-icon">🔮</span>
                            <span class="item-label">Go to Architecture</span>
                            <span class="item-shortcut">A</span>
                        </div>
                        <div class="palette-item" data-action="goto-demo">
                            <span class="item-icon">💻</span>
                            <span class="item-label">Go to Demo</span>
                            <span class="item-shortcut">D</span>
                        </div>
                    </div>
                    <div class="palette-group">
                        <span class="group-label">ACTIONS</span>
                        <div class="palette-item" data-action="enter-console">
                            <span class="item-icon">🚀</span>
                            <span class="item-label">Enter Console</span>
                            <span class="item-shortcut">⏎</span>
                        </div>
                        <div class="palette-item" data-action="toggle-sound">
                            <span class="item-icon">🔊</span>
                            <span class="item-label">Toggle Sound</span>
                            <span class="item-shortcut">S</span>
                        </div>
                        <div class="palette-item" data-action="share">
                            <span class="item-icon">📤</span>
                            <span class="item-label">Share Page</span>
                            <span class="item-shortcut">⇧S</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(palette);
        
        this.palette = palette;
        this.input = palette.querySelector('.palette-input');
        this.items = palette.querySelectorAll('.palette-item');
        
        // Event listeners
        palette.querySelector('.palette-backdrop').addEventListener('click', () => this.close());
        this.input.addEventListener('input', () => this.filter());
        
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                this.executeAction(item.dataset.action);
                this.close();
            });
        });
    }
    
    setupShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            // ESC
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
            
            // Single key shortcuts (when palette is closed)
            if (!this.isOpen && !e.target.matches('input, textarea')) {
                switch(e.key.toLowerCase()) {
                    case 'm': this.scrollTo('#manifesto'); break;
                    case 'c': this.scrollTo('#capabilities'); break;
                    case 'a': this.scrollTo('#architecture'); break;
                    case 'd': this.scrollTo('#demo'); break;
                    case 's': 
                        if (e.shiftKey) this.share();
                        else G5Audio.toggle();
                        break;
                    case 'enter': 
                        if (e.shiftKey) window.location.href = 'dashboard.html';
                        break;
                }
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.palette.classList.add('active');
        this.input.value = '';
        this.input.focus();
        G5Audio.play('open');
    }
    
    close() {
        this.isOpen = false;
        this.palette.classList.remove('active');
        G5Audio.play('close');
    }
    
    filter() {
        const query = this.input.value.toLowerCase();
        this.items.forEach(item => {
            const label = item.querySelector('.item-label').textContent.toLowerCase();
            item.style.display = label.includes(query) ? 'flex' : 'none';
        });
    }
    
    executeAction(action) {
        switch(action) {
            case 'goto-manifesto': this.scrollTo('#manifesto'); break;
            case 'goto-capabilities': this.scrollTo('#capabilities'); break;
            case 'goto-architecture': this.scrollTo('#architecture'); break;
            case 'goto-demo': this.scrollTo('#demo'); break;
            case 'enter-console': window.location.href = 'dashboard.html'; break;
            case 'toggle-sound': G5Audio.toggle(); break;
            case 'share': this.share(); break;
        }
    }
    
    scrollTo(selector) {
        const el = document.querySelector(selector);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            G5Audio.play('navigate');
        }
    }
    
    share() {
        if (navigator.share) {
            navigator.share({
                title: 'AGENTICUM G5',
                text: 'Don\'t hire an Agency. License a Civilization.',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            G5Toast.show('Link copied to clipboard!', 'success');
        }
    }
}

// ============================================
// AUDIO SYSTEM
// ============================================
const G5Audio = {
    enabled: true,
    context: null,
    
    init() {
        // Create audio context on first interaction
        document.addEventListener('click', () => {
            if (!this.context) {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    },
    
    play(type) {
        if (!this.enabled || !this.context) return;
        
        const sounds = {
            type: { freq: 800, duration: 0.05, volume: 0.1 },
            command: { freq: 440, duration: 0.1, volume: 0.15 },
            success: { freq: 880, duration: 0.15, volume: 0.2 },
            error: { freq: 220, duration: 0.2, volume: 0.2 },
            open: { freq: 600, duration: 0.08, volume: 0.1 },
            close: { freq: 400, duration: 0.08, volume: 0.1 },
            navigate: { freq: 660, duration: 0.1, volume: 0.1 },
            easter: { freq: 1200, duration: 0.3, volume: 0.25 }
        };
        
        const sound = sounds[type] || sounds.type;
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.frequency.value = sound.freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(sound.volume, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + sound.duration);
        
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + sound.duration);
    },
    
    toggle() {
        this.enabled = !this.enabled;
        G5Toast.show(this.enabled ? '🔊 Sound enabled' : '🔇 Sound disabled');
    }
};

// ============================================
// TOAST NOTIFICATIONS
// ============================================
const G5Toast = {
    container: null,
    
    init() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    },
    
    show(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
class ScrollProgress {
    constructor() {
        this.createIndicator();
        this.setupListener();
    }
    
    createIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress';
        indicator.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(indicator);
        
        this.bar = indicator.querySelector('.scroll-progress-bar');
    }
    
    setupListener() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            this.bar.style.width = `${progress}%`;
        });
    }
}

// ============================================
// KONAMI CODE EASTER EGG
// ============================================
class KonamiCode {
    constructor() {
        this.code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.index = 0;
        this.setupListener();
    }
    
    setupListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.code[this.index]) {
                this.index++;
                if (this.index === this.code.length) {
                    this.activate();
                    this.index = 0;
                }
            } else {
                this.index = 0;
            }
        });
    }
    
    activate() {
        document.body.classList.add('party-mode');
        G5Audio.play('easter');
        G5Toast.show('🎉 PARTY MODE ACTIVATED!', 'success');
        
        // Create confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => this.createConfetti(), i * 30);
        }
        
        setTimeout(() => {
            document.body.classList.remove('party-mode');
        }, 10000);
    }
    
    createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#00f3ff', '#ff00ff', '#ff4800', '#00ff41'][Math.floor(Math.random() * 4)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ============================================
// LIVE METRICS DISPLAY
// ============================================
class LiveMetrics {
    constructor() {
        this.metrics = {
            nodes: 52,
            latency: 87,
            tokens: 1847293,
            requests: 0
        };
        
        this.createDisplay();
        this.startUpdating();
    }
    
    createDisplay() {
        const display = document.createElement('div');
        display.className = 'live-metrics';
        display.innerHTML = `
            <div class="metric">
                <span class="metric-value" id="metric-nodes">52</span>
                <span class="metric-label">NODES</span>
            </div>
            <div class="metric">
                <span class="metric-value" id="metric-latency">87ms</span>
                <span class="metric-label">LATENCY</span>
            </div>
            <div class="metric">
                <span class="metric-value" id="metric-tokens">1.8M</span>
                <span class="metric-label">TOKENS</span>
            </div>
        `;
        
        const header = document.querySelector('.landing-header');
        if (header) {
            header.appendChild(display);
        }
    }
    
    startUpdating() {
        setInterval(() => {
            // Simulate latency fluctuation
            this.metrics.latency = 80 + Math.floor(Math.random() * 40);
            document.getElementById('metric-latency').textContent = this.metrics.latency + 'ms';
            
            // Simulate token usage
            this.metrics.tokens += Math.floor(Math.random() * 1000);
            const tokenDisplay = (this.metrics.tokens / 1000000).toFixed(1) + 'M';
            document.getElementById('metric-tokens').textContent = tokenDisplay;
            
        }, 2000);
    }
}

// ============================================
// LOADING SCREEN
// ============================================
class LoadingScreen {
    constructor() {
        this.createScreen();
        this.animate();
    }
    
    createScreen() {
        const screen = document.createElement('div');
        screen.className = 'loading-screen';
        screen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">AGENTICUM <span>G5</span></div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-text">INITIALIZING NEURAL FABRIC...</div>
            </div>
        `;
        document.body.appendChild(screen);
        
        this.screen = screen;
        this.progress = screen.querySelector('.loading-progress');
        this.text = screen.querySelector('.loading-text');
    }
    
    animate() {
        const messages = [
            'INITIALIZING NEURAL FABRIC...',
            'CONNECTING 52 NODES...',
            'LOADING GEMINI 3 PRO...',
            'CALIBRATING HEGEMONY MATRIX...',
            'SYSTEM READY'
        ];
        
        let progress = 0;
        let messageIndex = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) progress = 100;
            
            this.progress.style.width = progress + '%';
            
            if (progress > messageIndex * 25 && messageIndex < messages.length) {
                this.text.textContent = messages[messageIndex];
                messageIndex++;
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.screen.classList.add('loaded');
                    setTimeout(() => this.screen.remove(), 500);
                }, 500);
            }
        }, 100);
    }
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen first
    new LoadingScreen();
    
    // Then everything else
    setTimeout(() => {
        G5Audio.init();
        G5Toast.init();
        
        new LiveTerminal('landing-terminal');
        new CommandPalette();
        new ScrollProgress();
        new KonamiCode();
        new LiveMetrics();
        
        console.log('🚀 AGENTICUM G5 | Interactive Experience Loaded');
        console.log('💡 Press Cmd/Ctrl+K for command palette');
        console.log('🎮 Try the Konami Code for a surprise!');
    }, 2500);
});
