"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MEDIA_QUERIES,
  classnames,
  useAutoSave,
  useBattery,
  useClipboard,
  useClickOutside,
  useCopyToClipboard,
  useCounter,
  useDarkMode,
  useDebounce,
  useDebounceCallback,
  useDragAndDrop,
  useEventSource,
  useFileReader,
  useIdleTimeout,
  useImageLazyLoad,
  useLocalStorage,
  useLogger,
  useMediaQuery,
  useMousePosition,
  useOrientation,
  usePageVisibility,
  usePortal,
  useResizeObserver,
  useRovingTabIndex,
  useScrollTo,
  useSpeechRecognition,
  useSpeechSynthesis,
  useStep,
  useThrottleCallback,
  useToggle,
  useWindowSize,
  useWhyDidYouRender,
  useWorker
} from "reactilities";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const formatMinutes = (seconds) => Number.isFinite(seconds) ? `${Math.round(seconds / 60)} min` : "n/a";

const DEMO_IMAGE_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#13394e" />
        <stop offset="100%" stop-color="#0a1d29" />
      </linearGradient>
    </defs>
    <rect width="720" height="360" fill="url(#g)" />
    <circle cx="140" cy="100" r="60" fill="#18d4a3" opacity="0.35" />
    <circle cx="580" cy="250" r="85" fill="#10b8ff" opacity="0.32" />
    <text x="48" y="320" fill="#c8e9f7" font-size="32" font-family="Arial, sans-serif">Placeholder</text>
  </svg>`
)}`;

const DEMO_IMAGE_FULL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1a7ea5" />
        <stop offset="100%" stop-color="#0a2c3d" />
      </linearGradient>
    </defs>
    <rect width="720" height="360" fill="url(#bg)" />
    <rect x="48" y="52" width="624" height="256" rx="24" fill="#0f2330" opacity="0.7" />
    <circle cx="110" cy="110" r="26" fill="#18d4a3" />
    <circle cx="166" cy="110" r="26" fill="#10b8ff" />
    <circle cx="222" cy="110" r="26" fill="#7de6ff" />
    <text x="96" y="188" fill="#d8f8ff" font-size="42" font-family="Arial, sans-serif">reactilities</text>
    <text x="96" y="236" fill="#9cd4e7" font-size="24" font-family="Arial, sans-serif">useImageLazyLoad demo asset</text>
  </svg>`
)}`;

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

function ClickOutsideDemo() {
  const panelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [outsideClicks, setOutsideClicks] = useState(0);

  useClickOutside(panelRef, () => {
    if (!isOpen) {
      return;
    }

    setIsOpen(false);
    setOutsideClicks((prev) => prev + 1);
  });

  return (
    <DemoCard
      hook="useClickOutside"
      title="Dismiss overlays outside"
      description="Common pattern for menus, modals, and popovers that close when user clicks outside."
    >
      <span className={classnames("badge", { good: isOpen })}>
        Outside closes: {outsideClicks}
      </span>
      <div
        ref={panelRef}
        style={{
          marginTop: "0.7rem",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "0.75rem",
          background: "rgba(255, 255, 255, 0.02)"
        }}
      >
        <button className="demo-btn" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? "Close panel" : "Open panel"}
        </button>
        {isOpen
          ? <p className="demo-desc" style={{ marginTop: "0.65rem" }}>Click anywhere outside this panel.</p>
          : <p className="demo-desc" style={{ marginTop: "0.65rem" }}>Panel is closed.</p>}
      </div>
    </DemoCard>
  );
}

function DarkModeDemo() {
  const { isDark, colorScheme, setColorScheme, toggle } = useDarkMode("reactilities-demo-color-scheme");

  return (
    <DemoCard
      hook="useDarkMode"
      title="Theme mode persistence"
      description="Store user preference and switch between light/dark/system modes."
    >
      <span className={classnames("badge", { good: isDark })}>
        Active: {isDark ? "Dark" : "Light"} ({colorScheme})
      </span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => setColorScheme("light")}>
          Light
        </button>
        <button className="demo-btn" onClick={() => setColorScheme("dark")}>
          Dark
        </button>
        <button className="demo-btn" onClick={() => setColorScheme("system")}>
          System
        </button>
        <button className="demo-btn" onClick={toggle}>
          Toggle
        </button>
      </div>
      <p className="demo-desc">Preference is persisted via localStorage key: reactilities-demo-color-scheme.</p>
    </DemoCard>
  );
}

