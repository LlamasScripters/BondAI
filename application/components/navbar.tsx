"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  ShoppingCart,
  Briefcase,
  Users,
  Zap,
  FileText,
  TrendingUp,
  Lightbulb,
  Play
} from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3) // Mock cart count
  const [notificationCount] = useState(2) // Mock notification count

  const navigationItems = [
    { 
      name: "Services", 
      href: "/", 
      icon: Search,
      description: "Trouvez le prestataire parfait"
    },
    { 
      name: "Service Paths", 
      href: "/service-paths", 
      icon: Lightbulb,
      description: "Feuilles de route automatisées"
    },
    { 
      name: "Mes Projets", 
      href: "/dashboard", 
      icon: Briefcase,
      description: "Gérez vos projets en cours"
    },
    { 
      name: "Équipes", 
      href: "/equipe", 
      icon: Users,
      description: "Équipes recommandées"
    },
    { 
      name: "Comment ça marche", 
      href: "/comment-ca-marche", 
      icon: TrendingUp,
      description: "Découvrez SMP Platform"
    }
  ]

  const quickActions = [
    {
      name: "🎯 DÉMO LIVE",
      href: "/demo",
      icon: Play,
      variant: "default" as const
    },
    {
      name: "Portfolio IA",
      href: "/ai-portfolio", 
      icon: FileText,
      variant: "outline" as const
    }
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="hidden text-xl font-bold sm:inline-block">
            SMP Platform
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuItem asChild>
                    <Link href={item.href} className="flex flex-col items-start p-3">
                      <div className="flex items-center gap-2 font-medium">
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}
        </div>

        {/* Quick Actions & User Menu */}
        <div className="flex items-center space-x-4">
          
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.name}
                  variant={action.variant}
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <Link href={action.href}>
                    <Icon className="h-4 w-4" />
                    {action.name}
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* Cart */}
          <Link href="/panier">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">John Doe</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profil/1" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Mon Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Mes Projets</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contractualisation" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Mes Contrats</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            
            {/* Quick Actions Mobile */}
            <div className="flex flex-col space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.name}
                    variant={action.variant}
                    size="sm"
                    asChild
                    className="justify-start"
                  >
                    <Link 
                      href={action.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {action.name}
                    </Link>
                  </Button>
                )
              })}
            </div>

            {/* Navigation Items Mobile */}
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
