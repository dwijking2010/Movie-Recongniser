video="";
objects=[];
status="";

 function preload(){
     video=createVideo('video.mp4');
     video.hide();

 }

function setup(){
canvas=createCanvas(480, 380);
canvas.center();

}


function start(){
    objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML="status: detecting the objects";
}
 
function modelLoaded(){
    console.log("model is loaded and it is working fine");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1.5);
}

function draw(){
    image(video, 0, 0 , 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML='Status : Object Is Detected';
            document.getElementById("number_of_objects").innerHTML='Number_Of_Object Detected are : ' +  objects.length;
        fill("#FF0000");
        percent = floor(objects[i].confidence* 100);
        text(objects[i].label+" "+ percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height );
        }
    }
    
}

function gotResult(error, results){
if (error){
    console.log(error);
}
console.log(results);
objects = results;

}
    