import {MemoryOutputStream} from '../../streams/MemoryOutputStream'

class MemoryOutputStreamMock extends MemoryOutputStream {
	getData(): Buffer {
		return Buffer.from((this as any).data)
	}
}

export {
	MemoryOutputStreamMock,
}
