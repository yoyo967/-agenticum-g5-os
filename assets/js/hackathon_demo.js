/**
 * AGENTICUM G5 | JURY MODE / HACKATHON DEMO SEQUENCE V2.0
 * 
 * This script executes the "End-to-End" automated workflow described in the Handbook.
 * It simulates the full creation of the G5 Marketing Campaign for the Jury.
 */

async function initHackathonDemo() {
    const term = document.getElementById('terminal-output');
    const opCard = document.getElementById('active-op-card');
    
    // UI RESET
    term.innerHTML = '';
    writeToTerminal('*** JURY MODE INITIATED ***', 'info');
    writeToTerminal('TARGET: GOOGLE DEEPMIND GEMINI COMPETITION 2025/2026', 'info');
    writeToTerminal('OBJECTIVE: GENERATE WINNING CAMPAIGN ARTIFACTS', 'warning');
    
    opCard.classList.add('visible');
    opCard.querySelector('.op-id').innerText = 'OP-ID: HACKATHON_DOMINATION';
    opCard.querySelector('.op-status').innerText = 'REASONING_CLUSTER_MAX';
    
    // DETAILED REASONING SEQUENCE
    const sequence = [
        { node: 'SN-00', action: 'INGESTION', msg: 'Atomic Analysis of AGENTICUM G5 Handbook... Ingesting ethical protocols.' },
        { node: 'RA-01', action: 'GCP_SCAN', msg: 'Querying Google DeepMind API Competition Rules... Analyzing weighting: Impact(40%), Execution(30%).' },
        { node: 'RA-02', action: 'FORENSIC', msg: 'Scanning competitor landscape... Detected saturation in "AI Companion" market. Pivot to "Autonomous Marketing OS" confirmed.' },
        { node: 'PS-00', action: 'PSY_OPS', msg: 'Analyzing Jury Persona (Venture/Tech)... Tone identified: "Industrial, Sovereign, Ambitious".' },
        { node: 'SP-99', action: 'HEGEMONY', msg: 'Simulating viral spread of the "Don\'t hire an agency" hook. Predicted CTR: 18.5%.' },
        { node: 'CC-01', action: 'COPY_GEN', msg: 'Synthesizing manifesto and social hooks for the G5 Launch.' },
        { node: 'CC-06', action: 'VE_DIRECT', msg: 'Orchestrating Veo 3.1 visual clusters... Rendering obsidian monolith assets.' },
        { node: 'MI-01', action: 'COMPLIANCE', msg: 'Verifying against EU AI Act... Checking for dark patterns... STATUS: CLEAN.' },
        { node: 'SN-00', action: 'ORCHESTRATE', msg: 'Consolidating assets into the "Genesis Campaign" package.' }
    ];

    for (const step of sequence) {
        writeToTerminal(`[${step.node}] >> ${step.action}: ${step.msg}`, 'node');
        activateNode(step.node);
        log(`[${step.node}] >> ${step.msg}`, 'node');
        opCard.querySelector('.op-content p').innerHTML = `>> <span style="color:#ff00ff">${step.node}</span>: ${step.action}<br><span style="color:#888">${step.msg}</span>`;
        if(visualizer) visualizer.triggerPulse();
        await wait(1200 + Math.random() * 800);
        deactivateNode(step.node);
    }

    // FINAL OUTPUT
    writeToTerminal('>> ALL ARTIFACTS GENERATED. OPTIMIZED FOR JUDGING CRITERIA.', 'success');
    writeToTerminal('>> TOTAL SCORE PREDICTION: 62/65 (HIGH IMPACT).', 'success');
    
    setTimeout(() => {
        showCampaignResults();
    }, 1000);
}

