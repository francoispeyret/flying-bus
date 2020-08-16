export default class House {
    constructor(_, map) {
        this.w = 200;
        this.h = 200;

        this.pos = _.createVector(
            _.width + this.w,
            _.height - map.altitude - this.h
        );
    }

    draw(_, light) {
        _.noStroke();
        const houseColor = _.color('hsl(38, 8%, ' + (25 + light /2) + '%)');
        _.fill(houseColor);
        _.rect(this.pos.x - this.w /2, this.pos.y + this.h/12, this.w, this.h / 2);

        const houseRoofColor = _.color('hsl(1, 51%, ' + (25 + light /2) + '%)');
        _.fill(houseRoofColor);
        _.push();
            _.translate(this.pos.x + this.w/2.7, this.pos.y + this.h / 12);
            _.beginShape();
            _.vertex(-this.w/1.4 - this.w / 5, 0);
            _.vertex(-this.w / 5, -this.h/3);
            _.vertex(this.w/4 - this.w / 10, 0);
            _.endShape(_.CLOSE);
        _.pop();
    }

    update(_) {
        this.pos.add(_.createVector(-3,0));
        if(this.pos.x < -this.w) {
            this.pos.x = _.width + this.w;
        }
    }

    isVisible() {
        return this.pos.x > -this.w; 
    }

}