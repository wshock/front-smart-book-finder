export default {
	paths: ["tests/features/**/*.feature"],
	import: ["tests/steps/**/*.js"],
	format: ["progress"],
	publishQuiet: true,
	defaultTimeout: 30000,
};
