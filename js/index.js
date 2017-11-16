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

function toggle(e) {
    if(e.className == 'closed') {
        e.className = 'open';
    }
    else {
        e.className = 'closed';
    }
}


var dispatchPage = function (params) {
    self = this;
    self.buildingList = ko.observableArray();

    self.submit = function () {

        // $.post("http://127.0.0.1:3000/customer", self.dispatchData, function(returnedData) {
        //     console.log(returnedData)
        // })

    };

    self.loadJson = function () {

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1: 3000/buildings/1',
                contentType: "application/javascript",
                dataType: "jsonp",
                success: function(data) {
                    console.log(data);
                    console.log(ko.mapping.fromJS(data));
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
    };


};

var materialsPage = function (params) {

};



var equipmentForm = function (params) {
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
        equipmentImages: ko.observable('')
    };

    self.save = function () {

        // $.post("http://127.0.0.1:3000/equipment/1", self.equipment, function(returnedData) {
        //     console.log(returnedData)
        // });

        $.ajax(
            {
                type:'PUT',
                url: 'http://127.0.0.1:3000/equipment/1',
                data: ko.toJSON(self.equipment),
                contentType: 'application/json',
                success: function(data){
                    console.log("updated success")
                    self.equipment(data)
                }
            }
        )

    };

};

var equipmentPage = function (params) {

    self = this;

    self.equipList = ko.observableArray();

    $( document ).ready(function() {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:3000/equipment',
            contentType: "application/javascript",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                self.equipList(data);
            },
            error: function (jq, st, error) {
                alert(error);
            }
        });
    });

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

    self.add = function () {

        $.post("http://127.0.0.1:3000/workDays", self.workDaysData, function(returnedData) {
            console.log(returnedData)
        })

    }
}

var viewWorkDaysPage = function (params) {

    self = this;

    self.workList = ko.observableArray();

    $( document ).ready(function() {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:3000/workDays',
            contentType: "application/javascript",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                self.workList(data);
            },
            error: function (jq, st, error) {
                alert(error);
            }
        });
    });

};

var invoicePage = function (params) {

};

var hoursSummaryPage = function (params) {
// testing time
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
                name: "Invoice",
                componentConfig: {
                    viewModel: invoicePage,
                    template: {element: "invoice-page"}
                },
                routes: ["/invoice"]
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