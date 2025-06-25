import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  variant?: 'default' | 'submenu';
}

export function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    const themeValue = newTheme === 'auto' ? 'system' : newTheme;

    setTheme(themeValue);
  };

  const getCurrentTheme = () => {
    const localTheme = theme === 'system' ? 'auto' : theme;
    console.log('Using local theme for selection:', localTheme);
    return localTheme;
  };

  const currentTheme = getCurrentTheme();

  if (variant === 'submenu') {
    return (
      <>
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className={currentTheme === 'light' ? 'bg-accent' : ''}>
          <SunIcon className='mr-2 h-4 w-4' />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className={currentTheme === 'dark' ? 'bg-accent' : ''}>
          <MoonIcon className='mr-2 h-4 w-4' />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('auto')}
          className={currentTheme === 'auto' ? 'bg-accent' : ''}>
          <LaptopIcon className='mr-2 h-4 w-4' />
          <span>Automatique</span>
        </DropdownMenuItem>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className={currentTheme === 'light' ? 'bg-accent' : ''}>
          <SunIcon className='mr-2 h-4 w-4' />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className={currentTheme === 'dark' ? 'bg-accent' : ''}>
          <MoonIcon className='mr-2 h-4 w-4' />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('auto')}
          className={currentTheme === 'auto' ? 'bg-accent' : ''}>
          <LaptopIcon className='mr-2 h-4 w-4' />
          <span>Automatique</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
