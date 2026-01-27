/**
 * AGENTICUM G5 | FULL 3D EXPERIENCE V3.0
 * Every Section Has 3D Elements
 * 
 * Features:
 * - Hero: Rotating Obsidian Core
 * - Manifesto: Floating DNA Helix
 * - Capabilities: Orbiting Spheres
 * - Architecture: Neural Network 3D
 * - Demo: Holographic Terminal
 * - CTA: Pulsing Energy Core
 */

// ============================================
// MAIN 3D CONTROLLER
// ============================================
class Full3DExperience {
    constructor() {
        if (typeof THREE === 'undefined') {
            console.log('Three.js not loaded');
            return;
        }
        
        this.scenes = {};
        this.renderers = {};
        this.cameras = {};
        this.animationFrames = {};
        
        this.initHero3D();
        this.initManifesto3D();
        this.initCapabilities3D();
        this.initCTA3D();
        
        console.log('🎮 Full 3D Experience Initialized');
    }
    
    // CREATE REUSABLE RENDERER
    createRenderer(container) {
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        return renderer;
    }
    
    // ============================================
    // HERO SECTION - OBSIDIAN CORE
    // ============================================
    initHero3D() {
        const container = document.getElementById('hero-3d-container');
        if (!container) return;
        
        // Scene
        const scene = new THREE.Scene();
        this.scenes.hero = scene;
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        this.cameras.hero = camera;
        
        // Renderer
        const renderer = this.createRenderer(container);
        this.renderers.hero = renderer;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404050, 0.5);
        scene.add(ambientLight);
        
        const keyLight = new THREE.PointLight(0x4a9eff, 2, 20);
        keyLight.position.set(5, 5, 5);
        scene.add(keyLight);
        
        const fillLight = new THREE.PointLight(0x9775fa, 1, 15);
        fillLight.position.set(-5, 3, 5);
        scene.add(fillLight);
        
        const rimLight = new THREE.PointLight(0x34d399, 0.5, 10);
        rimLight.position.set(0, -5, -5);
        scene.add(rimLight);
        
        // Main Core - Icosahedron
        const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
        const coreMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a2e,
            metalness: 0.95,
            roughness: 0.05,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            reflectivity: 1.0
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(core);
        
