import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'
import { SettingsProvider } from './context/SettingsContext.tsx'
import { NavigationProvider } from './context/NavigationContext.tsx'
import { LeaderboardProvider } from './context/LeaderboardContext.tsx'

createRoot(document.getElementById('root')!).render(
	<NavigationProvider>
		<SettingsProvider>
			<LeaderboardProvider>
				<App />
			</LeaderboardProvider>
		</SettingsProvider>
	</NavigationProvider>
)
