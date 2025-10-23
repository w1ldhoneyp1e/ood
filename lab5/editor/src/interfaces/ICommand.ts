interface ICommand {
	execute: () => void,
	undo: () => void,
}

export {
	ICommand,
}
