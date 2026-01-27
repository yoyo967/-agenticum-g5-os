/**
 * AGENTICUM G5 | DASHBOARD CORE LOGIC
 * Orchestration Layer for 2030 Experience
 */

class G5Dashboard {
    constructor() {
        this.state = {
            activeNodes: 52,
            contextUsage: 1.7, // M tokens
            latency: 12, // ms
            isRedTeamActive: false,
            activeWorkflow: null
        };
        
        this.assets = [];
        this.init();
    }
    
    init() {
        try {
            console.log('🚀 SYSTEM: G5 HEGEMONY CONSOLE INITIALIZED');
            this.startSystemClock();
            this.startLiveMetrics();
            this.setupEventListeners();
            this.setupVoiceControl();
            this.renderNodes();
            
            // Visual Confirmation
            const core = document.querySelector('.core-logo');
            if(core) {
                core.style.color = '#00ff41';
                setTimeout(() => core.style.color = 'white', 1000);
            }
        } catch (e) {
            console.error('CRITICAL INIT ERROR:', e);
            alert('SYSTEM ERROR: Dashboard Core failed to load. Check console.');
        }
    }

    /* ============================================
       EVENT LISTENERS
       ============================================ */
    setupEventListeners() {
        document.getElementById('execute-command-btn')?.addEventListener('click', () => {
            const input = document.getElementById('commander-input');
            if (input && input.value.trim() !== '') {
                this.executeCommand(input.value);
                input.value = '';
            }
        });

        const inputField = document.getElementById('commander-input');
        inputField?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && inputField.value.trim() !== '') {
                this.executeCommand(inputField.value);
                inputField.value = '';
            }
        });

        // Suggestion Chips
        document.querySelectorAll('.suggestion').forEach(chip => {
            chip.addEventListener('click', () => {
                const cmd = chip.getAttribute('data-cmd');
                this.fillInput(cmd);
            });
        });
        
        // Vault Filters
        document.querySelectorAll('.filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
                this.filterVault(e.target.getAttribute('data-filter'));
            });
        });
    }

    fillInput(text) {
        const input = document.getElementById('commander-input');
        if (input) {
            input.value = text;
            input.focus();
        }
    }

    /* ============================================
       COMMAND EXECUTION & WORKFLOW
       ============================================ */
    executeCommand(command) {
        this.logSystem(`COMMAND RECEIVED: "${command}"`);
        this.transitionToWorkflowView(command);
        
        // Simulate Chain of Thought
        this.runReasoningTrace(command);
    }

    transitionToWorkflowView(command) {
        const coreView = document.getElementById('core-view');
        const wfView = document.getElementById('workflow-view');
        
        if (coreView) coreView.classList.add('hidden'); // Implementation detail: CSS class to hide
        if (wfView) wfView.classList.remove('hidden');
        
        // Manually show/hide via style if class logic isn't enough (robustness)
        if (coreView) coreView.style.display = 'none';
        if (wfView) wfView.style.display = 'block';

        const wfName = document.getElementById('active-workflow-name');
        if (wfName) wfName.textContent = `OP_${Math.floor(Math.random()*9000)+1000}: ${command.substring(0, 20).toUpperCase()}...`;
    }

    runReasoningTrace(command) {
        const pipeline = document.getElementById('node-pipeline');
        if (!pipeline) return;
        
        pipeline.innerHTML = ''; // Clear previous
        
        const steps = [
            { node: 'SN-00', role: 'ORCHESTRATOR', action: 'Parsing Intent', time: 500 },
            { node: 'SP-01', role: 'STRATEGIST', action: 'Developing Vector', time: 1500 },
            { node: 'RA-06', role: 'TREND_FORECASTER', action: 'Aligning Zeitgeist', time: 2500 },
            { node: 'CC-01', role: 'COPY_CHIEF', action: 'Drafting Narrative', time: 3500 },
            { node: 'CC-06', role: 'VIDEO_DIRECTOR', action: 'Rendering Visuals', time: 5000 },
            { node: 'RA-52', role: 'RED_TEAM', action: 'Vulnerability Scan', time: 6500 }
        ];

        let completedSteps = 0;

        steps.forEach((step, index) => {
            setTimeout(() => {
                this.renderPipelineStep(step, pipeline);
                this.logSystem(`[${step.node}] ${step.action}...`);
                
                // Finish workflow
                completedSteps++;
                if (completedSteps === steps.length) {
                    setTimeout(() => this.completeWorkflow(), 1000);
                }
            }, step.time);
        });
    }

    renderPipelineStep(step, container) {
        const el = document.createElement('div');
        el.className = 'pipeline-node active';
        el.innerHTML = `
            <div class="p-node-icon"></div>
            <div class="p-node-info">
                <span class="p-id">${step.node}</span>
                <span class="p-action">${step.action}</span>
            </div>
        `;
        // CSS for this needs to be injected or in dashboard-2030.css
        // Adding inline styles for immediate robustness if CSS is missing some details
        el.style.cssText = `
            display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
            animation: fadeIn 0.5s ease; min-width: 100px;
        `;
        const icon = el.querySelector('.p-node-icon');
        icon.style.cssText = `
            width: 40px; height: 40px; border-radius: 50%;
            border: 2px solid var(--accent-teal); 
            background: rgba(0,243,255,0.1);
            box-shadow: 0 0 15px var(--accent-teal);
        `;
        
        container.appendChild(el);
    }

    completeWorkflow() {
        this.logSystem('WORKFLOW COMPLETE. GENERATING ASSETS.');
        this.generateMockAssets();
        
        // Reset View after delay
        setTimeout(() => {
            const coreView = document.getElementById('core-view');
            const wfView = document.getElementById('workflow-view');
            if (coreView) coreView.style.display = 'flex';
            if (wfView) wfView.style.display = 'none';
            this.logSystem('SYSTEM READY FOR NEXT COMMAND.');
        }, 3000);
    }

    /* ============================================
       ASSET GENERATION
       ============================================ */
    generateMockAssets() {
        const types = ['video', 'image', 'text'];
        const newAsset = {
            id: `AST_${Math.floor(Math.random()*10000)}`,
            type: types[Math.floor(Math.random() * types.length)],
            title: `Generated Output ${this.assets.length + 1}`,
            date: new Date().toLocaleTimeString()
        };
        
        this.assets.unshift(newAsset);
        this.renderVault();
    }

    renderVault(filter = 'all') {
        const grid = document.getElementById('asset-vault-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filtered = filter === 'all' ? this.assets : this.assets.filter(a => a.type === filter);
        
        if (filtered.length === 0) {
             grid.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📂</span>
                    <span>No assets found.</span>
                </div>`;
             return;
        }

        filtered.forEach(asset => {
            const card = document.createElement('div');
            card.className = 'asset-card';
            card.innerHTML = `
                <div class="asset-preview">
                    <span class="asset-type-badge">${asset.type.toUpperCase()}</span>
                    <!-- Placeholder Visual -->
                    <div style="width: 40px; height: 40px; background: linear-gradient(45deg, var(--accent-teal), var(--accent-magenta)); border-radius: 50%; opacity: 0.5"></div>
                </div>
                <div class="asset-info">
                    <span class="asset-title">${asset.title}</span>
                    <span class="asset-meta">${asset.id} | ${asset.date}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    filterVault(type) {
        this.renderVault(type);
    }

    /* ============================================
       VOICE COMMAND INTERFACE (V.C.I.)
       ============================================ */
    setupVoiceControl() {
        const micBtn = document.getElementById('voice-command-btn');
        if (!micBtn) return;
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                micBtn.classList.add('listening');
                const status = document.getElementById('voice-status');
                if(status) {
                    status.classList.remove('hidden');
                    status.textContent = 'LISTENING...';
                }
                // Play Listening Sound
                this.playSound('open'); 
            };

            this.recognition.onend = () => {
                this.isListening = false;
                micBtn.classList.remove('listening');
                 const status = document.getElementById('voice-status');
                if(status) status.classList.add('hidden');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.logSystem(`VOICE INPUT DETECTED: "${transcript}"`);
                
                // Fill input
                this.fillInput(transcript);
                
                // Auto-execute if confident
                if (event.results[0][0].confidence > 0.8) {
                   setTimeout(() => this.executeCommand(transcript), 1000);
                }
                
                this.playSound('success');
            };
            
            this.recognition.onerror = (event) => {
                 this.logSystem(`VOICE ERROR: ${event.error}`);
                 this.playSound('error');
            };

            micBtn.addEventListener('click', () => {
                if (this.isListening) this.recognition.stop();
                else this.recognition.start();
            });
        } else {
            micBtn.style.display = 'none';
            console.log('Voice API not supported');
        }
    }
    
    playSound(type) {
        // Simple integration with interactive.js G5Audio if available
        if (window.G5Audio && window.G5Audio.play) {
            window.G5Audio.play(type);
        }
    }

    /* ============================================
       SYSTEM UTILS
       ============================================ */
    toggleRedTeam() {
        this.state.isRedTeamActive = !this.state.isRedTeamActive;
        const body = document.body;
        
        if (this.state.isRedTeamActive) {
            body.classList.add('red-team-mode');
            this.logSystem('⚠️ RED TEAM PROTOCOL INITIATED. ADVERSARIAL MODE ACTIVE.');
            document.documentElement.style.setProperty('--accent-teal', '#ff4800');
            document.documentElement.style.setProperty('--accent-green', '#ff0000');
            this.playSound('error'); // Alarm sound
        } else {
            body.classList.remove('red-team-mode');
            this.logSystem('RED TEAM STAND DOWN. NORMAL OPERATIONS RESUMED.');
            document.documentElement.style.setProperty('--accent-teal', '#00f3ff');
            document.documentElement.style.setProperty('--accent-green', '#00ff41');
            this.playSound('success');
        }
    }
    
    runDiagnostics() {
        this.logSystem('INITIALIZING NEURAL HOSTING ENVIRONMENT...');
        
        const coreView = document.getElementById('core-view');
        const neuralView = document.getElementById('neural-view');
        const wfView = document.getElementById('workflow-view');
        
        if(coreView) coreView.classList.add('hidden');
        if(coreView) coreView.style.display = 'none';
        
        if(wfView) wfView.classList.add('hidden');
        if(wfView) wfView.style.display = 'none';
        
        if(neuralView) {
            neuralView.classList.remove('hidden');
            neuralView.style.display = 'block';
            
            // Initialize Neural Network if not already done
            if (!this.neuralNet) {
                // Check if NeuralNetwork class is available (from neural-network.js)
                if (typeof NeuralNetwork !== 'undefined') {
                    // Slight delay to ensure DOM is ready
                    setTimeout(() => {
                         this.neuralNet = new NeuralNetwork('dashboard-neural-container');
                         this.logSystem('✓ NEURAL FABRIC VISUALIZED');
                    }, 100);
                } else {
                    this.logSystem('⚠ NEURAL SCRIPT NOT LOADED');
                }
            }
        }
    }
    
    toggleView() {
        // Cycle views: Commander -> Neural -> Commander
        const neuralView = document.getElementById('neural-view');
        if (neuralView && neuralView.style.display === 'block') {
            // Switch back to Commander
            neuralView.style.display = 'none';
             const coreView = document.getElementById('core-view');
             if(coreView) {
                 coreView.classList.remove('hidden');
                 coreView.style.display = 'flex';
             }
             this.logSystem('VIEW: COMMANDER INTERFACE');
        } else {
            // Switch to Diagnostics
            this.runDiagnostics();
        }
    }

    logSystem(msg) {
        const stream = document.getElementById('log-stream');
        if (!stream) return;
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        const time = new Date().toLocaleTimeString();
        entry.innerHTML = `<span class="time">${time}</span> <span class="sys">[SYS]</span> ${msg}`;
        stream.insertBefore(entry, stream.firstChild);
        
        if (stream.children.length > 50) stream.lastChild.remove();
    }

    renderNodes() {
        const clusters = ['strategy-nodes', 'creation-nodes', 'intel-nodes'];
        clusters.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = ''; // Clear to prevent dupes
                for(let i=0; i<6; i++) {
                    const node = document.createElement('div');
                    node.className = 'node-dot';
                    const nodeId = `SN-${Math.floor(Math.random()*90)+10}`;
                    node.title = `${nodeId}: Click to Configure`;
                    // CSS for interaction
                    node.style.cssText = `width: 10px; height: 10px; background: var(--accent-teal); border-radius: 50%; border: 1px solid rgba(0,0,0,0.5); opacity: 0.6; margin: 3px; cursor: pointer; transition: all 0.2s;`;
                    
                    node.addEventListener('mouseenter', () => node.style.transform = 'scale(1.5)');
                    node.addEventListener('mouseleave', () => node.style.transform = 'scale(1)');
                    node.addEventListener('click', () => this.openNodeConfig(nodeId));
                    
                    el.appendChild(node);
                }
            }
        });
    }
    
    /* ============================================
       MODAL & CONFIGURATION LOGIC
       ============================================ */
    openNodeConfig(nodeId) {
        const modal = document.getElementById('node-config-modal');
        const title = document.getElementById('modal-node-id');
        if (modal && title) {
            title.innerHTML = `// NODE_CONFIG: <span class="highlight">${nodeId}</span>`;
            modal.classList.remove('hidden');
            this.playSound('open');
        }
    }
    
    closeModal() {
        document.querySelectorAll('.overlay-modal').forEach(el => el.classList.add('hidden'));
        this.playSound('close');
    }
    
    saveNodeConfig() {
        this.logSystem('✓ NODE CONFIGURATION UPDATED');
        this.closeModal();
    }
    
    /* ============================================
       FILE UPLOAD LOGIC
       ============================================ */
    handleUpload(input) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            this.logSystem(`INITIATING UPLOAD: ${file.name} (${(file.size/1024).toFixed(1)} KB)...`);
            
            setTimeout(() => {
                this.logSystem('✓ UPLOAD COMPLETE. ASSET INDEXED.');
                
                // Add to Vault
                this.assets.unshift({
                    id: `FILE_${Math.floor(Math.random()*1000)}`,
                    type: file.type.includes('image') ? 'image' : 'text',
                    title: file.name,
                    date: new Date().toLocaleTimeString()
                });
                this.renderVault();
                this.playSound('success');
            }, 1000);
        }
    }

    startSystemClock() {
        setInterval(() => {
            const clock = document.getElementById('system-clock');
            if(clock) clock.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }

    startLiveMetrics() {
        setInterval(() => {
            // Fluctuate Latency
            const lat = document.getElementById('latency-display');
            if(lat) {
                const val = 10 + Math.floor(Math.random() * 20);
                lat.textContent = `~${val}ms`;
                this.state.latency = val;
            }
        }, 2000);
    }

    // Static Access helper
    static toggleRedTeam() { window.dashboardInstance?.toggleRedTeam(); }
    static runDiagnostics() { window.dashboardInstance?.runDiagnostics(); }
    static toggleView() { console.log('View Toggle'); } // Placeholder
    static fillInput(txt) { window.dashboardInstance?.fillInput(txt); }
    static executeCommand() { 
        const input = document.getElementById('commander-input');
        if(input) window.dashboardInstance?.executeCommand(input.value); 
    }
}

// Global Instance
window.addEventListener('DOMContentLoaded', () => {
    window.dashboardInstance = new G5Dashboard();
});
