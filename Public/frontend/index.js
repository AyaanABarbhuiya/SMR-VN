
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
  const txt = document.getElementById("txt");
  txt.innerHTML = ""; 

  if (scene.bg) {
    document.body.style.backgroundImage =`url(${scene.bg})`; 
  } //Ekta starting image lgao, backticks is sus
   var blocks = scene.txt.split(/(\[.*?\])/g) ;

   for (block of blocks) {
  if (block.startWith('[') && block.endsWith(']')) {
  //Command, execute khro
  var instruction = block.slice(1, -1).split(':'); 
  var cmd = instruction[0];
  var val = instruction[1];

  if (cmd === 'bg'){
    document.body.style.backgroundImage = `url(${val})`;
  }
 
  else { //typewriter zindabad!
    for (var i = 0; i < block.length; i++) {
      txt.innerHTML += block.charAt(i) 
      await new Promise( resolve => setTimeout(resolve,50));

     } /* Will Cry if ts fails*/ }

     } //brackets kinda murky here
  }
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



































