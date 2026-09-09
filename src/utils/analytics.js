import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-1SJ51YJ4NT";
const CLIENT_STORAGE_KEY = "portfolio_client_uid";
const SESSION_STORAGE_KEY = "portfolio_session_id";
const VISIT_COUNT_KEY = "portfolio_visit_count";
const FIRST_SEEN_KEY = "portfolio_first_seen";

/**
 * Generate a cryptographically strong UUID v4 with browser fallback
 */
function generateUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback
    }
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Detect Client Machine, Hardware, Network, and OS Telemetry
 */
function detectMachineProfile() {
  if (typeof window === "undefined") {
    return {
      os: "Unknown",
      browser: "Unknown",
      deviceType: "desktop",
      screenRes: "0x0",
      viewport: "0x0",
      dpr: 1,
      colorDepth: 24,
      orientation: "landscape",
      cores: 1,
      memoryGB: "N/A",
      networkType: "unknown",
      downlinkMbps: "N/A",
      rttMs: "N/A",
      saveData: false,
      timezone: "UTC",
      timezoneOffsetMin: 0,
      language: "en",
      languages: ["en"],
      touchSupport: false,
      prefersDark: false,
      reducedMotion: false,
      doNotTrack: false,
    };
  }

  const nav = window.navigator || {};
  const scr = window.screen || {};
  const ua = nav.userAgent || "";

  // OS Detection
  let os = "Other";
  if (/windows nt 10/i.test(ua)) os = "Windows 10/11";
  else if (/windows nt/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/cros/i.test(ua)) os = "ChromeOS";
  else if (/linux/i.test(ua)) os = "Linux";

  // Browser Detection
  let browser = "Other";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";

  // Device Category
  const isMobile = /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isTablet = /ipad|tablet|(android(?!.*mobile))/i.test(ua);
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  // Hardware Concurrency & Memory
  const cores = nav.hardwareConcurrency || 1;
  const memoryGB = nav.deviceMemory ? `${nav.deviceMemory} GB` : "N/A";

  // Network Telemetry
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  const networkType = conn ? conn.effectiveType || conn.type || "unknown" : "unknown";
  const downlinkMbps = conn && conn.downlink != null ? conn.downlink : "N/A";
  const rttMs = conn && conn.rtt != null ? conn.rtt : "N/A";
  const saveData = !!(conn && conn.saveData);

  // Timezone & Locale
  let timezone = "UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch (e) {
    timezone = "UTC";
  }
  const timezoneOffsetMin = new Date().getTimezoneOffset();

  // Screen & Viewport
  const screenRes = `${scr.width || 0}x${scr.height || 0}`;
  const viewport = `${window.innerWidth || 0}x${window.innerHeight || 0}`;
  const dpr = window.devicePixelRatio || 1;
  const colorDepth = scr.colorDepth || 24;
  const orientation =
    scr.orientation && scr.orientation.type
      ? scr.orientation.type.includes("portrait")
        ? "portrait"
        : "landscape"
      : window.innerHeight > window.innerWidth
      ? "portrait"
      : "landscape";

  // Touch Support
  const touchSupport =
    "ontouchstart" in window || nav.maxTouchPoints > 0 || (nav.msMaxTouchPoints && nav.msMaxTouchPoints > 0);

  // User Preferences
  const prefersDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)").matches : true;
  const reducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  const doNotTrack = nav.doNotTrack === "1" || window.doNotTrack === "1";

  return {
    os,
    browser,
    deviceType,
    screenRes,
    viewport,
    dpr,
    colorDepth,
    orientation,
    cores,
    memoryGB,
    networkType,
    downlinkMbps,
    rttMs,
    saveData,
    timezone,
    timezoneOffsetMin,
    language: nav.language || "en",
    languages: nav.languages ? Array.from(nav.languages) : [nav.language || "en"],
    touchSupport,
    prefersDark,
    reducedMotion,
    doNotTrack,
  };
}

/**
 * Parse Acquisition, Referrer and UTM Parameters
 */
