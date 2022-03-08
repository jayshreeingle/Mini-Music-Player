console.log("Hello World");
let songIndex=0;
let audioElement = new Audio("songlist/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongPlay = document.getElementById('masterSongPlay');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName:"Apna Har Din Aise Jio", filePath:"songlist/1.mp3", coverPath:"images/cover1.jpg"},
    {songName:"Ale Ab Jo Bhi Ho", filePath:"songlist/2.mp3", coverPath:"images/cover2.jpg"},
    {songName:"Desh Mera Rangila", filePath:"songlist/3.mp3", coverPath:"images/cover3.jpg"},
    {songName:"Hindustani", filePath:"songlist/4.mp3", coverPath:"images/cover4.jpg"},
    {songName:"Aapka Kya Hoga", filePath:"songlist/5.mp3", coverPath:"images/cover5.jpg"},
    {songName:"Lakshya", filePath:"songlist/6.mp3", coverPath:"images/cover6.jpg"}
];
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// audioElement.play();
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');

            audioElement.src=`songlist/${songIndex+1}.mp3`;
            masterSongPlay.innerText=songs[songIndex].songName;
            audioElement.currentTime=0;

            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songlist/${songIndex+1}.mp3`;
    masterSongPlay.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songlist/${songIndex+1}.mp3`;
    masterSongPlay.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})