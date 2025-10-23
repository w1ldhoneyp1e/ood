interface ICommand {
	execute: () => void,
	undo: () => void,
	getDescription: () => string,
}

export {
	ICommand,
}
