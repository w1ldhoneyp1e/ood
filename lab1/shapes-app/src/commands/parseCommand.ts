interface CommandType {
	type: string,
	args: string[],
}

function parseCommand(input: string): CommandType {
	const parts = input.trim().split(/\s+/)
	if (parts.length === 0) {
		throw new Error('Empty command')
	}

	return {
		type: parts[0],
		args: parts.slice(1),
	}
}

export {
	parseCommand,
	type CommandType,
}
