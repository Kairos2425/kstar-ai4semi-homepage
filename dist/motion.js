/* Ambient motion layer — aurora canvas + portrait tilt/spotlight + staggered reveal.
   Visual language inspired by loujc.github.io; implementation adapted to this site. */
(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  document.documentElement.classList.add("motion-ready");

  /* ---------- staggered reveal ---------- */
  const revealTargets = [...document.querySelectorAll(".reveal")].filter(Boolean);
  revealTargets.forEach((target, index) => {
    target.style.setProperty("--reveal-delay", `${Math.min(index * 60, 300)}ms`);
  });
  const revealAll = () => revealTargets.forEach((t) => t.classList.add("is-visible"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" }
    );
    revealTargets.forEach((t) => observer.observe(t));
  }

  /* ---------- ambient aurora canvas ---------- */
  const canvas = document.createElement("canvas");
  canvas.className = "ambient-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });
  const pointer = { x: 0.58, y: 0.32, tx: 0.58, ty: 0.32 };
  let width = 0, height = 0, pixelRatio = 1;
  let scrollProgress = 0, targetScroll = 0;
  let lastFrame = 0, raf = 0, running = false;

  const resize = () => {
    if (!ctx) return;
    width = Math.max(1, Math.round(window.innerWidth));
    height = Math.max(1, Math.round(window.innerHeight));
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const updateScroll = () => {
    const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetScroll = Math.min(1, Math.max(0, window.scrollY / range));
  };

  /* palette tuned to the site's teal/amber-on-night identity */
  const palette = [
    ["rgba(57, 230, 163, 0.34)", "rgba(24, 110, 84, 0.26)", "rgba(7, 16, 15, 0)"],
    ["rgba(64, 140, 224, 0.28)", "rgba(30, 60, 120, 0.24)", "rgba(8, 12, 26, 0)"],
    ["rgba(242, 184, 75, 0.24)", "rgba(120, 84, 30, 0.20)", "rgba(22, 16, 6, 0)"],
    ["rgba(150, 120, 226, 0.22)", "rgba(70, 56, 118, 0.18)", "rgba(16, 12, 30, 0)"],
    ["rgba(89, 231, 214, 0.24)", "rgba(40, 110, 104, 0.20)", "rgba(8, 22, 22, 0)"],
  ];
  const fields = [
    { x: 0.04, y: 0.06, w: 1.18, h: 0.88, rot: -0.18, ptr: 0.10, scr: 0.13, dx: 0.18, dy: 0.14, br: 0.09, spd: 0.54, off: 0.2 },
    { x: 0.96, y: 0.08, w: 1.08, h: 0.92, rot: 0.22, ptr: -0.08, scr: 0.11, dx: 0.16, dy: 0.18, br: 0.08, spd: 0.43, off: 1.5 },
    { x: 0.18, y: 0.88, w: 1.04, h: 0.86, rot: 0.12, ptr: 0.07, scr: -0.14, dx: 0.20, dy: 0.13, br: 0.10, spd: 0.62, off: 2.7 },
    { x: 0.92, y: 0.74, w: 0.94, h: 1.02, rot: -0.24, ptr: -0.09, scr: 0.16, dx: 0.17, dy: 0.20, br: 0.075, spd: 0.38, off: 3.9 },
    { x: 0.52, y: 0.46, w: 0.88, h: 0.76, rot: 0.08, ptr: 0.06, scr: -0.10, dx: 0.14, dy: 0.17, br: 0.085, spd: 0.49, off: 5.2 },
  ].map((f, i) => ({ ...f, core: palette[i][0], mid: palette[i][1], edge: palette[i][2] }));

  const drawField = (f, phase) => {
    const a = phase * f.spd + f.off;
    const px = (pointer.x - 0.5) * f.ptr * width;
    const py = (pointer.y - 0.5) * f.ptr * height;
    const ox = Math.sin(a) * f.dx * width;
    const oy = Math.cos(a * 0.78) * f.dy * height;
    const sx = Math.sin(scrollProgress * Math.PI * 2.2 + f.off) * f.scr * width;
    const sy = Math.cos(scrollProgress * Math.PI * 1.7 + f.off) * f.scr * height;
    const cx = f.x * width + px + ox + sx;
    const cy = f.y * height + py + oy + sy;
    const breathe = 1 + Math.sin(a * 0.62) * f.br;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(f.rot + Math.sin(a * 0.42) * 0.08);
    ctx.scale((f.w * width / 2) * breathe, (f.h * height / 2) / breathe);
    const g = ctx.createRadialGradient(-0.18, -0.2, 0.04, 0, 0, 1);
    g.addColorStop(0, f.core);
    g.addColorStop(0.46, f.mid);
    g.addColorStop(1, f.edge);
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  };

  const drawRibbon = (phase) => {
    const travel = Math.sin(phase * 0.42 + scrollProgress * Math.PI * 1.4);
    const lift = Math.cos(phase * 0.34 - scrollProgress * Math.PI) * height * 0.12;
    const top = height * (0.36 + travel * 0.12) + lift;
    const thick = height * (0.18 + Math.sin(phase * 0.27) * 0.035);
    const g = ctx.createLinearGradient(-width * 0.1, top, width * 1.1, top + thick);
    g.addColorStop(0, "rgba(89, 231, 214, 0)");
    g.addColorStop(0.28, "rgba(89, 231, 214, 0.09)");
    g.addColorStop(0.58, "rgba(120, 150, 255, 0.10)");
    g.addColorStop(0.82, "rgba(242, 184, 75, 0.07)");
    g.addColorStop(1, "rgba(242, 184, 75, 0)");
    ctx.save();
    ctx.translate((pointer.x - 0.5) * width * 0.06, (pointer.y - 0.5) * height * 0.04);
    ctx.rotate(-0.08 + travel * 0.035);
    ctx.beginPath();
    ctx.moveTo(-width * 0.18, top);
    ctx.bezierCurveTo(width * 0.2, top - height * 0.15, width * 0.72, top + height * 0.19, width * 1.18, top - height * 0.03);
    ctx.lineTo(width * 1.18, top + thick);
    ctx.bezierCurveTo(width * 0.7, top + thick + height * 0.14, width * 0.2, top + thick - height * 0.13, -width * 0.18, top + thick);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  };

  const drawBloom = () => {
    if (!finePointer) return;
    const r = Math.max(width, height) * 0.48;
    const g = ctx.createRadialGradient(
      pointer.x * width, pointer.y * height, 0,
      pointer.x * width, pointer.y * height, r
    );
    g.addColorStop(0, "rgba(190, 252, 235, 0.07)");
    g.addColorStop(0.34, "rgba(190, 252, 235, 0.022)");
    g.addColorStop(1, "rgba(190, 252, 235, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  };

  const draw = (ts = 0) => {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const phase = reducedMotion ? 0 : ts / 8200;
    ctx.save();
    ctx.filter = `blur(${Math.max(46, Math.min(92, width * 0.065))}px) saturate(118%)`;
    fields.forEach((f) => drawField(f, phase));
    drawRibbon(phase);
    ctx.restore();
    drawBloom();
    ctx.fillStyle = "rgba(4, 8, 7, 0.16)";
    ctx.fillRect(0, 0, width, height);
  };

  const loop = (ts) => {
    if (document.hidden) { running = false; raf = 0; return; }
    if (ts - lastFrame >= 32) {
      lastFrame = ts;
      pointer.x += (pointer.tx - pointer.x) * 0.075;
      pointer.y += (pointer.ty - pointer.y) * 0.075;
      scrollProgress += (targetScroll - scrollProgress) * 0.06;
      draw(ts);
    }
    raf = window.requestAnimationFrame(loop);
  };
  const start = () => { if (reducedMotion || running) return; running = true; raf = window.requestAnimationFrame(loop); };
  const stop = () => { if (raf) window.cancelAnimationFrame(raf); raf = 0; running = false; };

  if (ctx) {
    updateScroll();
    scrollProgress = targetScroll;
    resize();
    draw();
    start();
    window.addEventListener("resize", () => { resize(); draw(lastFrame); }, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    if (finePointer) {
      window.addEventListener("pointermove", (e) => {
        pointer.tx = Math.min(1, Math.max(0, e.clientX / width));
        pointer.ty = Math.min(1, Math.max(0, e.clientY / height));
      }, { passive: true });
      document.documentElement.addEventListener("pointerleave", () => {
        pointer.tx = 0.58; pointer.ty = 0.32;
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop(); else start();
    });
  }

  /* ---------- portrait tilt + spotlight ---------- */
  document.querySelectorAll("[data-tilt]").forEach((target) => {
    let frame = 0;
    const isPortrait = target.hasAttribute("data-spotlight");
    const locked = () => target.classList.contains("spot-locked");
    const setSpot = (x, y) => {
      target.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
      target.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
    };
    const reset = () => {
      window.cancelAnimationFrame(frame);
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
      if (isPortrait && !locked()) {
        setSpot(0.5, 0.34);
        target.classList.remove("spot-active");
      }
    };
    if (finePointer && !reducedMotion) {
      target.addEventListener("pointermove", (e) => {
        const b = target.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (e.clientX - b.left) / b.width));
        const y = Math.min(1, Math.max(0, (e.clientY - b.top) / b.height));
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => {
          target.style.setProperty("--tilt-x", `${(-(y - 0.5) * 3).toFixed(2)}deg`);
          target.style.setProperty("--tilt-y", `${((x - 0.5) * 4).toFixed(2)}deg`);
          if (isPortrait) { setSpot(x, y); target.classList.add("spot-active"); }
        });
      });
      target.addEventListener("pointerleave", reset);
      target.addEventListener("pointercancel", reset);
    }
    if (!isPortrait) return;
    setSpot(0.5, 0.34);
    target.addEventListener("click", () => {
      const next = !locked();
      target.classList.toggle("spot-locked", next);
      target.classList.add("spot-active", "spot-pulse");
      target.setAttribute("aria-pressed", String(next));
      window.setTimeout(() => target.classList.remove("spot-pulse"), 700);
      if (!next && !target.matches(":hover, :focus-visible")) reset();
    });
  });
})();