        // Inner Energy Core
        const innerGeometry = new THREE.IcosahedronGeometry(0.7, 0);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.4
        });
        const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(innerCore);
        
        // Wireframe Shell
        const wireGeometry = new THREE.IcosahedronGeometry(1.3, 2);
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });
        const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
        scene.add(wireframe);
        
        // Particle Field
        const particleCount = 300;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = 2 + Math.random() * 4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            particlePositions[i3 + 2] = radius * Math.cos(phi);
            
            // Color gradient
            particleColors[i3] = 0.29 + Math.random() * 0.3; // R
            particleColors[i3 + 1] = 0.62 + Math.random() * 0.2; // G
            particleColors[i3 + 2] = 1; // B
        }
        
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        
        // Orbital Rings
        const rings = [];
        const ringConfigs = [
            { radius: 2.0, rotation: { x: Math.PI / 2, y: 0 }, speed: 0.002 },
            { radius: 2.5, rotation: { x: Math.PI / 3, y: Math.PI / 4 }, speed: -0.0015 },
            { radius: 3.0, rotation: { x: Math.PI / 4, y: Math.PI / 2 }, speed: 0.001 }
        ];
        
        ringConfigs.forEach((config, i) => {
            const ringGeometry = new THREE.TorusGeometry(config.radius, 0.008, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: [0x4a9eff, 0x9775fa, 0x34d399][i],
                transparent: true,
                opacity: 0.4 - i * 0.1
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = config.rotation.x;
            ring.rotation.y = config.rotation.y;
            ring.userData.speed = config.speed;
            rings.push(ring);
            scene.add(ring);
        });
        
        // Mouse tracking
        let mouse = { x: 0, y: 0 };
        document.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Animation
        const animate = () => {
            this.animationFrames.hero = requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Core rotation with mouse influence
            core.rotation.x += 0.003 + mouse.y * 0.005;
            core.rotation.y += 0.005 + mouse.x * 0.005;
            
            // Inner core pulsing
            innerCore.rotation.x -= 0.008;
            innerCore.rotation.y -= 0.005;
            innerCore.scale.setScalar(1 + Math.sin(time * 2) * 0.15);
            innerCore.material.opacity = 0.3 + Math.sin(time * 3) * 0.15;
            
            // Wireframe sync
            wireframe.rotation.copy(core.rotation);
            
            // Particles orbit
            particles.rotation.y += 0.0008;
            particles.rotation.x += 0.0003;
            
            // Rings rotation
            rings.forEach(ring => {
                ring.rotation.z += ring.userData.speed;
            });
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // ============================================
    // MANIFESTO SECTION - DNA HELIX
    // ============================================
    initManifesto3D() {
        const section = document.getElementById('manifesto');
        if (!section) return;
        
        // Create container
        const container = document.createElement('div');
        container.id = 'manifesto-3d-container';
        container.style.cssText = `
            position: absolute;
            top: 0;
            right: 0;
            width: 40%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
        
        // Scene
        const scene = new THREE.Scene();
        this.scenes.manifesto = scene;
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 8;
        this.cameras.manifesto = camera;
        
        // Renderer
        const renderer = this.createRenderer(container);
        this.renderers.manifesto = renderer;
        
        // DNA Helix
        const helixGroup = new THREE.Group();
        const helixPoints = 60;
        const helixRadius = 1.5;
        const helixHeight = 8;
        
        for (let i = 0; i < helixPoints; i++) {
            const t = i / helixPoints;
            const angle = t * Math.PI * 6;
            const y = (t - 0.5) * helixHeight;
            
            // Strand 1
            const sphere1Geometry = new THREE.SphereGeometry(0.08, 16, 16);
            const sphere1Material = new THREE.MeshBasicMaterial({
                color: 0x4a9eff,
                transparent: true,
                opacity: 0.8
            });
            const sphere1 = new THREE.Mesh(sphere1Geometry, sphere1Material);
            sphere1.position.set(
                Math.cos(angle) * helixRadius,
                y,
                Math.sin(angle) * helixRadius
            );
            helixGroup.add(sphere1);
            
            // Strand 2
            const sphere2Geometry = new THREE.SphereGeometry(0.08, 16, 16);
            const sphere2Material = new THREE.MeshBasicMaterial({
                color: 0x9775fa,
                transparent: true,
                opacity: 0.8
            });
            const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
            sphere2.position.set(
                Math.cos(angle + Math.PI) * helixRadius,
                y,
                Math.sin(angle + Math.PI) * helixRadius
            );
            helixGroup.add(sphere2);
            
            // Connection bars (every 4th point)
            if (i % 4 === 0) {
                const barGeometry = new THREE.CylinderGeometry(0.02, 0.02, helixRadius * 2, 8);
                const barMaterial = new THREE.MeshBasicMaterial({
                    color: 0x34d399,
                    transparent: true,
                    opacity: 0.4
                });
                const bar = new THREE.Mesh(barGeometry, barMaterial);
                bar.position.set(0, y, 0);
                bar.rotation.z = Math.PI / 2;
                bar.rotation.y = angle;
                helixGroup.add(bar);
            }
        }
        
        scene.add(helixGroup);
        
        // Animation
        const animate = () => {
            this.animationFrames.manifesto = requestAnimationFrame(animate);
            
            helixGroup.rotation.y += 0.005;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // ============================================
    // CAPABILITIES SECTION - ORBITING SPHERES
    // ============================================
    initCapabilities3D() {
        const section = document.getElementById('capabilities');
        if (!section) return;
        
        // Create container
        const container = document.createElement('div');
        container.id = 'capabilities-3d-container';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.5;
        `;
        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
        
        // Scene
        const scene = new THREE.Scene();
        this.scenes.capabilities = scene;
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 15;
        this.cameras.capabilities = camera;
        
        // Renderer
        const renderer = this.createRenderer(container);
        this.renderers.capabilities = renderer;
        
        // Create 6 orbiting spheres (one per capability)
        const spheres = [];
        const colors = [0x4a9eff, 0x9775fa, 0x34d399, 0xf59e0b, 0x6b7a99, 0x4a9eff];
        
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: colors[i],
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            // Inner solid
            const innerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const innerMaterial = new THREE.MeshBasicMaterial({
                color: colors[i],
                transparent: true,
                opacity: 0.6
            });
            const inner = new THREE.Mesh(innerGeometry, innerMaterial);
            sphere.add(inner);
            
            sphere.userData = {
                angle: (i / 6) * Math.PI * 2,
                radius: 8 + (i % 2) * 2,
                speed: 0.003 + (i * 0.001),
                yOffset: (i - 2.5) * 2
            };
            
            spheres.push(sphere);
            scene.add(sphere);
        }
        
        // Connection lines between spheres
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.1
        });
        
        // Animation
        const animate = () => {
            this.animationFrames.capabilities = requestAnimationFrame(animate);
            
            spheres.forEach((sphere, i) => {
                sphere.userData.angle += sphere.userData.speed;
                sphere.position.x = Math.cos(sphere.userData.angle) * sphere.userData.radius;
                sphere.position.z = Math.sin(sphere.userData.angle) * sphere.userData.radius;
                sphere.position.y = sphere.userData.yOffset + Math.sin(sphere.userData.angle * 2) * 0.5;
                sphere.rotation.y += 0.02;
                sphere.rotation.x += 0.01;
            });
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // ============================================
    // CTA SECTION - PULSING ENERGY SPHERE
    // ============================================
    initCTA3D() {
        const section = document.querySelector('.final-cta-section');
        if (!section) return;
        
        // Create container
        const container = document.createElement('div');
        container.id = 'cta-3d-container';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
        
        // Scene
        const scene = new THREE.Scene();
        this.scenes.cta = scene;
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 8;
        this.cameras.cta = camera;
        
        // Renderer
        const renderer = this.createRenderer(container);
        this.renderers.cta = renderer;
        
        // Central pulsing sphere
        const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        
        // Energy rings
        const energyRings = [];
        for (let i = 0; i < 5; i++) {
            const ringGeometry = new THREE.TorusGeometry(2.5 + i * 0.5, 0.02, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x4a9eff,
                transparent: true,
                opacity: 0.3 - i * 0.05
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.userData.baseScale = 1;
            ring.userData.phaseOffset = i * 0.5;
            energyRings.push(ring);
            scene.add(ring);
        }
        
        // Animation
        const animate = () => {
            this.animationFrames.cta = requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Sphere pulsing
            const scale = 1 + Math.sin(time * 2) * 0.1;
            sphere.scale.setScalar(scale);
            sphere.rotation.y += 0.005;
            sphere.rotation.x += 0.002;
            
            // Energy rings expansion
            energyRings.forEach((ring, i) => {
                const phase = time * 2 + ring.userData.phaseOffset;
                const ringScale = 1 + Math.sin(phase) * 0.2;
                ring.scale.setScalar(ringScale);
                ring.material.opacity = (0.3 - i * 0.05) * (0.5 + Math.sin(phase) * 0.5);
                ring.rotation.z += 0.002 * (i % 2 === 0 ? 1 : -1);
            });
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
}

// ============================================
// GSAP PREMIUM SCROLL ANIMATIONS
// ============================================
class PremiumScrollAnimations {
    constructor() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.log('GSAP not loaded');
            return;
        }
        
        gsap.registerPlugin(ScrollTrigger);
        this.init();
    }
    
    init() {
        this.heroParallax();
        this.sectionReveals();
        this.capabilityCards();
        this.statsCounter();
    }
    
    heroParallax() {
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 150,
            opacity: 0
        });
        
        gsap.to('#hero-3d-container', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            scale: 0.8,
            opacity: 0.5
        });
    }
    
    sectionReveals() {
        const sections = gsap.utils.toArray('section:not(.hero-section):not(.stats-bar)');
        
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 80,
                duration: 1.2,
                ease: 'power3.out'
            });
        });
    }
    
    capabilityCards() {
        const cards = gsap.utils.toArray('.capability-card');
        
        gsap.from(cards, {
            scrollTrigger: {
                trigger: '.capabilities-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 100,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
    
    statsCounter() {
        const stats = document.querySelectorAll('.stat-value[data-target]');
        
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(stat, {
                        duration: 2,
                        textContent: target,
                        snap: { textContent: 1 },
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
}

// ============================================
// PREMIUM MICRO-INTERACTIONS
// ============================================
class MicroInteractions {
    constructor() {
        this.initCardEffects();
        this.initButtonEffects();
        this.initCursor();
    }
    
    initCardEffects() {
        document.querySelectorAll('.capability-card, .m-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
    
    initButtonEffects() {
        document.querySelectorAll('.primary-btn, .cta-primary-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                btn.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                btn.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    }
    
    initCursor() {
        // Only on desktop
        if (window.innerWidth < 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'premium-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);
        
        const dot = cursor.querySelector('.cursor-dot');
        const ring = cursor.querySelector('.cursor-ring');
        
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateCursor = () => {
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
            
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        
        // Hover states
        document.querySelectorAll('a, button, .capability-card').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
            el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
        });
    }
}

// ============================================
// ANIMATED GRADIENT BACKGROUND
// ============================================
class GradientAnimation {
    constructor() {
        const canvas = document.getElementById('gradient-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resize);
        resize();
        
        const animate = () => {
            time += 0.003;
            
            const gradient = ctx.createRadialGradient(
                canvas.width * (0.5 + Math.sin(time) * 0.15),
                canvas.height * (0.5 + Math.cos(time * 0.7) * 0.15),
                0,
                canvas.width * 0.5,
                canvas.height * 0.5,
                canvas.width * 0.9
            );
            
            gradient.addColorStop(0, `rgba(74, 158, 255, ${0.08 + Math.sin(time) * 0.03})`);
            gradient.addColorStop(0.2, `rgba(151, 117, 250, 0.05)`);
            gradient.addColorStop(0.5, 'rgba(13, 15, 18, 0.98)');
            gradient.addColorStop(1, 'rgba(10, 12, 15, 1)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// ============================================
// ANIMATED TERMINAL TYPING EFFECT
// ============================================
class TerminalTypingEffect {
    constructor() {
        this.terminal = document.getElementById('landing-terminal');
        if (!this.terminal) return;
        
        this.initTypingAnimation();
    }
    
    initTypingAnimation() {
        const commands = [
            { text: '> COMMAND: Analyze market opportunity for AI-driven content platform', class: 'prompt', delay: 0 },
            { text: '', class: '', delay: 500 },
            { text: '[SN-00] ORCHESTRATOR :: Routing to analysis cluster...', class: 'node-active', delay: 1000 },
            { text: '[SP-01] STRATEGIST :: Ingesting market data... 2.3TB processed', class: 'node-active', delay: 1800 },
            { text: '[RA-01] AUDITOR :: Competitor scan initiated...', class: 'node-active', delay: 2600 },
            { text: '[RA-06] FORECASTER :: Trend vectors calculated', class: 'thinking', delay: 3400 },
            { text: '', class: '', delay: 4000 },
            { text: '[SP-99] HEGEMONY_MATRIX :: Strategic opportunity identified', class: 'thinking', delay: 4500 },
            { text: '       └─ Market Gap: €2.4B addressable', class: 'thinking', delay: 5000 },
            { text: '       └─ Time to Market: 47 days optimal', class: 'thinking', delay: 5400 },
            { text: '       └─ Risk Score: 23% (ACCEPTABLE)', class: 'thinking', delay: 5800 },
            { text: '', class: '', delay: 6200 },
            { text: '[CC-06] VIDEO_DIRECTOR :: Campaign assets ready', class: 'success', delay: 6600 },
            { text: '       └─ 6 hero videos (Veo 3.1)', class: 'success', delay: 7000 },
            { text: '       └─ 48 social variants (Imagen 3)', class: 'success', delay: 7400 },
            { text: '       └─ 12 audio spots (Flash Audio)', class: 'success', delay: 7800 },
            { text: '', class: '', delay: 8200 },
            { text: '✓ ANALYSIS COMPLETE :: Strategic plan generated', class: 'success', delay: 8600 },
            { text: '✓ ASSETS READY :: Full campaign package prepared', class: 'success', delay: 9000 },
            { text: '✓ AWAITING :: Operator confirmation', class: 'success', delay: 9400 },
            { text: '', class: '', delay: 9800 },
            { text: '█', class: 'cursor blink', delay: 10000 }
        ];
        
        // Clear existing content after a delay
        setTimeout(() => {
            this.terminal.innerHTML = `
                <div class="trace-line system">╔══════════════════════════════════════════════════════════════╗</div>
                <div class="trace-line system">║  AGENTICUM G5 :: REASONING CLUSTER ONLINE                      ║</div>
                <div class="trace-line system">║  52 NODES SYNCHRONIZED :: READY FOR INPUT                       ║</div>
                <div class="trace-line system">╚══════════════════════════════════════════════════════════════╝</div>
                <div class="trace-line"><br></div>
            `;
            
            // Start typing animation when terminal is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.typeCommands(commands);
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(this.terminal);
        }, 1000);
    }
    
    typeCommands(commands) {
        commands.forEach((cmd, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `trace-line ${cmd.class}`;
                
                if (cmd.class === 'cursor blink') {
                    line.innerHTML = cmd.text;
                    line.style.animation = 'blink 1s infinite';
                } else {
                    this.typeText(line, cmd.text);
                }
                
                this.terminal.appendChild(line);
                this.terminal.scrollTop = this.terminal.scrollHeight;
            }, cmd.delay);
        });
    }
    
    typeText(element, text) {
        let i = 0;
        const speed = 15;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
}

// ============================================
// TRANSFORMATION SECTION 3D - MORPHING SPHERES
// ============================================
class Transformation3D {
    constructor() {
        if (typeof THREE === 'undefined') return;
        
        const section = document.getElementById('transformation');
        if (!section) return;
        
        // Create container
        const container = document.createElement('div');
        container.id = 'transformation-3d-container';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
        `;
        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
        
        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Left sphere (OLD - breaking apart)
        const leftGroup = new THREE.Group();
        leftGroup.position.x = -5;
        
        for (let i = 0; i < 20; i++) {
            const geo = new THREE.TetrahedronGeometry(0.3);
            const mat = new THREE.MeshBasicMaterial({
                color: 0xf87171,
                transparent: true,
                opacity: 0.6,
                wireframe: true
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
            );
            mesh.userData = {
                basePos: mesh.position.clone(),
                offset: Math.random() * Math.PI * 2
            };
            leftGroup.add(mesh);
        }
        scene.add(leftGroup);
        
        // Right sphere (NEW - unified)
        const rightGroup = new THREE.Group();
        rightGroup.position.x = 5;
        
        // Core sphere
        const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        rightGroup.add(coreMesh);
        
        // Inner glow
        const innerGeo = new THREE.IcosahedronGeometry(1, 1);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x9775fa,
            transparent: true,
            opacity: 0.5
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        rightGroup.add(innerMesh);
        
        // Orbiting particles
        for (let i = 0; i < 30; i++) {
            const pGeo = new THREE.SphereGeometry(0.05, 8, 8);
            const pMat = new THREE.MeshBasicMaterial({
                color: 0x34d399,
                transparent: true,
                opacity: 0.8
            });
            const pMesh = new THREE.Mesh(pGeo, pMat);
            pMesh.userData = {
                angle: (i / 30) * Math.PI * 2,
                radius: 2 + Math.random() * 0.5,
                speed: 0.01 + Math.random() * 0.01,
                yOffset: (Math.random() - 0.5) * 2
            };
            rightGroup.add(pMesh);
        }
        
        scene.add(rightGroup);
        
        // Connection beam
        const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 8, 8);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.3
        });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.rotation.z = Math.PI / 2;
        scene.add(beam);
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Left group - chaotic movement
            leftGroup.children.forEach((mesh, i) => {
                const offset = mesh.userData.offset;
                mesh.position.x = mesh.userData.basePos.x + Math.sin(time * 2 + offset) * 0.5;
                mesh.position.y = mesh.userData.basePos.y + Math.cos(time * 2 + offset) * 0.5;
                mesh.rotation.x += 0.02;
                mesh.rotation.y += 0.03;
            });
            leftGroup.rotation.y += 0.003;
            
            // Right group - unified rotation
            coreMesh.rotation.x += 0.005;
            coreMesh.rotation.y += 0.008;
            innerMesh.rotation.x -= 0.008;
            innerMesh.rotation.y -= 0.005;
            innerMesh.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
            
            // Orbiting particles
            rightGroup.children.forEach((mesh, i) => {
                if (mesh.userData.angle !== undefined) {
                    mesh.userData.angle += mesh.userData.speed;
                    mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
                    mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
                    mesh.position.y = mesh.userData.yOffset + Math.sin(mesh.userData.angle * 2) * 0.3;
                }
            });
            
            // Beam pulse
            beam.material.opacity = 0.2 + Math.sin(time * 4) * 0.15;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
}

// ============================================
// STACK SECTION 3D - ORBITING TECH LOGOS
// ============================================
class Stack3D {
    constructor() {
        if (typeof THREE === 'undefined') return;
        
        const section = document.querySelector('.stack-section');
        if (!section) return;
        
        // Create container
        const container = document.createElement('div');
        container.id = 'stack-3d-container';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.3;
        `;
        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
        
        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 12;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Central Gemini Core
        const coreGeo = new THREE.DodecahedronGeometry(1.5, 0);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.4,
            wireframe: true
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);
        
        // Inner core
        const innerGeo = new THREE.DodecahedronGeometry(1, 0);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x9775fa,
            transparent: true,
            opacity: 0.6
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        scene.add(inner);
        
        // Orbiting tech elements
        const orbitItems = [];
        const colors = [0x4a9eff, 0x9775fa, 0x34d399, 0xf59e0b, 0x6b7a99, 0x4a9eff];
        
        for (let i = 0; i < 6; i++) {
            const itemGeo = new THREE.OctahedronGeometry(0.4, 0);
            const itemMat = new THREE.MeshBasicMaterial({
                color: colors[i],
                transparent: true,
                opacity: 0.7
            });
            const item = new THREE.Mesh(itemGeo, itemMat);
            
            item.userData = {
                angle: (i / 6) * Math.PI * 2,
                radius: 4,
                speed: 0.008,
                yAmplitude: 1
            };
            
            orbitItems.push(item);
            scene.add(item);
        }
        
        // Connection lines
        const linePoints = [];
        for (let i = 0; i < 6; i++) {
            linePoints.push(new THREE.Vector3(0, 0, 0));
            linePoints.push(new THREE.Vector3(0, 0, 0));
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.2
        });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(lines);
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Core rotation
            core.rotation.x += 0.003;
            core.rotation.y += 0.005;
            inner.rotation.x -= 0.005;
            inner.rotation.y -= 0.003;
            inner.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
            
            // Orbiting items
            const positions = lines.geometry.attributes.position;
            orbitItems.forEach((item, i) => {
                item.userData.angle += item.userData.speed;
                item.position.x = Math.cos(item.userData.angle) * item.userData.radius;
                item.position.z = Math.sin(item.userData.angle) * item.userData.radius;
                item.position.y = Math.sin(item.userData.angle * 2) * item.userData.yAmplitude;
                item.rotation.x += 0.02;
                item.rotation.y += 0.03;
                
                // Update connection lines
                positions.setXYZ(i * 2, 0, 0, 0);
                positions.setXYZ(i * 2 + 1, item.position.x, item.position.y, item.position.z);
            });
            positions.needsUpdate = true;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
}

// ============================================
// PERFECT TWIN 3D - DNA CLONING EFFECT
// ============================================
class Twin3D {
    constructor() {
        if (typeof THREE === 'undefined') return;
        
        const container = document.getElementById('twin-3d-container');
        if (!container) return;
        
        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 12;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Left sphere (Human) - warm colors
        const humanGroup = new THREE.Group();
        humanGroup.position.x = -4;
        
        const humanCore = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.2, 2),
            new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5, wireframe: true })
        );
        humanGroup.add(humanCore);
        
        const humanInner = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.8, 1),
            new THREE.MeshBasicMaterial({ color: 0xf87171, transparent: true, opacity: 0.6 })
        );
        humanGroup.add(humanInner);
        scene.add(humanGroup);
        
        // Right sphere (Machine) - cool colors
        const machineGroup = new THREE.Group();
        machineGroup.position.x = 4;
        
        const machineCore = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.2, 2),
            new THREE.MeshBasicMaterial({ color: 0x4a9eff, transparent: true, opacity: 0.5, wireframe: true })
        );
        machineGroup.add(machineCore);
        
        const machineInner = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.8, 1),
            new THREE.MeshBasicMaterial({ color: 0x9775fa, transparent: true, opacity: 0.6 })
        );
        machineGroup.add(machineInner);
        scene.add(machineGroup);
        
        // DNA particles flowing between
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: i % 2 === 0 ? 0x4a9eff : 0xf59e0b,
                    transparent: true,
                    opacity: 0.8
                })
            );
            particle.userData = {
                offset: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
                amplitude: 0.5 + Math.random() * 1
            };
            particles.push(particle);
            scene.add(particle);
        }
        
        // Connection beam
        const beamGeometry = new THREE.CylinderGeometry(0.03, 0.03, 8, 8);
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.3
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.rotation.z = Math.PI / 2;
        scene.add(beam);
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Human sphere
            humanCore.rotation.x += 0.005;
            humanCore.rotation.y += 0.008;
            humanInner.rotation.x -= 0.008;
            humanInner.rotation.y -= 0.005;
            humanInner.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
            
            // Machine sphere
            machineCore.rotation.x += 0.005;
            machineCore.rotation.y += 0.008;
            machineInner.rotation.x -= 0.008;
            machineInner.rotation.y -= 0.005;
            machineInner.scale.setScalar(1 + Math.sin(time * 2 + Math.PI) * 0.1);
            
            // Particles flowing
            particles.forEach((particle, i) => {
                const t = ((time * particle.userData.speed + particle.userData.offset) % Math.PI) / Math.PI;
                particle.position.x = -4 + t * 8;
                particle.position.y = Math.sin(t * Math.PI * 4 + particle.userData.offset) * particle.userData.amplitude;
                particle.position.z = Math.cos(t * Math.PI * 4 + particle.userData.offset) * particle.userData.amplitude * 0.5;
                particle.material.opacity = Math.sin(t * Math.PI) * 0.8;
            });
            
            // Beam pulse
            beam.material.opacity = 0.2 + Math.sin(time * 3) * 0.1;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
}

