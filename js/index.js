var supplierList = ko.observableArray([]);
var truckList = ko.observableArray([]);
var toolList = ko.observableArray([]);
var thirdPartyList = ko.observableArray([]);
var equipList = ko.observableArray([]);
var workList = ko.observableArray([]);
var equipmentNameList = ko.observableArray([]);
var text = 'text'

var supplierEdit;
var unitEdit;
var truckEdit;
var toolsEdit;
var thirdPartyEdit;
var equipmentEdit;
var workDaysEdit;

var newUnit = true;

var supplierIndex;
var unitIndex;
var truckIndex;
var toolsIndex;
var thirdPartyIndex;
var equipmentIndex;
var workDaysIndex;

var dispatchData = {
    custName: ko.observable('')
        .extend({required: true})
        .extend({ 
            pattern: {
             message: 'Please enter letters only!',
             params: '^[a-zA-Z].*'
            }
        }),
    custPO: ko.observable('')
        .extend({required: true})
        .extend({number: true}),
    custEmail: ko.observable('').extend({ email: true }),
    custNotes: ko.observable(''),
    requestBy: ko.observable('')
        .extend({required: true})
        .extend({ 
            pattern: {
             message: 'Please enter letters only!',
             params: '^[a-zA-Z].*'
            }
        }),
    contOnSite: ko.observable('')
        .extend({required: true})
        .extend({ 
            pattern: {
             message: 'Please enter letters only!',
             params: '^[a-zA-Z].*'
            }
        }),
    contPhone: ko.observable('').extend({ phoneUS: true }),
    contEmail: ko.observable('').extend({ email: true }),
    workDate: ko.observable(''),
    startDate: ko.observable(''),
    endDate: ko.observable(''),
    assignedTo: ko.observable('')
        .extend({required: true})
        .extend({ 
            pattern: {
             message: 'Please enter letters only!',
             params: '^[a-zA-Z].*'
            }
        })
};

var supplierData = {
    supplierName: ko.observable(''),
    unitList: ko.observableArray([])
};
var units = {
    unitQty: ko.observable(''),
    unitCost: ko.observable(''),
    unitDesc: ko.observable('')
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
    quotedCost: ko.observable('')
        .extend({required: true})
        .extend({number: true}),
    quotedDesc: ko.observable('').extend({required: true})
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
    technician: ko.observable('')
        .extend({required: true})
        .extend({ 
            pattern: {
             message: 'Please enter letters only!',
             params: '^[a-zA-Z].*'
            }
        }),
    regHrs: ko.observable('')
        .extend({required: true})
        .extend({number: true}),
    overTime: ko.observable('')
        .extend({required: true})
        .extend({number: true}),
    doubleTime: ko.observable('')
        .extend({required: true})
        .extend({number: true}),
    totalHrs: ko.observable(''),
    rate: ko.observable('')
        .extend({required: true})
        .extend({number: true}),
    labour: ko.observable('')
};

var supplierNameData = [
    {supplierName: "Trane"},
    {supplierName: "Rona"},
    {supplierName: "Home Depot"},
    {supplierName: "Daikin"}
];

supplierObject = function(supplierName, unitList) {
    self = this;
    self.selectedSupplier = supplierName;
    self.unitList = unitList;
};
unitObject = function (qty,cost,desc) {
    self = this;
    self.unitQty = qty;
    self.unitCost = cost;
    self.unitDesc = desc;
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


    jQuery.ajax({
        url: "https://www.builtspace.com/sites/bcitproject/_vti_bin/listdata.svc/OrganizationBuildings",
        type: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            if (data.d) {
                if (data.d.results){
                    self.buildingList = data.d.results[0]
                }
                else
                    console.log('error')
            }
        }
    });


};

var dispatchEditPage = function (params) {

};


