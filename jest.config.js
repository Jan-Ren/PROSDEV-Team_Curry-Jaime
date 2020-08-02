const {defaults} = require('jest-config');

module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx', 'svg'],
	transform: {
		  "\\.js$": "./node_modules/babel-jest",
		  "^.+\\.svg$": "./svgTransform.js"
		},
	moduleNameMapper: {
		'^.+\\.(css|less)$': 'CSSStub.js'
	}
};