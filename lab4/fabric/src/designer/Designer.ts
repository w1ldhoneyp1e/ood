import {CommandExecutor} from '../commands/CommandExecutor'
import {type IShapeFactory} from '../shapes/IShapeFactory'
import {type IDesigner} from './IDesigner'
import {PictureDraft} from './PictureDraft'

class Designer implements IDesigner {
	private executor: CommandExecutor

	constructor(private readonly factory: IShapeFactory) {
		this.executor = new CommandExecutor(factory)
	}

	createDraft(input: string[]): PictureDraft {
		const draft = new PictureDraft()

		for (const line of input) {
			const trimmedLine = line.trim()

			if (!trimmedLine) {
				continue
			}

			try {
				const shape = this.executor.execute(trimmedLine)
				draft.addShape(shape)
			}
			catch (error) {
				if (error instanceof Error) {
					console.error(`Warning: Skipping invalid shape description: ${error.message}`)
				}
			}
		}

		return draft
	}
}

export {
	Designer,
}

