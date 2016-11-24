System.register(["angular2/platform/browser", "./argumentation.component", "./paletteGraph.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, argumentation_component_1, paletteGraph_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (argumentation_component_1_1) {
                argumentation_component_1 = argumentation_component_1_1;
            },
            function (paletteGraph_component_1_1) {
                paletteGraph_component_1 = paletteGraph_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(paletteGraph_component_1.paletteGComponent);
            browser_1.bootstrap(argumentation_component_1.diagrammeArgComponent);
        }
    }
});
//# sourceMappingURL=main.js.map