const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS API key
const apiKey = "ab58ef7be9e24c1abb265edd774dc2c1";

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to our VoiceRSS API
function tellMe(joke) {
  // VoiceRSS variable is in the voice.js script
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.type === "single") {
      joke = data.joke;
    } else if (data.type === "twopart") {
      joke = data.setup + " ..." + data.delivery;
    }
    // Text-to-Speach
    tellMe(joke);
    // disable Button
    toggleButton();
  } catch (error) {
    console.log("whoops", error);
  }
}

// Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
