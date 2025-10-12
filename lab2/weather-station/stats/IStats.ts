interface IStats<T, R = Record<string, T>> {
	addValue: (value: T) => void,
	getStats: () => R,
}

interface INumericStatsActions {
	addValue: (value: number) => void,
	printStats: () => void,
}

export {
	IStats,
	INumericStatsActions,
}
