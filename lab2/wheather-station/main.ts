import {
	CDisplay,
	CStatsDisplay,
	CWeatherData,
} from './WheatherData'

function main(): void {
	const wd = new CWeatherData()

	const display = new CDisplay()
	wd.registerObserver(display)

	const statsDisplay = new CStatsDisplay()
	wd.registerObserver(statsDisplay)

	wd.setMeasurements(3, 0.7, 760)
	wd.setMeasurements(4, 0.8, 761)

	wd.removeObserver(statsDisplay)

	wd.setMeasurements(10, 0.8, 761)
	wd.setMeasurements(-10, 0.8, 761)
}

main()
