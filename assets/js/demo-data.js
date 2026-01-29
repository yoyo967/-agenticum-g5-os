/**
 * AGENTICUM G5 | DEMO DATA V1.0
 * High-fidelity simulation data for Hybrid Mode.
 * Ensures "Jury-Safe" demos even without API connectivity.
 */

const G5_DEMO_DATA = {
    // SCENARIO: ENERGY DRINK LAUNCH
    "launch campaign": {
        system_status: "NOMINAL",
        reasoning_trace: [
            { node: "SN-00", status: "Mission Objective: Market Penetration Strategy", name: "Orchestrator" },
            { node: "RA-06", status: "Analyzing 12 competitor brands (Red Bull, Monster, Celsius)", name: "Trend Forecaster" },
            { node: "SP-01", status: "Defining positioning: 'Sustainable Energy for Gen Z'", name: "Campaign Strategist" },
            { node: "CC-01", status: "Drafting copy assets...", name: "Copy Chief" },
            { node: "MI-01", status: "Compliance Check: FDA Guidelines Verified", name: "Compliance Officer" }
        ],
        response: `**[MISSION COMPLETE] LAUNCH DOSSIER GENERATED**

**1. STRATEGIC POSITIONING**
"Organic Velocity" - Positioning the product not just as energy, but as cognitive fuel for creators.
*   **Target Audience:** Gen Z / Alpha Creators (Age 18-24)
*   **Key Insight:** They reject "crash" energy; they want sustained focus.

**2. CORE MESSAGING PILLARS**
*   *Clean Fuel:* 0% Sugar, 100% Focus.
*   *Creator Economy:* "Edit faster. Stream longer."
*   *Sustainability:* Aluminum-free, biodegradable packaging.

**3. CAMPAIGN ASSETS (READY)**
*   **Slogan:** "Don't just wake up. Boot up."
*   **Social Hook:** "Your latency just hit zero. #OrganicVelocity"
*   **Email Subject:** "The end of the caffeine crash."

**4. 52-NODE CONSENSUS**
Strategy approved by [SP-01], Validated by [RA-06], Cleared by [MI-01].
Ready for execution via AdManager API.`,
        metadata: {
            mode: "SIMULATION (GOLDEN SAMPLE)",
            latency: "1.2s",
            tokens: "854",
            cost: "$0.0042",
            model: "gemini-1.5-pro-preview-0514"
        }
    },

    // SCENARIO: COMPETITOR ANALYSIS
    "analyze competitor": {
        system_status: "NOMINAL",
        reasoning_trace: [
            { node: "RA-01", status: "Scanning public filings & social sentiment", name: "Authority Auditor" },
            { node: "RA-06", status: "Detecting weakness in supply chain", name: "Trend Forecaster" },
            { node: "SP-03", status: "Formulating counter-strategy", name: "Growth Hacker" }
        ],
        response: `**[INTELLIGENCE REPORT] COMPETITOR: APEX-CORP**

**VULNERABILITY DETECTED**
Sentiment analysis reveals 42% decrease in brand trust due to recent "greenwashing" scandal.

**RECOMMENDED COUNTER-MOVE**
Launch "Radical Transparency" campaign immediately.
1.  Publish our supply chain data on blockchain.
2.  Challenge Apex-Corp to do the same.
3.  Leverage [RA-01] to monitor fallout.

**PREDICTED OUTCOME**
+15% Market Share shift within Q1 2026.`,
        metadata: {
            mode: "SIMULATION (GOLDEN SAMPLE)",
            latency: "0.8s",
            tokens: "612",
            cost: "$0.0031",
            model: "gemini-1.5-flash"
        }
    }
};

window.G5_DEMO_DATA = G5_DEMO_DATA;