function MediaQueryDemo() {
  const isSmallDevice = useMediaQuery(MEDIA_QUERIES.IS_SMALL_DEVICE);
  const isLargerDevice = useMediaQuery(MEDIA_QUERIES.IS_LARGER_DEVICE);
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <DemoCard
      hook="useMediaQuery"
      title="Responsive conditions"
      description="Branch UI by breakpoint, orientation, and system preferences."
    >
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Small device</p>
          <p className="value">{isSmallDevice ? "Yes" : "No"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Larger device</p>
          <p className="value">{isLargerDevice ? "Yes" : "No"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Orientation</p>
          <p className="value">{isLandscape ? "Landscape" : "Portrait"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Prefers dark</p>
          <p className="value">{prefersDark ? "Yes" : "No"}</p>
        </div>
      </div>
    </DemoCard>
  );
}

function ResizeObserverDemo() {
  const { ref, width, height } = useResizeObserver();
  const [targetWidth, setTargetWidth] = useState(260);
  const estimatedColumns = Math.max(Math.floor(width / 18), 1);

  return (
    <DemoCard
      hook="useResizeObserver"
      title="Element size observer"
      description="Track a specific container size in real time instead of only window resize."
    >
      <label className="search-wrap">
        <span className="sr-only">Target width</span>
        <input
          type="range"
          min="160"
          max="560"
          value={targetWidth}
          onChange={(event) => setTargetWidth(Number(event.target.value))}
        />
      </label>
      <div
        ref={ref}
        style={{
          width: `${targetWidth}px`,
          maxWidth: "100%",
          minHeight: "86px",
          border: "1px dashed rgba(130, 219, 255, 0.7)",
          borderRadius: "12px",
          padding: "0.75rem",
          background: "rgba(16, 184, 255, 0.09)"
        }}
      >
        <p className="demo-desc" style={{ margin: 0 }}>
          Resize target width: {targetWidth}px
        </p>
      </div>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Observed width</p>
          <p className="value">{Math.round(width)}px</p>
        </div>
        <div className="demo-metric">
          <p className="label">Observed height</p>
          <p className="value">{Math.round(height)}px</p>
        </div>
        <div className="demo-metric">
          <p className="label">Estimated text cols</p>
          <p className="value">{estimatedColumns}</p>
        </div>
      </div>
    </DemoCard>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  const viewportType = width < 768 ? "Mobile" : width < 1024 ? "Tablet" : "Desktop";

  return (
    <DemoCard
      hook="useWindowSize"
      title="Viewport dimensions"
      description="Use full window width and height for responsive logic and layout decisions."
    >
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Width</p>
          <p className="value">{width}px</p>
        </div>
        <div className="demo-metric">
          <p className="label">Height</p>
          <p className="value">{height}px</p>
        </div>
        <div className="demo-metric">
          <p className="label">Viewport type</p>
          <p className="value">{viewportType}</p>
        </div>
      </div>
      <p className="demo-desc">Resize browser window to see values update.</p>
    </DemoCard>
  );
}

function PageVisibilityDemo() {
  const isVisible = usePageVisibility();
  const [visibleSeconds, setVisibleSeconds] = useState(0);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setVisibleSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setHiddenCount((prev) => prev + 1);
    }
  }, [isVisible]);

  return (
    <DemoCard
      hook="usePageVisibility"
      title="Tab visibility tracking"
      description="Pause timers, polling, and animations when tab becomes hidden."
    >
      <span className={classnames("badge", { good: isVisible })}>
        Tab is: {isVisible ? "Visible" : "Hidden"}
      </span>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Visible time</p>
          <p className="value">{visibleSeconds}s</p>
        </div>
        <div className="demo-metric">
          <p className="label">Hidden transitions</p>
          <p className="value">{hiddenCount}</p>
        </div>
      </div>
      <p className="demo-desc">Switch to another browser tab and come back.</p>
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

function BatteryDemo() {
  const { isSupported, level, charging, chargingTime, dischargingTime } = useBattery();
  const levelPercent = Math.round((level ?? 0) * 100);

  return (
    <DemoCard
      hook="useBattery"
      title="Battery-aware behavior"
      description="Adjust expensive UX behavior when battery is low or discharging."
    >
      <span className={classnames("badge", { good: isSupported })}>
        {isSupported ? "Battery API available" : "Battery API unavailable"}
      </span>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Level</p>
          <p className="value">{levelPercent}%</p>
        </div>
        <div className="demo-metric">
          <p className="label">State</p>
          <p className="value">{charging ? "Charging" : "Discharging"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Charge ETA</p>
          <p className="value">{formatMinutes(chargingTime)}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Discharge ETA</p>
          <p className="value">{formatMinutes(dischargingTime)}</p>
        </div>
      </div>
    </DemoCard>
  );
}

function OrientationDemo() {
  const { orientation, angle } = useOrientation();

  return (
    <DemoCard
      hook="useOrientation"
      title="Device orientation"
      description="Switch layouts for portrait and landscape experiences on mobile."
    >
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Orientation</p>
          <p className="value">{orientation}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Angle</p>
          <p className="value">{angle}°</p>
        </div>
      </div>
      <p className="demo-desc">Rotate your device (or emulator) to see updates.</p>
    </DemoCard>
  );
}

function PortalDemo() {
  const portalContainer = usePortal("reactilities-demo-portal");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DemoCard
      hook="usePortal"
      title="Render outside overflow"
      description="Portals are useful for popovers, modals, and toasts that must escape layout clipping."
    >
      <span className="badge">Portal mounted: {portalContainer ? "Yes" : "No"}</span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => setIsOpen(true)} disabled={!portalContainer}>
          Open portal card
        </button>
        <button className="demo-btn" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>

      {portalContainer && isOpen
        ? createPortal(
            <div
              style={{
                position: "fixed",
                right: "1rem",
                bottom: "1rem",
                zIndex: 50,
                padding: "0.85rem",
                border: "1px solid rgba(131, 219, 255, 0.5)",
                borderRadius: "12px",
                background: "rgba(9, 24, 33, 0.95)",
                maxWidth: "260px",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)"
              }}
            >
              <p style={{ margin: 0, fontSize: "0.86rem", color: "#d4f3ff" }}>
                This element is rendered through <code>createPortal</code> into <code>document.body</code>.
              </p>
              <button
                className="demo-btn"
                style={{ marginTop: "0.65rem" }}
                onClick={() => setIsOpen(false)}
              >
                Dismiss
              </button>
            </div>,
            portalContainer
          )
        : null}
    </DemoCard>
  );
}

