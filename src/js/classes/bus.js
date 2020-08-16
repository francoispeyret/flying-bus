import p5 from 'p5/lib/p5';
import * as p5moduleSound from  "p5/lib/addons/p5.sound";

export default class Bus {
    constructor(_, sounds) {
        this.pos = _.createVector(150, 100);
        this.w = 340;
        this.h = 150;

        this.moveDirection = {
            up: false,
            right: false
        };
        this.moveMethodIteration = {
            up: 0,
            right: 0
        };

        this.angle = 0;
        this.angleIteration = 0;

        this.time = 0;

        this.motor = {
            i:0,
            sound1: new p5.Oscillator(),
            sound2: new p5.Oscillator(),
            sound3: new p5.Oscillator(),
        };

        this.motor.sound1.setType('triangle');
        this.motor.sound2.setType('triangle');
        this.motor.sound3.setType('triangle');
        this.motor.sound1.amp(.02);
        this.motor.sound2.amp(.08);
        this.motor.sound3.amp(.12);

        this.sounds = sounds;

        
    }

    draw(_) {
        //console.log(this.pos.x);
        _.push();

            _.translate(this.pos.x, this.pos.y - this.h/2);
            _.rotate(_.createVector(50, this.pos.y).limit(50).heading() - _.HALF_PI +_.QUARTER_PI/13);

            _.noFill();
            _.stroke(0);
            //_.rect(this.pos.x, 0, this.w, this.h);
            _.noStroke();

            _.fill(255);
            _.rect(0, 0, this.w, this.h - 20);
            _.beginShape();
                _.vertex(0, 0);
                _.vertex(0, -40);
                _.vertex(this.w / 15, -40);
                _.vertex(this.w / 7, 0);
            _.endShape(_.CLOSE);

            _.fill('#8F2F28');
            _.rect(0, 0 + this.h / 2.2, this.w, this.h / 5);


            _.fill('#222');
            _.circle(0 + this.w / 10, 0 + this.h - this.w / 14, this.w / 7);
            _.circle(0 + this.w / 4, 0 + this.h - this.w / 14, this.w / 7);
            _.circle(0 + this.w / 1.3, 0 + this.h - this.w / 14, this.w / 7);
            _.fill('#666');
            _.circle(0 + this.w / 10, 0 + this.h - this.w / 14, this.w / 15);
            _.circle(0 + this.w / 4, 0 + this.h - this.w / 14, this.w / 15);
            _.circle(0 + this.w / 1.3, 0 + this.h - this.w / 14, this.w / 15);
            _.fill('#999');
            _.stroke('#999');
            _.strokeWeight(3);
            _.push();
                _.translate(this.w / 10, this.h - this.w / 14);
                _.rotate(this.time+0.3)
                _.line(0,-10,0,10);
            _.pop();
            _.push();
                _.translate(this.w / 4, this.h - this.w / 14);
                _.rotate(this.time+0.45)
                _.line(0,-10,0,10);
            _.pop();
            _.push();
                _.translate(this.w / 1.3, this.h - this.w / 14);
                _.rotate(this.time)
                _.line(0,-10,0,10);
            _.pop();

            _.noStroke();

            _.fill('#d1f1ff');
            _.rect(0 + this.w - this.w / 10, 0, this.w/10, this.h / 2.5 );
            _.rect(0 + this.w - this.w / 3, 0, this.w/5, this.h / 1.8 );
            _.rect(0 + this.w - this.w / 1.75, 0, this.w/5, this.h / 1.8 );
            _.rect(0 + this.w - this.w / 1.235, 0, this.w/5, this.h / 1.8 );

            _.fill('#ccc');
            _.rect(0, 0, this.w, this.h / 15);
            _.rect(0 + this.w - 10, 0 + this.h - this.h / 2.9, 10, this.h / 4.75);
            _.rect(0, 0, this.w/30, this.h / 2.2 );

            
            const offsetY = _.map(this.pos.y, 0, _.height, -50, 90)
            const color = _.map(offsetY, -50, 90, 160, 255)
            _.fill(color);
            _.beginShape();
                _.vertex(this.w / 1.45, this.h - 30);
                _.vertex(this.w / 2, this.h - 30 + offsetY);
                _.vertex(this.w / 2.75, this.h - 30 + offsetY);
                _.vertex(this.w / 2.75, this.h - 30);
            _.endShape(_.CLOSE);

        _.pop();
    }

