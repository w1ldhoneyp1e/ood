import * as readline from 'readline'
import {Menu} from './menu/Menu'
import {MultiGumballMachine} from './multiGumballMachine/state/MultiGumballMachine'

const main = () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	const machine = new MultiGumballMachine(5)
	const menu = new Menu(rl)

	menu.addItem('insert', () => {
		machine.insertQuarter()
	})

	menu.addItem('eject', () => {
		machine.ejectQuarter()
	})

	menu.addItem('turn', () => {
		machine.turnCrank()
	})

	menu.addItem('refill', {
		execute: (countStr: string) => {
			const count = parseInt(countStr, 10)
			if (!isNaN(count)) {
				machine.refill(count)
			}
			else {
				console.log('Invalid number')
			}
		},
	})

	menu.addItem('status', () => {
		console.log(machine.toString())
	})

	menu.addItem('exit', () => {
		menu.exit()
	})

	menu.run()
}

if (require.main === module) {
	main()
}

