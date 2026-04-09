/* 1. The initiation section using variables and login data*/
/* 2. The character sectionfor changing sprites and backgrounds */ 
let scene;
let sceneData; 
async function initGame() {
    const response= await fetch (dialogues.json);
    sceneData= await response.json();
    scene= sceneData["start"];
} 
async function render() {
    document.getElementById("txt").innerHTML = scene.txt;
    document.body.style.backgroundImage = `url(${scene.bg})`;
    document.getElementById("c1").src = scene.c1; 
    document.getElementById("c2").src = scene.c2;
    
}
function renderChoices() {
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
  await render(); 
 }

 /*TODO: Add typewriter effect for text*/
 /*TODO: Temporarily save in localStorage and later to PostgreSQL using pg in Node.js */ 