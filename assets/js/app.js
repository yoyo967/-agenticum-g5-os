// AGENTICUM G5 CORE LOGIC V2.0 (ENHANCED)

let visualizer;

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    renderNodes();
    initTerminal();
    initVisualizer();
});

// CLOCK
function initClock() {
    const clockEl = document.getElementById('system-clock');
    setInterval(() => {
        const now = new Date();
        clockEl.innerText = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
    }, 1000);
}

// VISUALIZER
function initVisualizer() {
    // Inject Canvas if not present
    const canvasContainer = document.getElementById('strategy-canvas');
    if (canvasContainer) {
        canvasContainer.innerHTML = ''; // Clear fallback
        const canvas = document.createElement('canvas');
        canvas.id = 'war-room-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvasContainer.appendChild(canvas);
        
        visualizer = new WarRoomVisualizer('war-room-canvas');
    }
}

// RENDER NODES
function renderNodes() {
    const grid = document.getElementById('node-grid');
    grid.innerHTML = '';
    
    SYSTEM_NODES.forEach(node => {
        const el = document.createElement('div');
        el.className = 'node-item';
        el.id = `node-${node.id}`;
        el.innerHTML = `<span class="id">${node.id}</span>`;
        el.title = `${node.name} [${node.type}]`;
        grid.appendChild(el);
    });
}

// LOGGING
function log(msg, type = 'info') {
    const stream = document.getElementById('log-stream');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    let prefix = '[SYS]';
    if (type === 'warn') prefix = '[WARN]';
    if (type === 'error') prefix = '[ERR]';
    if (type === 'node') prefix = '[NODE]';
    if (type === 'success') prefix = '[OK]';
    
    entry.innerHTML = `<span class="time">${time}</span> <span class="${type}">${prefix}</span> ${msg}`;
    stream.appendChild(entry);
    stream.scrollTop = stream.scrollHeight;
    
    // EXCELLENCE: Pulse the visualizer on node activity
    if (type === 'node' && visualizer) {
        visualizer.triggerPulse();
    }
}

// TERMINAL
function initTerminal() {
    const input = document.getElementById('command-input');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            executeCommand(cmd);
            input.value = '';
        }
    });

    // Auto-focus input
    document.addEventListener('click', (e) => {
        // Only focus if not selecting text
        if (window.getSelection().toString().length === 0) {
            input.focus();
        }
    });
}

function writeToTerminal(text, type = 'normal') {
    const term = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = 'term-line';
    if (type === 'success') line.classList.add('output-success');
    if (type === 'error') line.classList.add('output-error');
    if (type === 'info') line.classList.add('output-info');
    
    // Support markdown-like basic formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff">$1</b>');
    
    line.innerHTML = text;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
}

async function executeCommand(cmd) {
    writeToTerminal(`> ${cmd}`);
    const cleanCmd = cmd.toUpperCase().replace(' ', '_');
    
    if (cleanCmd === 'START_SYSTEM') {
        startSystem();
    } else if (cleanCmd === 'RUN_DIAGNOSTICS') {
        runDiagnostics();
    } else if (cleanCmd === 'DEPLOY_DUNE' || cmd === 'SIM: DUNE_DUST') {
        runScenario('SELL_SAND');
    } else if (cleanCmd === 'CRISIS_MODE') {
        runScenario('CRISIS_MGMT');
    } else if (cleanCmd === 'VIRAL_LOOP') {
        runScenario('VIRAL_LOOP');
    } else if (cleanCmd === 'JURY_MODE' || cleanCmd === 'JURY_MODE_SEQUENCE') {
        initHackathonDemo();
    } else if (cleanCmd === 'DEBUG_VAULT') {
        if (typeof forceUpdateVault === 'function') {
            forceUpdateVault();
            writeToTerminal('Vault updated manually.', 'success');
        } else {
            writeToTerminal('ERR: forceUpdateVault not loaded.', 'error');
        }
    } else if (cleanCmd === 'HELP') {
        writeToTerminal('// AGENTICUM G5 COMMAND LIST:', 'info');
        writeToTerminal('', 'normal');
        writeToTerminal('--- SYSTEM COMMANDS ---', 'info');
        writeToTerminal('- START_SYSTEM      : Initialize Core Protocols');
        writeToTerminal('- RUN_DIAGNOSTICS   : Check Node Integrity');
        writeToTerminal('- CLEAR             : Clear Terminal');
        writeToTerminal('', 'normal');
        writeToTerminal('--- SIMULATION SCENARIOS ---', 'info');
        writeToTerminal('- DEPLOY_DUNE       : Sim: Luxury Sand Brand');
        writeToTerminal('- CRISIS_MODE       : Sim: PR Disaster Recovery');
        writeToTerminal('- VIRAL_LOOP        : Sim: High-Growth Loop');
        writeToTerminal('- JURY_MODE         : Hackathon Demo Sequence');
        writeToTerminal('', 'normal');
        writeToTerminal('--- AI REASONING (NEW) ---', 'success');
        writeToTerminal('- Type any other text to query the Gemini Reasoning Cluster');
        writeToTerminal('- Example: "Create a viral campaign for a tech startup"');
        writeToTerminal('- Example: "Analyze competitor strengths for SaaS market"');
    } else if (cleanCmd === 'CLEAR') {
        document.getElementById('terminal-output').innerHTML = '';
        writeToTerminal('Console cleared.', 'info');
    } else if (cleanCmd === 'STATUS') {
        // Check API health
        writeToTerminal('Checking system status...', 'info');
        if (window.G5_API) {
            const health = await G5_API.healthCheck();
            writeToTerminal(`System: ${health.status || 'UNKNOWN'}`, health.status === 'OPERATIONAL' ? 'success' : 'warn');
            if (health.version) writeToTerminal(`Version: ${health.version}`, 'info');
            if (health.nodes) writeToTerminal(`Nodes: ${health.nodes}`, 'info');
        }
    } else {
        // Route to AI Reasoning Cluster
        if (window.G5Terminal && typeof G5Terminal.processAICommand === 'function') {
            await G5Terminal.processAICommand(cmd);
        } else {
            writeToTerminal('[WARN] AI module not loaded. Running in limited mode.', 'warn');
            writeToTerminal(`Command '${cmd}' queued for processing when API is available.`, 'info');
        }
    }
}

