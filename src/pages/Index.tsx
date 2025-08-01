import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SCDForm } from "@/components/SCDForm";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-background">
            <SCDForm />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
