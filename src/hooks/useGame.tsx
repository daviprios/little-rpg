import React, { useState, useRef, useEffect } from 'react'
import { Character } from '../types/Character'

export function useGame({ playerUsername }: { playerUsername: string }) {
	const [player, setPlayer] = useState<Character>({
		health: 50,
		maxHealth: 50,
		name: playerUsername,
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

	const [logs, setLogs] = useState<React.ReactNode[]>([])

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
	}, [logs])

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
				<>
					🧙 {hasPlayerCrited ? 'critou💥' : 'causou'}{' '}
					<span className='text-red-400'>{totalDamage}</span> de dano⚔️
				</>
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
				<>
					🧙 {hasPlayerCrited ? 'critou💥' : 'curou'}{' '}
					<span className='text-green-400'>{totalHeal}</span> de vida💚
				</>
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
				<>
					🧙 {hasPlayerCrited ? 'critou💥' : 'causou'}{' '}
					<span className='text-orange-400'>{totalFireballDamage}</span> de bola
					de fogo🔥
				</>
			])
		} else if (type === 'SURRENDER') {
			setHasPlayerTriedToSurrender(true)
			setLogs((prev) => [...prev, `❌ Proibido covardes ❌`])
		}
	}

	function dragonAction() {
		const actionValue = Math.random() * 100

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
				<>
					🐉 {hasDragonCrited ? 'critou💥' : 'causou'}{' '}
					<span className='text-red-400'>{totalDamage}</span> de dano🐾
				</>
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
				<>
					🐉 {hasDragonCrited ? 'critou💥' : 'curou'}{' '}
					<span className='text-green-400'>{totalHeal}</span> de vida💚
				</>
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
				<>
					🐉 {hasDragonCrited ? 'critou💥' : 'curou'}{' '}
					<span className='text-orange-400'>{totalFireballDamage}</span> de bola
					de fogo🔥
				</>
			])
		} else if (type === 'FUCK_YOU') {
			setLogs((prev) => [
				...prev,
				`🖕🖕🖕 🐉 decidiu que você deveria 💀 🖕🖕🖕`
			])
		}
	}

	function checkEndGame() {
		if (player.health === 0) {
			setIsGameEnd(true)
			setLogs((prev) => [...prev, '💀💀💀🧙💀💀💀'])
		} else if (dragon.health === 0) {
			setIsGameEnd(true)
			setLogs((prev) => [...prev, '🧙 venceu!'])
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

	return {
		player,
		dragon,
		playerActions,
		isPlayerTurn,
		isGameEnd,
		hasPlayerTriedToSurrender,
		logs,
		logsBoxRef
	}
}
