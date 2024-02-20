let quotetext = document.querySelector(".quote");
let authortext = document.querySelector(".name");
let newquotebtn = document.querySelector("button");
let speech = document.querySelector(".sound");
let copybtn = document.querySelector(".copytext");
const synth = speechSynthesis;
      
async function ranquote() {
  // let rem = math.floor(math.random()*100);
  newquotebtn.classList.add("loading");
  newquotebtn.innerText = "Loading Quote...";
  fetch("https://api.quotable.io/random").then(Response => Response.json()).then(quotes => {
    console.log(quotes);
    quotetext.innerHTML= quotes.content;
    authortext.innerHTML=quotes.author;
    newquotebtn.classList.remove("loading");
        newquotebtn.innerText = "New Quote";
  });
}

newquotebtn.addEventListener("click", ()=>{
  ranquote();
})

speech.addEventListener("click", ()=>{
  if(!newquotebtn.classList.contains("loading")){
      let utterance = new SpeechSynthesisUtterance(`${quotetext.innerText} by ${authortext.innerText}`);
      synth.speak(utterance);
      setInterval(()=>{
          !synth.speaking ? speech.classList.remove("active") : speech.classList.add("active");
      }, 10);
  }
});

copybtn.addEventListener("click", ()=>{
  navigator.clipboard.writeText(quotetext.innerText);
  alert("text copied");
});

    

ranquote();