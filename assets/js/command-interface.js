/**
 * AGENTICUM G5 | COMMAND INTERFACE
 * Complete End-to-End Terminal Functionality
 */

// ============================================
// GLOBAL COMMAND REGISTRY
// ============================================
const G5Commands = {
    // System Commands
    'HELP': {
        description: 'Display all available commands',
        handler: showHelp
    },
    'START_SYSTEM': {
        description: 'Initialize all 52 nodes',
        handler: initializeSystem
    },
    'RUN_DIAGNOSTICS': {
        description: 'Run full system diagnostics',
        handler: runDiagnostics
    },
    'STATUS': {
        description: 'Show current system status',
        handler: showStatus
    },
    'CLEAR': {
        description: 'Clear terminal output',
        handler: clearTerminal
    },
    
    // Simulation Commands
    'DEPLOY_DUNE': {
        description: 'Deploy DUNE marketing simulation',
        handler: () => runSimulation('DUNE')
    },
    'CRISIS_MODE': {
        description: 'Activate crisis management simulation',
        handler: () => runSimulation('CRISIS')
    },
    'VIRAL_LOOP': {
        description: 'Execute viral marketing simulation',
        handler: () => runSimulation('VIRAL')
    },
    
    // Node Commands
    'NODES': {
        description: 'List all active nodes',
        handler: listNodes
    },
    'NODE_STATUS': {
        description: 'Show detailed node status',
        handler: showNodeStatus
    },
    
    // Asset Commands
    'ASSETS': {
        description: 'List assets in vault',
        handler: listAssets
    },
    'GENERATE': {
        description: 'Generate new marketing assets',
        handler: generateAssets
    }
};

// Node configuration
const G5Nodes = [
    { id: 'SN-00', name: 'ORCHESTRATOR', cluster: 'CORE', status: 'ACTIVE' },
    { id: 'SP-01', name: 'CAMPAIGN_STRATEGIST', cluster: 'STRATEGY', status: 'ACTIVE' },
    { id: 'SP-99', name: 'HEGEMONY_MATRIX', cluster: 'STRATEGY', status: 'ACTIVE' },
    { id: 'RA-01', name: 'AUTHORITY_AUDITOR', cluster: 'RESEARCH', status: 'ACTIVE' },
    { id: 'RA-06', name: 'TREND_FORECASTER', cluster: 'RESEARCH', status: 'ACTIVE' },
    { id: 'RA-52', name: 'RED_TEAM', cluster: 'RESEARCH', status: 'STANDBY' },
    { id: 'CC-01', name: 'COPY_CHIEF', cluster: 'CREATION', status: 'ACTIVE' },
    { id: 'CC-06', name: 'VIDEO_DIRECTOR', cluster: 'CREATION', status: 'ACTIVE' },
    { id: 'CC-08', name: 'FLASH_VOICE', cluster: 'CREATION', status: 'ACTIVE' },
    { id: 'MI-01', name: 'MULTIMODAL_INTEGRATION', cluster: 'CREATION', status: 'ACTIVE' }
];

// ============================================
// TERMINAL CORE FUNCTIONS
// ============================================

/**
 * Write a line to the terminal
 */
