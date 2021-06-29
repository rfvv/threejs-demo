<template>
    <div class="operate-container">
        <div ref="container" @click="clickOperateStation">
        </div>
        <el-dialog title="作业计划" :visible.sync="showOperateDeail" width="36%" :modal="false">
            <el-form :model="form" label-width="120px" size="small">
                <el-form-item label="运维专机编号">
                    <el-input v-model="form.number" readonly></el-input>
                </el-form-item>
                <el-form-item label="是否使用">
                    <el-switch v-model="form.useable"></el-switch>
                </el-form-item>
                <el-form-item label="作业计划名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作业计划时间">
                    <el-date-picker
                            v-model="form.date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="作业人员">
                    <el-tag v-for="item in form.persons" effect="dark" style="margin-left: 10px">
                        {{item}}
                    </el-tag>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showOperateDeail=false">取 消</el-button>
                <el-button type="primary" @click="operateDetailSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as THREE from 'three'
    import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
    import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
    import {ResourceLoader} from '../threejs/ResourceLoader'
    import Wall from "../threejs/Wall";
    import Floor from '../threejs/Floor'
    import stationPointData from '../threejs/StationPointData'
    import OperateStation from "../threejs/Station";

    export default {
        name: "OperateOverview",
        data() {
            return {
                scene: '',
                camera: '',
                render: '',
                controls: '',
                operateStations: [],
                showOperateDeail: false,
                operate: '',
                form: {
                    name: '',
                    useable: false,
                    persons: ['张三', '王五']
                }
            }
        },
        mounted() {
            this.init()
            this.animate()
            this.initWall()
            this.initFloor()
            this.loadModel()
        },
        methods: {
            init() {
                this.scene = new THREE.Scene()
                this.scene.background = new THREE.Color(0xf0f0f0)

                let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
                let pointLight = new THREE.PointLight(0xffffff, 1, 0, 2)
                pointLight.position.set(0, 700, 0)
                this.scene.add(ambientLight)
                this.scene.add(pointLight)

                this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
                this.camera.position.set(0, 1800, 1650)
                this.camera.lookAt(100, 100, 100)


                this.render = new THREE.WebGLRenderer({antialias: true, alpha: false})
                this.render.setClearAlpha(0.5)
                this.render.setPixelRatio(window.devicePixelRatio)
                this.render.setSize(window.innerWidth, window.innerHeight)
                this.$refs.container.appendChild(this.render.domElement)

                this.controls = new OrbitControls(this.camera, this.render.domElement);

                //辅助坐标轴
                // let axis = new THREE.AxesHelper(1600)
                // axis.position.set(0, 10, 0)
                // this.scene.add(axis)

                window.onresize = this.onWindowResize
            },
            onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight
                this.camera.updateProjectionMatrix()
                this.render.setSize(window.innerWidth, window.innerHeight)
            },
            animate() {
                requestAnimationFrame(this.animate);
                this.render.render(this.scene, this.camera);
            },
            initWall() {
                new Wall(this.scene)
                    .render('south', 10, 400, 2300, -1150, 200, 0, "southWall")
                    .render('north', 10, 400, 2300, 1150, 200, 0, 'northWall')
                    .render('east', 2300, 400, 10, 0, 200, -1150, 'eastWall')
                    .render('west', 2300, 400, 10, 0, 200, 1150, 'westWall')
            },
            initFloor() {
                new Floor(this.scene).render(2300, 10, 2300, 0. - 7, 0)
            },
            async loadModel(name) {
                let operateModel = await this.loadOperateModel()
                let font = await this.loadFont()
                operateModel.scale.set(1.5, 1.5, 1.5)

                // for (let i = 0; i < 5; i++) {
                //
                //     let operate = new OperateStation(this.scene, group, i, font, new THREE.Vector3(i * 200, 0, i * 200))
                //     operate.render()
                // }
                for (let i = 0; i < stationPointData.length; i++) {
                    let [number, x, y, z, status, direction] = stationPointData[i]
                    let group = operateModel.clone()
                    let operate = new OperateStation(this.scene, group, number, font, new THREE.Vector3(x, y, z), direction,status)
                    operate.render()
                }

            },
            async loadOperateModel() {
                let chair = await ResourceLoader.load("chair").then()
                chair.position.set(0, 0, 0)
                chair.scale.set(4, 4, 4)

                let desk = await ResourceLoader.load('desk')
                desk.position.set(0, 0, 70)

                let computer = await ResourceLoader.load('computer3')
                computer.position.set(0, 80, 70)
                computer.scale.set(4.5, 4.5, 4.5)
                computer.rotateY(Math.PI)


                let group = new THREE.Group()
                group.add(chair)
                group.add(desk)
                group.add(computer)

                return group;
            },
            async loadFont() {
                return new Promise((resolve, reject) => {
                    new THREE.FontLoader().load('fonts/SimHei_Regular.json', font => {
                        resolve(font)
                    })
                })
            },
            clickOperateStation(e) {
                e.preventDefault()
                let raycaster = new THREE.Raycaster()
                let mouse = new THREE.Vector2()
                mouse.x = (e.clientX / window.innerWidth) * 2 - 1
                mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

                raycaster.setFromCamera(mouse, this.camera)

                let intersects = raycaster.intersectObjects(this.scene.children, true)
                if (intersects.length == 0) return
                let intersect = intersects[0]
                if (intersects[0].object.parent && intersects[0].object.parent.parent) {
                    let operate = intersects[0].object.parent.parent.operate
                    if (!(operate instanceof OperateStation)) return;
                    this.operate = operate
                    this.showOperateDeail = true
                    this.form.number = operate.number

                }
            },
            operateDetailSave() {
                this.operate.chageState(this.form.useable)
                this.showOperateDeail = false
            }
        }
    }
</script>

<style scoped>
    .operate-container{
        cursor: pointer;
    }
</style>
