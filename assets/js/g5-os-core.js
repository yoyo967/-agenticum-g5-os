/**
 * AGENTICUM G5 | OPERATING SYSTEM CORE
 * Complete IDE-like Experience with Agent Management
 */

// ============================================
// GLOBAL STATE
// ============================================
const G5OS = {
    state: {
        activeView: 'workspace',
        activeWorkspaceTab: 'chat',
        activeFooterTab: 'terminal',
        footerCollapsed: false,
        panelLeftWidth: 260,
        panelRightWidth: 300,
        activeAgent: {
            id: 'SN-00',
            name: 'Orchestrator',
            cluster: 'APEX',
            briefing: '',
            traits: ['strategic', 'decisive', 'analytical']
        },
        contextFiles: [],
        chatHistory: [],
        assets: [],
        nodes: {
            online: 52,
            processing: 0,
            offline: 0
        }
    },

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        console.log('⬡ AGENTICUM G5 OS | INITIALIZING...');
        
        this.setupEventListeners();
        this.setupPanelResize();
        this.startSystemClock();
        this.loadNodes();
        
        // Start Boot Sequence
        this.runBootSequence();

        console.log('✅ G5 OS READY | 52 NODES ONLINE');
    },

    runBootSequence() {
        const terminal = document.getElementById('bootTerminal');
        const overlay = document.getElementById('bootOverlay');
        if (!terminal || !overlay) {
            if (overlay) overlay.remove(); 
            return;
        }
        
        const lines = [
            'LOADING KERNEL MODULES...',
            'MOUNTING G5 HYPERVISOR...',
            'CONNECTING TO 52-NODE CLUSTER...',
            'VERIFYING SECURITY TOKENS...',
            'SYSTEM READY.'
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i >= lines.length) {
                clearInterval(interval);
                setTimeout(() => {
                    overlay.classList.add('fade-out');
                    setTimeout(() => overlay.remove(), 1000);
                }, 500);
                return;
            }
            
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.style.opacity = '0';
            line.style.animation = 'typeLine 0.1s forwards';
            line.textContent = `> ${lines[i]}`;
            terminal.appendChild(line);
            i++;
        }, 500); 
    },

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Header tabs
        document.querySelectorAll('.os-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchView(tab.dataset.view));
        });

        // Workspace tabs
        document.querySelectorAll('.workspace-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchWorkspaceTab(tab.dataset.tab));
        });

        // Footer tabs
        document.querySelectorAll('.footer-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchFooterTab(tab.dataset.panel));
        });

        // Toggle footer
        document.getElementById('togglePanelBtn')?.addEventListener('click', () => {
            this.toggleFooter();
        });

        // Clear terminal
        document.getElementById('clearTerminalBtn')?.addEventListener('click', () => {
            this.clearTerminal();
        });

        // Chat input
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        chatInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        sendBtn?.addEventListener('click', () => this.sendMessage());

        // Suggestions
        document.querySelectorAll('.suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('chatInput').value = btn.dataset.cmd;
                this.sendMessage();
            });
        });

        // Terminal input
        const terminalInput = document.getElementById('terminalInput');
        terminalInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeTerminalCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });

        // Workflow items
        document.querySelectorAll('.workflow-item').forEach(item => {
            item.addEventListener('click', () => this.openWorkflowModal(item.dataset.workflow));
        });

        // Module tree folders
        document.querySelectorAll('.tree-item.folder').forEach(folder => {
            folder.addEventListener('click', () => this.toggleFolder(folder));
        });

        // Node items
        document.querySelectorAll('.tree-item.file[data-node]').forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectNode(node.dataset.node);
            });
        });

        // Agent briefing
        document.getElementById('agentBriefing')?.addEventListener('change', (e) => {
            this.state.activeAgent.briefing = e.target.value;
            this.logToTerminal(`[SN-00] Agent briefing updated`);
        });

        // File upload
        document.getElementById('attachBtn')?.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput')?.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
            e.target.value = ''; // Reset for re-upload
        });

        document.getElementById('addContextBtn')?.addEventListener('click', () => {
            document.getElementById('contextFileInput').click();
        });

        document.getElementById('contextFileInput')?.addEventListener('change', (e) => {
            this.handleContextFileUpload(e.target.files);
            e.target.value = '';
        });

        // Voice input
        document.getElementById('voiceBtn')?.addEventListener('click', () => {
            this.startVoiceInput();
        });

        // Settings button
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.openSettings();
        });

        // Settings close
        document.getElementById('closeSettings')?.addEventListener('click', () => {
            this.closeSettings();
        });

        // Settings navigation
        document.querySelectorAll('.settings-nav').forEach(nav => {
            nav.addEventListener('click', () => this.switchSettingsSection(nav.dataset.section));
        });

        // Settings backdrop click to close
        document.querySelector('#settingsModal .modal-backdrop')?.addEventListener('click', () => {
            this.closeSettings();
        });

        // Command palette items
        document.querySelectorAll('.palette-item').forEach(item => {
            item.addEventListener('click', () => this.executePaletteAction(item));
        });

        // Palette backdrop
        document.querySelector('#commandPalette .palette-backdrop')?.addEventListener('click', () => {
            this.closePalette();
        });

        // Palette input
        document.getElementById('paletteInput')?.addEventListener('input', (e) => {
            this.filterPaletteResults(e.target.value);
        });

        // Workflow modal
        document.getElementById('closeWorkflow')?.addEventListener('click', () => this.closeWorkflowModal());
        document.getElementById('cancelWorkflow')?.addEventListener('click', () => this.closeWorkflowModal());
        document.getElementById('executeWorkflow')?.addEventListener('click', () => this.executeWorkflow());
        document.querySelector('#workflowModal .modal-backdrop')?.addEventListener('click', () => this.closeWorkflowModal());

        // Asset preview modal
        document.getElementById('closeAssetPreview')?.addEventListener('click', () => this.closeAssetPreview());
        document.querySelector('#assetPreviewModal .modal-backdrop')?.addEventListener('click', () => this.closeAssetPreview());

        // Test connection button
        document.getElementById('testConnection')?.addEventListener('click', () => this.testApiConnection());

        // Asset items in sidebar
        document.querySelectorAll('.asset-mini').forEach(asset => {
            asset.addEventListener('click', () => this.previewAsset(asset.dataset.type, asset.querySelector('.asset-name')?.textContent));
        });

        // Assets grid cards
        document.querySelectorAll('.asset-card:not(.upload-zone)').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.asset-action')) {
                    this.previewAsset(card.dataset.type, card.querySelector('.asset-title')?.textContent);
                }
            });
        });

        // Preview tabs
        document.querySelectorAll('.preview-tab').forEach(tab => {
            tab.addEventListener('click', () => this.filterAssets(tab.dataset.type));
        });

        // Upload zone
        const uploadZone = document.getElementById('uploadZone');
        uploadZone?.addEventListener('click', () => document.getElementById('fileInput').click());
        uploadZone?.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('drop-active');
        });
        uploadZone?.addEventListener('dragleave', () => uploadZone.classList.remove('drop-active'));
        uploadZone?.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('drop-active');
            this.handleFileUpload(e.dataTransfer.files);
        });

        // Upload button in preview
        document.getElementById('uploadAssetBtn')?.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        // Generate asset button
        document.getElementById('generateAssetBtn')?.addEventListener('click', () => {
            this.showToast('info', 'Asset generation requires Gemini API');
        });

        // Agent tiles
        document.querySelectorAll('.agent-tile').forEach(tile => {
            tile.addEventListener('click', (e) => {
                if (!e.target.closest('.tile-btn')) {
                    this.selectNode(tile.dataset.node);
                    this.showToast('success', `Selected ${tile.dataset.node}`);
                }
            });
        });

        // Cluster filter
        document.getElementById('clusterFilter')?.addEventListener('change', (e) => {
            this.filterAgentsByCluster(e.target.value);
        });

        // Status filter
        document.getElementById('statusFilter')?.addEventListener('change', (e) => {
            this.filterAgentsByStatus(e.target.value);
        });

        // Quick actions
        document.getElementById('quickNewChat')?.addEventListener('click', () => this.newChat());
        document.getElementById('quickUpload')?.addEventListener('click', () => document.getElementById('fileInput').click());
        document.getElementById('quickWorkflow')?.addEventListener('click', () => this.openWorkflowModal('5min-agency'));
        document.getElementById('quickPalette')?.addEventListener('click', () => this.togglePalette());
        document.getElementById('quickSettings')?.addEventListener('click', () => this.openSettings());

        // Workflow card execute buttons
        document.querySelectorAll('.wf-run-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.workflow-card');
                if (card) {
                    this.openWorkflowModal(card.dataset.workflow);
                }
            });
        });

        // WORKFLOW MODAL ACTIONS
        // Allow Enter to submit (without Shift)
        document.getElementById('workflowInput')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.executeWorkflow();
            }
        });

        // Simulate attaching files
        document.getElementById('workflowAttach')?.addEventListener('click', () => {
             const countSpan = document.getElementById('attachedCount');
             if (countSpan) {
                 countSpan.textContent = '3 files'; // Simulating context
                 countSpan.style.color = '#4ade80'; // Success green
                 this.showToast('success', 'Context attached: Brand Guidelines, Persona Data');
             }
        });

        // Workflow card click
        document.querySelectorAll('.workflow-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectWorkflowCard(card);
            });
        });

        // Context menu setup
        this.setupContextMenu();

        // Asset Modal Actions
        document.getElementById('saveAsset')?.addEventListener('click', () => this.savePreviewChanges());
        document.getElementById('downloadAsset')?.addEventListener('click', () => this.downloadPreviewAsset());
        document.getElementById('copyAsset')?.addEventListener('click', () => this.copyPreviewContent());
        document.getElementById('closeAssetPreview')?.addEventListener('click', () => this.closeAssetPreview());
        
        // Node Modal Actions
        document.getElementById('nodeActivateBtn')?.addEventListener('click', () => {
            const nodeId = this.state.activeAgent?.id || 'NODE';
            this.showToast('success', `${nodeId} ACTIVATED | Integration complete`);
            document.getElementById('nodeModal')?.classList.add('hidden');
            
            // CONTEXTUAL CHAT
            this.startAgentChat(nodeId);
        });

        // NODE CONFIGURATION LISTENERS
        document.getElementById('nodeComputeSlider')?.addEventListener('input', (e) => {
            document.getElementById('computeValueDisplay').textContent = `${e.target.value}% TERAFLOPS`;
        });

        document.getElementById('applyConfigBtn')?.addEventListener('click', () => {
            const mode = document.getElementById('nodeModeSelect').value;
            const compute = document.getElementById('nodeComputeSlider').value;
            this.showToast('success', `[SN-00] CONFIG UPDATED: ${mode.toUpperCase()} | ${compute}% COMPUTE`);
            this.logToTerminal(`[SN-00] Configuration applied: Mode=${mode}, Compute=${compute}%`);
            document.getElementById('nodeModal')?.classList.add('hidden');
        });

        document.getElementById('nodeLogsBtn')?.addEventListener('click', () => {
            this.showToast('info', 'System logs exported to clipboard');
        });
        
        // Generic Modal Close for Node Modal (using class since ID might vary)
        const nodeModal = document.getElementById('nodeModal');
        if (nodeModal) {
            nodeModal.querySelector('.modal-close')?.addEventListener('click', () => nodeModal.classList.add('hidden'));
            nodeModal.querySelector('.modal-backdrop')?.addEventListener('click', () => nodeModal.classList.add('hidden'));
        }

        // KEYBOARD SHORTCUTS
        this.setupKeyboardShortcuts();
        
        // DEAD CLICK AUDIT - FEEDBACK LOOPS
        document.querySelector('.os-user')?.addEventListener('click', () => {
             this.showToast('info', 'OPERATOR: YILDIRIM | ROLE: SYSADMIN');
        });

        // AGENT TILE LISTENER (Global Delegate for Gear/Log buttons)
        const agentsGrid = document.getElementById('agentsGrid');
        if (agentsGrid) {
            agentsGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('.tile-btn');
                const tile = e.target.closest('.agent-tile');
                
                if (tile) {
                    const nodeId = tile.dataset.node;
                    
                    // Case 1: Clicked a Button
                    if (btn) {
                        e.stopPropagation(); // Prevent tile click
                        const title = btn.getAttribute('title');
                        const text = btn.textContent;
                        
                        if (title === 'Configure' || text.includes('⚙️')) {
                            this.logToTerminal(`[UI] Configure requested for ${nodeId}`);
                            this.selectNode(nodeId);
                            
                            // Force Config Panel Open
                            setTimeout(() => {
                                const config = document.getElementById('nodeConfigSection');
                                if (config) {
                                    config.classList.remove('hidden');
                                    config.style.display = 'block'; // Force display
                                    config.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }, 50);
                        } 
                        else if (title === 'Logs' || text.includes('📋')) {
                             this.selectNode(nodeId);
                             setTimeout(() => {
                                 const logs = document.getElementById('nodeLogs');
                                 if (logs) logs.scrollIntoView({ behavior: 'smooth' });
                             }, 50);
                        }
                        return;
                    }
                    
                    // Case 2: Clicked the Tile Body
                    this.selectNode(nodeId);
                }
            });
        }
        
        document.querySelectorAll('.section-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showToast('warning', 'Module System Locked by Policy MI-07');
            });
        });

        // Ensure all feature-restricted buttons give feedback
        document.querySelectorAll('.feature-locked').forEach(btn => {
            btn.addEventListener('click', () => this.showToast('info', 'Feature available in Enterprise Edition'));
        });
    },

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K - Command Palette
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.togglePalette();
            }
            
            // Ctrl+, - Settings
            if (e.ctrlKey && e.key === ',') {
                e.preventDefault();
                this.openSettings();
            }
            
            // Ctrl+` - Toggle Terminal
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.toggleFooter();
            }
            
            // Ctrl+B - Toggle Left Panel
            if (e.ctrlKey && !e.shiftKey && e.key === 'b') {
                e.preventDefault();
                this.toggleLeftPanel();
            }
            
            // Ctrl+Shift+B - Toggle Right Panel
            if (e.ctrlKey && e.shiftKey && e.key === 'B') {
                e.preventDefault();
                this.toggleRightPanel();
            }
            
            // Ctrl+N - New Chat
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.newChat();
            }
            
            // ESC - Close modals
            if (e.key === 'Escape') {
                this.closePalette();
                this.closeSettings();
                this.closeWorkflowModal();
                this.closeAssetPreview();
            }
        });
    },

    // ============================================
    // VIEW SWITCHING
    // ============================================
    switchView(view) {
        document.querySelectorAll('.os-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });
        this.state.activeView = view;
        
        // Show corresponding workspace content
        if (view === 'agents') {
            this.switchWorkspaceTab('agents');
        } else if (view === 'assets') {
            this.switchWorkspaceTab('preview');
        } else if (view === 'workflows') {
            this.switchWorkspaceTab('workflows');
        } else if (view === 'workspace') {
            this.switchWorkspaceTab('chat');
        }
        
        this.logToTerminal(`[UI] Switched to ${view.toUpperCase()} view`);
    },

    switchWorkspaceTab(tab) {
        document.querySelectorAll('.workspace-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        document.querySelectorAll('.workspace-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Map tab to view
        const viewMap = {
            'chat': 'chatView',
            'editor': 'editorView',
            'preview': 'previewView',
            'agents': 'agentsView',
            'workflows': 'workflowsView'
        };
        
        const viewId = viewMap[tab] || `${tab}View`;
        document.getElementById(viewId)?.classList.remove('hidden');
        this.state.activeWorkspaceTab = tab;
    },

    switchFooterTab(panel) {
        document.querySelectorAll('.footer-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.panel === panel);
        });
        
        document.querySelectorAll('.footer-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        document.getElementById(`${panel}Panel`)?.classList.remove('hidden');
        this.state.activeFooterTab = panel;
    },

    toggleFooter() {
        const footer = document.getElementById('bottomPanel');
        const btn = document.getElementById('togglePanelBtn');
        
        footer.classList.toggle('collapsed');
        this.state.footerCollapsed = !this.state.footerCollapsed;
        btn.textContent = this.state.footerCollapsed ? '▲' : '▼';
    },

    // ============================================
    // CHAT FUNCTIONALITY
    // ============================================
    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        
        // Add user message
        this.addChatMessage('user', message);
        
        // Show thinking indicator
        const thinkingId = this.showThinking();
        
        // Log to terminal
        this.logToTerminal(`[COMMAND] ${message.substring(0, 50)}...`);
        
        // Activate nodes
        this.activateNodes(['SN-00', 'SP-01', 'RA-01', 'CC-01']);
        
        try {
            // Call API or simulate
            const response = await this.processCommand(message);
            
            // Remove thinking
            this.removeThinking(thinkingId);
            
            // Add response
            this.addChatMessage('assistant', response);
            
            // Deactivate nodes
            this.deactivateNodes(['SN-00', 'SP-01', 'RA-01', 'CC-01']);
            
        } catch (error) {
            this.removeThinking(thinkingId);
            this.addChatMessage('system', `Error: ${error.message}`);
        }
    },

    addChatMessage(type, content) {
        const container = document.getElementById('chatMessages');
        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;
        
        const time = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
        
        if (type === 'user') {
            msg.innerHTML = `<div class="msg-content">${this.escapeHtml(content)}</div>`;
        } else {
            msg.innerHTML = `
                <div class="msg-header">
                    <span class="msg-icon">◆</span>
                    <span class="msg-sender">${type === 'system' ? 'SYSTEM' : 'AGENTICUM G5'}</span>
                    <span class="msg-time">${time}</span>
                </div>
                <div class="msg-content">${this.formatResponse(content)}</div>
            `;
        }
        
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        
        this.state.chatHistory.push({ type, content, time: Date.now() });
    },

    showThinking() {
        const container = document.getElementById('chatMessages');
        const id = `thinking-${Date.now()}`;
        
        const msg = document.createElement('div');
        msg.className = 'chat-message assistant thinking';
        msg.id = id;
        msg.innerHTML = `
            <div class="msg-header">
                <span class="msg-icon">◆</span>
                <span class="msg-sender">AGENTICUM G5</span>
                <span class="msg-time">REASONING</span>
            </div>
            <div class="msg-content">
                <div class="thinking-indicator">
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                </div>
            </div>
        `;
        
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        
        return id;
    },

    removeThinking(id) {
        document.getElementById(id)?.remove();
    },

    async processCommand(command) {
        // Check if API is available
        if (window.G5_API) {
            try {
                const result = await G5_API.execute(command, this.state.activeAgent.briefing);
                return result.response || result.message || 'Command processed.';
            } catch (e) {
                // Fallback to simulation
            }
        }
        
        // Simulate response
        await this.delay(1500 + Math.random() * 1000);
        
        return this.generateSimulatedResponse(command);
    },

    generateSimulatedResponse(command) {
        const cmd = command.toLowerCase();
        
        if (cmd.includes('campaign') || cmd.includes('marketing')) {
            return `<p><strong>[SP-01 CAMPAIGN STRATEGIST]</strong></p>
            <p>Strategic analysis complete. Recommendations:</p>
            <ul>
                <li>Primary channel: LinkedIn with personal storytelling arc</li>
                <li>Secondary: Twitter thread strategy for viral amplification</li>
                <li>Content ratio: 60% value, 30% engagement, 10% promotion</li>
            </ul>
            <p><em>Estimated reach: 2.4M impressions | CTR projection: 3.2%</em></p>`;
        }
        
        if (cmd.includes('competitor') || cmd.includes('analyze')) {
            return `<p><strong>[RA-01 AUTHORITY AUDITOR]</strong></p>
            <p>Competitive landscape scan complete:</p>
            <ul>
                <li><strong>Market gap identified:</strong> AI-native positioning is underutilized</li>
                <li><strong>Vulnerability:</strong> Legacy competitors slow on Gemini adoption</li>
                <li><strong>Opportunity window:</strong> 6-8 weeks before market saturation</li>
            </ul>`;
        }
        
        if (cmd.includes('copy') || cmd.includes('write')) {
            return `<p><strong>[CC-01 COPY CHIEF]</strong></p>
            <p>Generated copy variations:</p>
            <div class="generated-content">
                <p>1. "Don't hire an agency. License a civilization."</p>
                <p>2. "52 AI minds. One strategic vision. Zero bottlenecks."</p>
                <p>3. "Your marketing OS has arrived. The old world trembles."</p>
            </div>`;
        }
        
        if (cmd.includes('compliance') || cmd.includes('check')) {
            return `<p><strong>[MI-01 COMPLIANCE OFFICER]</strong></p>
            <p>Governance check complete:</p>
            <ul>
                <li>✅ EU AI Act: COMPLIANT</li>
                <li>✅ GDPR: COMPLIANT</li>
                <li>✅ Ethical Guidelines: PASSED</li>
                <li>✅ No dark patterns detected</li>
            </ul>`;
        }
        
        return `<p><strong>[SN-00 ORCHESTRATOR]</strong></p>
        <p>Command received and processed by the 52-node reasoning fabric.</p>
        <p>Active clusters: STRATEGY, RESEARCH, CONTENT, GOVERNANCE</p>
        <p><em>Ready for next instruction.</em></p>`;
    },

    formatResponse(content) {
        // If already HTML, return as-is
        if (content.startsWith('<')) return content;
        
        // Convert markdown-like content
        return content
            .split('\n')
            .map(line => `<p>${line}</p>`)
            .join('');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // ============================================
    // TERMINAL FUNCTIONALITY
    // ============================================
    executeTerminalCommand(command) {
        if (!command.trim()) return;
        
        this.logToTerminal(`g5 > ${command}`, 'input');
        
        const cmd = command.toUpperCase().trim();
        
        switch(cmd) {
            case 'HELP':
                this.logToTerminal('Available commands: HELP, STATUS, NODES, CLEAR, DEPLOY, WORKFLOW [name]');
                break;
            case 'STATUS':
                this.logToTerminal(`[STATUS] ${this.state.nodes.online}/52 nodes online | 0 errors`);
                break;
            case 'NODES':
                this.logToTerminal('[NODES] STRATEGY: 3 | RESEARCH: 3 | CONTENT: 4 | GOVERNANCE: 2 | INTEL: 2');
                break;
            case 'CLEAR':
                this.clearTerminal();
                break;
            case 'DEPLOY':
                this.logToTerminal('[DEPLOY] Initiating deployment sequence...', 'system');
                setTimeout(() => this.logToTerminal('[DEPLOY] ✓ Deployment complete', 'success'), 1500);
                break;
            default:
                if (cmd.startsWith('WORKFLOW ')) {
                    const wf = cmd.replace('WORKFLOW ', '');
                    this.logToTerminal(`[WORKFLOW] Activating ${wf}...`, 'system');
                } else {
                    this.logToTerminal(`[ERROR] Unknown command: ${command}`, 'error');
                }
        }
    },

    logToTerminal(message, type = '') {
        const output = document.getElementById('terminalOutput');
        if (!output) return;
        
        const line = document.createElement('div');
        line.className = `term-line ${type}`;
        
        // TYPEWRITER EFFECT CONTAINER
        // We use a specific structure to ensure style consistency
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        line.innerHTML = `<span style="opacity:0.5">[${time}]</span> <span class="typewriter-text"></span><span class="typing-cursor">█</span>`;
        
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
        
        const textSpan = line.querySelector('.typewriter-text');
        const cursor = line.querySelector('.typing-cursor');
        
        let i = 0;
        // Faster speed for demo fluidness (8ms)
        const speed = 8; 
        
        const typeChar = () => {
            if (i < message.length) {
                textSpan.textContent += message.charAt(i);
                i++;
                output.scrollTop = output.scrollHeight;
                setTimeout(typeChar, speed);
            } else {
                cursor.remove();
            }
        };
        typeChar();
        
        // Limit history
        if (output.children.length > 50) {
            output.removeChild(output.firstChild);
        }
    },

    clearTerminal() {
        const output = document.getElementById('terminalOutput');
        output.innerHTML = '<div class="term-line system">[SYSTEM] Terminal cleared</div>';
    },

    // ============================================
    // NODE MANAGEMENT
    // ============================================
    loadNodes() {
        // Node definitions
        this.nodes = {
            'SN-00': { name: 'Orchestrator', cluster: 'APEX', status: 'online' },
            'SP-01': { name: 'Campaign Strategist', cluster: 'STRATEGY', status: 'online' },
            'SP-99': { name: 'Hegemony Matrix', cluster: 'STRATEGY', status: 'online' },
            'SP-77': { name: 'Logic Patcher', cluster: 'STRATEGY', status: 'online' },
            'RA-01': { name: 'Authority Auditor', cluster: 'RESEARCH', status: 'online' },
            'RA-06': { name: 'Trend Forecaster', cluster: 'RESEARCH', status: 'online' },
            'RA-52': { name: 'Red Team', cluster: 'RESEARCH', status: 'online' },
            'CC-01': { name: 'Copy Chief', cluster: 'CONTENT', status: 'online' },
            'CC-06': { name: 'Video Director', cluster: 'CONTENT', status: 'online' },
            'CC-08': { name: 'Flash Voice', cluster: 'CONTENT', status: 'online' },
            'CC-13': { name: 'Music Composer', cluster: 'CONTENT', status: 'online' },
            'MI-01': { name: 'Compliance Officer', cluster: 'GOVERNANCE', status: 'online' },
            'MI-07': { name: 'Ethics Auditor', cluster: 'GOVERNANCE', status: 'online' },
            'DT-02': { name: 'Pricing Algorithm', cluster: 'INTEL', status: 'online' },
            'DT-04': { name: 'Analytics Core', cluster: 'INTEL', status: 'online' }
        };
    },

    selectNode(nodeId) {
        const node = this.nodes[nodeId];
        if (!node) return;
        
        this.state.activeAgent = {
            id: nodeId,
            name: node.name,
            cluster: node.cluster,
            briefing: this.getNodeBriefing(nodeId),
            traits: this.getNodeTraits(nodeId)
        };
        
        // POPULATE MODAL
        document.getElementById('nodeModalTitle').textContent = `${nodeId} | ${node.name}`;
        
        const logsContainer = document.getElementById('nodeLogs');
        if (logsContainer) {
            logsContainer.innerHTML = '';
            // Simulate startup logs
            const logs = [
                `[SYSTEM] Initializing ${nodeId} protocol...`,
                `[${node.cluster}] Cluster handshake verified.`,
                `[MEMORY] Loading context frame (24MB)...`,
                `[STATUS] Node is ONLINE and IDLE.`
            ];
            
            logs.forEach((log, i) => {
                setTimeout(() => {
                    logsContainer.innerHTML += `<div class="log-line">${log}</div>`;
                }, i * 200);
            });
        }
        
        // Show Modal
        const configSection = document.getElementById('nodeConfigSection');
        if (configSection) {
            if (nodeId === 'SN-00') {
                configSection.classList.remove('hidden');
            } else {
                configSection.classList.add('hidden');
            }
        }
        
        document.getElementById('nodeModal')?.classList.remove('hidden');
        
        this.logToTerminal(`[NODE] Inspecting ${nodeId}`);
    },

    getNodeBriefing(nodeId) {
        const briefings = {
            'SN-00': 'You are the central orchestrator of a 52-node cognitive mesh. Coordinate strategy, content, research, and governance clusters for optimal marketing outcomes.',
            'SP-01': 'You are the Campaign Strategist. Design comprehensive marketing campaigns that dominate the market and maximize ROI.',
            'CC-01': 'You are the Copy Chief. Create persuasive, compelling copy that converts readers into customers.',
            'RA-01': 'You are the Authority Auditor. Scan and analyze competitive landscapes to identify vulnerabilities and opportunities.',
            'MI-01': 'You are the Compliance Officer. Ensure all outputs meet EU AI Act, GDPR, and ethical guidelines.'
        };
        return briefings[nodeId] || `Agent ${nodeId} ready for specialized tasks.`;
    },

    getNodeTraits(nodeId) {
        const traits = {
            'SN-00': ['strategic', 'decisive', 'analytical'],
            'SP-01': ['strategic', 'creative', 'analytical'],
            'CC-01': ['creative', 'persuasive', 'experimental'],
            'RA-01': ['analytical', 'thorough', 'skeptical'],
            'MI-01': ['precise', 'ethical', 'thorough']
        };
        return traits[nodeId] || ['strategic', 'analytical'];
    },

    activateNodes(nodeIds) {
        nodeIds.forEach(id => {
            const dot = document.querySelector(`.node-dot[title="${id}"]`);
            if (dot) {
                dot.classList.remove('online');
                dot.classList.add('processing');
            }
        });
    },

    deactivateNodes(nodeIds) {
        nodeIds.forEach(id => {
            const dot = document.querySelector(`.node-dot[title="${id}"]`);
            if (dot) {
                dot.classList.remove('processing');
                dot.classList.add('online');
            }
        });
    },

    // ============================================
    // WORKFLOW MANAGEMENT
    // ============================================
    activateWorkflow(workflowId) {
        document.querySelectorAll('.workflow-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.wf-status')?.remove();
        });
        
        const item = document.querySelector(`[data-workflow="${workflowId}"]`);
        if (item) {
            item.classList.add('active');
            const status = document.createElement('span');
            status.className = 'wf-status active';
            status.textContent = 'ACTIVE';
            item.appendChild(status);
        }
        
        this.logToTerminal(`[WORKFLOW] Activated: ${workflowId.toUpperCase()}`);
        
        // Add workflow message to chat
        const workflowNames = {
            '5min-agency': '5-Minute Agency',
            'senate': 'Algorithmic Senate',
            'morphosis': 'Narrative Morphosis',
            'jit-reality': 'Just-in-Time Reality',
            'autopoiesis': 'Autopoiesis'
        };
        
        this.addChatMessage('system', `Workflow <strong>${workflowNames[workflowId]}</strong> activated. Ready for input.`);
    },

    // ============================================
    // FILE HANDLING
    // ============================================
    handleFileUpload(files) {
        if (!files || !files.length) return;
        
        Array.from(files).forEach(file => {
            const fileData = {
                name: file.name,
                size: file.size,
                type: file.type,
                data: null
            };
            
            // Add to context
            this.state.contextFiles.push(fileData);
            this.renderContextFiles();
            
            this.logToTerminal(`[UPLOAD] Added context: ${file.name}`);
        });
    },

    renderContextFiles() {
        const container = document.getElementById('contextFiles');
        container.innerHTML = this.state.contextFiles.map((file, i) => `
            <div class="context-file" data-index="${i}">
                <span class="file-icon">${this.getFileIcon(file.type)}</span>
                <span class="file-name">${file.name}</span>
                <button class="file-remove" onclick="G5OS.removeContextFile(${i})">×</button>
            </div>
        `).join('');
    },

    getFileIcon(type) {
        if (type.includes('pdf')) return '📄';
        if (type.includes('image')) return '🖼️';
        if (type.includes('video')) return '🎬';
        if (type.includes('audio')) return '🎵';
        if (type.includes('spreadsheet') || type.includes('excel')) return '📊';
        return '📁';
    },

    removeContextFile(index) {
        this.state.contextFiles.splice(index, 1);
        this.renderContextFiles();
    },

    // ============================================
    // FOLDER TOGGLE
    // ============================================
    toggleFolder(folder) {
        folder.classList.toggle('open');
        const toggle = folder.querySelector('.tree-toggle');
        toggle.textContent = folder.classList.contains('open') ? '▼' : '▶';
        
        const children = folder.nextElementSibling;
        if (children?.classList.contains('tree-children')) {
            children.style.display = folder.classList.contains('open') ? 'flex' : 'none';
        }
    },

    // ============================================
    // PANEL RESIZE
    // ============================================
    setupPanelResize() {
        let isResizing = false;
        let currentPanel = null;
        
        document.querySelectorAll('.panel-resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                isResizing = true;
                currentPanel = handle.dataset.panel;
                document.body.style.cursor = 'ew-resize';
                document.body.style.userSelect = 'none';
            });
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            if (currentPanel === 'left') {
                const newWidth = Math.max(180, Math.min(500, e.clientX));
                document.getElementById('leftPanel').style.width = `${newWidth}px`;
            } else if (currentPanel === 'right') {
                const newWidth = Math.max(180, Math.min(500, window.innerWidth - e.clientX));
                document.getElementById('rightPanel').style.width = `${newWidth}px`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isResizing = false;
            currentPanel = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });
    },

    // ============================================
    // VOICE INPUT
    // ============================================
    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window)) {
            this.logToTerminal('[VOICE] Speech recognition not supported', 'error');
            return;
        }
        
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
            document.getElementById('voiceBtn').style.color = 'var(--accent-error)';
            this.logToTerminal('[VOICE] Listening...', 'system');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatInput').value = transcript;
        };
        
        recognition.onend = () => {
            document.getElementById('voiceBtn').style.color = '';
        };
        
        recognition.start();
    },

    // ============================================
    // SYSTEM CLOCK
    // ============================================
    startSystemClock() {
        setInterval(() => {
            const now = new Date();
            // Update metrics periodically
            const tokens = (1.7 + Math.random() * 0.1).toFixed(1);
            const latency = Math.floor(80 + Math.random() * 20);
            
            document.getElementById('tokenCount').textContent = `${tokens}M`;
            document.getElementById('latencyDisplay').textContent = `~${latency}ms`;
        }, 5000);
    },

    // ============================================
    // COMMAND PALETTE
    // ============================================
    togglePalette() {
        const palette = document.getElementById('commandPalette');
        palette.classList.toggle('hidden');
        
        if (!palette.classList.contains('hidden')) {
            document.getElementById('paletteInput').focus();
        }
    },

    closePalette() {
        document.getElementById('commandPalette')?.classList.add('hidden');
        document.getElementById('paletteInput').value = '';
    },

    filterPaletteResults(query) {
        const items = document.querySelectorAll('.palette-item');
        const q = query.toLowerCase();
        
        items.forEach(item => {
            const label = item.querySelector('.item-label')?.textContent.toLowerCase() || '';
            item.style.display = label.includes(q) ? 'flex' : 'none';
        });
    },

    executePaletteAction(item) {
        const action = item.dataset.action;
        
        switch(action) {
            case 'new-chat':
                this.newChat();
                break;
            case 'toggle-terminal':
                this.toggleFooter();
                break;
            case 'open-settings':
                this.openSettings();
                break;
            case 'workflow':
                this.openWorkflowModal(item.dataset.workflow);
                break;
            case 'select-node':
                this.selectNode(item.dataset.node);
                break;
        }
        
        this.closePalette();
    },

    // ============================================
    // SETTINGS MODAL
    // ============================================
    openSettings() {
        document.getElementById('settingsModal')?.classList.remove('hidden');
    },

    closeSettings() {
        document.getElementById('settingsModal')?.classList.add('hidden');
    },

    switchSettingsSection(section) {
        document.querySelectorAll('.settings-nav').forEach(nav => {
            nav.classList.toggle('active', nav.dataset.section === section);
        });
        
        document.querySelectorAll('.settings-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `settings-${section}`);
        });
    },

    async testApiConnection() {
        const statusEl = document.getElementById('connectionStatus');
        const indicator = document.querySelector('.status-indicator');
        
        statusEl.textContent = 'Testing...';
        indicator.className = 'status-indicator pending';
        
        try {
            if (window.G5_API) {
                const result = await G5_API.checkHealth();
                if (result.status === 'healthy') {
                    statusEl.textContent = 'Connected';
                    indicator.className = 'status-indicator connected';
                    this.showToast('success', 'API connection successful');
                } else {
                    throw new Error('Unhealthy');
                }
            } else {
                throw new Error('API not loaded');
            }
        } catch (e) {
            statusEl.textContent = 'Simulation Mode';
            indicator.className = 'status-indicator error';
            this.showToast('warning', 'Running in simulation mode');
        }
    },

    // ============================================
    // WORKFLOW MODAL
    // ============================================
    currentWorkflow: null,

    openWorkflowModal(workflowId) {
        this.currentWorkflow = workflowId;
        
        const workflowNames = {
            '5min-agency': '⚡ 5-Minute Agency',
            'senate': '⚖️ Algorithmic Senate',
            'morphosis': '🔄 Narrative Morphosis',
            'jit-reality': '🔮 Just-in-Time Reality',
            'autopoiesis': '🔧 Autopoiesis'
        };
        
        document.getElementById('workflowModalTitle').textContent = workflowNames[workflowId] || 'Workflow';
        document.getElementById('workflowInput').value = '';
        document.getElementById('workflowProgress')?.classList.add('hidden');
        document.getElementById('workflowOutput')?.classList.add('hidden');
        document.getElementById('workflowModal')?.classList.remove('hidden');
    },

    generateStepLogs(stepName) {
        // Extract Node ID if present (e.g., "SP-01: ...")
        const match = stepName.match(/([A-Z]{2}-\d{2})/);
        const nodeId = match ? match[1] : 'SYSTEM';
        
        const actions = [
            'Allocating vCPU cores...', 'Context window optimized.', 'Querying vector database...',
            'Retrieving specialized knowledge...', 'Handshaking with sub-nodes...', 'Verifying output integrity...'
        ];
        
        // Immediate log
        this.logToTerminal(`[${nodeId}] ${stepName}`);
        
        // CONTEXT AWARENESS: Inject file specific logs
        if (this.state.contextFiles && this.state.contextFiles.length > 0 && Math.random() > 0.6) {
             const file = this.state.contextFiles[Math.floor(Math.random() * this.state.contextFiles.length)];
             setTimeout(() => {
                 this.logToTerminal(`[${nodeId}] Reading context: '${file.name}' (${(file.size/1024).toFixed(1)}KB)`);
             }, 100);
        }
        
        // Random follow-up log after 200ms
        setTimeout(() => {
            const action = actions[Math.floor(Math.random() * actions.length)];
            this.logToTerminal(`[${nodeId}] ${action}`);
        }, 200 + Math.random() * 200);
    },

    closeWorkflowModal() {
        document.getElementById('workflowModal')?.classList.add('hidden');
        this.currentWorkflow = null;
    },

    async executeWorkflow() {
        const input = document.getElementById('workflowInput').value;
        if (!input.trim()) {
            this.showToast('error', 'Please provide a briefing');
            return;
        }
        
        // UI Reset
        document.getElementById('workflowProgress')?.classList.remove('hidden');
        document.getElementById('workflowOutput')?.classList.add('hidden');
        
        // GRID ANIMATION START (Default Base Pulse)
        const grid = document.querySelector('.node-grid');
        grid?.classList.add('pulse-active');
        
        const progressFill = document.getElementById('workflowProgressFill');
        const stepsContainer = document.getElementById('workflowSteps');
        
        // SIMULATE INTELLIGENT CONTEXT ATTACHMENT
        const countSpan = document.getElementById('attachedCount');
        if (countSpan) {
            const fileCount = this.state.contextFiles.length;
            countSpan.textContent = fileCount > 0 ? `⚡ Auto-Context: ${fileCount} Sources` : '⚡ Auto-Context: Zero-Shot';
            countSpan.style.color = 'var(--accent-primary)';
        }

        // DEFINING GRANULAR SIMULATION STEPS
        let simulationSteps = [];
        
        if (this.currentWorkflow === '5min-agency') {
            simulationSteps = [
                { label: 'Initializing Executive Cluster (SN-00)...', cluster: 'strategy' },
                { label: 'Analysing Briefing & Context...', cluster: 'strategy' },
                { label: 'SP-01: Generating Strategic Angles...', cluster: 'strategy' },
                { label: 'CC-01: Drafting Headlines & Copy...', cluster: 'content' },
                { label: 'CC-06: Rendering Visual Concepts...', cluster: 'content' },
                { label: 'MI-01: Verifying Compliance & Safety...', cluster: 'governance' },
                { label: 'Packing Assets for Delivery...', cluster: 'apex' }
            ];
        } else if (this.currentWorkflow === 'senate') {
            simulationSteps = [
                { label: 'Convening Algorithmic Senate...', cluster: 'governance' },
                { label: 'Polling Node Consensus...', cluster: 'governance' },
                { label: 'Debating Policy Constraints...', cluster: 'strategy' },
                { label: 'Applying Ethical Filters (MI-07)...', cluster: 'governance' },
                { label: 'Finalizing Legislative Output...', cluster: 'apex' }
            ];
        } else if (this.currentWorkflow === 'jit-reality') {
            simulationSteps = [
                { label: 'Scanning Global Market Trends...', cluster: 'intel' },
                { label: 'Identifying White Space p(>0.8)...', cluster: 'research' },
                { label: 'Simulating Product Launch Routes...', cluster: 'strategy' },
                { label: 'Calculating ROI Projection...', cluster: 'intel' },
                { label: 'Generating Reality Report...', cluster: 'apex' }
            ];
        } else if (this.currentWorkflow === 'morphosis') {
            simulationSteps = [
                { label: 'Scanning Narrative Field...', cluster: 'research' },
                { label: 'Detecting Cultural Mutations...', cluster: 'research' },
                { label: 'Evolving Content Genotypes...', cluster: 'content' },
                { label: 'Simulating A/B Variants...', cluster: 'intel' },
                { label: 'Morphing Final Output...', cluster: 'content' }
            ];
        } else {
             // Fallback
             simulationSteps = [
                { label: 'Initializing Cluster...', cluster: 'apex' },
                { label: 'Processing...', cluster: 'intel' },
                { label: 'Finalizing...', cluster: 'apex' }
             ];
        }

        // ANIMATE PROGRESS WITH GRANULAR PULSE
        for (let i = 0; i < simulationSteps.length; i++) {
            const step = simulationSteps[i];
            
            // UI Text
            stepsContainer.textContent = step.label;
            const progress = ((i + 1) / simulationSteps.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            // CLUSTER PULSE LOGIC
            // Remove all specific pulses first
            grid.classList.remove('pulse-strategy', 'pulse-content', 'pulse-research', 'pulse-governance', 'pulse-intel');
            // Add specific pulse if defined
            if (step.cluster && step.cluster !== 'apex') {
                grid.classList.add(`pulse-${step.cluster}`);
            }
            
            // TERMINAL SYNC
            this.generateStepLogs(step.label);
            
            // Randomish delay for realism (varied by specific step type could be cool, but random is fine)
            await this.delay(800 + Math.random() * 600);
        }
        
        // CLEANUP PULSE
        grid.classList.remove('pulse-active', 'pulse-strategy', 'pulse-content', 'pulse-research', 'pulse-governance', 'pulse-intel');
        
        // GENERATE FAKE ASSETS & OUTPUT
        this.generateSimulationResult(this.currentWorkflow, input);
        
        // Show Output UI
        document.getElementById('workflowOutput')?.classList.remove('hidden');
        this.showToast('success', `${this.currentWorkflow} completed`);
        this.logToTerminal(`[WORKFLOW] ${this.currentWorkflow} execution successful`);
    },

    generateSimulationResult(workflowId, input) {
        const outputContainer = document.getElementById('workflowOutputContent');
        let html = '';
        
        if (workflowId === '5min-agency') {
            html = `
                <div class="simulation-result">
                    <div class="sim-header">
                        <span class="sim-status success">✅ EXECUTION SUCCESSFUL</span>
                        <span class="sim-meta">6 Assets Created | 5 Nodes Active</span>
                    </div>
                    <div class="sim-section">
                        <h4>STRATEGIC ANGLE: "THE INVISIBLE LEVERAGE"</h4>
                        <p>Focus on the hidden efficiency gains. Positioning the product not as a tool, but as a competitive secret weapon.</p>
                    </div>
                    <div class="sim-assets-list">
                        ${this.createSimulatedAsset('Strategy_Brief_v4.pdf', 'pdf')}
                        ${this.createSimulatedAsset('Campaign_Teaser_Final.mp4', 'video')}
                        ${this.createSimulatedAsset('Hero_Image_Concept_A.jpg', 'image')}
                        ${this.createSimulatedAsset('Social_Media_Plan.md', 'code')}
                        ${this.createSimulatedAsset('Podcast_Spot_Intro.mp3', 'audio')}
                        ${this.createSimulatedAsset('Audience_Data.csv', 'sheet')}
                    </div>
                    <div class="sim-footer">
                        <p class="sim-note">All assets passed compliance (MI-01). Ready for deployment.</p>
                    </div>
                </div>
            `;
            // Add to main grid as well
            this.addAssetToGrid({ name: 'Strategy_Brief_v4.pdf', size: 1024 * 450, type: 'application/pdf' });
            this.addAssetToGrid({ name: 'Campaign_Teaser_Final.mp4', size: 1024 * 15000, type: 'video/mp4' });
            this.addAssetToGrid({ name: 'Podcast_Spot_Intro.mp3', size: 1024 * 3200, type: 'audio/mpeg' });
        } else {
             html = `
                <div class="simulation-result">
                    <h4>✅ PROCESSING COMPLETE</h4>
                    <p>Workflow '${workflowId}' executed successfully based on input: "${input.substring(0,20)}..."</p>
                    <p>Results have been indexed in the Asset Vault.</p>
                </div>
            `;
        }
        
        outputContainer.innerHTML = html;
        
        // GRID ANIMATION STOP
        document.querySelector('.node-grid')?.classList.remove('pulse-active');

        // WORKFLOW MEMORY: Store result for Chat Context
        this.state.lastWorkflowResult = {
            id: workflowId,
            input: input,
            timestamp: Date.now()
        };
    },

    createSimulatedAsset(name, type) {
        const icons = { pdf: '📄', text: '📝', image: '🖼️', code: '💻', video: '🎬', audio: '🎵', sheet: '📊' };
        // Escape quotes safely
        const safeName = name.replace(/'/g, "\\'");
        return `
            <div class="sim-asset-item">
                <span class="sim-asset-icon">${icons[type] || '📄'}</span>
                <span class="sim-asset-name">${name}</span>
                <button class="sim-asset-action" onclick="G5OS.previewAsset('${type}', '${safeName}')">OPEN</button>
            </div>
        `;
    },

    // ============================================
    // ASSET PREVIEW
    // ============================================
    previewAsset(type, name) {
        document.getElementById('assetPreviewTitle').textContent = `📄 ${name}`;
        const content = document.getElementById('assetPreviewContent');
        const saveBtn = document.getElementById('saveAsset');
        
        // Store state for actions
        this.currentPreviewAsset = { type, name, content: '' };
        
        // SCANLINE OVERLAY (System Vitality)
        const scanline = `<div class="scanline-overlay"><div class="scanline-bar"></div></div>`;
        
        // FAKE CONTENT GENERATION
        let viewHtml = '';
        let isEditable = false;
        
        if (type.includes('image') || name.endsWith('.jpg') || name.endsWith('.png')) {
            viewHtml = `
                <div class="preview-image-container" style="display:flex;justify-content:center;align-items:center;height:400px;background:#111;">
                    <img src="https://placehold.co/600x400/1a1a1a/4ade80?text=${encodeURIComponent(name)}" style="max-width:100%;border-radius:8px;box-shadow:0 0 20px rgba(74, 222, 128, 0.2);">
                </div>`;
        } 
        else if (type.includes('video') || name.endsWith('.mp4')) {
            viewHtml = `
                <div class="preview-video-container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:400px;background:#000;">
                    <div style="font-size:3rem;margin-bottom:20px;">🎬</div>
                    <div style="color:white;margin-bottom:10px;">PREVIEW: ${name}</div>
                    <div style="width:80%;height:4px;background:#333;border-radius:2px;overflow:hidden;">
                        <div style="width:45%;height:100%;background:var(--accent-primary);"></div>
                    </div>
                    <div style="margin-top:10px;font-family:monospace;color:#666;">00:12 / 00:30</div>
                </div>`;
        }
        else if (type.includes('audio') || name.endsWith('.mp3')) {
            viewHtml = `
                <div class="preview-audio-container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:200px;background:#111;border:1px solid #333;border-radius:8px;">
                    <div style="font-size:2rem;margin-bottom:10px;">🎵</div>
                    <div style="color:var(--text-primary);margin-bottom:20px;">${name}</div>
                    <div style="display:flex;gap:4px;align-items:center;">
                        ${Array(20).fill(0).map(() => `<div style="width:4px;height:${10 + Math.random() * 30}px;background:var(--accent-primary);"></div>`).join('')}
                    </div>
                </div>`;
        }
        else if (type.includes('sheet') || name.endsWith('.csv')) {
            viewHtml = `
                <div class="preview-table-container" style="height:400px;overflow:auto;background:#111;padding:20px;">
                    <table style="width:100%;border-collapse:collapse;color:#ddd;font-family:monospace;">
                        <tr style="border-bottom:1px solid #333;text-align:left;"><th style="padding:8px;">Metric</th><th style="padding:8px;">Current</th><th style="padding:8px;">Projected</th><th style="padding:8px;">Growth</th></tr>
                        <tr style="border-bottom:1px solid #222;"><td style="padding:8px;">Impressions</td><td style="padding:8px;">12,500</td><td style="padding:8px;">45,000</td><td style="padding:8px;color:#4ade80;">+260%</td></tr>
                        <tr style="border-bottom:1px solid #222;"><td style="padding:8px;">Engagement</td><td style="padding:8px;">1.2%</td><td style="padding:8px;">3.8%</td><td style="padding:8px;color:#4ade80;">+216%</td></tr>
                        <tr style="border-bottom:1px solid #222;"><td style="padding:8px;">Leads</td><td style="padding:8px;">45</td><td style="padding:8px;">120</td><td style="padding:8px;color:#4ade80;">+166%</td></tr>
                    </table>
                </div>`;
        }
        else if (type.includes('pdf') || name.endsWith('.pdf')) {
            viewHtml = `
                <div class="preview-pdf-mock" style="height:500px;background:#1e1e1e;padding:40px;overflow-y:auto;font-family:serif;color:#ddd;">
                    <h1 style="color:var(--text-primary);border-bottom:1px solid #333;padding-bottom:10px;">STRATEGIC BRIEFING DOCUMENT</h1>
                    <p style="margin-top:20px;line-height:1.6;"><strong>PROJECT:</strong> ${name.replace('.pdf', '').toUpperCase()}</p>
                    <p><strong>DATE:</strong> 2026-01-28</p>
                    <p><strong>SECURITY LEVEL:</strong> CONFIDENTIAL / EYES ONLY</p>
                    <hr style="border-color:#333;margin:20px 0;">
                    <h3>1. EXECUTIVE SUMMARY</h3>
                    <p>The autonomous marketing landscape requires a fundamental shift in how we perceive brand leverage. By utilizing Agenticum G5, we transition from reactive to predictive engagement models.</p>
                    <h3>2. KEY OBJECTIVES</h3>
                    <ul>
                        <li>Dominate share of voice in AI-native communities.</li>
                        <li>Reduce customer acquisition cost (CAC) by 45%.</li>
                        <li>Establish thought leadership via 52-node content mesh.</li>
                    </ul>
                    <p style="margin-top:40px;opacity:0.5;text-align:center;">- END OF PAGE 1 -</p>
                </div>`;
        }
        else if (type.includes('text') || type.includes('code') || name.endsWith('.txt') || name.endsWith('.md')) {
            isEditable = true;
            const textContent = `/* ${name} - Generated by CC-01 */\n\n` +
            `# CAMPAIGN HEADLINES\n\n` +
            `1. "Don't hire an agency. License a civilization."\n` +
            `2. "Your new marketing team runs on silicon. And it never sleeps."\n` +
            `3. "Agenticum G5: The last growth hack you will ever need."\n\n` +
            `# SOCIAL COPY (Twitter/X)\n\n` +
            `The old way: Briefing -> Waiting 2 weeks -> Revisions.\n` +
            `The G5 way: Intent -> 5 mins -> Execution. 🚀\n` +
            `#AI #Marketing #Automation`;
            
            this.currentPreviewAsset.content = textContent; // Store initial content
            
            viewHtml = `
                <textarea id="assetEditor" class="preview-code-editor" style="width:100%;height:450px;background:#111;padding:20px;font-family:'JetBrains Mono', monospace;color:#a5d6ff;border:none;resize:none;outline:none;font-size:14px;line-height:1.6;">${textContent}</textarea>`;
        }
        else {
             viewHtml = `<div style="padding:40px;text-align:center;color:#666;">Preview not available for this file type.<br>(${type})</div>`;
        }
        
        content.innerHTML = viewHtml + scanline;
        
        // Show/Hide Save Button
        if (isEditable) {
            saveBtn?.classList.remove('hidden');
        } else {
            saveBtn?.classList.add('hidden');
        }
        
        document.getElementById('assetPreviewModal')?.classList.remove('hidden');
    },

    savePreviewChanges() {
        const editor = document.getElementById('assetEditor');
        if (editor) {
            this.currentPreviewAsset.content = editor.value;
            this.showToast('success', 'Changes saved successfully to local cache');
            this.logToTerminal(`[ASSET] Saved changes to ${this.currentPreviewAsset.name}`);
        }
    },

    async downloadPreviewAsset() {
        if (!this.currentPreviewAsset) return;
        
        const name = this.currentPreviewAsset.name;
        
        // PDF HANDLING - Generate Real PDF
        if (this.currentPreviewAsset.type.includes('pdf') || name.endsWith('.pdf')) {
            try {
                if (!window.jspdf) {
                    throw new Error('jsPDF library not loaded');
                }
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Styling
                doc.setFillColor(20, 20, 20); // Dark background simulation (optional, standard PDF is white mostly)
                // Actually keep it standard white for printability
                
                doc.setFont("helvetica", "bold");
                doc.setFontSize(22);
                doc.setTextColor(40, 40, 40);
                doc.text("STRATEGIC BRIEFING DOCUMENT", 20, 25);
                
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text(`GENERATED BY AGENTICUM G5 | ${new Date().toISOString()}`, 20, 32);
                
                doc.setDrawColor(200, 200, 200);
                doc.line(20, 35, 190, 35);
                
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                
                doc.text(`PROJECT: ${name.replace('.pdf', '').toUpperCase()}`, 20, 50);
                doc.text("SECURITY LEVEL: CONFIDENTIAL / EYES ONLY", 20, 58);
                
                doc.setFont("helvetica", "bold");
                doc.text("1. EXECUTIVE SUMMARY", 20, 80);
                doc.setFont("helvetica", "normal");
                const summaryText = "The autonomous marketing landscape requires a fundamental shift in how we perceive brand leverage. By utilizing Agenticum G5, we transition from reactive to predictive engagement models. This document outlines the core strategic pillars determined by the S-Cluster (Strategy Node Mesh).";
                const splitSummary = doc.splitTextToSize(summaryText, 170);
                doc.text(splitSummary, 20, 90);
                
                doc.setFont("helvetica", "bold");
                doc.text("2. KEY OBJECTIVES", 20, 130);
                doc.setFont("helvetica", "normal");
                doc.text("• Dominate share of voice in AI-native communities.", 25, 140);
                doc.text("• Reduce customer acquisition cost (CAC) by 45%.", 25, 148);
                doc.text("• Establish thought leadership via 52-node content mesh.", 25, 156);
                
                doc.save(name);
                this.showToast('success', `Generated & Downloaded ${name}`);
            } catch (e) {
                console.error("PDF Generation Error:", e);
                this.showToast('error', 'Error generating PDF. Please check console.');
            }
            return;
        }

        // IMAGE HANDLING
        if (this.currentPreviewAsset.type.includes('image') || name.endsWith('.jpg') || name.endsWith('.png')) {
             try {
                this.showToast('info', 'Downloading image...');
                // Fetch the placeholder image as blob
                const response = await fetch(`https://placehold.co/600x400/1a1a1a/4ade80?text=${encodeURIComponent(name)}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                this.showToast('success', `Downloaded ${name}`);
             } catch (e) {
                 window.open(`https://placehold.co/600x400/1a1a1a/4ade80?text=${encodeURIComponent(name)}`, '_blank');
             }
             return;
        }
        
        // VIDEO/AUDIO HANDLING (Simulated)
        if (this.currentPreviewAsset.type.includes('video') || this.currentPreviewAsset.type.includes('audio') || name.endsWith('.mp4') || name.endsWith('.mp3')) {
            const extension = name.split('.').pop();
            const dummyContent = `[SIMULATED ${extension.toUpperCase()} FILE CONTENT]\n\nThis file was generated by the Agenticum G5 Simulation Engine.\n\nAsset: ${name}\nDate: ${new Date().toISOString()}`;
            const blob = new Blob([dummyContent], { type: 'text/plain' }); // Download as text-masked-as-media for demo safety
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name + '.txt'; // Append .txt so user can read it and knows its a simulation
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.showToast('success', `Downloaded simulation asset: ${name}`);
            return;
        }

        // TEXT/CODE/CSV HANDLING
        let content = this.currentPreviewAsset.content || '';
        const editor = document.getElementById('assetEditor');
        
        // Construct CSV content if needed
        if (this.currentPreviewAsset.type.includes('sheet') || name.endsWith('.csv')) {
            content = "Metric,Current,Projected,Growth\nImpressions,12500,45000,260%\nEngagement,1.2%,3.8%,216%\nLeads,45,120,166%";
        }
        else if (editor) {
            content = editor.value;
        } else if (!content) {
             content = "Simulation Content for " + name;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('success', `Downloaded ${name}`);
    },

    copyPreviewContent() {
        let content = '';
        const editor = document.getElementById('assetEditor');
        
        if (editor) {
            content = editor.value;
            editor.select();
            document.execCommand('copy');
        } else {
            // Try to grab text from PDF/HTML view
            content = document.getElementById('assetPreviewContent').innerText;
            navigator.clipboard.writeText(content);
        }
        
        this.showToast('success', 'Copied to clipboard');
    },

    closeAssetPreview() {
        document.getElementById('assetPreviewModal')?.classList.add('hidden');
    },

    // ============================================
    // PANEL TOGGLES
    // ============================================
    toggleLeftPanel() {
        document.getElementById('leftPanel')?.classList.toggle('collapsed');
    },

    toggleRightPanel() {
        document.getElementById('rightPanel')?.classList.toggle('collapsed');
    },

    // ============================================
    // NEW CHAT
    // ============================================
    newChat() {
        const container = document.getElementById('chatMessages');
        container.innerHTML = `
            <div class="chat-message system">
                <div class="msg-header">
                    <span class="msg-icon">◆</span>
                    <span class="msg-sender">AGENTICUM G5</span>
                    <span class="msg-time">SYSTEM</span>
                </div>
                <div class="msg-content">
                    <p>New conversation started. <strong>52 nodes</strong> are online and ready.</p>
                </div>
            </div>
        `;
        this.state.chatHistory = [];
        document.getElementById('chatInput')?.focus();
        this.showToast('success', 'New chat started');
    },

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    showToast(type, message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;
        
        toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
        container.appendChild(toast);
        
        // Auto remove after 4s
        setTimeout(() => toast.remove(), 4000);
    },

    // ============================================
    // CONTEXT FILE HANDLING
    // ============================================
    handleContextFileUpload(files) {
        if (!files || !files.length) return;
        
        Array.from(files).forEach(file => {
            const fileData = {
                name: file.name,
                size: file.size,
                type: file.type
            };
            
            this.state.contextFiles.push(fileData);
            this.showToast('success', `Added context: ${file.name}`);
        });
        
        this.renderContextFiles();
        this.logToTerminal(`[CONTEXT] Added ${files.length} file(s)`);
    },

    // ============================================
    // LOADING OVERLAY
    // ============================================
    showLoading(text = 'Processing...') {
        document.getElementById('loadingText').textContent = text;
        document.getElementById('loadingOverlay')?.classList.remove('hidden');
    },

    hideLoading() {
        document.getElementById('loadingOverlay')?.classList.add('hidden');
    },

    // ============================================
    // ASSET FILTERING
    // ============================================
    filterAssets(type) {
        // Update active tab
        document.querySelectorAll('.preview-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === type);
        });
        
        // Filter cards
        document.querySelectorAll('.asset-card:not(.upload-zone)').forEach(card => {
            if (type === 'all') {
                card.style.display = '';
            } else {
                card.style.display = card.dataset.type === type ? '' : 'none';
            }
        });
        
        this.logToTerminal(`[ASSETS] Filtered by: ${type.toUpperCase()}`);
    },

    // ============================================
    // AGENT FILTERING
    // ============================================
    filterAgentsByCluster(cluster) {
        document.querySelectorAll('.agent-tile').forEach(tile => {
            if (cluster === 'all') {
                tile.style.display = '';
            } else {
                const tileCluster = tile.querySelector('.tile-cluster')?.textContent;
                tile.style.display = tileCluster === cluster ? '' : 'none';
            }
        });
        this.logToTerminal(`[AGENTS] Filtered by cluster: ${cluster}`);
    },

    filterAgentsByStatus(status) {
        document.querySelectorAll('.agent-tile').forEach(tile => {
            if (status === 'all') {
                tile.style.display = '';
            } else {
                const tileStatus = tile.querySelector('.tile-status');
                const hasStatus = tileStatus?.classList.contains(status);
                tile.style.display = hasStatus ? '' : 'none';
            }
        });
        this.logToTerminal(`[AGENTS] Filtered by status: ${status}`);
    },

    // ============================================
    // ENHANCED FILE UPLOAD (adds to assets grid)
    // ============================================
    addAssetToGrid(file) {
        const grid = document.getElementById('assetsGrid');
        const uploadZone = document.getElementById('uploadZone');
        
        const typeMap = {
            'image': ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            'video': ['video/mp4', 'video/webm'],
            'audio': ['audio/mp3', 'audio/wav', 'audio/mpeg'],
            'text': ['text/plain', 'text/markdown', 'application/pdf', 'application/json']
        };
        
        let assetType = 'text';
        for (const [type, mimes] of Object.entries(typeMap)) {
            if (mimes.some(m => file.type.includes(m.split('/')[1]))) {
                assetType = type;
                break;
            }
        }
        
        const card = document.createElement('div');
        card.className = 'asset-card';
        card.dataset.type = assetType;
        card.dataset.id = `asset-${Date.now()}`;
        card.innerHTML = `
            <div class="asset-thumbnail ${assetType}">${this.getFileIcon(file.type)}</div>
            <div class="asset-info">
                <span class="asset-title">${file.name}</span>
                <span class="asset-meta">${this.formatFileSize(file.size)} • Just now</span>
            </div>
            <div class="asset-actions">
                <button class="asset-action" title="Preview">👁️</button>
                <button class="asset-action" title="Download">⬇️</button>
                <button class="asset-action" title="Delete">🗑️</button>
            </div>
        `;
        
        // Insert before upload zone
        grid.insertBefore(card, uploadZone);
        
        // Add click listener
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.asset-action')) {
                this.previewAsset(assetType, file.name);
            }
        });
    },

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    },

    // ============================================
    // EXPORT CHAT
    // ============================================
    exportChat() {
        const messages = this.state.chatHistory.map(m => {
            const time = new Date(m.time).toLocaleTimeString();
            return `[${time}] ${m.type.toUpperCase()}: ${m.content}`;
        }).join('\n\n');
        
        const blob = new Blob([messages], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `g5-chat-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('success', 'Chat exported');
    },

    // ============================================
    // CONTEXT MENU
    // ============================================
    setupContextMenu() {
        const menu = document.getElementById('contextMenu');
        
        // Show context menu on right-click in chat area
        document.getElementById('chatView')?.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });
        
        // Hide on click elsewhere
        document.addEventListener('click', () => this.hideContextMenu());
        
        // Handle menu item clicks
        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                this.executeContextAction(item.dataset.action);
                this.hideContextMenu();
            });
        });
    },

    showContextMenu(x, y) {
        const menu = document.getElementById('contextMenu');
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.classList.remove('hidden');
    },

    hideContextMenu() {
        document.getElementById('contextMenu')?.classList.add('hidden');
    },

    executeContextAction(action) {
        switch(action) {
            case 'copy':
                document.execCommand('copy');
                this.showToast('success', 'Copied to clipboard');
                break;
            case 'paste':
                navigator.clipboard.readText().then(text => {
                    document.getElementById('chatInput').value += text;
                });
                break;
            case 'select-all':
                document.getElementById('chatMessages')?.focus();
                document.execCommand('selectAll');
                break;
            case 'export':
                this.exportChat();
                break;
            case 'new-chat':
                this.newChat();
                break;
            case 'clear':
                this.clearChatHistory();
                break;
        }
    },

    clearChatHistory() {
        this.newChat();
        this.showToast('success', 'Chat history cleared');
        this.logToTerminal('[SYSTEM] Chat history cleared');
    },

    // ============================================
    // ACTIVITY INDICATOR
    // ============================================
    showActivity(text = 'Processing...') {
        document.getElementById('activityText').textContent = text;
        document.getElementById('activityIndicator')?.classList.remove('hidden');
    },

    hideActivity() {
        document.getElementById('activityIndicator')?.classList.add('hidden');
    },

    // ============================================
    // WORKFLOW SELECTION
    // ============================================
    selectWorkflowCard(card) {
        document.querySelectorAll('.workflow-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const workflowId = card.dataset.workflow;
        this.state.selectedWorkflow = workflowId;
        this.logToTerminal(`[WORKFLOW] Selected: ${workflowId}`);
    },

    // ============================================
    // ENHANCED VIEW SWITCHING
    // ============================================
    switchToWorkflowsView() {
        this.switchWorkspaceTab('workflows');
        document.querySelectorAll('.os-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === 'workflows');
        });
    },

    // ============================================
    // ENHANCED TERMINAL COMMANDS
    // ============================================
    terminalCommands: {
        help: 'Show available commands',
        clear: 'Clear terminal',
        status: 'Show system status',
        nodes: 'List all nodes',
        workflows: 'List workflows',
        chat: 'Switch to chat view',
        agents: 'Switch to agents view',
        assets: 'Switch to assets view',
        export: 'Export chat history',
        version: 'Show OS version'
    },

    processTerminalInput(input) {
        const [cmd, ...args] = input.toLowerCase().split(' ');
        
        switch(cmd) {
            case 'help':
                let helpText = 'AVAILABLE COMMANDS:\n';
                for (const [command, desc] of Object.entries(this.terminalCommands)) {
                    helpText += `  ${command.padEnd(12)} - ${desc}\n`;
                }
                this.logToTerminal(helpText);
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'status':
                this.logToTerminal(`[STATUS] 52 nodes online | ${this.state.chatHistory.length} messages | ${this.state.assets.length} assets`);
                break;
            case 'nodes':
                this.logToTerminal('[NODES] SN-00 (Apex), SP-01..SP-99 (Strategy), RA-01..RA-52 (Research), CC-01..CC-32 (Content), MI-01..MI-05 (Governance), DT-01..DT-06 (Intel)');
                break;
            case 'workflows':
                this.logToTerminal('[WORKFLOWS] 5min-agency, senate, morphosis, jit-reality, autopoiesis');
                break;
            case 'chat':
                this.switchWorkspaceTab('chat');
                this.logToTerminal('[UI] Switched to Chat view');
                break;
            case 'agents':
                this.switchWorkspaceTab('agents');
                this.logToTerminal('[UI] Switched to Agents view');
                break;
            case 'assets':
                this.switchWorkspaceTab('preview');
                this.logToTerminal('[UI] Switched to Assets view');
                break;
            case 'export':
                this.exportChat();
                break;
            case 'version':
                this.logToTerminal('[VERSION] AGENTICUM G5 OS v5.0.4 | Build 2026.01.28');
                break;
            default:
                this.logToTerminal(`[ERROR] Unknown command: ${cmd}. Type 'help' for available commands.`);
        }
    },

    // ============================================
    // UTILITY
    // ============================================
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ============================================
    // CONTEXTUAL CHAT
    // ============================================
    startAgentChat(nodeId) {
        // Switch to chat view
        this.switchWorkspaceTab('chat');
        
        // Reset chat
        if (this.newChat) {
             this.newChat(); 
        } else {
             const chatHistory = document.getElementById('chatHistory');
             if (chatHistory) chatHistory.innerHTML = '';
             this.state.chatHistory = [];
        }
        
        // Seed chat
        let greeting = `[SECURE CHANNEL ESTABLISHED]\nIdentity Verified: ${nodeId}\nStatus: ONLINE`;
        
        // CHECK WORKFLOW MEMORY
        if (this.state.lastWorkflowResult && (Date.now() - this.state.lastWorkflowResult.timestamp < 300000)) {
            // If workflow ran in last 5 mins
            const wf = this.state.lastWorkflowResult;
            greeting += `\n\n[CONTEXT] I have analyzed the output from the '${wf.id}' workflow.\nInput: "${wf.input}"\n\nReady to refine assets or adjust strategy.`;
        } else {
            greeting += `\n\nAwaiting directive...`;
        }
        
        // Add greeting message
        setTimeout(() => {
            this.addChatMessage('system', greeting);
            this.showToast('info', `Channel open to ${nodeId}`);
        }, 800);
        
        // Focus input
        setTimeout(() => document.getElementById('chatInput')?.focus(), 900);
    }
};

// ============================================
// CSS FOR THINKING INDICATOR
// ============================================
const thinkingStyle = document.createElement('style');
thinkingStyle.textContent = `
    .thinking-indicator {
        display: flex;
        gap: 6px;
        padding: 8px 0;
    }
    .thinking-dot {
        width: 8px;
        height: 8px;
        background: var(--accent-primary);
        border-radius: 50%;
        animation: thinkBounce 1.4s infinite ease-in-out both;
    }
    .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
    .thinking-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes thinkBounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
    .generated-content {
        background: var(--bg-elevated);
        border-left: 3px solid var(--accent-primary);
        padding: 12px;
        margin: 12px 0;
        border-radius: 0 6px 6px 0;
    }
    .generated-content p {
        margin-bottom: 8px;
        font-family: var(--font-primary);
    }
`;
document.head.appendChild(thinkingStyle);

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    G5OS.init();
});

// Export globally
window.G5OS = G5OS;
