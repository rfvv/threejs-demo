<template>
    <div>
        <div id="info">
            <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - procedural 3D text by <a
                href="http://www.lab4games.net/zz85/blog" target="_blank" rel="noopener">zz85</a> &amp; alteredq<br/>
            type to enter new text, drag to spin the text<br/>
            <button id="color">change color</button>
            <button id="font">change font</button>
            <button id="weight">change weight</button>
            <button id="bevel">change bevel</button>
            <br/>
            <a id="permalink" href="#">permalink</a>
        </div>
    </div>
</template>

<script>

    import * as THREE from 'three'
    import Stats from "three/examples/jsm/libs/stats.module";

    export default {
        name: "Test",
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
