import LanguageChanger from './components/LanguageChanger'
import { Router } from './router'

export default function App() {
	return (
		<main className='h-full w-full bg-slate-900 text-slate-100 font-mono'>
			<div className='h-full w-full flex justify-center overflow-y-auto overflow-x-clip pt-8 relative'>
				<div className='absolute top-0 right-0'>
					<LanguageChanger />
				</div>
				<Router />
			</div>
		</main>
	)
}
