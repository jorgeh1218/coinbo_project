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
			var oModel;
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//console.log(oRouter);
			//oRouter.initialize();
			//this.getRouter().initialize();
			//console.log(this.getRouter());
			this.getRouter().initialize();
			
			oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/param.json")); 
			sap.ui.getCore().setModel(oModel,"param");
			oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/bolivaresPorCaja.json"));
			sap.ui.getCore().setModel(oModel,"bolivaresPorCaja");
			oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/deduccionNotaDebito.json"));
			sap.ui.getCore().setModel(oModel,"deduccionNotaDebito");
			oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/penalizacion.json"));
			sap.ui.getCore().setModel(oModel,"penalizacion");
			oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/recuperacionCh.json"));
			sap.ui.getCore().setModel(oModel,"recuperacionCh");
			oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/calcularComision.json"));
			sap.ui.getCore().setModel(oModel,"calcularComision");
			oModel=new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/trasladoAGranel.json")); 
			sap.ui.getCore().setModel(oModel,"calcularTrasladoGranel");
			oModel=new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/despachoConsumoLocal.json")); 
			sap.ui.getCore().setModel(oModel,"calcularDespachoLocal");
			oModel=new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/materiaPrimaAlimentosGranel.json")); 
			sap.ui.getCore().setModel(oModel,"calcularTrasladoAlimentoMateria");
			oModel=new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/trasladoAves.json")); 
			sap.ui.getCore().setModel(oModel,"calcularTrasladoAves");
			oModel=new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/incentivoNucleos.json")); 
			sap.ui.getCore().setModel(oModel,"calcularIncentivoNucleo");
			oModel=new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/incentivoPlanta.json")); 
			sap.ui.getCore().setModel(oModel,"calcularIncentivoPlanta");
			
		}
	});

});