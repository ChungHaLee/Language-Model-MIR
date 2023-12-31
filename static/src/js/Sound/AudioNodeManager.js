//오디오 노드가 뻇다 삭제하고 추가하고 등등 복잡하여 이 클래스의 객체로 관리

//Helper class for Webaudio Node Connection
//----------------------------------------------------//
export class AudioNodeManager {
    constructor(audioElement) {
        this.src = Tone.context.createMediaElementSource(audioElement);
        this.gainNode = new Tone.Gain();
        this.analyser = new Tone.Waveform(1024)
        this.nodeList = [];
    }

    //add node to the list
    addNode(...args) {
        for (const arg of args) {
            this.nodeList.push(arg)
        }
    }

    //insert to specific index 
    insertNodeToIndex(node, index, eraseIndex = 0) {
        this.nodeList.slice(index, eraseIndex = 0, node)
    }

    //connect all the nodes
    connectAllNodes() {
        for (let i = 0; i < this.nodeList.length-1; i++) {
            Tone.connect(this.nodeList[i], this.nodeList[i + 1]);
        }
    }

    //show the elements and also the connetion of the nodes.
    showConnection() {
        console.log("printing nodeList: ")
        for (let i = 0; i < this.nodeList.length; i++) {
            console.log(i, this.nodeList[i])
        }
        console.log("End Of nodeList ")
    }

    getSource() {
        return this.src
    }

    getGainNode() {
        return this.gainNode
    }
    getLastNode() {
        return Tone.getDestination()
    }
    getAnalyser(){
        return this.analyser
    }
}