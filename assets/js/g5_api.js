/**
 * AGENTICUM G5 | API CLIENT V2.0
 * Connection layer to the Cloud Reasoning Kernel
 */

const G5_API = {
    // Production endpoint (Firebase Functions)
    ENDPOINT: 'https://us-central1-tutorai-e39uu.cloudfunctions.net/agenticSwarm',
    HEALTH_ENDPOINT: 'https://us-central1-tutorai-e39uu.cloudfunctions.net/healthCheck',
    
    // Local development endpoint
    LOCAL_ENDPOINT: 'http://localhost:5001/tutorai-e39uu/us-central1/agenticSwarm',
    
    // Use production by default
    useLocal: false,
    
    getEndpoint() {
        return this.useLocal ? this.LOCAL_ENDPOINT : this.ENDPOINT;
    },
    
    /**
     * Send a command to the G5 reasoning cluster
     * @param {string} command - The command/prompt to execute
     * @param {string} context - Optional context for the command
     * @returns {Promise<Object>} - The G5 response
     */
    async execute(command, context = null) {
        const endpoint = this.getEndpoint();
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    command: command,
                    context: context
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('G5 API Error:', error);
            return {
                system_status: 'CONNECTION_ERROR',
                error: error.message,
                response: `[CONNECTION ERROR] Unable to reach the reasoning cluster. The system may be initializing or you may be offline.`,
                metadata: {
                    mode: 'OFFLINE',
                    timestamp: new Date().toISOString()
                }
            };
        }
    },
    
    /**
     * Check system health
     * @returns {Promise<Object>} - Health status
     */
    async healthCheck() {
        try {
            const response = await fetch(this.HEALTH_ENDPOINT);
            return await response.json();
        } catch (error) {
            return { status: 'OFFLINE', error: error.message };
        }
    },
    
    /**
     * Stream a command for real-time output
     * (Future implementation for streaming responses)
     */
    async stream(command, onChunk) {
        // Fallback to regular execute for now
        const result = await this.execute(command);
        if (onChunk && result.response) {
            // Simulate streaming by chunking the response
            const words = result.response.split(' ');
            for (const word of words) {
                onChunk(word + ' ');
                await new Promise(r => setTimeout(r, 30));
            }
        }
        return result;
    }
};

/**
 * G5 Terminal Integration
 * Adds AI-powered command processing to the dashboard
 */
const G5Terminal = {
    isProcessing: false,
    commandHistory: [],
    historyIndex: -1,
    
    /**
     * Process a free-form AI command
     */
    async processAICommand(input) {
        if (this.isProcessing) {
            writeToTerminal('[BUSY] Another command is being processed...', 'warn');
            return;
        }
        
        this.isProcessing = true;
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;
        
        // Show processing state
        writeToTerminal(`[COMMAND] ${input}`, 'info');
        log('Transmitting to Reasoning Cluster...', 'node');
        
        // Activate visual nodes
        const nodesToActivate = ['SN-00', 'SP-01', 'RA-01', 'CC-01'];
        nodesToActivate.forEach(id => activateNode(id));
        
        if (visualizer) {
            visualizer.triggerPulse();
        }
        
        // Update operation card
        const opCard = document.getElementById('active-op-card');
        if (opCard) {
            opCard.classList.add('visible');
            opCard.querySelector('.op-id').innerText = 'OP-ID: AI_QUERY';
            opCard.querySelector('.op-status').innerText = 'PROCESSING';
            opCard.querySelector('.op-status').className = 'op-status working';
            opCard.querySelector('.op-content p').innerHTML = 'Reasoning cluster active...';
        }
        
        try {
            const result = await G5_API.execute(input);
            
            // Process the response
            if (result.system_status === 'NOMINAL' || result.system_status === 'SIMULATION') {
                // Show reasoning trace
                if (result.reasoning_trace) {
                    writeToTerminal('', 'normal');
                    writeToTerminal('// REASONING_TRACE:', 'info');
                    result.reasoning_trace.forEach(trace => {
                        writeToTerminal(`  [${trace.node}] ${trace.status}`, 'node');
                        if (visualizer) visualizer.triggerPulse();
                    });
                }
                
                // Show the AI response
                writeToTerminal('', 'normal');
                writeToTerminal('// RESPONSE:', 'success');
                
                // Split response into lines for better display
                const lines = result.response.split('\n');
                lines.forEach(line => {
                    if (line.trim()) {
                        writeToTerminal(line, 'normal');
                    }
                });
                
                // Show metadata
                if (result.metadata) {
                    writeToTerminal('', 'normal');
                    writeToTerminal(`[MODE: ${result.metadata.mode}] [TIME: ${result.processing_time_ms || 'N/A'}ms]`, 'info');
                }
                
                log(`Command completed: ${result.trace_id}`, 'success');
                
                // Update operation card
                if (opCard) {
                    opCard.querySelector('.op-status').innerText = 'COMPLETED';
                    opCard.querySelector('.op-status').className = 'op-status live';
                    opCard.querySelector('.op-content p').innerText = 'Execution successful.';
                }
                
            } else {
                writeToTerminal(`[ERROR] ${result.error || result.message || 'Unknown error'}`, 'error');
                log('Execution failed', 'error');
            }
            
        } catch (error) {
            writeToTerminal(`[CRITICAL] ${error.message}`, 'error');
            log('Critical failure', 'error');
        } finally {
            // Deactivate nodes
            nodesToActivate.forEach(id => deactivateNode(id));
            this.isProcessing = false;
        }
    }
};

// Make available globally
window.G5_API = G5_API;
window.G5Terminal = G5Terminal;
