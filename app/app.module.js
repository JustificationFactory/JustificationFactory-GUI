System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', './rxjs-extensions', './components/actions.toolbar.component', './components/diagram.component', './components/edit.toolbar.component', './components/load.diagram.component', './components/main.component', './components/menu.component', './components/properties.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, forms_1, http_1, actions_toolbar_component_1, diagram_component_1, edit_toolbar_component_1, load_diagram_component_1, main_component_1, menu_component_1, properties_component_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (actions_toolbar_component_1_1) {
                actions_toolbar_component_1 = actions_toolbar_component_1_1;
            },
            function (diagram_component_1_1) {
                diagram_component_1 = diagram_component_1_1;
            },
            function (edit_toolbar_component_1_1) {
                edit_toolbar_component_1 = edit_toolbar_component_1_1;
            },
            function (load_diagram_component_1_1) {
                load_diagram_component_1 = load_diagram_component_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (properties_component_1_1) {
                properties_component_1 = properties_component_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            http_1.HttpModule
                        ],
                        declarations: [
                            actions_toolbar_component_1.ActionsToolbarComponent,
                            diagram_component_1.DiagramComponent,
                            edit_toolbar_component_1.EditToolbarComponent,
                            load_diagram_component_1.LoadDiagramComponent,
                            main_component_1.MainComponent,
                            menu_component_1.MenuComponent,
                            properties_component_1.PropertiesComponent
                        ],
                        providers: [],
                        bootstrap: [
                            actions_toolbar_component_1.ActionsToolbarComponent,
                            diagram_component_1.DiagramComponent,
                            edit_toolbar_component_1.EditToolbarComponent,
                            load_diagram_component_1.LoadDiagramComponent,
                            main_component_1.MainComponent,
                            menu_component_1.MenuComponent,
                            properties_component_1.PropertiesComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map