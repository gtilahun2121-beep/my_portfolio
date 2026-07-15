import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
    </button>
  )
}

export default ThemeToggle
