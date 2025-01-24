import { Character } from '../types/Character'

export function HealthBar({ health, maxHealth }: Character) {
	return (
		<div className='bg-red-300 relative'>
			<div
				className={`bg-green-600 text-transparent select-none rounded-xs flex justify-center items-center transition-[width] duration-300`}
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
