export default class Grass {
    constructor(_, biome, x) {
        this.biome = biome;

        this.cycleX = x;
        this.w = _.width*3;
        this.pos = _.createVector(this.cycleX*this.w,0);

        switch (this.biome) {
            case 'grass':
                this.hue = 120;
                this.sat = 27;
            break;
            case 'water':
                this.hue = 184;
                this.sat = 80;
            break;
            case 'desert':
                this.hue = 50;
                this.sat = 50;
            break;
        }

    }

    draw(_, light, skylimit, x) {
        const sol1 = _.color('hsl('+this.hue+', '+ this.sat +'%, ' + (11 + light /2) + '%)');
        _.fill(sol1);
        _.rect(this.pos.x, skylimit - 40, this.w+5, _.height);

        const sol2 = _.color('hsl('+this.hue+', '+ this.sat +'%, ' + (16 + light /2) + '%)');
        _.fill(sol2);
        _.rect(this.pos.x, skylimit - 70, this.w+5, 30);
        const sol3 = _.color('hsl('+this.hue+', '+ this.sat +'%, ' + (20 + light /2) + '%)');
        _.fill(sol3);
        _.rect(this.pos.x, skylimit - 90, this.w+5, 20);
        const sol4 = _.color('hsl('+this.hue+', '+ this.sat +'%, ' + (24 + light /2) + '%)');
        _.fill(sol4);
        _.rect(this.pos.x, skylimit - 100, this.w+5, 10);
        if(this.biome != 'water') {
            //route
             _.fill('#191012');
             _.rect(this.pos.x, skylimit - 10, this.w+5, 10);
             this.pos.add(_.createVector(-5,0));
        } else {
        }

        if(this.pos.x < -this.w) {
            this.pos = _.createVector(this.w,0);
        }
    }
}