import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SettingsProvider } from './context/SettingsContext.tsx'
import { NavigationProvider } from './context/NavigationContext.tsx'

createRoot(document.getElementById('root')!).render(
	<NavigationProvider>
		<SettingsProvider>
			<App />
		</SettingsProvider>
	</NavigationProvider>
)