function RovingTabIndexDemo() {
  const items = ["Bold", "Italic", "Underline", "Code"];
  const [activeItem, setActiveItem] = useState(items[0]);
  const { getContainerProps, getItemProps } = useRovingTabIndex(items.length, {
    orientation: "horizontal",
    loop: true
  });

  return (
    <DemoCard
      hook="useRovingTabIndex"
      title="Accessible keyboard roving"
      description="Only one item stays in tab order while arrow keys move focus in a toolbar/list."
    >
      <div
        className="demo-actions"
        role="toolbar"
        aria-label="Formatting options"
        {...getContainerProps()}
      >
        {items.map((item, index) => {
          const itemProps = getItemProps(index);

          return (
            <button
              key={item}
              className={classnames("demo-btn", { "is-active": activeItem === item })}
              {...itemProps}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <span className="badge">Selected: {activeItem}</span>
      <p className="demo-desc">Use Left/Right arrows after focusing one button.</p>
    </DemoCard>
  );
}

function ScrollToDemo() {
  const topRef = useRef(null);
  const middleRef = useRef(null);
  const bottomRef = useRef(null);
  const { scrollToTop, scrollToBottom, scrollToElement, scrollTo } = useScrollTo();

  return (
    <DemoCard
      hook="useScrollTo"
      title="Programmatic scrolling"
      description="Scroll to page edges, exact coordinates, or specific elements from one API."
    >
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => scrollToTop({ behavior: "smooth" })}>
          Page top
        </button>
        <button className="demo-btn" onClick={() => scrollToBottom({ behavior: "smooth" })}>
          Page bottom
        </button>
        <button className="demo-btn" onClick={() => scrollTo(0, 320, { behavior: "smooth" })}>
          Y: 320
        </button>
      </div>

      <div className="demo-actions">
        <button
          className="demo-btn"
          onClick={() => scrollToElement(topRef.current, { behavior: "smooth", block: "center" })}
        >
          Target A
        </button>
        <button
          className="demo-btn"
          onClick={() => scrollToElement(middleRef.current, { behavior: "smooth", block: "center" })}
        >
          Target B
        </button>
        <button
          className="demo-btn"
          onClick={() => scrollToElement(bottomRef.current, { behavior: "smooth", block: "center" })}
        >
          Target C
        </button>
      </div>

      <div style={{ display: "grid", gap: "0.45rem" }}>
        <div ref={topRef} className="badge">Target A</div>
        <div ref={middleRef} className="badge">Target B</div>
        <div ref={bottomRef} className="badge">Target C</div>
      </div>
    </DemoCard>
  );
}

function StepDemo() {
  const steps = ["Choose package", "Configure app", "Ship release", "Monitor usage"];
  const { step, isFirst, isLast, next, prev, goTo, reset } = useStep(steps.length);

  return (
    <DemoCard
      hook="useStep"
      title="Wizard navigation"
      description="Build onboarding and checkout flows with bounded next/prev navigation."
    >
      <span className="badge">
        Step {step + 1} / {steps.length}: {steps[step]}
      </span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={prev} disabled={isFirst}>
          Back
        </button>
        <button className="demo-btn" onClick={next} disabled={isLast}>
          Next
        </button>
        <button className="demo-btn" onClick={() => goTo(2)}>
          Jump to 3
        </button>
        <button className="demo-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </DemoCard>
  );
}

function ClipboardStateDemo() {
  const { value, hasCopied, copy, read, reset } = useClipboard(1800);
  const [textToCopy, setTextToCopy] = useState("npm install reactilities@latest");
  const [status, setStatus] = useState("Ready.");

  const handleCopy = async () => {
    try {
      const copied = await copy(textToCopy);
      setStatus(copied ? "Copied." : "Copy failed.");
    } catch {
      setStatus("Clipboard write blocked.");
    }
  };

  const handleRead = async () => {
    try {
      const nextValue = await read();
      setStatus(nextValue ? "Read from clipboard." : "Clipboard empty or blocked.");
    } catch {
      setStatus("Clipboard read blocked.");
    }
  };

  return (
    <DemoCard
      hook="useClipboard"
      title="Bidirectional clipboard"
      description="Read and write clipboard content with one stateful hook."
    >
      <label className="search-wrap">
        <span className="sr-only">Clipboard text</span>
        <input
          type="text"
          value={textToCopy}
          onChange={(event) => setTextToCopy(event.target.value)}
          placeholder="Text to copy"
        />
      </label>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => { void handleCopy(); }}>
          Copy text
        </button>
        <button className="demo-btn" onClick={() => { void handleRead(); }}>
          Read clipboard
        </button>
        <button className="demo-btn" onClick={reset}>
          Reset
        </button>
      </div>
      <span className={classnames("badge", { good: hasCopied })}>{status}</span>
      <p className="demo-desc">Hook value: {value ?? "(empty)"}</p>
    </DemoCard>
  );
}

function AutoSaveDemo() {
  const [draft, setDraft] = useState("Change this note and pause for auto-save...");
  const [savedSnapshot, setSavedSnapshot] = useState("Change this note and pause for auto-save...");

  const onSave = useCallback(async (nextDraft) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 350);
    });
    setSavedSnapshot(nextDraft);
  }, []);

  const { status, lastSavedAt, save } = useAutoSave({
    data: draft,
    onSave,
    delay: 1200
  });

  return (
    <DemoCard
      hook="useAutoSave"
      title="Debounced auto-save"
      description="Perfect for drafts, note editors, and long forms where users should not lose input."
    >
      <textarea
        rows={4}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        style={{
          width: "100%",
          resize: "vertical",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          background: "rgba(255, 255, 255, 0.02)",
          color: "var(--text)",
          padding: "0.7rem"
        }}
      />
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => { void save(); }}>
          Save now
        </button>
      </div>
      <span className={classnames("badge", { good: status === "saved" })}>Status: {status}</span>
      <p className="demo-desc">
        Last saved: {lastSavedAt ? lastSavedAt.toLocaleTimeString() : "-"}
      </p>
      <p className="demo-desc">Saved snapshot: {savedSnapshot || "(empty)"}</p>
    </DemoCard>
  );
}