// ============================================
// ROADMAP 3D - ASCENDING TIMELINE
// ============================================
class Roadmap3D {
    constructor() {
        if (typeof THREE === 'undefined') return;
        
        const container = document.getElementById('roadmap-3d-container');
        if (!container) return;
        
        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 15;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Timeline milestones (5 years: 2026-2030)
        const milestones = [];
        const colors = [0x4a9eff, 0x6b8dd6, 0x9775fa, 0x34d399, 0x34d399];
        
        for (let i = 0; i < 5; i++) {
            const y = -6 + i * 3;
            
            // Year sphere
            const sphere = new THREE.Mesh(
                new THREE.IcosahedronGeometry(0.4 + i * 0.1, 1),
                new THREE.MeshBasicMaterial({
                    color: colors[i],
                    transparent: true,
                    opacity: i === 0 ? 0.8 : 0.4,
                    wireframe: i !== 0
                })
            );
            sphere.position.set(-5, y, 0);
            sphere.userData.baseY = y;
            sphere.userData.index = i;
            milestones.push(sphere);
            scene.add(sphere);
            
            // Connecting line to next
            if (i < 4) {
                const lineGeo = new THREE.CylinderGeometry(0.02, 0.02, 3, 8);
                const lineMat = new THREE.MeshBasicMaterial({
                    color: 0x4a9eff,
                    transparent: true,
                    opacity: 0.2
                });
                const line = new THREE.Mesh(lineGeo, lineMat);
                line.position.set(-5, y + 1.5, 0);
                scene.add(line);
            }
        }
        
        // Rising particles (progress indicators)
        const particles = [];
        for (let i = 0; i < 30; i++) {
            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(0.03, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: 0x4a9eff,
                    transparent: true,
                    opacity: 0.6
                })
            );
            particle.position.set(
                -5 + (Math.random() - 0.5) * 2,
                -8 + Math.random() * 16,
                (Math.random() - 0.5) * 2
            );
            particle.userData = {
                speed: 0.02 + Math.random() * 0.03,
                offset: Math.random() * Math.PI * 2
            };
            particles.push(particle);
            scene.add(particle);
        }
        
        // Future vision sphere (2030 ultimate)
        const visionSphere = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.5, 2),
            new THREE.MeshBasicMaterial({
                color: 0x34d399,
                transparent: true,
                opacity: 0.2,
                wireframe: true
            })
        );
        visionSphere.position.set(4, 6, 0);
        scene.add(visionSphere);
        
        const visionInner = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1, 1),
            new THREE.MeshBasicMaterial({
                color: 0x34d399,
                transparent: true,
                opacity: 0.5
            })
        );
        visionSphere.add(visionInner);
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Milestones pulse
            milestones.forEach((milestone, i) => {
                milestone.rotation.y += 0.01;
                milestone.rotation.x += 0.005;
                milestone.position.y = milestone.userData.baseY + Math.sin(time + i * 0.5) * 0.1;
            });
            
            // Particles rise
            particles.forEach(particle => {
                particle.position.y += particle.userData.speed;
                particle.position.x += Math.sin(time + particle.userData.offset) * 0.005;
                
                if (particle.position.y > 8) {
                    particle.position.y = -8;
                }
                
                particle.material.opacity = Math.sin((particle.position.y + 8) / 16 * Math.PI) * 0.6;
            });
            
            // Vision sphere
            visionSphere.rotation.y += 0.003;
            visionSphere.rotation.x += 0.002;
            visionInner.scale.setScalar(1 + Math.sin(time * 2) * 0.15);
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    setTimeout(() => {
        new Full3DExperience();
        new PremiumScrollAnimations();
        new MicroInteractions();
        new GradientAnimation();
        new TerminalTypingEffect();
        new Transformation3D();
        new Stack3D();
        new Twin3D();
        new Roadmap3D();
        new FloatingNavigation();
        
        console.log('💎 AGENTICUM G5 | FULL 3D EXPERIENCE V5.0 LOADED');
    }, 200);
});

