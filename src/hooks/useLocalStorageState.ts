import { useCallback, useEffect, useState } from 'react'
import { storeData, getData } from '../util/localStorageManagement'

export function useLocalStorageState<T>(key: string, initialState: T) {
	const [state, setState] = useState<T>((getData(key) || initialState) as T)

	useEffect(() => {
		storeData(key, state)
	}, [])

	const setLocalStorageState = useCallback(
		(value: React.SetStateAction<T>) => {
			storeData(
				key,
				typeof value === 'function'
					? (value as (prevState: T) => T)(state)
					: value
			)
			setState(value)
		},
		[state]
	)

	return [state, setLocalStorageState] as const
}
