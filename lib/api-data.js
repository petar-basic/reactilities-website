export const DOC_BASE = "https://github.com/petar-basic/reactilities/blob/main";
export const TYPES_DOC_URL = "https://github.com/petar-basic/reactilities#typescript-types";

export const CATEGORY_FILTERS = [
  "ALL",
  "DOM",
  "STATE",
  "UTILITY",
  "LIFECYCLE",
  "HELPERS",
  "TYPES"
];

export const API_DATA = [
  { category: "DOM", name: "useClickOutside", description: "Detect clicks outside an element", docsPath: "src/dom/useClickOutside/README.md" },
  { category: "DOM", name: "useDarkMode", description: "Dark mode with system preference detection and persistence", docsPath: "src/dom/useDarkMode/README.md" },
  { category: "DOM", name: "useDocumentTitle", description: "Dynamically update the document title", docsPath: "src/dom/useDocumentTitle/README.md" },
  { category: "DOM", name: "useEventListener", description: "Add event listeners with automatic cleanup", docsPath: "src/dom/useEventListener/README.md" },
  { category: "DOM", name: "useFavicon", description: "Dynamically update the website favicon", docsPath: "src/dom/useFavicon/README.md" },
  { category: "DOM", name: "useFocusTrap", description: "Trap keyboard focus within a container", docsPath: "src/dom/useFocusTrap/README.md" },
  { category: "DOM", name: "useFullscreen", description: "Enter, exit, and track fullscreen state", docsPath: "src/dom/useFullscreen/README.md" },
  { category: "DOM", name: "useHover", description: "Detect hover state on any element", docsPath: "src/dom/useHover/README.md" },
  { category: "DOM", name: "useLockBodyScroll", description: "Prevent body scrolling for modals and overlays", docsPath: "src/dom/useLockBodyScroll/README.md" },
  { category: "DOM", name: "useLongPress", description: "Detect long press and hold interactions", docsPath: "src/dom/useLongPress/README.md" },
  { category: "DOM", name: "useMediaQuery", description: "Responsive behavior with CSS media queries", docsPath: "src/dom/useMediaQuery/README.md" },
  { category: "DOM", name: "useMousePosition", description: "Track real-time cursor position", docsPath: "src/dom/useMousePosition/README.md" },
  { category: "DOM", name: "usePageVisibility", description: "Detect when the browser tab is hidden or visible", docsPath: "src/dom/usePageVisibility/README.md" },
  { category: "DOM", name: "useResizeObserver", description: "Observe element size changes", docsPath: "src/dom/useResizeObserver/README.md" },
  { category: "DOM", name: "useScrollPosition", description: "Track window scroll coordinates", docsPath: "src/dom/useScrollPosition/README.md" },
  { category: "DOM", name: "useWindowSize", description: "Track browser window dimensions", docsPath: "src/dom/useWindowSize/README.md" },

  { category: "STATE", name: "useCookie", description: "Read and write browser cookies", docsPath: "src/state/useCookie/README.md" },
  { category: "STATE", name: "useCopyToClipboard", description: "Copy text to clipboard with fallback", docsPath: "src/state/useCopyToClipboard/README.md" },
  { category: "STATE", name: "useList", description: "Manage array state with rich helper actions", docsPath: "src/state/useList/README.md" },
  { category: "STATE", name: "useLocalStorage", description: "Persist state in localStorage with sync", docsPath: "src/state/useLocalStorage/README.md" },
  { category: "STATE", name: "useMap", description: "Manage Map state with React integration", docsPath: "src/state/useMap/README.md" },
  { category: "STATE", name: "useObjectState", description: "Manage object state with partial updates", docsPath: "src/state/useObjectState/README.md" },
  { category: "STATE", name: "usePrevious", description: "Access previous render value", docsPath: "src/state/usePrevious/README.md" },
  { category: "STATE", name: "useSessionStorage", description: "Persist state in sessionStorage", docsPath: "src/state/useSessionStorage/README.md" },
  { category: "STATE", name: "useSet", description: "Manage Set state with React integration", docsPath: "src/state/useSet/README.md" },
  { category: "STATE", name: "useToggle", description: "Toggle boolean state with flexible API", docsPath: "src/state/useToggle/README.md" },
  { category: "STATE", name: "useUndoRedo", description: "State with undo and redo history", docsPath: "src/state/useUndoRedo/README.md" },
  { category: "STATE", name: "useBoolean", description: "Boolean state with setTrue and setFalse helpers", docsPath: "src/state/useBoolean/README.md" },
  { category: "STATE", name: "useCounter", description: "Numeric counter with min/max bounds and step", docsPath: "src/state/useCounter/README.md" },

  { category: "UTILITY", name: "useAsync", description: "Manage async operations with loading and error state", docsPath: "src/utils/useAsync/README.md" },
  { category: "UTILITY", name: "useCountdown", description: "Countdown or count-up timer with controls", docsPath: "src/utils/useCountdown/README.md" },
  { category: "UTILITY", name: "useDebounce", description: "Debounce rapidly changing values", docsPath: "src/utils/useDebounce/README.md" },
  { category: "UTILITY", name: "useFetch", description: "Data fetching with automatic abort support", docsPath: "src/utils/useFetch/README.md" },
  { category: "UTILITY", name: "useGeolocation", description: "Access user geolocation", docsPath: "src/utils/useGeolocation/README.md" },
  { category: "UTILITY", name: "useInfiniteScroll", description: "Infinite scrolling with IntersectionObserver", docsPath: "src/utils/useInfiniteScroll/README.md" },
  { category: "UTILITY", name: "useIsMounted", description: "Guard async updates against unmounted components", docsPath: "src/utils/useIsMounted/README.md" },
  { category: "UTILITY", name: "useIntersectionObserver", description: "Detect element visibility", docsPath: "src/utils/useIntersectionObserver/README.md" },
  { category: "UTILITY", name: "useInterval", description: "Run callback on a fixed interval", docsPath: "src/utils/useInterval/README.md" },
  { category: "UTILITY", name: "useKeyboardShortcuts", description: "Handle keyboard shortcuts", docsPath: "src/utils/useKeyboardShortcuts/README.md" },
  { category: "UTILITY", name: "useManualUpdate", description: "Manually trigger component re-render", docsPath: "src/utils/useManualUpdate/README.md" },
  { category: "UTILITY", name: "useNetworkState", description: "Monitor network connectivity", docsPath: "src/utils/useNetworkState/README.md" },
  { category: "UTILITY", name: "usePermission", description: "Query browser permission status reactively", docsPath: "src/utils/usePermission/README.md" },
  { category: "UTILITY", name: "useThrottle", description: "Throttle rapidly changing values", docsPath: "src/utils/useThrottle/README.md" },
  { category: "UTILITY", name: "useTimeout", description: "Run callback after delay with reset and clear", docsPath: "src/utils/useTimeout/README.md" },
  { category: "UTILITY", name: "useVirtualization", description: "Virtualize large lists for performance", docsPath: "src/utils/useVirtualization/README.md" },
  { category: "UTILITY", name: "useWebSocket", description: "Manage WebSocket connections", docsPath: "src/utils/useWebSocket/README.md" },

  { category: "LIFECYCLE", name: "componentDidMount", description: "Run function after component mounts", docsPath: "src/lifecycles/componentDidMount/README.md" },
  { category: "LIFECYCLE", name: "componentDidUpdate", description: "Run function after every render", docsPath: "src/lifecycles/componentDidUpdate/README.md" },
  { category: "LIFECYCLE", name: "componentWillMount", description: "Run function before first render", docsPath: "src/lifecycles/componentWillMount/README.md" },
  { category: "LIFECYCLE", name: "componentWillUnmount", description: "Run cleanup before unmount", docsPath: "src/lifecycles/componentWillUnmount/README.md" },
  { category: "LIFECYCLE", name: "useIsomorphicLayoutEffect", description: "SSR-safe drop-in for useLayoutEffect", docsPath: "src/lifecycles/useIsomorphicLayoutEffect/README.md" },
  { category: "LIFECYCLE", name: "useUpdateEffect", description: "useEffect variant that skips first render", docsPath: "src/lifecycles/useUpdateEffect/README.md" },

  { category: "HELPERS", name: "classnames", description: "Conditionally join CSS class names", docsPath: "src/helpers/classnames/README.md" },
  { category: "HELPERS", name: "loadScript", description: "Dynamically load external scripts", docsPath: "src/helpers/scriptLoader/README.md" },

  { category: "TYPES", name: "Nullable<T>", description: "Make a type nullable: T | null", docsPath: null },
  { category: "TYPES", name: "Maybe<T>", description: "Make a type nullable and undefined", docsPath: null },
  { category: "TYPES", name: "ValueOf<T>", description: "Extract all possible values from an object", docsPath: null },
  { category: "TYPES", name: "DeepPartial<T>", description: "Recursively make all properties optional", docsPath: null },
  { category: "TYPES", name: "VoidFunction<T>", description: "Type for void-returning typed functions", docsPath: null }
];
