console.log("Lets write js");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds <0){
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remaininfSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2 , '0');
    const formattedSeconds = String(remaininfSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    console.log("Fetched")

    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    
    let songs = [];
    for(let i=0;i<as.length;i++){
        const element = as[i]; 
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track, pause = false) =>{
    // let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
    if(!pause){
        currentSong.play();
        play.src = "img/pause.svg";
    }
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main(){ 

    let songs = await getSongs();

    playMusic(songs[0] , true)

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for(const song of songs){
        songUl.innerHTML = songUl.innerHTML + `<li><img class="invert" src="img/music.svg" alt="" />
                <div class="info">
                  <div>${song.replaceAll("%20" , " ")}</div>
                  <p>Visible Nasir</p>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="img/play.svg" alt="" />
                </div>
                </li>`;
    }
    // attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click" , element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
        
    }); 

    // attach an event listener to play , next and previous
    play.addEventListener("click" , ()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "img/pause.svg"
        }else{
            currentSong.pause();
            play.src = "img/play.svg"
        }
    })
    next.addEventListener("click",()=>{
         
    })
    // Listen for time update event
    currentSong.addEventListener("timeupdate" , ()=>{
        console.log(currentSong.currentTime , currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%";
    })

    // Add an event to seekbar
    document.querySelector(".seekbar").addEventListener("click" , e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)* 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent)/100;
    })

    // add an EventListener for hamburger
    document.querySelector(".hamburger").addEventListener("click" , ()=>{
        document.querySelector(".left").style.left = "0";
    })
    // add reverse event listener on close 
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-100%";
    })
} 
 
main();
