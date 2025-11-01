import {CommandFactory} from '../commands/CommandFactory'
import {CommandHistory} from '../commands/CommandHistory'
import {type ICommand} from '../interfaces/ICommand'
import {type IDocument} from '../interfaces/IDocument'
import {type ParsedCommand} from '../parser/CommandParser'

class CommandManager {
	private commandHistory: CommandHistory = new CommandHistory()
	private document: IDocument
	private commandFactory: CommandFactory

	constructor(document: IDocument) {
		this.document = document
		this.commandFactory = new CommandFactory(document)
	}

	processCommand(parsed: ParsedCommand): string {
		const {type} = parsed

		switch (type.toLowerCase()) {
			case 'help':
				return this.getHelp()

			case 'list':
				return this.getList()

			case 'undo':
				return this.handleUndo()

			case 'redo':
				return this.handleRedo()

			case 'save':
				return this.handleSave(parsed.args)

			default:
				try {
					const command = this.commandFactory.createCommand(parsed)
					this.executeCommand(command)
					return this.getSuccessMessage(type)
				}
				catch (error) {
					return `Ошибка: ${error instanceof Error
                        ? error.message
                        : 'Неизвестная ошибка'}. Введите 'help' для справки.`
				}
		}
	}

	private getHelp(): string {
		return `Доступные команды:
            InsertParagraph <позиция>|end <текст> - Вставить параграф
            InsertImage <позиция>|end <ширина> <высота> <путь> - Вставить изображение
            SetTitle <заголовок> - Установить заголовок
            ReplaceText <позиция> <текст> - Заменить текст параграфа
            ResizeImage <позиция> <ширина> <высота> - Изменить размер изображения
            DeleteItem <позиция> - Удалить элемент
            List - Показать содержимое документа
            Undo - Отменить последнее действие
            Redo - Повторить отмененное действие
            Save <путь> - Сохранить документ в HTML
            Help - Показать справку`
	}

	private getList(): string {
		let result = `Title: ${this.document.getTitle()}\n`

		for (let i = 0; i < this.document.getItemsCount(); i++) {
			const item = this.document.getItem(i)
			const paragraph = item.getParagraph()
			const image = item.getImage()

			if (paragraph) {
				result += `${i + 1}. Paragraph: ${paragraph.getText()}\n`
			}
			else if (image) {
				result += `${i + 1}. Image: ${image.getWidth()} ${image.getHeight()} ${image.getPath()}\n`
			}
		}

		return result.trim()
	}

	private handleUndo(): string {
		if (!this.commandHistory.canUndo()) {
			return 'Ошибка: Нет доступных операций для отмены'
		}

		this.commandHistory.undo()
		return 'Операция отменена'
	}

	private handleRedo(): string {
		if (!this.commandHistory.canRedo()) {
			return 'Ошибка: Нет доступных операций для повтора'
		}

		this.commandHistory.redo()
		return 'Операция повторена'
	}

	private handleSave(args: string[]): string {
		if (args.length < 1) {
			return 'Ошибка: Недостаточно аргументов. Использование: Save <путь>'
		}

		const path = args[0]
		this.document.save(path)
		return `Документ сохранен в ${path}`
	}


	private executeCommand(command: ICommand): void {
		command.execute()
		this.commandHistory.addCommand(command)
	}

	private getSuccessMessage(commandType: string): string {
		switch (commandType.toLowerCase()) {
			case 'insertparagraph':
				return 'Параграф добавлен'
			case 'insertimage':
				return 'Изображение добавлено'
			case 'settitle':
				return 'Заголовок установлен'
			case 'replacetext':
				return 'Текст заменен'
			case 'resizeimage':
				return 'Размер изображения изменен'
			case 'deleteitem':
				return 'Элемент удален'
			default:
				return 'Команда выполнена'
		}
	}
}

export {
	CommandManager,
}
