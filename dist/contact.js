/* contact.js — 轻量联系弹窗：点击 a[href="#contact-me"] 弹出作者邮箱 */
(() => {
  const EMAIL = "lixd@alumni.pku.edu.cn";

  let modal = null;
  const ensureModal = () => {
    if (modal) return modal;
    const wrap = document.createElement("div");
    wrap.className = "contact-modal";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML = `
      <div class="contact-modal__card">
        <button class="contact-modal__close" type="button" aria-label="关闭">&times;</button>
        <p class="contact-modal__title">联系作者获取体验</p>
        <p class="contact-modal__desc">工具为内部授权软件，体验、试用或合作请联系：</p>
        <code class="contact-modal__email">${EMAIL}</code>
        <div class="contact-modal__actions">
          <button class="contact-modal__copy" type="button">复制邮箱</button>
          <a class="contact-modal__mail" href="mailto:${EMAIL}">直接发邮件</a>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const close = () => wrap.classList.remove("is-open");
    wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
    wrap.querySelector(".contact-modal__close").addEventListener("click", close);
    wrap.querySelector(".contact-modal__copy").addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      try {
        await navigator.clipboard.writeText(EMAIL);
        btn.textContent = "已复制";
      } catch {
        const range = document.createRange();
        range.selectNodeContents(wrap.querySelector(".contact-modal__email"));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = "已选中，Ctrl+C";
      }
      setTimeout(() => { btn.textContent = "复制邮箱"; }, 1600);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    modal = wrap;
    return modal;
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#contact-me"]');
    if (!link) return;
    e.preventDefault();
    ensureModal().classList.add("is-open");
  });
})();
