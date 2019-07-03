var sourceImage;
var video;
var currentFrame;
var tempSourceImage;
var rSlider;
var gSlider;
var bSlider;
var rValue=131;
var gValue=155;
var bValue=100;
var Y1;
var Y2;
var X1;
var X2;
var drawRect=false;
var targetImage;
function preload(){
    sourceImage=loadImage("./source3.jpg");
    targetImage=loadImage("./target1.jpg");

}
function setup(){
    createCanvas(sourceImage.width,sourceImage.height);
    video=createCapture(VIDEO);
    tempSourceImage=createImage(width,height);
    // rSlider=createSlider(0,255,120);
    // rSlider.position(20,20);
    // gSlider=createSlider(0,255,155);
    // gSlider.position(20,50);
    // bSlider=createSlider(0,255,100);
    // bSlider.position(20,80);
    Y1=0;
    Y2=height;
    X1=0;
    X2=width;
    createP("USE MOUSE TO ADJUST THE SIZE OF THE WEB CAM VIDEO(Click at the required region)")
}
function keyPressed(){
    if(keyCode==32){
        // if space bar is pressed
        // rValue=rSlider.value();
        // gValue=gSlider.value();
        // bValue=bSlider.value();
    }
}
function draw(){
    tempSourceImage.copy(sourceImage,0,0,width,height,0,0,width,height);
    currentFrame=video.get();
    // currentFrame=createImage(targetImage.width,targetImage.height);
    // currentFrame.copy(targetImage,0,0,targetImage.width,targetImage.height,0,0,targetImage.width,targetImage.height);
    currentFrame.resize(X2-X1,Y2-Y1);
    tempSourceImage.loadPixels();
    currentFrame.loadPixels();
    var currentFrameIndex=0;
    for(var i=Y1;i<Y2;i++){
        for(var j=X1;j<X2;j++){
            var index=(j+(i*width))*4;
            if(tempSourceImage.pixels[index+1]>=rValue && tempSourceImage.pixels[index]<=gValue && tempSourceImage.pixels[index+2]<=bValue && currentFrameIndex<currentFrame.pixels.length){
                tempSourceImage.pixels[index]=currentFrame.pixels[currentFrameIndex];
                tempSourceImage.pixels[index+1]=currentFrame.pixels[currentFrameIndex+1];
                tempSourceImage.pixels[index+2]=currentFrame.pixels[currentFrameIndex+2];
            }
            currentFrameIndex+=4;
        }
    }
    tempSourceImage.updatePixels();
    image(tempSourceImage,0,0,width,height);
    if(drawRect){   
        X2=mouseX;
        Y2=mouseY; 
        stroke(255,0,0);
        strokeWeight(2);
        noFill();
        rect(X1,Y1,(X2-X1),Y2-Y1);
    }
}
function mousePressed(){
    if(!drawRect){
        X1=mouseX;
        Y1=mouseY;

    }
    else{
        X2=mouseX;
        Y2=mouseY;
    }
    drawRect=!drawRect;
}