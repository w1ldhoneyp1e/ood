module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	collectCoverageFrom: [
		'**/src/**/*.ts',
		'**/lib/**/*.ts',
		'!**/*.d.ts',
		'!**/index.ts',
		'!**/main.ts',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	projects: [
		'<rootDir>/lab1/func-SimUDucks',
		'<rootDir>/lab1/SimUDucks',
		'<rootDir>/lab1/shapes-app',
		'<rootDir>/lab2/weather-station',
		'<rootDir>/lab3/coffee',
		'<rootDir>/lab3/data-streams',
		'<rootDir>/lab4/fabric',
		'<rootDir>/lab5/editor',
	],
}
