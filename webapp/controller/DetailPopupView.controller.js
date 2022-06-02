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
			this.getView().getModel('local').setProperty('/enabled',false);
			this.getView().getModel('local').setProperty('/savevisible',false);
			this.getView().getModel('local').setProperty('/editVisible',true);
			var oWeeknum =  oEvent.getParameter("arguments").weeknum;
			var oResc = oEvent.getParameter("arguments").Resc;
			
			this.getView().getModel("layout").setProperty("/layout", "TwoColumnsMidExpanded");
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
		
		},
		onAddTime:function(){
			if (!this.oAddHours) {
                    this.oAddHours = sap.ui.xmlfragment(this.getView().getId(), "ui.ts.timesheetTimesheet.Fragments.AddHours", this);
                    this.getView().addDependent(this.oAddHours);
                }
         this.oAddHours.open();
		},
		onPressOkAddHours:function(){
			 this.oAddHours.close();
		},
		onPressEdit:function(){
			this.getView().getModel('local').setProperty('/enabled',true);
			this.getView().getModel('local').setProperty('/savevisible',true);
			this.getView().getModel('local').setProperty('/editVisible',false);
		},
		onPressSave:function(){
		this.getView().getModel('local').setProperty('/enabled',false);
		this.getView().getModel('local').setProperty('/savevisible',false);
		this.getView().getModel('local').setProperty('/editVisible',true);	
		}
		
	});
});