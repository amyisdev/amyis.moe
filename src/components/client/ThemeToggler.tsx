import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import { useEffectOnce } from 'react-use'

const ThemeToggler = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  useEffectOnce(() => {
    if (theme === 'system' && systemTheme) {
      setTheme(systemTheme)
    }
  })

  return (
    <button className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600" onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon className="h-6 w-6 text-white" /> : <MoonIcon className="h-6 w-6 text-white" />}
    </button>
  )
}

export default ThemeToggler
