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
			this._oRouter.getRoute('TimeSheetList').attachPatternMatched(this.oRouteMatched , this);
		},
		oRouteMatched: function() {
			// debugger;
			// var oUserDetails = await this.getUserInfo();
			this.getView().getModel("layout").setProperty("/layout", "OneColumn");
		
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
		onSearch:function(){
				var oPayload = {
				"Resc":"Resource",
				"TsDate":new Date(),
				"Project":"Project",
				"Weeknumber":"00006",
				"TsHours":"2"
			};
			var omodel = this.getView().getModel();
			
			omodel.create('/RescDaySet',oPayload,
			     {
					     	success: function(data) {
					     		// debugger;
							     console.log("success");
							    },
					      error:function(oErr){
					      	// debugger;
					            console.log('failed');
					    }
			     }	 
			);
		},
		onPressWeeknumber : function(oEvent){
			// debugger;
			// this.getDetailDailog().open();
			this.oWeekNum = oEvent.getSource().getProperty("text");
		    this.oResc = oEvent.getSource().getParent().getBindingContext().getObject().Resc;	
		    	this._oRouter.navTo("projectView",{
				weeknum : this.oWeekNum,
				Resc : this.oResc
			});
		},
		// getDetailDailog:function(){
		// 	if (!this.oDetailDialog) {
  //                  this.oDetailDialog = sap.ui.xmlfragment(this.getView().getId(), "ui.ts.timesheetTimesheet.Fragments.DetailPopup", this);
  //                  this.getView().addDependent(this.oDetailDialog);
  //              }
  //              return this.oDetailDialog;
		// },
		getDialog: function () {
                if (!this.oCreateDialog) {
                    this.oCreateDialog = sap.ui.xmlfragment(this.getView().getId(), "ui.ts.timesheetTimesheet.Fragments.Create", this);
                    this.getView().addDependent(this.oCreateDialog);
                }
                return this.oCreateDialog;
            },
        onOpenCreatePopup:function(){
            	this.getDialog().open();
        },
        onCancel:function(){
        	this.getDialog().close();
        },
        onFilterWeeknumber:function(){
        	var aFilter = [];
        	var sQuery = this.getView().byId('input2').getValue();
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