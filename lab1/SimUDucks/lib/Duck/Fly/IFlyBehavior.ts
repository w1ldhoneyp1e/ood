interface IFlyBehavior {
	canFly: boolean,
	flightCounter: number | null,
	fly: () => void,
}

export {
	IFlyBehavior,
}
