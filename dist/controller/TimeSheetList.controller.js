sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	'sap/ui/model/FilterOperator'
], function(Controller, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ui.ts.timesheetTimesheet.controller.TimeSheetList", {
		onInit: function() {
			// debugger;
			var that = this;
			try {
				sap.ushell.Container.getServiceAsync("UserInfo").then( // promise is returned
					function(oService) {
						// debugger;
						var oUser = oService.getUser().getId();
						that.getOwnerComponent().getModel("local").setProperty("/User", oUser);
						// that.getOwnerComponent().getModel("local").setProperty("/User",oUser)
					},
					function(oError) {
						// debugger;
					}
				);
			} catch (error) {
				sap.m.MessageToast.show("UI ushell service containter not available");
				// that.getOwnerComponent().getModel("local").setProperty("/User","Arunk");

			}
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute('TimeSheetList').attachPatternMatched(this.oRouteMatched, this);
		},
		oRouteMatched: function() {
			// debugger;
			// var oUserDetails = await this.getUserInfo();
			this.getView().getModel("layout").setProperty("/layout", "OneColumn");
			this.oResc = this.getOwnerComponent().getModel("local").getProperty("/User");
			var oFilter = new Filter("Resc", "EQ", this.oResc);
			this.getView().byId("tabId").getBinding("items").filter([oFilter]);

		},
		// getUserInfo: function() {
		//              var that = this
		//              try {
		//                  sap.ushell.Container.getServiceAsync("UserInfo").then( // promise is returned
		//                      function (oService) {
		//                          debugger;
		//                          return oService.getUserEmail();
		//                      },
		//                      function (oError) {
		//                          debugger;
		//                      }
		//                   );
		//              } catch (error) {
		//                  MessageToast.show("UI ushell service containter not available");
		//              }
		//          },
		onWeekCreate: function(oEvent) {
			debugger;

			var oWeek = oEvent.getSource().getParent().getContent()[0].getContent()[1].getValue();
			var oPayload = {
				"Resc": this.oResc,
				"Status": "Saved",
				// "TsDate":new Date(),
				// "Project":"Project",
				"Weeknumber": oWeek
					// "TsHours":"2"
			};
			var omodel = this.getView().getModel();
			this.getDialog().close();
			omodel.create('/WeeklyTSSet', oPayload, {
				success: function(data) {
					// debugger;
					sap.m.MessageToast.show("Week Created Sccuessfully");
					//console.log("success");
				},
				error: function(oErr) {
					// debugger;
					sap.m.MessageToast.show("Some Error Occured");
					// console.log('failed');
				}
			});
		},
		onPressWeeknumber: function(oEvent) {
			// debugger;
			// this.getDetailDailog().open();
			this.oWeekNum = oEvent.getSource().getProperty("text");
			this.oResc = oEvent.getSource().getParent().getBindingContext().getObject().Resc;
			this.Status = oEvent.getSource().getParent().getBindingContext().getObject().Status;
			this._oRouter.navTo("DetailPopupView", {
				weeknum: this.oWeekNum,
				Resc: this.oResc,
				Status: this.Status
			});
		},
		// getDetailDailog:function(){
		// 	if (!this.oDetailDialog) {
		//                  this.oDetailDialog = sap.ui.xmlfragment(this.getView().getId(), "ui.ts.timesheetTimesheet.Fragments.DetailPopup", this);
		//                  this.getView().addDependent(this.oDetailDialog);
		//              }
		//              return this.oDetailDialog;
		// },
		getDialog: function() {
			if (!this.oCreateDialog) {
				this.oCreateDialog = sap.ui.xmlfragment(this.getView().getId(), "ui.ts.timesheetTimesheet.Fragments.Create", this);
				this.getView().addDependent(this.oCreateDialog);
			}
			return this.oCreateDialog;
		},
		onOpenCreatePopup: function() {
			this.getDialog().open();
		},
		onCancel: function() {
			this.getDialog().close();
		},
		onFilterWeeknumber: function() {
			var aFilter = [];
			var sQuery = this.getView().byId('input2').getValue();
			var oFilter1 = new Filter("Resc", "EQ", this.oResc);
			aFilter.push(oFilter1);
			if (sQuery) {
				var oFilter = new Filter("Weeknumber", FilterOperator.Contains, sQuery);
				// this.getView().byId("tabId").getBinding("items").filter([oFilter]);
				aFilter.push(oFilter);
			}
			var oList = this.getView().byId('tabId');
			oList.getBinding('items').filter(aFilter);
		}

		// onCancelDetail:function(){
		// 	this.getDetailDailog().close();
		// }             
	});
});