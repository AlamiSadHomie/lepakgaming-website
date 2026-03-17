'use client';

import { useEffect } from 'react';

const STYLE_ID = 'copy-code-button-styles';

export default function CopyCodeButton() {
  useEffect(() => {
    // Inject minimal styling once
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.innerHTML = `
        .code-block-styled { font-size: 0.95rem; line-height: 1.6; }
        .copy-button {
          position: absolute;
          top: 10px;
          right: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(17, 24, 39, 0.75);
          color: #e5e7eb;
          backdrop-filter: blur(6px);
          transition: all 0.2s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
        .copy-button:hover { background: rgba(126, 34, 206, 0.9); color: #fff; transform: translateY(-1px); }
        .copy-button:active { transform: translateY(0); }
        .copy-button svg { width: 18px; height: 18px; }
        .copy-button .hidden { display: none; }
        .copy-button.copied { background: #22c55e; border-color: #22c55e; color: #fff; }
      `;
      document.head.appendChild(style);
    }

    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;

      // Bump code size slightly for readability
      pre.classList.add('code-block-styled');

      // Skip if button already exists
      if (pre.querySelector('.copy-button')) return;

      // Create wrapper for positioning
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create copy button (icon-only)
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.type = 'button';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML = `
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;

      button.onclick = async () => {
        const code = codeBlock.textContent || '';

        try {
          await navigator.clipboard.writeText(code);

          // Show success state
          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');

          copyIcon?.classList.add('hidden');
          checkIcon?.classList.remove('hidden');
          button.classList.add('copied');

          // Reset after 1.6 seconds
          setTimeout(() => {
            copyIcon?.classList.remove('hidden');
            checkIcon?.classList.add('hidden');
            button.classList.remove('copied');
          }, 1600);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      };

      wrapper.appendChild(button);
    });
  }, []);

  return null;
}
