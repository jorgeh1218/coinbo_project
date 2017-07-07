sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Coinbo.controller.Detail", {
		onNavBack: function()
		{
		//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//	oRouter.navTo("View1");
			window.history.go(-1);
		}
	});

});