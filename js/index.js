
var supplierList = ko.observableArray([]);
var truckList = ko.observableArray([]);
var toolList = ko.observableArray([]);
var thirdPartyList = ko.observableArray([]);
var equipList = ko.observableArray([]);
var workList = ko.observableArray([]);
var equipmentNameList = ko.observableArray([]);
var workFormData = ko.observableArray();

var supplierEdit;
var unitEdit;
var truckEdit;
var toolsEdit;
var thirdPartyEdit;
var equipmentEdit;
var workDaysEdit;

var equipLoad;
var navigatePage;

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

var equipmentOne = {
    buildingSpace: "13",
    equipmentName: "Unit SR",
    equipmentMakeModel: "XPS 310",
    equipmentNum: "138-13",
    equipmentCost: "55",
    equipmentStatus: "green",
    equipmentDetails: "Red base, Black trim.",
    equipmentNotes: "None.",
    equipmentImages: "_"
}

var equipmentTwo = {
    buildingSpace: "14",
    equipmentName: "Unit RS",
    equipmentMakeModel: "XPS 311",
    equipmentNum: "1438-13",
    equipmentCost: "55",
    equipmentStatus: "green",
    equipmentDetails: "Red base, Black trim.",
    equipmentNotes: "None.",
    equipmentImages: "_"
}

var equipmentOptions = [
    {item: equipmentOne, name: equipmentOne.equipmentName},
    {item: equipmentTwo, name: equipmentTwo.equipmentName}
]


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
truckObject = function (qty,desc,cost) {
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
var supplierList = ko.observableArray([]);
var truckList = ko.observableArray([]);
var toolList = ko.observableArray([]);
var thirdPartyList = ko.observableArray([]);
var equipList = ko.observableArray([new equipmentObject()]);
var workList = ko.observableArray([]);

var totalTruckCost = ko.computed(function () {
    var total = 0;
    for (var i = 0; i < truckList().length; i++) {
        total += (parseInt(truckList()[i].truckQty()) * parseInt(truckList()[i].truckCost()));
    }

    return (total ? " $" + total.toFixed(2) : " 0");
});

var totalToolCost = ko.computed(function () {
    var total = 0;
    for (var i = 0; i < toolList().length; i++) {
        total += (parseInt(toolList()[i].toolQty()) * parseInt(toolList()[i].toolRate()));
    }

    return (total ? " $" + total.toFixed(2) : " 0");
});

var totalThirdPartyCost = ko.computed(function () {
    var total = 0;
    for (var i = 0; i < thirdPartyList().length; i++) {
        total += parseInt(thirdPartyList()[i].thirdPartyCost());
    }

    return (total ? " $" + total.toFixed(2) : " 0");
});

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

    console.log(dispatchData.workDate());
    self.submit = function () {

        // $.post("http://127.0.0.1:3000/customer", self.dispatchData, function(returnedData) {
        //     console.log(returnedData)
        // })

    };


    // jQuery.ajax({
    //     url: "https://www.builtspace.com/sites/bcitproject/_vti_bin/listdata.svc/ServiceWorkOrder",
    //     type: "GET",
    //     async: false,
    //     headers: { "Accept": "application/json;odata=verbose" },
    //     success: function (data) {
    //         if (data.d) {
    //             if (data.d.results){
    //                 self.buildingList = data.d.results[0]
    //                 workFormData = self.buildingList
    //
    //                 dispatchData.custName = data.d.results[0].Customer
    //                 dispatchData.custPO = data.d.results[0].CustomerPO
    //                 dispatchData.custEmail = data.d.results[0].TechnicianEmail
    //                 dispatchData.custNotes = data.d.results[0].DispatchNotes
    //                 dispatchData.requestBy = data.d.results[0].TaskCreatedBy
    //                 dispatchData.contPhone = data.d.results[0].OnSiteContactPhone
    //                 dispatchData.contEmail = data.d.results[0].OnSiteContactEmail
    //                 dispatchData.assignedTo = data.d.results[0].Technician
    //
    //
    //             }
    //             else
    //                 console.log('error')
    //         }
    //     }
    // });




};

var dispatchEditPage = function (params) {
    console.log(dispatchData.workDate);
};


