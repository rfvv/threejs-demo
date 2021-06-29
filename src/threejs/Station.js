/*桌子、电脑、相关模型封装*/
import * as THREE from 'three'
import {ResourceLoader} from './ResourceLoader'
import {color} from "three/examples/jsm/libs/dat.gui.module";

const USING = "使用中"
const UN_USING = "未使用"

const Color = {
    using: '#67c23a',
    notUsing: '#f56c6c'
}

class OperateStation {

    /**
     *
     * @param scene 场景
     * @param model 模型
     * @param number 编号
     * @param font 字体
     * @param position 模型位置
     */
    constructor(scene, model, number, font, position, direction, status) {
        this.scene = scene
        this.model = model
        this.number = number + ''
        this.font = font
        this.position = position
        this.model.operate = this
        this.status = status ? USING : UN_USING
        this.color = status ? Color.using : Color.notUsing
        this.direction = direction
    }

    render() {
        let {x, y, z} = this.position
        let color = this.status
        if (this.direction) {
            this.rotateY()
            this.renderText(70, 70, 38, '#000', this.number, "编号")
            this.renderText(0, 70, 38, this.color, this.status, this.number)
        } else {
            this.renderText(0, 70, 100, this.color, this.status, this.number)
            this.renderText(-70, 70, 100, '#000', this.number, "编号")
        }
        this.model.position.set(x, y, z)
        this.scene.add(this.model)
    }

    renderText(x, y, z, color, text, name) {
        let textGeometry = new THREE.TextGeometry(text, {
            font: this.font,
            size: 18,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.05,
            bevelSegments: 3
        })
        let textMaterial = new THREE.MeshBasicMaterial({color: color})
        let textMesh = new THREE.Mesh(textGeometry, textMaterial)
        textMesh.name = name
        textMesh.position.set(x, y, z)
        if (this.direction) {
            textMesh.rotation.x = -Math.PI / 2
            textMesh.rotation.z = Math.PI
        } else {
            textMesh.rotation.x = -Math.PI / 2
        }

        this.model.add(textMesh)
    }


    /**
     * 改变状态
     */
    chageState(status) {
        let textMesh = this.model.getObjectByName(this.number)
        let {x, y, z} = textMesh.position
        this.model.remove(textMesh)
        this.status = status ? USING : UN_USING
        let color = status ? Color.using : Color.notUsing
        this.renderText(x, y, z, color, this.status, this.number)
    }

    rotateY() {
        this.model.rotateY(Math.PI)
        // let numberMesh = this.model.getObjectByName(this.number)
        //
        // numberMesh.position.set(-70, 70, 40)
        // numberMesh.rotation.x = Math.PI / 4 * 3
        //this.model.getObjectByName("编号").position.set(-70, 70, 40)
    }

}

export default OperateStation
