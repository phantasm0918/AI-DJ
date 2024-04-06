function setup(){
    C1 = createCanvas(500 , 450)
    C1.center()
    vid = createCapture(VIDEO )
    vid.hide()
    MyModel = ml5.poseNet(vid , modelLoaded)
    MyModel.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("Model is loaded.")
}

LWX = 0
LWY = 0
RWX = 0
RWY = 0
kprw = 0
kplw = 0

function gotPoses(results){
    if(results.length > 0){
        LWX = results[0].pose.leftWrist.x
        LWY = results[0].pose.leftWrist.y
        RWX = results[0].pose.rightWrist.x
        RWY = results[0].pose.rightWrist.y
        kprw = results[0].pose.keypoints[10].score
        kplw = results[0].pose.keypoints[9].score
        console.log("left wrist X : ", LWX)
        console.log("left wrist y : ", LWY)
        console.log("Right wrist X : ", RWX)
        console.log("Right wrist y : ", RWY)
        console.log("Right wrist detection score : ", kprw)
        console.log("Left wrist detection score : ", kplw)
    }

}

function draw(){
    image(vid , 0 ,0 , 500 ,450)
    if(kprw>0.2){
       fill("red")
    circle(RWX, RWY, 20)
    if(RWY>0 && RWY<100) {
        sound.rate(0.5)
        document.getElementById("speed").innerHTML = "speed : 0.5x"
    }
    else if(RWY>100 && RWY<200) {
        sound.rate(1)
        document.getElementById("speed").innerHTML = "speed : 1x"
    }
    else if(RWY>200 && RWY<300) {
        sound.rate(1.5)
        document.getElementById("speed").innerHTML = "speed : 1.5x"
    }
    else if(RWY>300 && RWY<400) {
        sound.rate(2)
        document.getElementById("speed").innerHTML = "speed : 2x"
    }
    else if(RWY>400) {
        sound.rate(2.5)
        document.getElementById("speed").innerHTML = "speed : 2.5x"
    }
    }

   if(kplw>0.2){
    fill("blue")
    circle(LWX, LWY, 20)
    if(LWY>0 && LWY<100){
        sound.setVolume(0.2)
        document.getElementById("volume").innerHTML = "volume : 20%"
    }
    else if(LWY>100 && LWY<200){
        sound.setVolume(0.4)
        document.getElementById("volume").innerHTML = "volume : 40%"
    }
    else if(LWY>200 && LWY<300){
           sound.setVolume(0.6)
           document.getElementById("volume").innerHTML = "volume : 60%"
    }
    else if(LWY>300 && LWY<400){
        sound.setVolume(0.8)
            document.getElementById("volume").innerHTML = "volume : 80%"
        }
    else if(LWY>400){
        sound.setVolume(1)
       document.getElementById("volume").innerHTML = "volume : 100%"
        
    }
   }
}



sound = ""

function preload(){
    sound = loadSound("music.mp3")
}

function play(){
    sound.play()
    sound.setVolume(1)
    sound.rate(1)
}


