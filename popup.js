const setVol=document.getElementById('setVol');
const setVolume = (args) => {
    const videos = document.querySelectorAll('video');
    const vid = videos[0];
    if (vid) {
        alert('Video found');
        var videoElement = document.querySelector("video")

        // console.log(vid.srcObject);

        var audioCtx = new AudioContext()
        var source = audioCtx.createMediaElementSource(videoElement)
        var gainNode = audioCtx.createGain()
        gainNode.gain.value = args.volume// double the volume
        source.connect(gainNode)
        gainNode.connect(audioCtx.destination)
    }
    else {
        alert('No video found');
    }
}

setVol.addEventListener('click',()=>{
    const volume = Number(document.getElementById('volume').value);
    // console.log(volume,typeof(volume));
    chrome.tabs.query({active:true},(tabs)=>{
        const tab=tabs[0];
        if(tab){
            // alert(tab.id);
            chrome.scripting.executeScript({
                target:{tabId:tab.id},
                func:setVolume,
                args: [{ volume: volume }]
            })
        }
        else{
            alert('No active tab');
        }
    })
})

// const changeVol = (vid) => {
//     var audioCtx = new AudioContext()
//     var source = audioCtx.createMediaElementSource(vid)
//     var gainNode = audioCtx.createGain()
//     gainNode.gain.value = 2 // double the volume
//     source.connect(gainNode)
//     gainNode.connect(audioCtx.destination)
// }



