// IMPORTANT: fluid-music 0.9.6 will add support for external plugin adapters.
// make sure that you are using fluid-music 0.9.6 or later in order to generate
// valid typescript.

const fluid = require('fluid-music')
const tStereoDelayVst2 = require('./vst2-report')

// Battery has only generic parameters that do nothing unless they are mapped
// via the GUI interface. All parameters are named `#000`, `#001`, `#002`, etc
// and we will rename them to `p000`, `p001`, `p002`, etc.
const isGenericNativeInstrumentsParam = /#\d*/

for (const paramInfo of tStereoDelayVst2.params) {
  if (isGenericNativeInstrumentsParam.test(paramInfo.name)) {
    paramInfo.key = 'p' + paramInfo.name.slice(1)
    paramInfo.isLinear = true
    paramInfo.inContinuous = true
    paramInfo.range = [0, 1]
    paramInfo.units = undefined
    paramInfo.choices = undefined
  } else if (paramInfo.name === 'Dry Level' || paramInfo.name === 'Wet Level') {
    // ignore
  } else {
    throw new Error(`A non-generic parameter was found: "${paramInfo.name}". Did Native Instruments unexpectedly change Battery 4 parameter names? gen-batter-4-vst2.js will need to be updated.`)
  }
}

const moduleString = fluid.gen.generatePluginModule(tStereoDelayVst2)

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, 'src', 'battery-4-vst2.ts')
fs.createWriteStream(filename).write(moduleString)
