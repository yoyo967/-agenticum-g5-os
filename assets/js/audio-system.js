/**
 * AGENTICUM G5 | AUDIO SYSTEM
 * Procedural Sci-Fi Sound Synthesis via Web Audio API
 * Zero external assets required. Pure Math.
 */

class G5AudioController {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.3; // Default volume
        this.enabled = true;
        this.initialized = false;
        
        console.log("G5 AUDIO :: SYSTEM ONLINE");
    }

    /**
     * Must be called after a user interaction to unlock AudioContext
     */
    init() {
        if (this.initialized) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.initialized = true;
        // this.playBoot(); // Optional immediate feedback
    }

    /**
     * Short high-pitch chirp for hovering over UI elements
     */
    playHover() {
        if (!this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    /**
     * Mechanical "docking" sound for clicks
     */
    playClick() {
        if (!this.enabled) return;
        
        // Impact
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.type = "square";
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);

        // High freq "chirp" overlay
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(2000, this.ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.05);
        
        gain2.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        
        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.05);
    }

    /**
     * Positive "Success" or "Access Granted" chime
     */
    playAccessGranted() {
        if (!this.enabled) return;
        
        const now = this.ctx.currentTime;
        
        // Create an arpeggio
        [440, 554, 659].forEach((freq, i) => { // A Major
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.type = "sine";
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, now + i * 0.05);
            gain.gain.linearRampToValueAtTime(0.1, now + i * 0.05 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
            
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.3);
        });
    }

    /**
     * Dramatic Boot Sound (THX style sweep)
     */
    playBoot() {
        if (!this.enabled) return;
        const now = this.ctx.currentTime;
        
        // Deep drone rising
        for (let i = 0; i < 3; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.type = "sawtooth";
            const startFreq = 30 + (i * 10);
            const endFreq = 60 + (i * 20); // Harmonizing
            
            osc.frequency.setValueAtTime(startFreq, now);
            osc.frequency.exponentialRampToValueAtTime(endFreq, now + 2);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 1);
            gain.gain.linearRampToValueAtTime(0, now + 3);
            
            osc.start(now);
            osc.stop(now + 3);
        }
    }

    toggleMute() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Singleton Instance
window.G5Audio = new G5AudioController();

// Auto-attach to UI elements once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initial interaction to unlock AudioContext
    document.body.addEventListener('click', () => {
        window.G5Audio.init();
    }, { once: true });

    // Attach Hover Sounds
    const interactiveElements = document.querySelectorAll('button, a, .agent-tile, .nav-link, .os-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => window.G5Audio.playHover());
        el.addEventListener('click', () => window.G5Audio.playClick());
    });
    
    // Mutation Observer for dynamically added elements (like nodes)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === 1) { // Element
                         if (node.matches('button, a, .agent-tile')) {
                             node.addEventListener('mouseenter', () => window.G5Audio.playHover());
                             node.addEventListener('click', () => window.G5Audio.playClick());
                         }
                         // Check children
                         const children = node.querySelectorAll('button, a, .agent-tile');
                         children.forEach(child => {
                             child.addEventListener('mouseenter', () => window.G5Audio.playHover());
                             child.addEventListener('click', () => window.G5Audio.playClick());
                         });
                     }
                 });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});
