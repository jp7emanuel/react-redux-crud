const elixir = require('laravel-elixir');

elixir((mix) => {
    mix.styles([
      './node_modules/bootstrap/dist/css/bootstrap.css',
      './node_modules/font-awesome/css/font-awesome.css'
    ], './public/css/app.css');

    mix.copy('node_modules/font-awesome/fonts', './public/fonts');
});
