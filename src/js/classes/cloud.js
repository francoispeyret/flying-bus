export default class Cloud {
    constructor(_) {
        this.reset(_);

        this.shape = Math.floor(_.random(0,2));
    }

    reset(_) {
        this.vel = _.random(-3,-1);
        this.pos = _.createVector(_.width + 100, _.random(_.height / 15, _.height / 2));
    }

    draw(_) {
        _.noStroke();
        _.fill(255,120);

        switch(this.shape) {
            case 0:
                _.circle(this.pos.x, this.pos.y, 80);
                _.circle(this.pos.x - 30, this.pos.y-20, 45);
                _.circle(this.pos.x - 10, this.pos.y-5, 45);
                _.circle(this.pos.x - 40, this.pos.y+15, 50);
                _.circle(this.pos.x - 65, this.pos.y+28, 30);
                _.circle(this.pos.x + 32, this.pos.y+12, 60);
                _.circle(this.pos.x + 58, this.pos.y+15, 40);
            break;
            case 1:
                _.circle(this.pos.x, this.pos.y, 80);
                _.circle(this.pos.x + 22, this.pos.y-20, 45);
                _.circle(this.pos.x - 15, this.pos.y+2, 45);
                _.circle(this.pos.x - 40, this.pos.y+15, 50);
                _.circle(this.pos.x - 41, this.pos.y-11, 30);
                _.circle(this.pos.x + 32, this.pos.y+12, 60);
            break;
        }

    }

    update(_) {
        this.pos.add(_.createVector(this.vel,0));
        if(this.pos.x < -100) {
            this.reset(_);
        }
    }

}