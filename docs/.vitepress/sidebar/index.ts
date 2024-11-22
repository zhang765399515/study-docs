import vueConfig from "./webFrame/vue/config";
import TS from "./webFrame/TS/config";
import JS from "./webFrame/JS/config";
import actualCombat from "./actualCombat/index";
import study from "./study/index";
import summary2024 from "./summary/2024/index";
import interview from "./interview/index";//面试题
export default {
    "/markdown/": [],
    "/markdown/interview/": interview,
    "/markdown/summary/2024/": summary2024, //总结
    "/markdown/programming/actualCombat/": actualCombat,
    "/markdown/programming/study/": study,
    "/markdown/vue/": vueConfig,
    "/markdown/TS/": TS,
    "/markdown/JS/": JS,
};
