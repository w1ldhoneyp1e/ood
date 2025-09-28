import {type IQuackBehavior} from './IQuackBehavior'

const createSqueakBehavior: IQuackBehavior = () => {
	console.log('Squeek!!!')
}

export {
	createSqueakBehavior,
}
