import { readable, get, Readable } from "svelte/store";

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

const waitForGlobal = function (key, callback) {
  if (window[key]) {
    callback();
  } else {
    setTimeout(function () {
      waitForGlobal(key, callback);
    }, 100);
  }
};

waitForGlobal("AWS", () => {
  // @ts-ignore
  const AWS = window.AWS;
  AWS.config.region = "us-east-1";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: "us-east-1:86757086-0139-401a-9ecc-e8f0520a0b64" });
});

// add stress using ˈ
function convert(inputText) {
  const parts = inputText.toLowerCase().split("");
  const words = parts
    .map((item) => {
      if (item === " ") return " ";
      if (item === "-") return " ";
      if (!phonemes[item]) return "";
      return phonemes[item];
    })
    .join("");
  const output = words
    .split(" ")
    .map((str) => {
      const regex = /\w{1}[aeiou]{1}\w?[aeiou]?$/gm;
      const match = str.match(regex);
      let result = str;
      if (match) {
        result = str.replace(regex, "ˈ" + match[0]);
      }
      return result;
    })
    .join(" ");
  console.log(output);
  return output;
}

function translateText(inputText: string) {
  // @ts-ignore
  const AWS = window.AWS;
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
  return new Promise<string>((resolve, reject) => {
    signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
      if (error) {
        reject(error);
      } else {
        resolve(url);
      }
    });
  });
}

export function useAudioTranslate(inputText: string): [() => void] {
  const play = async () => {
    const url = await translateText(inputText);
    var audio = new Audio(url);
    audio.play();
  };
  return [play];
}
