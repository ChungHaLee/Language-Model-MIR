//Wrapper class for WaveSurfer
//----------------------------------------------------//

export class MyWaveSurfer {
    //creates a waveSurfer object 
    constructor() {
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            backend: 'MediaElement',
            waveColor: '#A8DBA8',
            audioContext: Tone.context,
            progressColor: '#3B8686',
            cursorWidth: 5,
            normalize: true,
            interact: false,
            autoCenter: true,
            pixelRatio: 1,
            hideScrollbar: true,
         
           
        });
    }

    //connects wave surfet to audioElement
    setAudioElementSource(audioElement) {
        this.audioElement = audioElement
        this.wavesurfer.load(this.audioElement);



    }

    playWaveSurfer = () => {
        console.log("playing")
        return this.wavesurfer.play()
    }

    setInteractionEventHandler(callback) {
        this.wavesurfer.on('seek', async (position) => {

            callback(position * this.wavesurfer.getDuration())

        })
    }

    //returns wavesurfer
    getWavesurfer = () => {
        return this.wavesurfer;
    }

}
//----------------------------------------------------//