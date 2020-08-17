export default class Tree {
    constructor(_, map, overlay, biome) {
        this.w = 200;
        this.h = 200;
        this.biome = biome;

        this.pos = _.createVector(
            _.width + _.random(-this.w*1.5,this.w*1.5) + this.w *1.5,
            _.height - map.altitude - this.h + overlay
        );
    }
        //dessin cactus
        // const cactus1 = _.color('hsl(99, 52%, ' + (28 + light /2.5) + '%)');
        //_.fill(cactus1);
        //_.rect(138, 123,  this.w / 25, this.h / 2.5);
        //_.rect(138, 133,  this.w / 25, this.h / 2.5);
        // const cactus2 = _.color('hsl(102, 61%, ' + (8 + light /2.5) + '%)');
        //_.fill(cactus2);
        //_.rect(138, 128,  this.w / 25, this.h / 2.5);
        //_.rect(138, 138,  this.w / 25, this.h / 2.5);
    draw(_, light) {
        switch(this.biome) {
            case 'grass':
                _.noStroke();
                _.fill('#4D352D');
                _.rect(this.pos.x, this.pos.y + this.h/4 *3, this.w / 10, this.h/4);
                _.push();
                    _.translate(this.pos.x, this.pos.y);
                    _.angleMode(_.RADIANS); 
                    _.rotate(_.QUARTER_PI);
        
                    const tree1 = _.color('hsl(120, 27%, ' + (12 + light /2.5) + '%)');
                    _.fill(tree1);
                    //_.fill('#3C683C');
                    _.rect(-24, -32, this.w / 7, this.h / 7);
                    _.rect(-10, -20, this.w / 5, this.h / 5);
                    const tree2 = _.color('hsl(120, 27%, ' + (8 + light /2.5) + '%)');
                    _.fill(tree2);
                    //_.fill('#345B34');
                    _.rect(10, 0, this.w / 4, this.h / 4);
                    const tree3 = _.color('hsl(120, 27%, ' + (4 + light /2.5) + '%)');
                    _.fill(tree3);
                    //_.fill('#2D4E2D');
                    _.rect(30, 18, this.w / 2.75, this.h / 2.75);
                    const tree4 = _.color('hsl(120, 27%, ' + (0 + light /2.5) + '%)');
                    _.fill(tree4);
                    //_.fill('#254125');
                    _.rect(48, 35, this.w / 2.5, this.h / 2.5);
        
                    _.fill('#4D352D');
                    _.rect(138, 123,  this.w / 12, this.h / 12);
                _.pop();
            break;
            case 'desert':
                _.push();
                    _.translate(this.pos.x, this.pos.y+70);
                    const cactus1 = _.color('hsl(99, 52%, 48%)');
                    _.fill(cactus1);
                    _.rect(138, 23,  this.w / 30, this.h / 2);
                    _.rect(152, 23,  this.w / 30, this.h / 2);
                    _.rect(110, 83,  this.w / 7, this.h / 30);
                    _.rect(110, 49,  this.w / 30, this.h / 5);
                    const cactus2 = _.color('hsl(102, 61%,20%)');
                    _.fill(cactus2);
                    _.rect((this.w / 30 + 138), 23,  this.w / 30, this.h / 2);
                    _.rect((this.w / 30 + 152), 23,  this.w / 30, this.h / 2);
                    _.rect((this.w / 30 + 110), (-this.w / 30 + 83),  this.w / 7-this.w / 30, this.h / 30);
                    _.rect((this.w / 30 + 110), 49,  this.w / 30, (-this.w / 30+this.h / 5));
                _.pop();
            break;
        }
    }

    update(_) {
        this.pos.add(_.createVector(-5,0));
    }

    isVisible() {
        return this.pos.x > -this.w; 
    }

}