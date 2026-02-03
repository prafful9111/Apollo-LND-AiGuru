import { Mesh, Program, Renderer, Sphere, Vec3, Camera, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './Orb.css';

interface OrbProps {
  color?: string;
}

export default function Orb({
  color = '#94A3B8'
}: OrbProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    // GL Setup
    const renderer = new Renderer({ alpha: true, width: container.clientWidth, height: container.clientHeight, dpr: 2 });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0, 5);

    const scene = new Transform();

    // Resize handler
    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight; // Wait, should we standardise?
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize);
    resize();

    // Geometry
    const geometry = new Sphere(gl, { radius: 1.2, widthSegments: 64, heightSegments: 32 });

    // Shader
    const program = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        attribute vec3 normal;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat3 normalMatrix;
        varying vec3 vNormal;
        varying vec3 vPos;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        
        void main() {
          vec3 normal = normalize(vNormal);
          
          // Basic Lighting
          vec3 lightDir = normalize(vec3(0.5, 1.0, 1.0));
          float diffuse = max(dot(normal, lightDir), 0.0);
          
          // Ambient
          vec3 ambient = uColor * 0.4;
          
          // Rim Light (Fresnel)
          vec3 viewDir = vec3(0.0, 0.0, 1.0); // Approximate view dir in view space is roughly along Z for simple spheres
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
          
          vec3 finalColor = ambient + (uColor * diffuse * 0.8) + (vec3(1.0) * fresnel * 0.4);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        uColor: { value: new Vec3(0, 0, 0) },
        uTime: { value: 0 }
      },
      // Ensure depth testing is on
      depthTest: true,
      cullFace: gl.BACK
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let rafId: number;
    const start = performance.now();

    const update = () => {
      rafId = requestAnimationFrame(update);
      const t = (performance.now() - start) * 0.001;

      // Apply color
      const c = hexToVec3(color);
      // Smooth color transition
      const curr = program.uniforms.uColor.value;
      curr.lerp(c, 0.1);

      program.uniforms.uTime.value = t;

      // Animation
      // Floating bob
      mesh.position.y = Math.sin(t * 1.5) * 0.1;
      // Rotation
      mesh.rotation.y = t * 0.3;
      mesh.rotation.x = Math.sin(t * 0.5) * 0.1;

      renderer.render({ scene, camera });
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (container && gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [color]);

  return <div ref={ctnDom} className="orb-container" />;
}

function hexToVec3(hex: string) {
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const r = parseInt(color.substring(0, 2), 16) / 255;
  const g = parseInt(color.substring(2, 4), 16) / 255;
  const b = parseInt(color.substring(4, 6), 16) / 255;
  return new Vec3(r, g, b);
}
