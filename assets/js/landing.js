/**
 * AGENTICUM G5 | LANDING PAGE LOGIC V2.0
 */

document.addEventListener('DOMContentLoaded', () => {
    initLandingTerminal();
    initManifestoTyping();
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function initLandingTerminal() {
    const term = document.getElementById('landing-terminal');
    if (!term) return;

    const lines = [
        { text: '>> AGENTICUM_G5_CORE_BOOT: READY', type: 'success' },
        { text: '>> LOADING_REASONING_CLUSTER... OK', type: 'info' },
        { text: '>> ATTACHING_52_NODES... OK', type: 'info' },
        { text: '>> TARGET_ACQUIRED: GOOGLE_DEEPMIND_HACKATHON', type: 'warn' },
        { text: '>> MISSION: LICENSE_A_CIVILIZATION', type: 'success' },
        { text: '>> SYSTEM_STATUS: MAXIMUM_EXCELLENCE', type: 'info' }
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i >= lines.length) {
            clearInterval(interval);
            return;
        }

        const div = document.createElement('div');
        div.className = `line ${lines[i].type || ''}`;
        div.innerHTML = `<span class="prompt">></span> ${lines[i].text}`;
        
        term.insertBefore(div, term.querySelector('.cursor'));
        i++;
        term.scrollTop = term.scrollHeight;
    }, 1200);
}

function initManifestoTyping() {
    const lead = document.querySelector('.manifesto-lead');
    if (!lead) return;

    const text = lead.innerText;
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
