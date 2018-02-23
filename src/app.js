(function () {
  const words = document.querySelector('.words');
  const resWords = document.querySelector('.response-words');

  // SpeechRecognition factory function
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // instance of SpeechRecognition method
  const recognition = new SpeechRecognition();

  // get interim/meta words that are in middle of being recognized while we speek
  recognition.interimResults = true;

  // Create Element to capture words and hook the created element to the DOM
  let para = document.createElement('p');
  words.appendChild(para);

  // Create Element to capture response words and hook the created element to the DOM
  let resPara = document.createElement('p');
  resWords.appendChild(resPara);
  

  // Result Event
  recognition.addEventListener('result', (e) => {
    const transcriptArray = Array.from(e.results);
    const transcript = transcriptArray
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    
    para.textContent = transcript;

    if(e.results[0].isFinal) {
      para = document.createElement('p');
      words.appendChild(para);
    }
    //console.log(transcript);

    // This will say the time
    if (transcript.includes('current time') || transcript.includes('the time')) {
      const date = new Date();
      resPara.textContent = `Current time is: ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}.`;
    }

  });

  // trigger result event again, after it stops listening
  recognition.addEventListener('end', recognition.start);

  // Start Listening
  recognition.start();
})();