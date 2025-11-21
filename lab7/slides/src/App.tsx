import {useState} from 'react'
import {CommandInput} from './components/CommandInput'
import {SlideWindow} from './components/SlideWindow'
import {Slide} from './Slide'

function App() {
	const [slide, setSlide] = useState<Slide>(new Slide())

	const handleSlideUpdate = (newSlide: Slide): void => {
		setSlide(newSlide)
	}

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100vh',
			fontFamily: 'Arial, sans-serif',
		}}>
			<div style={{
				padding: '20px',
				backgroundColor: '#f0f0f0',
				borderBottom: '1px solid #ccc',
			}}>
				<h1 style={{margin: 0}}>
					{'Редактор слайдов'}
				</h1>
			</div>
			<div style={{
				display: 'flex',
				flex: 1,
				overflow: 'hidden',
			}}>
				<div style={{
					width: '400px',
					borderRight: '1px solid #ccc',
					overflow: 'auto',
				}}>
					<CommandInput slide={slide} onSlideUpdate={handleSlideUpdate} />
				</div>
				<div style={{
					flex: 1,
					overflow: 'auto',
				}}>
					<SlideWindow slide={slide} />
				</div>
			</div>
		</div>
	)
}

export {
	App,
}
