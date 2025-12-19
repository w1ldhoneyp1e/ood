import {useEffect} from 'react'

function useCanvasResize(
	ensureCanvasSize: () => void,
	handleKeyDown: (event: KeyboardEvent) => void,
) {
	useEffect(() => {
		ensureCanvasSize()
		window.addEventListener('resize', ensureCanvasSize)
		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('resize', ensureCanvasSize)
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [ensureCanvasSize, handleKeyDown])
}

function useCanvasDraw(
	draw: () => void,
	state: unknown,
) {
	useEffect(() => {
		draw()
	}, [draw, state])
}

export {
	useCanvasDraw,
	useCanvasResize,
}

