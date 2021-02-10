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

const build_ES = function( done ){
   
    rollup.rollup({
        input : 'src/demo.es6.js',
        external: ['../node_modules/three/build/three.module.js', '../../node_modules/three/build/three.module.js'],
        
        plugins:[
            
            resolve(),
            
            buble({
				transforms: transforms
            })
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/demo.module.js',
            plugins:[
                
                replace({
                    "../node_modules/three/" : "../../three/"
                })
            ],
            
            format: 'es',
            name: 'three',
            exports: 'named',
            sourcemap: true
          });
          done( null, {});
    }).catch(
        ( err ) => { 
            done( err, null ); 
        }
    );
};


module.exports = function( done ){
    async.series([
        build_ES,
    ], function( err, data ){
        if ( err ) console.error( err );
        done();
    });
};