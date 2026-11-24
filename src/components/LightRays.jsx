import { useEffect, useRef } from 'react';

/*
 * Adaptado do componente Light Rays do Spell UI (spell.sh/docs/light-rays).
 * Mesmo shader, mas em WebGL puro em vez de three.js, para não pesar no site.
 * Pausa fora da tela e fica parado com prefers-reduced-motion.
 */

const VERTEX = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  float diagonal = length(u_resolution);
  return clamp(
    (.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
    u_reach, 1.0) *
    clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  float speed = u_rays * 10.0;
  float s1 = rayStrength(u_rayPos1, normalize(vec2(1.0, -0.116)), coord, 36.2214 * speed, 21.11349 * speed, 1.5 * speed);
  float s2 = rayStrength(u_rayPos2, normalize(vec2(1.0, 0.241)), coord, 22.39910 * speed, 18.0234 * speed, 1.1 * speed);
  float brightness = 1.0 * u_reach - (coord.y / u_resolution.y);
  float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);
  float a1 = s1 * attenuation;
  float a2 = s2 * attenuation;
  vec3 blended = u_color1 * a1 + u_color2 * a2;
  float alpha = a1 + a2 * (1.0 - a1);
  vec3 rgb = blended / max(alpha, 0.0001);
  gl_FragColor = vec4(rgb * alpha, alpha);
}
`;

const map = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

export default function LightRays({
  intensity = 13,
  rays = 32,
  reach = 16,
  position = 50,
  color1 = '#34D399',
  color2 = '#2DD4BF',
  speed = 10,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return undefined;

    const compile = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(program, name);
    gl.uniform3fv(u('u_color1'), hex(color1));
    gl.uniform3fv(u('u_color2'), hex(color2));
    gl.uniform1f(u('u_intensity'), map(intensity, 0, 100, 0, 0.5));
    gl.uniform1f(u('u_rays'), map(rays, 0, 100, 0, 0.3));
    gl.uniform1f(u('u_reach'), map(reach, 0, 100, 0, 0.5));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u('u_resolution'), w, h);
      gl.uniform2f(u('u_rayPos1'), (position / 100) * w, -0.4 * h);
      gl.uniform2f(u('u_rayPos2'), (position / 100 + 0.02) * w, -0.5 * h);
    };
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let time = Math.random() * 10000;
    let last = 0;
    let frame = 0;
    let visible = true;

    const draw = (now) => {
      const delta = last ? now - last : 0;
      last = now;
      if (!reduced) time += (delta * speed) / 1000 / 10;
      gl.uniform1f(u('u_time'), time);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduced && visible) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || !visible) requestAnimationFrame(draw);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduced) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [intensity, rays, reach, position, color1, color2, speed]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