var equipmentForm = function (params) {
    self = this;
    self.save = function () {
        equipList.push(new equipmentObject(equipment.buildingSpace,equipment.equipmentName,equipment.equipmentMakeModel,equipment.equipmentNum,equipment.equipmentCost,
            equipment.equipmentStatus,equipment.equipmentDetails,equipment.equipmentNotes,equipment.equipmentImages));

        equipmentNameList.push({name: equipment.equipmentName});

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
    self.editSupplier = function (index) {
        supplierIndex = index;
        supplierEdit = supplierList()[supplierIndex];
    };
};
var purchaseAddPage = function (params) {
    self = this;
    self.addSupplier = function () {
        supplierList.push(new supplierObject(supplierData.supplierName, supplierData.unitList));
        supplierData = {
            supplierName: ko.observable(''),
            unitList: ko.observableArray([])
        };
    };
    self.editUnit = function (index) {
        unitIndex = index;
        unitEdit = supplierData.unitList()[unitIndex];
        newUnit = true;
    }
};
var purchaseEditPage = function (params) {
    self = this;
    self.updateSupplier = function () {
        supplierList()[supplierIndex] = supplierEdit;
    };
    self.editUnit = function (index) {
        unitIndex = index;
        unitEdit = supplierEdit.unitList()[unitIndex];
        newUnit = false;
    }
};
var unitPage = function (params) {
    self = this;
    self.addUnit = function () {
        supplierData.unitList.push(new unitObject(units.unitQty,units.unitCost,units.unitDesc));
    };
    units = {
        unitQty: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        unitCost: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        unitDesc: ko.observable('').extend({required: true})
    };
};
var unitEditPage = function (params) {
    self = this;
    self.updateUnit = function () {
        if (newUnit == true) {
            supplierData.unitList()[unitIndex] = unitEdit;
        }
        else if (newUnit == false) {
            supplierEdit.unitList()[unitIndex] = unitEdit;
        }
    };
};
truckPage = function (params) {
    self = this;
    self.editTruck = function(index) {
        truckIndex = index;
        truckEdit = truckList()[truckIndex];
    };

};
var truckAddPage = function (params) {
    self = this;
    self.addTruck = function () {
        truckList.push(new truckObject(trucks.truckQty,trucks.truckCost,trucks.truckDesc));
    };

    trucks = {
        truckQty: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        truckCost: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        truckDesc: ko.observable('').extend({required: true})
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
        toolQty: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        toolRate: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        toolDesc: ko.observable('').extend({required: true})
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
        thirdPartyCost: ko.observable('')
            .extend({required: true})
            .extend({number: true}),
        thirdPartyDesc: ko.observable('').extend({required: true})
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
                name: "PurchaseAdd",
                componentConfig: {
                    viewModel: purchaseAddPage,
                    template: {element: "purchaseAdd-page"}
                },
                routes: ["/purchaseAdd"]
            },
            {
                name: "PurchaseEdit",
                componentConfig: {
                    viewModel: purchaseEditPage,
                    template: {element: "purchaseEdit-page"}
                },
                routes: ["/purchaseEdit"]
            },
            {
                name: "Unit",
                componentConfig: {
                    viewModel: unitPage,
                    template: {element: "unit-page"}
                },
                routes: ["/unit"]
            },
            {
                name: "UnitEdit",
                componentConfig: {
                    viewModel: unitEditPage,
                    template: {element: "unitEdit-page"}
                },
                routes: ["/unitEdit"]
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

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

$(document).ready(function () {

    jQuery.ajax({
        url: "https://www.builtspace.com/sites/bcitproject/_vti_bin/listdata.svc/ServiceWorkOrder",
        type: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            if (data.d) {
                if (data.d.results){
                    console.log(data.d.results[0])
                    console.log(ko.toJSON(data.d.results[0]));
                }
                else
                    console.log('error')
            }
        }
    });

    var app = new MyApp();
    ko.applyBindings(app);
});

// testing kelvin's github with gpg