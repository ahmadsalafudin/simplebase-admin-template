import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PageTransition from "./PageTransition";
import { MobileSidebarProvider } from "./MobileSidebarContext";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-obsidian">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar title={title} subtitle={subtitle} />
          <main
            className="px-24 md:px-32 py-32 mx-auto w-full transition-[max-width] duration-300 ease-in-out"
            style={{ maxWidth: "var(--content-max-width)" }}
          >
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
}
