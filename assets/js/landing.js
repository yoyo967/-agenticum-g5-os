/**
 * AGENTICUM G5 | LANDING PAGE LOGIC V2.1
 */

document.addEventListener('DOMContentLoaded', () => {
    initLandingTerminal();
    initManifestoTyping();
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function initLandingTerminal() {
    const term = document.getElementById('landing-terminal');
    if (!term) return;

    const lines = [
        { text: 'AGENTICUM_G5_CORE_BOOT: INITIALIZING...', type: 'info', delay: 0 },
        { text: 'LOADING_GEMINI_3_PRO_CONTEXT[2M_TOKENS]... OK', type: 'success', delay: 800 },
        { text: 'ATTACHING_52_NEURAL_NODES... OK', type: 'success', delay: 600 },
        { text: 'SCANNING_TARGET: GLOBAL_MARKET_HEGEMONY', type: 'warn', delay: 700 },
        { text: 'REASONING_CLUSTER: OPERATIONAL', type: 'info', delay: 500 },
        { text: 'MISSION_OBJECTIVE: LICENSE_A_CIVILIZATION', type: 'success', delay: 600 },
        { text: 'SYSTEM_STATUS: MAXIMUM_EXCELLENCE', type: 'success', delay: 800 },
        { text: 'AWAITING_OPERATOR_INPUT...', type: 'info', delay: 1200 }
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = null;
    
    const cursor = term.querySelector('.cursor');
    
    function typeCharacter() {
        if (lineIndex >= lines.length) {
            // Animation complete
            return;
        }
        
        const lineData = lines[lineIndex];
        
        if (!currentLine) {
            // Create new line element
            currentLine = document.createElement('div');
            currentLine.className = `line ${lineData.type || ''}`;
            currentLine.innerHTML = `<span class="prompt">&gt;</span> `;
            
            if (cursor) {
                term.insertBefore(currentLine, cursor);
            } else {
                term.appendChild(currentLine);
            }
        }
        
        if (charIndex < lineData.text.length) {
            // Type next character
            const char = lineData.text.charAt(charIndex);
            currentLine.innerHTML = `<span class="prompt">&gt;</span> ${lineData.text.substring(0, charIndex + 1)}<span class="typing-cursor">▌</span>`;
            charIndex++;
            
            // Variable typing speed for realism
            const delay = char === ' ' ? 30 : (Math.random() * 20 + 15);
            setTimeout(typeCharacter, delay);
        } else {
            // Line complete, remove typing cursor
            currentLine.innerHTML = `<span class="prompt">&gt;</span> ${lineData.text}`;
            currentLine = null;
            charIndex = 0;
            lineIndex++;
            
            term.scrollTop = term.scrollHeight;
            
            // Wait before next line
            if (lineIndex < lines.length) {
                setTimeout(typeCharacter, lines[lineIndex].delay || 500);
            }
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 800);
}

function initManifestoTyping() {
    const lead = document.querySelector('.manifesto-lead');
    if (!lead) return;

    const text = "We have pulverized the era of tools.";
    lead.innerText = '';
    let i = 0;

    const type = () => {
        if (i < text.length) {
            lead.innerText += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    };

    // Trigger when in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            type();
            observer.disconnect();
        }
    });

    observer.observe(lead);
}
