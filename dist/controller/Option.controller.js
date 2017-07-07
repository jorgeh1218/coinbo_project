sap.ui.define(['jquery.sap.global','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel', "sap/ui/core/routing/History"],
	function(jQuery, Controller, JSONModel, History) {
	"use strict";

	var InicioController = Controller.extend("Coinbo.controller.Option", {

	
		onInit : function (evt) {
			
			//Variables para cargar los datos del logo
			var oImgModel = new JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata", "/img.json"));
			this.getView().setModel(oImgModel, "img");
			
			
			
		},
		
		//Funcion para ir a la proxima pantalla (Inicio)
		toAprobar: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("aprobar");
		},
		
		toCalcular: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("calcular");
		},
		
		//Funcion para salir de la aplicaciÃ³n (ir a la pantalla login)
		onClose: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		
		//******Funcion para regresar a la pantalla anterior (Inicio)
		onBack : function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("inicio", null, true);
			}
		}
		
	});
	
	return InicioController;

});