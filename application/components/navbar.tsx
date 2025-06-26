"use client"
import { Moon, Sun, Bot, Plus, Monitor, ChevronDown, LayoutDashboard, ShoppingCart, Store, HelpCircle, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/comment-ca-marche", label: "Comment ça marche" },
    { href: "/ai-portfolio", label: "Portfolio AI", icon: Palette },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">BondIa</span>
          </Link>          {/* Navigation centrale */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  asChild
                  className="flex items-center gap-2"
                >
                  <Link href={item.href}>
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </div>{/* Actions à droite */}
          <div className="flex items-center gap-2">
            
            {/* Dashboard link */}
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>

            {/* Panier link */}
            <Link href="/panier">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Panier
              </Button>
            </Link>

            {/* Theme dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <ChevronDown className="h-3 w-3 ml-1" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-4 w-4 mr-2" />
                  Clair
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-4 w-4 mr-2" />
                  Sombre
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="h-4 w-4 mr-2" />
                  Système
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Proposer une prestation */}
            <Link href="/proposer">
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Proposer
              </Button>
            </Link>

            {/* Menu mobile */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  )
}
