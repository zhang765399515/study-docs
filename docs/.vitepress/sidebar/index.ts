import Vue from "./webFrame/Vue/config";
import React from "./webFrame/react/config";
import WebBase from "./webFrame/WebBase/config";
import actualCombat from "./actualCombat/index";
import interview from "./interview/index";//面试题
import Git from "../../markdown/Git/index";//Git
import PerformanceOptimization from "./PerformanceOptimization/index";
export default {
    "/markdown/": [],
    "/markdown/interview/": interview,
    "/markdown/Git/": Git,
    "/markdown/programming/actualCombat/": actualCombat,
    "/markdown/webFrame/React/": React,
    "/markdown/webFrame/vue/": Vue,
    "/markdown/webFrame/WebBase/": WebBase,
    "/markdown/PerformanceOptimization/": PerformanceOptimization,
};
