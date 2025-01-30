import { useTranslation } from 'react-i18next'
import { useLeaderboardContext } from '../context/LeaderboardContext'

export default function Leaderboard() {
	const { t } = useTranslation()

	const { leaderboard } = useLeaderboardContext()

	return (
		<div>
			<div>
				<table>
					<thead>
						<tr>
							<th className='text-left min-w-16'>
								{t('leaderboard.table.columns.emoji')}
							</th>
							<th className='text-left min-w-60'>
								{t('leaderboard.table.columns.name')}
							</th>
							<th className='text-left min-w-16'>
								{t('leaderboard.table.columns.health')}
							</th>
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
