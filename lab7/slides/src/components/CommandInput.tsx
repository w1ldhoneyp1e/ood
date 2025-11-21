import {useState} from 'react'
import {Slide} from '../Slide'
import {CommandParser} from '../utils/CommandParser'

interface CommandInputProps {
	slide: Slide,
	onSlideUpdate: (slide: Slide) => void,
}

function CommandInput({
	slide,
	onSlideUpdate,
}: CommandInputProps) {
	const [command, setCommand] = useState('')

	const handleCommand = (): void => {
		if (!command.trim()) {
			return
		}

		try {
			const parser = new CommandParser()
			const newSlide = parser.parseCommand(command, slide)
			setCommand('')
			onSlideUpdate(newSlide)
		}
		catch (error) {
			console.log(`Ошибка: ${error instanceof Error
                ? error.message
                : String(error)}`)
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault()
			handleCommand()
		}
	}

	const clearSlide = (): void => {
		const newSlide = new Slide()
		onSlideUpdate(newSlide)
	}

	return (
		<div style={{padding: '20px'}}>
			<h2 style={{marginTop: 0}}>{'Команды'}</h2>
			<div style={{marginBottom: '10px'}}>
				<textarea
					value={command}
					onChange={e => setCommand(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Введите команду (Ctrl+Enter для выполнения)"
					style={{
						width: '100%',
						minHeight: '100px',
						padding: '8px',
						fontFamily: 'monospace',
						fontSize: '14px',
						border: '1px solid #ccc',
						borderRadius: '4px',
						resize: 'vertical',
					}}
				/>
			</div>
			<div style={{marginBottom: '20px'}}>
				<button
					onClick={handleCommand}
					style={{
						padding: '8px 16px',
						backgroundColor: '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						marginRight: '10px',
					}}
				>
					{'Выполнить'}
				</button>
				<button
					onClick={clearSlide}
					style={{
						padding: '8px 16px',
						backgroundColor: '#dc3545',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					{'Очистить'}
				</button>
			</div>
		</div>
	)
}

export {
	CommandInput,
}
