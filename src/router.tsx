import { useNavigationContext } from './context/NavigationContext'
import Game from './views/Game'
import Leaderboard from './views/Leaderboard'
import MainMenu from './views/MainMenu'

export function Router() {
	const { navigationView } = useNavigationContext()

	switch (navigationView) {
		case 'MENU':
			return <MainMenu />
		case 'GAME':
			return <Game />
		case 'LEADERBOARD':
			return <Leaderboard />
	}
}