// ============================================
// FLOATING NAVIGATION CONTROLLER
// ============================================
class FloatingNavigation {
    constructor() {
        this.floatingNav = document.querySelector('.floating-nav');
        this.scrollTopBtn = document.getElementById('scrollTopBtn');
        this.scrollBottomBtn = document.getElementById('scrollBottomBtn');
        this.scrollProgress = document.getElementById('scrollProgress');
        
        if (!this.floatingNav) return;
        
        this.init();
    }
    
    init() {
        // Show/hide floating nav based on scroll
        let lastScrollY = 0;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show nav after scrolling 300px
            if (scrollY > 300) {
                this.floatingNav.classList.add('visible');
            } else {
                this.floatingNav.classList.remove('visible');
            }
            
            // Update scroll progress
            const progress = (scrollY / (documentHeight - windowHeight)) * 100;
            if (this.scrollProgress) {
                this.scrollProgress.style.height = `${Math.min(progress, 100)}%`;
            }
            
            lastScrollY = scrollY;
        });
        
        // Scroll to top
        if (this.scrollTopBtn) {
            this.scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Scroll to bottom
        if (this.scrollBottomBtn) {
            this.scrollBottomBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// ============================================
// LOADING SCREEN CONTROLLER
// ============================================
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        if (!this.loadingScreen) return;
        
        // Hide loading screen after animation completes
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
        }, 2200);
    }
}

