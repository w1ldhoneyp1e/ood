interface ICommand {
	execute: () => void,
	undo: () => void,
	getAffectedShapeId: () => string | null,
}

export {
	type ICommand,
}

