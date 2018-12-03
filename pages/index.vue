<template>
  <section class="container" id="three">
    <script type="x-shader/x-vertex" id="vertexshader">
      attribute float scale;
      void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = scale * ( 300.0 / - mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
      }
    </script>
    <script type="x-shader/x-fragment" id="fragmentshader">
      uniform vec3 color;
      void main() {
      if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
      gl_FragColor = vec4( color, 1.0 );
      }
    </script>
    <div v-if="true" class="text">
      <logo v-if="false"/>
      <h1 class="title">
        ip:{{user[0].ip}} {{user[0].count}} visit
      </h1>
      <p style="color: #409eff">
        <nuxt-link to="/user">Go Home</nuxt-link>
        <nuxt-link to="/model">ThreeJs model</nuxt-link>
      </p>
    </div>
    <h2 class="subtitle">
      <p style="float: right">人<br/>间<br/>草<br/>木<br/>深</p>
      <p style="float:left;padding: 30px 10px 0 0">我<br/>心<br/>桃<br/>花<br/>源</p>
    </h2>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  var THREE = require('three');
  require('@/assets/GLTFLoader.js')
  THREE.Cache.enabled = true;
  export default {
    async asyncData({app}) {
      const user = {}//await app.$axios.$get('/api/getCount')
      return {user}
    },
    components: {
      Logo
    },
    methods: {},
    mounted() {
      var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
      var text = "welcome",
        height = 20,
        size = 200,
        hover = 200,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5,
        bevelEnabled = true,
        font = undefined,
        fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = "bold"; // normal bold
      var mirror = true;
      var container, stats, group, textMesh1, textMesh2, textGeo, materials;
      var camera, scene, renderer;
      var particles, count = 0;
      var mouseX = 0, mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      init();
      animate();

      function init() {
        container = document.getElementById('three');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0x000000, 850, 1400);
        var numParticles = AMOUNTX * AMOUNTY;
        var positions = new Float32Array(numParticles * 3);
        var scales = new Float32Array(numParticles);
        var i = 0, j = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            positions[i] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
            positions[i + 1] = 0; // y
            positions[i + 2] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
            scales[j] = 1;
            i += 3;
            j++;
          }
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('scale', new THREE.BufferAttribute(scales, 1));
        var material = new THREE.ShaderMaterial({
          uniforms: {
            color: {value: new THREE.Color('rgb(9,123,219)')},
          },
          vertexShader: document.getElementById('vertexshader').textContent,
          fragmentShader: document.getElementById('fragmentshader').textContent
        });
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
        dirLight.position.set(0, 0, 1).normalize();
        scene.add(dirLight);

        var pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(0, 100, 90);
        scene.add(pointLight);
        pointLight.color.setStyle('rgb(255, 0, 0)');
        materials = [
          new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true}), // front
          new THREE.MeshPhongMaterial({color: 0xffffff}) // side
        ];

        group = new THREE.Group();
        group.position.y = 100;
        scene.add(group);
        loadFont();

        var plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(10000, 10000),
          new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.5, transparent: true})
        );
        plane.position.y = 0;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor('rgb(21,40,96)', 1.0);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        window.addEventListener('resize', onWindowResize, false);
      }

      function createText() {
        textGeo = new THREE.TextGeometry(text, {
          font: font,
          size: size,
          height: height,
          weight: 'bold',
          curveSegments: curveSegments,
          bevelThickness: bevelThickness,
          bevelSize: bevelSize,
          bevelEnabled: bevelEnabled
        });
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        // "fix" side normals by removing z-component of normals for side faces
        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
        if (!bevelEnabled) {
          var triangleAreaHeuristics = 0.1 * ( height * size );
          for (var i = 0; i < textGeo.faces.length; i++) {
            var face = textGeo.faces[i];
            if (face.materialIndex == 1) {
              for (var j = 0; j < face.vertexNormals.length; j++) {
                face.vertexNormals[j].z = 0;
                face.vertexNormals[j].normalize();
              }
              var va = textGeo.vertices[face.a];
              var vb = textGeo.vertices[face.b];
              var vc = textGeo.vertices[face.c];
              var s = THREE.GeometryUtils.triangleArea(va, vb, vc);
              if (s > triangleAreaHeuristics) {
                for (var j = 0; j < face.vertexNormals.length; j++) {
                  face.vertexNormals[j].copy(face.normal);
                }
              }
            }
          }
        }
        var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
        textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);
        textMesh1 = new THREE.Mesh(textGeo, materials);
        textMesh1.position.x = centerOffset;
        textMesh1.position.y = 0;
        textMesh1.position.z = height;
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;
        group.add(textMesh1);
        if (mirror) {
          textMesh2 = new THREE.Mesh(textGeo, materials);
          textMesh2.position.x = centerOffset;
          textMesh2.position.y = -hover;
          textMesh2.position.z = height;
          textMesh2.rotation.x = Math.PI;
          textMesh2.rotation.y = Math.PI * 2;
          group.add(textMesh2);

        }
      }

      function refreshText() {
        group.remove(textMesh1);
//        if ( mirror ) group.remove( textMesh2 );
        if (!text) return;
        createText();
      }

      function loadFont() {
        var loader = new THREE.FontLoader();
        loader.load('/fonts/' + fontName + '_' + 'bold' + '.typeface.json', function (response) {
          font = response;
          refreshText();
        });
      }

      function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }

      function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }

      function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }

      function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
      }

      function render() {
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( 450 - camera.position.y ) * .05;
        camera.lookAt(scene.position);
        var positions = particles.geometry.attributes.position.array;
        var scales = particles.geometry.attributes.scale.array;
        var i = 0, j = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            positions[i + 1] = ( Math.sin(( ix + count ) * 0.3) * 50 ) +
              ( Math.sin(( iy + count ) * 0.5) * 50 );
            scales[j] = ( Math.sin(( ix + count ) * 0.3) + 1 ) * 8 +
              ( Math.sin(( iy + count ) * 0.5) + 1 ) * 8;
            i += 3;
            j++;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.1;
      }
    }
  }

</script>

<style>
  * {
    /*color:#FF00F9;*/
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 20px;
    color: #ff4500;
    letter-spacing: 1px;
  }

  .subtitle {
    position: absolute;
    right: 30px;
    top: 50px;
    font-weight: 300;
    font-size: 20px;
    color: #e6a23c;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .text {
    position: absolute;
    left: 30px;
    top: 30px;
  }

</style>
