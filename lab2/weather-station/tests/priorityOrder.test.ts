import {type IObserver} from '../observer/Observer'
import {CWeatherData} from '../WheatherData'

interface WeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
}

describe('priority order', () => {
	test('priority works :)', () => {
		const wd = new CWeatherData()
		const calls: string[] = []

		const mockObserver = (name: string): IObserver<WeatherInfo> => ({
			update: () => {
				calls.push(name)
			},
		})

		const second = mockObserver('second')
		const third = mockObserver('third')
		const first = mockObserver('first')

		wd.registerObserver(second, 0)
		wd.registerObserver(third, -1)
		wd.registerObserver(first, 10)

		wd.setMeasurements(1, 0.5, 750)
		expect(calls).toEqual(['first', 'second', 'third'])
	})

	test('idempotent', () => {
		const wd = new CWeatherData()
		let count = 0

		const mockObserver: IObserver<WeatherInfo> = {
			update: () => {
				count++
			},
		}

		wd.registerObserver(mockObserver, 5)
		wd.registerObserver(mockObserver, 100)

		wd.setMeasurements(1, 0.5, 750)
		expect(count).toBe(1)
	})

	test('observers with same priority', () => {
		const wd = new CWeatherData()
		const calls: string[] = []

		const mockObserver = (name: string): IObserver<WeatherInfo> => ({
			update: () => {
				calls.push(name)
			},
		})

		const first = mockObserver('first')
		const second = mockObserver('second')
		const third = mockObserver('third')

		wd.registerObserver(first, 5)
		wd.registerObserver(second, 5)
		wd.registerObserver(third, 5)

		wd.setMeasurements(1, 0.5, 750)

		expect(calls).toEqual(['first', 'second', 'third'])
	})
})


