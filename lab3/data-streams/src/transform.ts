#!/usr/bin/env node

import {CompressOutputStream} from './decorators/CompressOutputStream'
import {DecompressInputStream} from './decorators/DecompressInputStream'
import {DecryptInputStream} from './decorators/DecryptInputStream'
import {EncryptOutputStream} from './decorators/EncryptOutputStream'
import {type IInputDataStream} from './interfaces/IInputDataStream'
import {type IOutputDataStream} from './interfaces/IOutputDataStream'
import {FileInputStream} from './streams/FileInputStream'
import {FileOutputStream} from './streams/FileOutputStream'

interface Options {
	encryptKeys: number[],
	decryptKeys: number[],
	compress: boolean,
	decompress: boolean,
	inputFile: string,
	outputFile: string,
}

function printUsage(): void {
	console.log('Usage: transform [options] <input-file> <output-file>')
	console.log('Options:')
	console.log('  --encrypt <key>    Encrypt with specified key (can be used multiple times)')
	console.log('  --decrypt <key>    Decrypt with specified key (can be used multiple times)')
	console.log('  --compress         Compress data using RLE')
	console.log('  --decompress       Decompress data using RLE')
}

function parseArguments(args: string[]): Options {
	const options: Options = {
		encryptKeys: [],
		decryptKeys: [],
		compress: false,
		decompress: false,
		inputFile: '',
		outputFile: '',
	}

	if (args.length < 2) {
		throw new Error('Insufficient arguments')
	}

	let i = 0
	while (i < args.length - 2) {
		const arg = args[i]

		if (arg === '--encrypt') {
			if (i + 1 >= args.length - 2) {
				throw new Error('--encrypt requires a key argument')
			}
			options.encryptKeys.push(parseInt(args[i + 1], 10))
			i += 2
		}
		else if (arg === '--decrypt') {
			if (i + 1 >= args.length - 2) {
				throw new Error('--decrypt requires a key argument')
			}
			options.decryptKeys.push(parseInt(args[i + 1], 10))
			i += 2
		}
		else if (arg === '--compress') {
			options.compress = true
			i++
		}
		else if (arg === '--decompress') {
			options.decompress = true
			i++
		}
		else {
			throw new Error(`Unknown option: ${arg}`)
		}
	}

	options.inputFile = args[args.length - 2]
	options.outputFile = args[args.length - 1]

	return options
}

function transform(options: Options): void {
	let inputStream: IInputDataStream = new FileInputStream(options.inputFile)

	if (options.decompress) {
		inputStream = new DecompressInputStream(inputStream)
	}

	for (let i = options.decryptKeys.length - 1; i >= 0; i--) {
		inputStream = new DecryptInputStream(inputStream, options.decryptKeys[i])
	}

	let outputStream: IOutputDataStream = new FileOutputStream(options.outputFile)

	for (const key of options.encryptKeys) {
		outputStream = new EncryptOutputStream(outputStream, key)
	}

	if (options.compress) {
		outputStream = new CompressOutputStream(outputStream)
	}

	const bufferSize = 4096

	try {
		while (!inputStream.isEOF()) {
			const data = inputStream.readBlock(bufferSize)
			if (data.length > 0) {
				outputStream.writeBlock(data)
			}
		}

		outputStream.close()

		console.log(`File transformed successfully: ${options.inputFile} -> ${options.outputFile}`)
	}
	catch (error) {
		console.error('Error during transformation:', error)
		throw error
	}
}

if (require.main === module) {
	try {
		const args = process.argv.slice(2)
		const options = parseArguments(args)
		transform(options)
		process.exit(0)
	}
	catch (error) {
		if (error instanceof Error) {
			console.error('Error:', error.message)
		}
		else {
			console.error('Error:', error)
		}
		printUsage()
		process.exit(1)
	}
}

export {transform, parseArguments}

