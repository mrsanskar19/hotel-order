import AppContainer from "@/components/AppContainer";
import BottomNav from "@/components/BottomNav";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContainer>
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </AppContainer>
  );
}
