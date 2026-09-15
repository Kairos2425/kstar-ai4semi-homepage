/* Ambient motion layer — starfield cosmos + portrait tilt/spotlight + staggered reveal.
   Dynamic starfield: 3-layer parallax stars, twinkle, shooting stars, faint nebula. */
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

  /* ---------- starfield canvas ---------- */
  const canvas = document.createElement("canvas");
  canvas.className = "ambient-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });
  const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };
  let width = 0, height = 0, pixelRatio = 1;
  let scrollProgress = 0, targetScroll = 0;
  let lastFrame = 0, raf = 0, running = false;
  let stars = [], meteors = [], nextMeteor = 0;

  /* far / mid / near layers: count, radius range, parallax depth, drift speed */
  const LAYERS = [
    { count: 150, rMin: 0.4, rMax: 1.0, depth: 0.25, drift: 0.0025, alpha: 0.55 },
    { count: 90,  rMin: 0.8, rMax: 1.6, depth: 0.55, drift: 0.006,  alpha: 0.75 },
    { count: 45,  rMin: 1.2, rMax: 2.2, depth: 1.0,  drift: 0.012,  alpha: 1.0 },
  ];

  const seedStars = () => {
    stars = [];
    LAYERS.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          r: layer.rMin + Math.random() * (layer.rMax - layer.rMin),
          depth: layer.depth,
          drift: layer.drift * (0.6 + Math.random() * 0.8),
          baseAlpha: layer.alpha * (0.55 + Math.random() * 0.45),
          twSpeed: 0.4 + Math.random() * 1.6,
          twPhase: Math.random() * Math.PI * 2,
          /* slight warm/cool tint variety */
          warm: Math.random() < 0.18,
        });
      }
    });
  };

  /* faint nebula blobs — keep the site's teal/amber identity, much subtler than before */
  const nebulae = [
    { x: 0.12, y: 0.16, r: 0.42, color: "57, 230, 163",  a: 0.05, spd: 0.10, off: 0.0 },
    { x: 0.85, y: 0.30, r: 0.38, color: "96, 140, 235",  a: 0.055, spd: 0.08, off: 2.1 },
    { x: 0.72, y: 0.82, r: 0.45, color: "150, 110, 220", a: 0.04, spd: 0.07, off: 4.0 },
    { x: 0.28, y: 0.75, r: 0.34, color: "242, 184, 75",  a: 0.035, spd: 0.09, off: 5.4 },
  ];

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

  const drawNebula = (t) => {
    nebulae.forEach((n) => {
      const phase = t / 9000;
      const breathe = 0.75 + 0.25 * Math.sin(phase * n.spd * 8 + n.off);
      const cx = (n.x + Math.sin(phase * n.spd + n.off) * 0.04 + (pointer.x - 0.5) * 0.03) * width;
      const cy = (n.y + Math.cos(phase * n.spd * 0.8 + n.off) * 0.03 + (pointer.y - 0.5) * 0.02 - scrollProgress * 0.08) * height;
      const r = n.r * Math.min(width, height) * breathe;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(${n.color}, ${n.a})`);
      g.addColorStop(0.55, `rgba(${n.color}, ${n.a * 0.4})`);
      g.addColorStop(1, `rgba(${n.color}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    });
  };

  const drawStars = (t) => {
    const px = (pointer.x - 0.5);
    const py = (pointer.y - 0.5);
    stars.forEach((s) => {
      /* slow upward drift + parallax by depth; wrap around edges */
      let x = s.x - px * s.depth * 0.06;
      let y = (s.y - t * s.drift * 0.02 - py * s.depth * 0.04 - scrollProgress * s.depth * 0.25) % 1;
      if (y < 0) y += 1;
      if (x < 0) x += 1;
      const tw = 0.55 + 0.45 * Math.sin(t / 1000 * s.twSpeed + s.twPhase);
      const alpha = s.baseAlpha * tw;
      const sx = x * width, sy = y * height;
      const radius = s.r * (0.8 + 0.2 * tw);
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fillStyle = s.warm
        ? `rgba(255, 226, 180, ${alpha})`
        : `rgba(214, 240, 255, ${alpha})`;
      ctx.fill();
      /* sparkle cross on the brightest near-layer stars */
      if (s.depth === 1 && s.r > 1.8 && tw > 0.85) {
        const glow = (tw - 0.85) * 4;
        ctx.strokeStyle = `rgba(214, 240, 255, ${0.35 * glow})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(sx - radius * 3, sy); ctx.lineTo(sx + radius * 3, sy);
        ctx.moveTo(sx, sy - radius * 3); ctx.lineTo(sx, sy + radius * 3);
        ctx.stroke();
      }
    });
  };

  const spawnMeteor = (t) => {
    const fromLeft = Math.random() < 0.5;
    meteors.push({
      x: fromLeft ? -0.05 : Math.random() * 0.6 + 0.4,
      y: Math.random() * 0.35,
      vx: (fromLeft ? 1 : -1) * (0.00045 + Math.random() * 0.00035),
      vy: 0.00025 + Math.random() * 0.0002,
      born: t,
      life: 1400 + Math.random() * 900,
    });
    nextMeteor = t + 3500 + Math.random() * 6000;
  };

  const drawMeteors = (t) => {
    meteors = meteors.filter((m) => t - m.born < m.life);
    meteors.forEach((m) => {
      const age = (t - m.born) / m.life;
      const fade = age < 0.15 ? age / 0.15 : 1 - (age - 0.15) / 0.85;
      const mx = (m.x + m.vx * (t - m.born)) * width;
      const my = (m.y + m.vy * (t - m.born)) * height;
      const tailX = mx - m.vx * 260 * width / 1000;
      const tailY = my - m.vy * 260 * height / 1000;
      const g = ctx.createLinearGradient(tailX, tailY, mx, my);
      g.addColorStop(0, "rgba(190, 240, 255, 0)");
      g.addColorStop(0.8, `rgba(190, 240, 255, ${0.5 * fade})`);
      g.addColorStop(1, `rgba(255, 255, 255, ${0.9 * fade})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(mx, my);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mx, my, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fade})`;
      ctx.fill();
    });
  };

  const draw = (ts = 0) => {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    drawNebula(ts);
    drawStars(ts);
    if (!reducedMotion && ts > nextMeteor) spawnMeteor(ts);
    drawMeteors(ts);
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
    seedStars();
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
        pointer.tx = 0.5; pointer.ty = 0.4;
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop(); else start();
    });
  }

  /* ---------- animated counters (dashboard) ---------- */
  const counters = [...document.querySelectorAll("[data-count-to]")];
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.countTo);
      const decimals = parseInt(el.dataset.countDecimals || "0", 10);
      const dur = 1300;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
      };
      if (reducedMotion) { el.textContent = target.toFixed(decimals); return; }
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
    } else {
      const co = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          co.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      counters.forEach((c) => co.observe(c));
    }
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
