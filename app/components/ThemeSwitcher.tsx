'use client';

import { useTheme } from '@/app/providers';
import { Moon, Sun } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700 transition-transform duration-200" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-200" />
      )}
    </button>
  );
}
