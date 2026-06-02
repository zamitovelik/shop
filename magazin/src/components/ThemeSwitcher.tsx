import { useThemeStore } from '../store/themeStore'
import '../styles/ThemeSwitcher.scss'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
