#!/usr/bin/env node

/**
 * Prepares app engine app.yaml files with necessary env variables.
 * I really think there should be a better way to do this...
 */

const app = require('commander')
const yaml = require('node-yaml')
const rimraf = require('rimraf')
const colors = require('colors')
const path = require('path')
require('pkginfo')(module)

// Array helper
function arrayPush (value, memo) {
  memo.push(value)
  return memo
}

// Create API for app
app
  .version(module.exports.version)
  .option('-s, --source [path]', 'Source file', '/app.yaml')
  .option('-o, --output [path]', 'Output file', '/app.yaml')
  .option('-e, --env [value]', 'Enviroment variable', arrayPush, [])
  .parse(process.argv)

// Keep a count of envs added for logging purposes
let count = 0

// Clear any existing output
if (app.source !== app.output) rimraf.sync(path.join(process.cwd(), app.output))

// Read existing YAML file
yaml.read(path.join(process.cwd(), app.source)).then(data => {
  if (!data.env_variables && app.env.length > 0) data.env_variables = {}

  // Add specified envs to yaml
  app.env.forEach(variable => {
    const [key, value] = variable.split('=')
    data.env_variables[key] = value
    count++
  })

  // Write our changes
  return yaml.write(path.join(process.cwd(), app.output), data)
}).then(response => {
  console.log(colors.green(`Added ${count} environment variables to ${app.output}`))
}).catch(error => {
  console.error(colors.red(error.message))
  process.exit(1)
})
