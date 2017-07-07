sap.ui.define(['jquery.sap.global','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel'],
	function(jQuery, Controller, JSONModel) {
	"use strict";

	

	var InicioController = Controller.extend("Coinbo.controller.Inicio", {

	
		onInit : function (evt) {
			
			//Variables para cargar los datos del logo
			var oImgModel = new JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata", "/img.json"));
			this.getView().setModel(oImgModel, "img");
			
	        //Variables para cargar los datos del tile
	        var sPath = jQuery.sap.getModulePath("Coinbo.mockdata", "/tiles.json");
			var oModel = new JSONModel(sPath);
			this.getView().setModel(oModel);
		},
		
		//Para el tile
		handleEditPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = ! oTileContainer.getEditable();
			oTileContainer.setEditable(newValue);
			evt.getSource().setText(newValue ? "Done" : "Edit");
		},
		
		handleBusyPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = ! oTileContainer.getBusy();
			oTileContainer.setBusy(newValue);
			evt.getSource().setText(newValue ? "Done" : "Busy state");
		},
		
		handleTileDelete : function (evt) {
			var tile = evt.getParameter("tile");
			evt.getSource().removeTile(tile);
		},
		
		retrieveString: function(string)
		{
			//Getting the string from the tiled thats been touched
			var pos=string.indexOf("Coinbo_") + 7;
			return string.substring(pos,string.length);
		},
		
		//Funcion para ir a la proxima pantalla (Inicio)
		toParameters: function (oEvent) {
			var string= this.retrieveString(oEvent.getParameter("id"));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("parametrizar",{origin:string});
		},
		
		toOption: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
			//console.log(oEvent.getId());
			console.log(oEvent.getSource());
			console.log();
			var string= this.retrieveString(oEvent.getParameter("id"));
			console.log(string);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("option",{origin:string});
		},
		
		//Funcion para salir de la aplicaciÃ³n (ir a la pantalla login)
		onClose: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		}
		
	});
	
	return InicioController;

});