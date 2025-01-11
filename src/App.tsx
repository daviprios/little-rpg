import { useState } from 'react'
import Game from './Game'

export default function App() {
	const [isNameSet, setIsNameSet] = useState(false)
	const [username, setUsername] = useState('')
	const [inputWidth, setInputWidth] = useState('')

	return (
		<div className='h-full w-full bg-slate-900 text-slate-100 font-mono'>
			<div className='h-full w-full flex justify-center items-center'>
				{isNameSet ? (
					<Game username={username} />
				) : (
					<div className='flex flex-col gap-2'>
						<input
							className='text-slate-950 py-1 px-2 rounded-md min-w-40'
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
							className='p-2 bg-slate-600 rounded-md hover:bg-slate-500'
							onClick={() => {
								if (!username) setUsername('Um otário sem nome')
								setIsNameSet(true)
							}}
						>
							Confirmar
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
