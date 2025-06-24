'use client';
import { Moon, Sun, Bot, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import { useTheme } from 'next-themes';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  // const { theme, setTheme } = useTheme();

  return (
    <nav className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link
            href='/'
            className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
            <div className='h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
              <Bot className='h-5 w-5 text-white' />
            </div>
            <span className='text-xl font-bold text-foreground'>
              Services IA
            </span>
          </Link>

          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-foreground hover:text-primary transition-colors font-medium'>
              Marketplace
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            <ThemeToggle />
            {/* <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='h-9 w-9'>
              <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Changer le thème</span>
            </Button> */}

            <Link href='/proposer'>
              <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium'>
                <Plus className='h-4 w-4 mr-2' />
                Proposer une prestation
              </Button>
            </Link>

            <div className='md:hidden'>
              <Button variant='ghost' size='icon'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