// ACTIONS
async function startSystem() {
    log('Initializing core protocols...', 'warn');
    const nodes = ['SN-00', 'MI-01', 'PS-00'];
    
    if(visualizer) visualizer.triggerPulse();

    for (const id of nodes) {
        activateNode(id);
        await wait(300);
        deactivateNode(id);
    }
    
    log('System Online. Reasoning Cluster Active.', 'success');
    writeToTerminal('System successfully initialized.', 'success');
    writeToTerminal('Waiting for Operator Input...', 'info');
    
    // Update War Room UI
    document.getElementById('active-op-card').querySelector('.op-status').innerText = 'READY';
    document.getElementById('active-op-card').classList.add('visible');
}

async function runDiagnostics() {
    log('Running full system scan...', 'info');
    const randomNodes = SYSTEM_NODES.sort(() => 0.5 - Math.random()).slice(0, 15);
    
    for (const node of randomNodes) {
        activateNode(node.id);
        if(visualizer && Math.random() > 0.7) visualizer.triggerPulse();
        await wait(100);
        deactivateNode(node.id);
    }
    
    log('Diagnostics complete. All systems nominal.', 'success');
    writeToTerminal('Diagnostics: 100% Integrity. No Anomalies.', 'success');
}

async function runScenario(scenarioKey) {
    const steps = SCENARIOS[scenarioKey];
    if (!steps) return;
    
    writeToTerminal(`Executing Scenario: ${scenarioKey}`, 'warn');
    const opCard = document.getElementById('active-op-card');
    opCard.classList.add('visible');
    opCard.querySelector('.op-id').innerText = `OP-ID: ${scenarioKey}`;
    opCard.querySelector('.op-status').innerText = 'EXECUTING';
    opCard.querySelector('.op-status').className = 'op-status working';
    
    for (const step of steps) {
        activateNode(step.node);
        log(`[${step.node}] >> ${step.msg}`, 'node');
        
        // Update War Room Card
        opCard.querySelector('.op-content p').innerHTML = `<span style="color:#00f3ff">[${step.node}]</span> ${step.action}...<br><span style="color:#666; font-size:0.8em">${step.msg}</span>`;
        
        // Visualizer Effect
        if(visualizer) visualizer.triggerPulse();

        await wait(1200 + Math.random() * 800); // Organic variable delay
        deactivateNode(step.node);
    }
    
    opCard.querySelector('.op-status').innerText = 'COMPLETED';
    opCard.querySelector('.op-status').className = 'op-status live';
    opCard.querySelector('.op-content p').innerText = 'MISSION ACCOMPLISHED. ASSETS DEPLOYED.';
    writeToTerminal('Scenario execution finished.', 'success');
    log('Objective achieved. Standing by.', 'success');
}

// HELPERS
function activateNode(id) {
    const el = document.getElementById(`node-${id}`);
    if (el) {
        el.classList.add('active');
        el.classList.add('working');
        // Scroll to node if necessary in a large grid
        // el.scrollIntoView({behavior: "smooth", block: "center"});
    }
}

function deactivateNode(id) {
    const el = document.getElementById(`node-${id}`);
    if (el) {
        el.classList.remove('active');
        el.classList.remove('working');
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
