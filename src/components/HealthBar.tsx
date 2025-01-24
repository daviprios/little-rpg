import { useEffect, useState } from 'react'
import { Character } from '../types/Character'

type LastHealthModification = 'NEUTRAL' | 'INCREASE' | 'DECREASE'

export function HealthBar({ health, maxHealth }: Character) {
	const [lastHealthState, setLastHealthState] =
		useState<Character['health']>(health)
	const [lastHealthModification, setLastHealthModification] =
		useState<LastHealthModification>('NEUTRAL')

	useEffect(() => {
		if (health === lastHealthState) {
			setLastHealthModification('NEUTRAL')
		} else if (health > lastHealthState) {
			setLastHealthModification('INCREASE')
		} else if (health < lastHealthState) {
			setLastHealthModification('DECREASE')
		}
		setLastHealthState(health)
	}, [health])

	useEffect(() => {
		if (lastHealthModification === 'NEUTRAL') return

		const timeout = setTimeout(() => {
			setLastHealthModification('NEUTRAL')
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
	}, [lastHealthModification])

	const animation =
		lastHealthModification === 'NEUTRAL'
			? ''
			: lastHealthModification === 'INCREASE'
			? ''
			: 'motion-safe:animate-wiggle'

	return (
		<div className='bg-red-300 relative'>
			<div
				className={`bg-green-600 text-transparent select-none rounded-xs flex justify-center items-center motion-safe:transition-[width] duration-300 ${animation}`}
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
