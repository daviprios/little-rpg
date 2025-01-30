import { useTranslation } from 'react-i18next'
import BrazilFlagIcon from '../assets/icons/flags/brazil-flag.svg?react'
import USAFlagIcon from '../assets/icons/flags/usa-flag.svg?react'

export default function LanguageChanger() {
	const { i18n } = useTranslation()

	return (
		<div className='px-2 py-1 flex gap-2 border-2 border-slate-600 rounded-md m-2 h-fit'>
			<button
				className={`cursor-pointer ${
					i18n.language === 'pt' ? '' : 'grayscale-100'
				}`}
				onClick={() => i18n.changeLanguage('pt')}
			>
				<BrazilFlagIcon />
			</button>
			<button
				className={`cursor-pointer ${
					i18n.language === 'en' ? '' : 'grayscale-100'
				}`}
				onClick={() => i18n.changeLanguage('en')}
			>
				<USAFlagIcon />
			</button>
		</div>
	)
}
