export type Log =
	| {
			value: number
			isCrited: boolean
			type:
				| 'PLAYER_ATTACK'
				| 'PLAYER_HEAL'
				| 'PLAYER_FIREBALL'
				| 'DRAGON_ATTACK'
				| 'DRAGON_HEAL'
				| 'DRAGON_FIREBALL'
	  }
	| {
			type: 'COWARD' | 'FUCK_YOU' | 'PLAYER_WIN' | 'PLAYER_LOSE'
	  }
