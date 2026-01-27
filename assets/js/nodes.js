/**
 * AGENTICUM G5 | NODE REGISTRY
 * 
 * 52 Nodes of the Industrial Fabric.
 */

const SYSTEM_NODES = [
    { id: 'SN-00', name: 'CORE_ORCHESTRATOR', type: 'ROOT', cluster: 'STRATEGY' },
    { id: 'SP-01', name: 'STRATEGIC_PLANNER', type: 'AGENT', cluster: 'STRATEGY' },
    { id: 'SP-10', name: 'MARKET_FORENSICS', type: 'AGENT', cluster: 'STRATEGY' },
    { id: 'SP-33', name: 'HEGEMONY_MATRIX', type: 'AGENT', cluster: 'STRATEGY' },
    { id: 'SP-77', name: 'LOGIC_PATCHER', type: 'AGENT', cluster: 'STRATEGY' },
    { id: 'SP-99', name: 'GOAL_CALIBRATOR', type: 'AGENT', cluster: 'STRATEGY' },
    
    { id: 'RA-01', name: 'AUTHORITY_AUDITOR', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-02', name: 'PATTERN_RECOG_02', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-03', name: 'COMPETITOR_SCAN', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-04', name: 'TREND_FORECASTER', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-05', name: 'SENTIMENT_ENGINE', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-06', name: 'TRUTH_GROUNDING', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-07', name: 'GCP_RESOURCES', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-08', name: 'COMPLIANCE_BOT', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-09', name: 'THE_RED_TEAM', type: 'INTEL', cluster: 'ANALYSIS' },
    { id: 'RA-52', name: 'FINAL_AUDIT', type: 'INTEL', cluster: 'ANALYSIS' },

    { id: 'CC-01', name: 'COPY_CHIEF', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-02', name: 'MANIFESTO_GEN', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-03', name: 'SOCIAL_HOOKS', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-04', name: 'NEWSLETTER_OPS', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-05', name: 'BLOG_SYNTHESIS', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-06', name: 'VEO_DIRECTOR', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-07', name: 'IMAGEN_ARTIST', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-08', name: 'FLASH_VOICE', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-09', name: 'MUSIC_COMPOSER', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-10', name: 'UX_DESIGNER', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-11', name: 'AD_STRATEGIST', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-12', name: 'VIDEO_EDITOR', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-13', name: 'BRAND_VOICE', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-14', name: 'STORYBOARD_GEN', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-15', name: 'TRANSLATE_EN', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-16', name: 'TRANSLATE_DE', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-17', name: 'SEO_OPTIMIZER', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-18', name: 'CTR_MAXIMIZER', type: 'CREATIVE', cluster: 'CONTENT' },
    { id: 'CC-19', name: 'VIRAL_ENG_01', type: 'CREATIVE', cluster: 'CONTENT' },

    { id: 'MT-01', name: 'METRIC_TRACKER', type: 'MONITOR', cluster: 'OPS' },
    { id: 'MT-02', name: 'KPI_DASHBOARD', type: 'MONITOR', cluster: 'OPS' },
    { id: 'MT-03', name: 'BUDGET_WATCH', type: 'MONITOR', cluster: 'OPS' },
    { id: 'MT-04', name: 'LATENCY_MAP', type: 'MONITOR', cluster: 'OPS' },
    { id: 'MT-05', name: 'SYSTEM_HEALTH', type: 'MONITOR', cluster: 'OPS' },

    { id: 'PS-00', name: 'PSY_OPS_CENTRAL', type: 'CORE', cluster: 'STRATEGY' },
    { id: 'DT-01', name: 'DATA_TRAFFICKER', type: 'CORE', cluster: 'OPS' },
    { id: 'DT-02', name: 'ENCLAVE_PROXY', type: 'CORE', cluster: 'OPS' },
    { id: 'DT-03', name: 'SOVEREIGN_GATE', type: 'CORE', cluster: 'OPS' },
    { id: 'DT-04', name: 'EU_ACT_SHIELD', type: 'CORE', cluster: 'OPS' }
];
