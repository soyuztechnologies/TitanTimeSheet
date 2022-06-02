sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("ui.ts.timesheetTimesheet.controller.TimeSheetList", {
		onInit: function() {
			debugger;
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute('projectView').attachPatternMatched(this.oRouteMatched , this);
		},
		oRouteMatched: function(oEvent) {
			debugger;
			// var oUserDetails = await this.getUserInfo();
			this.getView().getModel("layout").setProperty("/layout", "OneColumn");
			this.oWeeknum = oEvent.getParameter('arguments').weeknum;
			this.oResc = oEvent.getParameter('arguments').Resc;
			
		},
		onSelectProject:function(oEvent){
			debugger;
			var oProjectNumber = oEvent.getParameter('listItem').getBindingContext().getObject().Project;
			this._oRouter.navTo('detailView',{
				weeknum :this.oWeeknum,
				Resc :this.oResc,
				project : oProjectNumber
			});
		}
		
	});
});