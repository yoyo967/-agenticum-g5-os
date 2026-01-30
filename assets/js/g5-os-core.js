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
        },
        foundry: {
            imgAspectRatio: '9:16',
            imgSafety: 'BLOCK_MED_AND_ABOVE',
            imgStyle: '',
            veoFps: '30',
            veoDuration: '6',
            ttsVoice: 'en-US-Journey-F',
            ttsSpeed: 1.0,
            ttsAutoPlay: true
        }
    },

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        console.log('⬡ AGENTICUM G5 OS | INITIALIZING...');
        
        // EXPOSE FOR TERMINAL
        window.g5Instance = this;
        
        this.setupEventListeners();
        this.setupPanelResize();
        this.startSystemClock();
        this.loadNodes();
        this.initNeuralMesh();
        this.initAudio();
        this.setupPlaygroundListeners();
        this.renderExtensions();
        this.setupMatrixListeners();
        this.setupDockDragAndDrop();
        
        // Start Boot Sequence
        this.runBootSequence();

        // One-Click Demo Check
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'launch') {
            setTimeout(() => {
                this.runAutoDemo("Initiate Campaign Genesis for NEURA-FIZZ");
            }, 2500); 
        }

        this.loadState();
        this.initEliteBackground();
        console.log('✅ G5 OS READY | 52 NODES ONLINE');
    },

    initEliteBackground() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#60a5fa';
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.1)';

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();
    },

    triggerGlitch(duration = 500) {
        document.body.classList.add('glitch-active');
        setTimeout(() => {
            document.body.classList.remove('glitch-active');
        }, duration);
    },

    async runAutoDemo(commandText) {
        const input = document.getElementById('chatInput');
        if (!input) return;

        // Type Effect
        input.focus();
        for (let i = 0; i < commandText.length; i++) {
            input.value += commandText[i];
            await new Promise(r => setTimeout(r, 50)); // Typing speed
        }
        
        await new Promise(r => setTimeout(r, 300)); // Hesitation for realism
        this.sendMessage();
    },

    runBootSequence() {
        const terminal = document.getElementById('boot-terminal');
        const btn = document.getElementById('boot-btn');
        if (!terminal) return;
        
        const lines = [
            'LOADING KERNEL MODULES...',
            'MOUNTING G5 HYPERVISOR...',
            'CONNECTING TO 52-NODE CLUSTER...',
            'VERIFYING SECURITY TOKENS...',
            'SYSTEM READY. WAITING FOR AUTHORIZATION...'
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i >= lines.length) {
                clearInterval(interval);
                if (btn) {
                    btn.classList.remove('hidden');
                    btn.style.display = 'block'; 
                    btn.style.opacity = '0';
                    btn.style.transform = 'translateY(20px)';
                    btn.style.transition = 'opacity 1s, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    setTimeout(() => {
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                    }, 100);
                }
                return;
            }
            
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.textContent = `> ${lines[i]}`;
            
            terminal.appendChild(line);
            
            requestAnimationFrame(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            });

            terminal.scrollTop = terminal.scrollHeight;
            i++;
        }, 150); 
    },

    unlockSystem() {
        console.log('[SYSTEM] UNLOCK SEQUENCE INITIATED');
        const overlay = document.getElementById('boot-overlay');
        const btn = document.getElementById('boot-btn');
        
        // 1. Audio & Glitch
        if (window.G5Audio) {
            window.G5Audio.playBoot();
        }
        this.triggerGlitch(1000);

        // 2. Visual Button Feedback
        if(btn) {
            btn.innerHTML = "<span style='position:relative; z-index:2; color:#000; letter-spacing: 5px;'>ACCESS GRANTED</span>";
            btn.style.boxShadow = "0 0 50px #4ade80";
            btn.style.background = "#4ade80";
            btn.style.color = "#000";
            btn.style.transform = "scale(1.1)";
            btn.style.blur = "filter(blur(10px))";
        }

        // 3. Cinematic Exit
        setTimeout(() => {
            if (overlay) {
                overlay.style.transition = "all 1.5s cubic-bezier(0.19, 1, 0.22, 1)";
                overlay.style.opacity = "0";
                overlay.style.transform = "scale(1.5)";
                overlay.style.filter = "blur(100px)";
                
                setTimeout(() => {
                    overlay.style.display = 'none';
                    overlay.remove(); // Cleanup
                    this.logToTerminal('SYSTEM UNLOCKED. WELCOME OPERATOR.', 'system');
                    this.triggerGlitch(300);
                }, 1500);
            }
        }, 800);
    },

    toggle3DView() {
        const agentsView = document.getElementById('agentsView');
        const btn = document.getElementById('toggle3dBtn');
        if (!agentsView) return;

        const is3D = agentsView.classList.toggle('agents-view-3d');
        
        if (btn) {
            btn.innerHTML = is3D ? '<span class="btn-glow"></span>👁️ 2D VIEW' : '<span class="btn-glow"></span>👁️ 3D VIEW';
        }

        this.triggerGlitch(400);
        this.logToTerminal(`[UI] TETHERING NEURAL FABRIC TO ${is3D ? '3D' : '2D'} SPACE`, 'node');
    },

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // GLOBAL HOVER SOUND
        document.body.addEventListener('mouseover', (e) => {
             if (e.target.closest('button, .agent-tile, .os-tab, .workspace-tab, .nav-item, .workflow-card, .tree-item, .asset-card')) {
                 this.playSound('hover');
             }
        });

        // Header tabs
        document.querySelectorAll('.os-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchView(tab.dataset.view);
                this.playSound('click');
            });
        });

        // Workspace tabs
        document.querySelectorAll('.workspace-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchWorkspaceTab(tab.dataset.tab);
                this.playSound('click');
            });
        });

        // Footer tabs
        document.querySelectorAll('.footer-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchFooterTab(tab.dataset.panel);
                this.playSound('click');
            });
        });

        // Toggle footer
        document.getElementById('togglePanelBtn')?.addEventListener('click', () => {
            this.toggleFooter();
            this.playSound('click');
        });

        // Clear terminal
        document.getElementById('clearTerminalBtn')?.addEventListener('click', () => {
            this.clearTerminal();
            this.playSound('click');
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
        
        // ============================
        // LAYOUT CONTROLS (ANTIGRAVITY)
        // ============================
        const sidebarSlider = document.getElementById('layoutSidebar');
        if (sidebarSlider) {
            sidebarSlider.addEventListener('input', (e) => {
                 const val = e.target.value;
                 document.getElementById('valSidebar').textContent = `${val}px`;
                 document.documentElement.style.setProperty('--panel-left-width', `${val}px`);
                 
                 // Trigger resize for canvas
                 if(this.resizeNeuralMesh) this.resizeNeuralMesh();
            });
        }

        const terminalSlider = document.getElementById('layoutTerminal');
        if (terminalSlider) {
             terminalSlider.addEventListener('input', (e) => {
                 const val = e.target.value;
                 document.getElementById('valTerminal').textContent = `${val}px`;
                 document.documentElement.style.setProperty('--footer-height', `${val}px`);
             });
        }

        // ============================
        // MEDIA FOUNDRY LISTENERS
        // ============================
        const foundryInputs = [
            'imgAspectRatio', 'imgSafety', 'imgStyle',
            'veoFps', 'veoDuration',
            'ttsVoice', 'ttsSpeed', 'ttsAutoPlay'
        ];

        foundryInputs.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            
            const eventType = el.type === 'checkbox' ? 'change' : (el.type === 'range' ? 'input' : 'change');
            
            el.addEventListener(eventType, () => {
                if (el.id === 'ttsSpeed') {
                    document.getElementById('ttsSpeedVal').textContent = el.value + 'x';
                }
                this.saveFoundrySettings();
            });
        });
        
        document.getElementById('resetLayout')?.addEventListener('click', () => {
             document.documentElement.style.removeProperty('--panel-left-width');
             document.documentElement.style.removeProperty('--footer-height');
             if(sidebarSlider) { sidebarSlider.value = 260; document.getElementById('valSidebar').textContent = '260px'; }
             if(terminalSlider) { terminalSlider.value = 200; document.getElementById('valTerminal').textContent = '200px'; }
             this.showToast('info', 'Layout reset to defaults');
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

        // API Settings change listeners
        document.getElementById('googleApiKey')?.addEventListener('change', () => this.saveApiSettings());
        document.getElementById('evolutionMode')?.addEventListener('change', () => this.saveApiSettings());

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

        // ============================
        // BRANDING KIT (ENTERPRISE)
        // ============================
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const color = btn.dataset.color;
                document.documentElement.style.setProperty('--accent-primary', color);
                
                // Optional: Flash effect
                this.showToast('success', `OPERATING SYSTEM RE-SKINNED: ${color}`);
                this.logToTerminal(`[SYSTEM] Applied Theme Override: ${color}`);
            });
        });

        document.getElementById('brandTone')?.addEventListener('change', (e) => {
             this.logToTerminal(`[STRATEGY] Tone of Voice calibrated: ${e.target.value.toUpperCase()}`);
             this.showToast('info', 'Language Models Re-Aligned');
        });

        const brandUpload = document.getElementById('brandUploadZone');
        if (brandUpload) {
            brandUpload.addEventListener('click', () => {
                 this.logToTerminal(`[UPLOAD] Processing Brand Assets...`);
                 
                 setTimeout(() => {
                     this.showToast('success', 'Brand Assets Ingested (7 Files)');
                     brandUpload.innerHTML = '<span style="color:#4ade80; font-size:20px;">✅</span><p style="color:#4ade80;">Assets Linked</p>';
                 }, 1200);
            });
        }

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



        // ============================
        // OPERATOR PROFILE (ENTERPRISE)
        // ============================
        document.getElementById('saveProfile')?.addEventListener('click', () => {
             const name = document.getElementById('profileName').value;
             const role = document.getElementById('profileRole').value;
             
             // Update State
             this.state.operator = { name, role };
             
             // Update UI
             const osUser = document.querySelector('.os-user');
             if (osUser) osUser.textContent = `OPERATOR: ${name.toUpperCase()}`;
             
             this.showToast('success', `IDENTITY UPDATED: ${name.toUpperCase()} (${role.toUpperCase()})`);
             this.logToTerminal(`[AUTH] User Identity Refreshed: ${name}`);
             this.saveState();
        });

        // ============================
        // PERSISTENT ASSET UPLOAD
        // ============================
        document.getElementById('fileInput')?.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files);
                e.target.value = ''; // Reset
            }
        });
        
        // Ensure "attachBtn" triggers the file input
        document.getElementById('attachBtn')?.addEventListener('click', () => {
             document.getElementById('fileInput').click();
        });


        // Workflow car execute buttons
        document.querySelectorAll('.wf-run-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.workflow-card');
                if (card) {
                    this.openWorkflowModal(card.dataset.workflow);
                }
            });
        });

        // Workflow card CONFIGURE buttons
        document.querySelectorAll('.wf-config-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.workflow-card');
                if (card) {
                    this.openWorkflowConfig(card.dataset.workflow);
                }
            });
        });

        // WORKFLOW CONFIG MODAL LISTENERS
        document.getElementById('closeWorkflowConfig')?.addEventListener('click', () => this.closeWorkflowConfig());
        document.querySelector('#workflowConfigModal .modal-backdrop')?.addEventListener('click', () => this.closeWorkflowConfig());
        document.getElementById('saveConfig')?.addEventListener('click', () => this.saveWorkflowConfig());
        
        // Range Sliders update text
        document.getElementById('confDepth')?.addEventListener('input', (e) => {
             const val = e.target.value;
             const labels = {1: 'Speed (1)', 2: 'Normal (2)', 3: 'High (3)', 4: 'Very High (4)', 5: 'Deep (5)'};
             const span = document.getElementById('depthVal');
             if(span) span.textContent = labels[val] || val;
        });

        document.getElementById('confTemp')?.addEventListener('input', (e) => {
             const val = e.target.value;
             const span = document.getElementById('tempVal');
             if(span) span.textContent = (val / 100).toFixed(1);
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

        // ===================================
        // ORCHESTRATOR CONFIG LISTENERS (DELEGATED)
        // ===================================
        // Use delegation to ensure it works even if modal is re-rendered
        document.body.addEventListener('input', (e) => {
            if (e.target.id === 'nodeComputeSlider') {
                const val = e.target.value;
                const display = document.getElementById('computeValueDisplay');
                if (display) display.textContent = `${val}% TERAFLOPS`;
            }
        });

        document.body.addEventListener('click', (e) => {
             const btn = e.target.closest('#applyConfigBtn');
             if (btn) {
                const mode = document.getElementById('nodeModeSelect')?.value || 'autonomous';
                const compute = document.getElementById('nodeComputeSlider')?.value || 85;
                
                // 1. Show Toast
                this.showToast('success', `CONFIGURATION SAVED | MODE: ${mode.toUpperCase()}`);
                
                // 2. Log to Terminal
                this.logToTerminal(`[CONFIG] SN-00 updated: ${mode.toUpperCase()} mode, ${compute}% allocation.`);
                this.logToTerminal(`[SYSTEM] Optimizing resource distribution...`);
                
                // 3. Log to Node Logs (in modal)
                const nodeLogs = document.getElementById('nodeLogs');
                if (nodeLogs) {
                    const time = new Date().toLocaleTimeString('en-US', {hour12:false});
                    nodeLogs.innerHTML = `<div class="log-entry">[${time}] Configuration updated by SYSADMIN</div>` + nodeLogs.innerHTML;
                }
             }
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
        } else if (view === 'playground') {
            this.switchWorkspaceTab('playground');
        } else if (view === 'extensions') {
            this.switchWorkspaceTab('extensions');
        }
        
        this.logToTerminal(`[UI] Switched to ${view.toUpperCase()} view`);
    },

    switchWorkspaceTab(tab) {
        this.logToTerminal(`[UI] TRANSITIONING CONTEXT: ${tab.toUpperCase()}`);
        
        document.querySelectorAll('.workspace-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        const contents = document.querySelectorAll('.workspace-content');
        contents.forEach(content => {
            content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            content.style.opacity = '0';
            content.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                content.classList.add('hidden');
                
                // Determine if this content should be visible
                const viewMap = {
                    'chat': 'chatView',
                    'editor': 'editorView',
                    'preview': 'previewView',
                    'agents': 'agentsView',
                    'workflows': 'workflowsView',
                    'playground': 'playgroundView',
                    'extensions': 'extensionsView'
                };
                
                const targetId = viewMap[tab] || `${tab}View`;
                
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 300);
        });
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
            const result = await this.processCommand(message);
            const content = typeof result === 'string' ? result : (result.response || result.message);
            
            // Remove thinking
            this.removeThinking(thinkingId);
            
            // Add response
            this.addChatMessage('assistant', content);
            
            // Handle Rich Assets (IMAGES)
            if (result.generated_asset) {
                this.addChatMessage('assistant', result.generated_asset);
                this.logToTerminal(`[SYSTEM] New asset generated: ${result.generated_asset.name}`, 'success');
            }
            
            // Update Metrics if available (REAL DATA)
            if (result.metadata) {
                const meta = result.metadata;
                this.logToTerminal(`[IO] Tokens: ${meta.tokens || '---'} | Latency: ${meta.latency || '---'} | Cost: ${meta.cost || '$0.00'}`, 'node');
                
                if (meta.tokens) {
                    const tokenDisplay = document.getElementById('tokenCount');
                    if (tokenDisplay) tokenDisplay.textContent = `${meta.tokens} T`;
                }
            }
            
            // Handle Neural Voice (TTS)
            if (result.audio_stream && this.state.foundry.ttsAutoPlay) {
                this.playResponseVoice(result.audio_stream);
            }

            // Handle Media Pipeline (VEO)
            if (result.media_pipeline) {
                this.addChatMessage('assistant', {
                    type: 'pipeline',
                    data: result.media_pipeline
                });
            }
            
            // Deactivate nodes
            this.deactivateNodes(['SN-00', 'SP-01', 'RA-01', 'CC-01']);
            
            // Auto-save history
            this.saveState();
            
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
            // Check if content is a rich asset object
            if (typeof content === 'object' && content.type === 'image') {
                msg.innerHTML = `
                    <div class="msg-header">
                        <span class="msg-icon">◆</span>
                        <span class="msg-sender">AGENTICUM G5</span>
                        <span class="msg-time">${time}</span>
                    </div>
                    <div class="msg-content">
                        <div class="ai-asset-display">
                            <p>[CC-06] ASSET_GENERATED: ${content.name}</p>
                            <img src="data:${content.mimeType};base64,${content.data}" class="chat-generated-img" onclick="window.g5Instance.previewAssetFromData('${content.data}', 'image')">
                            <div class="asset-actions">
                            <div class="asset-actions">
                                <button class="os-btn mini" onclick="window.g5Instance.addAssetToVault('${content.name}', 'image', 'data:${content.mimeType};base64,${content.data}')">SAVE TO VAULT</button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (typeof content === 'object' && content.type === 'video') {
                msg.innerHTML = `
                    <div class="msg-header">
                        <span class="msg-icon">◆</span>
                        <span class="msg-sender">AGENTICUM G5</span>
                        <span class="msg-time">${time}</span>
                    </div>
                    <div class="msg-content">
                        <div class="ai-asset-display">
                            <p>[CC-06] VIDEO_GENERATED: ${content.name}</p>
                            <div class="chat-asset-preview">
                                <video src="${content.data}" controls class="chat-generated-video"></video>
                                <div class="asset-actions">
                                    <button class="btn-glass" onclick="window.g5Instance.addAssetToVault('${content.name}', 'video', '${content.data}')">SAVE TO VAULT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (typeof content === 'object' && content.type === 'pipeline') {
                const pipeId = content.data.job_id;
                msg.innerHTML = `
                    <div class="msg-header">
                        <span class="msg-icon">◆</span>
                        <span class="msg-sender">G5_MEDIA_PIPELINE</span>
                        <span class="msg-time">${time}</span>
                    </div>
                    <div class="msg-content">
                        <div class="media-pipeline" id="pipe-${pipeId}">
                            <div class="pipeline-header">
                                <span class="pipeline-id">ID: ${pipeId}</span>
                                <span class="pipeline-status">RENDERING...</span>
                            </div>
                            <div class="pipeline-progress-bar">
                                <div class="pipeline-fill processing" style="width: 0%"></div>
                            </div>
                            <div class="pipeline-footer" style="display:flex; justify-content:space-between; margin-top:8px; font-size:9px; color:var(--text-muted);">
                                <span>TYPE: VEO_001</span>
                                <span class="pipeline-eta">ETA: ${content.data.eta}</span>
                            </div>
                        </div>
                    </div>
                `;
                // Start tracking
                setTimeout(() => this.runMediaPipeline(pipeId), 500);
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
        }
        
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        
        // Push to history (handle objects vs strings)
        const historyItem = { type, content: typeof content === 'string' ? content : `[ASSET: ${content.name}]`, time: Date.now() };
        this.state.chatHistory.push(historyItem);
        
        if (this.saveState) this.saveState();
    },

    addAssetToVault(title, type, content) {
        const id = `asset-${Date.now()}`;
        const newAsset = {
            id,
            title,
            type,
            content, // This is the base64 or URI
            timestamp: Date.now()
        };
        
        if (!this.assets) this.assets = [];
        this.assets.push(newAsset);
        this.state.assets = this.assets; 
        
        this.renderVault();
        this.showToast('success', `ASSET VAULTED: ${title}`);
        this.logToTerminal(`[VAULT] New ${type} added: ${title}`);
        
        if (this.saveState) this.saveState();
    },

    previewAssetFromData(data, type) {
        // Temporary preview for chat images
        this.previewAsset({
            id: 'temp',
            title: 'Chat Preview',
            type: type,
            content: data.startsWith('data:') ? data : `data:image/png;base64,${data}`
        });
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
                const result = await G5_API.execute(command, this.state.activeAgent.briefing, this.state.foundry);
                return result; // Return full object for metadata tracking
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
            // DEMO TRAP DOOR: If specific phrasing is used, auto-trigger the workflow
            if (cmd.includes('initiate') || cmd.includes('neura-fizz')) {
                 setTimeout(() => {
                     this.openWorkflowModal('5min-agency');
                     // Small delay to allow modal to open then execute
                     setTimeout(() => {
                         const input = document.getElementById('workflowInput');
                         if (input) input.value = "Create viral campaign for NEURA-FIZZ (Nootropic Drink)";
                     }, 500);
                 }, 1000);
                 
                 return `<p><strong>[SN-00 ORCHESTRATOR]</strong></p>
                 <p>Command recognized: CAMPAIGN_GENESIS_PROTOCOL.</p>
                 <p>Initializing 5-Minute Agency Matrix... [STANDBY]</p>`;
            }
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
                this.logToTerminal('>> Target: Google Cloud Run (Region: europe-west3)', 'info');
                
                setTimeout(() => {
                    this.logToTerminal('>> Bundling assets (Webpack 5)...', 'info');
                }, 800);
                
                setTimeout(() => {
                    this.logToTerminal('>> optimizing neural weights (Quantization: INT8)...', 'info');
                }, 1600);
                
                setTimeout(() => {
                    this.logToTerminal('>> Verifying Integrity shasum...', 'info');
                }, 2400);

                setTimeout(() => {
                    this.logToTerminal('>> Pushing container to Artifact Registry...', 'info');
                }, 3200);

                setTimeout(() => {
                    this.logToTerminal('[SUCCESS] Deployment Complete.', 'success');
                    this.logToTerminal('>> Live URL: https://tutorai-e39uu.web.app', 'success');
                    if (window.G5Audio) window.G5Audio.playAccessGranted();
                }, 4500);
                break;
            case 'PYTHON':
                if (window.hasPython) {
                    this.logToTerminal('[PYTHON] Python 3.12.1 Interactive Shell', 'success');
                    this.logToTerminal('>>> print("Neural Interface Active")', 'info');
                    this.logToTerminal('Neural Interface Active', 'system');
                } else {
                    this.logToTerminal('[ERROR] Python Interpreter not installed. Visit Extensions Matrix.', 'error');
                }
                break;
            case 'GIT':
                this.logToTerminal('[GIT] git status', 'input');
                this.logToTerminal('On branch main. Your branch is up to date with "origin/main".', 'system');
                this.logToTerminal('nothing to commit, working tree clean', 'system');
                break;
            case 'SCAN':
                if (window.hasVision) {
                    this.logToTerminal('[VISION] Scanning active viewport...', 'info');
                    setTimeout(() => {
                        this.logToTerminal('[VISION] Objects detected: Agent_Grid, Terminal_Console, Neural_Mesh', 'success');
                    }, 800);
                } else {
                    this.logToTerminal('[ERROR] Neural Vision Ext. required.', 'error');
                }
                break;
            case 'DEMO':
            case 'JURY':
                if (window.JuryMode) {
                    window.JuryMode.init();
                } else {
                    this.logToTerminal('[ERROR] Jury Mode module not loaded.', 'error');
                }
                break;
            default:
                if (cmd.startsWith('WORKFLOW ')) {
                    const wf = cmd.replace('WORKFLOW ', '');
                    this.logToTerminal(`[WORKFLOW] Activating ${wf}...`, 'system');
                } else if (cmd.startsWith('PYTHON ')) {
                    if (window.hasPython) {
                        this.logToTerminal(`[PYTHON] Executing script...`, 'info');
                        setTimeout(() => this.logToTerminal(`[OUTPUT] Process completed (Exit Code 0)`, 'success'), 600);
                    } else {
                        this.logToTerminal('[ERROR] Python module missing.', 'error');
                    } 
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

    // ============================================
    // DYNAMIC VAULT RENDERER (ATOMIC DEPTH)
    // ============================================

    renderVault() {
        const vaultContainer = document.querySelector('.asset-list');
        if (!vaultContainer) return;

        // Clear existing content
        vaultContainer.innerHTML = '';

        if (!this.assets || this.assets.length === 0) {
            vaultContainer.innerHTML = '<div style="padding:10px; color:#666; font-size:11px;">[VAULT EMPTY]</div>';
            return;
        }

        // Render assets (Newest first)
        [...this.assets].reverse().forEach(asset => {
            let icon = '📄';
            if (asset.type === 'video') icon = '🎬';
            if (asset.type === 'image') icon = '🖼️';
            if (asset.type === 'audio') icon = '🔊';
            
            // Truncate title
            const title = asset.title.length > 25 ? asset.title.substring(0, 22) + '...' : asset.title;
            
            const item = document.createElement('div');
            item.className = 'asset-mini';
            item.innerHTML = `
                <span class="asset-icon">${icon}</span>
                <span class="asset-name" title="${asset.title}">${title}</span>
                <span style="margin-left:auto; font-size:9px; color:#666;">${asset.timestamp ? new Date(asset.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : 'NOW'}</span>
            `;
            item.onclick = () => window.g5Instance.previewAsset(asset.id);
            vaultContainer.appendChild(item);
        });
        
        // Sync with terminal
        if (window.listAssets) window.listAssets();
    },

    previewAsset(input) {
        let asset;
        if (typeof input === 'string') {
            asset = this.assets.find(a => a.id === input);
        } else {
            asset = input; // Input is the asset object itself
        }
        
        if (!asset) return;
        
        // Create Modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(0,0,0,0.85)';
        modal.style.backdropFilter = 'blur(5px)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.animation = 'fadeIn 0.3s ease';
        
        let contentDisplay = `<div style="background:#1a1a1a; padding:1rem; border:1px solid #333; color:#aaa; font-family:'JetBrains Mono'; white-space:pre-wrap; max-height:400px; overflow:auto; min-height:200px;">${asset.content || 'Content binary not loaded.'}</div>`;
        
        if (asset.type === 'image') {
            contentDisplay = `<div style="display:flex; justify-content:center; background:#000; padding:1rem; border:1px solid #333;"><img src="${asset.content || 'assets/img/placeholder.jpg'}" style="max-width:100%; max-height:500px; object-fit:contain; border:1px solid #333;"></div>`;
        }
        
        modal.innerHTML = `
            <div class="modal-content" style="background:#0f1115; border:1px solid #3b82f6; box-shadow:0 0 40px rgba(59, 130, 246, 0.2); padding:0; width:700px; max-width:95%; position:relative; display:flex; flex-direction:column;">
                <div style="padding:1rem 1.5rem; border-bottom:1px solid #333; display:flex; align-items:center; justify-content:space-between; background:#14171c;">
                    <h2 style="color:#fff; font-family:'Rajdhani'; font-size:1.2rem; letter-spacing:1px; margin:0;">${asset.title}</h2>
                    <div style="font-family:'JetBrains Mono'; color:#60a5fa; font-size:0.7rem;">[${asset.type.toUpperCase()}]</div>
                </div>
                
                <div style="padding:1.5rem;">
                    ${contentDisplay}
                </div>
                
                <div style="padding:1rem 1.5rem; border-top:1px solid #333; display:flex; gap:10px; justify-content:flex-end; background:#14171c;">
                    <button class="os-btn" onclick="this.closest('.modal-overlay').remove()" style="opacity:0.7;">CLOSE</button>
                    <button class="os-btn" onclick="alert('Sent to Production Pipeline');" style="border-color:#34d399; color:#34d399;">DEPLOY ASSET</button>
                    <button class="os-btn" onclick="window.g5Instance.deleteAsset('${asset.id}'); this.closest('.modal-overlay').remove();" style="border-color:#f87171; color:#f87171;">DELETE</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    deleteAsset(id) {
        this.assets = this.assets.filter(a => a.id !== id);
        if (this.saveState) this.saveState();
        this.renderVault();
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
    // SYSTEM CLOCK & DYNAMIC METRICS
    // ============================================
    startSystemClock() {
        // 1. DYNAMIC METRICS FLUTTER (1s)
        setInterval(() => {
            if (this.state.nodes.online < 52) return; // Wait for system ready
            
            const tokensBase = 1.7;
            const tokenOsc = (Math.random() * 0.05).toFixed(2);
            const tokens = (tokensBase + parseFloat(tokenOsc)).toFixed(2);
            
            const latency = Math.floor(12 + Math.random() * 8); // Lower, more "optimized" feel
            
            const tokenDisplay = document.getElementById('tokenCount');
            const latencyDisplay = document.getElementById('latencyDisplay');
            
            if (tokenDisplay) {
                tokenDisplay.textContent = `${tokens}M`;
                // Subtle flicker effect on change
                if (Math.random() > 0.8) tokenDisplay.style.opacity = '0.7';
                else tokenDisplay.style.opacity = '1';
            }
            if (latencyDisplay) {
                latencyDisplay.textContent = `~${latency}ms`;
                if (Math.random() > 0.8) latencyDisplay.style.opacity = '0.7';
                else latencyDisplay.style.opacity = '1';
            }
        }, 1000);

        // 2. CHART ANIMATION LOOP (1s)
        setInterval(() => {
            this.updateCharts();
        }, 1000);
    },

    updateCharts() {
        // Simple canvas drawing for "Activity" and "Sentiment"
        const charts = [
            { id: 'activityChart', color: '#60a5fa' },
            { id: 'sentimentChart', color: '#34d399' }
        ];

        charts.forEach(c => {
            const canvas = document.getElementById(c.id);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;
            
            // Shift old image left
            const imageData = ctx.getImageData(1, 0, w - 1, h);
            ctx.putImageData(imageData, 0, 0);
            ctx.clearRect(w - 1, 0, 1, h);
            
            // Draw new point
            const value = Math.random() * h;
            ctx.fillStyle = c.color;
            ctx.fillRect(w - 2, value, 2, 2);
        });
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

    initAudio() {
        // Initialize AudioContext on first user interaction to comply with browser policies
        this.audioCtx = null;
        this.soundEnabled = true;
        
        const initAudioCtx = () => {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                console.log('🔊 G5 AUDIO SUBSYSTEM ONLINE');
            }
            document.removeEventListener('click', initAudioCtx);
        };
        document.addEventListener('click', initAudioCtx);
    },

    playResponseVoice(base64Audio) {
        try {
            const audioBlob = this.base64ToBlob(base64Audio, 'audio/mp3');
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play().catch(e => console.warn('G5 VOICE_BYPASS: Autoplay restricted', e));
        } catch (e) {
            console.error('G5 VOICE_FAILURE:', e);
        }
    },

    base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    },

    runMediaPipeline(pipeId) {
        const pipe = document.getElementById(`pipe-${pipeId}`);
        if (!pipe) return;
        
        const fill = pipe.querySelector('.pipeline-fill');
        const status = pipe.querySelector('.pipeline-status');
        const eta = pipe.querySelector('.pipeline-eta');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 5 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.finalizeMediaPipeline(pipeId);
            }
            fill.style.width = `${progress}%`;
            if (progress > 90) {
                status.textContent = 'COMPILING...';
                eta.textContent = 'ETA: 2s';
            } else if (progress > 50) {
                status.textContent = 'SYNTHESIZING...';
                eta.textContent = `ETA: ${Math.round((100 - progress) / 2)}s`;
            }
        }, 1000);
    },

    finalizeMediaPipeline(pipeId) {
        const pipe = document.getElementById(`pipe-${pipeId}`);
        if (!pipe) return;
        
        pipe.querySelector('.pipeline-status').textContent = 'COMPLETE';
        pipe.querySelector('.pipeline-status').style.color = 'var(--accent-success)';
        pipe.querySelector('.pipeline-fill').classList.remove('processing');
        pipe.querySelector('.pipeline-fill').style.background = 'var(--accent-success)';
        
        this.logToTerminal(`[PIPELINE] Job ${pipeId} finalized successfully.`);
        this.showToast('success', 'VIDEO RENDER COMPLETE');
        
        // Return a "real" final asset link (mocked high-quality demo video)
        setTimeout(() => {
            this.addChatMessage('assistant', {
                type: 'video',
                name: `g5_cinematic_${Date.now()}.mp4`,
                data: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' // Using a real sample video for the hackathon
            });
        }, 1000);
    },

    playSound(type) {
        if (!this.soundEnabled || !this.audioCtx) return;
        
        const ctx = this.audioCtx;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        const now = ctx.currentTime;
        
        switch (type) {
            case 'hover':
                // High-pitched blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gainNode.gain.setValueAtTime(0.02, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
                
            case 'click':
                // Mechanical click
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
                
            case 'success':
                // Positive chime
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now); // A4
                osc.frequency.setValueAtTime(554.37, now + 0.1); // C#5
                osc.frequency.setValueAtTime(659.25, now + 0.2); // E5
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.linearRampToValueAtTime(0.05, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
                break;
                
            case 'alert':
                // Error buzz
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
                
            case 'process':
                // Computing flutter
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.linearRampToValueAtTime(400, now + 0.1);
                gainNode.gain.setValueAtTime(0.03, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
        }
    },

    // ============================================
    // NEURAL CANVAS MESH (ATOMIC VISUALS)
    // ============================================
    initNeuralMesh() {
        this.neuralCanvas = document.getElementById('neuralCanvas');
        if (!this.neuralCanvas) return;
        
        this.neuralCtx = this.neuralCanvas.getContext('2d');
        this.nodePositions = [];
        this.activeMeshCluster = null;
        this.meshParticles = [];

        // Agent Foundry
        document.getElementById('openFoundryBtn')?.addEventListener('click', () => this.openAgentFoundry());
        document.getElementById('closeFoundry')?.addEventListener('click', () => this.closeAgentFoundry());
        document.getElementById('spawnAgentBtn')?.addEventListener('click', () => this.spawnAgent());
        
        // Color picker live update
        document.getElementById('foundryColor')?.addEventListener('input', (e) => {
            document.getElementById('foundryColorHex').textContent = e.target.value;
        });

        // Neural 3D Resize Listener
        window.addEventListener('resize', () => {
             this.resizeNeuralMesh();
        });
        // Resize observer
        const resizeObserver = new ResizeObserver(() => {
            this.resizeNeuralMesh();
        });
        resizeObserver.observe(document.getElementById('agentsGrid'));
        
        this.resizeNeuralMesh();
        this.animateNeuralMesh();
    },

    resizeNeuralMesh() {
        if (!this.neuralCanvas) return;
        const parent = this.neuralCanvas.parentElement;
        this.neuralCanvas.width = parent.clientWidth;
        this.neuralCanvas.height = parent.clientHeight;
        this.updateNodePositions();
    },

    updateNodePositions() {
        this.nodePositions = [];
        const tiles = document.querySelectorAll('.agent-tile');
        const gridRect = document.getElementById('agentsGrid').getBoundingClientRect();
        
        tiles.forEach(tile => {
            const rect = tile.getBoundingClientRect();
            // Store relative center position
            const x = rect.left - gridRect.left + (rect.width / 2);
            const y = rect.top - gridRect.top + (rect.height / 2);
            
            // Extract cluster from class (e.g., 'agent-tile apex')
            let cluster = 'unknown';
            if (tile.classList.contains('apex')) cluster = 'APEX';
            if (tile.classList.contains('sp')) cluster = 'STRATEGY';
            if (tile.classList.contains('ra')) cluster = 'RESEARCH';
            if (tile.classList.contains('cc')) cluster = 'CONTENT';
            if (tile.classList.contains('mi')) cluster = 'GOVERNANCE';
            if (tile.classList.contains('dt')) cluster = 'INTEL';

            this.nodePositions.push({ x, y, cluster });
        });
    },

    drawNeuralConnections() {
        if (!this.neuralCtx || !this.activeMeshCluster) return;
        
        const ctx = this.neuralCtx;
        ctx.clearRect(0, 0, this.neuralCanvas.width, this.neuralCanvas.height);
        
        // Filter nodes by active cluster
        const targetCluster = this.activeMeshCluster.toUpperCase();
        const activeNodes = this.nodePositions.filter(n => n.cluster === targetCluster || targetCluster === 'ACTIVE'); // 'ACTIVE' means all/base pulse
        
        if (activeNodes.length < 2) return;

        // Draw connections
        ctx.beginPath();
        ctx.strokeStyle = this.getClusterColor(targetCluster);
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;

        // Simple mesh: connect each node to up to 2 nearest neighbors
        activeNodes.forEach((node, i) => {
             activeNodes.forEach((other, j) => {
                 if (i === j) return;
                 const dx = node.x - other.x;
                 const dy = node.y - other.y;
                 const dist = Math.sqrt(dx*dx + dy*dy);
                 
                 if (dist < 150) { // Connection threshold
                     ctx.moveTo(node.x, node.y);
                     ctx.lineTo(other.x, other.y);
                 }
             });
        });
        
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        
        // Draw Particles
        this.updateParticles(activeNodes);
    },
    
    getClusterColor(cluster) {
        // Match CSS variables
        switch(cluster) {
            case 'STRATEGY': return '#3b82f6'; // blue
            case 'CONTENT': return '#d946ef'; // fuchsia
            case 'RESEARCH': return '#10b981'; // emerald
            case 'GOVERNANCE': return '#f59e0b'; // amber
            case 'INTEL': return '#8b5cf6'; // violet
            case 'APEX': return '#fbbf24'; // amber
            default: return '#3b82f6';
        }
    },

    updateParticles(nodes) {
        const ctx = this.neuralCtx;
        
        // Spawn particle occasionally
        if (Math.random() > 0.9 && this.meshParticles.length < 20) {
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            const endNode = nodes[Math.floor(Math.random() * nodes.length)];
            if (startNode !== endNode) {
                this.meshParticles.push({
                    x: startNode.x,
                    y: startNode.y,
                    tx: endNode.x,
                    ty: endNode.y,
                    progress: 0,
                    speed: 0.02 + Math.random() * 0.03
                });
            }
        }

        // Update and draw particles
        ctx.fillStyle = '#ffffff';
        for (let i = this.meshParticles.length - 1; i >= 0; i--) {
            const p = this.meshParticles[i];
            p.progress += p.speed;
            
            const curX = p.x + (p.tx - p.x) * p.progress;
            const curY = p.y + (p.ty - p.y) * p.progress;
            
            ctx.beginPath();
            ctx.arc(curX, curY, 2, 0, Math.PI * 2);
            ctx.fill();
            
            if (p.progress >= 1) {
                this.meshParticles.splice(i, 1);
            }
        }
    },

    animateNeuralMesh() {
        if (this.activeMeshCluster) {
            this.drawNeuralConnections();
        } else if (this.neuralCtx) {
             this.neuralCtx.clearRect(0, 0, this.neuralCanvas.width, this.neuralCanvas.height);
        }
        requestAnimationFrame(() => this.animateNeuralMesh());
    },

    // ============================================
    // PUBLIC API FOR WORKFLOW ENGINE
    // ============================================
    pulseCluster(clusterName) {
        const grid = document.querySelector('.node-grid');
        if (!grid) return;

        // Reset visual state
        grid.classList.remove('pulse-active', 'pulse-strategy', 'pulse-content', 'pulse-research', 'pulse-governance', 'pulse-intel', 'pulse-apex');
        this.activeMeshCluster = null; // Turn off mesh
        
        // Apply new state
        if (clusterName) {
            grid.classList.add(`pulse-${clusterName.toLowerCase()}`);
            this.activeMeshCluster = clusterName; // Turn on mesh
            
            // Force position update in case of layout shift
            this.updateNodePositions();
            
            // ATOMIC GLITCH TRIGGER
            this.triggerGlitchEffect('osHeader');
        }
    },

    triggerGlitchEffect(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;

        el.setAttribute('data-text', el.innerText);
        el.classList.add('atomic-glitch');
        
        setTimeout(() => {
            el.classList.remove('atomic-glitch');
        }, 400); // Short burst
    },

    // ============================================
    // DEMO FOCUS MODE (Visual Spotlight)
    // ============================================
    focusCriticalNodes(nodeIds) {
        // Dim everything first
        document.querySelectorAll('.tree-item.file').forEach(node => {
            node.classList.add('dimmed-node');
            node.classList.remove('active-demo-node');
        });
        
        document.querySelectorAll('.agent-tile').forEach(tile => {
            tile.classList.add('dimmed-node');
            tile.classList.remove('active-demo-node');
        });

        // Highlight specific nodes
        nodeIds.forEach(id => {
            // Highlight in Tree
            const treeNode = document.querySelector(`.tree-item.file[data-node="${id}"]`);
            if (treeNode) {
                treeNode.classList.remove('dimmed-node');
                treeNode.classList.add('active-demo-node');
                // Auto-expand parent folder if possible (simple assumption)
                const parent = treeNode.parentElement;
                if (parent && parent.style.display === 'none') {
                    parent.style.display = 'block';
                }
            }

            // Highlight in Grid (Agent Tiles)
            const tileNode = document.querySelector(`.agent-tile[data-node="${id}"]`);
            if (tileNode) {
                tileNode.classList.remove('dimmed-node');
                tileNode.classList.add('active-demo-node');
            }
        });
        
        this.logToTerminal(`[DEMO] Focus Mode Active: ${nodeIds.length} nodes locked.`);
    },

    resetNodeFocus() {
        document.querySelectorAll('.dimmed-node').forEach(el => el.classList.remove('dimmed-node'));
        document.querySelectorAll('.active-demo-node').forEach(el => el.classList.remove('active-demo-node'));
        this.logToTerminal(`[DEMO] Focus Mode Released.`);
    },

    // ============================================
    // WORKFLOW CONFIGURATION LOGIC
    // ============================================
    openWorkflowConfig(workflowId) {
        this.currentConfigWorkflowId = workflowId;
        const modal = document.getElementById('workflowConfigModal');
        const title = document.getElementById('configWorkflowName');
        
        if (title) title.textContent = workflowId.toUpperCase().replace('-', ' ');
        
        // Load existing config if any
        if (this.state.workflowConfigs && this.state.workflowConfigs[workflowId]) {
            const config = this.state.workflowConfigs[workflowId];
            if(document.getElementById('confDepth')) document.getElementById('confDepth').value = config.depth || 2;
            if(document.getElementById('confTemp')) document.getElementById('confTemp').value = config.temp || 70;
            if(document.getElementById('confAudience')) document.getElementById('confAudience').value = config.audience || '';
        }

        modal?.classList.remove('hidden');
        this.logToTerminal(`[CONFIG] Opened parameters for ${workflowId}`);
    },

    closeWorkflowConfig() {
        document.getElementById('workflowConfigModal')?.classList.add('hidden');
        this.currentConfigWorkflowId = null;
    },

    saveWorkflowConfig() {
        if (!this.currentConfigWorkflowId) return;
        
        const depth = document.getElementById('confDepth').value;
        const temp = document.getElementById('confTemp').value;
        const audience = document.getElementById('confAudience').value;
        
        // Init state obj if missing
        if (!this.state.workflowConfigs) this.state.workflowConfigs = {};
        
        this.state.workflowConfigs[this.currentConfigWorkflowId] = {
            depth,
            temp,
            audience,
            updatedAt: Date.now()
        };
        
        this.showToast('success', `PROTOCOL UPDATED: ${this.currentConfigWorkflowId.toUpperCase()}`);
        this.logToTerminal(`[CONFIG] Saved params for ${this.currentConfigWorkflowId}: Depth=${depth}, Temp=${temp/100}`);
        
        this.closeWorkflowConfig();
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
        if (this.pulseCluster) {
             this.pulseCluster('active');
        } else {
             const grid = document.querySelector('.node-grid');
             grid?.classList.add('pulse-active');
        }
        
        const progressFill = document.getElementById('workflowProgressFill');
        const stepsContainer = document.getElementById('workflowSteps');
        
        // SIMULATE INTELLIGENT CONTEXT ATTACHMENT
        const countSpan = document.getElementById('attachedCount');
        if (countSpan) {
            const fileCount = (this.state.contextFiles || []).length;
            countSpan.textContent = fileCount > 0 ? `⚡ Auto-Context: ${fileCount} Sources` : '⚡ Auto-Context: Zero-Shot';
            countSpan.style.color = 'var(--accent-primary)';
        }

        // DEFINING GRANULAR SIMULATION STEPS
        let simulationSteps = [];
        
        // Ensure current workflow is set
        const wfId = this.currentWorkflow || this.state.selectedWorkflow || '5min-agency';

        if (wfId === '5min-agency') {
            simulationSteps = [
                // NEURA-FIZZ SCENARIO STEPS (Hardcoded for Demo)
                { label: 'SN-00: Analyzing Intent (Category: Nootropic Beverage)...', cluster: 'apex' },
                { label: 'SP-01: Defining "Liquid Lucid Dreaming" Positioning...', cluster: 'strategy' },
                { label: 'RA-06: Validating Trend "Gen Z Cognitive Health"...', cluster: 'research' },
                { label: 'CC-01: Drafting Viral Social Copy...', cluster: 'content' },
                { label: 'CC-06: Rending "Cyberpunk Can" Visuals...', cluster: 'content' },
                { label: 'MI-01: Compliance Check (Claim Verification)...', cluster: 'governance' },
                { label: 'Packaging Assets for Launch...', cluster: 'apex' }
            ];
            
            // ACTIVATE DEMO MODE HIGHLIGHTS
            this.focusCriticalNodes(['SN-00', 'SP-01', 'RA-06', 'CC-01', 'CC-06', 'MI-01', 'DT-04']);
        } else if (wfId === 'senate') {
            simulationSteps = [
                { label: 'Convening Algorithmic Senate...', cluster: 'governance' },
                { label: 'Polling Node Consensus...', cluster: 'governance' },
                { label: 'Debating Policy Constraints...', cluster: 'strategy' },
                { label: 'Applying Ethical Filters (MI-07)...', cluster: 'governance' },
                { label: 'Finalizing Legislative Output...', cluster: 'apex' }
            ];
        } else if (wfId === 'jit-reality') {
            simulationSteps = [
                { label: 'Scanning Global Market Trends...', cluster: 'intel' },
                { label: 'Identifying White Space p(>0.8)...', cluster: 'research' },
                { label: 'Simulating Product Launch Routes...', cluster: 'strategy' },
                { label: 'Calculating ROI Projection...', cluster: 'intel' },
                { label: 'Generating Reality Report...', cluster: 'apex' }
            ];
        } else if (wfId === 'morphosis') {
            simulationSteps = [
                { label: 'Scanning Narrative Field...', cluster: 'research' },
                { label: 'Detecting Cultural Mutations...', cluster: 'research' },
                { label: 'Evolving Content Genotypes...', cluster: 'content' },
                { label: 'Simulating A/B Variants...', cluster: 'intel' },
                { label: 'Morphing Final Output...', cluster: 'content' }
            ];
        } else if (wfId === 'autopoiesis') {
            simulationSteps = [
                { label: 'Analyzing System Efficiency...', cluster: 'intel' },
                { label: 'Detecting Logic Bottlenecks...', cluster: 'research' },
                { label: 'RA-52: Simulating Attack Vectors...', cluster: 'research' },
                { label: 'Optimizing Neural Pathways...', cluster: 'apex' },
                { label: 'Deploying Self-Patcher v5.1...', cluster: 'governance' }
            ];
        } else {
             // Fallback
             simulationSteps = [
                { label: 'Initializing Cluster...', cluster: 'apex' },
                { label: 'Processing...', cluster: 'intel' },
                { label: 'Finalizing...', cluster: 'apex' }
             ];
        }

        this.logToTerminal(`[COMMAND] EXECUTE AGENTS: ${wfId}`);

        // ANIMATE PROGRESS WITH GRANULAR PULSE
        try {
            for (let i = 0; i < simulationSteps.length; i++) {
                const step = simulationSteps[i];
                
                // INJECT CONFIG LOGIC
                if (i === 0 && this.state.workflowConfigs && this.state.workflowConfigs[wfId]) {
                    const cfg = this.state.workflowConfigs[wfId];
                    this.logToTerminal(`[PARAM] Applied Config: Depth=${cfg.depth}, Temp=${cfg.temp/100}, Audience="${cfg.audience}"`);
                    await new Promise(r => setTimeout(r, 400));
                }

                // UI Text
                stepsContainer.textContent = step.label;
                const progress = ((i + 1) / simulationSteps.length) * 100;
                progressFill.style.width = `${progress}%`;
                
                // ATOMIC CLUSTER PULSE
                if (this.pulseCluster) {
                    this.pulseCluster(step.cluster);
                } else if (step.cluster) {
                    // Fallback to manual class manipulation if pulseCluster missing
                     const grid = document.querySelector('.node-grid');
                     if (grid) {
                        grid.className = 'node-grid'; // Reset
                        grid.classList.add(`pulse-${step.cluster}`);
                     }
                }
                
                // TERMINAL SYNC
                if (this.generateStepLogs) {
                    this.generateStepLogs(step.label);
                } else {
                    this.logToTerminal(`[PROCESSING] ${step.label}`);
                }
                
                // Randomish delay for realism
                const delayMs = 800 + Math.random() * 600;
                await new Promise(r => setTimeout(r, delayMs));
            }
        } catch (err) {
            console.error('Workflow Execution Error:', err);
            this.logToTerminal(`[ERROR] Workflow interrupted: ${err.message}`, 'error');
            this.playSound('alert');
        }
        
        // CLEANUP PULSE
        // CLEANUP PULSE & FOCUS
        if (this.pulseCluster) {
            this.pulseCluster(null);
        } else {
             const grid = document.querySelector('.node-grid');
             grid?.classList.remove('pulse-active', 'pulse-strategy', 'pulse-content', 'pulse-research', 'pulse-governance', 'pulse-intel');
        }
        
        // RESET DEMO FOCUS
        this.resetNodeFocus();
        
        // GENERATE FAKE ASSETS & OUTPUT
        this.generateSimulationResult(this.currentWorkflow || wfId, input);
        
        // Show Output UI
        document.getElementById('workflowOutput')?.classList.remove('hidden');
        this.showToast('success', `${wfId.toUpperCase()} completed`);
        this.logToTerminal(`[WORKFLOW] ${wfId} execution successful`);
        this.playSound('success');
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
                    </div>
                    <div class="sim-section">
                        <h4>STRATEGIC ANGLE: "LIQUID LUCID DREAMING"</h4>
                        <p>Positioning NEURA-FIZZ not just as energy, but as a "Cognitive Unlock" for the creators economy. Targeting flow state, not just wakefulness.</p>
                    </div>
                    <div class="sim-assets-list">
                        ${this.createSimulatedAsset('Strategy_Brief_NEURAFIZZ.pdf', 'pdf')}
                        ${this.createSimulatedAsset('Teaser_Script_GenZ.txt', 'text')}
                        ${this.createSimulatedAsset('Can_Design_Cyberpunk_v3.png', 'image')}
                        ${this.createSimulatedAsset('Social_Media_Viral.md', 'code')}
                        ${this.createSimulatedAsset('Audio_Logo_Synth.mp3', 'audio')}
                        ${this.createSimulatedAsset('Compliance_Report_Clean.pdf', 'pdf')}
                    </div>
                    <div class="sim-footer">
                        <p class="sim-note">All assets passed compliance (MI-01). Claims verified.</p>
                    </div>
                </div>
            `;
            // Add to main grid as well
            this.addAssetToGrid({ name: 'Strategy_Brief_NEURAFIZZ.pdf', size: 1024 * 450, type: 'application/pdf' });
            this.addAssetToGrid({ name: 'Can_Design_Cyberpunk_v3.png', size: 1024 * 15000, type: 'image/png' });
            this.addAssetToGrid({ name: 'Audio_Logo_Synth.mp3', size: 1024 * 3200, type: 'audio/mpeg' });
        } else if (workflowId === 'senate') {
            html = `
                <div class="simulation-result">
                    <div class="sim-header">
                        <span class="sim-status success">⚖️ CONSENSUS REACHED</span>
                        <span class="sim-meta">3 Proposals Debated | 99.8% Confidence</span>
                    </div>
                    <div class="sim-section">
                        <h4>DECISION: "OPERATION VELVET" APPROVED</h4>
                        <p>The Senate has authorized the strategic pivot. Ethical constraints (MI-07) successfully mitigated bias risks in the targeting algorithm.</p>
                    </div>
                    <div class="sim-assets-list">
                        ${this.createSimulatedAsset('Decision_Matrix_8849.pdf', 'pdf')}
                        ${this.createSimulatedAsset('Ethical_Compliance_Report.pdf', 'pdf')}
                        ${this.createSimulatedAsset('Governance_Log_v2.txt', 'text')}
                    </div>
                    <div class="sim-footer">
                        <p class="sim-note">Executed by Cluster: Governance (MI-01)</p>
                    </div>
                </div>
            `;
            this.addAssetToGrid({ name: 'Decision_Matrix_8849.pdf', size: 1024 * 350, type: 'application/pdf' });
            this.addAssetToGrid({ name: 'Ethical_Compliance_Report.pdf', size: 1024 * 820, type: 'application/pdf' });
        } else if (workflowId === 'jit-reality') {
            html = `
                <div class="simulation-result">
                    <div class="sim-header">
                        <span class="sim-status success">🔮 PREDICTION CONFIRMED</span>
                        <span class="sim-meta">Probability > 0.94 | Trend Velocity: HIGH</span>
                    </div>
                    <div class="sim-section">
                        <h4>OPPORTUNITY DETECTED: "NEURO-HAPTICS"</h4>
                        <p>Market signal analysis suggests a 400% surge in haptic interface demand. Product concept generated and ready for rapid prototyping.</p>
                    </div>
                    <div class="sim-assets-list">
                        ${this.createSimulatedAsset('Trend_Forecast_Q3.pdf', 'pdf')}
                        ${this.createSimulatedAsset('Product_Concept_Render.jpg', 'image')}
                        ${this.createSimulatedAsset('Launch_Strategy.md', 'code')}
                    </div>
                    <div class="sim-footer">
                        <p class="sim-note">Executed by Cluster: Intel (DT-02)</p>
                    </div>
                </div>
            `;
            this.addAssetToGrid({ name: 'Trend_Forecast_Q3.pdf', size: 1024 * 1200, type: 'application/pdf' });
            this.addAssetToGrid({ name: 'Product_Concept_Render.jpg', size: 1024 * 4100, type: 'image/jpeg' });
        } else if (workflowId === 'morphosis') {
            html = `
                <div class="simulation-result">
                    <div class="sim-header">
                        <span class="sim-status success">🔄 TRANSFORMATION COMPLETE</span>
                        <span class="sim-meta">8 Formats Generated | Omni-Channel Ready</span>
                    </div>
                    <div class="sim-section">
                        <h4>SOURCE ADAPTED: CORE NARRATIVE</h4>
                        <p>The core message has been successfully mutated into 8 distinct formats optimized for platform-specific engagement algorithms.</p>
                    </div>
                    <div class="sim-assets-list">
                        ${this.createSimulatedAsset('Omni_Channel_Pack_v2.zip', 'text')}
                        ${this.createSimulatedAsset('Blog_Post_Draft.md', 'code')}
                        ${this.createSimulatedAsset('Twitter_Thread_Viral.txt', 'text')}
                        ${this.createSimulatedAsset('Video_Script_Shorts.txt', 'text')}
                    </div>
                    <div class="sim-footer">
                        <p class="sim-note">Executed by Cluster: Content (CC-01)</p>
                    </div>
                </div>
            `;
            this.addAssetToGrid({ name: 'Blog_Post_Draft.md', size: 1024 * 15, type: 'text/markdown' });
            this.addAssetToGrid({ name: 'Twitter_Thread_Viral.txt', size: 1024 * 5, type: 'text/plain' });
        } else if (workflowId === 'autopoiesis') {
            html = `
                <div class="simulation-result">
                    <div class="sim-header">
                        <span class="sim-status success">🧬 SELF-REPAIR COMPLETE</span>
                        <span class="sim-meta">Efficiency +12% | Latency -15ms</span>
                    </div>
                    <div class="sim-section">
                        <h4>OPTIMIZATION APPLIED: "LOGIC FRACTURE"</h4>
                        <p>Detected and patched a recursive logic loop in the Strategy Cluster. Re-routed neural pathways for optimal throughput.</p>
                    </div>
                    <div class="sim-assets-list">
                        ${this.createSimulatedAsset('Optimization_Log_Daily.txt', 'text')}
                        ${this.createSimulatedAsset('System_Health_Report.pdf', 'pdf')}
                        ${this.createSimulatedAsset('Patch_Notes_v5.1.md', 'code')}
                    </div>
                    <div class="sim-footer">
                        <p class="sim-note">Executed by Cluster: Governance (MI-01)</p>
                    </div>
                </div>
            `;
            this.addAssetToGrid({ name: 'System_Health_Report.pdf', size: 1024 * 320, type: 'application/pdf' });
            this.addAssetToGrid({ name: 'Optimization_Log_Daily.txt', size: 1024 * 12, type: 'text/plain' });
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
                doc.setFillColor(20, 20, 20); 
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
    },

    // ============================================
    // AGENT FOUNDRY (PHASE 5)
    // ============================================
    openAgentFoundry() {
        document.getElementById('agentFoundryModal').classList.remove('hidden');
    },

    closeAgentFoundry() {
        document.getElementById('agentFoundryModal').classList.add('hidden');
    },

    spawnAgent() {
        // Collect Data
        const name = document.getElementById('foundryName').value || 'UNKNOWN-NODE';
        const role = document.getElementById('foundryRole').value;
        const color = document.getElementById('foundryColor').value;
        const prompt = document.getElementById('foundryPrompt').value;
        
        // Validation
        if (!prompt) {
            this.showToast('error', 'Cognitive Kernel requires instruction data.');
            return;
        }

        this.showLoading('Fabricating Neural Pathways...');

        // Simulate Creation Delay
        setTimeout(() => {
            // Create Agent Object
            const id = `CUST-${Math.floor(Math.random() * 1000)}`;
            const newAgent = {
                id: id,
                name: name,
                role: role,
                cluster: 'CUSTOM', // New cluster
                status: 'online',
                color: color
            };

            // Add to UI Grid
            this.addAgentToGrid(newAgent);

            // Add to 3D Mesh (Realtime Injection)
            if (window.neuralNavigator) {
                window.neuralNavigator.addNode(newAgent); 
            }

            this.hideLoading();
            this.closeAgentFoundry();
            this.renderNodes();
            
            // Audio Feedback
            if (window.G5Audio) window.G5Audio.playAccessGranted();
            
            this.showToast('success', 'Neural Node Fabricated');
            this.logToTerminal(`[FOUNDRY] Fabricated new node: ${id} (${role})`);
        }, 1500);
    },

    addAgentToGrid(agent) {
        const grid = document.getElementById('agentsGrid');
        
        const tile = document.createElement('div');
        tile.className = 'agent-tile custom';
        tile.dataset.node = agent.id;
        tile.style.borderLeft = `3px solid ${agent.color}`;
        
        tile.innerHTML = `
            <div class="tile-header">
                <span class="tile-icon">🧬</span>
                <span class="tile-status online"></span>
            </div>
            <div class="tile-body">
                <span class="tile-id">${agent.id}</span>
                <span class="tile-name">${agent.name}</span>
                <span class="tile-cluster" style="color:${agent.color}">${agent.role}</span>
            </div>
            <div class="tile-actions">
                <button class="tile-btn">⚙️</button>
                <button class="tile-btn">📋</button>
            </div>
        `;
        
        // Add click listener
         tile.addEventListener('click', (e) => {
            if (!e.target.closest('.tile-btn')) {
                this.selectNode(agent.id);
                this.showToast('success', `Selected ${agent.id}`);
            }
        });
        
        grid.appendChild(tile);
    },

    // ============================================
    // NEURAL PLAYGROUND (PHASE 5)
    // ============================================
    setupPlaygroundListeners() {
        // Temperature Slider
        document.getElementById('playgroundTemp')?.addEventListener('input', (e) => {
            document.getElementById('tempValue').textContent = e.target.value;
        });

        // Run Button
        document.getElementById('runPlaygroundBtn')?.addEventListener('click', () => {
            this.runPlayground();
        });

        // Ctrl+Enter Shortcut for Prompt
        document.getElementById('playgroundInput')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.runPlayground();
            }
        });
    },

    runPlayground() {
        const input = document.getElementById('playgroundInput');
        const output = document.getElementById('playgroundOutput');
        const cost = document.getElementById('playgroundCost');
        const model = document.getElementById('playgroundModel').value;
        
        if (!input || !input.value.trim()) return;

        const prompt = input.value;
        // Don't clear input, just focus output
        
        // 1. Initial State
        output.innerHTML = `<span style="color:#6b7280;">// Processing Inference Stream via ${model}...</span>`;
        cost.textContent = "CALCULATING...";
        
        // 2. Mock Reasoning / Thinking
        setTimeout(() => {
            output.innerHTML = `<div class="thinking-indicator"><div class="thinking-dot"></div><div class="thinking-dot"></div></div>`;
            
            // 3. Generation Stream
            setTimeout(() => {
                output.innerHTML = ''; // Clear thinking
                const response = this.generateMockResponse(prompt);
                const words = response.split(' ');
                let i = 0;
                
                // Speed based on model choice
                let speed = model === 'gemini-flash' ? 10 : 30; // ms per word
                
                // Audio Drone start
                if (window.G5Audio) window.G5Audio.startDrone();
                
                const interval = setInterval(() => {
                    if (i >= words.length) {
                        clearInterval(interval);
                        if (window.G5Audio) window.G5Audio.stopDrone();
                        output.innerHTML += '<br><br><span style="color:#4ade80;">// END OF STREAM</span>';
                        cost.textContent = `${Math.floor(words.length / (speed/1000))} T/s`;
                        this.logToTerminal(`[PLAYGROUND] Inference complete: ${words.length} tokens`);
                        return;
                    }
                    
                    const span = document.createElement('span');
                    span.textContent = words[i] + ' ';
                    span.style.color = '#e5e7eb';
                    span.style.animation = 'fadeIn 0.2s ease';
                    output.appendChild(span);
                    output.scrollTop = output.scrollHeight;
                    
                    // procedural typing sound could be here
                    if (window.G5Audio) window.G5Audio.playTypingSound();
                    
                    // TPS Counter Update
                    if (i % 5 === 0) {
                        cost.textContent = `${Math.floor(Math.random() * 50 + 80)} T/s`;
                    }
                    
                    i++;
                }, speed);
                
            }, 1200); // Thinking delay
        }, 300); // Network delay
    },

    generateMockResponse(prompt) {
        // Simple heuristic response generator
        const p = prompt.toLowerCase();
        if (p.includes('code') || p.includes('function') || p.includes('script')) {
            return "Here is the optimized implementation based on your constraints:\n\n```javascript\nfunction optimizedExecute(data) {\n  return data.reduce((acc, curr) => {\n    // Vectorized operation simulation\n    return acc + (curr.value * 0.95);\n  }, 0);\n}\n```\n\nThis approach minimizes memory overhead by O(n) complexity while maintaining stream integrity.";
        } else if (p.includes('strategy') || p.includes('plan')) {
            return "## Strategic Analysis\n\n1. **Market Penetration**: Current vector analysis suggests a 45% gap in the mid-market segment.\n2. **Resource Allocation**: Redirect 20% of compute interactons to outbound engagement.\n3. **Timeline**: Q3 execution window is optimal based on competitor signal noise.\n\nRecommendation: Proceed with Alpha Protocol launch sequence.";
        } else {
            return "I have analyzed the request parameters. The query suggests a need for high-level synthesis of existing data points. Based on the current knowledge graph, the optimal path forward involves iterative testing of the core hypothesis using a 52-node validation mesh. Accessing global context... Verified. The alignment score is 98.4%.";
        }
    },

    // ============================================
    // EXTENSIONS MATRIX (DEEP DIVE)
    // ============================================
    extensionsData: [
        // NEURAL & AI
        { id: 'ext-py', cat: 'neural', name: 'Python Interpreter', version: '3.12.1', author: 'Python Software Foundation', icon: '🐍', desc: 'Execute Python scripts locally within the browser sandbox. Includes NumPy and Pandas support.', installed: false, perms: ['Local Compute', 'File System'] },
        { id: 'ext-vis', cat: 'neural', name: 'Neural Vision', version: '2.0.4', author: 'Google DeepMind', icon: '👁️', desc: 'Real-time image analysis, object detection, and OCR capabilities via WebGPU.', installed: false, perms: ['Camera Access', 'GPU Acceleration'] },
        { id: 'ext-mem', cat: 'neural', name: 'Long-Term Memory', version: '1.5.0', author: 'Pinecone', icon: '🧠', desc: 'Vector database persistency layer for agentic context retention.', installed: false, perms: ['Storage', 'Network'] },
        { id: 'ext-voice', cat: 'neural', name: 'Voice Synthesis', version: '4.1.2', author: 'ElevenLabs', icon: '🎙️', desc: 'High-fidelity text-to-speech generation with emotion control.', installed: false, perms: ['Microphone', 'Audio Output'] },
        
        // DEVTOOLS
        { id: 'ext-term', cat: 'dev', name: 'Terminal Pro', version: '5.0.0', author: 'GNU Project', icon: '💻', desc: 'Advanced bash access, networking tools, and SSH capabilities.', installed: true, perms: ['System Root'] },
        { id: 'ext-git', cat: 'dev', name: 'Git Integration', version: '2.43.0', author: 'GitHub', icon: '🐙', desc: 'Full version control suite with commit graph visualization.', installed: false, perms: ['Network', 'File System'] },
        { id: 'ext-docker', cat: 'dev', name: 'Container Engine', version: '24.0.7', author: 'Docker Inc.', icon: '🐳', desc: 'Manage lightweight containers for isolated agent execution.', installed: false, perms: ['Virtualization'] },
        { id: 'ext-vscode', cat: 'dev', name: 'Monaco Editor', version: '1.85.0', author: 'Microsoft', icon: '📝', desc: 'Embeds VS Code architecture for advanced code editing.', installed: true, perms: ['UI Overlay'] },

        // SECURITY
        { id: 'ext-vpn', cat: 'security', name: 'Quantum VPN', version: '1.0.0', author: 'Nord Security', icon: '🛡️', desc: 'Encrypted tunnel for anonymous neural operations.', installed: false, perms: ['Network Proxy'] },
        { id: 'ext-fire', cat: 'security', name: 'Firewall AI', version: '3.2.1', author: 'CrowdStrike', icon: '🔥', desc: 'Predictive threat protection against adversarial prompts.', installed: true, perms: ['Network Monitor'] },
        { id: 'ext-auth', cat: 'security', name: 'Biometric Auth', version: '2.1.0', author: 'Yubico', icon: '👆', desc: 'Hardware-backed authentication for operator identity.', installed: false, perms: ['USB Access'] },

        // LEGACY
        { id: 'ext-win', cat: 'legacy', name: 'Win32 Bridge', version: '0.9.0', author: 'WineHQ', icon: '🪟', desc: 'Compatibility layer for legacy Windows executables.', installed: false, perms: ['System Hooks'] },
        { id: 'ext-dos', cat: 'legacy', name: 'DOSBox core', version: '0.74', author: 'OpenSource', icon: '📼', desc: 'x86 emulator for retro software preservation.', installed: false, perms: ['CPU Emulation'] }
    ],

    renderExtensions(category = 'all', searchQuery = '') {
        const grid = document.getElementById('extensionsGrid');
        if (!grid) return;

        // Filter Data
        let filtered = this.extensionsData;
        if (category !== 'all') {
            filtered = filtered.filter(e => e.cat === category);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(e => e.name.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q));
        }

        grid.innerHTML = filtered.map(ext => `
            <div class="extension-card ${ext.installed ? 'installed' : ''}" onclick="G5OS.openExtensionDetail('${ext.id}')"
                 style="background:var(--bg-elevated); border:1px solid ${ext.installed ? 'var(--accent-primary)' : 'var(--border-color)'}; padding:20px; border-radius:8px; transition:all 0.3s; cursor:pointer;">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                    <span style="font-size:32px;">${ext.icon}</span>
                    <span class="ext-status" style="font-size:10px; padding:2px 8px; border:1px solid var(--border-color); border-radius:4px; margin-left:auto; color:${ext.installed ? 'var(--accent-primary)' : 'var(--text-secondary)'};">
                        ${ext.installed ? 'ACTIVE' : 'AVAILABLE'}
                    </span>
                </div>
                <h3 style="margin:0 0 5px 0; color:var(--text-primary); font-size:16px;">${ext.name}</h3>
                <div style="font-size:10px; color:var(--text-secondary); margin-bottom:8px;">${ext.author} • v${ext.version}</div>
                <p style="font-size:12px; color:var(--text-secondary); margin-bottom:15px; height:32px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${ext.desc}</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                     <span style="font-size:10px; color:#555;">${ext.perms.length} Permissions</span>
                     ${ext.installed ? '<span style="font-size:16px;">✅</span>' : '<span style="font-size:16px; opacity:0.3;">📥</span>'}
                </div>
            </div>
        `).join('');
    },

    setupMatrixListeners() {
        // Category Buttons
        document.querySelectorAll('.matrix-cat').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.matrix-cat').forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                });
                btn.classList.add('active');
                btn.style.background = 'rgba(255,255,255,0.05)';
                
                const cat = btn.dataset.cat;
                const title = btn.textContent;
                document.getElementById('matrixTitle').textContent = title;
                this.renderExtensions(cat, document.getElementById('matrixSearch').value);
            });
        });

        // Search Input
        document.getElementById('matrixSearch')?.addEventListener('input', (e) => {
             const activeCat = document.querySelector('.matrix-cat.active')?.dataset.cat || 'all';
             this.renderExtensions(activeCat, e.target.value);
        });

        // Modal Close
        document.getElementById('closeExtDetail')?.addEventListener('click', () => {
            document.getElementById('extDetailModal').classList.add('hidden');
        });
        document.querySelector('#extDetailModal .modal-backdrop')?.addEventListener('click', () => {
            document.getElementById('extDetailModal').classList.add('hidden');
        });
    },

    openExtensionDetail(id) {
        const ext = this.extensionsData.find(e => e.id === id);
        if (!ext) return;

        // Populate Modal
        document.getElementById('extDetailIcon').textContent = ext.icon;
        document.getElementById('extDetailName').textContent = ext.name;
        document.getElementById('extDetailVersion').textContent = `v${ext.version}`;
        document.getElementById('extDetailAuthor').textContent = ext.author;
        document.getElementById('extDetailDesc').textContent = ext.desc;
        
        // Populate Permissions
        const permList = document.getElementById('extDetailPerms');
        permList.innerHTML = ext.perms.map(p => `<li>${p}</li>`).join('');

        // Action Button
        const btn = document.getElementById('extDetailAction');
        this.updateDetailButton(btn, ext);

        btn.onclick = () => this.toggleExtension(id, btn);

        // Show Modal
        document.getElementById('extDetailModal').classList.remove('hidden');
    },

    updateDetailButton(btn, ext) {
        if (ext.installed) {
            btn.textContent = 'UNINSTALL';
            btn.className = 'btn btn-secondary';
        } else {
            btn.textContent = 'INSTALL MODULE';
            btn.className = 'btn btn-primary';
        }
    },

    toggleExtension(id, btn) {
        const ext = this.extensionsData.find(e => e.id === id);
        const card = document.querySelector(`.extension-card[onclick*="${id}"]`);

        if (!ext.installed) {
            // INSTALL FLOW
            btn.textContent = 'DOWNLOADING...';
            btn.disabled = true;
            this.showToast('info', `Downloading ${ext.name}...`);

            setTimeout(() => {
                ext.installed = true;
                this.updateDetailButton(btn, ext);
                btn.disabled = false;
                
                // Update functional hooks
                if (id === 'ext-py') window.hasPython = true;
                if (id === 'ext-vis') window.hasVision = true;

                this.showToast('success', `${ext.name} installed.`);
                this.logToTerminal(`[PKG] Installed: ${ext.id} | Integrity Verified`);
                if (window.G5Audio) window.G5Audio.playAccessGranted();
                
                // Refresh Grid if visible
                const activeCat = document.querySelector('.matrix-cat.active')?.dataset.cat || 'all';
                this.renderExtensions(activeCat, document.getElementById('matrixSearch').value);
            }, 1500);
        } else {
            // UNINSTALL FLOW
            ext.installed = false;
            this.updateDetailButton(btn, ext);
            
            if (id === 'ext-py') window.hasPython = false;
            if (id === 'ext-vis') window.hasVision = false;

            this.showToast('info', `${ext.name} removed.`);
            this.logToTerminal(`[PKG] Removed: ${ext.id}`);
            
            // Refresh Grid
            const activeCat = document.querySelector('.matrix-cat.active')?.dataset.cat || 'all';
            this.renderExtensions(activeCat, document.getElementById('matrixSearch').value);
        }
    },

    // ============================================
    // DYNAMIC DOCK (PHASE 5)
    // ============================================
    setupDockDragAndDrop() {
        const tabsContainer = document.querySelector('.os-tabs');
        if (!tabsContainer) return;

        const tabs = tabsContainer.querySelectorAll('.os-tab');
        
        tabs.forEach(tab => {
            tab.setAttribute('draggable', 'true');
            tab.style.cursor = 'grab';
            
            tab.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', tab.dataset.view);
                e.dataTransfer.effectAllowed = 'move';
                tab.classList.add('dragging');
                this.draggedTab = tab;
            });
            
            tab.addEventListener('dragend', () => {
                tab.classList.remove('dragging');
                this.draggedTab = null;
                this.saveDockOrder(); // Persistence
            });
            
            tab.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (this.draggedTab && this.draggedTab !== tab) {
                    const rect = tab.getBoundingClientRect();
                    const next = (e.clientX - rect.left) > (rect.width / 2);
                    if (next) {
                        tabsContainer.insertBefore(this.draggedTab, tab.nextSibling);
                    } else {
                        tabsContainer.insertBefore(this.draggedTab, tab);
                    }
                }
            });
        });
        
        this.logToTerminal('[UI] Dynamic Dock Layout unlocked');
    },

    saveDockOrder() {
        // Simulating persistence
        // const order = Array.from(document.querySelectorAll('.os-tab')).map(t => t.dataset.view);
        // localStorage.setItem('g5_dock_order', JSON.stringify(order));
        this.showToast('info', 'Dock Layout Saved');
    },

    // ============================================
    // PERSISTENCE & REAL MODE CONFIG
    // ============================================
    loadState() {
        console.log('⬡ G5 OS | LOADING DATA MATRIX...');
        
        // 1. API Configuration
        const apiKey = localStorage.getItem('GOOGLE_API_KEY');
        const forceSim = localStorage.getItem('G5_FORCE_SIM') === 'true';
        
        const keyInput = document.getElementById('googleApiKey');
        const simToggle = document.getElementById('evolutionMode');
        
        if (keyInput) keyInput.value = apiKey || '';
        if (simToggle) simToggle.checked = !forceSim; // Evolution Mode = !Simulation Mode

        // 2. Chat History
        const savedHistory = localStorage.getItem('g5_chat_history');
        if (savedHistory) {
            this.state.chatHistory = JSON.parse(savedHistory);
            // Optional: Render last few messages
        }

        // 3. Assets
        const savedAssets = localStorage.getItem('g5_assets');
        if (savedAssets) {
            this.state.assets = JSON.parse(savedAssets);
            this.renderVault();
        }

        // 4. Operator Profile
        const profile = localStorage.getItem('g5_operator_profile');
        if (profile) {
            const data = JSON.parse(profile);
            this.state.operator = data;
            const profileNameInput = document.getElementById('profileName');
            const profileRoleInput = document.getElementById('profileRole');
            if (profileNameInput) profileNameInput.value = data.name;
            if (profileRoleInput) profileRoleInput.value = data.role;
            
            const osUser = document.querySelector('.os-user');
            if (osUser) osUser.textContent = `OPERATOR: ${data.name.toUpperCase()}`;
        }

        // 5. Media Foundry Settings
        const foundry = localStorage.getItem('g5_foundry_settings');
        if (foundry) {
            this.state.foundry = JSON.parse(foundry);
            // Sync with UI
            const f = this.state.foundry;
            if (document.getElementById('imgAspectRatio')) document.getElementById('imgAspectRatio').value = f.imgAspectRatio;
            if (document.getElementById('imgSafety')) document.getElementById('imgSafety').value = f.imgSafety;
            if (document.getElementById('imgStyle')) document.getElementById('imgStyle').value = f.imgStyle;
            if (document.getElementById('veoFps')) document.getElementById('veoFps').value = f.veoFps;
            if (document.getElementById('veoDuration')) document.getElementById('veoDuration').value = f.veoDuration;
            if (document.getElementById('ttsVoice')) document.getElementById('ttsVoice').value = f.ttsVoice;
            if (document.getElementById('ttsSpeed')) {
                document.getElementById('ttsSpeed').value = f.ttsSpeed;
                document.getElementById('ttsSpeedVal').textContent = f.ttsSpeed + 'x';
            }
            if (document.getElementById('ttsAutoPlay')) document.getElementById('ttsAutoPlay').checked = f.ttsAutoPlay;
        }
    },

    saveState() {
        localStorage.setItem('g5_chat_history', JSON.stringify(this.state.chatHistory));
        localStorage.setItem('g5_assets', JSON.stringify(this.state.assets));
        if (this.state.operator) {
            localStorage.setItem('g5_operator_profile', JSON.stringify(this.state.operator));
        }
        localStorage.setItem('g5_foundry_settings', JSON.stringify(this.state.foundry));
    },

    saveFoundrySettings() {
        const f = this.state.foundry;
        f.imgAspectRatio = document.getElementById('imgAspectRatio').value;
        f.imgSafety = document.getElementById('imgSafety').value;
        f.imgStyle = document.getElementById('imgStyle').value;
        f.veoFps = document.getElementById('veoFps').value;
        f.veoDuration = document.getElementById('veoDuration').value;
        f.ttsVoice = document.getElementById('ttsVoice').value;
        f.ttsSpeed = parseFloat(document.getElementById('ttsSpeed').value);
        f.ttsAutoPlay = document.getElementById('ttsAutoPlay').checked;
        
        this.saveState();
        this.showToast('info', 'MEDIA_FOUNDry_SYNC: OK');
        this.logToTerminal(`[FOUNDRY] Enterprise Parameters Synchronized.`);
    },

    saveApiSettings() {
        const key = document.getElementById('googleApiKey').value.trim();
        const evolutionActive = document.getElementById('evolutionMode').checked;
        
        localStorage.setItem('GOOGLE_API_KEY', key);
        localStorage.setItem('G5_FORCE_SIM', (!evolutionActive).toString());
        
        if (window.G5_API) {
            G5_API.forceSimulation = !evolutionActive;
        }
        
        this.showToast('success', 'API Configuration Synchronized');
        this.logToTerminal(`[SYSTEM] API Matrix Updated. Mode: ${evolutionActive ? 'LIVE' : 'SIMULATION'}`);
        
        if (key && evolutionActive) {
            this.testApiConnection();
        }
    },

    // Override setupEventListeners to include new listeners
    // (I will actually just add them to the existing setupEventListenersChunk)

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
