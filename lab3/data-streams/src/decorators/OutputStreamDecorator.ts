import {type IOutputDataStream} from '../interfaces/IOutputDataStream'

abstract class OutputStreamDecorator implements IOutputDataStream {
	constructor(protected stream: IOutputDataStream) {}

	abstract writeByte(data: number): void
	abstract writeBlock(data: Buffer): void

	close(): void {
		this.stream.close()
	}
}

export {
	OutputStreamDecorator,
}