function detectAcquisition() {
  if (typeof window === "undefined") {
    return {
      referrerUrl: "",
      referrerDomain: "direct",
      referrerType: "direct",
      landingPath: "/",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    };
  }

  const rawReferrer = document.referrer || "";
  let referrerDomain = "direct";
  let referrerType = "direct";

  if (rawReferrer) {
    try {
      const parsed = new URL(rawReferrer);
      referrerDomain = parsed.hostname;

      if (parsed.hostname === window.location.hostname) {
        referrerType = "internal";
      } else if (/google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\./i.test(parsed.hostname)) {
        referrerType = "organic_search";
      } else if (/linkedin\.|t\.co|twitter\.|x\.com|facebook\.|instagram\.|reddit\./i.test(parsed.hostname)) {
        referrerType = "social";
      } else if (/github\./i.test(parsed.hostname)) {
        referrerType = "developer_hub";
      } else {
        referrerType = "referral";
      }
    } catch (e) {
      referrerDomain = rawReferrer;
      referrerType = "referral";
    }
  }

  // Parse UTM tags
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";
  const utmTerm = params.get("utm_term") || "";
  const utmContent = params.get("utm_content") || "";

  return {
    referrerUrl: rawReferrer,
    referrerDomain,
    referrerType,
    landingPath: window.location.pathname + window.location.search,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  };
}

class AnalyticsEngine {
  constructor() {
    this.isInitialized = false;
    this.clientId = "";
    this.sessionId = "";
    this.isReturningVisitor = false;
    this.visitCount = 1;
    this.machineProfile = {};
    this.acquisition = {};
    this.eventBuffer = []; // Last 50 events for DevTools HUD inspection
    this.listeners = new Set();
    this.sessionStartTime = Date.now();
    this.impressionsRecorded = new Set();
  }

  init() {
    if (this.isInitialized || typeof window === "undefined") return;

    try {
      // 1. Persistent Client UID
      let storedClient = localStorage.getItem(CLIENT_STORAGE_KEY);
      if (!storedClient) {
        storedClient = `usr_${generateUUID()}`;
        localStorage.setItem(CLIENT_STORAGE_KEY, storedClient);
        localStorage.setItem(FIRST_SEEN_KEY, new Date().toISOString());
        this.isReturningVisitor = false;
        this.visitCount = 1;
        localStorage.setItem(VISIT_COUNT_KEY, "1");
      } else {
        this.isReturningVisitor = true;
        const currentVisits = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "1", 10);
        this.visitCount = currentVisits + 1;
        localStorage.setItem(VISIT_COUNT_KEY, String(this.visitCount));
      }
      this.clientId = storedClient;

      // 2. Session ID (session-scoped)
      let storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!storedSession) {
        storedSession = `ses_${Date.now()}_${generateUUID().slice(0, 8)}`;
        sessionStorage.setItem(SESSION_STORAGE_KEY, storedSession);
      }
      this.sessionId = storedSession;

      // 3. Telemetry Profiling
      this.machineProfile = detectMachineProfile();
      this.acquisition = detectAcquisition();

