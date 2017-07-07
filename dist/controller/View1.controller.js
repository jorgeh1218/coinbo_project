sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Coinbo.controller.View1", {
		onPress: function()
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");
		},
		onInit: function()
		{
				var oView= this.getView();
				var oTable; 
				var oModel = new sap.ui.model.json.JSONModel({
					data:[
							{
								//checked:true,
								cod: "093820192021",
				    			fecha: "20/01/2016"
							},
							{
								//checked:true,
								cod: "093353523021",
				    			fecha: "13/01/2016"
							},
							{
								//checked:true,
								cod: "082842019221",
				    			fecha: "06/01/2016"
							}
						]
						});
				oTable= oView.byId("VTable").setModel(oModel); 
		},
		onBack: function()
		{
			window.history.go(-1);
		},
		onClose: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		}
		
	});

});