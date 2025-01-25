import { useState } from 'react'
import {
	PlayerGender,
	SkinColor,
	useSettingsContext
} from '../context/SettingsContext'
import { getCharacterEmoji } from '../util/getCharacterEmoji'
import {
	GENDER_MAN_STRING,
	GENDER_WOMAN_STRING
} from '../constants/genderString'
import { useNavigationContext } from '../context/NavigationContext'
import { useLeaderboardContext } from '../context/LeaderboardContext'

export default function MainMenu() {
	const {
		setUsername,
		username,
		skinColor,
		setSkinColor,
		playerGender,
		setPlayerGender
	} = useSettingsContext()

	const { setNavigationView } = useNavigationContext()
	const { leaderboard } = useLeaderboardContext()

	const [inputWidth, setInputWidth] = useState('')

	return (
		<div className='flex flex-col items-center gap-8'>
			<h1 className='font-bold text-4xl underline'>Little RPG</h1>
			<section className='flex flex-col gap-2 items-center'>
				<h2 className='font-bold text-2xl underline'>Iniciar jogo</h2>
				<div className='flex items-center gap-2'>
					<label className='text-center'>
						<span className='font-bold'>Tom de pele</span>
						<div className='flex items-center gap-2'>
							<span>Claro</span>
							<input
								type='range'
								min={1}
								max={5}
								step={1}
								value={+skinColor}
								onChange={(e) =>
									setSkinColor(e.currentTarget.value.toString() as SkinColor)
								}
								className='bg-slate-100 text-slate-950 py-1 px-2 rounded-md'
							/>
							<span>Escuro</span>
						</div>
					</label>
				</div>
				<div className='flex flex-col'>
					<p className='text-center font-bold'>Gênero</p>
					<div className='flex gap-6'>
						<label className='flex items-center'>
							<span className='mr-1'>{GENDER_MAN_STRING}Homem</span>
							<input
								type='radio'
								value={'MAN' satisfies PlayerGender}
								checked={playerGender === 'MAN'}
								onChange={(e) =>
									setPlayerGender(e.currentTarget.value as PlayerGender)
								}
							/>
						</label>
						<label className='flex items-center'>
							<span className='mr-1'>{GENDER_WOMAN_STRING}Mulher</span>
							<input
								type='radio'
								value={'WOMAN' satisfies PlayerGender}
								checked={playerGender === 'WOMAN'}
								onChange={(e) =>
									setPlayerGender(e.currentTarget.value as PlayerGender)
								}
							/>
						</label>
						<label className='flex items-center'>
							<span className='mr-1'>Nenhum/Outro</span>
							<input
								type='radio'
								value={'OTHER_OR_NONE' satisfies PlayerGender}
								checked={playerGender === 'OTHER_OR_NONE'}
								onChange={(e) =>
									setPlayerGender(e.currentTarget.value as PlayerGender)
								}
							/>
						</label>
					</div>
				</div>
				<div className='flex justify-center'>
					<label className='text-center'>
						<span className='font-bold'>Nome</span>
						<input
							className='text-slate-950 py-1 px-2 rounded-md min-w-40 bg-slate-100 block'
							placeholder='Digite seu nome'
							id='username'
							value={username}
							onChange={(e) => {
								setUsername(e.currentTarget.value)
								setInputWidth(`${e.currentTarget.value.length + 4}ch`)
							}}
							maxLength={40}
							style={{
								width: inputWidth
							}}
						/>
					</label>
				</div>

				<div className='mt-6'>
					<span className='text-5xl'>
						{getCharacterEmoji({
							playerGender,
							skinColor
						})}
					</span>
				</div>
				<button
					className='py-2 px-4 bg-slate-600 rounded-md hover:bg-slate-500 cursor-pointer'
					onClick={() => {
						if (!username) setUsername('Um otário sem nome')
						setNavigationView('GAME')
					}}
				>
					Confirmar
				</button>
			</section>
			<section className='flex flex-col gap-2 items-center'>
				<h2 className='font-bold text-2xl underline'>Tabela de recordes</h2>
				<div className='flex flex-col'>
					<table>
						<thead>
							<tr>
								<th className='text-left min-w-16'>Emoji</th>
								<th className='text-left min-w-60'>Nome</th>
								<th className='text-left min-w-16'>Vida</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.length === 0 ? (
								<tr>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
							) : (
								leaderboard.slice(0, 5).map(({ createdAt, player }) => {
									return (
										<tr key={createdAt}>
											<td>{player.emoji}</td>
											<td>{player.name}</td>
											<td>{player.health}</td>
										</tr>
									)
								})
							)}
						</tbody>
					</table>
					{leaderboard.length > 5 && (
						<button
							className='py-2 px-4 bg-slate-600 rounded-md hover:bg-slate-500 cursor-pointer mt-4'
							onClick={() => setNavigationView('LEADERBOARD')}
						>
							Ver tabela completa
						</button>
					)}
				</div>
			</section>
		</div>
	)
}
