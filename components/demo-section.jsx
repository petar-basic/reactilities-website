"use client";

import { useMemo, useState } from "react";
import {
  classnames,
  useCopyToClipboard,
  useCounter,
  useDebounce,
  useLocalStorage,
  useMousePosition,
  useToggle
} from "reactilities";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function DemoCard({ hook, title, description, children }) {
  return (
    <article className="demo-card">
      <div className="demo-top">
        <p className="demo-hook">{hook}</p>
        <h3 className="demo-title">{title}</h3>
        <p className="demo-desc">{description}</p>
      </div>
      {children}
    </article>
  );
}

function ToggleDemo() {
  const [isEnabled, toggle] = useToggle(false);

  return (
    <DemoCard
      hook="useToggle"
      title="Boolean toggles"
      description="Useful for dropdowns, feature flags, and any on/off UI state."
    >
      <span className={classnames("badge", { good: isEnabled })}>
        State: {isEnabled ? "Enabled" : "Disabled"}
      </span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => toggle()}>
          Toggle
        </button>
        <button className="demo-btn" onClick={() => toggle(true)}>
          Force ON
        </button>
        <button className="demo-btn" onClick={() => toggle(false)}>
          Force OFF
        </button>
      </div>
    </DemoCard>
  );
}

function CounterDemo() {
  const { count, increment, decrement, reset, set } = useCounter(4, {
    min: 0,
    max: 20,
    step: 2
  });

  return (
    <DemoCard
      hook="useCounter"
      title="Bounded numeric state"
      description="Counter with built-in limits and custom step size."
    >
      <span className="badge">Count: {count}</span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={decrement}>
          -2
        </button>
        <button className="demo-btn" onClick={increment}>
          +2
        </button>
        <button className="demo-btn" onClick={() => set(10)}>
          Set to 10
        </button>
        <button className="demo-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </DemoCard>
  );
}

function DebounceDemo() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const settledAt = useMemo(() => {
    if (!debouncedValue) {
      return "-";
    }

    return new Date().toLocaleTimeString();
  }, [debouncedValue]);

  return (
    <DemoCard
      hook="useDebounce"
      title="Debounced input"
      description="Useful for search boxes and API calls to avoid request spam."
    >
      <label className="search-wrap">
        <span className="sr-only">Demo input</span>
        <input
          type="text"
          placeholder="Type fast..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Raw</p>
          <p className="value">{value || "(empty)"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Debounced</p>
          <p className="value">{debouncedValue || "(empty)"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Settled at</p>
          <p className="value">{settledAt}</p>
        </div>
      </div>
    </DemoCard>
  );
}

function ClipboardDemo() {
  const [copiedValue, copyToClipboard] = useCopyToClipboard();
  const [status, setStatus] = useState("Nothing copied yet.");
  const installCommand = "npm install reactilities";

  const handleCopy = () => {
    try {
      copyToClipboard(installCommand);
      setStatus("Copied to clipboard.");
    } catch {
      setStatus("Clipboard access blocked by browser permissions.");
    }
  };

  return (
    <DemoCard
      hook="useCopyToClipboard"
      title="Copy command"
      description="Copy install snippets or generated tokens with one click."
    >
      <div className="copy-row">
        <p className="copy-input">{installCommand}</p>
        <button className="demo-btn" onClick={handleCopy}>
          Copy
        </button>
      </div>
      <span className={classnames("badge", { good: copiedValue === installCommand })}>
        {status}
      </span>
    </DemoCard>
  );
}

function MouseDemo() {
  const { x, y } = useMousePosition();
  const [stageBounds, setStageBounds] = useState(null);

  const captureStageBounds = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setStageBounds({
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: Math.max(Math.round(rect.width), 1),
      height: Math.max(Math.round(rect.height), 1)
    });
  };

  const isInsideStage = Boolean(
    stageBounds &&
      x >= stageBounds.left &&
      x <= stageBounds.right &&
      y >= stageBounds.top &&
      y <= stageBounds.bottom
  );

  const stageWidth = stageBounds?.width ?? 1;
  const stageHeight = stageBounds?.height ?? 1;

  const stageX = isInsideStage && stageBounds
    ? clamp(Math.round(x - stageBounds.left), 0, stageWidth)
    : null;

  const stageY = isInsideStage && stageBounds
    ? clamp(Math.round(y - stageBounds.top), 0, stageHeight)
    : null;

  const xPercent = stageX !== null
    ? clamp(Math.round((stageX / stageWidth) * 100), 0, 100)
    : 50;

  const yPercent = stageY !== null
    ? clamp(Math.round((stageY / stageHeight) * 100), 0, 100)
    : 50;

  return (
    <DemoCard
      hook="useMousePosition"
      title="Cursor tracking"
      description="Track real-time mouse position for parallax, tooltips, or custom cursors."
    >
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Stage X</p>
          <p className="value">{stageX !== null ? `${stageX}px` : "-"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Stage Y</p>
          <p className="value">{stageY !== null ? `${stageY}px` : "-"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Inside stage</p>
          <p className="value">{isInsideStage ? "Yes" : "No"}</p>
        </div>
      </div>
      <div className="mouse-stage" onMouseEnter={captureStageBounds} onMouseMove={captureStageBounds}>
        <span
          className={`mouse-dot ${isInsideStage ? "" : "is-hidden"}`}
          style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
        ></span>
      </div>
      <p className="demo-desc">Move the cursor inside the box above.</p>
    </DemoCard>
  );
}

function LocalStorageDemo() {
  const [mode, setMode] = useLocalStorage("reactilities-demo-mode", "cards");

  const normalizedMode = mode === "list" ? "list" : "cards";

  return (
    <DemoCard
      hook="useLocalStorage"
      title="Persistent preference"
      description="Persist UI state across reloads and tabs."
    >
      <span className="badge">Saved mode: {normalizedMode}</span>
      <div className="demo-actions">
        <button
          className={classnames("demo-btn", { "is-active": normalizedMode === "cards" })}
          onClick={() => setMode("cards")}
        >
          Cards
        </button>
        <button
          className={classnames("demo-btn", { "is-active": normalizedMode === "list" })}
          onClick={() => setMode("list")}
        >
          List
        </button>
      </div>
      <p className="demo-desc">Refresh the page - this value stays stored.</p>
    </DemoCard>
  );
}

export default function DemoSection() {
  return (
    <div className="demo-grid" id="reactilities-demo-root" aria-live="polite">
      <ToggleDemo />
      <CounterDemo />
      <DebounceDemo />
      <ClipboardDemo />
      <MouseDemo />
      <LocalStorageDemo />
    </div>
  );
}
