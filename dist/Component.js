sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Coinbo/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("Coinbo.Component", {

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

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//console.log(oRouter);
			//oRouter.initialize();
			//this.getRouter().initialize();
			//console.log(this.getRouter());
			this.getRouter().initialize();
		}
	});

});