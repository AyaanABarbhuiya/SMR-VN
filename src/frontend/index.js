/* 1. The initiation section using variables and login data*/
/* 2. The character sectionfor changing sprites and backgrounds */ 
let scene;
let sceneData; 
async function initGame() {
    const response= await fetch (dialogues.json);
    sceneData= await response.json();
    const savedScene = localStorage.getItem('current'); // TOBE: REPLACED BY PG
    if (savedScene && sceneData[savedScene]){
      scene = sceneData[savedScene];}
      else { scene = sceneData["start"];}
   
} 
async function render() {
    await initGame(); 
    document.getElementById("txt").innerHTML = scene.txt;
    document.body.style.backgroundImage = `url(${scene.bg})`;
    document.getElementById("c1").src = scene.c1; 
    document.getElementById("c2").src = scene.c2;
     // Typewriter Engine
    var i = 0; 
    var speed = 100; 
    function typeWriter (){
    if (i < scene.txt.length) {
    document.getElementById("txt").innerHTML += scene.txt.charAt(i);
    i++;
    setInterval (typeWriter,speed); 
     }
  } 
  typeWriter ();
}

async function renderChoices() {
    await render(); 
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = ""; 
    
    if (scene.choices) {
        scene.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.className = "choice-btn"; 
            button.onclick = () => update(choice.next); 
            choicesContainer.appendChild(button);
        });
    } 
}
async function update(next) {
  scene = sceneData[next]; 
  localStorage.setItem('current', next); // TOBE: REPLACED BY PG
  await render(); 
 }



 /*TODO: Add typewriter effect for text*/



 /*TODO: Temporarily save in localStorage and later to PostgreSQL using pg in Node.js */ 