function DebounceCallbackDemo() {
  const [rawValue, setRawValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const syncDebouncedValue = useDebounceCallback((value) => {
    setDebouncedValue(value);
  }, 500);

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setRawValue(nextValue);
    syncDebouncedValue(nextValue);
  };

  return (
    <DemoCard
      hook="useDebounceCallback"
      title="Debounce function calls"
      description="Useful when you want to debounce side effects rather than value state itself."
    >
      <label className="search-wrap">
        <span className="sr-only">Debounced callback input</span>
        <input
          type="text"
          value={rawValue}
          onChange={handleChange}
          placeholder="Type quickly..."
        />
      </label>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Raw value</p>
          <p className="value">{rawValue || "(empty)"}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Debounced callback value</p>
          <p className="value">{debouncedValue || "(empty)"}</p>
        </div>
      </div>
    </DemoCard>
  );
}

function ThrottleCallbackDemo() {
  const [rawEvents, setRawEvents] = useState(0);
  const [throttledEvents, setThrottledEvents] = useState(0);

  const onThrottledMove = useThrottleCallback(() => {
    setThrottledEvents((prev) => prev + 1);
  }, 250);

  const handleMove = () => {
    setRawEvents((prev) => prev + 1);
    onThrottledMove();
  };

  return (
    <DemoCard
      hook="useThrottleCallback"
      title="Throttle heavy handlers"
      description="Ideal for resize, mousemove, and scroll handlers that fire very frequently."
    >
      <div
        onMouseMove={handleMove}
        style={{
          minHeight: "78px",
          borderRadius: "12px",
          border: "1px dashed rgba(130, 219, 255, 0.6)",
          background: "rgba(24, 212, 163, 0.08)",
          display: "grid",
          placeItems: "center",
          padding: "0.8rem"
        }}
      >
        Move your mouse in this area
      </div>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Raw events</p>
          <p className="value">{rawEvents}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Throttled callbacks</p>
          <p className="value">{throttledEvents}</p>
        </div>
      </div>
      <div className="demo-actions">
        <button
          className="demo-btn"
          onClick={() => {
            setRawEvents(0);
            setThrottledEvents(0);
          }}
        >
          Reset counters
        </button>
      </div>
    </DemoCard>
  );
}

