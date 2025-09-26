interface IQuackBehavior {
	quack: () => void,
	readonly quackable: boolean,
}

export {
	IQuackBehavior,
}
