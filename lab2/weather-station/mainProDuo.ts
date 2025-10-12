import {
	CWeatherStationProDuo,
	ProDuoDisplay,
	ProDuoStatsDisplay,
} from './WeatherStationProDuo'

function main(): void {
	const duo = new CWeatherStationProDuo()

	const display = new ProDuoDisplay()
	duo.registerObserver(display)

	const statsDisplay = new ProDuoStatsDisplay()
	duo.registerObserver(statsDisplay)

	duo.setInsideMeasurements({
		temp: 22,
		humidity: 0.5,
		pressure: 760,
	})

	duo.setOutsideMeasurements({
		temp: 15,
		humidity: 0.7,
		pressure: 755,
		windSpeed: 8.2,
		windDirection: 180,
	})

	duo.setInsideMeasurements({
		temp: 23,
		humidity: 0.6,
		pressure: 761,
	})

	duo.setOutsideMeasurements({
		temp: 12,
		humidity: 0.8,
		pressure: 752,
		windSpeed: 12.5,
		windDirection: 270,
	})

	duo.removeObserver(statsDisplay)

	duo.setInsideMeasurements({
		temp: 24,
		humidity: 0.4,
		pressure: 763,
	})

	duo.setOutsideMeasurements({
		temp: 10,
		humidity: 0.9,
		pressure: 748,
		windSpeed: 15.0,
		windDirection: 45,
	})
}

main()
