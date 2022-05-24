<script lang="ts">
  import { Speakerphone } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { onMount } from "svelte";

  let AWS ;
  let audioPlayback, audioSource;

  export let text = "";
  let ready = false;
  let audioUrl = ''

  $:{
    if(ready){
      AWS = window.AWS
    }
  }
  $:{
    if(AWS){
      AWS.config.region = "us-east-1";
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: "us-east-1:86757086-0139-401a-9ecc-e8f0520a0b64" });
      translateText(text, ready)
      audioPlayback.load()
    }
  }
   

  const phonemes = {
    a: "a",
    e: "e",
    i: "i",
    o: "o",
    u: "u",
    b: "b",
    d: "d",
    f: "f",
    g: "g",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    p: "p",
    r: "r",
    s: "s",
    t: "t",
    v: "v",
    j: "dʒ",
  };


  function convert(inputText) {
    const parts = inputText.toLowerCase().split("");
    return parts.map((item) => {
      if (item === " ") return " ";
      if (item === "-") return " ";
      if (!phonemes[item]) return "";
      return phonemes[item];
    }).join('');
  }

  // Function invoked by button click
  function translateText(inputText) {

    const convertedText = convert(inputText);

    // Create the JSON parameters for getSynthesizeSpeechUrl
    var speechParams = {
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: "",
      TextType: "ssml",
      VoiceId: "Matthew",
    };

    speechParams.Text = `<phoneme alphabet="ipa" ph="${convertedText}"></phoneme>`;

    // Create the Polly service object and presigner object
    let polly = new AWS.Polly({ apiVersion: "2016-06-10" });
    let signer = new AWS.Polly.Presigner(speechParams, polly);

    // Create presigned URL of synthesized speech file
    signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
      if (error) {
        console.error(error);
      } else {
        audioUrl = url;
        audioPlayback.load()
      }
    });
  }

  function speakText(){
    translateText(text)
    audioPlayback.play();
  }


</script>

<svelte:head>
  <script on:load={()=>ready=true} src="https://sdk.amazonaws.com/js/aws-sdk-2.410.0.min.js"></script>
</svelte:head>

<button
  type="button"
  on:click={speakText}
  class="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray bg-gray-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  ><Icon src={Speakerphone} theme="" class="color-gray-900 h-6 w-6" /></button
>
<audio class="ml-2" id="audioPlayback" bind:this={audioPlayback} >
  <source id="audioSource" type="audio/mp3" src={audioUrl} bind:this={audioSource} />
</audio>

