sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui.ts.timesheetTimesheet.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ui.ts.timesheetTimesheet.view.App
		 */
		onInit: function() {
			// this.getOwnerComponent().getModel("layout").setProperty("/layout", "OneColumn");
			// if(!this.getView().getModel("local").getProperty("/User")){
			// 	this.getView().getModel("local").setProperty("/User",'ARUNK');
			// }
			var that=this;
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

			}
		
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ui.ts.timesheetTimesheet.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ui.ts.timesheetTimesheet.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ui.ts.timesheetTimesheet.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});