import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from "tweakpane";
import '../styles/Play.css'

function Play() {

  useEffect(() => {

        // initialize pane
    const pane = new Pane();

    // initialize the scene
    const scene = new THREE.Scene();

    // add textureLoader
    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    cubeTextureLoader.setPath('/textures/cubeMap/')

    // adding textures
    const sunTexture = textureLoader.load("/textures/2k_sun.webp");
    const mercuryTexture = textureLoader.load("/textures/2k_mercury.webp");
    const venusTexture = textureLoader.load("/textures/2k_venus_surface.webp");
    const earthTexture = textureLoader.load("/textures/2k_earth_daymap.webp");
    const marsTexture = textureLoader.load("/textures/2k_mars.webp");
    const moonTexture = textureLoader.load("/textures/2k_moon.webp");
    const jupiterTexture = textureLoader.load('/textures/2k_jupiter.webp');

    const backgroundCubemap = cubeTextureLoader
    .load( [
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'
    ] );

    scene.background = backgroundCubemap

    // add materials
    const mercuryMaterial = new THREE.MeshStandardMaterial({
      map: mercuryTexture,
    });
    const venusMaterial = new THREE.MeshStandardMaterial({
      map: venusTexture,
    });
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
    });
    const marsMaterial = new THREE.MeshStandardMaterial({
      map: marsTexture,
    });
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
    });
    const jupiterMaterial = new THREE.MeshStandardMaterial({
      map: jupiterTexture 
    });

    // add stuff here
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
    });

    const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
    sun.scale.setScalar(5);
    scene.add(sun);

    const planets = [
      {
        name: "Mercury",
        radius: 0.5,
        distance: 10,
        speed: 0.01,
        material: mercuryMaterial,
        moons: [],
      },
      {
        name: "Venus",
        radius: 0.8,
        distance: 15,
        speed: 0.007,
        material: venusMaterial,
        moons: [],
      },
      {
        name: "Earth",
        radius: 1,
        distance: 20,
        speed: 0.005,
        material: earthMaterial,
        moons: [
          {
            name: "Moon",
            radius: 0.3,
            distance: 3,
            speed: 0.015,
          },
        ],
      },
      {
        name: "Mars",
        radius: 0.7,
        distance: 25,
        speed: 0.003,
        material: marsMaterial,
        moons: [
          {
            name: "Phobos",
            radius: 0.1,
            distance: 2,
            speed: 0.02,
          },
          {
            name: "Deimos",
            radius: 0.2,
            distance: 3,
            speed: 0.015,
            color: 0xffffff,
          },
        ],
      },
      {
        name: "Jupiter",
        radius: 1.5,
        distance: 30,
        speed: 0.002,
        material: jupiterMaterial,
        moons: [],
      }
    ];

    const createPlanet = (planet) =>{
      const planetMesh = new THREE.Mesh(
        sphereGeometry,
        planet.material
      )
      planetMesh.scale.setScalar(planet.radius)
      planetMesh.position.x = planet.distance
      return planetMesh
    }

    const createMoon = (moon) =>{
      const moonMesh = new THREE.Mesh(
        sphereGeometry,
        moonMaterial
      )
      moonMesh.scale.setScalar(moon.radius)
      moonMesh.position.x = moon.distance
      return moonMesh
    }


    const planetMeshes = planets.map((planet) =>{
      const planetMesh = createPlanet(planet)
      scene.add(planetMesh)
    
      planet.moons.forEach((moon) => {
        const moonMesh = createMoon(moon)
        planetMesh.add(moonMesh)
      })
      return planetMesh
    })

    console.log(planetMeshes)

    // add lights
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      0.5
    )
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(
      0xffffff,
      2
    )
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 50, 50);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    // initialize the camera
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    );
    camera.position.z = 100;
    camera.position.y = 5;

    // initialize the renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxDistance = 200;
    controls.minDistance = 20;

    // add resize listener
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // render loop
    const renderloop = () => {
      planetMeshes.forEach((planet, planetIndex)=>{
        planet.rotation.y +=  planets[planetIndex].speed
        planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
        planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
        planet.children.forEach((moon, moonIndex) =>{
          moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
          moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
          moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
        })
      })
    
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(renderloop);
    };

    renderloop();

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };

  }, []);

  return null; 
}
  
  export default Play