import React, { Component} from 'react';
import * as THREE from 'three'
import _ from 'lodash';

export default class Starfield extends Component {
  constructor(props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.state = {
      particles: []
    }
  }

  componentDidMount() {
    const setupConfig = {
      width: this.mount.clientWidth,
      height: this.mount.clientHeight
    }
    this.setupScene(setupConfig)

    let {particle, material} = this.state
    let particleCount = 500;


    _.times(particleCount, () =>{
      let star = new THREE.Mesh(particle, material)
      star.position.x = (Math.random() * 30) - 30/2
      star.position.y = (Math.random() * 13) -13/2;
      star.position.z = 1
      this.state.particles.push(star)
    })
    _.forEach(this.state.particles, (particle) => {this.state.scene.add(particle)})


    this.mount.appendChild(this.state.renderer.domElement)
    this.start()
  }
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.state.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  setupScene(config){
    let {width, height} = config
    this.state.scene = new THREE.Scene(),
    this.state.particle = new THREE.SphereGeometry( .01, 32, 32 ),
    this.state.material = new THREE.MeshBasicMaterial({ color: '#ffffff' })
    this.state.clock = new THREE.Clock;
    this.state.camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000)
    this.state.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.state.renderer.setClearColor('#000000')
    this.state.renderer.setSize(width, height)
    this.state.camera.position.z = 10;
  }

  renderScene() {
    this.state.renderer.render(this.state.scene, this.state.camera)
  }


  animate() {
    let {particle, material} = this.state
    _.forEach(this.state.particles, (particle) => {particle.position.z += .01})

    if(this.state.clock.getElapsedTime()%1.5 <= 0.03){
      let particleCount = 100;
      let particles = []

      _.times(particleCount, () => {
        const circle = new THREE.Mesh(particle, material)
        circle.position.x = (Math.random() * 30) - 30/2
        circle.position.y = (Math.random() * 13) -13/2;
        circle.position.z = .5
        particles.push(circle)
        this.state.particles.push(circle)
      })
      _.forEach(particles, (particle) => {this.state.scene.add(particle)})
    }

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  render() {
    return (
      <div
        id="WebGL-output"
        ref={(mount) => { this.mount = mount }}
      />
    )
  }

}