// ============================================
// SECTION DOTS NAVIGATION
// ============================================
class SectionDotsNavigation {
    constructor() {
        this.sectionDots = document.getElementById('sectionDots');
        this.dots = document.querySelectorAll('.section-dots .dot');
        
        if (!this.sectionDots || this.dots.length === 0) return;
        
        this.init();
    }
    
    init() {
        // Show dots after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                this.sectionDots.classList.add('visible');
            } else {
                this.sectionDots.classList.remove('visible');
            }
            
            this.updateActiveDot();
        });
        
        // Smooth scroll on dot click
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = dot.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    updateActiveDot() {
        const sections = ['hero', 'manifesto', 'capabilities', 'demo', 'perfect-twin', 'roadmap', 'cta'];
        let currentSection = 'hero';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = sectionId;
                }
            }
        });
        
        this.dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================
class AnimatedCounters {
    constructor() {
        this.counters = document.querySelectorAll('.stat-value[data-target]');
        if (this.counters.length === 0) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ============================================
// 3D TILT CARDS
// ============================================
class TiltCards {
    constructor() {
        this.cards = document.querySelectorAll('.capability-card, .twin-philosophy-card, .vision-card');
        if (this.cards.length === 0) return;
        
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.tilt(e, card));
            card.addEventListener('mouseleave', () => this.reset(card));
        });
    }
    
    tilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 20;
        const tiltY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    }
    
    reset(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
class KeyboardNavigation {
    constructor() {
        this.sections = ['hero', 'manifesto', 'capabilities', 'demo', 'perfect-twin', 'roadmap', 'cta'];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Home':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                    e.preventDefault();
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                    break;
                case 'PageDown':
                case 'ArrowDown':
                    if (e.key === 'PageDown') e.preventDefault();
                    this.navigateToNextSection();
                    break;
                case 'PageUp':
                case 'ArrowUp':
                    if (e.key === 'PageUp') e.preventDefault();
                    this.navigateToPrevSection();
                    break;
            }
        });
    }
    
    getCurrentSection() {
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(this.sections[i]);
            if (section && section.getBoundingClientRect().top <= 100) {
                return i;
            }
        }
        return 0;
    }
    
    navigateToNextSection() {
        const current = this.getCurrentSection();
        const next = Math.min(current + 1, this.sections.length - 1);
        const section = document.getElementById(this.sections[next]);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    navigateToPrevSection() {
        const current = this.getCurrentSection();
        const prev = Math.max(current - 1, 0);
        const section = document.getElementById(this.sections[prev]);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// ============================================
// INITIALIZE ALL PREMIUM FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen first
    new LoadingScreen();
    
    // Initialize other features after a short delay
    setTimeout(() => {
        new SectionDotsNavigation();
        new AnimatedCounters();
        new TiltCards();
        new KeyboardNavigation();
        
        console.log('💎 AGENTICUM G5 | PREMIUM FEATURES V6.0 LOADED');
    }, 100);
});
