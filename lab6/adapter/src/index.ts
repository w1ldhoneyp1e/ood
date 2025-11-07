import {main} from './app'

main().catch(error => {
	console.error('Error:', error)
	process.exit(1)
})
