song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
Scoreleftwrist=0;
Scorerightwrist=0;
function preload()
{
    song=loadSound("music.mp3");
}
function setup()
{
Canvas=createCanvas(500,400);
Canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotposes);
}
function modelLoaded()
{
    console.log("Posenet is Initialized");
}
function gotposes(results)
{
if(results.length>0);
{
        Scoreleftwrist=results[0].pose.keypoints[9].score;
        Scorerighttwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist="+Scoreleftwrist+"scorerightwrist="+Scorerightwrist);
    console.log(results);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristX="+leftwristx+"leftWristY="+leftwristy);
rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
console.log("rightwristX="+rightwristx+"righWristY="+rightwristy);
}
}
function draw(){
image(video,0,0,500,400);

fill("#fc0330");
stroke("#0d0d0d");
if(Scorerightwrist>0.2) {
circle(rightwristx,rightwristy,20);
if(rightwristy>0 && rightwristy<=100)
{
    document.getElementById("speed").innerHTML="speed=0.5x"; 
    song.rate(0.5);  
}
else if(rightwristy>100 && rightwristy<=200)
{
    document.getElementById("speed").innerHTML="speed=1x"; 
    song.rate(1);  
}
else if(rightwristy>200 && rightwristy<=300)
{
    document.getElementById("speed").innerHTML="speed=1.5x"; 
    song.rate(1.5);  
}
else if(rightwristy>300 && rightwristy<=400)
{
    document.getElementById("speed").innerHTML="speed=2x"; 
    song.rate(2);  
}
else if(rightwristy>400 && rightwristy<=500)
{
    document.getElementById("speed").innerHTML="speed=2.5x"; 
    song.rate(2.5);  
}
}
if(Scoreleftwrist>0.2)
{
    circle(leftwristx,leftwristy,20);
InNumberleftwristy=Number(leftwristy);
remove_decimals = floor(InNumberleftwristy);
volume=remove_decimals/500;
document.getElementById("volume").innerHTML="volume ="+volume;
song.setVolume(volume);

}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
