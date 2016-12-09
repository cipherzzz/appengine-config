/**
 * Prepares app engine app.yaml files with necessary env variables.
 * I really think there should be a better way to do this...
 */

const app = require('commander')
const yaml = require('node-yaml')
const rimraf = require('rimraf')

// Array helper
function arrayPush (value, memo) {
  memo.push(value)
  return memo
}

// Create API for app
app
  .version('1.0.0')
  .option('-s, --source [path]', 'Source file', 'app.yaml')
  .option('-o, --output [path]', 'Output file', 'app.yaml')
  .option('-e, --env [value]', 'Enviroment variable', arrayPush, [])
  .parse(process.argv)

// Keep a count of envs added for logging purposes
let count = 0

// Clear any existing output
rimraf.sync(app.output)

// Read existing YAML file
yaml.readPromise(app.source).then(data => {
  if (!data.env_variables && app.env.length > 0) data.env_variables = {}

  // Add specified envs to yaml
  app.env.forEach(variable => {
    const [key, value] = variable.split('=')
    data.env_variables[key] = value
    count++
  })

  // Write our changes
  return yaml.writePromise(app.output, data)
}).then(response => {
  console.log(`Added ${count} environment variables to ${app.output}`)
}).catch(console.error)
