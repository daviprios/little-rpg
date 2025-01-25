import { LogBox } from '../components/LogBox'
import { CharacterName } from '../components/CharacterName'
import { HealthBar } from '../components/HealthBar'
import { ActionButton } from '../components/ActionButton'
import { useGame } from '../hooks/useGame'
import { useSettingsContext } from '../context/SettingsContext'
import { getCharacterEmoji } from '../util/getCharacterEmoji'
import { useNavigationContext } from '../context/NavigationContext'

export default function Game() {
	const { setNavigationView } = useNavigationContext()

	const { username, playerGender, skinColor } = useSettingsContext()

	const {
		player,
		dragon,
		hasPlayerTriedToSurrender,
		isGameEnd,
		isPlayerTurn,
		logs,
		logsBoxRef,
		playerActions
	} = useGame({
		playerUsername: username,
		playerGender,
		skinColor
	})

	return (
		<div className='flex flex-col gap-2'>
			<div className='border-2 border-slate-600 rounded-md w-[30rem] h-96 p-2 flex flex-col justify-between gap-2'>
				<div>
					<HealthBar {...player} />
					<CharacterName
						name={`${getCharacterEmoji({
							playerGender,
							skinColor
						})} ${player.name}`}
					/>
				</div>
				<div className='grid grid-cols-2 grid-rows-2 gap-2'>
					<ActionButton
						disabled={!isPlayerTurn || isGameEnd}
						action={() =>
							playerActions({
								type: 'ATTACK'
							})
						}
					>
						Atacar ⚔️
					</ActionButton>
					<ActionButton
						disabled={!isPlayerTurn || isGameEnd || player.fireballCount === 0}
						action={() => playerActions({ type: 'FIREBALL' })}
					>
						Bola de fogo ({player.fireballCount}) 🔥
					</ActionButton>
					<ActionButton
						disabled={!isPlayerTurn || isGameEnd || player.healCount === 0}
						action={() => playerActions({ type: 'HEAL' })}
					>
						Curar ({player.healCount}) 🩹
					</ActionButton>
					<ActionButton
						disabled={!isPlayerTurn || isGameEnd || hasPlayerTriedToSurrender}
						action={() => playerActions({ type: 'SURRENDER' })}
					>
						Render-se 🏳️
					</ActionButton>
				</div>
				<div
					className='overflow-y-auto flex-1 min-h-0'
					ref={logsBoxRef}
				>
					<LogBox logs={logs} />
				</div>
				<div>
					<CharacterName name={dragon.name} />
					<HealthBar {...dragon} />
				</div>
			</div>
			{isGameEnd && (
				<div className='flex'>
					<button
						className='border-2 rounded-md border-slate-600 py-2 px-4 cursor-pointer hover:bg-slate-600 w-full'
						onClick={() => setNavigationView('MENU')}
					>
						Voltar ao menu principal
					</button>
				</div>
			)}
		</div>
	)
}
