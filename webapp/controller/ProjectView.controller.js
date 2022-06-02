sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
    'sap/ui/model/FilterOperator'
], function(Controller, MessageToast,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ui.ts.timesheetTimesheet.controller.TimeSheetList", {
		onInit: function() {
			// debugger;
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute('projectView').attachPatternMatched(this.oRouteMatched , this);
		},
		oRouteMatched: function(oEvent) {
			// debugger;
			var that = this;
			// var oUserDetails = await this.getUserInfo();
			this.getView().getModel("layout").setProperty("/layout", "OneColumn");
			this.oWeeknum = oEvent.getParameter('arguments').weeknum;
			this.oResc = oEvent.getParameter('arguments').Resc;
		    var oFilter1 = new Filter("Userid", "EQ", 'ARUNK');
			var oModel = this.getView().getModel();
			oModel.read("/ProjectResourcesSet",{
				filters:[oFilter1],
				success:function(data){
					// debugger;
					that.getView().getModel('local').setProperty('/localProjectResourcesSet',data.results);
				},
				error:function(oErr){
					
				}
			});
			
		},
		onSelectProject:function(oEvent){
			// debugger;
			var oProjectNumber = oEvent.getParameter('listItem').getBindingContext('local').getObject().Project;
			this._oRouter.navTo('detailView',{
				weeknum :this.oWeeknum,
				Resc :this.oResc,
				project : oProjectNumber
			});
		}
		
	});
});