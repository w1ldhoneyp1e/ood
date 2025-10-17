interface IOutputDataStream {
	writeByte: (data: number) => void,
	writeBlock: (data: Buffer) => void,
	close: () => void,
}

export {
	IOutputDataStream,
}
