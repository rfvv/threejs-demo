/*obj，mtl3d模型资源加载*/
import * as THREE from 'three'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {DDSLoader} from 'three/examples/jsm/loaders/DDSLoader'

const loadingManager = new THREE.LoadingManager()
loadingManager.addHandler(/\.dds$/i,new DDSLoader())

class ResourceLoader {

    constructor(scene) {
        this.scene = scene
    }

    /*保证mtl和obj文件名称相同*/
    static load(fileName) {
        let mtlPath = `${fileName}.mtl`
        let objPath = `${fileName}.obj`
        let modelBasicPath = 'model/'

        return new Promise((resolve, reject) => {
            new MTLLoader(loadingManager)
                .setPath(modelBasicPath)
                .load(mtlPath,material => {
                    material.preload()
                    new OBJLoader(loadingManager)
                        .setMaterials(material)
                        .setPath(modelBasicPath)
                        .load(objPath,obj=>{resolve(obj)})
                })
        })
    }
}

export {ResourceLoader}
