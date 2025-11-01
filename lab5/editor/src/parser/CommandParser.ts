interface ParsedCommand {
	type: string,
	args: string[],
}

class CommandParser {
	parseCommand(commandLine: string): ParsedCommand {
		const parts = commandLine.trim().split(/\s+/)
		const type = parts[0]
		const args = parts.slice(1)

		return {
			type,
			args,
		}
	}
}

export {
	CommandParser,
	ParsedCommand,
}
