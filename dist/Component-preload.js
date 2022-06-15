/**
* This file was auto-generated by SAP Web IDE build and includes all
* the source files required by SAPUI5 runtime for performance optimization.
* PLEASE DO NOT EDIT THIS FILE!! Changes will be overwritten the next time the build is run.
*/
jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "ui/ts/timesheetTimesheet/Component-preload",
	"modules": {
		"ui/ts/timesheetTimesheet/controller/DetailPopupView.controller.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\",\r\n\t\"sap/ui/model/Filter\",\r\n\t'sap/ui/model/FilterOperator'\r\n], function(Controller, Filter, FilterOperator) {\r\n\t\"use strict\";\r\n\r\n\treturn Controller.extend(\"ui.ts.timesheetTimesheet.controller.DetailPopupView\", {\r\n\t\tonInit: function() {\r\n\t\t\t// debugger;\r\n\t\t\t\tvar that=this;\r\n\t\t\t\ttry {\r\n\t\t\t\tsap.ushell.Container.getServiceAsync(\"UserInfo\").then( // promise is returned\r\n\t\t\t\t\tfunction(oService) {\r\n\t\t\t\t\t\t// debugger;\r\n\t\t\t\t\t\tvar oUser = oService.getUser().getId();\r\n\t\t\t\t\t\tthat.getOwnerComponent().getModel(\"local\").setProperty(\"/User\", oUser);\r\n\t\t\t\t\t\t// that.getOwnerComponent().getModel(\"local\").setProperty(\"/User\",oUser)\r\n\t\t\t\t\t},\r\n\t\t\t\t\tfunction(oError) {\r\n\t\t\t\t\t\t// debugger;\r\n\t\t\t\t\t}\r\n\t\t\t\t);\r\n\t\t\t} catch (error) {\r\n\t\t\t\tsap.m.MessageToast.show(\"UI ushell service containter not available\");\r\n\t\t\t\t// that.getOwnerComponent().getModel(\"local\").setProperty(\"/User\",\"Arunk\");\r\n\t\t\t}\r\n\t\t\tthis._oRouter = this.getOwnerComponent().getRouter();\r\n\t\t\tthis._oRouter.getRoute('DetailPopupView').attachPatternMatched(this.oRouteMatched, this);\r\n\t\t},\r\n\t\toRouteMatched: function(oEvent) {\r\n\t\t\tdebugger;\r\n\t\t\tthis.getView().getModel(\"layout\").setProperty(\"/layout\", \"OneColumn\");\r\n\t\t\tthis.oWeeknum = oEvent.getParameter('arguments').weeknum;\r\n\t\t\tthis.oResc = oEvent.getParameter('arguments').Resc;\r\n\t\t\tthis.Status = oEvent.getParameter('arguments').Status;\r\n\t\t\tthis.getProjectResSet();\r\n\t\t\tthis.getView().byId(\"idEditButton\").setVisible(true);\r\n\t\t\tif(this.Status.includes('Submitted')||this.Status.includes('Approved')){\r\n\t\t\t\tthis.getView().byId(\"idEditButton\").setVisible(false);\r\n\t\t\t}\r\n\t\t\t// else{\r\n\t\t\t\tthis.getOwnerComponent().getModel('local').setProperty('/enabled', false);\r\n\t\t\t// }\r\n\t\t\t\r\n\t\t\t// this.getWeekbyWeeknum();\r\n\t\t\t// RescDaySet(Resc='${this.oResc}',TsDate=datetime'2022-05-25T00%3A00%3A00',Project='0000001',Weeknumber='${this.oWeeknum}')\r\n\t\t},\r\n\t\tgetProjectResSet: function() {\r\n\t\t\tvar that = this;\r\n\t\t\tvar oUser=this.getView().getModel(\"local\").getProperty(\"/User\")\r\n\t\t\tvar oFilter1 = new Filter(\"Userid\", \"EQ\", oUser);\r\n\t\t\tvar oModel = this.getView().getModel();\r\n\t\t\toModel.read(\"/ProjectResourcesSet\", {\r\n\t\t\t\tfilters: [oFilter1],\r\n\t\t\t\tsuccess: function(data) {\r\n\t\t\t\t\t// debugger;\r\n\t\t\t\t\tthat.getView().getModel('local').setProperty('/localProjectResourcesSet', data.results);\r\n\t\t\t\t\tthat.getWeekbyWeeknum();\r\n\t\t\t\t},\r\n\t\t\t\terror: function(oErr) {\r\n\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t},\r\n\t\tgetWeekbyWeeknum: function() {\r\n\t\t\tvar that = this;\r\n\t\t\tvar oFilter1 = new Filter(\"Week\", \"EQ\", this.oWeeknum);\r\n\t\t\tvar oModel = this.getView().getModel();\r\n\t\t\toModel.read(\"/WeekDateSet\", {\r\n\t\t\t\tfilters: [oFilter1],\r\n\t\t\t\tsuccess: function(data) {\r\n\t\t\t\t\tdebugger;\r\n\t\t\t\t\tthat.getView().getModel('local').setProperty('/WeekDateSet', data.results[0]);\r\n\t\t\t\t\tvar oProjects = that.getView().getModel('local').getProperty('/localProjectResourcesSet');\r\n\t\t\t\t\tvar oDays = that.getView().getModel('local').getProperty('/WeekDateSet')\r\n\t\t\t\t\t\t// delete oDays.__metadata;\r\n\t\t\t\t\tfor (var i = 0; i < oProjects.length; i++) {\r\n\t\t\t\t\t\tvar element = oProjects[i];\r\n\t\t\t\t\t\tfor (var j = 1; j < 8; j++) {\r\n\t\t\t\t\t\t\tthat.getDayDate(j, element.Project, j);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t},\r\n\t\t\t\terror: function(oErr) {\r\n\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t},\r\n\t\tgetDayDate: function(oNum, oProject, count) {\r\n\t\t\tvar oDays = this.getView().getModel('local').getProperty('/WeekDateSet');\r\n\t\t\tswitch (oNum) {\r\n\t\t\t\tcase 1:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Monday\"], oProject, 'Monday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 2:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Tuesday\"], oProject, 'Tuesday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 3:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Wednesday\"], oProject, 'Wednesday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 4:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Thursday\"], oProject, 'Thursday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 5:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Friday\"], oProject, 'Friday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 6:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Saturday\"], oProject, 'Saturday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 7:\r\n\t\t\t\t\tthis.getProjectResDaySet(oDays[\"Sunday\"], oProject, 'Sunday');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tdefault:\r\n\t\t\t\t\t// code block\r\n\t\t\t}\r\n\t\t},\r\n\t\tgetProjectResDaySet: function(oDay, Project, aDay, count) {\r\n\t\t\tvar that = this;\r\n\t\t\tvar oFilter1 = new Filter(\"Weeknumber\", \"EQ\", this.oWeeknum);\r\n\t\t\tvar oFilter2 = new Filter(\"Project\", \"EQ\", Project);\r\n\t\t\tvar oFilter3 = new Filter(\"TsDate\", \"EQ\", oDay);\r\n\t\t\tvar oFilter4 = new Filter(\"Resc\", \"EQ\", this.oResc);\r\n\t\t\tvar oModel = this.getView().getModel();\r\n\t\t\toModel.read(\"/RescDaySet\", {\r\n\t\t\t\tfilters: [oFilter1, oFilter2, oFilter3, oFilter4],\r\n\t\t\t\tsuccess: function(data) {\r\n\t\t\t\t\t// debugger;\r\n\t\t\t\t\tvar oPrjSet = that.getView().getModel('local').getProperty('/localProjectResourcesSet');\r\n\t\t\t\t\tconst isEqual = (element) => element.Project === Project;\r\n\t\t\t\t\tvar oIndex = oPrjSet.findIndex(isEqual);\r\n\t\t\t\t\tif (data.results && data.results.length > 0) {\r\n\t\t\t\t\t\tthat.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + \"/\" + aDay, data.results[0]);\r\n\t\t\t\t\t\tif (aDay === 'Monday') {\r\n\t\t\t\t\t\t\tvar fTotal = data.results[0].TsHours ? parseFloat(data.results[0].TsHours) : 0;\r\n\t\t\t\t\t\t\tthat.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + \"/Total\", fTotal);\r\n\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\tvar oTotal = that.getView().getModel('local').getProperty('/localProjectResourcesSet/' + oIndex + \"/Total\");\r\n\t\t\t\t\t\t\toTotal = (oTotal ? parseFloat(oTotal) : 0) + (data.results[0].TsHours ? parseFloat(data.results[0].TsHours) : 0);\r\n\t\t\t\t\t\t\tthat.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + \"/Total\", oTotal);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tthat.getView().getModel('local').setProperty('/localProjectResourcesSet/' + oIndex + \"/\" + aDay, {\r\n\t\t\t\t\t\t\t\"TsHours\": 0\r\n\t\t\t\t\t\t});\r\n\r\n\t\t\t\t\t}\r\n\t\t\t\t},\r\n\t\t\t\terror: function(oErr) {\r\n\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t},\r\n\t\tgetProjectTotalHour: function() {\r\n\t\t\tdebugger;\r\n\t\t\tvar oData = this.getView().getModel('local').getProperty('/localProjectResourcesSet');\r\n\t\t\tfor (var i = 0; i < oData.length; i++) {\r\n\t\t\t\tdebugger;\r\n\t\t\t\tvar element = oData[i];\r\n\t\t\t\tvar total = 0;\r\n\t\t\t\ttotal = total + (element['Monday'].TsHours ? parseFloat(element['Monday'].TsHours) : 0);\r\n\t\t\t\ttotal = total + (element['Tuesday'].TsHours ? parseFloat(element['Tuesday'].TsHours) : 0);\r\n\t\t\t\ttotal = total + (element['Wednesday'].TsHours ? parseFloat(element['Wednesday'].TsHours) : 0);\r\n\t\t\t\ttotal = total + (element['Thursday'].TsHours ? parseFloat(element['Thursday'].TsHours) : 0);\r\n\t\t\t\ttotal = total + (element['Friday'].TsHours ? parseFloat(element['Friday'].TsHours) : 0);\r\n\t\t\t\ttotal = total + (element['Saturday'].TsHours ? parseFloat(element['Saturday'].TsHours) : 0);\r\n\t\t\t\ttotal = total + (element['Sunday'].TsHours ? parseFloat(element['Sunday'].TsHours) : 0);\r\n\t\t\t\telement['Total'] = total;\r\n\t\t\t}\r\n\t\t\tthis.getView().getModel('local').setProperty('/localProjectResourcesSet', oData);\r\n\t\t\tthis.getView().getModel('local').updateBindings();\r\n\t\t},\r\n\t\tformatDate: function(oDate) {\r\n\t\t\tif (oDate) {\r\n\t\t\t\tvar oFormat = sap.ui.core.format.DateFormat.getDateInstance({\r\n\t\t\t\t\tpattern: \"MM/dd/yyyy\"\r\n\t\t\t\t});\r\n\t\t\t\treturn oFormat.format(oDate);\r\n\t\t\t}\r\n\t\t},\r\n\t\tonAddTime: function() {\r\n\t\t\tif (!this.oAddHours) {\r\n\t\t\t\tthis.oAddHours = sap.ui.xmlfragment(this.getView().getId(), \"ui.ts.timesheetTimesheet.Fragments.AddHours\", this);\r\n\t\t\t\tthis.getView().addDependent(this.oAddHours);\r\n\t\t\t}\r\n\t\t\tthis.oAddHours.open();\r\n\t\t},\r\n\t\tonPressOkAddHours: function() {\r\n\t\t\tthis.oAddHours.close();\r\n\t\t},\r\n\t\tonPressEdit: function() {\r\n\t\t\tthis.getView().getModel('local').setProperty('/enabled', true);\r\n\t\t\tthis.getView().getModel('local').setProperty('/savevisible', true);\r\n\t\t\tthis.getView().getModel('local').setProperty('/editVisible', false);\r\n\t\t},\r\n\t\tsubmit:false,\r\n\t\tonPressSave: function(oEvent) {\r\n\t\t\tif(oEvent.getSource().getId().includes('idSaveSubmit')){\r\n\t\t\t\tthis.submit=true;\r\n\t\t\t}\r\n\t\t\telse{\r\n\t\t\t\tthis.submit=false;\r\n\t\t\t}\r\n\t\t\tthis.getView().getModel('local').setProperty('/enabled', false);\r\n\t\t\tthis.getView().getModel('local').setProperty('/savevisible', false);\r\n\t\t\tthis.getView().getModel('local').setProperty('/editVisible', true);\r\n\t\t\tvar oData = this.getView().getModel('local').getProperty('/localProjectResourcesSet');\r\n\t\t\tvar oDays = this.getView().getModel('local').getProperty('/WeekDateSet');\r\n\t\t\tfor (var i = 0; i < oData.length; i++) {\r\n\t\t\t\tdebugger;\r\n\t\t\t\tvar element = oData[i];\r\n\t\t\t\tvar prop = '__metadata';\r\n\t\t\t\tvar payload;\r\n\t\t\t\tfor (var j = 1; j < 8; j++) {\r\n\t\t\t\t\tvar oWeekDay;\r\n\t\t\t\t\tif (j == 1)\r\n\t\t\t\t\t\toWeekDay = 'Monday'\r\n\t\t\t\t\tif (j == 2)\r\n\t\t\t\t\t\toWeekDay = 'Tuesday'\r\n\t\t\t\t\tif (j == 3)\r\n\t\t\t\t\t\toWeekDay = 'Wednesday'\r\n\t\t\t\t\tif (j == 4)\r\n\t\t\t\t\t\toWeekDay = 'Thursday'\r\n\t\t\t\t\tif (j == 5)\r\n\t\t\t\t\t\toWeekDay = 'Friday'\r\n\t\t\t\t\tif (j == 6)\r\n\t\t\t\t\t\toWeekDay = 'Saturday'\r\n\t\t\t\t\tif (j == 7)\r\n\t\t\t\t\t\toWeekDay = 'Sunday'\r\n\t\t\t\t\t// if (element[oWeekDay].hasOwnProperty(prop)) {\r\n\t\t\t\t\t// \t// payload = {\r\n\t\t\t\t\t// \t// \tTsHours: element[oWeekDay].TsHours.toString()\r\n\t\t\t\t\t// \t// };\r\n\t\t\t\t\t// \t\tpayload = {\r\n\t\t\t\t\t// \t\t\"Resc\": this.oResc,\r\n\t\t\t\t\t// \t\t\"TsDate\": oDays[oWeekDay],\r\n\t\t\t\t\t// \t\t\"Project\": \"0000001\",\r\n\t\t\t\t\t// \t\t\"Weeknumber\": this.oWeeknum,\r\n\t\t\t\t\t// \t\t\"TsHours\": element[oWeekDay].TsHours.toString()\r\n\t\t\t\t\t// \t};\r\n\t\t\t\t\t// \tthis.updateResData(element.Project, oDays[oWeekDay].toISOString(), payload);\r\n\t\t\t\t\t// \t// break;\r\n\t\t\t\t\t// \t// return;\r\n\t\t\t\t\t// } else {\r\n\t\t\t\t\t\tpayload = {\r\n\t\t\t\t\t\t\t\"Resc\": this.oResc,\r\n\t\t\t\t\t\t\t\"TsDate\": oDays[oWeekDay],\r\n\t\t\t\t\t\t\t\"Project\": oData[i].Project,\r\n\t\t\t\t\t\t\t\"Weeknumber\": this.oWeeknum,\r\n\t\t\t\t\t\t\t\"TsHours\": element[oWeekDay].TsHours.toString()\r\n\t\t\t\t\t\t};\r\n\t\t\t\t\t\tthis.createResData(payload);\r\n\t\t\t\t\t\t// break;\r\n\t\t\t\t\t// }\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t// return;\r\n\t\t\t}\r\n\t\t},\r\n\t\tupDateWeekSet:function(){\r\n\t\t\tvar that=this;\r\n\t\t\tvar oItems=this.getView().byId(\"idTimesheetDetailTable\").getItems();\r\n\t\t\tvar total=0;\r\n\t\t\tfor(var i=0;i<oItems.length;i++){\r\n\t\t\t\tvar element=oItems[i];\r\n\t\t\t\ttotal=total + parseInt(element.getCells()[element.getCells().length-1].getText())\r\n\t\t\t}\r\n\t\t\tvar oModel=this.getView().getModel();\r\n\t\t\t\r\n\t\t\tvar oPayload={\r\n\t\t\t\t\"Hrs\":total.toString  (),\r\n\t\t\t\t\"Status\":this.submit?\"Submitted\":\"Saved\"\r\n\t\t\t};\r\n\t\t\tvar oPath=`/WeeklyTSSet(Resc='${this.oResc}',Weeknumber='${this.oWeeknum}')`;\r\n\t\t\toModel.update(oPath, oPayload, {\r\n\t\t\tsuccess: function(oResult) {\r\n\t\t\t\tsap.m.MessageToast.show(\"Success\");\r\n\t\t\t\tthat.onExit();\r\n\t\t\t},\r\n\t\t\terror: function(oerr) {\r\n\t\t\t\t\r\n\t\t\t\tsap.m.MessageBox.error(\"Some Error Occured\");\r\n\t\t\t}\r\n\t\t\t});\r\n\t\t},\r\n\t\t// updateResData: function(oProject, oDate, payload) {\r\n\t\t// \tvar oModel = this.getView().getModel();\r\n\t\t// \toDate = oDate.split(\".\")[0];\r\n\t\t// \toDate = oDate.replace(\":\", \"%3A\");\r\n\t\t// \toDate = oDate.replace(\":\", \"%3A\");\r\n\t\t// \t// var sPath = `/RescDaySet(Resc='${this.oResc}',TsDate=datetime'${oDate}',Project='${oProject}',Weeknumber='${this.oWeeknum}')`;\r\n\t\t// \tvar sPath = `/RescDaySet`;\r\n\t\t// \toModel.create(sPath, payload, {\r\n\t\t// \t\tsuccess: function(oResult) {\r\n\t\t// \t\t\tdebugger;\r\n\t\t// \t\t\tsap.m.MessageToast.show(\"Success\");\r\n\t\t// \t\t},\r\n\t\t// \t\terror: function(oerr) {\r\n\t\t// \t\t\tdebugger;\r\n\t\t// \t\t\t// sap.m.MessageToast.show(\"Error\");\r\n\t\t// \t\t\t// let oMsg = JSON.stringify(oerr);\r\n\t\t// \t\t\tsap.m.MessageBox.error(\"Some Error Occured\");\r\n\t\t// \t\t}\r\n\t\t// \t});\r\n\t\t// },\r\n\t\tcreateResData: function(payload) {\r\n\t\t\tvar oModel = this.getView().getModel();\r\n\t\t\tvar sPath = `/RescDaySet`;\r\n\t\t\tvar that=this;\r\n\t\t\toModel.create(sPath, payload, {\r\n\t\t\t\tsuccess: function(oResult) {\r\n\t\t\t\t\tsap.m.MessageToast.show(\"Success\");\r\n\t\t\t\t\tthat.upDateWeekSet();\r\n\t\t\t\t\tthat.onExit();\r\n\t\t\t\t},\r\n\t\t\t\terror: function(oerr) {\r\n\t\t\t\t\t\r\n\t\t\t\t\tsap.m.MessageBox.error(\"Some Error Occured\");\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t},\r\n\t\tonExit: function() {\r\n\t\t\tthis._oRouter.navTo('TimeSheetList', {\r\n\t\t\t\tweeknum: this.oWeekNum,\r\n\t\t\t\tResc: this.oResc\r\n\t\t\t});\r\n\t\t},\r\n\t\t// onResTableUpdate:function(oEvent){\r\n\t\t// \tdebugger;\r\n\t\t// \tthis.getProjectTotalHour();\r\n\t\t// },\r\n\r\n\t});\r\n});",
		"ui/ts/timesheetTimesheet/controller/App.controller.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\"\r\n], function(Controller) {\r\n\t\"use strict\";\r\n\r\n\treturn Controller.extend(\"ui.ts.timesheetTimesheet.controller.App\", {\r\n\r\n\t\t/**\r\n\t\t * Called when a controller is instantiated and its View controls (if available) are already created.\r\n\t\t * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.\r\n\t\t * @memberOf ui.ts.timesheetTimesheet.view.App\r\n\t\t */\r\n\t\tonInit: function() {\r\n\t\t\t// this.getOwnerComponent().getModel(\"layout\").setProperty(\"/layout\", \"OneColumn\");\r\n\t\t\t// if(!this.getView().getModel(\"local\").getProperty(\"/User\")){\r\n\t\t\t// \tthis.getView().getModel(\"local\").setProperty(\"/User\",'ARUNK');\r\n\t\t\t// }\r\n\t\t\tvar that=this;\r\n\t\t\t\ttry {\r\n\t\t\t\tsap.ushell.Container.getServiceAsync(\"UserInfo\").then( // promise is returned\r\n\t\t\t\t\tfunction(oService) {\r\n\t\t\t\t\t\t// debugger;\r\n\t\t\t\t\t\tvar oUser = oService.getUser().getId();\r\n\t\t\t\t\t\tthat.getOwnerComponent().getModel(\"local\").setProperty(\"/User\", oUser);\r\n\t\t\t\t\t\t// that.getOwnerComponent().getModel(\"local\").setProperty(\"/User\",oUser)\r\n\t\t\t\t\t},\r\n\t\t\t\t\tfunction(oError) {\r\n\t\t\t\t\t\t// debugger;\r\n\t\t\t\t\t}\r\n\t\t\t\t);\r\n\t\t\t} catch (error) {\r\n\t\t\t\tsap.m.MessageToast.show(\"UI ushell service containter not available\");\r\n\r\n\t\t\t}\r\n\t\t\r\n\t\t}\r\n\r\n\t\t/**\r\n\t\t * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered\r\n\t\t * (NOT before the first rendering! onInit() is used for that one!).\r\n\t\t * @memberOf ui.ts.timesheetTimesheet.view.App\r\n\t\t */\r\n\t\t//\tonBeforeRendering: function() {\r\n\t\t//\r\n\t\t//\t},\r\n\r\n\t\t/**\r\n\t\t * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.\r\n\t\t * This hook is the same one that SAPUI5 controls get after being rendered.\r\n\t\t * @memberOf ui.ts.timesheetTimesheet.view.App\r\n\t\t */\r\n\t\t//\tonAfterRendering: function() {\r\n\t\t//\r\n\t\t//\t},\r\n\r\n\t\t/**\r\n\t\t * Called when the Controller is destroyed. Use this one to free resources and finalize activities.\r\n\t\t * @memberOf ui.ts.timesheetTimesheet.view.App\r\n\t\t */\r\n\t\t//\tonExit: function() {\r\n\t\t//\r\n\t\t//\t}\r\n\r\n\t});\r\n\r\n});",
		"ui/ts/timesheetTimesheet/controller/TimeSheetList.controller.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\",\r\n\t\"sap/m/MessageToast\",\r\n\t\"sap/ui/model/Filter\",\r\n\t'sap/ui/model/FilterOperator'\r\n], function(Controller, MessageToast, Filter, FilterOperator) {\r\n\t\"use strict\";\r\n\r\n\treturn Controller.extend(\"ui.ts.timesheetTimesheet.controller.TimeSheetList\", {\r\n\t\tonInit: function() {\r\n\t\t\t// debugger;\r\n\t\t\tvar that = this;\r\n\t\t\ttry {\r\n\t\t\t\tsap.ushell.Container.getServiceAsync(\"UserInfo\").then( // promise is returned\r\n\t\t\t\t\tfunction(oService) {\r\n\t\t\t\t\t\t// debugger;\r\n\t\t\t\t\t\tvar oUser = oService.getUser().getId();\r\n\t\t\t\t\t\tthat.getOwnerComponent().getModel(\"local\").setProperty(\"/User\", oUser);\r\n\t\t\t\t\t\t// that.getOwnerComponent().getModel(\"local\").setProperty(\"/User\",oUser)\r\n\t\t\t\t\t},\r\n\t\t\t\t\tfunction(oError) {\r\n\t\t\t\t\t\t// debugger;\r\n\t\t\t\t\t}\r\n\t\t\t\t);\r\n\t\t\t} catch (error) {\r\n\t\t\t\tsap.m.MessageToast.show(\"UI ushell service containter not available\");\r\n\t\t\t\t// that.getOwnerComponent().getModel(\"local\").setProperty(\"/User\",\"Arunk\");\r\n\r\n\t\t\t}\r\n\t\t\tthis._oRouter = this.getOwnerComponent().getRouter();\r\n\t\t\tthis._oRouter.getRoute('TimeSheetList').attachPatternMatched(this.oRouteMatched, this);\r\n\t\t},\r\n\t\toRouteMatched: function() {\r\n\t\t\t// debugger;\r\n\t\t\t// var oUserDetails = await this.getUserInfo();\r\n\t\t\tthis.getView().getModel(\"layout\").setProperty(\"/layout\", \"OneColumn\");\r\n\t\t\tthis.oResc = this.getOwnerComponent().getModel(\"local\").getProperty(\"/User\");\r\n\t\t\tvar oFilter = new Filter(\"Resc\", \"EQ\", this.oResc);\r\n\t\t\tthis.getView().byId(\"tabId\").getBinding(\"items\").filter([oFilter]);\r\n\r\n\t\t},\r\n\t\t// getUserInfo: function() {\r\n\t\t//              var that = this\r\n\t\t//              try {\r\n\t\t//                  sap.ushell.Container.getServiceAsync(\"UserInfo\").then( // promise is returned\r\n\t\t//                      function (oService) {\r\n\t\t//                          debugger;\r\n\t\t//                          return oService.getUserEmail();\r\n\t\t//                      },\r\n\t\t//                      function (oError) {\r\n\t\t//                          debugger;\r\n\t\t//                      }\r\n\t\t//                   );\r\n\t\t//              } catch (error) {\r\n\t\t//                  MessageToast.show(\"UI ushell service containter not available\");\r\n\t\t//              }\r\n\t\t//          },\r\n\t\tonWeekCreate: function(oEvent) {\r\n\t\t\tdebugger;\r\n\r\n\t\t\tvar oWeek = oEvent.getSource().getParent().getContent()[0].getContent()[1].getValue();\r\n\t\t\tvar oPayload = {\r\n\t\t\t\t\"Resc\": this.oResc,\r\n\t\t\t\t\"Status\": \"Saved\",\r\n\t\t\t\t// \"TsDate\":new Date(),\r\n\t\t\t\t// \"Project\":\"Project\",\r\n\t\t\t\t\"Weeknumber\": oWeek\r\n\t\t\t\t\t// \"TsHours\":\"2\"\r\n\t\t\t};\r\n\t\t\tvar omodel = this.getView().getModel();\r\n\t\t\tthis.getDialog().close();\r\n\t\t\tomodel.create('/WeeklyTSSet', oPayload, {\r\n\t\t\t\tsuccess: function(data) {\r\n\t\t\t\t\t// debugger;\r\n\t\t\t\t\tsap.m.MessageToast.show(\"Week Created Sccuessfully\");\r\n\t\t\t\t\t//console.log(\"success\");\r\n\t\t\t\t},\r\n\t\t\t\terror: function(oErr) {\r\n\t\t\t\t\t// debugger;\r\n\t\t\t\t\tsap.m.MessageToast.show(\"Some Error Occured\");\r\n\t\t\t\t\t// console.log('failed');\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t},\r\n\t\tonPressWeeknumber: function(oEvent) {\r\n\t\t\t// debugger;\r\n\t\t\t// this.getDetailDailog().open();\r\n\t\t\tthis.oWeekNum = oEvent.getSource().getProperty(\"text\");\r\n\t\t\tthis.oResc = oEvent.getSource().getParent().getBindingContext().getObject().Resc;\r\n\t\t\tthis.Status = oEvent.getSource().getParent().getBindingContext().getObject().Status;\r\n\t\t\tthis._oRouter.navTo(\"DetailPopupView\", {\r\n\t\t\t\tweeknum: this.oWeekNum,\r\n\t\t\t\tResc: this.oResc,\r\n\t\t\t\tStatus: this.Status\r\n\t\t\t});\r\n\t\t},\r\n\t\t// getDetailDailog:function(){\r\n\t\t// \tif (!this.oDetailDialog) {\r\n\t\t//                  this.oDetailDialog = sap.ui.xmlfragment(this.getView().getId(), \"ui.ts.timesheetTimesheet.Fragments.DetailPopup\", this);\r\n\t\t//                  this.getView().addDependent(this.oDetailDialog);\r\n\t\t//              }\r\n\t\t//              return this.oDetailDialog;\r\n\t\t// },\r\n\t\tgetDialog: function() {\r\n\t\t\tif (!this.oCreateDialog) {\r\n\t\t\t\tthis.oCreateDialog = sap.ui.xmlfragment(this.getView().getId(), \"ui.ts.timesheetTimesheet.Fragments.Create\", this);\r\n\t\t\t\tthis.getView().addDependent(this.oCreateDialog);\r\n\t\t\t}\r\n\t\t\treturn this.oCreateDialog;\r\n\t\t},\r\n\t\tonOpenCreatePopup: function() {\r\n\t\t\tthis.getDialog().open();\r\n\t\t},\r\n\t\tonCancel: function() {\r\n\t\t\tthis.getDialog().close();\r\n\t\t},\r\n\t\tonFilterWeeknumber: function() {\r\n\t\t\tvar aFilter = [];\r\n\t\t\tvar sQuery = this.getView().byId('input2').getValue();\r\n\t\t\tvar oFilter1 = new Filter(\"Resc\", \"EQ\", this.oResc);\r\n\t\t\taFilter.push(oFilter1);\r\n\t\t\tif (sQuery) {\r\n\t\t\t\tvar oFilter = new Filter(\"Weeknumber\", FilterOperator.Contains, sQuery);\r\n\t\t\t\t// this.getView().byId(\"tabId\").getBinding(\"items\").filter([oFilter]);\r\n\t\t\t\taFilter.push(oFilter);\r\n\t\t\t}\r\n\t\t\tvar oList = this.getView().byId('tabId');\r\n\t\t\toList.getBinding('items').filter(aFilter);\r\n\t\t}\r\n\r\n\t\t// onCancelDetail:function(){\r\n\t\t// \tthis.getDetailDailog().close();\r\n\t\t// }             \r\n\t});\r\n});",
		"ui/ts/timesheetTimesheet/model/models.js": "sap.ui.define([\r\n\t\"sap/ui/model/json/JSONModel\",\r\n\t\"sap/ui/Device\"\r\n], function(JSONModel, Device) {\r\n\t\"use strict\";\r\n\r\n\treturn {\r\n\r\n\t\tcreateDeviceModel: function() {\r\n\t\t\tvar oModel = new JSONModel(Device);\r\n\t\t\toModel.setDefaultBindingMode(\"OneWay\");\r\n\t\t\treturn oModel;\r\n\t\t}\r\n\r\n\t};\r\n});",
		"ui/ts/timesheetTimesheet/Component.js": "sap.ui.define([\r\n\t\"sap/ui/core/UIComponent\",\r\n\t\"sap/ui/Device\",\r\n\t\"ui/ts/timesheetTimesheet/model/models\"\r\n], function(UIComponent, Device, models) {\r\n\t\"use strict\";\r\n\r\n\treturn UIComponent.extend(\"ui.ts.timesheetTimesheet.Component\", {\r\n\r\n\t\tmetadata: {\r\n\t\t\tmanifest: \"json\"\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.\r\n\t\t * @public\r\n\t\t * @override\r\n\t\t */\r\n\t\tinit: function() {\r\n\t\t\t// call the base component's init function\r\n\t\t\tUIComponent.prototype.init.apply(this, arguments);\r\n\t\t\tthis.getRouter().initialize();\r\n\r\n\t\t\t// set the device model\r\n\t\t\tthis.setModel(models.createDeviceModel(), \"device\");\r\n\t\t\t// this.getService(\"ShellUIService\").then( // promise is returned\r\n\t\t\t// \tfunction(oService) {\r\n\t\t\t// \t\tdebugger;\r\n\t\t\t// \t\toService.setTitle(\"Application Title\");\r\n\t\t\t// \t},\r\n\t\t\t// \tfunction(oError) {\r\n\t\t\t// \t\tjQuery.sap.log.error(\"Cannot get ShellUIService\", oError, \"my.app.Component\");\r\n\t\t\t// \t}\r\n\t\t\t// );\r\n\t\t\t// try {\r\n\r\n\t\t\t// }\r\n\t\t\r\n\t\t},\r\n\t\tdestroy : function () {\r\n\t\t\t// call the base component's destroy function\r\n\t\t\tUIComponent.prototype.destroy.apply(this, arguments);\r\n\t\t}\r\n\t\t\r\n\t});\r\n});",
		"ui/ts/timesheetTimesheet/view/App.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:f=\"sap.f\" xmlns=\"sap.m\" controllerName=\"ui.ts.timesheetTimesheet.controller.App\"\r\n\txmlns:html=\"http://www.w3.org/1999/xhtml\">\r\n\t<!--<App>-->\r\n\t<!--\t<pages>-->\r\n\t<!--\t\t<Page title=\"Title\">-->\r\n\t<!--\t\t\t<content></content>-->\r\n\t<!--\t\t</Page>-->\r\n\t<!--\t</pages>-->\r\n\t<!--</App>-->\r\n\t<App id=\"App\">\r\n        <f:FlexibleColumnLayout id=\"layout\" layout=\"{layout>/layout}\"></f:FlexibleColumnLayout>\r\n    </App>\r\n</mvc:View>",
		"ui/ts/timesheetTimesheet/view/DetailPopupView.view.xml": "<mvc:View controllerName=\"ui.ts.timesheetTimesheet.controller.DetailPopupView\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\n\txmlns:fb=\"sap.ui.comp.filterbar\" xmlns:mvc=\"sap.ui.core.mvc\" displayBlock=\"true\" xmlns=\"sap.m\" xmlns:f=\"sap.f\" xmlns:core=\"sap.ui.core\">\n\t<Page title=\"Detail View\">\n\t\t<headerContent>\n\t\t\t<Button tooltip=\"Save\" text=\"Save\" type=\"Emphasized\" visible=\"{local>/enabled}\" press=\"onPressSave\"/>\n\t\t\t\t<Button id=\"idSaveSubmit\" tooltip=\"Save and Submit\" text=\"Save and Submit\" visible=\"{local>/enabled}\" type=\"Emphasized\" press=\"onPressSave\"/>\n\t\t\t<!--<Button id=\"idSaveSubmit\" tooltip=\"Save & Submit\" text=\"Save & Submit\" type=\"Emphasized\" visible=\"{local>/enabled}\" press=\"onPressSave\" />-->\n\t\t\t<Button id=\"idEditButton\" tooltip=\"Edit\" text=\"Edit\" type=\"Emphasized\" visible=\"{=${local>/enabled}?false:true}\" press=\"onPressEdit\"/>\n\t\t\t<Button tooltip=\"Exit\" text=\"Exit\" type=\"Emphasized\" press=\"onExit\"/>\n\t\t\n\t\t</headerContent>\n\t\t<Table id=\"idTimesheetDetailTable\" items=\"{local>/localProjectResourcesSet}\" updateFinished=\"onResTableUpdate\">\n\t\t\t<headerToolbar>\n\t\t\t\t<OverflowToolbar>\n\t\t\t\t\t<Title text=\"{local>/User} : { path:'local>/WeekDateSet/Monday', formatter:'.formatDate'}\" level=\"H2\"/>\n\t\t\t\t\t<ToolbarSpacer/>\n\t\t\t\t</OverflowToolbar>\n\t\t\t</headerToolbar>\n\t\t\t<columns>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Project\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Mon({ path:'local>/WeekDateSet/Monday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Tue({ path:'local>/WeekDateSet/Tuesday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column>\n\t\t\t\t\t<Text text=\"Wed({ path:'local>/WeekDateSet/Wednesday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Thu({ path:'local>/WeekDateSet/Thursday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Fri({ path:'local>/WeekDateSet/Friday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column>\n\t\t\t\t\t<Text text=\"Sat({ path:'local>/WeekDateSet/Saturday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Sun({ path:'local>/WeekDateSet/Sunday', formatter:'.formatDate'})\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column >\n\t\t\t\t\t<Text text=\"Total\"/>\n\t\t\t\t</Column>\n\t\t\t</columns>\n\t\t\t<items>\n\t\t\t\t<ColumnListItem vAlign=\"Middle\">\n\t\t\t\t\t<cells>\n\t\t\t\t\t\t<ObjectIdentifier title=\"{local>Project}\" text=\"{local>Name}\"/>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Monday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Monday/TsHours}\" type=\"Number\" maxLength=\"2\" textAlign=\"Center\" change=\"getProjectTotalHour\" visible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Text text=\"{local>Name}\"/>-->\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Tuesday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Tuesday/TsHours}\" type=\"Number\" maxLength=\"2\" change=\"getProjectTotalHour\" textAlign=\"Center\"\n\t\t\t\t\t\t\t\t\t\t\tvisible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Wednesday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Wednesday/TsHours}\" type=\"Number\" maxLength=\"2\" change=\"getProjectTotalHour\" textAlign=\"Center\"\n\t\t\t\t\t\t\t\t\t\t\tvisible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Thursday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Thursday/TsHours}\" type=\"Number\" maxLength=\"2\" change=\"getProjectTotalHour\" textAlign=\"Center\"\n\t\t\t\t\t\t\t\t\t\t\tvisible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Friday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Friday/TsHours}\" type=\"Number\" maxLength=\"2\" change=\"getProjectTotalHour\" textAlign=\"Center\" visible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Saturday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Saturday/TsHours}\" type=\"Number\" change=\"getProjectTotalHour\" maxLength=\"2\" textAlign=\"Center\"\n\t\t\t\t\t\t\t\t\t\t\tvisible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<VBox>\n\t\t\t\t\t\t\t<CustomListItem>\n\t\t\t\t\t\t\t\t<VBox height=\"100%\">\n\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMargin\">\n\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<FlexItemData growFactor=\"1\" shrinkFactor=\"0\"/>\n\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t<Title text=\"{local>Sunday/TsHours}\" visible=\"{=${local>/enabled}?false:true}\"/>\n\t\t\t\t\t\t\t\t\t\t<Input value=\"{local>Sunday/TsHours}\" type=\"Number\" change=\"getProjectTotalHour\" maxLength=\"2\" textAlign=\"Center\" visible=\"{local>/enabled}\"/>\n\t\t\t\t\t\t\t\t\t\t<!--<Button text=\"Add Time\" icon=\"sap-icon://add\" enabled=\"{local>/enabled}\"/>-->\n\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t<Text text=\"{local>Total}\"/>\n\t\t\t\t\t</cells>\n\t\t\t\t</ColumnListItem>\n\t\t\t</items>\n\t\t</Table>\n\t</Page>\n</mvc:View>",
		"ui/ts/timesheetTimesheet/view/TimeSheetList.view.xml": "<mvc:View controllerName=\"ui.ts.timesheetTimesheet.controller.TimeSheetList\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\n\txmlns:fb=\"sap.ui.comp.filterbar\" xmlns:uxap=\"sap.uxap\" xmlns:mvc=\"sap.ui.core.mvc\" displayBlock=\"true\" xmlns=\"sap.m\">\n\t<Page title=\"Timesheet View\">\n\t\t<fb:FilterBar id=\"_IDGenFilterBar1\" search=\"onSearch\">\n\t\t\t<fb:filterGroupItems>\n\t\t\t\t<!--<fb:FilterGroupItem id=\"_IDGenFilterGroupItem1\" groupName=\"Id1\"  name=\"B\" label=\"Resource\" visibleInFilterBar=\"true\" partOfCurrentVariant=\"true\">-->\n\t\t\t\t<!--    <fb:control>-->\n\t\t\t\t<!--        <Input id=\"input1\" type=\"Text\" showValueHelp=\"true\" valueHelpRequest=\"handleValueHelpResource\" ></Input>-->\n\t\t\t\t<!--    </fb:control>-->\n\t\t\t\t<!--</fb:FilterGroupItem>-->\n\t\t\t\t<fb:FilterGroupItem id=\"_IDGenFilterGroupItem2\" groupName=\"Id2\" name=\"A\" label=\"Week\" visibleInFilterBar=\"true\" partOfCurrentVariant=\"true\">\n\t\t\t\t\t<fb:control>\n\t\t\t\t\t\t<!--<Input id=\"input2\" type=\"Text\" showValueHelp=\"true\" valueHelpRequest=\"handleValueHelpWeek\" ></Input>-->\n\t\t\t\t\t\t<Input id=\"input2\" type=\"Text\" maxLength='6' liveChange=\"onFilterWeeknumber\"></Input>\n\t\t\t\t\t</fb:control>\n\t\t\t\t</fb:FilterGroupItem>\n\t\t\t</fb:filterGroupItems>\n\t\t</fb:FilterBar>\n\t\t<Table items='{path:\"/WeeklyTSSet\"}' id=\"tabId\">\n\t\t\t<headerToolbar>\n\t\t\t\t<OverflowToolbar>\n\t\t\t\t\t<Title text=\"\" level=\"H2\"/>\n\t\t\t\t\t<ToolbarSpacer/>\n\t\t\t\t\t<Button tooltip=\"Create\" icon=\"sap-icon://add\"  text=\"Create\" press=\"onOpenCreatePopup\" enabled=\"{editable>/editable}\"/>\n\t\t\n\t\t\t\t</OverflowToolbar>\n\t\t\t</headerToolbar>\n\t\t\t<columns>\n\t\t\t\t<Column demandPopin=\"true\" minScreenWidth=\"Tablet\">\n\t\t\t\t\t<Text text=\"Resource\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column demandPopin=\"true\" minScreenWidth=\"Tablet\">\n\t\t\t\t\t<Text text=\"Weeknum\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column demandPopin=\"true\" minScreenWidth=\"Tablet\">\n\t\t\t\t\t<Text text=\"Status\"/>\n\t\t\t\t</Column>\n\t\t\t\t<Column demandPopin=\"true\" minScreenWidth=\"Tablet\">\n\t\t\t\t\t<Text text=\"Hrs\"/>\n\t\t\t\t</Column>\n\t\t\t</columns>\n\t\t\t<items>\n\t\t\t\t<ColumnListItem type=\"Active\">\n\t\t\t\t\t<cells>\n\t\t\t\t\t\t<Text text=\"{Resc}\"/>\n\t\t\t\t\t\t<Link text=\"{Weeknumber}\" press=\"onPressWeeknumber\"/>\n\t\t\t\t\t\t<Text text=\"{Status}\"/>\n\t\t\t\t\t\t<Text text=\"{Hrs}\"/>\n\t\t\t\t\t</cells>\n\t\t\t\t</ColumnListItem>\n\t\t\t</items>\n\t\t</Table>\n\t\t<!--<footer>-->\n\t\t<!--\t<Toolbar>-->\n\t\t<!--\t\t<ToolbarSpacer/>-->\n\t\t<!--\t\t<Button text=\"Create\" press=\"onOpenCreatePopup\"/>-->\n\t\t<!--\t</Toolbar>-->\n\t\t<!--</footer>-->\n\t</Page>\n</mvc:View>",
		"ui/ts/timesheetTimesheet/Fragments/Create.fragment.xml": "<c:FragmentDefinition xmlns=\"sap.m\" xmlns:c=\"sap.ui.core\" xmlns:form=\"sap.ui.layout.form\">\r\n    <Dialog draggable=\"false\" title=\"Create Resource\" resizable=\"false\" contentHeight=\"70%\" contentWidth=\"60%\">\r\n        <form:SimpleForm editable=\"true\">\r\n        \t<Label text=\"Week\" design=\"Bold\"/>\r\n            <Input width=\"40%\"></Input>\r\n        </form:SimpleForm>\r\n        <beginButton>\r\n        \t<Button press=\"onWeekCreate\" text=\"Save\" type=\"Emphasized\"></Button>\r\n        </beginButton>\r\n        <endButton>\r\n            <Button press=\"onCancel\" text=\"Cancel\" type=\"Emphasized\"></Button>\r\n        </endButton>\r\n    </Dialog>\r\n</c:FragmentDefinition>",
		"ui/ts/timesheetTimesheet/Fragments/AddHours.fragment.xml": "<c:FragmentDefinition xmlns=\"sap.m\" xmlns:c=\"sap.ui.core\" xmlns:form=\"sap.ui.layout.form\">\r\n    <Dialog draggable=\"false\" title=\"Add Hours\">\r\n    \t<HBox width=\"100%\" alignContent=\"Center\" alignItems=\"Center\">\r\n    \t\t <!--<form:SimpleForm editable=\"true\">-->\r\n        \t<Label text=\"Hours :\" design=\"Bold\" class=\"sapUiSmallMarginBegin\"/>\r\n            <Input  class=\"sapUiSmallMarginBegin\"></Input>\r\n        <!--</form:SimpleForm>-->\r\n    \t</HBox>\r\n        <endButton>\r\n            <Button  press=\"onPressOkAddHours\" text=\"Ok\" type=\"Emphasized\"></Button>\r\n        </endButton>\r\n    </Dialog>\r\n</c:FragmentDefinition>"
	}
});