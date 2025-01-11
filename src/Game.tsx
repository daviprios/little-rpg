import { useEffect, useRef, useState } from 'react'

type Character = {
	health: number
	maxHealth: number
	name: string
	baseDamage: number
	randomDamage: number
	baseHeal: number
	randomHeal: number
	healCount: number
	fireballBaseDamage: number
	fireballRandomDamage: number
	fireballCount: number
	critChance: number
	critFactor: number
}

function HealthBar({ health, maxHealth }: Character) {
	return (
		<div className='bg-red-300 relative'>
			<div
				className={`bg-green-600 text-transparent select-none rounded-sm flex justify-center items-center`}
				style={{
					width: `${(health * 100) / maxHealth}%`
				}}
			>
				_
			</div>
			<span className='text-green-950 font-bold absolute top-0 left-1/2 -translate-x-1/2'>
				{health} / {maxHealth}
			</span>
		</div>
	)
}

function CharacterName({ name }: { name: string }) {
	return <p className='font-bold'>{name}</p>
}

function LogBox({ logs }: { logs: string[] }) {
	return (
		<div>
			{logs.map((log, i) => {
				return <p key={i}>{log}</p>
			})}
		</div>
	)
}

export default function Game({ username }: { username: string }) {
	const [player, setPlayer] = useState<Character>({
		health: 50,
		maxHealth: 50,
		name: username,
		baseDamage: 10,
		randomDamage: 5,
		baseHeal: 15,
		randomHeal: 50,
		healCount: 3,
		fireballCount: 3,
		fireballBaseDamage: 50,
		fireballRandomDamage: 50,
		critChance: 50,
		critFactor: 5
	})

	const [dragon, setDragon] = useState<Character>({
		health: 300,
		maxHealth: 300,
		name: 'Dragão',
		baseDamage: 2,
		randomDamage: 0,
		baseHeal: 30,
		randomHeal: 10,
		healCount: 9999,
		fireballBaseDamage: 5,
		fireballRandomDamage: 0,
		fireballCount: 9999,
		critChance: 300,
		critFactor: 10000
	})

	const [logs, setLogs] = useState<string[]>([])

	const [isGameEnd, setIsGameEnd] = useState(false)
	const [isPlayerTurn, setIsPlayerTurn] = useState(true)
	const [hasPlayerTriedToSurrender, setHasPlayerTriedToSurrender] =
		useState(false)

	const logsBoxRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!logsBoxRef.current) return
		logsBoxRef.current.scrollTo({
			top: logsBoxRef.current.scrollHeight,
			behavior: 'instant'
		})
	}, [logs, logsBoxRef.current])

	function playerActions({
		type
	}: {
		type: 'ATTACK' | 'HEAL' | 'FIREBALL' | 'SURRENDER'
	}) {
		if (!isPlayerTurn) return
		setIsPlayerTurn(false)

		const hasPlayerCrited = Math.trunc(Math.random() * player.critChance) === 0
		if (type === 'ATTACK') {
			const damage = Math.trunc(
				Math.random() * player.randomDamage + player.baseDamage
			)
			const totalDamage = hasPlayerCrited ? damage * player.critFactor : damage

			setDragon((prev) => {
				if (prev.health - totalDamage < 0) prev.health = 0
				else prev.health -= totalDamage

				return { ...prev }
			})

			setLogs((prev) => [
				...prev,
				`O jogador ${
					hasPlayerCrited ? 'critou' : 'causou'
				} ${totalDamage} de dano`
			])
		} else if (type === 'HEAL') {
			const heal = Math.trunc(
				Math.random() * player.randomHeal + player.baseHeal
			)
			const totalHeal = hasPlayerCrited ? heal * player.critFactor : heal

			setPlayer((prev) => {
				if (prev.health + totalHeal > prev.maxHealth)
					prev.health = prev.maxHealth
				else prev.health += totalHeal

				prev.healCount -= 1

				return { ...prev }
			})

			setLogs((prev) => [
				...prev,
				`O jogador ${hasPlayerCrited ? 'critou' : 'curou'} ${totalHeal} de vida`
			])
		} else if (type === 'FIREBALL') {
			const fireballDamage = Math.trunc(
				Math.random() * player.fireballRandomDamage + player.fireballBaseDamage
			)
			const totalFireballDamage = hasPlayerCrited
				? fireballDamage * player.critFactor
				: fireballDamage

			setPlayer((prev) => {
				prev.fireballCount -= 1
				prev.randomDamage += 30

				return { ...prev }
			})

			setDragon((prev) => {
				if (prev.health - totalFireballDamage < 0) prev.health = 0
				else prev.health -= totalFireballDamage

				prev.fireballBaseDamage += 5
				prev.fireballRandomDamage += 10
				prev.baseDamage += 5
				prev.randomDamage += 10

				return { ...prev }
			})

			setLogs((prev) => [
				...prev,
				`O jogador ${
					hasPlayerCrited ? 'critou' : 'causou'
				} ${totalFireballDamage} de bola de fogo`
			])
		} else if (type === 'SURRENDER') {
			setHasPlayerTriedToSurrender(true)
			setLogs((prev) => [...prev, `Proibido covardes`])
		}
	}

	function dragonAction() {
		const actionValue = Math.random() * 100
		console.debug(actionValue)
		const type: 'ATTACK' | 'HEAL' | 'FIREBALL' | 'FUCK_YOU' =
			actionValue < 70
				? 'ATTACK'
				: actionValue < 95
				? 'FIREBALL'
				: actionValue < 99.9
				? 'HEAL'
				: 'FUCK_YOU'

		const hasDragonCrited = Math.trunc(Math.random() * dragon.critChance) === 0
		if (type === 'ATTACK') {
			const damage = Math.trunc(
				Math.random() * dragon.randomDamage + dragon.baseDamage
			)
			const totalDamage = hasDragonCrited ? damage * dragon.critFactor : damage

			setPlayer((prev) => {
				if (prev.health - totalDamage < 0) prev.health = 0
				else prev.health -= totalDamage

				return { ...prev }
			})

			setLogs((prev) => [
				...prev,
				`O dragão ${
					hasDragonCrited ? 'critou' : 'causou'
				} ${totalDamage} de dano`
			])
		} else if (type === 'HEAL') {
			const heal = Math.trunc(
				Math.random() * dragon.randomHeal + dragon.baseHeal
			)
			const totalHeal = hasDragonCrited ? heal * dragon.critFactor : heal

			setDragon((prev) => {
				if (prev.health + totalHeal > prev.maxHealth)
					prev.health = prev.maxHealth
				else prev.health += totalHeal

				return { ...prev }
			})

			setLogs((prev) => [
				...prev,
				`O dragão ${hasDragonCrited ? 'critou' : 'curou'} ${totalHeal} de vida`
			])
		} else if (type === 'FIREBALL') {
			const fireballDamage = Math.trunc(
				Math.random() * dragon.fireballRandomDamage + dragon.fireballBaseDamage
			)
			const totalFireballDamage = hasDragonCrited
				? fireballDamage * dragon.critFactor
				: fireballDamage

			setDragon((prev) => {
				prev.fireballCount -= 1

				return { ...prev }
			})

			setPlayer((prev) => {
				if (prev.health - totalFireballDamage < 0) prev.health = 0
				else prev.health -= totalFireballDamage

				return { ...prev }
			})

			setLogs((prev) => [
				...prev,
				`O dragão ${
					hasDragonCrited ? 'critou' : 'causou'
				} ${totalFireballDamage} de bola de fogo`
			])
		} else if (type === 'FUCK_YOU') {
			setLogs((prev) => [
				...prev,
				`FUCK YOU: O dragão decidiu que você deveria morrer`
			])
		}
	}

	function checkEndGame() {
		if (player.health === 0) {
			setIsGameEnd(true)
			setLogs((prev) => [...prev, 'O jogador perdeu'])
		} else if (dragon.health === 0) {
			setIsGameEnd(true)
			setLogs((prev) => [...prev, 'O jogador venceu!'])
		}
	}

	useEffect(() => {
		checkEndGame()
	}, [isPlayerTurn])

	useEffect(() => {
		if (isPlayerTurn || isGameEnd) return

		const dragonTimeout = setTimeout(() => {
			dragonAction()
		}, 500)

		const timeout = setTimeout(() => {
			setIsPlayerTurn(true)
		}, 1000)

		return () => {
			clearTimeout(timeout)
			clearTimeout(dragonTimeout)
		}
	}, [isPlayerTurn, isGameEnd])

	return (
		<div className='border-2 border-slate-600 rounded-md w-96 h-96 p-2 flex flex-col justify-between gap-2'>
			<div>
				<HealthBar {...player} />
				<CharacterName name={player.name} />
			</div>
			<div className='grid grid-cols-2 grid-rows-2 gap-2'>
				<button
					className='border-2 p-2 w-full rounded-sm disabled:bg-slate-500 disabled:active:bg-slate-500 disabled:cursor-not-allowed hover:bg-slate-700 active:bg-slate-600'
					disabled={!isPlayerTurn || isGameEnd}
					onClick={() => playerActions({ type: 'ATTACK' })}
				>
					Atacar
				</button>
				<button
					className='border-2 p-2 w-full rounded-sm disabled:bg-slate-500 disabled:active:bg-slate-500 disabled:cursor-not-allowed hover:bg-slate-700 active:bg-slate-600'
					disabled={!isPlayerTurn || isGameEnd || player.fireballCount === 0}
					onClick={() => playerActions({ type: 'FIREBALL' })}
				>
					Bola de fogo ({player.fireballCount})
				</button>
				<button
					className='border-2 p-2 w-full rounded-sm disabled:bg-slate-500 disabled:active:bg-slate-500 disabled:cursor-not-allowed hover:bg-slate-700 active:bg-slate-600'
					disabled={!isPlayerTurn || isGameEnd || player.healCount === 0}
					onClick={() => playerActions({ type: 'HEAL' })}
				>
					Curar ({player.healCount})
				</button>
				<button
					className='border-2 p-2 w-full rounded-sm disabled:bg-slate-500 disabled:active:bg-slate-500 disabled:cursor-not-allowed hover:bg-slate-700 active:bg-slate-600'
					disabled={!isPlayerTurn || isGameEnd || hasPlayerTriedToSurrender}
					onClick={() => playerActions({ type: 'SURRENDER' })}
				>
					Render-se
				</button>
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
	)
}
