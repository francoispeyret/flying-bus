
import Mountain from "./mountain";

export default class Map {
    constructor(_, imgMoon){
        this.altitude = 150;
        this.mountain = new Mountain(_);

        this.sunR = -_.height/3;
        this.sunPos = _.createVector(_.width/2, this.sunR);
        this.sunHue = 37;
        this.sunLight = 79;

        this.moonImg = imgMoon;
        this.moonPos = _.createVector(_.width/2, this.sunR);

        this.light = 50;
        this.cycle = 'sun';
        this.timeSpeed = 1;

        this.skyLimit = window.innerHeight - this.altitude;

    }

    draw(_) {
        //const this.skyLimit = window.innerHeight - this.altitude;
        _.noStroke();
        
        // ciel
        const ciel = _.color('hsl(198, 100%, ' + (14 + this.light) + '%)');
        _.fill(ciel);
        _.rect(0, 0, _.width, this.skyLimit);
        // soleil
        const soleil = _.color('hsl('+this.sunHue+', 81%, '+this.sunLight+'%)');
        _.fill(soleil);
        _.circle(this.sunPos.x,this.sunPos.y, this.sunR);
        // moon
        _.push();
        _.translate(this.moonPos.x -  this.sunR /2, this.moonPos.y - this.sunR / 2);
        _.image(this.moonImg, 0, 0, this.sunR, this.sunR);
        _.pop();

        this.mountain.draw(_);

        _.fill('#3A643A');
        _.rect(0, this.skyLimit, _.width, _.height - this.skyLimit);
        _.fill('#191012');
        _.rect(0, this.skyLimit - 10, _.width, 10);
        _.fill('#3A643A');
        _.rect(0, this.skyLimit - 40, _.width, 30);
        _.fill('#437543');
        _.rect(0, this.skyLimit - 70, _.width, 30);
        _.fill('#4A824A');
        _.rect(0, this.skyLimit - 90, _.width, 20);
        _.fill('#528E52');
        _.rect(0, this.skyLimit - 100, _.width, 10);

        //console.log(this.sunPos.y);
        if(this.cycle == 'sun') {
            if(this.sunPos.y < _.height - _.height/4) {
                this.light = 50;
            }
            else {
                this.light = _.map(this.sunPos.y,  _.height - _.height/4,  _.height - this.sunR, 50, 0);
            }
            if(this.sunPos.y < _.height - _.height/2.5) {
                this.sunHue = 37;
                this.sunLight = 79;
            }
            else {
                this.sunHue = Math.floor(_.map(this.sunPos.y,  _.height - _.height/2.5,  this.skyLimit, 37, 19));
                this.sunLight = Math.floor(_.map(this.sunPos.y,  _.height - _.height/2.5,  this.skyLimit, 79, 60));
            }
            if(this.sunPos.y > _.height - this.sunR) {
                this.sunPos.y = this.sunR;
                this.cycle = 'moon';
            } else {
                this.sunPos.add(_.createVector(0, this.timeSpeed));
            }
        } else if(this.cycle == 'moon') {
            if(this.moonPos.y < _.height - _.height/4)
                this.light = 0;
            else
                this.light = _.map(this.moonPos.y, _.height - _.height/4,  _.height - this.sunR, 0, 50);
            if(this.moonPos.y > _.height - this.sunR) {
                this.moonPos.y = this.sunR;
                this.cycle = 'sun';
            } else {
                this.moonPos.add(_.createVector(0, this.timeSpeed));
            }
        }


    }

}