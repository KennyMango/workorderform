var mainPage = function(params) {

};

var dispatchPage = function (params) {
    self = this;
    self.dispatchData = {
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
    }

    self.buildingList = ko.observableArray();

    self.submit = function () {

        $.post("http://127.0.0.1:3000/customer", self.dispatchData, function(returnedData) {
            console.log(returnedData)
        })

    },

    self.loadJson = function () {

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:3000/buildings/1',
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

var equipmentForm = function (params) {
    self = this;
    self.equipment = [
        {buildingSpace: "Roof"},
        {equipmentName: "RF01 (Roof - rf2341)"},
        {equipmentMakeModel: "Apple"},
        {equipmentNum: "1234567"},
        {equipmentCost: "$ 100.00"},
        {equipmentStatus: "Working"},
        {equipmentDetails: "This item is intended to do blah blah blah"},
        {equipmentNotes: "I found the following errors"},
        {equipmentImages: "image1, image2, image3"}
    ]
};

var equipmentPage = function (params) {
    self = this;
    self.equipment = {
        buildingSpace: ko.observable(''),
        equipmentName: ko.observable(''),
        equipmentMakeModel: ko.observable(''),
        equipmentNum: ko.observable(''),
        equipmentCost: ko.observable(''),
        equipmentStatus: ko.observable(''),
        equipmentDetails: ko.observable(''),
        equipmentNotes: ko.observable(''),
        equipmentImages: ko.observable(''),
    }
};

var purchasePage = function (params) {
    self = this;
    self.suppliers = [
        { supplierName: "Trane"},
        { supplierName: "Rona"},
        { supplierName: "Home Depot"},
        { supplierName: "Daikin"}
    ];
};

var workDaysPage = function (params) {
    self = this;
    self.workDaysData = {
        workDate: ko.observable(''),
        technician: ko.observable(''),
        reghrs: ko.observable(''),
        overtime: ko.observable(''),
        doubletime: ko.observable(''),
        totalhrs: ko.observable(''),
        rate: ko.observable(''),
        labour: ko.observable('')
    }

    self.submit = function () {

        $.post("http://127.0.0.1:3000/workDays", self.workDaysData, function(returnedData) {
            console.log(returnedData)
        })

    }
}

var viewWorkDaysPage = function (params) {

};

var hoursSummaryPage = function (params) {
// testing time
};

this.custInfo = ko.observable('hello');
var KnockoutController = function(config) {
    this.custInfo = ko.observable('hello');
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
                name: "Equipment",
                componentConfig: {
                    viewModel: equipmentPage,
                    template: {element: "equipment-page"}
                },
                routes: ["/equipment"]
            },
            {
                name: "EquipmentForm",
                componentConfig: {
                    viewModel: equipmentForm,
                    template: {element: "equipment-form"}
                },
                routes: ["/equipmentForm"]
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
                name: "WorkDays",
                componentConfig: {
                    viewModel: workDaysPage,
                    template: {element: "workDays-page"}
                },
                routes: ["/workDays"]
            },
            {
                name: "ViewWorkDays",
                componentConfig: {
                    viewModel: viewWorkDaysPage,
                    template: {element: "viewWorkDays-page"}
                },
                routes: ["/viewWorkDays"]
            },
            {
                name: "HoursSummary",
                componentConfig: {
                    viewModel: hoursSummaryPage,
                    template: {element: "hoursSummary-page"}
                },
                routes: ["/hoursSummary"]
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