    update(_, map) {
        if(this.pos.y >  window.innerHeight - 350) {
            this.time += .1;
        }
        if(this.pos.y >  window.innerHeight - 250 &&
            this.pos.y <  window.innerHeight - 240 &&
             this.sounds.bump.isPlaying()==false)
            this.sounds.bump.play();
        if(this.pos.x - this.w > _.width) {
            this.pos.x = -this.w;
        }
        if(this.pos.x < -this.w*2) {
            this.pos.x = _.width + this.w /2;
        }
        if(window.innerHeight - map.altitude > this.pos.y + this.h /2 +5) {
            this.pos.add(_.createVector(0,3));
        }
        this.moveMethod(_);
        this.motor.sound1.freq(73.4 + this.motor.i   + _.abs(5*3));
        this.motor.sound2.freq(43.6 + this.motor.i*3 + _.abs(5*2));
        this.motor.sound3.freq(27.5 + this.motor.i*2 + _.abs(5));
        if(this.motor.i == 0) {
            this.motor.sound1.start();
            this.motor.sound2.start();
            this.motor.sound3.start();
        }
        this.motor.i++;
        if(this.motor.i>10) {
            this.motor.i = 1;
        }
    }

    moveUp(_) {
        //this.pos.add(_.createVector(0,-2));
        this.moveDirection.up = true;
        this.moveMethodIteration.up = 0;
        this.angleIteration = 0;
    }
    moveRight(_) {
        this.moveDirection.right = true;
        this.moveMethodIteration.right = 0;
        this.angleIteration = 0;
    }
    moveDown(_) {
        //this.pos.add(_.createVector(0,1));
    }

    moveMethod(_) {
        if(this.angleIteration < 90) {
            this.angleIteration++;
        } else {
            this.angleIteration = 0;
            this.moveDirection.right = false;
            this.angle = 0;
        }
        if(this.moveDirection.up && this.moveMethodIteration.up < _.QUARTER_PI) {
            //console.log(this.moveMethodIteration.up);
            if(this.moveMethodIteration.up == 0 && this.sounds.jump.isPlaying()==false) {
                this.sounds.jump.play();
            }

            this.moveMethodIteration.up = this.moveMethodIteration.up + _.QUARTER_PI/90;

            const force = -_.cos(this.moveMethodIteration.up) * 5;
            this.pos.add(_.createVector(0, force));


            const angleAmplitude = -.3;
            if(this.angleIteration < 45) {
                this.angle = _.map(this.angleIteration, 0, 90, 0, angleAmplitude);
            } else {
                this.angle = _.map(this.angleIteration, 0, 90,  angleAmplitude, 0);
            }
        } else {
            this.moveDirection.up = false;
            this.moveMethodIteration.up = 0;
        }
        if(this.moveDirection.right && this.moveMethodIteration.right < _.PI) {
            this.moveMethodIteration.right = this.moveMethodIteration.right - _.PI/45;

            const force = _.cos(this.moveMethodIteration.right) * 10;
            this.pos.add(_.createVector(force, 0));

            const angleAmplitude = -.1;
            if(this.angleIteration < 45) {
                this.angle = _.map(this.angleIteration, 0, 90, 0, angleAmplitude);
            } else {
                this.angle = _.map(this.angleIteration, 0, 90,  angleAmplitude, 0);
            }
        } else {
            this.moveDirection.right = false;
            this.moveMethodIteration.right = 0;
        }
    }
}