      // 4. Initialize ReactGA4
      ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
          userId: this.clientId,
        },
      });

      // 5. Register GA4 Custom User Properties
      ReactGA.set({
        client_uid: this.clientId,
        session_id: this.sessionId,
        device_type: this.machineProfile.deviceType,
        os_platform: this.machineProfile.os,
        browser_family: this.machineProfile.browser,
        screen_resolution: this.machineProfile.screenRes,
        user_timezone: this.machineProfile.timezone,
        referrer_source: this.acquisition.referrerDomain,
        is_returning: this.isReturningVisitor ? "true" : "false",
        visit_count: this.visitCount,
      });

      this.isInitialized = true;

      // Log initial session start
      this.trackEvent("Lifecycle", "session_start", this.sessionId, this.visitCount, {
        client_uid: this.clientId,
        landing_path: this.acquisition.landingPath,
        referrer_type: this.acquisition.referrerType,
        referrer_domain: this.acquisition.referrerDomain,
        utm_source: this.acquisition.utmSource,
        device_type: this.machineProfile.deviceType,
        os: this.machineProfile.os,
        browser: this.machineProfile.browser,
        screen_res: this.machineProfile.screenRes,
        cores: this.machineProfile.cores,
        network_type: this.machineProfile.networkType,
        timezone: this.machineProfile.timezone,
      });
    } catch (err) {
      console.warn("[Analytics] Initialization warning (adblocker/storage restricted):", err);
    }
  }

  /**
   * Track Enriched Pageview
   */
  trackPageView(path, title = "") {
    if (!this.isInitialized) this.init();

    const pageTitle = title || (typeof document !== "undefined" ? document.title : "");
    const payload = {
      hitType: "pageview",
      page: path,
      title: pageTitle,
      client_uid: this.clientId,
      session_id: this.sessionId,
      device_type: this.machineProfile.deviceType,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      session_duration_s: Math.round((Date.now() - this.sessionStartTime) / 1000),
    };

    try {
      ReactGA.send(payload);
    } catch (e) {
      // Ad-blocker safe
    }

    this._recordInternalEvent({
      type: "PAGEVIEW",
      category: "Navigation",
      action: "page_view",
      label: path,
      metadata: payload,
    });
  }

  /**
   * Track User Action Event
   */
  trackAction(actionName, category = "User Interaction", label = "", value = null, customMetadata = {}) {
    this.trackEvent(category, actionName, label, value, customMetadata);
  }

  /**
   * Base Event Dispatcher
   */
  trackEvent(category, action, label = "", value = null, customData = {}) {
    if (!this.isInitialized) this.init();

    const eventPayload = {
      category,
      action,
      label: label ? String(label) : undefined,
      value: typeof value === "number" ? Math.round(value) : undefined,
      ...customData,
      client_uid: this.clientId,
      session_id: this.sessionId,
      session_elapsed_s: Math.round((Date.now() - this.sessionStartTime) / 1000),
    };

    try {
      ReactGA.event(eventPayload);
    } catch (e) {
      // Ad-blocker safe
    }

    this._recordInternalEvent({
      type: "ACTION",
      category,
      action,
      label,
      value,
      metadata: customData,
    });
  }

  /**
   * Track Component Viewability Impression (debounced, once per session per component)
   */
  trackImpression(componentId, metadata = {}) {
    if (!this.isInitialized) this.init();

    const impressionKey = `${componentId}`;
    if (this.impressionsRecorded.has(impressionKey)) {
      return; // Already recorded for this visit
    }
    this.impressionsRecorded.add(impressionKey);

    const impressionData = {
      component_id: componentId,
      viewport: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "N/A",
      scroll_y: typeof window !== "undefined" ? Math.round(window.scrollY) : 0,
      ...metadata,
    };

    this.trackEvent("Impression", "component_view", componentId, null, impressionData);
  }

  /**
   * Report Web Vitals to GA4
   */
  trackWebVitals({ name, value, delta, id, rating }) {
    if (!this.isInitialized) this.init();

    const roundedVal = Math.round(name === "CLS" ? value * 1000 : value);
    this.trackEvent("Web Vitals", name, rating || id, roundedVal, {
      metric_id: id,
      metric_value: value,
      metric_delta: delta,
      metric_rating: rating,
    });
  }

  /**
   * Track Client JavaScript Errors and Promise Rejections
   */
  trackError(error, context = "window.onerror") {
    const errorMsg = error?.message || String(error);
    const errorStack = error?.stack ? error.stack.slice(0, 300) : "";

    this.trackEvent("Error", "js_exception", context, null, {
      error_message: errorMsg,
      error_stack: errorStack,
      url: typeof window !== "undefined" ? window.location.href : "",
    });
  }

  /**
   * Subscribe to live events (used by DevToolsHUD)
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  _recordInternalEvent(event) {
    const enriched = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      ...event,
    };

    this.eventBuffer.unshift(enriched);
    if (this.eventBuffer.length > 50) {
      this.eventBuffer.pop();
    }

    this.listeners.forEach((fn) => {
      try {
        fn(enriched, this.eventBuffer);
      } catch (e) {}
    });
  }

  getSnapshot() {
    return {
      clientId: this.clientId,
      sessionId: this.sessionId,
      isReturningVisitor: this.isReturningVisitor,
      visitCount: this.visitCount,
      machineProfile: this.machineProfile,
      acquisition: this.acquisition,
      events: [...this.eventBuffer],
      impressionsCount: this.impressionsRecorded.size,
    };
  }
}

export const analytics = new AnalyticsEngine();
export default analytics;
