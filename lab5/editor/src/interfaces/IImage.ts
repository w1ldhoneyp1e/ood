interface IImage {
	getPath: () => string,
	getWidth: () => number,
	getHeight: () => number,
	resize: (width: number, height: number) => void,
}

export {
	IImage,
}
