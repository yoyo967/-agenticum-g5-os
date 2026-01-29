/**
 * AGENTICUM G5 | NEURAL 3D NAVIGATOR (DASHBOARD ONLY)
 * "Atomic Polish" - High-End Three.js Visualization
 * 
 * Replaces the 2D canvas with a fully interactive 3D node sphere.
 * Syncs with nodes.js data.
 */

class NeuralNavigator3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn('NeuralNavigator3D: Container not found');
            return;
        }

        // Configuration
        this.config = {
            particleCount: 52, // Will be overridden by actual nodes length
            connectionDistance: 2.5,
            baseSpeed: 0.001,
            hoverSpeed: 0.0002,
            colors: {
                STRATEGY: 0x4a9eff, // Blue
                CREATION: 0x9775fa, // Purple
                ANALYSIS: 0xf59e0b, // Amber/Gold
                OPS: 0x34d399,      // Emerald
                DEFAULT: 0xffffff
            }
        };

        this.nodes = []; // Will hold node metadata
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clock = new THREE.Clock();
        this.isHovering = false;
        
        // Wait for SYSTEM_NODES to be available
        if (typeof SYSTEM_NODES !== 'undefined') {
            this.nodesData = SYSTEM_NODES;
        } else {
            console.warn('NeuralNavigator3D: SYSTEM_NODES not found in global scope. using fallbacks.');
            this.nodesData = Array(52).fill({ id: 'UNK', cluster: 'DEFAULT' });
        }

        this.init();
    }

    init() {
        // SCENE SETUP
        this.scene = new THREE.Scene();
        // Fog for depth
        this.scene.fog = new THREE.FogExp2(0x000000, 0.03);

        // CAMERA
        const fov = 60;
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
        this.camera.position.z = 18;

        // RENDERER
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance" 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
        this.container.innerHTML = ''; // Clear existing content
        this.container.appendChild(this.renderer.domElement);

        // OBJECTS
        this.createParticles();
        this.createConnections();

        // EVENTS
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Use container for mouse events to be more specific
        this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.container.addEventListener('click', this.onClick.bind(this));

        // START LOOP
        this.animate();
        console.log('🔮 NeuralNavigator3D: Initialized with Maximum Excellence');
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];
        
        const colorObj = new THREE.Color();
        const radius = 8;

        this.nodesData.forEach((node, i) => {
            // Fibonacci Sphere distribution for even spread
            const phi = Math.acos(-1 + (2 * i) / this.nodesData.length);
            const theta = Math.sqrt(this.nodesData.length * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            positions.push(x, y, z);

            // Store metadata for interaction
            this.nodes.push({
                data: node,
                position: new THREE.Vector3(x, y, z),
                originalPos: new THREE.Vector3(x, y, z),
                index: i
            });

            // Color based on cluster
            let hex = this.config.colors[node.cluster] || this.config.colors.DEFAULT;
            colorObj.setHex(hex);
            colors.push(colorObj.r, colorObj.g, colorObj.b);

            // Size: Core nodes larger
            sizes.push(node.type === 'ROOT' || node.tier === 0 ? 2.5 : 1.5);
        });

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        // Custom Shader Material for "Glowing Pulse" effect
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pointTexture: { value: this.createTexture() }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    
                    // Subtle breathing effect
                    float pulse = 1.0 + sin(time * 2.0 + position.x) * 0.1;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z) * pulse;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main() {
                    gl_FragColor = vec4(vColor, 1.0);
                    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                    if (gl_FragColor.a < 0.1) discard;
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    createConnections() {
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        const connections = [];

        // Connect nodes based on cluster similarity and distance
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];
                const dist = nodeA.position.distanceTo(nodeB.position);

                let shouldConnect = false;

                // Strong connection if same cluster
                if (nodeA.data.cluster === nodeB.data.cluster && dist < 4) {
                    shouldConnect = true;
                }
                // Weak connection (cross-cluster) if very close
                else if (dist < 2.5) {
                    shouldConnect = true;
                }

                if (shouldConnect) {
                    positions.push(
                        nodeA.position.x, nodeA.position.y, nodeA.position.z,
                        nodeB.position.x, nodeB.position.y, nodeB.position.z
                    );
                    connections.push({
                        u: Math.random(), // For animation offset if needed
                    });
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        this.lines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.lines);
    }

    onWindowResize() {
        if (!this.container) return;
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObject(this.particles);

        if (intersects.length > 0) {
            this.isHovering = true;
            document.body.style.cursor = 'pointer';
            
            // Get the index of the hovered point
            const index = intersects[0].index;
            const node = this.nodesData[index];
            this.showTooltip(node, event.clientX, event.clientY);
        } else {
            this.isHovering = false;
            document.body.style.cursor = 'default';
            this.hideTooltip();
        }
    }
    
    onClick(event) {
        if (!this.isHovering) return;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.particles);
        
        if (intersects.length > 0) {
            const index = intersects[0].index;
            const node = this.nodesData[index];
            
            console.log(`Node Clicked: ${node.id}`);
            
            // Trigger Dashboard Modal
            if (window.G5Dashboard && window.G5Dashboard.openNodeConfig) {
                window.G5Dashboard.openNodeConfig(node.id);
            }
        }
    }
    
    showTooltip(node, x, y) {
        let tooltip = document.getElementById('node-tooltip-3d');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'node-tooltip-3d';
            tooltip.style.position = 'fixed';
            tooltip.style.padding = '8px 12px';
            tooltip.style.background = 'rgba(10, 10, 10, 0.9)';
            tooltip.style.border = '1px solid rgba(0, 255, 255, 0.3)';
            tooltip.style.backdropFilter = 'blur(4px)';
            tooltip.style.borderRadius = '4px';
            tooltip.style.color = '#fff';
            tooltip.style.fontFamily = "'JetBrains Mono', monospace";
            tooltip.style.fontSize = '12px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '9999';
            tooltip.style.transform = 'translate(15px, 15px)';
            tooltip.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
            document.body.appendChild(tooltip);
        }
        
        tooltip.innerHTML = `
            <div style="color: #888; font-size: 10px; margin-bottom: 2px;">${node.id}</div>
            <div style="font-weight: bold; color: #fff;">${node.name}</div>
            <div style="color: #4a9eff; font-size: 10px; margin-top: 2px;">${node.cluster}</div>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('node-tooltip-3d');
        if (tooltip) tooltip.style.display = 'none';
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const time = this.clock.getElapsedTime();
        this.particles.material.uniforms.time.value = time;

        // ROTATION
        const speed = this.isHovering ? this.config.hoverSpeed : this.config.baseSpeed;
        this.scene.rotation.y += speed * 2;
        this.scene.rotation.x += speed;

        this.renderer.render(this.scene, this.camera);
    }
}

// Global Initialization
window.initNeural3D = function() {
    console.log("Initialize Interactive 3D Neural Network...");
    // Look for the new container or fallback to the old one if needed, but intended for #dashboard-neural-container
    // Ensure we are in dashboard context
    const container = document.getElementById('dashboard-neural-container');
    if (container) {
        window.neuralNavigator = new NeuralNavigator3D('dashboard-neural-container');
    }
};

// Auto-start if DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initNeural3D);
} else {
    window.initNeural3D();
}
