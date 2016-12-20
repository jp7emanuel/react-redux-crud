const elixir = require('laravel-elixir');

elixir((mix) => {
    mix.styles([
      './node_modules/bulma/css/bulma.css'
    ], 'style/app.css');
});
