import vueConfig from "./webFrame/vue/config";
import TS from "./webFrame/TS/config";
import JS from "./webFrame/JS/config";
import actualCombat from "./actualCombat/index";
import study from "./study/index";
import summary from "./summaryPlanning/summary";
import planning from "./summaryPlanning/planning";
export default {
    "/": [],
    "/summaryPlanning/summary/": summary, //总结
    "/summaryPlanning/planning/": planning, //计划
    "/programming/actualCombat/": actualCombat,
    "/programming/study/": study,
    "/vue/": vueConfig,
    "/TS/": TS,
    "/JS/": JS,
};
