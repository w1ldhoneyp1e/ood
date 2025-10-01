import {type IObserver} from '../Observer'
import {type SWeatherInfo, CWeatherStationDuo} from '../WeatherStationDuo'

describe('Weather Station Duo', () => {
	test('Duo works :)', () => {
		const duo = new CWeatherStationDuo()
		const calls: string[] = []

		const mockDisplay: IObserver<SWeatherInfo> = {
			update: (data: SWeatherInfo) => {
				calls.push(`${data.source}:${data.temperature}`)
			},
		}

		duo.registerObserver(mockDisplay, 10)

		duo.setInsideMeasurements(20, 0.6, 760)
		duo.setOutsideMeasurements(15, 0.7, 755)

		expect(calls).toContain('in:20')
		expect(calls).toContain('out:15')
		expect(calls).toHaveLength(2)
	})

	test('priority works', () => {
		const duo = new CWeatherStationDuo()
		const calls: string[] = []

		const highPriorityObserver: IObserver<SWeatherInfo> = {
			update: (data: SWeatherInfo) => {
				calls.push(`high-${data.source}`)
			},
		}

		const lowPriorityObserver: IObserver<SWeatherInfo> = {
			update: (data: SWeatherInfo) => {
				calls.push(`low-${data.source}`)
			},
		}

		duo.registerObserver(lowPriorityObserver, 0)
		duo.registerObserver(highPriorityObserver, 10)

		duo.setInsideMeasurements(20, 0.6, 760)
		duo.setOutsideMeasurements(15, 0.7, 755)

		expect(calls).toEqual(['high-in', 'low-in', 'high-out', 'low-out'])
	})
})
