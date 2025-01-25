import {
	GENDER_MAN_STRING,
	GENDER_WOMAN_STRING
} from '../constants/genderString'
import { MAGE_PERSON_EMOJI } from '../constants/emoji'
import {
	SKIN_TONE_MODIFIER_EMOJI_DARK,
	SKIN_TONE_MODIFIER_EMOJI_LIGHT,
	SKIN_TONE_MODIFIER_EMOJI_MEDIUM,
	SKIN_TONE_MODIFIER_EMOJI_MEDIUM_DARK,
	SKIN_TONE_MODIFIER_EMOJI_MEDIUM_LIGHT
} from '../constants/skinToneModifierEmoji'
import { ZERO_WIDTH_JOINER_STRING } from '../constants/zeroWidthJoinerString'
import { PlayerGender, SkinColor } from '../context/SettingsContext'

export function getCharacterEmoji({
	playerGender,
	skinColor
}: {
	playerGender: PlayerGender
	skinColor: SkinColor
}) {
	const emojiBuild = [MAGE_PERSON_EMOJI]

	switch (skinColor) {
		case '1':
			emojiBuild.push(SKIN_TONE_MODIFIER_EMOJI_LIGHT)
			break
		case '2':
			emojiBuild.push(SKIN_TONE_MODIFIER_EMOJI_MEDIUM_LIGHT)
			break
		case '3':
			emojiBuild.push(SKIN_TONE_MODIFIER_EMOJI_MEDIUM)
			break
		case '4':
			emojiBuild.push(SKIN_TONE_MODIFIER_EMOJI_MEDIUM_DARK)
			break
		case '5':
			emojiBuild.push(SKIN_TONE_MODIFIER_EMOJI_DARK)
			break
	}

	switch (playerGender) {
		case 'MAN':
			emojiBuild.push(ZERO_WIDTH_JOINER_STRING)
			emojiBuild.push(GENDER_MAN_STRING)
			break
		case 'WOMAN':
			emojiBuild.push(ZERO_WIDTH_JOINER_STRING)
			emojiBuild.push(GENDER_WOMAN_STRING)
			break
		case 'OTHER_OR_NONE':
			break
	}

	return emojiBuild.join('')
}
