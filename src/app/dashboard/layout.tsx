
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

import * as React from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  QrCode,
  Settings,
  UtensilsCrossed,
  Box
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAppData } from '@/hooks/useAppData';
import { getData } from '@/lib/api';

const navItems = [
  { href: './dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: './menu', icon: UtensilsCrossed, label: 'Menu' },
  { href: './category', icon: Box, label: 'Category' },
  { href: './orders', icon: ClipboardList, label: 'Orders' },
  { href: './reviews', icon: MessageSquare, label: 'Reviews' },
  { href: './qr-code', icon: QrCode, label: 'QR Code' },
  { href: './settings', icon: Settings, label: 'Settings' },
];

const MobileBottomNav = () => {
  const pathname = usePathname();
  const visibleNavItems = navItems; // Show all items on mobile nav
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-start overflow-x-auto px-2">
        {visibleNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 p-2 text-muted-foreground transition-colors hover:text-primary flex-shrink-0 w-20',
              pathname === item.href && 'text-primary'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

function MainLayout({ children }: { children: React.ReactNode }) {
  const { hotelIdAdmin,logout } = useAppData();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const currentNavItem = navItems.find((item) => pathname.startsWith(item.href));
  const [hotelData, setHotelData] = React.useState<any>(null);
  const fetchData = async () => {
    const response = await getData(`hotel/${hotelIdAdmin}`);
    console.log(response)
    setHotelData(response);
  }
  React.useEffect(() => {
    fetchData();
  },[hotelIdAdmin])

  return (
    <SidebarProvider>
      <Sidebar className="mt-5 mx-5 h-100">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ChefHat size={20} />
            </div>
            <span className="font-headline text-lg">{hotelData?.name || "Loading..."}</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                 <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="https://placehold.co/40x40.png"
                alt="Admin"
                data-ai-hint="person portrait"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="truncate font-medium">Admin User</p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                {}{hotelData?.email || 'Loading...'}
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:pl-4 md:pr-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold font-headline">
              {currentNavItem?.label}
            </h1>
          </div>
          <Button asChild variant="outline" size="sm" onClick={()=>{logout();router.push("/login")}}>
            Logout
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:pb-6 pb-20">
          {children}
        </main>
        {isMobile && <MobileBottomNav />}
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } =useAppData();
  const pathname = usePathname();
  const router = useRouter();
  // if (!isAuthenticated) router.push('/login');
  return (
      <main className="font-body antialiased">
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </main>
  );
}
''