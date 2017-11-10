var truckList = ko.observableArray([]);

var dispatchData = {
    custName: ko.observable(''),
    custPO: ko.observable(''),
    custNotes: ko.observable(''),
    custEmail: ko.observable(''),
    reqeuestBy: ko.observable(''),
    contOnSite: ko.observable(''),
    contPhone: ko.observable(''),
    contEmail: ko.observable(''),
    workDate: ko.observable(''),
    startDate: ko.observable(''),
    endDate: ko.observable(''),
    assignedTo: ko.observable('')
};

var FormData = [
    {supplierName: "Trane"},
    {supplierName: "Rona"},
    {supplierName: "Home Depot"},
    {supplierName: "Daikin"}
    ];

var trucks = {
    truckQty: ko.observable(''),
    truckCost: ko.observable(''),
    truckDesc: ko.observable('')
};

truckObject = function (qty,cost,desc) {
    self = this;
    self.truckQty = qty;
    self.truckCost = cost;
    self.truckDesc = desc;
};

var mainPage = function(params) {

};

var dispatchPage = function (params) {
    self = this;

    self.buildingList = ko.observableArray();

    self.submit = function () {

        // $.post("http://127.0.0.1:3000/customer", self.dispatchData, function(returnedData) {
        //     console.log(returnedData)
        // })

    },

    self.loadJson = function () {

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1: 3000/buildings/1',
                contentType: "application/javascript",
                dataType: "jsonp",
                success: function(data) {
                    console.log(data);
                    console.log(ko.mapping.fromJS(data))
                    var array = ko.mapping.fromJS(data);
                    self.buildingList(array);
                },
                error:function(jq, st, error){
                    alert(error);
                }
            });

        // self.removeBuilding = function () {
        //     $.ajax({
        //         method: 'DELETE',
        //         url: 'http://localhost:3000/users/12',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         error:function(jq, st, error){
        //             alert(error);
        //         }
        //     });
        // }
    }
};

var materialsPage = function (params) {

};

var purchasePage = function (params) {
    self = this;
    self.suppliers = [FormData[0],FormData[1],FormData[2],FormData[3]];
};
var truckPage = function (params) {

};
var truckAddPage = function (params) {
    self = this;
    self.addTruck = function () {
        truckList.push(new truckObject(trucks.truckQty,trucks.truckCost,trucks.truckDesc));
    };
};
var toolsPage = function (params) {

};
var toolsAddPage = function (params) {

};
var thirdPartyPage = function (params) {

};
var quotedWorkPage = function (params) {

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
            },
            {
                name: "Materials",
                componentConfig: {
                    viewModel: materialsPage,
                    template: {element: "materials-page"}
                },
                routes: ["/materials"]
            },
            {
                name: "Purchase",
                componentConfig: {
                    viewModel: purchasePage,
                    template: {element: "purchase-page"}
                },
                routes: ["/purchase"]
            },
            {
                name: "Trucks",
                componentConfig: {
                    viewModel: truckPage,
                    template: {element: "truck-page"}
                },
                routes: ["/trucks"]
            },
            {
                name: "TrucksAdd",
                componentConfig: {
                    viewModel: truckAddPage,
                    template: {element: "truckAdd-page"}
                },
                routes: ["/trucksAdd"]
            },
            {
                name: "Tools",
                componentConfig: {
                    viewModel: toolsPage,
                    template: {element: "tools-page"}
                },
                routes: ["/tools"]
            },
            {
                name: "ToolsAdd",
                componentConfig: {
                    viewModel: toolsAddPage,
                    template: {element: "toolsAdd-page"}
                },
                routes: ["/toolsAdd"]
            },
            {
                name: "ThirdParty",
                componentConfig: {
                    viewModel: thirdPartyPage,
                    template: {element: "thirdParty-page"}
                },
                routes: ["/thirdParty"]
            },
            {
                name: "QuotedWork",
                componentConfig: {
                    viewModel: quotedWorkPage,
                    template: {element: "quotedWork-page"}
                },
                routes: ["/quotedWork"]
            }],
        defaultView: {
            name: "main",
            params: {}
        }
    });
};

$(document).ready(function () {
    var app = new MyApp();
    ko.applyBindings(app);

});

// testing kelvin's github with gpg