function DragAndDropDemo() {
  const { isDragging, files, error, getRootProps, reset } = useDragAndDrop({
    accept: ["image/png", "image/jpeg", ".txt"],
    maxFiles: 3,
    maxSize: 2 * 1024 * 1024
  });

  return (
    <DemoCard
      hook="useDragAndDrop"
      title="Dropzone with validation"
      description="Build upload UX with accepted types, max size, and max file count rules."
    >
      <div
        {...getRootProps()}
        style={{
          border: `2px ${isDragging ? "solid" : "dashed"} rgba(130, 219, 255, 0.7)`,
          borderRadius: "14px",
          padding: "0.95rem",
          background: isDragging ? "rgba(16, 184, 255, 0.14)" : "rgba(255, 255, 255, 0.02)"
        }}
      >
        <p className="demo-desc" style={{ margin: 0 }}>
          Drag files here (PNG/JPG/TXT, up to 3 files, 2MB each)
        </p>
      </div>
      {error ? <span className="badge">Error: {error.message}</span> : null}
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {files.length ? files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>) : <li>No files yet.</li>}
      </ul>
      <div className="demo-actions">
        <button className="demo-btn" onClick={reset}>
          Reset files
        </button>
      </div>
    </DemoCard>
  );
}

function EventSourceDemo() {
  const [urlInput, setUrlInput] = useState("");
  const [connectedUrl, setConnectedUrl] = useState(null);
  const { lastMessage, readyState, close } = useEventSource(connectedUrl);

  const readyStateLabel = connectedUrl === null
    ? "Idle"
    : readyState === 1
      ? "Open"
      : readyState === 0
        ? "Connecting"
        : "Closed";

  return (
    <DemoCard
      hook="useEventSource"
      title="Server-sent events (SSE)"
      description="Connect to one-way live streams for notifications, logs, and metrics feeds."
    >
      <label className="search-wrap">
        <span className="sr-only">SSE URL</span>
        <input
          type="url"
          placeholder="https://your-domain.com/events"
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />
      </label>
      <div className="demo-actions">
        <button
          className="demo-btn"
          onClick={() => {
            const trimmed = urlInput.trim();
            if (trimmed) {
              setConnectedUrl(trimmed);
            }
          }}
          disabled={!urlInput.trim()}
        >
          Connect
        </button>
        <button
          className="demo-btn"
          onClick={() => {
            close();
            setConnectedUrl(null);
          }}
        >
          Disconnect
        </button>
      </div>
      <span className="badge">State: {readyStateLabel}</span>
      <p className="demo-desc">Last message: {lastMessage?.data ? String(lastMessage.data).slice(0, 140) : "(none)"}</p>
    </DemoCard>
  );
}

