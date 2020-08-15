export default class Mountain {
    constructor(_) {
        this.reset(_);
    }

    reset(_) {
        this.pos = _.createVector(_.width*2, _.height);
    }

    draw(_) {
        _.noStroke();
        
        _.fill('#B1D2B1');
        _.push();
            _.translate(this.pos.x, this.pos.y);
            _.beginShape();
            _.vertex(-_.width, 0);
            _.vertex(0, -_.height/1.5);
            _.vertex(_.width, 0);
            _.endShape(_.CLOSE);

            _.fill('#fff');
            _.beginShape();
            _.vertex(-_.width/4, -_.height/2);
            _.vertex(0, -_.height/1.5);
            _.vertex(_.width/4, -_.height/2);
            _.endShape(_.CLOSE);
        _.pop();

        this.pos.add(_.createVector(-1,0));

        if(this.pos.x < -_.width) {
            this.reset(_);
        }

    }

}