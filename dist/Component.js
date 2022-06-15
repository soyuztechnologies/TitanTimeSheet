sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ui/ts/timesheetTimesheet/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ui.ts.timesheetTimesheet.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// this.getService("ShellUIService").then( // promise is returned
			// 	function(oService) {
			// 		debugger;
			// 		oService.setTitle("Application Title");
			// 	},
			// 	function(oError) {
			// 		jQuery.sap.log.error("Cannot get ShellUIService", oError, "my.app.Component");
			// 	}
			// );
			// try {

			// }
		
		},
		destroy : function () {
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		}
		
	});
});