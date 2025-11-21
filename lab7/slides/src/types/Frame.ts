class Frame {
	constructor(
		public left: number,
		public top: number,
		public width: number,
		public height: number,
	) {
		if (width < 0 || height < 0) {
			throw new Error('Frame width and height must be non-negative')
		}
	}

	get right(): number {
		return this.left + this.width
	}

	get bottom(): number {
		return this.top + this.height
	}

	static fromBounds(left: number, top: number, right: number, bottom: number): Frame {
		return new Frame(left, top, right - left, bottom - top)
	}

	static union(frames: Frame[]): Frame | undefined {
		if (frames.length === 0) {
			return undefined
		}

		let minLeft = frames[0].left
		let minTop = frames[0].top
		let maxRight = frames[0].right
		let maxBottom = frames[0].bottom

		for (let i = 1; i < frames.length; i++) {
			const frame = frames[i]
			minLeft = Math.min(minLeft, frame.left)
			minTop = Math.min(minTop, frame.top)
			maxRight = Math.max(maxRight, frame.right)
			maxBottom = Math.max(maxBottom, frame.bottom)
		}

		return Frame.fromBounds(minLeft, minTop, maxRight, maxBottom)
	}
}

export {
	Frame,
}

