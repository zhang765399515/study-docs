import vueConfig from "./webFrame/vue/config";
import TS from "./webFrame/TS/config";
import JS from "./webFrame/JS/config";
import CSS from "./webFrame/CSS/config";
import React from "./webFrame/react/config";

import actualCombat from "./actualCombat/index";
import study from "./study/index";
import summary2024 from "./summary/2024/index";
import interview from "./interview/index";//面试题
import Git from "./Git/index";//Git
export default {
    "/markdown/": [],
    "/markdown/interview/": interview,
    "/markdown/Git/": Git,
    "/markdown/summary/2024/": summary2024, //总结
    "/markdown/programming/actualCombat/": actualCombat,
    "/markdown/programming/study/": study,
    "/markdown/webFrame/vue/": vueConfig,
    "/markdown/webFrame/TS/": TS,
    "/markdown/webFrame/JS/": JS,
    "/markdown/webFrame/CSS/": CSS,
    "/markdown/webFrame/React/": React,
};
