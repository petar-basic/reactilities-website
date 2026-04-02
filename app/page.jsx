import DemoSection from "../components/demo-section-client";
import ApiExplorer from "../components/api-explorer";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://reactilities.dev").replace(/\/$/, "");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "Reactilities",
      codeRepository: "https://github.com/petar-basic/reactilities",
      programmingLanguage: "TypeScript",
      runtimePlatform: "React",
      license: "https://github.com/petar-basic/reactilities/blob/main/LICENSE",
      description:
        "Comprehensive collection of useful React hooks and utilities for modern web development.",
      keywords: ["react", "hooks", "typescript", "frontend", "utilities"],
      author: {
        "@type": "Person",
        name: "Petar Basic"
      }
    },
    {
      "@type": "WebSite",
      name: "Reactilities",
      url: siteUrl
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand">
          Reactilities
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#features">Features</a>
          <a href="#demos">Demos</a>
          <a href="#api">API</a>
          <a href="#install">Install</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a
          className="button ghost"
          href="https://github.com/petar-basic/reactilities"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">React Utility Library</p>
          <h1 id="hero-title">Production-grade hooks for real React apps</h1>
          <p className="hero-copy">
            Reactilities delivers <strong>52+ hooks</strong>, lifecycle helpers, utility
            functions, and TypeScript types to speed up development without sacrificing
            quality. SSR safe. Tree-shakable. Zero runtime dependencies (besides React).
          </p>

          <div className="hero-cta">
            <a
              className="button primary"
              href="https://www.npmjs.com/package/reactilities"
              target="_blank"
              rel="noreferrer"
            >
              View on npm
            </a>
            <a className="button" href="#demos">
              Try interactive demos
            </a>
          </div>

          <div className="stat-grid" role="list" aria-label="Key stats">
            <article className="stat-card" role="listitem">
              <p className="stat-value">69+</p>
              <p className="stat-label">React hooks</p>
            </article>
            <article className="stat-card" role="listitem">
              <p className="stat-value">99%+</p>
              <p className="stat-label">Test coverage</p>
            </article>
            <article className="stat-card" role="listitem">
              <p className="stat-value">0</p>
              <p className="stat-label">Runtime deps</p>
            </article>
            <article className="stat-card" role="listitem">
              <p className="stat-value">TS First</p>
              <p className="stat-label">Full typings</p>
            </article>
          </div>
        </section>

        <section className="section" id="install" aria-labelledby="install-title">
          <div className="section-head">
            <p className="eyebrow">Quick Start</p>
            <h2 id="install-title">Install in 10 seconds</h2>
          </div>

          <div className="code-block" role="region" aria-label="Installation">
            <pre>
              <code>npm install reactilities</code>
            </pre>
          </div>
        </section>

        <section className="section" id="features" aria-labelledby="features-title">
          <div className="section-head">
            <p className="eyebrow">Why Reactilities</p>
            <h2 id="features-title">Built for teams shipping fast</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <h3>Comprehensive API</h3>
              <p>
                DOM hooks, state hooks, async utilities, lifecycle helpers, and utility
                types in one package.
              </p>
            </article>
            <article className="feature-card">
              <h3>SSR Safe by Design</h3>
              <p>
                Hooks guard browser-only APIs to avoid server-side rendering crashes and
                hydration mismatches.
              </p>
            </article>
            <article className="feature-card">
              <h3>TypeScript First</h3>
              <p>
                Strong types, generics, and IntelliSense make integrations predictable in
                strict mode projects.
              </p>
            </article>
            <article className="feature-card">
              <h3>Tree-Shakable</h3>
              <p>Import exactly what you need and keep bundle size under control.</p>
            </article>
            <article className="feature-card">
              <h3>Well Tested</h3>
              <p>
                99%+ coverage reduce regression risk and increase confidence
                in production.
              </p>
            </article>
            <article className="feature-card">
              <h3>Zero External Runtime Dependencies</h3>
              <p>Only React peer dependencies, no extra runtime baggage.</p>
            </article>
          </div>
        </section>

        <section className="section" id="demos" aria-labelledby="demos-title">
          <div className="section-head">
            <p className="eyebrow">Live Playground</p>
            <h2 id="demos-title">Interactive demos powered by real hooks</h2>
          </div>
          <p className="section-copy">
            These examples run with <code>reactilities</code> imported from dependencies,
            so visitors can feel real behavior before reading the docs.
          </p>

          <DemoSection />
          <noscript>
            JavaScript is disabled. Enable JavaScript to use live demos, or open the
            package docs on GitHub for code examples.
          </noscript>
        </section>

        <section className="section" id="api" aria-labelledby="api-title">
          <div className="section-head">
            <p className="eyebrow">API Explorer</p>
            <h2 id="api-title">Browse every hook and utility</h2>
          </div>
          <ApiExplorer />
        </section>

        <section className="section" id="index" aria-labelledby="index-title">
          <div className="section-head">
            <p className="eyebrow">SEO Index</p>
            <h2 id="index-title">Complete hook and utility index</h2>
          </div>
          <p className="section-copy">
            Full text index for search engines and quick scanning by developers.
          </p>

          <div className="index-grid">
            <details open>
              <summary>DOM Hooks (21)</summary>
              <p>
                useBattery, useClickOutside, useDarkMode, useDocumentTitle,
                useEventListener, useFavicon, useFocusTrap, useFullscreen, useHover,
                useLockBodyScroll, useLongPress, useMediaQuery, useMousePosition,
                useOrientation, usePageVisibility, usePortal, useResizeObserver,
                useRovingTabIndex, useScrollPosition, useScrollTo, useWindowSize
              </p>
            </details>
            <details>
              <summary>State Hooks (15)</summary>
              <p>
                useBoolean, useClipboard, useCookie, useCopyToClipboard, useCounter,
                useList, useLocalStorage, useMap, useObjectState, usePrevious,
                useSessionStorage, useSet, useStep, useToggle, useUndoRedo
              </p>
            </details>
            <details>
              <summary>Utility Hooks (29)</summary>
              <p>
                useAsync, useAutoSave, useCountdown, useDebounce,
                useDebounceCallback, useDragAndDrop, useEventSource, useFetch,
                useFileReader, useGeolocation, useIdleTimeout, useImageLazyLoad,
                useInfiniteScroll, useIntersectionObserver, useInterval, useIsMounted,
                useKeyboardShortcuts, useLogger, useNetworkState, usePermission,
                useSpeechRecognition, useSpeechSynthesis, useThrottle,
                useThrottleCallback, useTimeout, useVirtualization, useWebSocket,
                useWhyDidYouRender, useWorker
              </p>
            </details>
            <details>
              <summary>Lifecycle Hooks (6)</summary>
              <p>
                componentDidMount, componentDidUpdate, componentWillMount,
                componentWillUnmount, useIsomorphicLayoutEffect, useUpdateEffect
              </p>
            </details>
            <details>
              <summary>Helper Functions (2)</summary>
              <p>classnames, loadScript</p>
            </details>
            <details>
              <summary>TypeScript Types (5)</summary>
              <p>
                Nullable&lt;T&gt;, Maybe&lt;T&gt;, ValueOf&lt;T&gt;, DeepPartial&lt;T&gt;,
                VoidFunction&lt;T&gt;
              </p>
            </details>
          </div>
        </section>

        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Common questions</h2>
          </div>

          <div className="faq-list">
            <details>
              <summary>Is Reactilities SSR compatible?</summary>
              <p>
                Yes. Hooks are implemented with SSR guards for browser APIs to avoid
                runtime crashes during server rendering.
              </p>
            </details>
            <details>
              <summary>Does it work with TypeScript strict mode?</summary>
              <p>
                Yes. The package is TypeScript-first and ships with complete type
                definitions, including utility generic types.
              </p>
            </details>
            <details>
              <summary>Can I import only specific hooks?</summary>
              <p>
                Yes. Reactilities is tree-shakable, so modern bundlers remove unused
                exports.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          Built for{" "}
          <a
            href="https://github.com/petar-basic/reactilities"
            target="_blank"
            rel="noreferrer"
          >
            reactilities
          </a>{" "}
          · MIT License
        </p>
        <p>
          <a
            href="https://www.npmjs.com/package/reactilities"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/petar-basic/reactilities/issues"
            target="_blank"
            rel="noreferrer"
          >
            Issues
          </a>
        </p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
