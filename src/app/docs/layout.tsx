
'use client'

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { BookOpen, Code, Home, Sparkles } from "lucide-react"
import Logo from "@/components/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

const docsNav = [
  {
    title: 'Overview',
    href: '/docs',
    icon: <Home />,
  },
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: <BookOpen />,
  },
  {
    title: 'API Reference',
    icon: <Code />,
    items: [
      { title: 'Bookings API', href: '/docs/api/bookings' },
      { title: 'Guests API', href: '/docs/api/guests' },
      { title: 'Rooms API', href: '/docs/api/rooms' },
    ]
  },
  {
    title: 'AI Doc Generator',
    href: '/docs/generator',
    icon: <Sparkles />,
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {docsNav.map((item, index) => (
              <SidebarMenuItem key={index}>
                {item.items ? (
                   <>
                    <SidebarMenuButton>
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.items.map((subItem, subIndex) => (
                        <SidebarMenuItem key={subIndex}>
                          <Link href={subItem.href} passHref legacyBehavior>
                           <SidebarMenuSubButton isActive={pathname === subItem.href}>
                                {subItem.title}
                           </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </>
                ) : (
                  <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton isActive={pathname === item.href}>
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
