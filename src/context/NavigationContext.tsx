import { createContext, useContext, useState } from 'react'

type NavigationView = 'MENU' | 'GAME' | 'LEADERBOARD'

const navigationContext = createContext<{
	navigationView: NavigationView
	setNavigationView: React.Dispatch<React.SetStateAction<NavigationView>>
}>({
	navigationView: 'MENU',
	setNavigationView: () => {}
})

export const useNavigationContext = () => useContext(navigationContext)

export function NavigationProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [navigationView, setNavigationView] = useState<NavigationView>('MENU')

	return (
		<navigationContext.Provider value={{ navigationView, setNavigationView }}>
			{children}
		</navigationContext.Provider>
	)
}
