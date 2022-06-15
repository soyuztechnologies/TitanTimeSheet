sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	'sap/ui/model/FilterOperator',
	'sap/m/MessageBox'
], function(Controller, Filter, FilterOperator,MessageBox) {
	"use strict";

	return Controller.extend("ui.ts.timesheetTimesheet.controller.Create", {
		onInit: function() {
			// debugger;
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
				// that.getOwnerComponent().getModel("local").setProperty("/User","ARUNK");
			}
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute('Create').attachPatternMatched(this.oRouteMatched, this);
		},
		oRouteMatched: function(oEvent) {
			debugger;
			this.getView().getModel('local').setProperty('/localProjectResourcesSet', undefined);
			this.getView().getModel("layout").setProperty("/layout", "OneColumn");
			this.oResc = this.getOwnerComponent().getModel("local").getProperty("/User");
			this.getOwnerComponent().getModel('local').setProperty('/enabled', false);
			this.getView().getModel('local').setProperty('/localProjectResourcesSet', []);
			var oDate=new Date();
			this.getView().byId("idCreateDatePicker").setDateValue(oDate);
			this.getView().byId("idCreateDatePicker").fireChange();
		},
		getProjectResSet: function() {
			var that = this;
			var oUser=this.getView().getModel("local").getProperty("/User")
			var oFilter1 = new Filter("Userid", "EQ", oUser);
			var oModel = this.getView().getModel();
			oModel.read("/ProjectResourcesSet", {
				filters: [oFilter1],
				success: function(data) {
					// debugger;
					that.getView().getModel('local').setProperty('/localProjectResourcesSet', data.results);
						for (var i = 0; i < data.results.length; i++) {
						var element = data.results[i];
						for (var j = 1; j < 8; j++) {
							that.getDayDate(j, element.Project, j);
						}
					}
					// that.getWeekbyWeeknum();
				},
				error: function(oErr) {

				}
			});
		},
		onDateChange:function(oEvent){
			debugger;	
			this.getView().getModel('local').setProperty('/localProjectResourcesSet', []);
			this.getView().getModel('local').updateBindings();
			this.getWeekbyWeeknum(oEvent.getSource().getDateValue());
		
		},
		getWeekbyWeeknum: function(oDate) {
			var that = this;
			// var oFilter1 = new Filter("Week", "EQ", this.oWeeknum);
			var oModel = this.getView().getModel();
			oModel.read("/WeekDateSet(InitDate=datetime'"+ oDate.toISOString().split(".")[0].replaceAll(':', '%3A')+"')", {
				// filters: [oFilter1],
				success: function(data) {
					debugger;
					that.oWeeknum=data.Week;
					// that.getProjectResSet();
					that.validateWeek();
					that.getView().getModel('local').setProperty('/WeekDateSet', data);
					// var oProjects = that.getView().getModel('local').getProperty('/localProjectResourcesSet');
					// var oDays = that.getView().getModel('local').getProperty('/WeekDateSet')
						// delete oDays.__metadata;
				
				},
				error: function(oErr) {

				}
			});
		},
		validateWeek:function(){
			var oModel=this.getView().getModel();
			var that=this;
			var oFilter1 = new Filter("Weeknumber", "EQ", this.oWeeknum);
			oModel.read("/WeeklyTSSet", {
				filters: [oFilter1],
				success: function(data) {
					debugger;
					if(data.results.length===0){
						that.getProjectResSet();
					}
					else{
						MessageBox.error("Week Already Exits.");
					}
				},
				error: function(oErr) {
					debugger;
				}
			});
		},
		getDayDate: function(oNum, oProject, count) {
			var oDays = this.getView().getModel('local').getProperty('/WeekDateSet');
			switch (oNum) {
				case 1:
					this.getProjectResDaySet(oDays["Monday"], oProject, 'Monday');
					break;
				case 2:
					this.getProjectResDaySet(oDays["Tuesday"], oProject, 'Tuesday');
					break;
				case 3:
					this.getProjectResDaySet(oDays["Wednesday"], oProject, 'Wednesday');
					break;
				case 4:
					this.getProjectResDaySet(oDays["Thursday"], oProject, 'Thursday');
					break;
				case 5:
					this.getProjectResDaySet(oDays["Friday"], oProject, 'Friday');
					break;
				case 6:
					this.getProjectResDaySet(oDays["Saturday"], oProject, 'Saturday');
					break;
				case 7:
					this.getProjectResDaySet(oDays["Sunday"], oProject, 'Sunday');
					break;
				default:
					// code block
			}
		},
		getProjectResDaySet: function(oDay, Project, aDay, count) {
			var that = this;
			var oResc=this.getOwnerComponent().getModel("local").getProperty("/User");
			var oFilter1 = new Filter("Weeknumber", "EQ", this.oWeeknum);
			var oFilter2 = new Filter("Project", "EQ", Project);
			var oFilter3 = new Filter("TsDate", "EQ", oDay);
			var oFilter4 = new Filter("Resc", "EQ", oResc);
			var oModel = this.getView().getModel();
			oModel.read("/RescDaySet", {
				filters: [oFilter1, oFilter2, oFilter3, oFilter4],
				success: function(data) {
					// debugger;
					var oPrjSet = that.getView().getModel('local').getProperty('/localProjectResourcesSet');
					const isEqual = (element) => element.Project === Project;
					var oIndex = oPrjSet.findIndex(isEqual);
					if (data.results && data.results.length > 0) {
						that.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + "/" + aDay, data.results[0]);
						if (aDay === 'Monday') {
							var fTotal = data.results[0].TsHours ? parseFloat(data.results[0].TsHours) : 0;
							that.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + "/Total", fTotal);
						} else {
							var oTotal = that.getView().getModel('local').getProperty('/localProjectResourcesSet/' + oIndex + "/Total");
							oTotal = (oTotal ? parseFloat(oTotal) : 0) + (data.results[0].TsHours ? parseFloat(data.results[0].TsHours) : 0);
							that.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + "/Total", oTotal);
						}
					} else {
						that.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + "/" + aDay, {
							"TsHours": 0
						});

					}
				},
				error: function(oErr) {

				}
			});
		},
		getProjectTotalHour: function() {
			debugger;
			var oData = this.getView().getModel('local').getProperty('/localProjectResourcesSet');
			for (var i = 0; i < oData.length; i++) {
				debugger;
				var element = oData[i];
				var total = 0;
				total = total + (element['Monday'].TsHours ? parseFloat(element['Monday'].TsHours) : 0);
				total = total + (element['Tuesday'].TsHours ? parseFloat(element['Tuesday'].TsHours) : 0);
				total = total + (element['Wednesday'].TsHours ? parseFloat(element['Wednesday'].TsHours) : 0);
				total = total + (element['Thursday'].TsHours ? parseFloat(element['Thursday'].TsHours) : 0);
				total = total + (element['Friday'].TsHours ? parseFloat(element['Friday'].TsHours) : 0);
				total = total + (element['Saturday'].TsHours ? parseFloat(element['Saturday'].TsHours) : 0);
				total = total + (element['Sunday'].TsHours ? parseFloat(element['Sunday'].TsHours) : 0);
				element['Total'] = total;
			}
			this.getView().getModel('local').setProperty('/localProjectResourcesSet', oData);
			this.getView().getModel('local').updateBindings();
		},
		formatDate: function(oDate) {
			if (oDate) {
				var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "MM/dd/yyyy"
				});
				return oFormat.format(oDate);
			}
		},
		// onAddTime: function() {
		// 	if (!this.oAddHours) {
		// 		this.oAddHours = sap.ui.xmlfragment(this.getView().getId(), "ui.ts.timesheetTimesheet.Fragments.AddHours", this);
		// 		this.getView().addDependent(this.oAddHours);
		// 	}
		// 	this.oAddHours.open();
		// },
		// onPressOkAddHours: function() {
		// 	this.oAddHours.close();
		// },
		onPressEdit: function() {
			this.getView().getModel('local').setProperty('/enabled', true);
			this.getView().getModel('local').setProperty('/savevisible', true);
			this.getView().getModel('local').setProperty('/editVisible', false);
		},
		submit:false,
		onPressSave: function(oEvent) {
			// if(oEvent.getSource().getId().includes('idSaveSubmit')){
			// 	this.submit=true;
			// }
			// else{
			// 	this.submit=false;
			// }
			// this.getView().getModel('local').setProperty('/enabled', false);
			// this.getView().getModel('local').setProperty('/savevisible', false);
			// this.getView().getModel('local').setProperty('/editVisible', true);
			var oData = this.getView().getModel('local').getProperty('/localProjectResourcesSet');
			var oDays = this.getView().getModel('local').getProperty('/WeekDateSet');
			var oModel=this.getView().getModel();
			var that=this;
			var oWeekPayload={
				"Hrs": "00",
				"Resc": that.oResc,
				"Weeknumber": that.oWeeknum,
				"Status": "Saved"
			};
			oModel.create("/WeeklyTSSet", oWeekPayload,{
				success: function(data) {
					debugger;
					for (var i = 0; i < oData.length; i++) {
						debugger;
						var element = oData[i];
						var prop = '__metadata';
						var payload;
						for (var j = 1; j < 8; j++) {
							var oWeekDay;
							if (j == 1)
								oWeekDay = 'Monday'
							if (j == 2)
								oWeekDay = 'Tuesday'
							if (j == 3)
								oWeekDay = 'Wednesday'
							if (j == 4)
								oWeekDay = 'Thursday'
							if (j == 5)
								oWeekDay = 'Friday'
							if (j == 6)
								oWeekDay = 'Saturday'
							if (j == 7)
								oWeekDay = 'Sunday'
							payload = {
								"Resc": that.oResc,
								"TsDate": oDays[oWeekDay],
								"Project": oData[i].Project,
								"Weeknumber": that.oWeeknum,
								"TsHours": element[oWeekDay].TsHours.toString()
							};
							that.createResData(payload);
						}
					}
				},
				error: function(oErr) {
					debugger;
					sap.m.MessageToast.show("Some Error Occured");
				}
			});
			
		},
		upDateWeekSet:function(){
			var that=this;
			var oItems=this.getView().byId("idTimesheetDetailTableCreate").getItems();
			var total=0;
			for(var i=0;i<oItems.length;i++){
				var element=oItems[i];
				total=total + parseInt(element.getCells()[element.getCells().length-1].getText())
			}
			var oModel=this.getView().getModel();
			
			var oPayload={
				"Hrs":total.toString(),
				"Status":"Saved"
			};
			var oPath=`/WeeklyTSSet(Resc='${this.oResc}',Weeknumber='${this.oWeeknum}')`;
			oModel.update(oPath, oPayload, {
			success: function(oResult) {
				sap.m.MessageToast.show("Success");
				that.onExit();
			},
			error: function(oerr) {
				
				sap.m.MessageBox.error("Some Error Occured");
			}
			});
		},
		// updateResData: function(oProject, oDate, payload) {
		// 	var oModel = this.getView().getModel();
		// 	oDate = oDate.split(".")[0];
		// 	oDate = oDate.replace(":", "%3A");
		// 	oDate = oDate.replace(":", "%3A");
		// 	// var sPath = `/RescDaySet(Resc='${this.oResc}',TsDate=datetime'${oDate}',Project='${oProject}',Weeknumber='${this.oWeeknum}')`;
		// 	var sPath = `/RescDaySet`;
		// 	oModel.create(sPath, payload, {
		// 		success: function(oResult) {
		// 			debugger;
		// 			sap.m.MessageToast.show("Success");
		// 		},
		// 		error: function(oerr) {
		// 			debugger;
		// 			// sap.m.MessageToast.show("Error");
		// 			// let oMsg = JSON.stringify(oerr);
		// 			sap.m.MessageBox.error("Some Error Occured");
		// 		}
		// 	});
		// },
		createResData: function(payload) {
			var oModel = this.getView().getModel();
			var sPath = `/RescDaySet`;
			var that=this;
			oModel.create(sPath, payload, {
				success: function(oResult) {
					sap.m.MessageToast.show("Success");
					that.upDateWeekSet();
					that.onExit();
				},
				error: function(oerr) {
					
					sap.m.MessageBox.error("Some Error Occured");
				}
			});
		},
		onExit: function() {
			this._oRouter.navTo('TimeSheetList', {
				weeknum: this.oWeekNum,
				Resc: this.oResc
			});
		},
		// onResTableUpdate:function(oEvent){
		// 	debugger;
		// 	this.getProjectTotalHour();
		// },

	});
});