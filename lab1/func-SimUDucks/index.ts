import {createDecoyDuck} from './lib/Duck/DecoyDuck'
import {createFlyWithWings} from './lib/Duck/Fly/FlyWithWings'
import {createMallardDuck} from './lib/Duck/MallardDuck'
import {createModelDuck} from './lib/Duck/ModelDuck'
import {createRedheadDuck} from './lib/Duck/RedheadDuck'
import {createRubberDuck} from './lib/Duck/RubberDuck'
import {playWithDuck} from './lib/DuckFunctions'

const mallardDuck = createMallardDuck()
playWithDuck(mallardDuck)

const redheadDuck = createRedheadDuck()
playWithDuck(redheadDuck)

const rubberDuck = createRubberDuck()
playWithDuck(rubberDuck)

const decoyDuck = createDecoyDuck()
playWithDuck(decoyDuck)

const modelDuck = createModelDuck()
playWithDuck(modelDuck)

modelDuck.setFlyBehavior(createFlyWithWings())
playWithDuck(modelDuck)
