import { Log } from '@/types/Log'
import { Trans, useTranslation } from 'react-i18next'
import { DRAGON_EMOJI, PAW_EMOJI, SWORD_EMOJI } from '../constants/emoji'

function LogTranslation({
	log,
	characterEmoji
}: {
	log: Log
	characterEmoji: string
}) {
	const { t } = useTranslation()

	switch (log.type) {
		case 'PLAYER_ATTACK':
			return (
				<Trans
					t={t}
					i18nKey={log.isCrited ? 'game.logs.attackCrited' : 'game.logs.attack'}
					values={{
						attackerEmoji: characterEmoji,
						totalDamage: log.value,
						damageEmoji: SWORD_EMOJI
					}}
					components={{ color: <span className='text-red-500' /> }}
				/>
			)
		case 'PLAYER_HEAL':
			return (
				<Trans
					t={t}
					i18nKey={log.isCrited ? 'game.logs.healCrited' : 'game.logs.heal'}
					values={{
						healerEmoji: characterEmoji,
						totalHeal: log.value
					}}
					components={{ color: <span className='text-green-500' /> }}
				/>
			)
		case 'PLAYER_FIREBALL':
			return (
				<Trans
					t={t}
					i18nKey={
						log.isCrited ? 'game.logs.fireballCrited' : 'game.logs.fireball'
					}
					values={{
						fireballerEmoji: characterEmoji,
						totalFireballDamage: log.value
					}}
					components={{ color: <span className='text-orange-500' /> }}
				/>
			)
		case 'DRAGON_ATTACK':
			return (
				<Trans
					t={t}
					i18nKey={log.isCrited ? 'game.logs.attackCrited' : 'game.logs.attack'}
					values={{
						attackerEmoji: DRAGON_EMOJI,
						totalDamage: log.value,
						damageEmoji: PAW_EMOJI
					}}
					components={{ color: <span className='text-red-500' /> }}
				/>
			)
		case 'DRAGON_HEAL':
			return (
				<Trans
					t={t}
					i18nKey={log.isCrited ? 'game.logs.healCrited' : 'game.logs.heal'}
					values={{
						healerEmoji: DRAGON_EMOJI,
						totalHeal: log.value
					}}
					components={{ color: <span className='text-green-500' /> }}
				/>
			)
		case 'DRAGON_FIREBALL':
			return (
				<Trans
					t={t}
					i18nKey={
						log.isCrited ? 'game.logs.fireballCrited' : 'game.logs.fireball'
					}
					values={{
						fireballerEmoji: DRAGON_EMOJI,
						totalFireballDamage: log.value
					}}
					components={{ color: <span className='text-orange-500' /> }}
				/>
			)
		case 'COWARD':
			return t('game.logs.coward')
		case 'FUCK_YOU':
			return (
				<Trans
					t={t}
					i18nKey={'game.logs.fuckYou'}
					values={{
						actorEmoji: DRAGON_EMOJI
					}}
				/>
			)
		case 'PLAYER_WIN':
			return (
				<Trans
					t={t}
					i18nKey={'game.logs.youWon'}
					values={{
						playerEmoji: characterEmoji
					}}
				/>
			)
		case 'PLAYER_LOSE':
			return (
				<Trans
					t={t}
					i18nKey={'game.logs.youDied'}
					values={{
						playerEmoji: characterEmoji
					}}
				/>
			)
		default:
			return ''
	}
}

export function LogBox({
	logs,
	characterEmoji
}: {
	logs: Log[]
	characterEmoji: string
}) {
	return (
		<div>
			{logs.map((log, i) => {
				return (
					<p key={i}>
						<LogTranslation
							log={log}
							characterEmoji={characterEmoji}
						/>
					</p>
				)
			})}
		</div>
	)
}
