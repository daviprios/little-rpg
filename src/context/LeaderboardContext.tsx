import { createContext, useContext } from 'react'
import { Character } from '../types/Character'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { Log } from '@/types/Log'

type Leaderboard = {
	player: Character
	dragon: Character
	logs: Log[]
	time: number
	createdAt: number
}

const leaderboardContext = createContext<{
	leaderboard: Leaderboard[]
	addScore: (leaderboard: Leaderboard) => void
}>({
	leaderboard: [],
	addScore: () => {}
})

export const useLeaderboardContext = () => useContext(leaderboardContext)

export function LeaderboardProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [leaderboard, setLeaderboard] = useLocalStorageState<Leaderboard[]>(
		'leaderboard',
		[]
	)

	return (
		<leaderboardContext.Provider
			value={{
				leaderboard,
				addScore(leaderboard: Leaderboard) {
					setLeaderboard((prev) => {
						const newLeaderboard = [...prev, leaderboard].sort(
							(a, b) => b.createdAt - a.createdAt
						)
						return newLeaderboard
					})
				}
			}}
		>
			{children}
		</leaderboardContext.Provider>
	)
}
