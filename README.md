# App Engine Config
> Generate an app.yaml config from templates and inject environment variables. Useful for creating environment specific configs at deploy time.

### Installation
```bash
npm install --save-dev appengine-config
```

### Usage
```bash
appengine-config -s env/app.staging.yaml -e SECRET_KEY=kafjl&a%5js2fi32l -e ANOTHER_SECET=testaccount
```

### Options
```bash
Usage: appengine-config [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -s, --source [path]     Source file
    -o, --output [path]     Output file
    -e, --env [key=value]   Enviroment variable
```

By default, the output will be `/app.yaml`.
