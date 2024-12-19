<script setup lang='ts'>
// import { addFog,removeFog} from './map';
// import { GeokeyTerrainProvider,Terrain,GeokeyTerrainProviderEdit,Cartesian3,PostProcessStage,Color,Cartesian4 } from 'geokey-gis'

setTimeout(() => {
    // let elevationLayer = new GeokeyTerrainProviderEdit({
    //   url: "http://192.168.1.20:10252/geokey/gis/3DModel/?layers=layer512",
    //   requestVertexNormals: true,
    //   requestWaterMask: true,
    // });
    // window.viewer.terrainProvider = elevationLayer;
    window.viewer.scene.setTerrain(
        new Terrain(
            GeokeyTerrainProvider.fromIonAssetId(1),
        ),
    );
    window.viewer.scene.globe.depthTestAgainstTerrain = true;
        const fragmentShaderSource = `
        uniform sampler2D colorTexture; 
        uniform sampler2D depthTexture; 
        uniform vec4 fogByHeight; 
        uniform vec4 fogColor; 
        in vec2 v_textureCoordinates; 
        uniform float earthRadius; 
        uniform vec3 fogCenter; // 雾的中心（世界坐标）
        uniform float fogRadius; // 雾的半径
        uniform bool useLocalFog; // 是否启用局部雾化

        float isInFogRegion(vec3 worldCoordinate) {
            // 计算到中心点的距离
            float distanceToCenter = length(worldCoordinate - fogCenter);
            // 判断是否在雾区域内
            return useLocalFog ? step(distanceToCenter, fogRadius) : 1.0;
        }

        float getHeight(sampler2D depthTexture, vec2 texCoords) {
            float depth = czm_unpackDepth(texture(depthTexture, texCoords));
            if (depth == 0.0) {
                return czm_infinity;
            }
            vec4 eyeCoordinate4 = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
            vec3 eyeCoordinate3 = eyeCoordinate4.xyz / eyeCoordinate4.w;
            vec4 worldCoordinate4 = czm_inverseView * vec4(eyeCoordinate3, 1.0);
            vec3 worldCoordinate = worldCoordinate4.xyz / worldCoordinate4.w;
            float altitude = length(worldCoordinate.xyz) - earthRadius; // 当前高度
            return altitude;
        }
        float interpolateByDistance(vec4 nearFarScalar, float distance) 
        { 
            float startDistance = nearFarScalar.x; 
            float startValue = nearFarScalar.y; 
            float endDistance = nearFarScalar.z; 
            float endValue = nearFarScalar.w; 
            float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); 
            return mix(startValue, endValue, t); 
        }
        vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) 
        { 
            return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); 
        } 
        void main(void) {
            float height = getHeight(depthTexture, v_textureCoordinates); // 获取当前像素到相机的距离
            vec4 sceneColor = texture(colorTexture, v_textureCoordinates); // 场景原有的颜色

            // 根据高度计算雾化强度
            float blendAmount = interpolateByDistance(fogByHeight, height);

            // 获取当前像素的世界坐标
            vec4 eyeCoordinate4 = czm_windowToEyeCoordinates(gl_FragCoord.xy, czm_unpackDepth(texture(depthTexture, v_textureCoordinates)));
            vec3 eyeCoordinate3 = eyeCoordinate4.xyz / eyeCoordinate4.w;
            vec4 worldCoordinate4 = czm_inverseView * vec4(eyeCoordinate3, 1.0);
            vec3 worldCoordinate = worldCoordinate4.xyz / worldCoordinate4.w;

            // 判断是否在局部范围内
            float inFog = isInFogRegion(worldCoordinate);

            // 根据范围动态调整雾化
            blendAmount *= inFog;

            // 计算最终的雾化颜色
            vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount);

            // 混合场景原有的颜色和雾化颜色
            out_FragColor = alphaBlend(finalFogColor, sceneColor);
        }
        `;
        const camera = window.viewer.camera;
        const postProcessStage = new PostProcessStage({
            fragmentShader: fragmentShaderSource,
            uniforms: {
                fogByHeight: new Cartesian4(1, .7, 200, 0.0),//雾化参数  
                fogColor: Color.WHITE,//雾化颜色 设置为白色
                earthRadius: (e) => {
                    return Cartesian3.magnitude(camera.positionWC) - camera.positionCartographic.height
                },
                fogCenter:Cartesian3.fromDegrees(113.952492, 22.534648, 10000),
                fogRadius:50000.0, // 半径 500 米
                useLocalFog:true // 启用局部雾化
            },
        })
        window.viewer.scene.postProcessStages.add(postProcessStage);
        viewer.camera.setView({
            destination: Cartesian3.fromDegrees(113.952492, 22.534648, 10000),
        });
}, 2000);
</script>

<template>
    <div class="dhy_widget-main">
        <el-button type="primary" @click="addFog">开启雾</el-button>
        <el-button type="primary" @click="removeFog">关闭雾</el-button>
    </div>
</template>