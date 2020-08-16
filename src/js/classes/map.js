
import Mountain from "./mountain";
import House from "./house";
import Ground from "./ground";

export default class Map {
    constructor(_, imgMoon){
        this.altitude = 150;

        this.biome = {
            i: 0,
            period: 180,
            name: 'grass'
        };

        this.grass = new Ground(_, 'grass', 0);
        this.desert = new Ground(_, 'desert', 1);
        this.water = new Ground(_, 'water', 0);

        this.mountainLarge = new Mountain(_, 'large');
        this.mountainMini = new Mountain(_, 'mini');


        this.sunR = -_.height/3;
        this.sunPos = _.createVector(_.width/2, this.sunR);
        this.sunHue = 37;
        this.sunLight = 79;

        this.moonImg = imgMoon;
        this.moonPos = _.createVector(_.width/2, this.sunR);

        this.light = 50;
        this.cycle = 'sun';
        this.timeSpeed = .1;

        this.skyLimit = window.innerHeight - this.altitude;
        this.house = new House(_, this);

        this.time = 0;

    }

    draw(_, sounds) {
        this.time++;
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

        this.mountainLarge.draw(_, this.light);
        this.mountainMini.draw(_, this.light);

        this.house.draw(_, this.light);
        this.house.update(_);

        // biome 
        //this.biome.i += 5;
        this.grass.draw(_, this.light, this.skyLimit);
        this.desert.draw(_, this.light, this.skyLimit);
        

        if(0 == 1) {
            this.water.draw(_, this.light, this.skyLimit);
        }


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
                //sounds.owl.play();
                sounds.blackbird.stop();
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
                sounds.blackbird.play();
                sounds.owl.stop();
            } else {
                this.moonPos.add(_.createVector(0, this.timeSpeed));
            }
        }
    }

}