var equipmentForm = function (params) {
    self = this;
    self.save = function () {
        // equipList.push(new equipmentObject(equipment.buildingSpace,equipment.equipmentName,equipment.equipmentMakeModel,equipment.equipmentNum,equipment.equipmentCost,
        //     equipment.equipmentStatus,equipment.equipmentDetails,equipment.equipmentNotes,equipment.equipmentImages));
        //
        // equipmentNameList.push({name: equipment.equipmentName});
        //
        // equipment = {
        //     buildingSpace: '',
        //     equipmentName: '',
        //     equipmentMakeModel: '',
        //     equipmentNum: '',
        //     equipmentCost: '',
        //     equipmentStatus: '',
        //     equipmentDetails: '',
        //     equipmentNotes: '',
        //     equipmentImages: ''
        // };

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
var test = test;
var equipmentPage = function (params) {

    self = this;
    self.edit = function(index) {
        equipmentIndex = index;
        equipmentEdit = equipList()[equipmentIndex];
    };
    self.remove = function (index) {
        equipList.remove(index);
    };
    self.add = function () {
        equipList.push(new equipmentObject());
    };
    self.getIndex = function (index) {
        equipmentIndex = index
    };
    self.confirm = function (index) {
        equipList.remove(index);
        equipList.push(new equipmentObject(equipLoad.buildingSpace,equipLoad.equipmentName,equipLoad.equipmentMakeModel,equipLoad.equipmentNum,equipLoad.equipmentCost,equipLoad.equipmentStatus,equipLoad.equipmentDetails,equipLoad.equipmentNotes,equipLoad.equipmentImages));
        // index.buildingSpace = equipLoad.buildingSpace;
        // index.equipmentName = equipLoad.equipmentName;
        // index.equipmentMakeModel = equipLoad.equipmentMakeModel;
        // index.equipmentNum = equipLoad.equipmentNum;
        // index.equipmentCost = equipLoad.equipmentCost;
        // index.equipmentStatus = equipLoad.equipmentStatus;
        // index.equipmentDetails = equipLoad.equipmentDetails;
        // index.equipmentNotes = equipLoad.equipmentNotes;
        // index.equipmentImages = equipLoad.equipmentImages;
        navigatePage = 3;

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
    self.removeSupplier = function (index) {
        supplierList.remove(index);
    }
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
         navigatePage= 0;
    };
    self.removeUnit = function (index) {
        supplierData.unitList.remove(index);
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
        navigatePage = 1;
    }
    self.removeUnit = function (index) {
        supplierEdit.unitList.remove(index);
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
        if (navigatePage == 0) {
            supplierData.unitList()[unitIndex] = unitEdit;
        }
        else if (navigatePage == 1) {
            supplierEdit.unitList()[unitIndex] = unitEdit;
        }
    };
};
var loadPage = function (params) {
    self = this;
    self.loadPage;
    if (navigatePage == 0){
        self.loadPage = 'purchaseAdd-page';
    }
    else if (navigatePage == 1){
        self.loadPage = 'purchaseEdit-page';
    }
    else if (navigatePage == 2){
        self.loadPage = 'truck-page';
    }

};
truckPage = function (params) {
    self = this;
    self.editTruck = function(index) {
        truckIndex = index;
        truckEdit = truckList()[truckIndex];
    };

    self.removeTruck = function (index) {
        truckList.remove(index);
    }

};
var truckAddPage = function (params) {
    self = this;

    self.addTruck = function () {
        truckList.push(new truckObject(trucks.truckQty, trucks.truckDesc, trucks.truckCost));
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
    self.removeTool = function (index) {
        toolList.remove(index)
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
    self.removeThirdParty = function (index) {
        thirdPartyList.remove(index);
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
    self.removeWorkDay = function (index) {
        workList.remove(index);
    }
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
                name: "LoadPage",
                componentConfig: {
                    viewModel: loadPage,
                    template: {element: "load-page"}
                },
                routes: ["/loadPage"]
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

    // var x = {
    //     "__metadata": { "type": Microsoft.SharePoint.DataService.ServiceWorkOrderItem }
    // };
    //
    // jQuery.ajax({
    //     url: "https://www.builtspace.com/sites/bcitproject/_vti_bin/listdata.svc/ServiceWorkOrder",
    //     type: "POST",
    //     contentType: "application/json;odata=verbose",
    //     data: ko.toJSON(x),
    //     headers: {
    //         "Accept": "application/json;odata=verbose", // return data format
    //         "X-RequestDigest": $("#__REQUESTDIGEST").val()
    //     },
    //     success: function (data) {
    //         self.error("New Category Created Successfully");
    //     },
    //     error: function (data) {
    //         self.error("Error in processing request " + data.status);
    //     }
    // });

    // jQuery.ajax({
    //     url: "https://www.builtspace.com/sites/bcitproject/_vti_bin/listdata.svc/ServiceWorkOrder",
    //     type: "GET",
    //     async: false,
    //     headers: { "Accept": "application/json;odata=verbose" },
    //     success: function (data) {
    //         if (data.d) {
    //             if (data.d.results){
    //                 workFormData = data.d.results[0]
    //                 console.log(workFormData.WONumber)
    //             }
    //             else
    //                 console.log('error')
    //         }
    //     }
    // });


    var app = new MyApp();
    ko.applyBindings(app);
});

// testing kelvin's github with gpg