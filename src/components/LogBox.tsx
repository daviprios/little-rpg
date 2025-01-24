export function LogBox({ logs }: { logs: React.ReactNode[] }) {
	return (
		<div>
			{logs.map((log, i) => {
				return <p key={i}>{log}</p>
			})}
		</div>
	)
}
