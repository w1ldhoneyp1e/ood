import React, {useEffect, useRef} from 'react'
import {HTMLCanvas} from '../canvas/HTMLCanvas'
import {type Slide} from '../Slide'

interface SlideWindowProps {
	slide: Slide,
}

export function SlideWindow({slide}: SlideWindowProps): React.JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (!canvasRef.current) {
			return
		}

		const canvas = canvasRef.current
		canvas.width = 800
		canvas.height = 600

		const ctx = canvas.getContext('2d')
		if (!ctx) {
			return
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = '#ffffff'
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		const htmlCanvas = new HTMLCanvas(canvas)
		slide.draw(htmlCanvas)
	}, [slide])

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#e9ecef',
			padding: '20px',
		}}>
			<div style={{
				backgroundColor: 'white',
				padding: '20px',
				borderRadius: '8px',
				boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
			}}>
				<h2 style={{
					marginTop: 0,
					textAlign: 'center',
				}}>
					{'Предварительный просмотр'}
				</h2>
				<canvas
					ref={canvasRef}
					style={{
						border: '1px solid #ccc',
						display: 'block',
					}}
				/>
			</div>
		</div>
	)
}

