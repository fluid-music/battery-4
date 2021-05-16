import { join } from 'path'
import { readFileSync } from 'fs'
import { Battery4Vst2 } from './battery-4-vst2'

const hipHopKitFilename = join(__dirname, '..', 'presets', 'hip-hop-kit.fxp')
const hipHopKitFxpB64 = readFileSync(hipHopKitFilename).toString('base64')

const fragmentKitFilename = join(__dirname, '..', 'presets', 'fragment-kit.fxp')
const fragmentKitFxpB64 = readFileSync(fragmentKitFilename).toString('base64')

const fiascoKitFilename = join(__dirname, '..', 'presets', 'fiasco-kit.fxp')
const fiascoKitFxpB64 = readFileSync(fiascoKitFilename).toString('base64')

export function hipHop() {
  const plugin = new Battery4Vst2()
  plugin.vst2.presetBase64 = hipHopKitFxpB64
  return plugin
}

export function fragment() {
  const plugin = new Battery4Vst2()
  plugin.vst2.presetBase64 = fragmentKitFxpB64
  return plugin
}

export function fiasco() {
  const plugin = new Battery4Vst2()
  plugin.vst2.presetBase64 = fiascoKitFxpB64
  return plugin
}
