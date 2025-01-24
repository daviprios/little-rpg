import { useState } from 'react'
import { useSettingsContext } from '../context/SettingsContext'

export default function MainMenu() {
	const { setIsNameSet, setUsername, username } = useSettingsContext()
	const [inputWidth, setInputWidth] = useState('')

	return (
		<div className='flex flex-col gap-2 items-center'>
			<p>Little RPG</p>
			<input
				className='text-slate-950 py-1 px-2 rounded-md min-w-40 bg-slate-100'
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
			<button
				className='py-2 px-4 bg-slate-600 rounded-md hover:bg-slate-500 cursor-pointer'
				onClick={() => {
					if (!username) setUsername('Um otário sem nome')
					setIsNameSet(true)
				}}
			>
				Confirmar
			</button>
		</div>
	)
}
