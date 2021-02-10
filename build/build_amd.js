const rollup  = require('rollup');
const resolve =require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const replace = require("./replace.js");
const async = require("async");

const transforms = {
    arrow: false,
    classes: true,
    letConst : false
};



const build_AMD = function( done ){
   
    rollup.rollup({
        input : 'src/demo.es6.js',
        external: ['../node_modules/three/build/three.module.js', '../../node_modules/three/build/three.module.js', 'three'],
        
        plugins:[

            resolve(),
            
            buble({
				transforms: transforms
			})
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/demo.amd.js',

            plugins:[
                replace({
                    "../node_modules/three/build/three.module" : "three",
                    "../../node_modules/three/build/three.module" : "three"
                })
            ],
            
            format: 'amd',
            name: 'three',
            exports: 'named',
            sourcemap: true
          });
          done( );
    }).catch(
        ( err ) => {
            done( err );
        }
    );
};


const build_amd = function( done ){
    async.series([
        build_AMD
    
    ], function( err, data ){
        done();
    });
};

module.exports = build_amd;