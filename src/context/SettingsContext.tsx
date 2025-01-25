import { createContext, useContext, useState } from 'react'

export type SkinColor = '1' | '2' | '3' | '4' | '5'
export type PlayerGender = 'MAN' | 'WOMAN' | 'OTHER_OR_NONE'
type VoiceTone = 'HIGH' | 'LOW'

const settingsContext = createContext<{
	isNameSet: boolean
	setIsNameSet: React.Dispatch<React.SetStateAction<boolean>>
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
	skinColor: SkinColor
	setSkinColor: React.Dispatch<React.SetStateAction<SkinColor>>
	playerGender: PlayerGender
	setPlayerGender: React.Dispatch<React.SetStateAction<PlayerGender>>
	voiceTone: VoiceTone
	setVoiceTone: React.Dispatch<React.SetStateAction<VoiceTone>>
}>({
	isNameSet: false,
	setIsNameSet: () => {},
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
	const [isNameSet, setIsNameSet] = useState(false)
	const [username, setUsername] = useState('')
	const [skinColor, setSkinColor] = useState<SkinColor>('3')
	const [playerGender, setPlayerGender] =
		useState<PlayerGender>('OTHER_OR_NONE')
	const [voiceTone, setVoiceTone] = useState<VoiceTone>('LOW')

	return (
		<settingsContext.Provider
			value={{
				isNameSet,
				setIsNameSet,
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
