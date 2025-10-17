interface IInputDataStream {
	isEOF: () => boolean,
	readByte: () => number,
	readBlock: (size: number) => Buffer,
}

export {
	IInputDataStream,
}
