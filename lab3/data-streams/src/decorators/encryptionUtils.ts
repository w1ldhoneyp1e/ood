function generateEncryptionTable(key: number): number[] {
	const table: number[] = Array.from({length: 256}, (_, i) => i)

	let seed = key
	const random = () => {
		seed = (seed * 9301 + 49297) % 233280
		return seed / 233280
	}

	for (let i = table.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[table[i], table[j]] = [table[j], table[i]]
	}

	return table
}

function generateDecryptionTable(key: number): number[] {
	const encryptTable = generateEncryptionTable(key)

	const decryptTable: number[] = new Array(256)
	for (let i = 0; i < 256; i++) {
		decryptTable[encryptTable[i]] = i
	}

	return decryptTable
}

export {
	generateEncryptionTable,
	generateDecryptionTable,
}
