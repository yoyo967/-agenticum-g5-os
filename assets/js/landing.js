document.addEventListener('DOMContentLoaded', () => {
    initLandingTerminal();
});

function initLandingTerminal() {
    const terminal = document.getElementById('landing-terminal');
    // Clear initial static content if you want to animate from scratch, 
    // but the HTML has some static lines. Let's add more dynamically.

    const sequence = [
        { text: '> DETECTING OPERATOR...', delay: 1000 },
        { text: '> IDENTITY CONFIRMED: YAHYA YILDIRIM', delay: 2000 },
        { text: '> LOADING AGENTICUM G5 PROTOCOLS...', delay: 3000 },
        { text: '> [SN-00] ORCHESTRATOR ONLINE', delay: 4000 },
        { text: '> WAITING FOR COMMAND.', delay: 5000 }
    ];

    let delayAccumulator = 0;

    sequence.forEach(step => {
        delayAccumulator += step.delay;
        setTimeout(() => {
            const lines = terminal.querySelectorAll('.line');
            if(lines.length > 8) lines[0].remove(); // Keep it clean

            const div = document.createElement('div');
            div.className = 'line';
            div.innerHTML = `<span class="prompt">></span> ${step.text}`;
            // Insert before the cursor
            const cursor = terminal.querySelector('.cursor').parentNode;
            terminal.insertBefore(div, cursor);
        }, delayAccumulator);
    });
}
