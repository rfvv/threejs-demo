import * as THREE from 'three'

class Floor {
    constructor(scene) {
        this.scene = scene
    }

    render(width, height, depth, x, y, z) {
        let loader = new THREE.TextureLoader()
        let texture = loader.load("img/floor.jpg")
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10)
        let floorGeometry = new THREE.BoxGeometry(width, height, depth)
        let floorMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })

        let floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.position.set(x, y, z)
        floor.name = "地面"
        this.scene.add(floor)
    }
}

export default Floor
