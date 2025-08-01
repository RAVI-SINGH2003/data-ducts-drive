import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="h-16 border-b bg-background flex items-center px-4">
      <SidebarTrigger className="mr-4" />
      <h1 className="text-xl font-semibold text-foreground">Dev SecOps</h1>
    </header>
  );
}