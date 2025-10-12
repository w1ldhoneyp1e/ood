import {CWeatherDataPro} from '../proDuo/WeatherStationProDuo'
import {ProDisplay, ProStatsDisplay} from './WeatherStationPro'


function main(): void {
	const wd = new CWeatherDataPro()

	const display = new ProDisplay()
	wd.registerObserver(display)

	const statsDisplay = new ProStatsDisplay()
	wd.registerObserver(statsDisplay)

	wd.setMeasurements({
		temp: 20,
		humidity: 0.6,
		pressure: 760,
		windSpeed: 5.5,
		windDirection: 45,
	})

	wd.setMeasurements({
		temp: 22,
		humidity: 0.7,
		pressure: 761,
		windSpeed: 8.2,
		windDirection: 180,
	})

	wd.removeObserver(statsDisplay)

	wd.setMeasurements({
		temp: 18,
		humidity: 0.5,
		pressure: 759,
		windSpeed: 3.1,
		windDirection: 270,
	})
}

main()
