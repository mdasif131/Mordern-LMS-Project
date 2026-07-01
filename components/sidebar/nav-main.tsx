"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { CirclePlusIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cloneElement, isValidElement } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?:
      | React.ComponentType<
          React.SVGProps<SVGSVGElement> & { className?: string }
        >
      | React.ReactElement
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {pathname.startsWith("/admin") && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Quick Create"
                className="mb-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/95"
              >
                <Link href="/admin/courses/create">
                  <CirclePlusIcon className="size-4" />
                  <span className="font-semibold">Quick Create</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {items.map((item) => {
            const isActive = pathname === item.url

            // Render icon based on its type
            const renderIcon = () => {
              if (!item.icon) return null

              if (isValidElement(item.icon)) {
                // If it's already a React element, clone it with the className
                return cloneElement(item.icon as React.ReactElement<any>, {
                  className: cn(
                    (item.icon as any).props?.className,
                    pathname === item.url && "text-primary"
                  ),
                })
              }

              // If it's a component, render it normally
              const Icon = item.icon as React.ComponentType<any>
              return (
                <Icon className={cn(pathname === item.url && "text-primary")} />
              )
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className="mt-1 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                >
                  <Link href={item.url}>
                    {renderIcon()}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
