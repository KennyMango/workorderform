var mainPage = function(params) {

};

var dispatchPage = function (params) {

};

var KnockoutController = function(config) {
    var defaults = {
            transitionDelayMs: 0,
            views: []
        },
        settings = ko.utils.extend(defaults, config || {}),
        router = new Grapnel(),
        self = this,
        loadView = function(viewName, routeParams) {
            self.isTransitioning(true);
            setTimeout(function(){
                self.viewParams(routeParams);
                self.viewName(viewName);
                self.isTransitioning(false);
            }, settings.transitionDelayMs);
        };
    // props
    self.viewName = ko.observable(settings.defaultView.name);
    self.viewParams = ko.observable(settings.defaultView.params || {});
    self.isTransitioning = ko.observable(false);
    // initialization
    ko.utils.arrayForEach(settings.views, function(vc) {
        if(vc.name && vc.componentConfig){
            ko.components.register(vc.name, vc.componentConfig);
            if(vc.routes && vc.routes.length){
                ko.utils.arrayForEach(vc.routes, function(route){
                    router.get(route, function(req, ev) {
                        loadView(vc.name, req.params);
                    });
                });
            }
            if(vc.name === "404"){
                router.get("/*", function(req, ev) {
                    if(!ev.parent()){
                        loadView(vc.name, req.params);
                    }
                });
            }
        }
    });
};

var MyApp = function() {
    this.controller = new KnockoutController({
        transitionDelayMs: 300,
        views: [{
            name: "main",
            componentConfig: {
                viewModel: mainPage,
                template: {element: "main-page"}
            },
            routes: ["/"]
        },
            {
                name: "Dispatch",
                componentConfig: {
                    viewModel: dispatchPage,
                    template: {element: "dispatch-page"}
                },
                routes: ["/dispatch"]
            }],
        defaultView: {
            name: "main",
            params: {}
        }
    });
};

var app = new MyApp();
ko.applyBindings(app);

// testing kelvin's github