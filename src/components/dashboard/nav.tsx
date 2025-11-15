'use client'

/**
 * Dashboard Navigation Component
 * 包含用户信息、导航链接和登出功能
 */

import { User } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, LayoutDashboard, PlusCircle, Settings, LogOut, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'

interface DashboardNavProps {
  user: User
}

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast.success('已退出登录')
      router.push('/login')
      router.refresh()
    } catch (error: any) {
      toast.error('退出失败', {
        description: error.message,
      })
    }
  }

  const navLinks = [
    {
      href: '/dashboard',
      label: '我的纪念页',
      icon: LayoutDashboard,
    },
    {
      href: '/memorials/create',
      label: '创建纪念页',
      icon: PlusCircle,
    },
    {
      href: '/settings',
      label: '账户设置',
      icon: Settings,
    },
  ]

  // 获取用户名首字母作为 Avatar fallback
  const getUserInitial = () => {
    const name = user.user_metadata?.name || user.email
    return name ? name.charAt(0).toUpperCase() : 'U'
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Heart className="h-6 w-6 text-primary-600" fill="currentColor" />
            <span className="text-xl font-semibold text-neutral-800">
              彩虹桥纪念
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.user_metadata?.avatar_url}
                    alt={user.user_metadata?.name || user.email || '用户'}
                  />
                  <AvatarFallback className="bg-primary-100 text-primary-700">
                    {getUserInitial()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user_metadata?.name || '用户'}
                  </p>
                  <p className="text-xs leading-none text-neutral-500">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Mobile navigation links */}
              <div className="md:hidden">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
              </div>

              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  个人资料
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
