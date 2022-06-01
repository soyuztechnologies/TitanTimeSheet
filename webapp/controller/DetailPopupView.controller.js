sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
    'sap/ui/model/FilterOperator'
], function(Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ui.ts.timesheetTimesheet.controller.DetailPopupView", {
		onInit: function() {
			// debugger;
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute('detailView').attachPatternMatched(this.oRouteMatched , this);
		},
		oRouteMatched: function(oEvent) {
			debugger;
			var oWeeknum =  oEvent.getParameter("arguments").weeknum;
			var oResc = oEvent.getParameter("arguments").Resc;
			
			this.getView().getModel("layout").setProperty("/layout", "OneColumn");
			var oFilter1 = new Filter("Resc", "EQ", oResc);
			var oFilter2 = new Filter("Weeknumber","EQ",oWeeknum);
			
			// var oList = this.getView().byId("")
			// var oModel = this.getView().getModel();
			// var sPath = oModel.createKey("/ResDay", {
					
			// });
			// oModel.read('/RescDaySet',{
			// 	filters : [oFilter1,oFilter2],
			// 	success:function(data){
			// 		debugger;
			// 		this.getView().getModel('local').setProperty('/RescDay',data);
			// 	},
			// 	error:function(oErr){
			// 		debugger;
			// 	}
			// });
		
		}
	});
});