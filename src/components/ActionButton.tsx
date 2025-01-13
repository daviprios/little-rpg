import React from 'react'

export function ActionButton({
	action,
	disabled,
	children
}: {
	disabled: boolean
	action: () => void
	children: React.ReactNode
}) {
	return (
		<button
			className='border-2 p-2 w-full rounded-sm disabled:bg-slate-500 disabled:active:bg-slate-500 disabled:cursor-not-allowed hover:bg-slate-700 active:bg-slate-600'
			disabled={disabled}
			onClick={action}
		>
			{children}
		</button>
	)
}
