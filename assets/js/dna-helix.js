/**
 * AGENTICUM G5 | DNA HELIX VISUALIZATION
 * The Perfect Twin: Biological Integration of Google Infra (Cyan) and OMM Logic (Magenta).
 */

class DNAHelix {
    constructor() {
        this.container = document.getElementById('twin-3d-container');
        if (!this.container) return; // Guard clause

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.connections = null;
        
        this.mouseX = 0;
        this.mouseY = 0;

        this.init();
    }

    init() {
        // Scene Setup
        this.scene = new THREE.Scene();
        // Fog to blend deep particles
        this.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.002);

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.z = 50;
        this.camera.position.y = 0;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // DNA Generation
        this.createHelix();

        // Listeners
        window.addEventListener('resize', () => this.onResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Start Loop
        this.animate();
    }

    createHelix() {
        const particleCount = 200; // Particles per strand
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];

        // Helix Parameters
        const radius = 10;
        const height = 80;
        const turns = 4;
        
        // Colors
        const colorInfra = new THREE.Color('#00f3ff'); // Cyan (Google Infra)
        const colorLogic = new THREE.Color('#bf00ff'); // Magenta (OMM Logic)

        for (let i = 0; i < particleCount; i++) {
            const t = i / particleCount;
            const angle = t * Math.PI * 2 * turns;
            const y = (t - 0.5) * height;

            // STRAND A (Google Infra)
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;
            
            positions.push(x1, y, z1);
            colors.push(colorInfra.r, colorInfra.g, colorInfra.b);
            sizes.push(0.3 + Math.random() * 0.2);

            // STRAND B (OMM Logic) - Offset by PI (180 degrees)
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            positions.push(x2, y, z2);
            colors.push(colorLogic.r, colorLogic.g, colorLogic.b);
            sizes.push(0.3 + Math.random() * 0.2);
            
            // Create Connection (Base Pairs)
            if (i % 5 === 0) { // Connect every 5th particle
                this.createConnection(
                    new THREE.Vector3(x1, y, z1),
                    new THREE.Vector3(x2, y, z2)
                );
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        // Shader Material for Glowing Particles
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            map: this.createTexture(),
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createConnection(v1, v2) {
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });

        const points = [];
        points.push(v1);
        points.push(v2);

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        
        // Group connections to rotate them with particles if needed, 
        // but simple loop adds them to scene. For rotation ease, adding to a group would be better.
        // For now, we will rotate the entire scene/camera or just the particle object.
        // Better: Add everything to a parent group.
        
        if (!this.dnaGroup) {
            this.dnaGroup = new THREE.Group();
            this.scene.add(this.dnaGroup);
        }
        
        // Re-parent particles if first time
        if (this.particles && this.particles.parent !== this.dnaGroup) {
            this.dnaGroup.add(this.particles);
        }
        
        this.dnaGroup.add(line);
    }

    createTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    onMouseMove(e) {
        this.mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        this.mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    }

    onResize() {
        if (!this.container || !this.camera || !this.renderer) return;
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.dnaGroup) {
            // Constant rotation
            this.dnaGroup.rotation.y += 0.005;
            this.dnaGroup.rotation.z += 0.002;
            
            // Mouse interaction
            this.dnaGroup.rotation.y += (this.mouseX * 0.0001);
            this.dnaGroup.rotation.x += (this.mouseY * 0.0001);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Check if element exists, utilizing MutationObserver properly in dashboard/spa apps,
    // but here it's a specific section on landing page.
    setTimeout(() => {
         new DNAHelix();
    }, 1000); // Slight delay to ensure layout is stable
});
