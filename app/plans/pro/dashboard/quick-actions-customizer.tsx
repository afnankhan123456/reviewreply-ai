"use client";

import type { ReactNode, CSSProperties } from "react";

export const QUICK_ACTION_COLORS: { key: string; value: string }[] = [
  { key: "purple", value: "#ae47ff" },
  { key: "blue", value: "#4da3ff" },
  { key: "green", value: "#34d399" },
  { key: "orange", value: "#f5a623" },
  { key: "red", value: "#ef5a6f" },
];

type ActionMeta = { label: string; sub: string; icon: ReactNode };

export default function QuickActionsCustomizer({
  actions,
  order,
  hidden,
  colors,
  cardStyle,
  cardSize,
  onToggleHidden,
  onMove,
  onColorChange,
  onStyleChange,
  onSizeChange,
  onClose,
  style,
}: {
  actions: ActionMeta[];
  order: string[];
  hidden: string[];
  colors: Record<string, string>;
  cardStyle: "glass" | "solid" | "minimal";
  cardSize: "compact" | "comfortable";
  onToggleHidden: (label: string) => void;
  onMove: (label: string, dir: -1 | 1) => void;
  onColorChange: (label: string, colorKey: string) => void;
  onStyleChange: (style: "glass" | "solid" | "minimal") => void;
  onSizeChange: (size: "compact" | "comfortable") => void;
  onClose?: () => void;
  style?: CSSProperties;
}) {
  const orderedActions = order
    .map((label) => actions.find((a) => a.label === label))
    .filter((a): a is ActionMeta => !!a);

  return (
    <div
      className="mini-glass qa-customizer"
      style={{ zIndex: 999, padding: 14, width: 260, cursor: "default", ...style }}
    >
      <div className="qa-customizer-head">
        <span>Customize Quick Actions</span>
        {onClose && (
          <button type="button" className="qa-close" onClick={onClose} aria-label="Close">✕</button>
        )}
      </div>
      {/* --- show / hide + reorder --- */}
      <p className="qa-customizer-label">Actions</p>
      {orderedActions.map((a, i) => (
        <div className="qa-row" key={a.label}>
          <label className="qa-row-check">
            <input
              type="checkbox"
              checked={!hidden.includes(a.label)}
              onChange={() => onToggleHidden(a.label)}
            />
            {a.label}
          </label>
          <div className="qa-row-controls">
            <span
              className="qa-swatch"
              style={{ background: (QUICK_ACTION_COLORS.find((c) => c.key === colors[a.label])?.value) || "#ae47ff" }}
              title="Color"
            ></span>
            <button type="button" className="qa-arrow" disabled={i === 0} onClick={() => onMove(a.label, -1)}>▲</button>
            <button type="button" className="qa-arrow" disabled={i === orderedActions.length - 1} onClick={() => onMove(a.label, 1)}>▼</button>
          </div>
        </div>
      ))}

      {/* --- per-action color pickers --- */}
      <p className="qa-customizer-label" style={{ marginTop: 12 }}>Colors</p>
      {orderedActions.map((a) => (
        <div className="qa-color-row" key={`color-${a.label}`}>
          <span className="qa-color-name">{a.label}</span>
          <div className="qa-swatch-group">
            {QUICK_ACTION_COLORS.map((c) => (
              <button
                type="button"
                key={c.key}
                className={`qa-swatch-btn${(colors[a.label] || "purple") === c.key ? " active" : ""}`}
                style={{ background: c.value }}
                onClick={() => onColorChange(a.label, c.key)}
                aria-label={c.key}
              ></button>
            ))}
          </div>
        </div>
      ))}

      {/* --- card style --- */}
      <p className="qa-customizer-label" style={{ marginTop: 12 }}>Card Style</p>
      <div className="qa-pill-group">
        {(["glass", "solid", "minimal"] as const).map((s) => (
          <button
            type="button"
            key={s}
            className={`qa-pill${cardStyle === s ? " active" : ""}`}
            onClick={() => onStyleChange(s)}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* --- card size --- */}
      <p className="qa-customizer-label" style={{ marginTop: 12 }}>Card Size</p>
      <div className="qa-pill-group">
        {(["comfortable", "compact"] as const).map((s) => (
          <button
            type="button"
            key={s}
            className={`qa-pill${cardSize === s ? " active" : ""}`}
            onClick={() => onSizeChange(s)}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
