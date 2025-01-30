import { useState, useRef, useEffect } from 'react'
import { Character } from '../types/Character'
import { PlayerGender, SkinColor } from '../context/SettingsContext'
import { getCharacterEmoji } from '../util/getCharacterEmoji'
import { DRAGON_EMOJI } from '../constants/emoji'
import { useLeaderboardContext } from '../context/LeaderboardContext'
import { Log } from '@/types/Log'
import { useTranslation } from 'react-i18next'

export function useGame({
	playerUsername,
	playerGender,
	skinColor
}: {
	playerUsername: string
	playerGender: PlayerGender
	skinColor: SkinColor
}) {
	const { t } = useTranslation()
	const { addScore } = useLeaderboardContext()

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
		critFactor: 5,
		emoji: getCharacterEmoji({
			playerGender,
			skinColor
		})
	})

	const [dragon, setDragon] = useState<Character>({
		health: 300,
		maxHealth: 300,
		name: t('game.dragon'),
		baseDamage: 2,
		randomDamage: 0,
		baseHeal: 30,
		randomHeal: 10,
		healCount: 9999,
		fireballBaseDamage: 5,
		fireballRandomDamage: 0,
		fireballCount: 9999,
		critChance: 300,
		critFactor: 10000,
		emoji: DRAGON_EMOJI
	})

	const [startTime] = useState(Date.now())
	const [logs, setLogs] = useState<Log[]>([])

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
				{
					isCrited: hasPlayerCrited,
					type: 'PLAYER_ATTACK',
					value: totalDamage
				}
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
				{
					isCrited: hasPlayerCrited,
					type: 'PLAYER_HEAL',
					value: totalHeal
				}
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
				{
					isCrited: hasPlayerCrited,
					type: 'PLAYER_FIREBALL',
					value: totalFireballDamage
				}
			])
		} else if (type === 'SURRENDER') {
			setHasPlayerTriedToSurrender(true)
			setLogs((prev) => [
				...prev,
				{
					type: 'COWARD'
				}
			])
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
				{
					isCrited: hasDragonCrited,
					type: 'DRAGON_ATTACK',
					value: totalDamage
				}
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
				{
					isCrited: hasDragonCrited,
					type: 'DRAGON_HEAL',
					value: totalHeal
				}
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
				{
					isCrited: hasDragonCrited,
					type: 'DRAGON_FIREBALL',
					value: totalFireballDamage
				}
			])
		} else if (type === 'FUCK_YOU') {
			setLogs((prev) => [
				...prev,
				{
					type: 'FUCK_YOU'
				}
			])
		}
	}

	function checkEndGame() {
		if (player.health === 0) {
			setIsGameEnd(true)
			addScore({
				player,
				dragon,
				createdAt: Date.now(),
				time: Date.now() - startTime,
				logs
			})
			setLogs((prev) => [
				...prev,
				{
					type: 'PLAYER_LOSE'
				}
			])
		} else if (dragon.health === 0) {
			setIsGameEnd(true)
			addScore({
				player,
				dragon,
				createdAt: Date.now(),
				time: Date.now() - startTime,
				logs
			})
			setLogs((prev) => [...prev, { type: 'PLAYER_WIN' }])
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
