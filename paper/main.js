import Space from './classes/Space.js';

paper.install(window);

window.onload = init;

function init(){
    startPaper();
}


function startPaper(){
    paper.setup("mainCanvas");
    var space = new Space();
}