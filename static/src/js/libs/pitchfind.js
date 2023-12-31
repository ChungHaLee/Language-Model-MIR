/**
 * Copyright 2019 Google LLC
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 3 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */
 import Pitchfinder from 'pitchfinder'
export class Pitch {
	 constructor(analyser){
		this._pichfinder = Pitchfinder.Macleod({ sampleRate : Tone.context.sampleRate })
		this._smoothedPitches = []
		this._smoothedProb = 0
		this.analyser=analyser
	 }

	 _getMedian(){
		 return this._smoothedPitches.slice().sort()[Math.floor(this._smoothedPitches.length/2)]
	 }
 
	 getPitch(){
		 const values = this.analyser.getValue()
		 
		 let { freq, probability } = this._pichfinder(values)
		
		 //some smoothing
		 if (freq < 30){
			 probability = 0
		 } 
		 //different decending/acending curve
		 const smoothing = probability > this._smoothedProb ? 0.8 : 0.99
		 this._smoothedProb = this._smoothedProb * smoothing + probability * (1 - smoothing)
 
		 this._smoothedPitches.push(freq)
		 if (this._smoothedPitches.length > 20){
			 this._smoothedPitches.shift()
		 }
 
		 const pitch = this._getMedian()
		 
		 const note = pitch === -1 ? 0 : Tone.Frequency(pitch).toNote()
		 const midi = pitch === -1 ? 0 : Tone.Frequency(pitch).toMidi()

		 return {
			 frequency : pitch,
			 confidence : this._smoothedProb,
			 note, midi
		 }
	 }

 }