function FileReaderDemo() {
  const [mode, setMode] = useState("text");
  const { result, error, loading, readAsText, readAsDataURL, reset } = useFileReader();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (mode === "image") {
      readAsDataURL(file);
      return;
    }

    readAsText(file);
  };

  return (
    <DemoCard
      hook="useFileReader"
      title="Client-side file reads"
      description="Read dropped or selected files without sending them to a server first."
    >
      <div className="demo-actions">
        <button
          className={classnames("demo-btn", { "is-active": mode === "text" })}
          onClick={() => setMode("text")}
        >
          Read as text
        </button>
        <button
          className={classnames("demo-btn", { "is-active": mode === "image" })}
          onClick={() => setMode("image")}
        >
          Read as image
        </button>
      </div>

      <input type="file" onChange={handleFileChange} />

      <div className="demo-actions">
        <button className="demo-btn" onClick={reset}>
          Reset result
        </button>
      </div>

      <span className={classnames("badge", { good: !loading && !error })}>
        {loading ? "Reading file..." : error ? error.message : "Ready"}
      </span>

      {typeof result === "string" && mode === "image"
        ? (
            <img
              src={result}
              alt="Preview from FileReader"
              style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "12px" }}
            />
          )
        : null}

      {typeof result === "string" && mode === "text"
        ? <p className="demo-desc">{result.slice(0, 260) || "(empty file)"}</p>
        : null}
    </DemoCard>
  );
}

