import { useLeaderboardContext } from '../context/LeaderboardContext'

export default function Leaderboard() {
	const { leaderboard } = useLeaderboardContext()

	return (
		<div>
			<div>
				<table>
					<thead>
						<tr>
							<th className='text-left'>Emoji</th>
							<th className='text-left'>Nome</th>
							<th className='text-left'>Vida</th>
						</tr>
					</thead>
					<tbody>
						{leaderboard.slice(0, 5).map(({ createdAt, player }) => {
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
