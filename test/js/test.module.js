import * as THREE from '../../node_modules/three/build/three.module.js';
import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';
import { GUI } from '../../node_modules/dat.gui/build/dat.gui.module.js';
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js";

import WoodBox from './WoodBox.js';

import {Grassground} from '../../src/demo.module.js';


let VP = new Viewport();

VP = new Viewport();
VP.init();
VP.start();

let stats = new Stats();
document.body.appendChild( stats.dom );

VP.camera.position.z = 500;

VP.scene.background = new THREE.Color( 0xcccccc );

// add a ambient light
VP.scene.add( new THREE.AmbientLight( 0x020202 ) );

// add a light in front
let light	= new THREE.DirectionalLight('white', 2);
light.position.set(100, 100, 300);
VP.scene.add( light );


// src object for testing
let ground = new Grassground({
    width		: 2000,
    height		: 2000,
    repeatX		: 10,
    repeatY		: 10});
VP.scene.add(ground);

let box = new WoodBox();
box.position.y = 100;
VP.scene.add( box );


// render loop for your animations etc
VP.loop.add( function( delta, now ) {
    box.rotation.y += 0.01;
    stats.update();
});