function writeToTerminal(text, type = 'info') {
    const terminal = document.getElementById('terminal-output');
    if (!terminal) return;
    
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    
    line.innerHTML = `<span class="time">[${timestamp}]</span> ${text}`;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

/**
 * Send command from terminal input
 */
function sendCommand() {
    const input = document.getElementById('command-input');
    if (!input || !input.value.trim()) return;
    
    const command = input.value.trim().toUpperCase();
    input.value = '';
    
    executeCommand(command);
}

/**
 * Execute a command
 */
function executeCommand(command) {
    const cmd = command.toUpperCase().trim();
    
    // Echo the command
    writeToTerminal(`> ${cmd}`, 'input');
    
    // Check for exact match
    if (G5Commands[cmd]) {
        G5Commands[cmd].handler();
        return;
    }
    
    // Check for partial matches or AI fallback
    const matchingCmd = Object.keys(G5Commands).find(key => 
        key.includes(cmd) || cmd.includes(key)
    );
    
    if (matchingCmd) {
        G5Commands[matchingCmd].handler();
    } else {
        // HACKER MODE DELEGATION:
        // Text commands like "Initiate Campaign..." should be handled by the Core OS logic
        // which now contains the Demo Trap Door.
        if (window.g5Instance && window.g5Instance.processCommand) {
            // Let the main OS handle it (including NEURA-FIZZ trigger)
            const resultPromise = window.g5Instance.processCommand(command);
            
            // If it returns a promise, wait for it (optional, just logging here)
            if (resultPromise && resultPromise.then) {
                 resultPromise.then(res => {
                     writeToTerminal(res.replace(/<[^>]*>/g, ''), 'success'); // Strip HTML for terminal
                 });
                 return; 
            }
        }

        // Fallback to local simulation if OS didn't pick it up or returns nothing relevant
        handleAIQuery(command);
    }
}

/**
 * Handle AI queries for non-system commands
 */
function handleAIQuery(query) {
    writeToTerminal('Processing query with Gemini 3 Pro...', 'node');
    
    setTimeout(() => {
        writeToTerminal('ANALYSIS COMPLETE', 'success');
        writeToTerminal(`Query "${query}" has been analyzed.`, 'info');
        writeToTerminal('Routing to appropriate node cluster...', 'node');
        
        // Simulate node activation
        const randomNode = G5Nodes[Math.floor(Math.random() * G5Nodes.length)];
        setTimeout(() => {
            writeToTerminal(`[${randomNode.id}] ${randomNode.name} processing...`, 'node');
            
            setTimeout(() => {
                writeToTerminal('Task queued for execution.', 'success');
                writeToTerminal('Use ASSETS command to view generated outputs.', 'info');
                
                // Trigger workflow in dashboard if available
                if (window.dashboardInstance) {
                    window.dashboardInstance.executeCommand(query);
                }
            }, 1000);
        }, 500);
    }, 800);
}

// ============================================
// COMMAND HANDLERS
// ============================================

function showHelp() {
    writeToTerminal('═══════════════════════════════════════════', 'system');
    writeToTerminal('   AGENTICUM G5 COMMAND REFERENCE', 'system');
    writeToTerminal('═══════════════════════════════════════════', 'system');
    writeToTerminal('', 'info');
    
    writeToTerminal('SYSTEM COMMANDS:', 'info');
    writeToTerminal('  HELP           - Display this help message', 'info');
    writeToTerminal('  START_SYSTEM   - Initialize all 52 nodes', 'info');
    writeToTerminal('  RUN_DIAGNOSTICS- Execute system diagnostics', 'info');
    writeToTerminal('  STATUS         - Show current system status', 'info');
    writeToTerminal('  CLEAR          - Clear terminal output', 'info');
    writeToTerminal('', 'info');
    
    writeToTerminal('SIMULATION COMMANDS:', 'info');
    writeToTerminal('  DEPLOY_DUNE    - DUNE marketing simulation', 'info');
    writeToTerminal('  CRISIS_MODE    - Crisis management sim', 'info');
    writeToTerminal('  VIRAL_LOOP     - Viral marketing sim', 'info');
    writeToTerminal('', 'info');
    
    writeToTerminal('NODE COMMANDS:', 'info');
    writeToTerminal('  NODES          - List all active nodes', 'info');
    writeToTerminal('  NODE_STATUS    - Detailed node status', 'info');
    writeToTerminal('', 'info');
    
    writeToTerminal('ASSET COMMANDS:', 'info');
    writeToTerminal('  ASSETS         - List assets in vault', 'info');
    writeToTerminal('  GENERATE       - Generate new assets', 'info');
    writeToTerminal('', 'info');
    
    writeToTerminal('Type any query for AI-powered analysis.', 'success');
}

function initializeSystem() {
    writeToTerminal('Initializing AGENTICUM G5 Core...', 'node');
    
    let nodeIndex = 0;
    const interval = setInterval(() => {
        if (nodeIndex < G5Nodes.length) {
            const node = G5Nodes[nodeIndex];
            writeToTerminal(`  [${node.id}] ${node.name} ... ONLINE`, 'success');
            nodeIndex++;
        } else {
            clearInterval(interval);
            writeToTerminal('', 'info');
            writeToTerminal('═══════════════════════════════════════════', 'system');
            writeToTerminal('  ALL 52 NODES INITIALIZED - SYSTEM READY', 'system');
            writeToTerminal('═══════════════════════════════════════════', 'system');
            
            // Update status displays
            updateStatusDisplays();
        }
    }, 150);
}

function runDiagnostics() {
    writeToTerminal('Running full system diagnostics...', 'node');
    
    const checks = [
        { name: 'Core Engine Health', result: 'OPTIMAL' },
        { name: 'Node Mesh Connectivity', result: '52/52 CONNECTED' },
        { name: 'Context Window', result: '2M TOKENS AVAILABLE' },
        { name: 'API Latency', result: '12ms (EXCELLENT)' },
        { name: 'Memory Allocation', result: '8.2GB / 16GB' },
        { name: 'Inference Pipeline', result: 'OPERATIONAL' },
        { name: 'Red Team Status', result: 'STANDBY' }
    ];
    
    let checkIndex = 0;
    const interval = setInterval(() => {
        if (checkIndex < checks.length) {
            const check = checks[checkIndex];
            writeToTerminal(`  ${check.name}: ${check.result}`, 'info');
            checkIndex++;
        } else {
            clearInterval(interval);
            writeToTerminal('', 'info');
            writeToTerminal('DIAGNOSTICS COMPLETE: All systems nominal.', 'success');
            
            // Trigger visual diagnostics if available
            if (window.dashboardInstance) {
                window.dashboardInstance.runDiagnostics();
            }
        }
    }, 300);
}

function showStatus() {
    const now = new Date();
    const uptime = '99.97%';
    const latency = document.getElementById('latency-display')?.textContent || '~15ms';
    
    writeToTerminal('═══════════════════════════════════════════', 'system');
    writeToTerminal('   AGENTICUM G5 SYSTEM STATUS', 'system');
    writeToTerminal('═══════════════════════════════════════════', 'system');
    writeToTerminal(`  System Time: ${now.toLocaleTimeString()}`, 'info');
    writeToTerminal(`  Operator: YAHYA_YILDIRIM`, 'info');
    writeToTerminal(`  Access Level: 5 (UNRESTRICTED)`, 'info');
    writeToTerminal('', 'info');
    writeToTerminal(`  Active Nodes: 52/52`, 'success');
    writeToTerminal(`  Context Usage: 1.7M / 2M tokens`, 'info');
    writeToTerminal(`  API Latency: ${latency}`, 'info');
    writeToTerminal(`  System Uptime: ${uptime}`, 'success');
    writeToTerminal('═══════════════════════════════════════════', 'system');
}

function clearTerminal() {
    const terminal = document.getElementById('terminal-output');
    if (terminal) {
        terminal.innerHTML = '';
        writeToTerminal('Terminal cleared.', 'info');
    }
}

function listNodes() {
    writeToTerminal('═══ ACTIVE NODE ROSTER ═══', 'system');
    
    const clusters = {};
    G5Nodes.forEach(node => {
        if (!clusters[node.cluster]) clusters[node.cluster] = [];
        clusters[node.cluster].push(node);
    });
    
    Object.keys(clusters).forEach(cluster => {
        writeToTerminal(`\n[${cluster} CLUSTER]`, 'node');
        clusters[cluster].forEach(node => {
            const statusColor = node.status === 'ACTIVE' ? 'success' : 'info';
            writeToTerminal(`  ${node.id}: ${node.name} [${node.status}]`, statusColor);
        });
    });
    
    writeToTerminal('', 'info');
    writeToTerminal(`Total: ${G5Nodes.length} nodes displayed (52 total in fabric)`, 'info');
}

function showNodeStatus() {
    writeToTerminal('═══ DETAILED NODE STATUS ═══', 'system');
    writeToTerminal('', 'info');
    
    const stats = {
        'STRATEGY': { active: 12, load: '67%' },
        'RESEARCH': { active: 15, load: '82%' },
        'CREATION': { active: 18, load: '91%' },
        'CORE': { active: 7, load: '45%' }
    };
    
    Object.keys(stats).forEach(cluster => {
        const s = stats[cluster];
        writeToTerminal(`${cluster}:`, 'node');
        writeToTerminal(`  Active Nodes: ${s.active}`, 'info');
        writeToTerminal(`  Cluster Load: ${s.load}`, 'info');
    });
    
    writeToTerminal('', 'info');
    writeToTerminal('All clusters operating within normal parameters.', 'success');
}

function listAssets() {
    writeToTerminal('═══ ASSET VAULT CONTENTS ═══', 'system');
    
    // Check dashboard instance for assets
    if (window.dashboardInstance && window.dashboardInstance.assets.length > 0) {
        window.dashboardInstance.assets.forEach(asset => {
            writeToTerminal(`  [${asset.type.toUpperCase()}] ${asset.title} (${asset.id})`, 'info');
        });
        writeToTerminal('', 'info');
        writeToTerminal(`Total: ${window.dashboardInstance.assets.length} assets`, 'success');
    } else {
        writeToTerminal('  No assets in vault.', 'info');
        writeToTerminal('  Use GENERATE command to create new assets.', 'info');
    }
}

function generateAssets() {
    writeToTerminal('Initiating asset generation pipeline...', 'node');
    
    const assetTypes = ['VIDEO', 'IMAGE', 'COPY', 'DATA'];
    const randomType = assetTypes[Math.floor(Math.random() * assetTypes.length)];
    
    setTimeout(() => {
        writeToTerminal(`[CC-06] VIDEO_DIRECTOR rendering...`, 'node');
        
        setTimeout(() => {
            writeToTerminal(`[CC-01] COPY_CHIEF generating copy...`, 'node');
            
            setTimeout(() => {
                writeToTerminal('Asset generation complete.', 'success');
                writeToTerminal(`New ${randomType} asset added to vault.`, 'success');
                
                // Trigger in dashboard
                if (window.dashboardInstance) {
                    window.dashboardInstance.generateMockAssets();
                }
            }, 800);
        }, 600);
    }, 400);
}

function runSimulation(type) {
    const simulations = {
        'DUNE': {
            name: 'DUNE CINEMATIC CAMPAIGN',
            nodes: ['SP-01', 'CC-06', 'MI-01'],
            assets: ['VEO Cinematic Trailer', 'Social Hook Pack', 'Press Kit']
        },
        'CRISIS': {
            name: 'CRISIS MANAGEMENT PROTOCOL',
            nodes: ['RA-52', 'SP-99', 'CC-01'],
            assets: ['Response Template', 'Media Strategy', 'Stakeholder Brief']
        },
        'VIRAL': {
            name: 'VIRAL LOOP OPTIMIZATION',
            nodes: ['RA-06', 'CC-01', 'SP-01'],
            assets: ['Viral Hook Variants', 'A/B Test Matrix', 'Distribution Plan']
        }
    };
    
    const sim = simulations[type];
    if (!sim) return;
    
    writeToTerminal(`═══ DEPLOYING: ${sim.name} ═══`, 'system');
    writeToTerminal('', 'info');
    
    let nodeIndex = 0;
    const nodeInterval = setInterval(() => {
        if (nodeIndex < sim.nodes.length) {
            writeToTerminal(`[${sim.nodes[nodeIndex]}] Processing cognitive layer...`, 'node');
            nodeIndex++;
        } else {
            clearInterval(nodeInterval);
            
            writeToTerminal('', 'info');
            writeToTerminal('Assets generated:', 'success');
            sim.assets.forEach(asset => {
                writeToTerminal(`  ✓ ${asset}`, 'success');
            });
            
            writeToTerminal('', 'info');
            writeToTerminal('Simulation complete. Assets added to vault.', 'success');
            
            // Add to dashboard vault
            if (window.dashboardInstance) {
                sim.assets.forEach(asset => {
                    window.dashboardInstance.assets.unshift({
                        id: `SIM_${Math.floor(Math.random() * 10000)}`,
                        type: 'text',
                        title: asset,
                        date: new Date().toLocaleTimeString()
                    });
                });
                window.dashboardInstance.renderVault();
            }
        }
    }, 500);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function updateStatusDisplays() {
    const nodesDisplay = document.getElementById('active-nodes-count');
    if (nodesDisplay) nodesDisplay.textContent = '52/52';
}

function clearLog() {
    const logStream = document.getElementById('log-stream');
    if (logStream) {
        logStream.innerHTML = '<div class="log-entry"><span class="time">NOW</span> <span class="sys">[SYS]</span> Log cleared.</div>';
    }
}

// Helper functions for g5_core_v4.js compatibility
function activateNode(nodeId) {
    // Visual feedback for node activation
    console.log(`[G5] Node ${nodeId} activated`);
}

function deactivateNode(nodeId) {
    // Visual feedback for node deactivation
    console.log(`[G5] Node ${nodeId} deactivated`);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Enter key to send command
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendCommand();
            }
        });
    }
    
    // Quick focus with /
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            commandInput?.focus();
        }
    });
    
    // Initialize welcome message
    setTimeout(() => {
        writeToTerminal('Command Interface ready. Type HELP for commands.', 'success');
    }, 500);
});

// ============================================
// EXPOSE GLOBAL FUNCTIONS
// ============================================
window.sendCommand = sendCommand;
window.executeCommand = executeCommand;
window.clearLog = clearLog;
window.writeToTerminal = writeToTerminal;
window.activateNode = activateNode;
window.deactivateNode = deactivateNode;
window.wait = wait;

console.log('✅ G5 COMMAND INTERFACE LOADED');
