import { useLeaderboardContext } from '../context/LeaderboardContext'

export default function Leaderboard() {
	const { leaderboard } = useLeaderboardContext()

	return (
		<div>
			<div>
				<table>
					<thead>
						<tr>
							<th className='text-left min-w-16'>Emoji</th>
							<th className='text-left min-w-60'>Nome</th>
							<th className='text-left min-w-16'>Vida</th>
						</tr>
					</thead>
					<tbody>
						{leaderboard.map(({ createdAt, player }) => {
							return (
								<tr key={createdAt}>
									<td>{player.emoji}</td>
									<td>{player.name}</td>
									<td>{player.health}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
