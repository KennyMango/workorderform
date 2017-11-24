var supplierList = ko.observableArray([]);
var truckList = ko.observableArray([]);
var toolList = ko.observableArray([]);
var thirdPartyList = ko.observableArray([]);
var equipList = ko.observableArray([]);
var workList = ko.observableArray([]);

var supplierEdit;
var truckEdit;
var toolsEdit;
var thirdPartyEdit;
var equipmentEdit;
var workDaysEdit;

var supplierIndex;
var truckIndex;
var toolsIndex;
var thirdPartyIndex;
var equipmentIndex;
var workDaysIndex;

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

var trucks = {
    truckQty: ko.observable(''),
    truckCost: ko.observable(''),
    truckDesc: ko.observable('')
};
var tools = {
    toolQty: ko.observable(''),
    toolRate: ko.observable(''),
    toolDesc: ko.observable('')
};
var thirdParty = {
    thirdPartyDate: ko.observable(''),
    thirdPartyCost: ko.observable(''),
    thirdPartyDesc: ko.observable('')
};
var quotedWork = {
    quotedCost: ko.observable(''),
    quotedDesc: ko.observable('')
};

var equipment = {
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

var workDaysData = {
    workDate: ko.observable(''),
    technician: ko.observable(''),
    regHrs: ko.observable(''),
    overTime: ko.observable(''),
    doubleTime: ko.observable(''),
    totalHrs: ko.observable(''),
    rate: ko.observable(''),
    labour: ko.observable('')

};

function supplierObject(supplierName) {
    self = this;
    self.selectedSupplier = ko.observable(supplierName);
};
truckObject = function (qty,cost,desc) {
    self = this;
    self.truckQty = qty;
    self.truckCost = cost;
    self.truckDesc = desc;
};
toolObject = function (qty,rate,desc) {
    self = this;
    self.toolQty = qty;
    self.toolRate = rate;
    self.toolDesc = desc;
};
thirdPartyObject = function (date,cost,desc) {
    self = this;
    self.thirdPartyDate = date;
    self.thirdPartyCost = cost;
    self.thirdPartyDesc = desc;
};

equipmentObject = function(space,name,model,num,cost,status,details,notes,images) {
    self = this;
    self.buildingSpace = space;
    self.equipmentName = name;
    self.equipmentMakeModel = model;
    self.equipmentNum = num;
    self.equipmentCost = cost;
    self.equipmentStatus = status;
    self.equipmentDetails = details;
    self.equipmentNotes = notes;
    self.equipmentImages = images;
};

workDaysObject = function(date,technician,reghrs,overtime,doubletime,totalhrs,rate,labour){
    self = this;
    self.workDate = date;
    self.technician = technician;
    self.regHrs = reghrs;
    self.overTime = overtime;
    self.doubleTime = doubletime;
    self.totalHrs = totalhrs;
    self.rate = rate;
    self.labour = labour;

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

var dispatchEditPage = function (params) {

};


var equipmentForm = function (params) {
    self = this;
    self.save = function () {
        equipList.push(new equipmentObject(equipment.buildingSpace,equipment.equipmentName,equipment.equipmentMakeModel,equipment.equipmentNum,equipment.equipmentCost,
            equipment.equipmentStatus,equipment.equipmentDetails,equipment.equipmentNotes,equipment.equipmentImages));

        equipment = {
            buildingSpace: '',
            equipmentName: '',
            equipmentMakeModel: '',
            equipmentNum: '',
            equipmentCost: '',
            equipmentStatus: '',
            equipmentDetails: '',
            equipmentNotes: '',
            equipmentImages: ''
        };

        // $.post("http://127.0.0.1:3000/equipment/1", self.equipment, function(returnedData) {
        //     console.log(returnedData)
        // });

        // $.ajax(
        //     {
        //         type:'PUT',
        //         url: 'http://127.0.0.1:3000/equipment/1',
        //         data: ko.toJSON(self.equipment),
        //         contentType: 'application/json',
        //         success: function(data){
        //             console.log("updated success");
        //             self.equipment(data)
        //         }
        //     }
        // )

    };

};

var equipmentFormEdit = function (params) {
    self = this;

    self.update = function () {
        equipList()[equipmentIndex] = equipmentEdit;
    }
};

var equipmentPage = function (params) {

    self = this;

    self.edit = function(index) {
        equipmentIndex = index;
        equipmentEdit = equipList()[equipmentIndex];
    };
    // $( document ).ready(function() {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://127.0.0.1:3000/equipment',
    //         contentType: "application/javascript",
    //         dataType: "jsonp",
    //         success: function (data) {
    //             console.log(data);
    //             self.equipList(data);
    //         },
    //         error: function (jq, st, error) {
    //             alert(error);
    //         }
    //     });
    // });

};

var materialsPage = function (params) {

};

// var purchasePage = function (params) {
//     self = this;
//     self.supplierData = [
//         {supplierName: "Trane"},
//         {supplierName: "Rona"},
//         {supplierName: "Home Depot"},
//         {supplierName: "Daikin"}
//     ];
//     self.supplierList = ko.observableArray([new supplierObject(self.supplierData[0])]);
//
//     self.saveOption = function (index) {
//         // supplierIndex = index;
//         // self.supplierList()[supplierIndex] = ;
//         console.log(supplierList());
//
//     };
//     self.addSupplier = function () {
//         console.log('hello');
//         self.supplierList.push(new supplierObject(self.supplierData[0]));
//     };
// };

var purchasePage = function (params) {
    self = this;

    self.test = function () {
        console.log(supplierList()[0])
    };
    self.supplierData = [
        {supplierName: "Trane"},
        {supplierName: "Rona"},
        {supplierName: "Home Depot"},
        {supplierName: "Daikin"}
    ];

};

var truckPage = function (params) {
    self = this;
    self.editTruck = function(index) {
        truckIndex = index;
        truckEdit = truckList()[truckIndex];
    };
};
var truckAddPage = function (params) {
    self = this;
    self.addTruck = function () {
        // truckList.push(new truckObject(trucks.truckQty,trucks.truckCost,trucks.truckDesc));
    };

    trucks = {
        truckQty: ko.observable(''),
        truckCost: ko.observable(''),
        truckDesc: ko.observable('')
    };
};
var truckEditPage = function (params) {
    self = this;
    self.updateTruck = function () {
        truckList()[truckIndex] = truckEdit;
    };
};
var toolsPage = function (params) {
    self = this;

    self.editTool = function(index) {
        toolsIndex = index;
        toolsEdit = toolList()[toolsIndex];
    };
};
var toolsAddPage = function (params) {
    self = this;
    self.addTool = function () {
        toolList.push(new toolObject(tools.toolQty,tools.toolRate,tools.toolDesc));
    };
    tools = {
        toolQty: ko.observable(''),
        toolRate: ko.observable(''),
        toolDesc: ko.observable('')
    };
};
var toolsEditPage = function (params) {
    self = this;
    self.updateTool = function () {
        toolList()[toolsIndex] = toolsEdit;
    };
};
var thirdPartyPage = function (params) {
    self = this;

    self.editThirdParty = function(index) {
        thirdPartyIndex = index;
        thirdPartyEdit = thirdPartyList()[thirdPartyIndex];
    };
};
var thirdPartyAddPage = function (params) {
    self = this;
    self.addThirdParty = function () {
        thirdPartyList.push(new thirdPartyObject(thirdParty.thirdPartyDate,thirdParty.thirdPartyCost,thirdParty.thirdPartyDesc));
    };
    thirdParty = {
        thirdPartyDate: ko.observable(''),
        thirdPartyCost: ko.observable(''),
        thirdPartyDesc: ko.observable('')
    };
};
var thirdPartyEditPage = function (params) {
    self = this;
    self.updateThirdParty = function () {
        thirdPartyList()[thirdPartyIndex] = thirdPartyEdit;
    };
};
var quotedWorkPage = function (params) {

};
var quotedWorkAddPage = function (params) {

};

var workDaysPage = function (params) {
    self = this;
    self.addWorkDay = function () {
        workList.push(new workDaysObject(workDaysData.workDate,workDaysData.technician,workDaysData.regHrs,workDaysData.overTime,
            workDaysData.doubleTime, workDaysData.totalHrs,workDaysData.rate,workDaysData.labour));
        // $.post("http://127.0.0.1:3000/workDays", workDaysData, function(returnedData) {
        //     console.log(returnedData)
        // })

        workDaysData = {
            workDate: '',
            technician: '',
            regHrs: '',
            overTime: '',
            doubleTime: '',
            totalHrs: '',
            rate: '',
            labour: ''

        };

    };
};

var workDaysEditPage = function (params) {
    self = this;
    self.updateWorkDay = function () {
        workList()[workDaysIndex] = workDaysEdit;
    };
};

var viewWorkDaysPage = function (params) {

    self = this;

    self.editWorkDay = function (index) {
        workDaysIndex = index;
        workDaysEdit = workList()[workDaysIndex];
    };
    // $( document ).ready(function() {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://127.0.0.1:3000/workDays',
    //         contentType: "application/javascript",
    //         dataType: "jsonp",
    //         success: function (data) {
    //             console.log(data);
    //             self.workList(data);
    //         },
    //         error: function (jq, st, error) {
    //             alert(error);
    //         }
    //     });
    // });

};

var invoicePage = function (params) {

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
                name: "DispatchEdit",
                componentConfig: {
                    viewModel: dispatchEditPage,
                    template: {element: "dispatchEdit-page"}
                },
                routes: ["/dispatchEdit"]
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
                name: "EquipmentFormEdit",
                componentConfig: {
                    viewModel: equipmentFormEdit,
                    template: {element: "equipment-form-edit"}
                },
                routes: ["/equipmentFormEdit"]
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
                name: "TrucksEdit",
                componentConfig: {
                    viewModel: truckEditPage,
                    template: {element: "truckEdit-page"}
                },
                routes: ["/trucksEdit"]
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
                name: "ToolsEdit",
                componentConfig: {
                    viewModel: toolsEditPage,
                    template: {element: "toolsEdit-page"}
                },
                routes: ["/toolsEdit"]
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
                name: "ThirdPartyAdd",
                componentConfig: {
                    viewModel: thirdPartyAddPage,
                    template: {element: "thirdPartyAdd-page"}
                },
                routes: ["/thirdPartyAdd"]
            },
            {
                name: "ThirdPartyEdit",
                componentConfig: {
                    viewModel: thirdPartyEditPage,
                    template: {element: "thirdPartyEdit-page"}
                },
                routes: ["/thirdPartyEdit"]
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
                name: "QuotedWorkAdd",
                componentConfig: {
                    viewModel: quotedWorkAddPage,
                    template: {element: "quotedWorkAdd-page"}
                },
                routes: ["/quotedWorkAdd"]
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
                name: "WorkDaysEdit",
                componentConfig: {
                    viewModel: workDaysEditPage,
                    template: {element: "workDaysEdit-page"}
                },
                routes: ["/workDaysEdit"]
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