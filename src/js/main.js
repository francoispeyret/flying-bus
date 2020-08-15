import * as p5 from "p5";
//import * as p5moduleSound from  "p5/lib/addons/p5.sound";

import Map from "./classes/map";
import Bus from "./classes/bus";
import Cloud from "./classes/cloud";
import Tree from "./classes/tree";


let s = (_) => {
    let debug   = false;

    let map = null;
    let bus = null;
    let cloudController = [];
    let treeController1 = [];
    let treeController2 = [];

    let imgMoon = null;

    _.preload = () => {
        imgMoon = _.loadImage('./assets/images/moon.png');
    };

    _.setup = () => {
        let canvas = _.createCanvas(_.windowWidth, _.windowHeight);
        canvas.parent('game');
        _.frameRate(60);
        
        map = new Map(_,imgMoon);
        bus = new Bus(_);
        cloudController.push(new Cloud(_));
        treeController1.push(new Tree(_, map, _.random(25,90)));
        treeController2.push(new Tree(_, map, _.random(-10,-25)));
    };

    _.draw = () => {
        map.draw(_);
        for(let t = 0; t < treeController2.length; t++) {
            treeController2[t].draw(_);
            treeController2[t].update(_);
            if(!treeController2[t].isVisible()) {
                treeController2.splice(t,1);
                t--;
            }
        }
        bus.draw(_);
        bus.update(_, map);
        for(let c of cloudController) {
            c.draw(_);
            c.update(_);
        }
        if( _.frameCount % 300 == 0 && cloudController.length < 6) {
            cloudController.push(new Cloud(_));
        }
        for(let t = 0; t < treeController1.length; t++) {
            treeController1[t].draw(_);
            treeController1[t].update(_);
            if(!treeController1[t].isVisible()) {
                treeController1.splice(t,1);
                t--;
            }
        }
        if( _.frameCount % 180 == 0 && treeController1.length < 6) {
            treeController1.push(new Tree(_, map, _.random(25,90)));
        }
        if( _.frameCount % 180 == 0 && treeController2.length < 6) {
            treeController2.push(new Tree(_, map, _.random(-10,-25)));
        }
    };

    window.addEventListener('blur', (e) => {

    });

    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 40:
                bus.moveDown(_);
            break;
            case 38:
                bus.moveUp(_);
        }
    });

    window.addEventListener('resize',() => {
        _.resizeCanvas(_.windowWidth, _.windowHeight);
    });
};

const P5 = new p5(s);