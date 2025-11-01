import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type ParsedCommand} from '../parser/CommandParser'
import {DeleteItemCommand} from './DeleteItemCommand'
import {InsertImageCommand} from './InsertImageCommand'
import {InsertParagraphCommand} from './InsertParagraphCommand'
import {ReplaceTextCommand} from './ReplaceTextCommand'
import {ResizeImageCommand} from './ResizeImageCommand'
import {SetTitleCommand} from './SetTitleCommand'

class CommandFactory {
	private document: IDocument

	constructor(document: IDocument) {
		this.document = document
	}

	createCommand(parsed: ParsedCommand): ICommand {
		const {type, args} = parsed

		switch (type.toLowerCase()) {
			case 'insertparagraph':
				return this.createInsertParagraphCommand(args)

			case 'insertimage':
				return this.createInsertImageCommand(args)

			case 'settitle':
				return this.createSetTitleCommand(args)

			case 'replacetext':
				return this.createReplaceTextCommand(args)

			case 'resizeimage':
				return this.createResizeImageCommand(args)

			case 'deleteitem':
				return this.createDeleteItemCommand(args)

			default:
				throw new Error(`Неизвестная команда: ${type}`)
		}
	}

	private createInsertParagraphCommand(args: string[]): ICommand {
		if (args.length < 2) {
			throw new Error('Недостаточно аргументов. Использование: InsertParagraph <позиция>|end <текст>')
		}

		const positionStr = args[0]
		const text = args.slice(1).join(' ')

		const position = positionStr.toLowerCase() === 'end'
			? undefined
			: Number(positionStr)

		if (position !== undefined && isNaN(position)) {
			throw new Error('Позиция должна быть числом или "end"')
		}

		return new InsertParagraphCommand(this.document, text, position ?? this.document.getItemsCount())
	}

	private createInsertImageCommand(args: string[]): ICommand {
		if (args.length < 4) {
			throw new Error('Недостаточно аргументов. Использование: InsertImage <позиция>|end <ширина> <высота> <путь>')
		}

		const positionStr = args[0]
		const width = Number(args[1])
		const height = Number(args[2])
		const path = args[3]

		if (isNaN(width) || isNaN(height)) {
			throw new Error('Ширина и высота должны быть числами')
		}

		const position = positionStr.toLowerCase() === 'end'
			? undefined
			: Number(positionStr)

		if (position !== undefined && isNaN(position)) {
			throw new Error('Позиция должна быть числом или "end"')
		}

		return new InsertImageCommand(this.document, path, width, height, position ?? this.document.getItemsCount())
	}

	private createSetTitleCommand(args: string[]): ICommand {
		if (args.length === 0) {
			throw new Error('Недостаточно аргументов. Использование: SetTitle <заголовок>')
		}

		const title = args.join(' ')
		return new SetTitleCommand(this.document, title)
	}

	private createReplaceTextCommand(args: string[]): ICommand {
		if (args.length < 2) {
			throw new Error('Недостаточно аргументов. Использование: ReplaceText <позиция> <текст>')
		}

		const position = Number(args[0])
		const text = args.slice(1).join(' ')

		if (isNaN(position)) {
			throw new Error('Позиция должна быть числом')
		}

		return new ReplaceTextCommand(this.document, position, text)
	}

	private createResizeImageCommand(args: string[]): ICommand {
		if (args.length < 3) {
			throw new Error('Недостаточно аргументов. Использование: ResizeImage <позиция> <ширина> <высота>')
		}

		const position = Number(args[0])
		const width = Number(args[1])
		const height = Number(args[2])

		if (isNaN(position) || isNaN(width) || isNaN(height)) {
			throw new Error('Позиция, ширина и высота должны быть числами')
		}

		return new ResizeImageCommand(this.document, position, width, height)
	}

	private createDeleteItemCommand(args: string[]): ICommand {
		if (args.length < 1) {
			throw new Error('Недостаточно аргументов. Использование: DeleteItem <позиция>')
		}

		const position = Number(args[0])

		if (isNaN(position)) {
			throw new Error('Позиция должна быть числом')
		}

		return new DeleteItemCommand(this.document, position)
	}
}

export {
	CommandFactory,
}
