import {type IInputDataStream} from '../interfaces/IInputDataStream'

abstract class InputStreamDecorator implements IInputDataStream {
	constructor(protected stream: IInputDataStream) {}

	abstract isEOF(): boolean
	abstract readByte(): number
	abstract readBlock(size: number): Buffer
}

export {
	InputStreamDecorator,
}
