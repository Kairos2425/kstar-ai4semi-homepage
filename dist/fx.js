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
    return { ctx, rect: () => rect, stage };
  };

  const line = (ctx, x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };

  /* ================= chip — isometric 3D IC stack (SoIC-style layered anatomy) ================= */
  /* Real package structure: PCB 载板 → ABF 基板 → µBump/C4 → 中介层(TSV+RDL) → 混合键合 → 顶 Die(FEOL/BEOL/Si)。
     Hover/tap → 爆炸视图；TSV 上行数据脉冲；鼠标视差。 */
  const fxChip = (env, t) => {
    const { ctx: x, rect, stage } = env;
    const { width: w, height: h } = rect();
    x.clearRect(0, 0, w, h);

    const S = env._iso || (env._iso = (() => {
      const traces = [];
      for (let i = 0; i < 22; i++) {
        const horiz = Math.random() < 0.55, x0 = -7 + Math.random() * 14, y0 = -7 + Math.random() * 14, l = 1 + Math.random() * 4;
        traces.push(horiz ? { x0, y0, x1: Math.min(7.5, x0 + l), y1: y0, hot: Math.random() < 0.3 }
                          : { x0, y0, x1: x0, y1: Math.min(7.5, y0 + l), hot: Math.random() < 0.3 });
      }
      const pulses = [];
      for (let i = 0; i < 16; i++) pulses.push({ gx: -3.5 + Math.random() * 7, gy: -3.5 + Math.random() * 7, o: Math.random(), v: 0.0022 + Math.random() * 0.003 });
      const st = { traces, pulses, exC: 0, exT: 0, ox: 0, oy: 0 };
      if (stage) {
        stage.addEventListener("pointermove", (e) => {
          const r = stage.getBoundingClientRect();
          const mx = (e.clientX - r.left) / r.width, my = (e.clientY - r.top) / r.height;
          st.ox = (mx - 0.5) * 0.06; st.oy = (my - 0.5) * 0.04;
          st.exT = (Math.abs(mx - 0.5) < 0.42 && Math.abs(my - 0.52) < 0.45) ? 1 : 0;
        });
        stage.addEventListener("pointerleave", () => { st.exT = 0; st.ox = 0; st.oy = 0; });
        stage.addEventListener("pointerdown", () => { st.exT = st.exT ? 0 : 1; });
      }
      return st;
    })());

    /* explode: hover 触发 + 缓慢自动呼吸展示 */
    const auto = 0.30 + 0.30 * Math.sin(t / 2600 - Math.PI / 2);
    const exTarget = Math.max(S.exT, reducedMotion ? 0 : Math.max(0, auto));
    S.exC += (exTarget - S.exC) * 0.075;
    if (Math.abs(exTarget - S.exC) < 0.004) S.exC = exTarget;
    const ex = S.exC;

    const u = Math.min(w, h) * 0.046, cx = w * (0.5 + S.ox), cy = h * (0.60 + S.oy);
    const P = (X, Y, Z) => [cx + (X - Y) * 0.866 * u, cy + (X + Y) * 0.5 * u - Z * u];
    const poly = (p, f, s, lw) => { x.beginPath(); p.forEach((q, i) => i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])); x.closePath(); if (f) { x.fillStyle = f; x.fill(); } if (s) { x.strokeStyle = s; x.lineWidth = lw || 1; x.stroke(); } };
    const plate = (X0, Y0, Z0, dx, dy, dz, c) => {
      const a = P(X0, Y0, Z0 + dz), b = P(X0 + dx, Y0, Z0 + dz), cc = P(X0 + dx, Y0 + dy, Z0 + dz), d = P(X0, Y0 + dy, Z0 + dz);
      const a2 = P(X0, Y0, Z0), b2 = P(X0 + dx, Y0, Z0), d2 = P(X0, Y0 + dy, Z0), c3 = P(X0 + dx, Y0 + dy, Z0);
      poly([d, d2, c3, cc], c.rgt, c.edge); poly([cc, c3, b2, b], c.lft, c.edge); poly([a, b, cc, d], c.top, c.edge);
    };
    const dot = (X, Y, Z, r, c, glow) => { const p = P(X, Y, Z); if (glow) { x.shadowColor = c; x.shadowBlur = 8; } x.fillStyle = c; x.beginPath(); x.arc(p[0], p[1], r, 0, 7); x.fill(); x.shadowBlur = 0; };
    const vline = (X, Y, Z0, Z1, c, lw) => { const a = P(X, Y, Z0), b = P(X, Y, Z1); x.strokeStyle = c; x.lineWidth = lw || 1; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); };

    /* PCB 载板 + 走线 */
    plate(-7.5, -7.5, -0.01, 15, 15, 0.35, { top: "#070B13", lft: "#0A1020", rgt: "#0C1322", edge: "rgba(90,140,200,.18)" });
    S.traces.forEach((tr) => {
      const p1 = P(tr.x0, tr.y0, 0.36), p2 = P(tr.x1, tr.y1, 0.36);
      x.strokeStyle = tr.hot ? `rgba(${CYAN}, .5)` : `rgba(${BLUE}, .22)`;
      x.lineWidth = tr.hot ? 1.2 : 0.8;
      x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.stroke();
      if (tr.hot) dot(tr.x1, tr.y1, 0.36, 1.1, `rgba(${CYAN}, .9)`, 1);
    });

    /* 五层堆叠 */
    const LY = [
      { n: "封装基板 · ABF", s: 5.5, dz: 0.9, z: 0.5, c: { top: "#101A2E", lft: "#0A1220", rgt: "#0E1830", edge: "rgba(124,160,220,.4)" }, feat: "sub" },
      { n: "µBump · ~40µm", s: 4.9, dz: 0.22, z: 1.4, c: { top: "rgba(20,28,46,.55)", lft: "rgba(14,20,34,.5)", rgt: "rgba(18,26,44,.55)", edge: "rgba(255,197,61,.35)" }, feat: "ubump" },
      { n: "中介层 · TSV+RDL", s: 5.0, dz: 0.8, z: 1.62, c: { top: "rgba(38,90,160,.34)", lft: "rgba(16,40,80,.5)", rgt: "rgba(24,58,110,.5)", edge: "rgba(124,180,255,.55)" }, feat: "tsv" },
      { n: "混合键合 · Cu–Cu", s: 4.6, dz: 0.14, z: 2.42, c: { top: "rgba(255,197,61,.10)", lft: "rgba(120,90,20,.4)", rgt: "rgba(140,105,25,.45)", edge: "rgba(255,197,61,.75)" }, feat: "hb" },
      { n: "顶部 Die · 阵列+BEOL", s: 4.4, dz: 0.62, z: 2.56, c: { top: "rgba(70,150,255,.30)", lft: "rgba(24,60,120,.45)", rgt: "rgba(34,80,150,.5)", edge: "rgba(140,200,255,.8)" }, feat: "die" },
    ];
    const zp = (i) => LY[i].z * (1 + ex * 0.9) + (i === 4 ? Math.sin(t * 0.018) * 0.05 : 0);
    const LAB = [];

    /* 底阴影 + 氛围辉光 */
    const sh = P(0, 0, 0.55);
    x.fillStyle = "rgba(0,0,0,.4)"; x.beginPath(); x.ellipse(sh[0], sh[1] + u * 0.4, u * 7, u * 1.6, 0, 0, 7); x.fill();
    const g0 = P(0, 0, 2.4), rg = x.createRadialGradient(g0[0], g0[1], 0, g0[0], g0[1], u * 9);
    rg.addColorStop(0, `rgba(${TEAL}, .08)`); rg.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = rg; x.fillRect(g0[0] - u * 9, g0[1] - u * 9, u * 18, u * 18);

    LY.forEach((L, i) => {
      const z0 = zp(i);
      if (i !== 4) plate(-L.s, -L.s, z0, L.s * 2, L.s * 2, L.dz, L.c);
      if (L.feat === "sub") {
        for (let k = 0; k < 12; k++) {
          const px = -L.s + L.s * 2 * (k + 0.5) / 12;
          const a = P(px, L.s, z0 + 0.08), b = P(px, L.s, z0 + 0.5);
          x.fillStyle = "#C9A227"; x.fillRect(a[0] - 1.4, a[1] - 2, 2.8, b[1] - a[1] + 2);
          const py = -L.s + L.s * 2 * (k + 0.5) / 12;
          const a2 = P(L.s, py, z0 + 0.08), b2 = P(L.s, py, z0 + 0.5);
          x.fillRect(a2[0] - 1.4, a2[1] - 2, 2.8, b2[1] - a2[1] + 2);
        }
      }
      if (L.feat === "ubump" || L.feat === "hb") {
        const n = L.feat === "hb" ? 13 : 9;
        for (let ix = 0; ix < n; ix++) for (let iy = 0; iy < n; iy++) {
          const gx = -L.s + L.s * 2 * (ix + 0.5) / n, gy = -L.s + L.s * 2 * (iy + 0.5) / n;
          dot(gx, gy, z0 + L.dz, L.feat === "hb" ? 1.15 : 1.5, "#E8B32C", (ix + iy) % 7 === 0);
        }
        if (L.feat === "hb") {
          const ga = 0.55 + 0.4 * Math.sin(t * 0.05);
          plate(-L.s, -L.s, z0, L.s * 2, L.s * 2, L.dz, { top: null, lft: null, rgt: null, edge: `rgba(255,214,90,${ga})` });
        }
      }
      if (L.feat === "tsv") {
        for (let ix = 0; ix < 4; ix++) for (let iy = 0; iy < 4; iy++) {
          const gx = -L.s + L.s * 2 * (ix + 0.5) / 4, gy = -L.s + L.s * 2 * (iy + 0.5) / 4;
          vline(gx, gy, z0 - 0.22, z0 + L.dz, "#E8B32C", 1.6);
          dot(gx, gy, z0 + L.dz, 1.3, "#FFD65A");
        }
        x.strokeStyle = "rgba(140,200,255,.5)";
        for (let k = 0; k < 4; k++) {
          const a = P(-L.s + L.s * 2 * k / 4 + 1, -L.s, z0 + L.dz + 0.01), b = P(-L.s + L.s * 2 * k / 4 + 3.4, -L.s + 2.6, z0 + L.dz + 0.01);
          x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        }
      }
      if (L.feat === "die") {
        const gap = ex * 1.15;
        const SUB = [
          { f0: 0, f1: 0.17, key: "feol", c: { top: "rgba(255,140,80,.30)", lft: "rgba(120,50,20,.42)", rgt: "rgba(150,65,25,.46)", edge: "rgba(255,160,90,.8)" } },
          { f0: 0.17, f1: 0.55, key: "beol", c: { top: "rgba(90,170,255,.30)", lft: "rgba(30,70,130,.45)", rgt: "rgba(40,90,160,.5)", edge: "rgba(140,205,255,.75)" } },
          { f0: 0.55, f1: 1, key: "si", c: { top: `rgba(${TEAL}, .14)`, lft: "rgba(14,80,66,.4)", rgt: "rgba(20,95,78,.45)", edge: `rgba(${TEAL}, .6)` } },
        ];
        SUB.forEach((sp, k) => {
          const sz = z0 + sp.f0 * L.dz + k * gap, sh2 = Math.max(0.05, (sp.f1 - sp.f0) * L.dz);
          plate(-L.s, -L.s, sz, L.s * 2, L.s * 2, sh2, sp.c);
          const zt = sz + sh2;
          if (sp.key === "feol") {
            const n = 9, gs = L.s * 2 / n;
            for (let a = 0; a < n; a++) for (let b2 = 0; b2 < n; b2++) {
              const gx = -L.s + gs * (a + 0.5), gy = -L.s + gs * (b2 + 0.5), p = P(gx, gy, zt + 0.012);
              x.strokeStyle = (a + b2) % 5 === 0 ? "rgba(255,190,120,.85)" : "rgba(255,150,90,.55)";
              x.lineWidth = 1; x.beginPath(); x.moveTo(p[0] - 2.4, p[1] + 1.2); x.lineTo(p[0] + 2.4, p[1] - 1.2); x.stroke();
            }
          }
          if (sp.key === "beol") {
            const n = 6, gs = L.s * 2 / n;
            x.strokeStyle = "rgba(150,210,255,.55)"; x.lineWidth = 0.8;
            for (let a = 0; a <= n; a++) {
              const p1 = P(-L.s + gs * a, -L.s, zt + 0.012), p2 = P(-L.s + gs * a, L.s, zt + 0.012);
              const q1 = P(-L.s, -L.s + gs * a, zt + 0.012), q2 = P(L.s, -L.s + gs * a, zt + 0.012);
              x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.moveTo(q1[0], q1[1]); x.lineTo(q2[0], q2[1]); x.stroke();
            }
            if (ex > 0.15) for (let a = 0; a < 4; a++) for (let b2 = 0; b2 < 4; b2++) {
              const gx = -L.s + L.s * 2 * (a + 0.5) / 4, gy = -L.s + L.s * 2 * (b2 + 0.5) / 4;
              vline(gx, gy, z0 + 0.17 * L.dz + 0.02, zt - 0.02, "rgba(255,197,61,.8)", 1.3);
            }
          }
          if (sp.key === "si") {
            const n = 7, gs = L.s * 2 / n;
            for (let ix = 0; ix < n; ix++) for (let iy = 0; iy < n; iy++) {
              const gx = -L.s + gs * ix, gy = -L.s + gs * iy;
              const hot = (ix * 7 + iy * 3) % 11 === 0;
              plate(gx + 0.06, gy + 0.06, zt, gs - 0.12, gs - 0.12, 0.02, { top: hot ? `rgba(${CYAN}, .5)` : `rgba(${TEAL}, .18)`, lft: null, rgt: null, edge: `rgba(${TEAL}, .3)` });
            }
          }
        });
        if (ex > 0.4 && w > 640) {
          const side = 1;
          [["FEOL · 晶体管阵列", 0], ["BEOL · M1–MT 互连", 1], ["Si 衬底", 2]].forEach(([nm, k]) => {
            const sz = z0 + SUB[k].f0 * L.dz + k * gap + (SUB[k].f1 - SUB[k].f0) * L.dz * 0.5;
            const ay = P(L.s * side, 0, sz);
            LAB.push({ t: nm, y0: ay[1], y: ay[1], ax: ay[0], side, sub: true });
          });
        }
      }
      if (ex > 0.15 && w > 640 && !(i === 4 && ex > 0.4)) {
        const side = i % 2 ? 1 : -1, ay = P(L.s * side, 0, z0 + L.dz);
        LAB.push({ t: L.n, y0: ay[1], y: ay[1], ax: ay[0], side, sub: false });
      }
    });

    /* 标签统一绘制 + 防重叠 */
    if (LAB.length) {
      LAB.sort((a, b) => a.y - b.y);
      for (let k = 1; k < LAB.length; k++) if (LAB[k].y - LAB[k - 1].y < 17) LAB[k].y = LAB[k - 1].y + 17;
      LAB.forEach((L2) => {
        const lx = L2.side > 0 ? w * 0.97 : w * 0.14;
        x.strokeStyle = "rgba(255,255,255,.28)"; x.beginPath(); x.moveTo(L2.ax, L2.y0); x.lineTo(lx, L2.y); x.stroke();
        x.fillStyle = "rgba(255,255,255,.5)"; x.beginPath(); x.arc(L2.ax, L2.y0, 2, 0, 7); x.fill();
        x.fillStyle = L2.sub ? "rgba(190,215,235,.8)" : INK;
        x.font = L2.sub ? "600 11px Consolas, monospace" : "700 11px Consolas, monospace";
        x.textAlign = L2.side > 0 ? "right" : "left";
        x.fillText(L2.t, lx, L2.y - 5);
        x.textAlign = "left";
      });
    }

    /* 数据脉冲：沿 TSV 上行 → 混合键合面横向扩散 */
    S.pulses.forEach((p) => {
      p.o += p.v; if (p.o > 1) p.o = 0;
      const z0 = LY[2].z * (1 + ex * 0.9) - 0.2, z1 = (LY[3].z + LY[3].dz) * (1 + ex * 0.9);
      if (p.o < 0.7) {
        dot(p.gx, p.gy, z0 + (z1 - z0) * (p.o / 0.7), 1.7, "#FFD65A", 1);
      } else {
        const r = (p.o - 0.7) / 0.3 * LY[3].s;
        dot(p.gx + r * 0.5, p.gy + r * 0.5, z1, 1.5, `rgba(255,214,90,${1 - (p.o - 0.7) / 0.3})`, 1);
      }
    });
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
    const labels = ["需求理解", "方案规划", "可信执行", "结果验证", "报告交付"];
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
