# Fluid Music adapter for Native Instruments Battery 4

```javascript
const fluid = require('fluid-music')
const MidiNote = fluid.techniques.MidiNote
const { Battery4Vst2, battery4Vst2Presets } = require('@fluid-music/battery-4')

const session = new fluid.FluidSession({ bpm: 100 }, [
  { name: 'empty', plugins: [new Battery4Vst2] },
  // Bundled presets assume you have Kontakt's Factory Library installed
  { name: 'fiasco', plugins: [battery4Vst2Presets.fiasco()] },
  { name: 'fragment', plugins: [battery4Vst2Presets.fragment()] },
  { name: 'hipHop', plugins: [battery4Vst2Presets.hipHop()] },
])

const tLibrary = {
  k: new MidiNote(36), // kick 1
  K: new MidiNote(37), // kick 2
  s: new MidiNote(38), // snare 
  S: new MidiNote(40), // snare
  h: new MidiNote(42), // closed hat
  H: new MidiNote(46), // open hat
}

session.insertScore({
  tLibrary,
  r:         '1 2 3 4 ',
  fiasco:   ['k h h sS'],
  fragment: ['        ','k h h sS'],
  hipHop:   ['        ','        ', 'k h h sS'],
})

session.saveAsReaperFile('session.RPP')
  .then(() => console.log('done'))
  .catch((e) => console.warn(e))
```