const spawn = require('child_process').spawn;
const gutil = require('gulp-util');
const gulp = require('gulp');



function run_command(command, options) {
  const child = spawn(command, options, {cwd: process.cwd()});
  let stdout = '', stderr = '';

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', function (data) {
    stdout += data;
    gutil.log(data);
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    stderr += data;
    gutil.log(gutil.colors.red(data));
    gutil.beep();
  });

  child.on('close', function (code) {
    gutil.log("Done with exit code", code);
    gutil.log("You access complete stdout and stderr from here"); // stdout, stderr
  });
}

function npm_start(path) {
  run_command('npm', ['start', '--prefix', path]);
}

function npm_install(path) {
  run_command('npm', ['install', '--prefix', path]);
}

gulp.task('default', ['start_auth', 'start_webapp']);

gulp.task('install', ['install_auth', 'install_webapp']);

//-------- Running app using npm start
gulp.task('start_auth', () => {
  npm_start("../auth/");
});

gulp.task('start_webapp', () => {
  npm_start("../webapp/");
});
//-------- Installation using npm install -----------
gulp.task('install_auth', () => {
  npm_install("../auth/");
});

gulp.task('install_webapp', () => {
  npm_install("../webapp/");
});