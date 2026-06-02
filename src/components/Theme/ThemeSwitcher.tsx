import moonIcon from '../../assets/moon.png'
import sunIcon from '../../assets/sun.png'
import { useThemeStore } from '../../store/themeStore'
import './ThemeSwitcher.scss'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      <img
        src={theme === 'light' ? moonIcon : sunIcon}
        alt="theme icon"
      />
    </button>
  )
}
