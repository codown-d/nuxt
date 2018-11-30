<template>
  <div>
  </div>
</template>
<script>
  var THREE = require('three');
  require('@/assets/GLTFLoader.js')
  require('@/assets/OrbitControls.js')
  export default {
    data() {
      return {
        msg: 'hello vue'
      }
    },
    mounted() {
      var container, stats, controls;
      var camera, scene, renderer, light;
      init();
      animate();
      function init() {
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
//        camera.position.set( - 1.8, 0.9, 2.7 );
        camera.position.set(0, 0, 500);
        camera.lookAt(new THREE.Vector3(0,0,0));

        controls = new THREE.OrbitControls( camera );
        controls.target.set( 0, - 0.2, - 0.2 );
        controls.update();
        // envmap
        var path = '/baldman/textures/';
        var format = '.jpg';
        var envMap = new THREE.CubeTextureLoader().load( [
          path + 'posx' + format, path + 'negx' + format,
          path + 'posy' + format, path + 'negy' + format,
          path + 'posz' + format, path + 'negz' + format
        ] );
        scene = new THREE.Scene();
        scene.background = envMap;
        light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
        light.position.set( 0, 1, 0 );
        scene.add( light );
        // model
        var loader = new THREE.GLTFLoader();
        loader.load( '/model2/scene.gltf', function ( gltf ) {
          gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
//              child.material.envMap = envMap;
            }
          } );
          scene.add( gltf.scene );
        }, undefined, function ( e ) {
          console.error( e );
        } );
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.gammaOutput = true;
        container.appendChild( renderer.domElement );
        window.addEventListener( 'resize', onWindowResize, false );
        // stats
        stats = new Stats();
        container.appendChild( stats.dom );
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
      //
      function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        stats.update();
      }
    },
    components: {}
  }
</script>

<style>
  body {
    margin: 0;
  }

  canvas {
    width: 100%;
    height: 100%
  }
</style>
