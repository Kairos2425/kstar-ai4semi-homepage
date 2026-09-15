/* fx.js — per-project animated canvas visuals (chip / aging / pinn / flow / iv / layout).
   Each .fx-stage[data-fx] gets its own canvas; one shared rAF loop drives all. */
(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stages = [...document.querySelectorAll(".fx-stage")];
  if (!stages.length) return;

  const INK = "rgba(214, 240, 255, 0.9)";
  const TEAL = "57, 230, 163";
  const CYAN = "89, 231, 214";
  const AMBER = "242, 184, 75";
  const BLUE = "120, 160, 240";
  const RED = "240, 130, 120";

  const setup = (stage) => {
    const canvas = document.createElement("canvas");
    stage.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const fit = () => {
      const r = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(2, r.width * dpr);
      canvas.height = Math.max(2, r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return r;
    };
    let rect = fit();
    new ResizeObserver(() => { rect = fit(); }).observe(stage);
    return { ctx, rect: () => rect };
  };

  const line = (ctx, x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };

  /* ================= chip — Kimi-K3 style glowing die ================= */
  const fxChip = ({ ctx, rect }, t) => {
    const { width: w, height: h } = rect();
    ctx.clearRect(0, 0, w, h);
    const m = Math.min(w, h) * 0.08;
    const dw = w - m * 2, dh = h - m * 2;
    const x0 = m, y0 = m;

    /* die frame + corner glow */
    ctx.strokeStyle = `rgba(${TEAL}, 0.7)`;
    ctx.lineWidth = 1.6;
    ctx.strokeRect(x0, y0, dw, dh);
    const gg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(dw, dh) * 0.7);
    gg.addColorStop(0, `rgba(${TEAL}, 0.10)`);
    gg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gg;
    ctx.fillRect(x0, y0, dw, dh);

    /* pads around perimeter */
    const pads = 14;
    ctx.fillStyle = `rgba(${AMBER}, 0.8)`;
    for (let i = 0; i < pads; i++) {
      const px = x0 + (dw / (pads + 1)) * (i + 1);
      ctx.fillRect(px - 2.5, y0 - 5, 5, 5);
      ctx.fillRect(px - 2.5, y0 + dh, 5, 5);
      const py = y0 + (dh / (pads + 1)) * (i + 1);
      ctx.fillRect(x0 - 5, py - 2.5, 5, 5);
      ctx.fillRect(x0 + dw, py - 2.5, 5, 5);
    }

    /* standard-cell block rows */
    const rows = 5, cols = 9;
    const cw = dw / cols, ch = dh / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = r * cols + c;
        const pulse = 0.5 + 0.5 * Math.sin(t / 900 + seed * 1.7);
        const alpha = 0.10 + pulse * 0.22;
        ctx.fillStyle = `rgba(${seed % 4 === 0 ? CYAN : TEAL}, ${alpha})`;
        ctx.fillRect(x0 + c * cw + 3, y0 + r * ch + 3, cw - 6, ch - 6);
        ctx.strokeStyle = `rgba(${TEAL}, ${0.12 + pulse * 0.25})`;
        ctx.lineWidth = 0.7;
        ctx.strokeRect(x0 + c * cw + 3, y0 + r * ch + 3, cw - 6, ch - 6);
      }
    }

    /* signal pulses traveling on routing channels between rows */
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 6; i++) {
      const laneY = y0 + (ch / 2) + i * ch * 0.85;
      const speed = 0.12 + (i % 3) * 0.05;
      const px = ((t / 1000 * speed + i * 0.37) % 1.3 - 0.15) * dw;
      const tail = 60;
      const g = ctx.createLinearGradient(x0 + px - tail, laneY, x0 + px, laneY);
      g.addColorStop(0, `rgba(${CYAN}, 0)`);
      g.addColorStop(1, `rgba(${CYAN}, 0.9)`);
      ctx.strokeStyle = g;
      line(ctx, x0 + Math.max(0, px - tail), laneY, x0 + Math.min(dw, px), laneY);
      ctx.fillStyle = `rgba(255,255,255,0.9)`;
      ctx.beginPath();
      ctx.arc(x0 + Math.min(dw, Math.max(0, px)), laneY, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    /* corner label */
    ctx.fillStyle = INK;
    ctx.font = "600 11px Consolas, monospace";
    ctx.fillText("die · 1.46M std-cells · pulses live", x0 + 6, y0 + dh - 8);
  };

  /* ================= aging — ΔVth(t) draws itself, threshold, lifetime mark ================= */
  const fxAging = ({ ctx, rect }, t) => {
    const { width: w, height: h } = rect();
    ctx.clearRect(0, 0, w, h);
    const padL = 34, padR = 12, padT = 14, padB = 24;
    const pw = w - padL - padR, ph = h - padT - padB;
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    line(ctx, padL, padT, padL, padT + ph);
    line(ctx, padL, padT + ph, padL + pw, padT + ph);

    /* threshold line */
    const thY = padT + ph * 0.28;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = `rgba(${RED}, 0.6)`;
    line(ctx, padL, thY, padL + pw, thY);
    ctx.setLineDash([]);
    ctx.fillStyle = `rgba(${RED}, 0.85)`;
    ctx.font = "600 10px Consolas, monospace";
    ctx.fillText("failure criterion", padL + 6, thY - 5);

    /* 3 curves cycling draw-in; later stresses rise faster */
    const cycle = 5200;
    const p = (t % cycle) / cycle;
    const colors = [TEAL, AMBER, RED];
    for (let k = 0; k < 3; k++) {
      const n = 0.42 + k * 0.13;                 /* faster degradation for higher stress */
      const yAt = (x) => padT + ph - ph * Math.pow(x, n) * 1.15;
      ctx.strokeStyle = `rgba(${colors[k]}, 0.9)`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      const upto = Math.max(2, Math.floor(p * 160));
      for (let i = 0; i <= upto; i++) {
        const x = i / 160;
        const y = Math.min(yAt(x), padT + ph);
        if (i === 0) ctx.moveTo(padL, padT + ph); else ctx.lineTo(padL + x * pw, y);
      }
      ctx.stroke();
      /* crossing marker once drawn past threshold */
      let xc = null;
      for (let i = 0; i <= upto; i++) {
        if (yAt(i / 160) <= thY) { xc = i / 160; break; }
      }
      if (xc !== null) {
        ctx.fillStyle = `rgba(${colors[k]}, 1)`;
        ctx.beginPath();
        ctx.arc(padL + xc * pw, thY, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.fillStyle = "rgba(214,240,255,0.65)";
    ctx.fillText("log t →", padL + pw - 44, padT + ph + 16);
    ctx.fillText("ΔVth", 6, padT + 10);
  };

  /* ================= pinn — scatter + fitting curve + uncertainty band ================= */
  const fxPinn = ({ ctx, rect }, t) => {
    const { width: w, height: h } = rect();
    ctx.clearRect(0, 0, w, h);
    const padL = 30, padR = 12, padT = 12, padB = 22;
    const pw = w - padL - padR, ph = h - padT - padB;
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    line(ctx, padL, padT, padL, padT + ph);
    line(ctx, padL, padT + ph, padL + pw, padT + ph);

    const N = 40;
    const truth = (x) => ph * (0.85 - 0.62 * Math.pow(x, 0.55));
    const pts = [];
    for (let i = 0; i < N; i++) {
      const x = i / (N - 1);
      const jitter = Math.sin(i * 12.9898) * 43758.5453;
      const noise = ((jitter - Math.floor(jitter)) - 0.5) * ph * 0.16;
      pts.push([padL + x * pw, padT + truth(x) + noise, x < 0.72]);
    }
    /* uncertainty band shimmer */
    const shimmer = 0.5 + 0.5 * Math.sin(t / 1400);
    ctx.beginPath();
    for (let i = 0; i <= 80; i++) {
      const x = i / 80;
      const y = padT + truth(x) - ph * (0.05 + 0.10 * Math.pow(x, 1.4));
      i === 0 ? ctx.moveTo(padL + x * pw, y) : ctx.lineTo(padL + x * pw, y);
    }
    for (let i = 80; i >= 0; i--) {
      const x = i / 80;
      const y = padT + truth(x) + ph * (0.05 + 0.10 * Math.pow(x, 1.4));
      ctx.lineTo(padL + x * pw, y);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${BLUE}, ${0.10 + shimmer * 0.06})`;
    ctx.fill();

    /* fit line draws in */
    const p = Math.min(1, (t % 6000) / 2200);
    ctx.strokeStyle = `rgba(${TEAL}, 0.95)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const upto = Math.floor(p * 80);
    for (let i = 0; i <= upto; i++) {
      const x = i / 80;
      const y = padT + truth(x);
      i === 0 ? ctx.moveTo(padL, y) : ctx.lineTo(padL + x * pw, y);
    }
    ctx.stroke();
    /* extrapolation zone (dashed beyond data hull) */
    const hullX = padL + 0.72 * pw;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = `rgba(${BLUE}, 0.7)`;
    line(ctx, hullX, padT, hullX, padT + ph);
    ctx.setLineDash([]);
    ctx.fillStyle = `rgba(${BLUE}, 0.8)`;
    ctx.font = "600 10px Consolas, monospace";
    ctx.fillText("domain edge", hullX - 62, padT + 12);

    /* scatter points */
    pts.forEach(([x, y, inside], i) => {
      const appear = Math.min(1, Math.max(0, (p * 1.4 - i / N) * 3));
      ctx.fillStyle = inside ? `rgba(214,240,255,${0.5 * appear})` : `rgba(${AMBER},${0.8 * appear})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.1, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "rgba(214,240,255,0.65)";
    ctx.fillText("stress →", padL + pw - 48, padT + ph + 15);
  };

  /* ================= flow — NL → plan → gate → run → evidence packets ================= */
  const fxFlow = ({ ctx, rect }, t) => {
    const { width: w, height: h } = rect();
    ctx.clearRect(0, 0, w, h);
    const labels = ["NL 意图", "冻结计划", "人工闸", "求解执行", "证据包"];
    const n = labels.length;
    const cy = h * 0.46;
    const gap = w / (n + 1);
    const R = Math.min(26, gap * 0.3);

    /* links */
    ctx.strokeStyle = `rgba(${TEAL}, 0.35)`;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < n - 1; i++) {
      line(ctx, gap * (i + 1) + R, cy, gap * (i + 2) - R, cy);
    }
    /* packets */
    for (let i = 0; i < 4; i++) {
      const span = (n - 1) * gap;
      const px = ((t / 2600 + i / 4) % 1) * span + gap;
      ctx.fillStyle = `rgba(${CYAN}, 0.95)`;
      ctx.beginPath();
      ctx.arc(px, cy, 3, 0, Math.PI * 2);
      ctx.fill();
      const g = ctx.createRadialGradient(px, cy, 0, px, cy, 9);
      g.addColorStop(0, `rgba(${CYAN}, 0.5)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, cy, 9, 0, Math.PI * 2);
      ctx.fill();
    }
    /* nodes */
    labels.forEach((label, i) => {
      const x = gap * (i + 1);
      const pulse = 0.5 + 0.5 * Math.sin(t / 800 + i * 1.3);
      const isGate = i === 2;
      ctx.beginPath();
      ctx.arc(x, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = isGate
        ? `rgba(${AMBER}, ${0.16 + pulse * 0.14})`
        : `rgba(${TEAL}, ${0.12 + pulse * 0.12})`;
      ctx.fill();
      ctx.strokeStyle = isGate ? `rgba(${AMBER}, 0.9)` : `rgba(${TEAL}, 0.75)`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      if (isGate) {
        /* gate ticks like a lock */
        ctx.strokeStyle = `rgba(${AMBER}, ${0.5 + pulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, cy, R + 5 + pulse * 3, -Math.PI / 2, -Math.PI / 2 + pulse * Math.PI);
        ctx.stroke();
      }
      ctx.fillStyle = INK;
      ctx.font = "600 11px 'Microsoft YaHei', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, x, cy + R + 18);
      ctx.textAlign = "left";
      /* hash stub under node */
      ctx.fillStyle = "rgba(214,240,255,0.4)";
      ctx.font = "9px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`***REMOVED***:${(i * 7 + 3).toString(16)}f${(i * 13 + 5).toString(16)}…`, x, cy - R - 8);
      ctx.textAlign = "left";
    });
  };

  /* ================= iv — I-V curve family sweeping ================= */
  const fxIv = ({ ctx, rect }, t) => {
    const { width: w, height: h } = rect();
    ctx.clearRect(0, 0, w, h);
    const padL = 34, padR = 12, padT = 14, padB = 24;
    const pw = w - padL - padR, ph = h - padT - padB;
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    line(ctx, padL, padT, padL, padT + ph);
    line(ctx, padL, padT + ph, padL + pw, padT + ph);

    const curves = 5;
    const cycle = 7000;
    const p = (t % cycle) / cycle;
    for (let k = 0; k < curves; k++) {
      const vg = k + 1;
      const sat = 0.2 + k * 0.17;
      const localP = Math.min(1, Math.max(0, (p * curves * 1.15 - k)));
      ctx.strokeStyle = `rgba(${k === curves - 1 ? AMBER : TEAL}, ${0.45 + k * 0.1})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      const upto = Math.floor(localP * 100);
      for (let i = 0; i <= upto; i++) {
        const x = i / 100;
        const knee = 0.22 + k * 0.02;
        const id = sat * (1 - Math.exp(-x / knee)) * (1 + 0.12 * x);
        const y = padT + ph - id * ph;
        i === 0 ? ctx.moveTo(padL, padT + ph) : ctx.lineTo(padL + x * pw, y);
      }
      ctx.stroke();
      /* probe dot at tip */
      if (upto > 2) {
        const x = upto / 100;
        const knee = 0.22 + k * 0.02;
        const id = sat * (1 - Math.exp(-x / knee)) * (1 + 0.12 * x);
        ctx.fillStyle = `rgba(255,255,255,0.9)`;
        ctx.beginPath();
        ctx.arc(padL + x * pw, padT + ph - id * ph, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.fillStyle = "rgba(214,240,255,0.65)";
    ctx.font = "600 10px Consolas, monospace";
    ctx.fillText("Vd →", padL + pw - 34, padT + ph + 16);
    ctx.fillText("Id", 8, padT + 10);
    ctx.fillText("Vg sweep", padL + 6, padT + 12);
  };

  /* ================= layout — cells snap into rows, traces route ================= */
  const fxLayout = ({ ctx, rect }, t) => {
    const { width: w, height: h } = rect();
    ctx.clearRect(0, 0, w, h);
    const m = 18;
    const rows = 4;
    const rh = (h - m * 2) / rows;
    /* rows */
    for (let r = 0; r < rows; r++) {
      ctx.strokeStyle = `rgba(${TEAL}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.strokeRect(m, m + r * rh, w - m * 2, rh - 4);
    }
    /* cells appearing in wave order */
    const palette = [TEAL, BLUE, AMBER, "150, 110, 220"];
    const cycle = 6500;
    const p = (t % cycle) / cycle;
    const cellsPerRow = 8;
    let idx = 0;
    const cellRects = [];
    for (let r = 0; r < rows; r++) {
      const cw = (w - m * 2) / cellsPerRow;
      for (let c = 0; c < cellsPerRow; c++) {
        const appear = Math.min(1, Math.max(0, p * 3.2 - (r * cellsPerRow + c) * 0.06));
        if (appear <= 0) { idx++; continue; }
        const cwRand = cw * (0.5 + ((idx * 37) % 10) / 22);
        const x = m + c * cw + 3;
        const y = m + r * rh + 4;
        const hh = (rh - 12) * appear;
        ctx.fillStyle = `rgba(${palette[idx % 4]}, ${0.25 + appear * 0.25})`;
        ctx.fillRect(x, y + (rh - 12 - hh) / 2, cwRand * appear, hh);
        ctx.strokeStyle = `rgba(${palette[idx % 4]}, 0.7)`;
        ctx.strokeRect(x, y + (rh - 12 - hh) / 2, cwRand * appear, hh);
        cellRects.push([x + cwRand / 2, y + (rh - 8) / 2]);
        idx++;
      }
    }
    /* routes between rows once cells landed */
    if (p > 0.55) {
      const rp = Math.min(1, (p - 0.55) / 0.35);
      ctx.strokeStyle = `rgba(${CYAN}, 0.85)`;
      ctx.lineWidth = 1.6;
      for (let i = 0; i < cellRects.length - 1; i += 2) {
        const [x1, y1] = cellRects[i];
        const [x2, y2] = cellRects[i + 1];
        const midY = (y1 + y2) / 2;
        const total = Math.abs(x2 - x1) * 2 + Math.abs(y2 - y1);
        const drawLen = total * rp;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        let acc = Math.abs(x2 - x1);
        if (drawLen <= acc) { ctx.lineTo(x1 + Math.sign(x2 - x1) * drawLen, y1); }
        else {
          ctx.lineTo(x2, y1);
          const remain = drawLen - acc;
          const vert = Math.min(remain, Math.abs(y2 - y1));
          ctx.lineTo(x2, y1 + Math.sign(y2 - y1) * vert);
          if (remain > vert) ctx.lineTo(x2, y1 + Math.sign(y2 - y1) * vert);
        }
        ctx.stroke();
      }
    }
    ctx.fillStyle = "rgba(214,240,255,0.65)";
    ctx.font = "600 10px Consolas, monospace";
    ctx.fillText("compile → place → route", m, h - 6);
  };

  const FX = { chip: fxChip, aging: fxAging, pinn: fxPinn, flow: fxFlow, iv: fxIv, layout: fxLayout };

  const instances = stages
    .map((stage) => {
      const fx = FX[stage.dataset.fx];
      if (!fx) return null;
      const env = setup(stage);
      return { stage, fx, env, visible: false };
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { e.target.__fxVisible = e.isIntersecting; });
    }, { threshold: 0.05 });
    instances.forEach((inst) => { inst.stage.__fxVisible = false; io.observe(inst.stage); });
  } else {
    instances.forEach((inst) => { inst.stage.__fxVisible = true; });
  }

  const loop = (ts) => {
    instances.forEach((inst) => {
      if (inst.stage.__fxVisible === false && !reducedMotion) return;
      inst.fx(inst.env, ts);
    });
    requestAnimationFrame(loop);
  };
  instances.forEach((inst) => inst.fx(inst.env, 0));
  if (!reducedMotion) requestAnimationFrame(loop);
})();
