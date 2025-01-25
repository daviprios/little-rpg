import { Router } from './router'

export default function App() {
	return (
		<main className='h-full w-full bg-slate-900 text-slate-100 font-mono'>
			<div className='h-full w-full flex justify-center overflow-y-auto overflow-x-clip pt-8'>
				<Router />
			</div>
		</main>
	)
}
