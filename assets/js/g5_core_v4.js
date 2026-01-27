/**
 * AGENTICUM G5 | JURY MODE / HACKATHON DEMO SEQUENCE V4.1 (CACHE KILLER)
 * 
 * Force-syncing assets to the vault for Operator Yildirim.
 */

const GENESIS_ASSETS_DATA = [
    { id: 'GEN_MANIFESTO', name: 'MANIFESTO_V5.md', type: 'text', content: 'The Architecture of Will: We license a civilization.' },
    { id: 'GEN_VEO_PROMPT', name: 'VEO_CINEMATIC.prompt', type: 'video', content: 'Cinematic Noir, Obsidian Pulse Shard, 8k.' },
    { id: 'GEN_SOCIAL_PACK', name: 'VIRAL_HOOKS.json', type: 'data', content: 'Don\'t hire an agency. #GeminiHackathon' }
];

async function initHackathonDemo() {
    console.log("G5 >> INITIATING JURY MODE V4.1");
    const term = document.getElementById('terminal-output');
    const opCard = document.getElementById('active-op-card');
    const vault = document.getElementById('vault-list');
    
    // UI RESET
    term.innerHTML = '';
    writeToTerminal('*** JURY MODE INITIATED (V4.1) ***', 'info');
    
    if (vault) {
        vault.innerHTML = '<div style="color:#ff00ff; padding:5px;">[SYNCING...]</div>';
    }
    
    opCard.classList.add('visible');
    opCard.querySelector('.op-id').innerText = 'OP-ID: GENESIS_V4';
    
    // REASONING TRACE
    const nodes = ['SN-00', 'RA-01', 'SP-99', 'CC-01', 'CC-06', 'MI-01'];
    for (const node of nodes) {
        activateNode(node);
        writeToTerminal(`>> Node ${node} processing cognitive layer...`, 'node');
        if(visualizer) visualizer.triggerPulse();
        await wait(600);
        deactivateNode(node);
    }

    // MANDATORY VAULT UPDATE
    forceUpdateVault();

    writeToTerminal('>> ASSETS STORED IN VAULT.', 'success');
    showCampaignResults();
}

function forceUpdateVault() {
    const vault = document.getElementById('vault-list');
    if (!vault) {
        console.error("G5 >> VAULT ELEMENT NOT FOUND");
        return;
    }
    
    vault.innerHTML = '';
    GENESIS_ASSETS_DATA.forEach(asset => {
        const item = document.createElement('div');
        item.className = 'vault-item';
        item.style.cssText = 'padding: 8px; border-bottom: 1px solid #222; font-size: 0.7rem; color: #fff; cursor: pointer; background: rgba(255,0,255,0.05); margin-bottom: 2px;';
        item.innerHTML = `<span style="color:#00f3ff; font-weight:bold;">[${asset.type.toUpperCase()}]</span> ${asset.name}`;
        item.onclick = () => {
            openAssetPreview(asset);
            writeToTerminal(`>> ACCESSING ARTIFACT: ${asset.name}`, 'info');
        };
        vault.appendChild(item);
    });
    console.log("G5 >> VAULT UPDATED MANUALLY");
}

function openAssetPreview(asset) {
    const existing = document.querySelector('.hologram-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'hologram-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
        display: flex; justify-content: center; align-items: center;
        z-index: 20000; animation: fadeIn 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div class="hologram-card" style="
            width: 600px; background: #0a0a0a; border: 1px solid var(--accent-teal);
            padding: 2rem; position: relative; box-shadow: 0 0 50px rgba(0, 243, 255, 0.2);
        ">
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-teal); margin-bottom: 1rem;">
                // ARTIFACT_PREVIEW :: ${asset.id}
            </div>
            <h2 style="font-family: var(--font-heading); color: #fff; margin-bottom: 1.5rem;">${asset.name}</h2>
            <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; color: #ccc; font-family: var(--font-mono); line-height: 1.6; border: 1px solid #222;">
                ${asset.content}
            </div>
            <button class="primary-btn" onclick="this.parentElement.parentElement.remove()" style="margin-top: 2rem; width: 100%;">ACKNOWLEDGE & CLOSE</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function showCampaignResults() {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'campaign-results-overlay';
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <div class="result-card" style="border: 2px solid #ff00ff;">
            <h3 style="color:#ff00ff">GENESIS ASSETS READY</h3>
            <p>Assets have been transferred to your <strong>// ASSET_VAULT</strong>.</p>
            <div class="veo-preview-mock">
                    <div class="obsidian-monolith-visual"></div>
            </div>
            <button class="primary-btn" onclick="this.parentElement.parentElement.remove()">CLOSE</button>
        </div>
    `;
    document.querySelector('.center-panel').appendChild(resultsDiv);
}
