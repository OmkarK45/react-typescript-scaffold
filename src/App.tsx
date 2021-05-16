import { useState } from 'react'

export default function App() {
	const [count, setCount] = useState(0)
	return (
		<>
			<h1>React 17 | Typescript | Webpack 5</h1>
			<h1>{count}</h1>
			<button className="bg-green-700" onClick={() => setCount((count) => count + 1)}>
				Increase
			</button>
		</>
	)
}
