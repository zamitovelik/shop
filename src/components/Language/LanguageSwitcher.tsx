import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.scss'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title={i18n.language === 'en' ? 'Русский' : 'English'}
    >
      {i18n.language === 'en' ? 'РУ' : 'EN'}
    </button>
  )
}
