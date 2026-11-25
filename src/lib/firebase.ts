import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  getToken,
  type AppCheck,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sandheep-portfolio-6321.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sandheep-portfolio-6321",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sandheep-portfolio-6321.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "331684234917",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:331684234917:web:84467777ae42883ee2ef4c",
};

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Le_djEuAAAAAKweHn84I3PvLpnrLSnBQJqDuaU0";

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const globalForAppCheck = globalThis as typeof globalThis & {
  __firebaseAppCheckInstance?: AppCheck;
};

export function getAppCheckInstance(): AppCheck {
  if (typeof window === "undefined") {
    throw new Error("App Check requires a browser environment.");
  }

  if (!globalForAppCheck.__firebaseAppCheckInstance) {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID !== "function") {
      crypto.randomUUID = () =>
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }) as `${string}-${string}-${string}-${string}-${string}`;
    }

    if (process.env.NODE_ENV === "development") {
      (
        window as Window & { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string }
      ).FIREBASE_APPCHECK_DEBUG_TOKEN =
        process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN || true;
    }

    globalForAppCheck.__firebaseAppCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  }

  return globalForAppCheck.__firebaseAppCheckInstance;
}

export async function getAppCheckToken(forceRefresh = false): Promise<string> {
  const result = await getToken(getAppCheckInstance(), forceRefresh);
  return result.token;
}

export { app };
