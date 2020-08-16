export default class Tree {
    constructor(_, map, overlay) {
        this.w = 200;
        this.h = 200;

        this.pos = _.createVector(
            _.width + _.random(-this.w*1.5,this.w*1.5) + this.w *1.5,
            _.height - map.altitude - this.h + overlay
        );
    }

    draw(_) {
        _.noStroke();
        _.fill('#4D352D');
        _.rect(this.pos.x, this.pos.y + this.h/4 *3, this.w / 10, this.h/4);
        _.push();
            _.translate(this.pos.x, this.pos.y);
            _.angleMode(_.RADIANS); 
            _.rotate(_.QUARTER_PI);

            _.fill('#3C683C');
            _.rect(-24, -32, this.w / 7, this.h / 7);
            _.rect(-10, -20, this.w / 5, this.h / 5);
            _.fill('#345B34');
            _.rect(10, 0, this.w / 4, this.h / 4);
            _.fill('#2D4E2D');
            _.rect(30, 18, this.w / 2.75, this.h / 2.75);
            _.fill('#254125');
            _.rect(48, 35, this.w / 2.5, this.h / 2.5);

            _.fill('#4D352D');
            _.rect(138, 123,  this.w / 12, this.h / 12);
        _.pop();
    }

    update(_) {
        this.pos.add(_.createVector(-5,0));
    }

    isVisible() {
        return this.pos.x > -this.w; 
    }

}