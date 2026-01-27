/**
 * AGENTICUM G5 | JURY MODE / HACKATHON DEMO SEQUENCE V4.1 (CACHE KILLER)
 * 
 * Force-syncing assets to the vault for Operator Yildirim.
 */

const GENESIS_ASSETS_DATA = [
    { id: 'GEN_MANIFESTO', name: 'MANIFESTO_V5.md', type: 'text', content: 'Die Architektur des Willens: Wir lizenzieren eine Zivilisation.' },
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
        writeToTerminal(`>> Node ${node} processing kognitive layer...`, 'node');
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
            alert(`AGENTICUM G5 ARTIFACT [${asset.id}]:\n\n${asset.content}`);
        };
        vault.appendChild(item);
    });
    console.log("G5 >> VAULT UPDATED MANUALLY");
}

function showCampaignResults() {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'campaign-results-overlay';
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <div class="result-card" style="border: 2px solid #ff00ff;">
            <h3 style="color:#ff00ff">GENESIS ASSETS READY</h3>
            <p>Die Assets wurden in Ihren <strong>// ASSET_VAULT</strong> übertragen.</p>
            <div class="veo-preview-mock">
                    <div class="obsidian-monolith-visual"></div>
            </div>
            <button class="primary-btn" onclick="this.parentElement.parentElement.remove()">CLOSE</button>
        </div>
    `;
    document.querySelector('.center-panel').appendChild(resultsDiv);
}
