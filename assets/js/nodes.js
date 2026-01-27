const SCENARIOS = {
    'SELL_SAND': [
        { node: 'SN-00', action: 'PROTOCOL_INIT', msg: 'Ingesting "Sell Sand in Desert" context.' },
        { node: 'RA-06', action: 'SCAN', msg: 'Analyzing luxury scarcity trends in Middle East.' },
        { node: 'ED-99', action: 'RETRIEVE', msg: 'Fetching historical data on "Bottled Air" campaigns.' },
        { node: 'SP-01', action: 'STRATEGY', msg: 'Defining Brand: "Dune Dust" - The Essence of Time.' },
        { node: 'SP-99', action: 'GAME_THEORY', msg: 'Calculating scarcity coefficients. Optimal Supply: 500 units.' },
        { node: 'CC-10', action: 'DESIGN', msg: 'Generating minimal packaging assets (Obsidian glass).' },
        { node: 'CC-01', action: 'COPY', msg: 'Writing manifesto: "You don\'t buy sand. You buy eternity."' },
        { node: 'DT-02', action: 'PRICING', msg: 'Setting price point: $500/kg (Artisan Grade).' },
        { node: 'MI-01', action: 'AUDIT', msg: 'Verifying sustainability claims. APPROVED.' },
        { node: 'SN-00', action: 'COMPLETE', msg: 'Operation successful. Assets ready for deployment.' }
    ],
    'CRISIS_MGMT': [
        { node: 'RA-03', action: 'ALERT', msg: 'Negative Sentiment Spike detected (Twitter/X). Topic: "Greenwashing".' },
        { node: 'SN-00', action: 'OVERRIDE', msg: 'Initiating DEFCON 3 Protocol. Pausing all outbound ads.' },
        { node: 'RA-05', action: 'DEEP_SCAN', msg: 'Tracing origin of rumor to 3 bot accounts.' },
        { node: 'SP-77', action: 'LOGIC_PATCH', msg: 'Formulating counter-narrative: "Radical Transparency".' },
        { node: 'CC-01', action: 'DRAFT', msg: 'Drafting CEO Apology / Fact Sheet.' },
        { node: 'CC-06', action: 'RENDER', msg: 'Generating video statement (Tone: Humble, Direct).' },
        { node: 'MI-02', action: 'ETHICS', msg: 'Validating truthfulness of response.' },
        { node: 'DT-03', action: 'BOOST', msg: 'Allocating budget to "Truth Campaign" keywords.' },
        { node: 'SN-00', action: 'RESOLVE', msg: 'Sentiment slope stabilizing. Monitoring.' }
    ],
    'VIRAL_LOOP': [
        { node: 'RA-04', action: 'VIBE_CHECK', msg: 'Trend Detected: "Retro Futurism" + "Synthwave".' },
        { node: 'SP-33', action: 'GROWTH', msg: 'Designing Referral Loop: "Unlock the Vault".' },
        { node: 'CC-13', action: 'COMPOSE', msg: 'Generating audio track: 120bpm Industrial Bass.' },
        { node: 'CC-09', action: 'ANIMATE', msg: 'Creating 15s looping gltf asset.' },
        { node: 'CC-02', action: 'HOOK', msg: 'Generating 50 variations of TikTok hooks.' },
        { node: 'RA-52', action: 'ATTACK', msg: 'Simulating algorithm suppression. Optimize for retention > 3s.' },
        { node: 'SN-00', action: 'DEPLOY', msg: 'Pushing to 5 platforms simultaneously.' }
    ]
};