function IdleTimeoutDemo() {
  const [activityLog, setActivityLog] = useState([]);

  const addLogLine = useCallback((line) => {
    setActivityLog((prev) => [line, ...prev].slice(0, 4));
  }, []);

  const onIdle = useCallback(() => {
    addLogLine(`Idle at ${new Date().toLocaleTimeString()}`);
  }, [addLogLine]);

  const onActive = useCallback(() => {
    addLogLine(`Active at ${new Date().toLocaleTimeString()}`);
  }, [addLogLine]);

  const { isIdle, reset } = useIdleTimeout({
    timeout: 5000,
    onIdle,
    onActive
  });

  return (
    <DemoCard
      hook="useIdleTimeout"
      title="Inactivity detection"
      description="Great for auto-logout warnings, pause behavior, and idle-sensitive analytics."
    >
      <span className={classnames("badge", { good: !isIdle })}>
        User is currently: {isIdle ? "Idle" : "Active"}
      </span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={reset}>
          Reset idle timer
        </button>
      </div>
      <p className="demo-desc">Wait 5 seconds without interaction, then move the mouse.</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {activityLog.length ? activityLog.map((item) => <li key={item}>{item}</li>) : <li>No transitions yet.</li>}
      </ul>
    </DemoCard>
  );
}

function ImageLazyLoadDemo() {
  const { ref, src, status, isLoaded } = useImageLazyLoad(DEMO_IMAGE_FULL, {
    placeholder: DEMO_IMAGE_PLACEHOLDER,
    rootMargin: "120px"
  });

  return (
    <DemoCard
      hook="useImageLazyLoad"
      title="Lazy image loading"
      description="Render placeholders first and only load heavy images when they get near viewport."
    >
      <img
        ref={ref}
        src={src}
        alt="Lazy loaded visual"
        style={{
          width: "100%",
          borderRadius: "12px",
          minHeight: "150px",
          objectFit: "cover",
          opacity: isLoaded ? 1 : 0.65,
          transition: "opacity 220ms ease"
        }}
      />
      <span className={classnames("badge", { good: isLoaded })}>Status: {status}</span>
    </DemoCard>
  );
}

function LoggerDemo() {
  const [count, setCount] = useState(0);
  const [variant, setVariant] = useState("primary");

  useLogger("LoggerDemo", { count, variant });

  return (
    <DemoCard
      hook="useLogger"
      title="Lifecycle debug logs"
      description="Track mounts, updates, and unmounts in development for fast diagnosis."
    >
      <span className="badge">Open browser console to view logger output.</span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => setCount((prev) => prev + 1)}>
          Increment ({count})
        </button>
        <button
          className="demo-btn"
          onClick={() => setVariant((prev) => prev === "primary" ? "secondary" : "primary")}
        >
          Variant: {variant}
        </button>
      </div>
    </DemoCard>
  );
}

function SpeechRecognitionDemo() {
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    start,
    stop,
    reset
  } = useSpeechRecognition({
    lang: "en-US",
    continuous: true,
    interimResults: true
  });

  return (
    <DemoCard
      hook="useSpeechRecognition"
      title="Voice input"
      description="Capture dictation or voice search input directly in the browser."
    >
      <span className={classnames("badge", { good: isSupported })}>
        {isSupported ? "Speech recognition supported" : "Speech recognition unsupported"}
      </span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={start} disabled={!isSupported || isListening}>
          Start
        </button>
        <button className="demo-btn" onClick={stop} disabled={!isSupported || !isListening}>
          Stop
        </button>
        <button className="demo-btn" onClick={reset} disabled={!isSupported}>
          Clear
        </button>
      </div>
      <p className="demo-desc">Final transcript: {transcript || "(none yet)"}</p>
      <p className="demo-desc">Interim transcript: {interimTranscript || "(none)"}</p>
    </DemoCard>
  );
}

