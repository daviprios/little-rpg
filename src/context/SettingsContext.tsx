import { createContext, useContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

export type SkinColor = '1' | '2' | '3' | '4' | '5'
export type PlayerGender = 'MAN' | 'WOMAN' | 'OTHER_OR_NONE'
type VoiceTone = 'HIGH' | 'LOW'

const settingsContext = createContext<{
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
	skinColor: SkinColor
	setSkinColor: React.Dispatch<React.SetStateAction<SkinColor>>
	playerGender: PlayerGender
	setPlayerGender: React.Dispatch<React.SetStateAction<PlayerGender>>
	voiceTone: VoiceTone
	setVoiceTone: React.Dispatch<React.SetStateAction<VoiceTone>>
}>({
	username: '',
	setUsername: () => {},
	skinColor: '3',
	setSkinColor: () => {},
	playerGender: 'OTHER_OR_NONE',
	setPlayerGender: () => {},
	voiceTone: 'LOW',
	setVoiceTone: () => {}
})

// eslint-disable-next-line react-refresh/only-export-components
export const useSettingsContext = () => useContext(settingsContext)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const [username, setUsername] = useLocalStorageState('playerusername', '')
	const [skinColor, setSkinColor] = useLocalStorageState<SkinColor>(
		'skintone',
		'3'
	)
	const [playerGender, setPlayerGender] = useLocalStorageState<PlayerGender>(
		'playergender',
		'OTHER_OR_NONE'
	)
	const [voiceTone, setVoiceTone] = useLocalStorageState<VoiceTone>(
		'voicetone',
		'LOW'
	)

	return (
		<settingsContext.Provider
			value={{
				username,
				setUsername,
				skinColor,
				setSkinColor,
				playerGender,
				setPlayerGender,
				voiceTone,
				setVoiceTone
			}}
		>
			{children}
		</settingsContext.Provider>
	)
}
