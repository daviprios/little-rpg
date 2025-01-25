export function storeData<T>(key: string, value: T) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (e) {
		console.error('CANNOT STORE LOCAL STORAGE STATE', e)
	}
}
export function getData(key: string) {
	try {
		return JSON.parse(localStorage.getItem(key) ?? '')
	} catch (e) {
		console.error(e)
		return ''
	}
}