function SpeechSynthesisDemo() {
  const [text, setText] = useState("Reactilities provides reusable hooks for production apps.");
  const { speak, cancel, pause, resume, isSpeaking, isPaused, voices, isSupported } = useSpeechSynthesis();

  return (
    <DemoCard
      hook="useSpeechSynthesis"
      title="Text-to-speech"
      description="Read notifications, accessibility prompts, and long content aloud."
    >
      <label className="search-wrap">
        <span className="sr-only">Text to speak</span>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => speak(text)} disabled={!isSupported || !text.trim()}>
          Speak
        </button>
        <button className="demo-btn" onClick={pause} disabled={!isSupported || !isSpeaking}>
          Pause
        </button>
        <button className="demo-btn" onClick={resume} disabled={!isSupported || !isPaused}>
          Resume
        </button>
        <button className="demo-btn" onClick={cancel} disabled={!isSupported || !isSpeaking}>
          Stop
        </button>
      </div>
      <span className={classnames("badge", { good: isSupported })}>
        {isSupported ? `Voices available: ${voices.length}` : "Speech synthesis unsupported"}
      </span>
    </DemoCard>
  );
}

function WhyDidYouRenderDemo() {
  const [count, setCount] = useState(0);
  const [label, setLabel] = useState("demo");

  const trackedValues = useMemo(() => ({
    count,
    label,
    isEven: count % 2 === 0
  }), [count, label]);

  useWhyDidYouRender("WhyDidYouRenderDemo", trackedValues);

  return (
    <DemoCard
      hook="useWhyDidYouRender"
      title="Re-render diagnostics"
      description="Inspect exactly which tracked values changed between renders."
    >
      <span className="badge">Open console and interact with controls below.</span>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => setCount((prev) => prev + 1)}>
          Count: {count}
        </button>
      </div>
      <label className="search-wrap">
        <span className="sr-only">Tracked label</span>
        <input
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
      </label>
    </DemoCard>
  );
}

function WorkerDemo() {
  const [numbersInput, setNumbersInput] = useState("3, 8, 13, 21");

  const numbers = useMemo(
    () => numbersInput
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value)),
    [numbersInput]
  );

  const { result, error, status, run, terminate } = useWorker((values) => {
    if (!Array.isArray(values)) {
      return 0;
    }

    return values.reduce((sum, value) => sum + Number(value || 0), 0);
  });

  return (
    <DemoCard
      hook="useWorker"
      title="Offload heavy work"
      description="Move CPU-heavy calculations off the main thread to keep UI responsive."
    >
      <label className="search-wrap">
        <span className="sr-only">Comma separated numbers</span>
        <input
          type="text"
          value={numbersInput}
          onChange={(event) => setNumbersInput(event.target.value)}
        />
      </label>
      <div className="demo-actions">
        <button className="demo-btn" onClick={() => run(numbers)}>
          Compute sum in worker
        </button>
        <button className="demo-btn" onClick={terminate}>
          Terminate worker
        </button>
      </div>
      <div className="demo-metrics">
        <div className="demo-metric">
          <p className="label">Status</p>
          <p className="value">{status}</p>
        </div>
        <div className="demo-metric">
          <p className="label">Result</p>
          <p className="value">{result ?? "-"}</p>
        </div>
      </div>
      {error ? <span className="badge">Error: {error.message}</span> : null}
    </DemoCard>
  );
}

export default function DemoSection() {
  return (
    <div className="demo-grid" id="reactilities-demo-root" aria-live="polite">
      <ToggleDemo />
      <CounterDemo />
      <DebounceDemo />
      <DebounceCallbackDemo />
      <ThrottleCallbackDemo />
      <ClipboardDemo />
      <ClipboardStateDemo />
      <MouseDemo />
      <ClickOutsideDemo />
      <MediaQueryDemo />
      <ResizeObserverDemo />
      <WindowSizeDemo />
      <PageVisibilityDemo />
      <DarkModeDemo />
      <OrientationDemo />
      <BatteryDemo />
      <LocalStorageDemo />
      <StepDemo />
      <AutoSaveDemo />
      <DragAndDropDemo />
      <FileReaderDemo />
      <ImageLazyLoadDemo />
      <IdleTimeoutDemo />
      <EventSourceDemo />
      <ScrollToDemo />
      <RovingTabIndexDemo />
      <PortalDemo />
      <SpeechRecognitionDemo />
      <SpeechSynthesisDemo />
      <LoggerDemo />
      <WhyDidYouRenderDemo />
      <WorkerDemo />
    </div>
  );
}
