/**
 * AGENTICUM G5 | JURY MODE / HACKATHON DEMO SEQUENCE V3.0 (FIXED)
 * 
 * Optimized for real-time asset propagation to the UI.
 */

async function initHackathonDemo() {
    const term = document.getElementById('terminal-output');
    const opCard = document.getElementById('active-op-card');
    const vault = document.getElementById('vault-list');
    
    // UI RESET
    term.innerHTML = '';
    vault.innerHTML = '<div class="vault-item" style="color:#ff00ff; font-size:0.7rem; padding:5px;">[SYNCING_ARTIFACTS...]</div>';
    writeToTerminal('*** JURY MODE INITIATED ***', 'info');
    writeToTerminal('TARGET: GOOGLE DEEPMIND GEMINI COMPETITION', 'info');
    
    opCard.classList.add('visible');
    opCard.querySelector('.op-id').innerText = 'OP-ID: HACKATHON_WIN_FINAL';
    
    // REASONING 
    const sequence = [
        { node: 'SN-00', action: 'INGESTION', msg: 'Processing AGENTICUM G5 Handbook...' },
        { node: 'RA-01', action: 'GCP_SCAN', msg: 'Analyzing Jury Weighting...' },
        { node: 'SP-99', action: 'STRATEGY', msg: 'Defining "The Perfect Twin" Narrative.' },
        { node: 'CC-01', action: 'COPY_GEN', msg: 'Manifesto and Social Hooks generated.' },
        { node: 'CC-06', action: 'VEO_RENDER', msg: 'Veo 3.1 visual assets ready.' },
        { node: 'SN-00', action: 'ORCHESTRATE', msg: 'Finalizing Genesis Campaign.' }
    ];

    for (const step of sequence) {
        writeToTerminal(`[${step.node}] >> ${step.action}: ${step.msg}`, 'node');
        activateNode(step.node);
        opCard.querySelector('.op-content p').innerHTML = `>> <span style="color:#ff00ff">${step.node}</span>: ${step.action}<br><span style="color:#888">${step.msg}</span>`;
        if(visualizer) visualizer.triggerPulse();
        await wait(1000);
        deactivateNode(step.node);
    }

    // THE FIX: Populate vault IMMEDIATELY after generation
    updateAssetVault([
        { id: 'GEN_MANIFESTO', name: 'MANIFESTO_V5.md', type: 'text', content: 'Die Architektur des Willens...' },
        { id: 'GEN_VEO_PROMPT', name: 'VEO_CINEMATIC.prompt', type: 'video', content: 'Cinematic Noir, Obsidian Shard...' },
        { id: 'GEN_SOCIAL_PACK', name: 'VIRAL_HOOKS.json', type: 'data', content: 'Don\'t hire an agency...' }
    ]);

    writeToTerminal('>> ASSETS GENERATED. VIEWING MODE: ENABLED.', 'success');
    showCampaignResults();
}

function updateAssetVault(assets) {
    const vault = document.getElementById('vault-list');
    if (!vault) return;
    vault.innerHTML = '';
    
    assets.forEach(asset => {
        const item = document.createElement('div');
        item.className = 'vault-item';
        item.style.cssText = 'padding: 0.5rem; border-bottom: 1px solid #222; font-size: 0.7rem; font-family: var(--font-mono); color: #e0e0e0; cursor: pointer; display: flex; align-items: center; transition: background 0.2s;';
        item.innerHTML = `<span style="color:var(--accent-teal); margin-right: 8px;">[${asset.type.toUpperCase()}]</span> <span>${asset.name}</span>`;
        
        item.onmouseover = () => { item.style.background = 'rgba(0, 243, 255, 0.05)'; };
        item.onmouseout = () => { item.style.background = 'transparent'; };
        
        item.onclick = () => {
             alert(`ARTIFACT CONTENT: ${asset.content}`);
             writeToTerminal(`>> ACCESSING: ${asset.name}`, 'info');
        };
        vault.appendChild(item);
    });
}

function showCampaignResults() {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'campaign-results-overlay';
    resultsDiv.innerHTML = `
        <div class="result-card">
            <h3 style="color:#ff00ff">// ASSETS GENERATED SUCCESSFULLY</h3>
            <p style="color:#888; margin-bottom: 20px;">Check the // ASSET_VAULT in your sidebar to interact with the artifacts.</p>
            
            <div class="asset-group">
                <h4>VEO 3.1 PREVIEW</h4>
                <div class="veo-preview-mock">
                    <div class="obsidian-monolith-visual"></div>
                </div>
            </div>

            <button class="primary-btn" onclick="this.parentElement.parentElement.remove()">CLOSE PREVIEW</button>
        </div>
    `;
    document.querySelector('.center-panel').appendChild(resultsDiv);
}
