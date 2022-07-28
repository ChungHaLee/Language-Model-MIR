// import * as Tone from "tone";
import {
    Visualization
} from './Viz/Visualization.js'
import {
    Kandinsky
} from './Viz/Kandinsky.js'
import {
    BPMTimer
} from './Utility/BPMTimer.js'
import {
    Switcher
} from './Utility/Switcher.js'
import {
    ButtonCustomization
} from './Customization/ButtonCustomization.js'
import {
    Piano
} from './Customization/Piano.js'
import {
    ProgressTimer
} from './Utility/ProgressTimer.js'
import {
    MusicSheet
} from './forUI/MusicSheet.js'

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();
//bloom length 
let visualization = new Visualization(1)
let progressTimer = new ProgressTimer(15, document.getElementById("ProgressBar"));
let musicSheet = new MusicSheet(50);
let piano = new Piano("pianoContainer");
let mode_pitchbeat="pitch"

let pitch_type = document.getElementById('pitchButton')
let beat_type=document.getElementById('beatButton')
let piano_container=document.getElementsByClassName("set")
let drum_container=document.getElementsByClassName("set2")
let picker_beat=document.getElementById('picker_beat')
let picker_satu= document.getElementById("picker_satu")
let picker_light= document.getElementById("picker_light")
let palettes = document.getElementsByClassName('Palette')

pitch_type.onclick=function(e){
    // console.log("pitch mode")
    mode_pitchbeat="pitch"
    piano_container[0].style.display=''
    drum_container[0].style.display='none'
    picker_satu.style.display=''
    picker_light.style.display=''
    picker_beat.style.display='none'
    for(let i=0; i<8; i++){
        palettes[i].style.display=''
    }
}
beat_type.onclick=function(e){
    // console.log("beat mode")
    mode_pitchbeat="beat"
    piano_container[0].style.display='none'
    drum_container[0].style.display=''
    picker_satu.style.display='none'
    picker_light.style.display='none'
    picker_beat.style.display=''
    for(let i=0; i<8; i++){
        palettes[i].style.display='none'
    }

}

let drum=document.getElementById("drum")
drum.onclick=function(e){
    let drum_audio=document.getElementById("drum_audio")
    drum_audio.play()
}


main()

function main() {
    bpmTimer.setBPM(100)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);
    geometryButtons.assignEventHandler("click", visualization.setGeometryType)
    textureButtons.assignEventHandler("click", visualization.setTexture)

    piano.assignEventOnPianoRow("mousedown", draw, musicSheet.setMusicArray, 1, 4)
    piano.assignEventOnPianoRow("mousedown", draw, musicSheet.setMusicArray, 2, 5)
    piano.assignEventOnPianoRow("mousedown", draw, musicSheet.setMusicArray, 3, 6)


    update();
}

function update() {
    stats.begin()
    requestAnimationFrame(update);
    musicSheet.setCurrentIndex(Math.round(progressTimer.getThisSeconds() / 300))

    if (!bpmTimer.isUnderFourBeat()) {
        visualization.reset();
    } else if (bpmTimer.isUnderFourBeat()) {

        if (musicSheet.getKeyboardEnergy() > 0 && (musicSheet.isCurrentIndexUpdated())) {
            let pitchAndEnergy = switcher.getPitchAndEnergy(
                musicSheet.getKeyboardPitch(),
                musicSheet.getKeyboardEnergy(),
                musicSheet.getKeyboardNote()
            )
            kandinsky.calculate(pitchAndEnergy);
            //visualization.setColor("piano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
            visualization.createVisualNote("piano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
            console.log("Create Mesh!!", musicSheet.getCurrentIndex(), musicSheet.getLastIndex(), musicSheet.getKeyboardPitch());
            visualization.createConnectionLine("piano")
        }
    }
    visualization.render();
    visualization.update();
    stats.end();
    musicSheet.setLastIndex(musicSheet.getCurrentIndex())
}


//callback for each Instrument 
//drum class must have the same getPitch Energy, getPitchWidth and getPitchHeight Functions. 
function draw(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote("piano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
    visualization.createConnectionLine("piano")
}