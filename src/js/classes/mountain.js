export default class Mountain {
    constructor(_, size) {
        this.reset(_);
        this.size = size == 'large' ? _.width : _.width/3;
    }

    reset(_) {
        this.pos = _.createVector(_.width + this.size, _.height);
    }

    draw(_, light) {
        _.noStroke();
        
        const moutainColor = _.color('hsl(32, 20%, ' + (35 + light /2) + '%)');
        //_.fill('#B1D2B1');
        _.fill(moutainColor);
        _.push();
            _.translate(this.pos.x, this.pos.y);
            _.beginShape();
            _.vertex(-this.size, 0);
            _.vertex(0, -_.height/1.5);
            _.vertex(this.size, 0);
            _.endShape(_.CLOSE);

            const snowColor = _.color('hsl(52, 94%, ' + (94 + light/1.5) + '%)');
            _.fill(snowColor);
            _.beginShape();
            _.vertex(-this.size/4, -_.height/2);
            _.vertex(0, -_.height/1.5);
            _.vertex(this.size/4, -_.height/2);
            _.endShape(_.CLOSE);
        _.pop();

        this.pos.add(_.createVector(-1,0));

        if(this.pos.x < -this.size) {
            this.reset(_);
        }

    }

}