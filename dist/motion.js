/* Ambient motion layer — aurora canvas + counters + tilt/spotlight + staggered reveal.
   Signature effect replicated from loujc.github.io: breathing color fields, light ribbon,
   pointer bloom; palette strengthened for this site's deep-night theme. */
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

  const drawColorField = (field, phase) => {
    const angle = phase * field.speed + field.offset;
    const pointerX = (pointer.x - 0.5) * field.pointer * width;
    const pointerY = (pointer.y - 0.5) * field.pointer * height;
    const orbitX = Math.sin(angle) * field.driftX * width;
    const orbitY = Math.cos(angle * 0.78) * field.driftY * height;
    const scrollX = Math.sin(scrollProgress * Math.PI * 2.2 + field.offset) * field.scroll * width;
    const scrollY = Math.cos(scrollProgress * Math.PI * 1.7 + field.offset) * field.scroll * height;
    const centerX = field.x * width + pointerX + orbitX + scrollX;
    const centerY = field.y * height + pointerY + orbitY + scrollY;
    const fieldWidth = field.width * width;
    const fieldHeight = field.height * height;
    const breathe = 1 + Math.sin(angle * 0.62) * field.breathe;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(field.rotation + Math.sin(angle * 0.42) * 0.08);
    ctx.scale((fieldWidth / 2) * breathe, (fieldHeight / 2) / breathe);
    const gradient = ctx.createRadialGradient(-0.18, -0.2, 0.04, 0, 0, 1);
    gradient.addColorStop(0, field.core);
    gradient.addColorStop(0.46, field.middle);
    gradient.addColorStop(1, field.edge);
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  };

  const drawLightRibbon = (phase) => {
    const travel = Math.sin(phase * 0.42 + scrollProgress * Math.PI * 1.4);
    const lift = Math.cos(phase * 0.34 - scrollProgress * Math.PI) * height * 0.12;
    const top = height * (0.36 + travel * 0.12) + lift;
    const thickness = height * (0.18 + Math.sin(phase * 0.27) * 0.035);
    const gradient = ctx.createLinearGradient(-width * 0.1, top, width * 1.1, top + thickness);
    gradient.addColorStop(0, "rgba(89, 231, 214, 0)");
    gradient.addColorStop(0.28, "rgba(89, 231, 214, 0.14)");
    gradient.addColorStop(0.58, "rgba(150, 169, 255, 0.16)");
    gradient.addColorStop(0.82, "rgba(255, 157, 132, 0.11)");
    gradient.addColorStop(1, "rgba(255, 157, 132, 0)");
    ctx.save();
    ctx.translate((pointer.x - 0.5) * width * 0.06, (pointer.y - 0.5) * height * 0.04);
    ctx.rotate(-0.08 + travel * 0.035);
    ctx.beginPath();
    ctx.moveTo(-width * 0.18, top);
    ctx.bezierCurveTo(width * 0.2, top - height * 0.15, width * 0.72, top + height * 0.19, width * 1.18, top - height * 0.03);
    ctx.lineTo(width * 1.18, top + thickness);
    ctx.bezierCurveTo(width * 0.7, top + thickness + height * 0.14, width * 0.2, top + thickness - height * 0.13, -width * 0.18, top + thickness);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  };

  const drawPointerBloom = () => {
    if (!finePointer) return;
    const radius = Math.max(width, height) * 0.48;
    const gradient = ctx.createRadialGradient(
      pointer.x * width, pointer.y * height, 0,
      pointer.x * width, pointer.y * height, radius
    );
    gradient.addColorStop(0, "rgba(205, 252, 246, 0.10)");
    gradient.addColorStop(0.34, "rgba(205, 252, 246, 0.035)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  const drawAmbientField = (timestamp = 0) => {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const phase = reducedMotion ? 0 : timestamp / 8200;
    /* loujc dark palette, boosted for this site's near-black background */
    const palette = [
      ["rgba(72, 224, 178, 0.55)", "rgba(31, 112, 111, 0.38)", "rgba(16, 44, 48, 0)"],
      ["rgba(103, 135, 224, 0.52)", "rgba(45, 67, 128, 0.38)", "rgba(23, 31, 61, 0)"],
      ["rgba(221, 117, 100, 0.42)", "rgba(126, 63, 75, 0.32)", "rgba(52, 24, 34, 0)"],
      ["rgba(184, 153, 230, 0.42)", "rgba(81, 64, 121, 0.30)", "rgba(34, 27, 55, 0)"],
      ["rgba(225, 190, 93, 0.36)", "rgba(108, 91, 52, 0.26)", "rgba(48, 39, 20, 0)"],
    ];
    const fields = [
      { x: 0.04, y: 0.06, width: 1.18, height: 0.88, rotation: -0.18, pointer: 0.10, scroll: 0.13, driftX: 0.18, driftY: 0.14, breathe: 0.09, speed: 0.54, offset: 0.2 },
      { x: 0.96, y: 0.08, width: 1.08, height: 0.92, rotation: 0.22, pointer: -0.08, scroll: 0.11, driftX: 0.16, driftY: 0.18, breathe: 0.08, speed: 0.43, offset: 1.5 },
      { x: 0.18, y: 0.88, width: 1.04, height: 0.86, rotation: 0.12, pointer: 0.07, scroll: -0.14, driftX: 0.20, driftY: 0.13, breathe: 0.10, speed: 0.62, offset: 2.7 },
      { x: 0.92, y: 0.74, width: 0.94, height: 1.02, rotation: -0.24, pointer: -0.09, scroll: 0.16, driftX: 0.17, driftY: 0.20, breathe: 0.075, speed: 0.38, offset: 3.9 },
      { x: 0.52, y: 0.46, width: 0.88, height: 0.76, rotation: 0.08, pointer: 0.06, scroll: -0.10, driftX: 0.14, driftY: 0.17, breathe: 0.085, speed: 0.49, offset: 5.2 },
    ].map((field, index) => ({
      ...field,
      core: palette[index][0],
      middle: palette[index][1],
      edge: palette[index][2],
    }));

    ctx.save();
    ctx.filter = `blur(${Math.max(46, Math.min(92, width * 0.065))}px) saturate(118%)`;
    fields.forEach((field) => drawColorField(field, phase));
    drawLightRibbon(phase);
    ctx.restore();

    drawPointerBloom();
    ctx.fillStyle = "rgba(4, 8, 7, 0.10)";
    ctx.fillRect(0, 0, width, height);
  };

  const animateAmbientField = (timestamp) => {
    if (document.hidden) { running = false; raf = 0; return; }
    if (timestamp - lastFrame >= 32) {
      lastFrame = timestamp;
      pointer.x += (pointer.tx - pointer.x) * 0.075;
      pointer.y += (pointer.ty - pointer.y) * 0.075;
      scrollProgress += (targetScroll - scrollProgress) * 0.06;
      drawAmbientField(timestamp);
    }
    raf = window.requestAnimationFrame(animateAmbientField);
  };

  const startAmbient = () => { if (reducedMotion || running) return; running = true; raf = window.requestAnimationFrame(animateAmbientField); };
  const stopAmbient = () => { if (raf) window.cancelAnimationFrame(raf); raf = 0; running = false; };

  if (ctx) {
    updateScroll();
    scrollProgress = targetScroll;
    resize();
    drawAmbientField();
    startAmbient();
    window.addEventListener("resize", () => { resize(); drawAmbientField(lastFrame); }, { passive: true });
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
      if (document.hidden) stopAmbient(); else startAmbient();
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
