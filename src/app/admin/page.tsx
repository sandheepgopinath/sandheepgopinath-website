import type { Metadata } from "next";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { ADMIN_EMAIL, auth, signIn, signOut } from "@/auth";
import { AdminTabs } from "./AdminTabs";
import styles from "./admin.module.css";

export const instant = false;

export const metadata: Metadata = {
  title: "Career Admin · Sandheep Gopinath",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  const isAdmin = session?.user?.email?.toLowerCase() === ADMIN_EMAIL;

  if (!isAdmin) {
    return (
      <main className={styles.page}>
        <section className={styles.signInCard}>
          <div className={styles.lockIcon}><LockKeyhole aria-hidden="true" /></div>
          <span className={styles.eyebrow}>PRIVATE WORKSPACE</span>
          <h1>Career Admin</h1>
          <p>Sign in with the authorized Google account to work on applications and interview preparation.</p>
          <form action={async () => { "use server"; await signIn("google", { redirectTo: "/admin" }); }}>
            <button type="submit" className={styles.googleButton}>
              <span className={styles.googleMark}>G</span>
              Continue with Google
            </button>
          </form>
          <div className={styles.securityLine}><ShieldCheck aria-hidden="true" /> Access is restricted by verified email.</div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>SANDHEEP · PRIVATE</span>
            <h1>Career <em>Workbench</em></h1>
            <p>Turn a role description into a focused, authentic application strategy.</p>
          </div>
          <div className={styles.account}>
            <span><strong>{session.user?.name || "Sandheep"}</strong><small>{session.user?.email}</small></span>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/admin" }); }}>
              <button type="submit">Sign out</button>
            </form>
          </div>
        </header>
        <AdminTabs />
      </div>
    </main>
  );
}
