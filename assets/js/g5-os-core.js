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
        
        console.log('✅ G5 OS READY | 52 NODES ONLINE');
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

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
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
            'agents': 'agentsView'
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
        const line = document.createElement('div');
        line.className = `term-line ${type}`;
        line.textContent = message;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
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
        
        // Update UI
        document.querySelector('.agent-name').textContent = `${nodeId} ${node.name}`;
        document.querySelector('.agent-role').textContent = node.cluster;
        document.getElementById('agentBriefing').value = this.state.activeAgent.briefing;
        
        this.logToTerminal(`[NODE] Selected ${nodeId} ${node.name}`);
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

    closeWorkflowModal() {
        document.getElementById('workflowModal')?.classList.add('hidden');
        this.currentWorkflow = null;
    },

    async executeWorkflow() {
        const input = document.getElementById('workflowInput').value;
        if (!input.trim()) {
            this.showToast('error', 'Please provide a briefing for the workflow');
            return;
        }
        
        document.getElementById('workflowProgress')?.classList.remove('hidden');
        const progressFill = document.getElementById('workflowProgressFill');
        const stepsContainer = document.getElementById('workflowSteps');
        
        const steps = ['Initializing...', 'Activating nodes...', 'Processing...', 'Finalizing...'];
        
        for (let i = 0; i < steps.length; i++) {
            stepsContainer.textContent = steps[i];
            progressFill.style.width = `${(i + 1) * 25}%`;
            await this.delay(800);
        }
        
        // Show output
        document.getElementById('workflowOutput')?.classList.remove('hidden');
        document.getElementById('workflowOutputContent').innerHTML = `
            <p><strong>Workflow Complete!</strong></p>
            <p>Input processed through ${this.currentWorkflow} pipeline.</p>
            <p>Results have been added to your assets.</p>
        `;
        
        this.showToast('success', `${this.currentWorkflow} workflow completed`);
        this.logToTerminal(`[WORKFLOW] ${this.currentWorkflow} completed successfully`);
    },

    // ============================================
    // ASSET PREVIEW
    // ============================================
    previewAsset(type, name) {
        document.getElementById('assetPreviewTitle').textContent = `📄 ${name}`;
        
        const content = document.getElementById('assetPreviewContent');
        content.innerHTML = `<p>Loading ${name}...</p><p>Asset type: ${type}</p>`;
        
        document.getElementById('assetPreviewModal')?.classList.remove('hidden');
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
    // UTILITY
    // ============================================
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
