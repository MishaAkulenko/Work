
var gulp = require('gulp');
var gls = require('gulp-live-server');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
 

gulp.task('lint', function () {
	gulp.src('./**/*.js')
	.pipe(jshint())
})
 
gulp.task('api', function () {
	var stream = nodemon({ 
		script: 'server.js',
		ext: 'html js',
		ignore: ['ignored.js'],
		tasks: ['lint'] 
	})

	stream
		.on('restart', function () {
			console.log('restarted!')
		})
		.on('crash', function() {
			console.error('Application has crashed!\n')
		 stream.emit('restart', 2)  // restart the server in 2 seconds 
      })
})

gulp.task('public', function() {
	var server = gls.static(['./public','./destination_files'], 7000);
		console.log('http://localhost:7000/');
	server.start();
});

gulp.task('admin', function() {
	var server = gls.static(['./admin','./destination_files'], 5000);
		console.log('http://localhost:5000/');
	server.start();
});

gulp.task('default', ["api","admin","public"] );