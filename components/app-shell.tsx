import Link from "next/link";
import Sidebar from "@/components/sidebar";
import type {
  CMSNavLink,
  CMSProfile,
  CMSSiteSettings,
  CMSSocialLink,
} from "@/lib/cms";

export default function AppShell({
  profile,
  navLinks,
  socialLinks,
  settings,
  children,
}: {
  profile: CMSProfile | null;
  navLinks: CMSNavLink[];
  socialLinks: CMSSocialLink[];
  settings: CMSSiteSettings | null;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 p-4 sm:p-6 lg:flex-row lg:p-8 xl:gap-8">
      <Sidebar
        profile={profile}
        navLinks={navLinks}
        socialLinks={socialLinks}
        settings={settings}
      />
      <main className="w-full min-w-0 flex-1 space-y-6">
        {children}
        <footer className="px-2 pb-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          {profile?.name ?? "Amartuvshin Surenjav"}
          {" · "}
          <Link
            href="/feed.xml"
            className="transition-colors hover:text-foreground"
          >
            RSS
          </Link>
        </footer>
      </main>
    </div>
  );
}
