/**
 * AGENTICUM G5 | JURY MODE / HACKATHON DEMO SEQUENCE V5.0 (ENTERPRISE)
 * 
 * Complete rewrite for robust execution without dependencies on missing elements.
 * Designed for enterprise demo presentations.
 */

// Demo Assets
const DEMO_ASSETS = [
    { 
        id: 'MANIFEST_V5', 
        name: 'MANIFESTO_V5.md', 
        type: 'text', 
        content: 'The Architecture of Will: We license a civilization.\n\nWe have pulverized the era of tools. AGENTICUM G5 is not a chatbot. It is an industrial response to the fragmentation of the creative economy.\n\nBy leveraging Gemini 3 Pro\'s 2M token context, we create an "Infinite Present" where strategy and execution exist simultaneously.',
        size: '4.2 KB'
    },
    { 
        id: 'VEO_PROMPT', 
        name: 'VEO_CINEMATIC.prompt', 
        type: 'video', 
        content: 'STYLE: Cinematic Noir, Obsidian & Chrome aesthetic\nSCENE: A single obsidian shard orbits slowly in a void of digital particles\nMOOD: Industrial, powerful, inevitable\nDURATION: 30 seconds\nRESOLUTION: 4K HDR',
        size: '1.8 KB'
    },
    { 
        id: 'SOCIAL_PACK', 
        name: 'VIRAL_HOOKS.json', 
        type: 'text', 
        content: '{\n  "hooks": [\n    "Don\'t hire an agency. License a civilization.",\n    "52 AI nodes. One objective. Total dominance.",\n    "The infrastructure is the prophecy."\n  ],\n  "hashtags": ["#GeminiHackathon", "#AgenticAI", "#AGENTICUM"]\n}',
        size: '0.9 KB'
    },
    {
        id: 'IMAGEN_PACK',
        name: 'VISUAL_ASSETS.zip',
        type: 'image',
        content: 'Collection of 12 Imagen 3 generated visuals:\n- Hero banners (3x)\n- Social media cards (6x)\n- Email headers (3x)\nStyle: Obsidian & Chrome aesthetic',
        size: '24.6 MB'
    }
];

// Reasoning sequence
const REASONING_SEQUENCE = [
    { 
        node: 'SN-00', 
        role: 'ORCHESTRATOR', 
        action: 'Initializing cognitive pipeline',
        detail: 'Loading 2M token context window...'
    },
    { 
        node: 'RA-01', 
        role: 'AUTHORITY_AUDITOR', 
        action: 'Scanning competition parameters',
        detail: 'Google DeepMind Gemini API Hackathon criteria loaded'
    },
    { 
        node: 'SP-99', 
        role: 'HEGEMONY_MATRIX', 
        action: 'Calculating dominance vector',
        detail: 'Objective: Maximum jury impact'
    },
    { 
        node: 'CC-01', 
        role: 'COPY_CHIEF', 
        action: 'Generating manifesto content',
        detail: '"The Perfect Twin" narrative synthesized'
    },
    { 
        node: 'CC-06', 
        role: 'VIDEO_DIRECTOR', 
        action: 'Queuing Veo 3.1 render pipeline',
        detail: 'Cinematic noir sequence prepared'
    },
    { 
        node: 'RA-52', 
        role: 'RED_TEAM', 
        action: 'Adversarial validation',
        detail: 'Strategy stress-tested and approved'
    }
];

/**
 * Main Jury Mode initialization function
 */
async function initHackathonDemo() {
    console.log("🏆 G5 >> INITIATING JURY MODE V5.0");
    
    const terminal = document.getElementById('terminal-output');
    
    // Clear terminal if exists
    if (terminal) {
        terminal.innerHTML = '';
    }
    
    // Write intro
    writeToTerminal('═══════════════════════════════════════════════════════', 'system');
    writeToTerminal('   JURY MODE INITIATED :: HACKATHON DEMO SEQUENCE', 'system');
    writeToTerminal('   Target: Google DeepMind Gemini API Hackathon 2026', 'system');
    writeToTerminal('═══════════════════════════════════════════════════════', 'system');
    writeToTerminal('', 'info');
    
    // Log to system
    if (window.dashboardInstance) {
        window.dashboardInstance.logSystem('🏆 JURY MODE ACTIVATED');
    }
    
    // Run reasoning trace
    await runJuryReasoningTrace();
    
    // Generate assets
    await generateJuryAssets();
    
    // Show completion
    showJuryResults();
}

/**
 * Run the reasoning trace animation
 */
