"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export const QUICK_ACTION_COLORS: { key: string; value: string }[] = [
  { key: "purple", value: "#ae47ff" },
  { key: "blue", value: "#4da3ff" },
  { key: "green", value: "#34d399" },
  { key: "orange", value: "#f5a623" },
  { key: "red", value: "#ef5a6f" },
];

type ActionMeta = { label: string; sub: string; icon: ReactNode };

export type QuickActionsPrefs = {
  order: string[];
  hidden: string[];
  colors: Record<string, string>;
  cardStyle: "glass" | "solid" | "minimal";
  cardSize: "compact" | "comfortable";
};

export default function QuickActionsCustomizer({
  actions,
  order,
  hidden,
  colors,
  cardStyle,
  cardSize,
  onSave,
  onCancel,
}: {
  actions: ActionMeta[];
  order: string[];
  hidden: string[];
  colors: Record<string, string>;
  cardStyle: "glass" | "solid" | "minimal";
  cardSize: "compact" | "comfortable";
  onSave: (prefs: QuickActionsPrefs) => void;
  onCancel: () => void;
}) {
  /* Draft state — dashboard is untouched until "Save Changes" is clicked */
  const [draftOrder, setDraftOrder] = useState<string[]>(order);
  const [draftHidden, setDraftHidden] = useState<string[]>(hidden);
  const [draftColors, setDraftColors] = useState<Record<string, string>>(colors);
  const [draftStyle, setDraftStyle] = useState<"glass" | "solid" | "minimal">(cardStyle);
  const [draftSize, setDraftSize] = useState<"compact" | "comfortable">(cardSize);

  const toggleHidden = (label: string) => {
    setDraftHidden((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  const move = (label: string, dir: -1 | 1) => {
    setDraftOrder((prev) => {
      const idx = prev.indexOf(label);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  };

  const changeColor = (label: string, colorKey: string) => {
    setDraftColors((prev) => ({ ...prev, [label]: colorKey }));
  };

  const orderedActions = draftOrder
    .map((label) => actions.find((a) => a.label === label))
    .filter((a): a is ActionMeta => !!a);

  return (
    <div className="qa-modal-overlay" onClick={onCancel}>
      <div className="qa-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qa-modal-head">
          <h3>Customize Quick Actions</h3>
          <button type="button" className="qa-close" onClick={onCancel} aria-label="Close">✕</button>
        </div>

        <div className="qa-modal-body">
          {/* --- show / hide + reorder --- */}
          <p className="qa-customizer-label">Actions</p>
          {orderedActions.map((a, i) => (
            <div className="qa-row" key={a.label}>
              <label className="qa-row-check">
                <input
                  type="checkbox"
                  checked={!draftHidden.includes(a.label)}
                  onChange={() => toggleHidden(a.label)}
                />
                {a.label}
              </label>
              <div className="qa-row-controls">
                <span
                  className="qa-swatch"
                  style={{ background: QUICK_ACTION_COLORS.find((c) => c.key === draftColors[a.label])?.value || "#ae47ff" }}
                ></span>
                <button type="button" className="qa-arrow" disabled={i === 0} onClick={() => move(a.label, -1)}>▲</button>
                <button type="button" className="qa-arrow" disabled={i === orderedActions.length - 1} onClick={() => move(a.label, 1)}>▼</button>
              </div>
            </div>
          ))}

          {/* --- per-action color pickers --- */}
          <p className="qa-customizer-label" style={{ marginTop: 14 }}>Colors</p>
          {orderedActions.map((a) => (
            <div className="qa-color-row" key={`color-${a.label}`}>
              <span className="qa-color-name">{a.label}</span>
              <div className="qa-swatch-group">
                {QUICK_ACTION_COLORS.map((c) => (
                  <button
                    type="button"
                    key={c.key}
                    className={`qa-swatch-btn${(draftColors[a.label] || "purple") === c.key ? " active" : ""}`}
                    style={{ background: c.value }}
                    onClick={() => changeColor(a.label, c.key)}
                    aria-label={c.key}
                  ></button>
                ))}
              </div>
            </div>
          ))}

          {/* --- card style --- */}
          <p className="qa-customizer-label" style={{ marginTop: 14 }}>Card Style</p>
          <div className="qa-pill-group">
            {(["glass", "solid", "minimal"] as const).map((s) => (
              <button
                type="button"
                key={s}
                className={`qa-pill${draftStyle === s ? " active" : ""}`}
                onClick={() => setDraftStyle(s)}
              >
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* --- card size --- */}
          <p className="qa-customizer-label" style={{ marginTop: 14 }}>Card Size</p>
          <div className="qa-pill-group">
            {(["comfortable", "compact"] as const).map((s) => (
              <button
                type="button"
                key={s}
                className={`qa-pill${draftSize === s ? " active" : ""}`}
                onClick={() => setDraftSize(s)}
              >
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="qa-modal-footer">
          <button type="button" className="qa-btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className="qa-btn-primary"
            onClick={() => onSave({ order: draftOrder, hidden: draftHidden, colors: draftColors, cardStyle: draftStyle, cardSize: draftSize })}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
