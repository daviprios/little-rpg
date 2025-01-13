export function LogBox({ logs }: { logs: string[] }) {
	return (
		<div>
			{logs.map((log, i) => {
				return <p key={i}>{log}</p>
			})}
		</div>
	)
}