const SYSTEM_NODES = [
    // CLUSTER 0: APEX
    { id: 'SN-00', name: 'The Orchestrator', type: 'APEX', status: 'idle' },
    
    // CLUSTER 1: STRATEGY (SP)
    { id: 'SP-01', name: 'Campaign Strategist', type: 'STRATEGY', status: 'idle' },
    { id: 'SP-10', name: 'Brand Architect', type: 'STRATEGY', status: 'idle' },
    { id: 'SP-33', name: 'Growth Hacker', type: 'STRATEGY', status: 'idle' },
    { id: 'SP-77', name: 'Logic Patcher', type: 'STRATEGY', status: 'idle' },
    { id: 'SP-99', name: 'Hegemony Matrix', type: 'STRATEGY', status: 'idle' },

    // CLUSTER 2: INTELLIGENCE (RA)
    { id: 'RA-01', name: 'Authority Auditor', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-02', name: 'SEO Forensic', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-03', name: 'Sentiment Analyst', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-04', name: 'Cultural Decoder', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-05', name: 'The Mole', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-06', name: 'Trend Forecaster', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-07', name: 'Keyword Sniper', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-08', name: 'Data Miner', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-09', name: 'Behavioral Profiler', type: 'INTELLIGENCE', status: 'idle' },
    { id: 'RA-52', name: 'The Red Team', type: 'INTELLIGENCE', status: 'idle' },

    // CLUSTER 3: CREATION (CC)
    { id: 'CC-01', name: 'Copy Chief', type: 'CREATION', status: 'idle' },
    { id: 'CC-02', name: 'Social Sniper', type: 'CREATION', status: 'idle' },
    { id: 'CC-03', name: 'Script Writer', type: 'CREATION', status: 'idle' },
    { id: 'CC-04', name: 'UX Writer', type: 'CREATION', status: 'idle' },
    { id: 'CC-05', name: 'Email Architect', type: 'CREATION', status: 'idle' },
    { id: 'CC-06', name: 'Video Director', type: 'CREATION', status: 'idle' },
    { id: 'CC-07', name: 'Cinematographer', type: 'CREATION', status: 'idle' },
    { id: 'CC-08', name: 'Editor & Cutter', type: 'CREATION', status: 'idle' },
    { id: 'CC-09', name: 'Animator', type: 'CREATION', status: 'idle' },
    { id: 'CC-10', name: 'Art Director', type: 'CREATION', status: 'idle' },
    { id: 'CC-11', name: 'Graphic Designer', type: 'CREATION', status: 'idle' },
    { id: 'CC-12', name: 'Audio Engineer', type: 'CREATION', status: 'idle' },
    { id: 'CC-13', name: 'Music Composer', type: 'CREATION', status: 'idle' },
    { id: 'CC-14', name: 'Voice Actor', type: 'CREATION', status: 'idle' },
    { id: 'CC-15', name: '3D Modeler', type: 'CREATION', status: 'idle' },
    { id: 'CC-16', name: 'Code Poet', type: 'CREATION', status: 'idle' },
    { id: 'CC-17', name: 'Backend Smith', type: 'CREATION', status: 'idle' },
    { id: 'CC-18', name: 'API Weaver', type: 'CREATION', status: 'idle' },
    { id: 'CC-19', name: 'Database Architect', type: 'CREATION', status: 'idle' },
    { id: 'CC-20', name: 'Prompt Engineer', type: 'CREATION', status: 'idle' },

    // CLUSTER 4: GOVERNANCE (MI)
    { id: 'MI-01', name: 'Compliance Officer', type: 'GOVERNANCE', status: 'idle' },
    { id: 'MI-02', name: 'Ethics Guard', type: 'GOVERNANCE', status: 'idle' },
    { id: 'MI-03', name: 'Diversity Officer', type: 'GOVERNANCE', status: 'idle' },
    { id: 'MI-04', name: 'Fact Checker', type: 'GOVERNANCE', status: 'idle' },
    { id: 'MI-05', name: 'Brand Guardian', type: 'GOVERNANCE', status: 'idle' },

    // CLUSTER 5: FINANCE (DT)
    { id: 'DT-01', name: 'Unit Economist', type: 'FINANCE', status: 'idle' },
    { id: 'DT-02', name: 'Pricing Algorithm', type: 'FINANCE', status: 'idle' },
    { id: 'DT-03', name: 'Ad-Spend Optimizer', type: 'FINANCE', status: 'idle' },
    { id: 'DT-04', name: 'ROI Calculator', type: 'FINANCE', status: 'idle' },
    { id: 'DT-05', name: 'Blockchain Verifier', type: 'FINANCE', status: 'idle' },

    // CLUSTER 6: EDUCATION (ED)
    { id: 'ED-01', name: 'The Autodidact', type: 'EDUCATION', status: 'idle' },
    { id: 'ED-02', name: 'KB Manager', type: 'EDUCATION', status: 'idle' },
    { id: 'ED-03', name: 'Curriculum Designer', type: 'EDUCATION', status: 'idle' },
    { id: 'ED-42', name: 'The Mentor', type: 'EDUCATION', status: 'idle' },
    { id: 'ED-99', name: 'The Archivist', type: 'EDUCATION', status: 'idle' },

    // CLUSTER 7: SPECIAL OPS (PS)
    { id: 'PS-00', name: 'The Ghost', type: 'SPECIAL_OPS', status: 'idle' }
];
