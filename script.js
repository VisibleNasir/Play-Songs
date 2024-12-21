console.log("Lets write js");


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

async function main(){
    let songs = await getSongs();
    console.log(songs);

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for(const song of songs){
        songUl.innerHTML = songUl.innerHTML + `<li><img class="invert" src="img/music.svg" alt="" />
                <div class="info">
                  <div>${song.replaceAll("%20" , " ")}</div>
                  <div>Visible Nasir</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="img/play.svg" alt="" />
                </div>
                </li>`;
    }
    var audio = new Audio(songs[0]);
    audio.play();  

    audio.addEventListener("loadeddata" ,() =>{
        let duration = audio.duration;
        console.log(duration); 
    })
} 
 
main();
