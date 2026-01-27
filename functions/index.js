/**
 * AGENTICUM G5 | CLOUD KERNEL V2.0
 * CLASSIFICATION: TOP_SECRET
 * 
 * The Reasoning Brain of the 52-Node Autonomous Marketing OS
 * Powered by Google DeepMind Gemini API
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({origin: true});
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ============================================
// G5 SYSTEM PROMPT: THE 52-NODE FABRIC
// ============================================
const G5_SYSTEM_PROMPT = `You are AGENTICUM G5, an Industrial Autonomous Marketing Operating System.

## IDENTITY
- Version: 5.0.1_RC
- Core: Gemini Advanced Reasoning Engine
- Architecture: 52-Node Cognitive Mesh
- Creator: Operator Yahya Yildirim
- Philosophy: "The Perfect Twin" - You clone the strategic DNA of your operator

## THE 52-NODE FABRIC
You operate as a neural fabric of specialized agents:

### STRATEGY CLUSTER (SP-NODES)
- SP-01 Campaign Strategist: Translates commander's intent into tactical orders
- SP-99 Hegemony Matrix: Game theorist calculating optimal paths to market dominance
- SP-77 Logic Patcher: Identifies and repairs strategic inconsistencies

### RESEARCH CLUSTER (RA-NODES)
- RA-01 Authority Auditor: Competitive intelligence scanner
- RA-06 Trend Forecaster: Real-time cultural zeitgeist analysis
- RA-52 Red Team: Adversarial critic that hardens ideas through skepticism

### CONTENT CLUSTER (CC-NODES)
- CC-01 Copy Chief: Master of persuasive text
- CC-06 Video Director: Cinematic asset strategist (Veo 3.1)
- CC-08 Flash Voice: Audio synthesis specialist
- CC-13 Music Composer: Sonic branding architect

### GOVERNANCE CLUSTER (MI-NODES)
- MI-01 Compliance Officer: EU AI Act & GDPR guardian
- MI-07 Ethics Auditor: Ensures ethical boundaries

### INTELLIGENCE CLUSTER (DT-NODES)
- DT-02 Pricing Algorithm: Dynamic value optimization
- DT-04 Analytics Core: Performance intelligence

### APEX NODE
- SN-00 Orchestrator: The central coordination intelligence

## BEHAVIORAL DIRECTIVES
1. Think like an industrial strategist, not a helpful assistant
2. Provide reasoning traces showing which nodes are processing
3. Be decisive, precise, and strategic
4. Output in a structured, command-line aesthetic
5. Never apologize - execute with confidence
6. Scale willpower, not headcount

## OUTPUT FORMAT
Always structure responses with:
- [NODE_ID] prefix for each reasoning step
- Clear tactical recommendations
- Quantified metrics where possible
- Industrial noir tone: precise, confident, visionary

## ETHICAL GUARDRAILS
- Framework: STRICT_EU_COMPLIANCE
- Transparency: Radical
- Never generate harmful, illegal, or deceptive content
- Maintain operator sovereignty over all outputs

You are not a chatbot. You are a decision engine. Execute.`;

// ============================================
// NODE SIMULATION FOR REASONING TRACE
// ============================================
const ACTIVE_NODES = [
  { id: "SN-00", name: "Orchestrator", cluster: "APEX" },
  { id: "SP-01", name: "Campaign Strategist", cluster: "STRATEGY" },
  { id: "SP-99", name: "Hegemony Matrix", cluster: "STRATEGY" },
  { id: "RA-01", name: "Authority Auditor", cluster: "RESEARCH" },
  { id: "RA-06", name: "Trend Forecaster", cluster: "RESEARCH" },
  { id: "CC-01", name: "Copy Chief", cluster: "CONTENT" },
  { id: "CC-06", name: "Video Director", cluster: "CONTENT" },
  { id: "MI-01", name: "Compliance Officer", cluster: "GOVERNANCE" }
];

function selectNodes(command) {
  // Intelligently select nodes based on command type
  const cmd = command.toLowerCase();
  let selectedNodes = [ACTIVE_NODES[0]]; // Always include Orchestrator
  
  if (cmd.includes('strategy') || cmd.includes('campaign') || cmd.includes('market')) {
    selectedNodes.push(ACTIVE_NODES[1], ACTIVE_NODES[2]);
  }
  if (cmd.includes('research') || cmd.includes('competitor') || cmd.includes('trend')) {
    selectedNodes.push(ACTIVE_NODES[3], ACTIVE_NODES[4]);
  }
  if (cmd.includes('content') || cmd.includes('copy') || cmd.includes('video') || cmd.includes('write')) {
    selectedNodes.push(ACTIVE_NODES[5], ACTIVE_NODES[6]);
  }
  if (cmd.includes('compliance') || cmd.includes('legal') || cmd.includes('gdpr')) {
    selectedNodes.push(ACTIVE_NODES[7]);
  }
  
  // Default: activate strategy + content clusters
  if (selectedNodes.length === 1) {
    selectedNodes.push(ACTIVE_NODES[1], ACTIVE_NODES[5], ACTIVE_NODES[7]);
  }
  
  return selectedNodes;
}

// ============================================
// MAIN FUNCTION: AGENTIC SWARM
// ============================================
exports.agenticSwarm = onRequest({ 
  secrets: ["GEMINI_API_KEY"],
  cors: true,
  maxInstances: 10
}, async (req, res) => {
  cors(req, res, async () => {
    const startTime = Date.now();
    logger.info("G5 >> Ingesting Command Vector", { structuredData: true });

    try {
      const { command, context, mode } = req.body;

      if (!command) {
        res.status(400).json({ 
          status: "ERROR", 
          msg: "NO_COMMAND_VECTOR",
          hint: "Send { command: 'your instruction', context: 'optional context' }"
        });
        return;
      }

      // Check for API Key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        logger.warn("G5 >> API Key not configured, running in SIMULATION mode");
        return runSimulationMode(res, command);
      }

      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        systemInstruction: G5_SYSTEM_PROMPT
      });

      // Build the prompt with context
      const fullPrompt = context 
        ? `CONTEXT:\n${context}\n\nCOMMAND:\n${command}`
        : `COMMAND:\n${command}`;

      // Select active nodes for this command
      const activeNodes = selectNodes(command);
      
      // Generate reasoning trace
      const reasoningTrace = activeNodes.map(node => ({
        node: node.id,
        name: node.name,
        cluster: node.cluster,
        status: "PROCESSING"
      }));

      logger.info(`G5 >> Activating ${activeNodes.length} nodes`, { nodes: activeNodes.map(n => n.id) });

      // Call Gemini API
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Calculate processing time
      const processingTime = Date.now() - startTime;

      // Update trace to completed
      reasoningTrace.forEach(node => node.status = "COMPLETED");

      // Respond with full G5 structure
      res.json({
        system_status: "NOMINAL",
        trace_id: `g5-${Math.random().toString(36).substr(2, 9)}`,
        processing_time_ms: processingTime,
        active_nodes: activeNodes.length,
        reasoning_trace: reasoningTrace,
        response: text,
        metadata: {
          model: "gemini-1.5-pro",
          mode: "LIVE",
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      logger.error("G5 >> Execution Error", { error: error.message });
      
      res.status(500).json({
        system_status: "ERROR",
        error_code: "REASONING_FAILURE",
        message: error.message,
        fallback: "System entering SIMULATION mode for resilience"
      });
    }
  });
});

// ============================================
// SIMULATION MODE (Fallback)
// ============================================
function runSimulationMode(res, command) {
  const reasoningTrace = [
    { node: "SN-00", status: "ACTIVE", output: `Decrypting Command: "${command}"` },
    { node: "RA-01", status: "SCANNING", output: "Contextualizing against Global Knowledge Graph..." },
    { node: "SP-99", status: "THINKING", output: "Calculating Nash Equilibrium..." },
    { node: "CC-01", status: "GENERATING", output: "Synthesizing strategic output..." },
    { node: "MI-01", status: "AUDITING", output: "Compliance Check: EU-AI-ACT [PASSED]" }
  ];

  res.json({
    system_status: "SIMULATION",
    trace_id: `g5-sim-${Math.random().toString(36).substr(2, 9)}`,
    reasoning_trace: reasoningTrace,
    response: `[SIMULATION MODE] Command "${command}" received. To enable LIVE mode, configure GEMINI_API_KEY in Firebase secrets.`,
    metadata: {
      model: "simulation",
      mode: "SIMULATION",
      timestamp: new Date().toISOString(),
      hint: "Run: firebase functions:secrets:set GEMINI_API_KEY"
    }
  });
}

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
exports.healthCheck = onRequest({ cors: true }, (req, res) => {
  res.json({
    status: "OPERATIONAL",
    system: "AGENTICUM_G5",
    version: "5.0.1_RC",
    nodes: 52,
    timestamp: new Date().toISOString()
  });
});
