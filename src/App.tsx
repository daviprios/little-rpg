import Game from './views/Game'
import { useSettingsContext } from './context/SettingsContext'
import MainMenu from './views/MainMenu'

export default function App() {
	const { isNameSet } = useSettingsContext()

	return (
		<div className='h-full w-full bg-slate-900 text-slate-100 font-mono'>
			<div className='h-full w-full flex justify-center items-center'>
				{isNameSet ? <Game /> : <MainMenu />}
			</div>
		</div>
	)
}
