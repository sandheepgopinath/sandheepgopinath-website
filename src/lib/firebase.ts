import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  getToken,
  type AppCheck,
} from "firebase/app-check";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sandheep-portfolio-6321.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sandheep-portfolio-6321",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sandheep-portfolio-6321.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "331684234917",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:331684234917:web:84467777ae42883ee2ef4c",
};

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeuPTAuAAAAAIQhXZiUnVHpfHYcW_n80J5i4Uoj";

let app: FirebaseApp | undefined;
let appCheck: AppCheck | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

/**
 * Initializes Firebase App Check with reCAPTCHA Enterprise.
 * Strictly runs on the browser side (never SSR).
 */
export function initAppCheck(): AppCheck | undefined {
  if (typeof window === "undefined") return undefined;
  if (appCheck) return appCheck;

  try {
    const firebaseApp = getFirebaseApp();

    // Enable App Check debug token in local development if specified
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      const debugToken = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN;
      if (debugToken) {
        (window as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string }).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;
      }
    }

    appCheck = initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
    return appCheck;
  } catch (err) {
    console.warn("Failed to initialize Firebase App Check:", err);
    return undefined;
  }
}

/**
 * Retrieves a valid Firebase App Check token.
 * Pass forceRefresh = true to force generation of a new token (e.g. after a 403).
 */
export async function getAppCheckToken(forceRefresh = false): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const ac = appCheck || initAppCheck();
    if (!ac) return null;
    const result = await getToken(ac, forceRefresh);
    return result.token;
  } catch (err) {
    console.warn("Error getting Firebase App Check token:", err);
    return null;
  }
}

export { app, appCheck };
