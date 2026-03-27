'use client';

import { useEffect, useRef } from 'react';
import type { Theme } from '@/lib/themes';
import styles from './PurchaseModal.module.css';

interface PurchaseModalProps {
  theme: Theme | null;
  onClose: () => void;
}

export function PurchaseModal({ theme, onClose }: PurchaseModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!theme) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [theme, onClose]);

  // Focus trap
  useEffect(() => {
    if (!theme || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [theme]);

  if (!theme) return null;

  const handleBuy = () => {
    const returnUrl = `${window.location.origin}${window.location.pathname}?purchase=${theme.id}`;
    const stripeUrl = `${theme.stripeUrl}?success_url=${encodeURIComponent(returnUrl)}`;
    window.location.href = stripeUrl;
  };

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div
        ref={dialogRef}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="modal-title"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <div
          className={styles.colorPreview}
          style={{ background: theme.previewBg }}
        >
          <span className={styles.bigDot} style={{ background: theme.previewX }} />
          <span className={styles.bigDot} style={{ background: theme.previewO }} />
          <span className={styles.bigDot} style={{ background: theme.previewAccent }} />
        </div>

        <h2 id="modal-title" className={styles.title}>{theme.name}</h2>
        <p className={styles.price}>{theme.price}</p>
        <p className={styles.note}>
          Unlock this theme permanently in your browser.
        </p>

        <button className={styles.buyBtn} onClick={handleBuy}>
          Buy Now — {theme.price}
        </button>
        <button className={styles.cancelBtn} onClick={onClose}>
          Maybe later
        </button>

        <p className={styles.disclaimer}>
          Stored locally in your browser. Do not clear browser data after purchase.
        </p>
      </div>
    </div>
  );
}
