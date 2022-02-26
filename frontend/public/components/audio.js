class Sounds {

    constructor() {
        this.soundsObj = {
            "openingDoor": {
                "flag": false,
                "isMuted": false,
                "isInLoop": false,
                "file": new Audio("./sounds/Sound-Button-Effect-Sliding.wav")
            },
            "change": {
                "flag": false,
                "isMuted": false,
                "isInLoop": false,
                "file": new Audio("./sounds/change.wav")
            },
            "sakuya": {
                "flag": false,
                "isMuted": false,
                "isInLoop": false,
                "file": new Audio("./sounds/Sakuya-Background-Sound.wav")
            }
        }
    }

    playMusic(_sound) {
        if (!this.soundsObj[_sound].flag) {
            this.soundsObj[_sound].flag = true;
            if (!this.soundsObj[_sound].isInLoop) {
                setTimeout(() => {
                    this.soundsObj[_sound].flag = false;
                }, parseInt((this.soundsObj[_sound].file.duration - this.soundsObj[_sound].file.currentTime) * 1000))
            }
            this.soundsObj[_sound].file.play();
            //console.log(this.soundsObj[_sound].file.currentTime);
        }
    }
    pausedMusic(_sound) {
        if (this.soundsObj[_sound].flag) {
            //console.log("pausa");
            this.soundsObj[_sound].file.pause();
            this.soundsObj[_sound].flag = false;
           // console.log(this.soundsObj[_sound].file.currentTime);
        }
    }
    mutedAll() {
        Object.keys(this.soundsObj).forEach(el => {
            if (this.soundsObj[el].flag) {
                if (this.soundsObj[el].isMuted) {
                    this.soundsObj[el].file.muted = false;
                    this.soundsObj[el].isMuted = false;
                    //console.log(this.soundsObj[el].file.currentTime);
                }
                else if (!this.soundsObj[el].isMuted) {
                    this.soundsObj[el].file.muted = true;
                    this.soundsObj[el].isMuted = true;
                    //console.log(this.soundsObj[el].file.currentTime);
                }
            }
        });
    }
    loopMusic(_sound) {
        if (this.soundsObj[_sound].isInLoop) {
            this.soundsObj[_sound].file.loop = false;
            this.soundsObj[_sound].isInLoop = false;
            //console.log(this.soundsObj[_sound].isInLoop, this.soundsObj[_sound].file.loop);
        }
        else if (!this.soundsObj[_sound].isInLoop) {
            this.soundsObj[_sound].file.loop = true;
            this.soundsObj[_sound].isInLoop = true;
            //console.log(this.soundsObj[_sound].isInLoop, this.soundsObj[_sound].file.loop);
        }
    }

}

const sound = new Sounds();

export {Sounds, sound};