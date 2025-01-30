/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { resources } from './i18n/resources'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation'
		resources: (typeof resources)['pt']
	}
}
