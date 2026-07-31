"use client";

import { useEffect, useRef } from "react";

/**
 * ContourField — the site's signature surface.
 *
 * A hand-written WebGL fragment shader renders a topographic height field
 * (domain-warped fBm) as fine iso-lines, like a survey map of a material
 * being machined. The cursor presses a dome into the field with inertia;
 * scroll drifts it in parallax. No 3D library — the whole renderer is this
 * file, ~6KB, and idles at zero cost when offscreen.
 *
 * Respects prefers-reduced-motion by rendering a single static frame.
 */

type Props = {
  density?: number; // iso-line count across the height range
  alpha?: number; // overall line opacity
  line?: [number, number, number]; // rgb 0–1
  accent?: [number, number, number];
  fade?: [number, number, number, number]; // bottom, top, left, right (0–1 heights)
  speed?: number;
  parallax?: boolean;
  interactive?: boolean;
  className?: string;
};

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uPress;
uniform float uScroll;
uniform float uDensity;
uniform float uAlpha;
uniform vec3 uLine;
uniform vec3 uAccent;
uniform vec4 uFade;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < OCT; i++) {
    v += a * noise(p);
    p = r * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  p.y -= uScroll * 0.35;

  float t = uTime * 0.045;
  vec2 q = vec2(
    fbm(p * 1.3 + vec2(t, -t * 0.7)),
    fbm(p * 1.3 + vec2(-t * 0.6, t * 0.9) + 5.2)
  );

  vec2 m = (uMouse - 0.5 * uRes) / min(uRes.x, uRes.y);
  float d = length(p - vec2(m.x, m.y - uScroll * 0.35));
  float dome = exp(-d * d * 9.0) * uPress * 0.5;

  float h = fbm(p * 1.9 + q * 1.25) + dome;

  float lv = h * uDensity;
  float f = fract(lv);
#ifdef HAS_DERIV
  float w = fwidth(lv) * 1.4 + 1e-4;
#else
  float w = 0.06;
#endif
  float minor = 1.0 - smoothstep(0.0, w, min(f, 1.0 - f));

  float lv5 = lv / 5.0;
  float f5 = fract(lv5);
#ifdef HAS_DERIV
  float w5 = fwidth(lv5) * 1.7 + 1e-4;
#else
  float w5 = 0.02;
#endif
  float major = 1.0 - smoothstep(0.0, w5, min(f5, 1.0 - f5));

  /* keep text zones clean */
  float fade = smoothstep(0.0, max(uFade.x, 1e-3), uv.y)
             * (1.0 - smoothstep(1.0 - max(uFade.y, 1e-3), 1.0, uv.y))
             * smoothstep(0.0, max(uFade.z, 1e-3), uv.x)
             * (1.0 - smoothstep(1.0 - max(uFade.w, 1e-3), 1.0, uv.x));

  float glow = exp(-d * d * 7.0) * uPress;
  vec3 col = mix(uLine, uAccent, clamp(glow * 0.85 + major * 0.1, 0.0, 1.0));
  float a = (minor * 0.3 + major * 0.5) * fade * uAlpha;
  gl_FragColor = vec4(col * a, a);
}
`;

export default function ContourField({
  density = 22,
  alpha = 0.85,
  line = [0.56, 0.7, 0.94], // periwinkle survey lines
  accent = [0.91, 0.69, 0.31], // golden signal under the cursor
  fade = [0.3, 0.14, 0.05, 0.05],
  speed = 1,
  parallax = true,
  interactive = true,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    if (!gl) return; // graceful: the graphite bg stands alone

    /* phones get 3 fbm octaves + a lower DPR cap — same look, half the ALU cost */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const hasDeriv = !!gl.getExtension("OES_standard_derivatives");
    const fragSrc =
      (hasDeriv ? "#extension GL_OES_standard_derivatives : enable\n#define HAS_DERIV\n" : "") +
      `#define OCT ${coarse ? 3 : 4}\n` +
      FRAG;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uTime = U("uTime"), uMouse = U("uMouse"), uPress = U("uPress"),
      uScroll = U("uScroll"), uDensity = U("uDensity"), uAlpha = U("uAlpha"),
      uLine = U("uLine"), uAccent = U("uAccent"), uFade = U("uFade");

    gl.uniform1f(uDensity, density);
    gl.uniform1f(uAlpha, alpha);
    gl.uniform3fv(uLine, line);
    gl.uniform3fv(uAccent, accent);
    gl.uniform4fv(uFade, fade);

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.35 : 1.75);
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* pointer state with inertia */
    const target = { x: w * 0.66, y: h * 0.5 };
    const cur = { x: target.x, y: target.y };
    let press = 0, pressTarget = 0, lastMove = 0;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) * dpr;
      target.y = (rect.height - (e.clientY - rect.top)) * dpr;
      pressTarget = 1;
      lastMove = performance.now();
    };
    const onLeave = () => { pressTarget = 0; };
    if (interactive && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onLeave, { passive: true });
    }

    let raf = 0, running = false, visible = true;
    let clock = 0, prev = performance.now();
    let lastScrollY = window.scrollY, scrollVel = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      clock += dt * speed;

      const k = 1 - Math.pow(0.0015, dt); // framerate-independent lerp

      if (coarse) {
        /* touch life: smoothed scroll velocity becomes pressure… */
        const sy = window.scrollY;
        const v = Math.abs(sy - lastScrollY) / Math.max(dt, 1e-3);
        lastScrollY = sy;
        scrollVel += (v - scrollVel) * k * 0.5;

        /* …and, when no finger is down, the dome rides a slow orbit */
        if (now - lastMove > 600) {
          target.x = w * (0.55 + 0.24 * Math.sin(clock * 0.42));
          target.y = h * (0.52 + 0.2 * Math.sin(clock * 0.77 + 1.7));
          pressTarget = Math.min(0.9, 0.3 + scrollVel / 2600);
        }
      } else if (pressTarget === 1 && now - lastMove > 1200) {
        /* desktop: rest the press to a light touch after idle */
        pressTarget = 0.35;
      }

      cur.x += (target.x - cur.x) * k * 0.55;
      cur.y += (target.y - cur.y) * k * 0.55;
      press += (pressTarget - press) * k * 0.4;

      let scroll = 0;
      if (parallax) {
        const rect = canvas.getBoundingClientRect();
        scroll = Math.max(-1.5, Math.min(1.5, -rect.top / Math.max(rect.height, 1)));
      }

      gl.uniform1f(uTime, clock);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uPress, press);
      gl.uniform1f(uScroll, scroll);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    /* static frame for reduced motion */
    if (reduced) {
      gl.uniform1f(uTime, 12);
      gl.uniform2f(uMouse, w * 0.66, h * 0.55);
      gl.uniform1f(uPress, 0.4);
      gl.uniform1f(uScroll, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "10%" },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const onLost = (e: Event) => { e.preventDefault(); stop(); };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
