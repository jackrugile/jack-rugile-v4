/*==============================================================================
Gulp
==============================================================================*/

var gulp = require( 'gulp' ),
	gulpLoadPlugins = require( 'gulp-load-plugins' ),
	p = gulpLoadPlugins();

function handleError( err ) {
	console.log( err.toString() );
	this.emit( 'end' );
}

/*==============================================================================
Clean
==============================================================================*/

gulp.task( 'clean', function() {
	gulp.src( [ 'dist/index.html', 'dist/css' ], { 
			read: false
		})
		.pipe( p.rimraf() );
});

/*==============================================================================
HTML
==============================================================================*/

gulp.task('html', function() {
	gulp.src( 'src/index.html' )
	.pipe( gulp.dest( 'dist' ) );
});

/*==============================================================================
Styles
==============================================================================*/

gulp.task( 'styles', function() {
	return gulp.src( 'src/scss/main.scss' )
		.pipe( p.sass( {
			style: 'expanded'
		}))
		.on( 'error', p.sass.logError)
		.pipe( p.rename( 'main.css' ) )
		.pipe( gulp.dest( 'dist/css' ) )
		.pipe( p.autoprefixer() )
		.pipe( p.minifyCss( { advanced: false } ) )
		.pipe( p.rename( 'main.min.css' ) )
		.pipe( gulp.dest( 'dist/css' ) );
});

/*==============================================================================
Watch
==============================================================================*/

gulp.task('watch', function() {
	gulp.watch( 'src/index.html', [ 'html' ] );
	gulp.watch( 'src/scss/**/*', [ 'styles' ] );
});

/*==============================================================================
Default
==============================================================================*/

gulp.task( 'default', [ 'html', 'styles' ], function() {
	gulp.start( 'watch' );
});