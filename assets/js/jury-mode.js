/**
 * AGENTICUM G5 | JURY MODE / HACKATHON DEMO SEQUENCE V6.0 (ATOMIC)
 * 
 * "The Perfect Demo" Engine.
 * Auto-drives the OS through a "Showtime" sequence for the judges.
 */

window.JuryMode = {
    active: false,
    
    // DEMO CONFIG
    assets: [
        { id: 'MAN_V5', type: 'text', name: 'MANIFESTO_V5.md', size: '4.2 KB', content: 'The Architecture of Will: We license a civilization.\n\nWe have pulverized the era of tools. AGENTICUM G5 is not a chatbot. It is an industrial response to the fragmentation of the creative economy.\n\nBy leveraging Gemini 3 2M context, we create an "Infinite Present".' },
        { id: 'VEO_01', type: 'video', name: 'VEO_CINEMATIC.mp4', size: '420 MB', content: 'https://example.com/placeholder-video.mp4' },
        { id: 'IMG_01', type: 'image', name: 'IMAGEN_GENERATION_01.png', size: '12 MB', content: 'https://example.com/placeholder-image.png' }
    ],

    /**
     * INITIATE THE "PERFECT DEMO"
     */
    init: async function() {
        if (this.active) return;
        this.active = true;
        console.log("🏆 G5 >> INITIATING JURY MODE V6.0");

        // 1. CLEAR & PREPARE
        if (window.G5OS) {
            window.G5OS.triggerGlitch(800);
            window.G5OS.clearTerminal();
            window.G5OS.logToTerminal('════════════════════════════════════════', 'system');
            window.G5OS.logToTerminal('   JURY MODE INITIATED :: HACKATHON 2026', 'system');
            window.G5OS.logToTerminal('════════════════════════════════════════', 'system');
        }
        
        if (window.G5Audio) window.G5Audio.playBoot();

        // 2. NARRATIVE INJECTION
        await this.typeToTerminal('TARGET: GOOGLE DEEPMIND JURY');
        await this.typeToTerminal('OBJECTIVE: DEMONSTRATE "ARCHITECTURE OF WILL"');
        await this.wait(1000);

        // 3. EXECUTE WORKFLOW (SIMULATED)
        await this.typeToTerminal('>> INITIALIZING 5-MINUTE AGENCY PIPELINE...');
        
        // Open Workflow Modal Programmatically
        if (window.G5OS && window.G5OS.openWorkflowModal) {
            window.G5OS.triggerGlitch(400);
            window.G5OS.switchView('workflows');
            await this.wait(1000);
            window.G5OS.openWorkflowModal('5min-agency');
        }

        // 4. SYNCED AUDIO/VISUALS DURING WORKFLOW
        await this.wait(2000);
        if (window.G5Audio) window.G5Audio.startDrone();
        
        // Artificial "Moments of Awe"
        if (window.G5OS) window.G5OS.showToast?.('info', 'DeepMind Gemini 2M Context Loaded');
        await this.wait(3000);
        
        if (window.G5OS) {
            window.G5OS.triggerGlitch(1200);
            window.G5OS.showToast?.('info', 'Veo 2 Video Generation Active');
        }
        await this.wait(3000);

        if (window.G5Audio) window.G5Audio.stopDrone();
        if (window.G5OS) window.G5OS.showToast?.('success', 'Campaign Generation Complete');
        if (window.G5Audio) window.G5Audio.playAccessGranted();

        // 5. ASSET REVEAL
        await this.wait(1000);
        if (window.G5OS && window.G5OS.closeWorkflowModal) window.G5OS.closeWorkflowModal();
        
        await this.typeToTerminal('>> ACCESSING ASSET VAULT...');
        if (window.G5OS) window.G5OS.switchView('assets');
        
        // 6. FINALE - SHOW 3D NEURAL FABRIC
        await this.wait(2000);
        await this.typeToTerminal('>> REVEALING NEURAL FABRIC (3D)');
        if (window.G5OS) {
            window.G5OS.switchView('agents');
            setTimeout(() => window.G5OS.toggle3DView(), 500);
        }

        await this.wait(3000);
        this.showFinaleModal();
        this.active = false;
    },

    /**
     * Helper: Typewriter effect for terminal
     */
    typeToTerminal: async function(text) {
        if (!window.G5OS) return;
        window.G5OS.logToTerminal(text, 'input');
        if (window.G5Audio) window.G5Audio.playTypingSound();
        await this.wait(600);
    },

    /**
     * Helper: Populate UI Vault
     */
    populateVault: function() {
        const vault = document.getElementById('vault-list');
        if (vault) {
            vault.innerHTML = ''; // clear
            this.assets.forEach(asset => {
                const div = document.createElement('div');
                div.className = 'vault-item';
                div.innerHTML = `<span style="color:var(--accent-primary)">[${asset.type.toUpperCase()}]</span> ${asset.name} <span style="opacity:0.5">(${asset.size})</span>`;
                div.onclick = () => alert(`Previewing ${asset.name}... (Simulated)`);
                vault.appendChild(div);
            });
        }
    },

    /**
     * Helper: Finale Modal
     */
    showFinaleModal: function() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:10000; display:flex; align-items:center; justify-content:center; animation:fadeIn 0.5s;">
                <div style="text-align:center; color:#fff; font-family:'Rajdhani';">
                    <h1 style="font-size:4rem; color:#4ade80; text-shadow:0 0 20px #4ade80; margin-bottom:1rem;">DEMO COMPLETE</h1>
                    <p style="font-family:'JetBrains Mono'; color:#888;">AGENTICUM G5 // RELEASING CONTROL</p>
                    <button onclick="this.parentElement.parentElement.remove()" style="margin-top:2rem; padding:1rem 2rem; background:transparent; border:1px solid #4ade80; color:#4ade80; cursor:pointer;">CLOSE</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};

console.log("🏆 JURY MODE ENGINE V6.0 LOADED");
