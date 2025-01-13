import { createContext, useContext, useState } from 'react'

const settingsContext = createContext<{
	isNameSet: boolean
	setIsNameSet: React.Dispatch<React.SetStateAction<boolean>>
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
}>({
	isNameSet: false,
	setIsNameSet: () => {},
	username: '',
	setUsername: () => {}
})

// eslint-disable-next-line react-refresh/only-export-components
export const useSettingsContext = () => useContext(settingsContext)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const [isNameSet, setIsNameSet] = useState(false)
	const [username, setUsername] = useState('')

	return (
		<settingsContext.Provider
			value={{
				isNameSet,
				setIsNameSet,
				username,
				setUsername
			}}
		>
			{children}
		</settingsContext.Provider>
	)
}
