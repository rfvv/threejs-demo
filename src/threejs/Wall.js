/*墙面纹理*/
import * as THREE from 'three'

let southMaterial = []
southMaterial.push(new THREE.MeshBasicMaterial({color: 0xafc0ca}))
southMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
southMaterial.push(new THREE.MeshBasicMaterial({color: 0xd6e4ec}))
southMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
southMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
southMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))


let northMaterial = []
northMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
northMaterial.push(new THREE.MeshBasicMaterial({color: 0xafc0ca}))
northMaterial.push(new THREE.MeshBasicMaterial({color: 0xd6e4ec}))
northMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
northMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
northMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))

let eastMaterial = []
eastMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
eastMaterial.push(new THREE.MeshBasicMaterial({color: 0xafc0ca}))
eastMaterial.push(new THREE.MeshBasicMaterial({color: 0xd6e4ec}))
eastMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
eastMaterial.push(new THREE.MeshBasicMaterial({color: 0xafc0ca}))
eastMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
let faceEastMaterial = new THREE.MeshFaceMaterial(eastMaterial)

let westMaterial = []
westMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
westMaterial.push(new THREE.MeshBasicMaterial({color: 0xafc0ca}))
westMaterial.push(new THREE.MeshBasicMaterial({color: 0xd6e4ec}))
westMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
westMaterial.push(new THREE.MeshBasicMaterial({color: 0x9cb2d1}))
westMaterial.push(new THREE.MeshBasicMaterial({color: 0xafc0ca}))
let westFaceMaterial = new THREE.MeshFaceMaterial(westMaterial)

let faceMaterial = {
    south: new THREE.MeshFaceMaterial(southMaterial),
    north: new THREE.MeshFaceMaterial(northMaterial),
    east: new THREE.MeshFaceMaterial(eastMaterial),
    west: new THREE.MeshFaceMaterial(westMaterial),
}


class Wall {
    constructor(scene) {
        this.scene = scene
    }

    render(type, width, height, depth, x, y, z, name) {
        if (!['south', 'north', 'east', 'west'].find(s => s === type)) throw new Error('无效的墙类型,支持的类型有south,north,west,east')
        let cubeGeometry = new THREE.BoxGeometry(width, height, depth)
        let cube = new THREE.Mesh(cubeGeometry, faceMaterial[type])
        cube.position.set(x, y, z)
        this.scene.add(cube)
        return this
    }
}

export default Wall