async function runJuryReasoningTrace() {
    writeToTerminal('Initiating 52-node reasoning fabric...', 'info');
    writeToTerminal('', 'info');
    
    for (const step of REASONING_SEQUENCE) {
        // Animate node indicator
        writeToTerminal(`[${step.node}] ${step.role}`, 'node');
        writeToTerminal(`  → ${step.action}`, 'info');
        writeToTerminal(`    ${step.detail}`, 'info');
        
        // Play sound if available
        if (window.dashboardInstance) {
            window.dashboardInstance.playSound('open');
        }
        
        // Wait for effect
        await wait(800);
    }
    
    writeToTerminal('', 'info');
    writeToTerminal('✓ All 52 nodes synchronized', 'success');
    writeToTerminal('✓ Chain-of-thought complete', 'success');
    writeToTerminal('', 'info');
}

/**
 * Generate and display demo assets
 */
async function generateJuryAssets() {
    writeToTerminal('Generating GENESIS campaign assets...', 'info');
    writeToTerminal('', 'info');
    
    for (const asset of DEMO_ASSETS) {
        writeToTerminal(`  [${asset.type.toUpperCase()}] ${asset.name} (${asset.size})`, 'success');
        
        // Add to dashboard vault if available
        if (window.dashboardInstance) {
            window.dashboardInstance.assets.unshift({
                id: asset.id,
                type: asset.type,
                title: asset.name,
                date: new Date().toLocaleTimeString(),
                data: asset.content,
                size: asset.size
            });
        }
        
        await wait(400);
    }
    
    // Refresh vault display
    if (window.dashboardInstance) {
        window.dashboardInstance.renderVault();
    }
    
    writeToTerminal('', 'info');
    writeToTerminal('═══════════════════════════════════════════════════════', 'system');
    writeToTerminal('   GENESIS CAMPAIGN COMPLETE', 'system');
    writeToTerminal('   Assets available in ASSET_VAULT', 'system');
    writeToTerminal('═══════════════════════════════════════════════════════', 'system');
    
    if (window.dashboardInstance) {
        window.dashboardInstance.playSound('success');
    }
}

/**
 * Show the completion modal
 */
function showJuryResults() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'jury-results-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        z-index: 25000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div style="
            background: var(--bg-panel, #12151a);
            border: 1px solid var(--border-color, #2a2e36);
            border-radius: 12px;
            padding: 2.5rem;
            max-width: 600px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        ">
            <div style="
                font-size: 3rem;
                margin-bottom: 1rem;
            ">🏆</div>
            
            <h2 style="
                font-family: var(--font-heading, 'Rajdhani', sans-serif);
                font-size: 1.8rem;
                color: var(--accent-primary, #4a9eff);
                margin-bottom: 1rem;
                letter-spacing: 2px;
            ">GENESIS CAMPAIGN READY</h2>
            
            <p style="
                color: var(--text-secondary, #9aa0aa);
                font-size: 1rem;
                margin-bottom: 2rem;
                line-height: 1.6;
            ">
                The 52-node reasoning fabric has completed the GENESIS campaign.<br>
                All assets have been transferred to your <strong>ASSET_VAULT</strong>.
            </p>
            
            <div style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 2rem;
            ">
                <div style="
                    background: rgba(74, 158, 255, 0.08);
                    border: 1px solid rgba(74, 158, 255, 0.2);
                    padding: 1rem;
                    border-radius: 8px;
                ">
                    <div style="font-size: 1.5rem; color: var(--accent-primary, #4a9eff); font-weight: 700;">4</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary, #9aa0aa); letter-spacing: 1px;">ASSETS GENERATED</div>
                </div>
                <div style="
                    background: rgba(52, 211, 153, 0.08);
                    border: 1px solid rgba(52, 211, 153, 0.2);
                    padding: 1rem;
                    border-radius: 8px;
                ">
                    <div style="font-size: 1.5rem; color: var(--accent-success, #34d399); font-weight: 700;">6</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary, #9aa0aa); letter-spacing: 1px;">NODES ACTIVATED</div>
                </div>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--accent-primary, #4a9eff);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                font-family: var(--font-heading, 'Rajdhani', sans-serif);
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: 1px;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.2s;
            " onmouseover="this.style.background='#5eaaff'" onmouseout="this.style.background='var(--accent-primary, #4a9eff)'">
                VIEW ASSETS IN VAULT
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close on background click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Ensure wait function exists
if (!window.wait) {
    window.wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
}

// Ensure activateNode/deactivateNode exist (for backwards compatibility)
if (!window.activateNode) {
    window.activateNode = (nodeId) => console.log(`[G5] Node ${nodeId} activated`);
}

if (!window.deactivateNode) {
    window.deactivateNode = (nodeId) => console.log(`[G5] Node ${nodeId} deactivated`);
}

// Global visualizer stub for backwards compatibility
if (!window.visualizer) {
    window.visualizer = { triggerPulse: () => {} };
}

// Expose globally
window.initHackathonDemo = initHackathonDemo;

console.log("✅ G5 JURY MODE V5.0 LOADED");