function showCampaignResults() {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'campaign-results-overlay';
    resultsDiv.innerHTML = `
        <div class="result-card">
            <h3>// AGENTICUM G5: "GENESIS" CAMPAIGN PACKAGE</h3>
            
            <div class="asset-group">
                <h4>CORE STRATEGY (SP-99)</h4>
                <p><strong>Positioning:</strong> "The First Sovereign Marketing Enclosure."<br>
                <strong>Narrative:</strong> Transition from tool-usage (manual) to civilization-licensing (autonomous).<br>
                <strong>Target:</strong> High-growth founders, VCs, and the Gemini Hackathon Jury.</p>
                <div class="tag">GOAL: REMARKABILITY 10/10</div>
            </div>

            <div class="asset-group">
                <h4>CAMPAIGN MANIFESTO (CC-01)</h4>
                <p>"Silizium-Wille trifft menschliche Vision. AGENTICUM G5 ist kein Chatbot. Es ist eine industrielle Antwort auf die Fragmentierung der Kreativwirtschaft. Wir skalieren nicht mehr Personal, wir skalieren reine Willenskraft."</p>
            </div>

            <div class="asset-group">
                <h4>VEO 3.1 CINEMATIC ASSET (CC-06)</h4>
                <div class="veo-preview-mock">
                    <div class="veo-overlay">VEO_3.1_GEN_001</div>
                    <div class="veo-visual">
                        <div class="obsidian-monolith-visual"></div>
                    </div>
                </div>
                <p><em>"Macro shot of obsidian core pulsing with neon-magenta data streams. 8k raytracing."</em></p>
                <div class="tag">HIGH_FIDELITY_RENDER</div>
            </div>

            <div class="asset-group">
                <h4>JURY PITCH HOOK (PS-00)</h4>
                <p><strong>"The Jury shouldn't just judge G5. They should experience the end of the Agency Era."</strong></p>
                <div class="tag">IMPACT: 15/15</div>
            </div>

            <div style="display:flex; gap:10px; margin-top:20px;">
                <button class="primary-btn" onclick="deployCampaign(this)">🚀 DEPLOY TO ALL NODES</button>
                <button class="secondary-btn" onclick="this.parentElement.parentElement.parentElement.remove()">CLOSE CONSOLE</button>
            </div>
        </div>
    `;

    document.querySelector('.center-panel').appendChild(resultsDiv);
}

async function deployCampaign(btn) {
    btn.innerText = "DEPLOYING...";
    btn.disabled = true;
    
    log("Pushing Assets to G5 Nodes...", "warn");
    writeToTerminal(">> INITIATING GLOBAL ASSET DEPLOYMENT...", "warning");
    
    await wait(1500);
    log("Campaign Assets propogated to Web App Layer.", "success");
    writeToTerminal('>> DEPLOY_SUCCESS: Campaign Live on https://tutorai-e39uu.web.app', "success");
    
    // FILL THE VAULT
    updateAssetVault([
        { id: 'GEN_MANIFESTO', name: 'MANIFESTO_V5.md', type: 'text' },
        { id: 'GEN_VEO_PROMPT', name: 'VEO_CINEMATIC.prompt', type: 'video' },
        { id: 'GEN_SOCIAL_PACK', name: 'VIRAL_HOOKS.json', type: 'data' }
    ]);

    btn.innerText = "DEPLOY_SUCCESS";
    setTimeout(() => {
        btn.parentElement.parentElement.parentElement.remove();
    }, 2000);
}

function updateAssetVault(assets) {
    const vault = document.getElementById('vault-list');
    vault.innerHTML = '';
    
    assets.forEach(asset => {
        const item = document.createElement('div');
        item.className = 'vault-item';
        item.style.cssText = 'padding: 0.4rem; border-bottom: 1px solid #222; font-size: 0.7rem; font-family: var(--font-mono); color: #888; cursor: pointer; display: flex; align-items: center;';
        item.innerHTML = `
            <span style="color:var(--accent-teal); margin-right: 10px;">[${asset.type.toUpperCase()}]</span>
            <span>${asset.name}</span>
        `;
        item.onclick = () => {
            writeToTerminal(`>> OPENING ${asset.name}...`, 'info');
            // Logic to show asset content could go here
        };
        vault.appendChild(item);
    });
}
