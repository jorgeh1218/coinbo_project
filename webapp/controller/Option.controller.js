sap.ui.define(['jquery.sap.global','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel', "sap/ui/core/routing/History"],
	function(jQuery, Controller, JSONModel, History) {
	"use strict";


	var InicioController = Controller.extend("Coinbo.controller.Option", {

	
		onInit : function (evt) {
			
			//Variables para cargar los datos del logo
			var oImgModel = new JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata", "/img.json"));
			this.getView().setModel(oImgModel, "img");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("option").attachPatternMatched(this.getParamsAndSet,this);
			
		//	console.log(oRouter.getRoute(""));
		},
		getParamsAndSet: function(evt)
		{
			this.src_ENVIRONMENT; 
			//console.log(evt.getParameter("arguments"));
			//console.log(evt.getParameter("arguments").origin);	
			var title= this.getView().byId("optionPage");
			//title.setTitle(evt.getParameter("arguments").origin);
			switch(evt.getParameter("arguments").origin)
			{
				case "Comision":  title.setTitle("Comisiones por Ventas");
				this.src_ENVIRONMENT=0;
					break;
				case "Planta":title.setTitle("Incentivos por Planta");
				this.src_ENVIRONMENT=1;
					break;
				case "Nucleo":title.setTitle("Incentivos por Núcleo Avícola");
				this.src_ENVIRONMENT=2;
					break;
				case "Huevos":title.setTitle("Bonificaciones por Traslado de Huevos");
				this.src_ENVIRONMENT=3;
					break;
				case "Aves":title.setTitle("Bonificaciones por Traslado de Aves");
				this.src_ENVIRONMENT=4;
					break;
				case "Alimentos":title.setTitle("Bonificaciones por Traslado de Alimentos & Materia Prima");
				this.src_ENVIRONMENT=5;
					break;
				case "Otros": title.setTitle("Otros traslados");
				this.src_ENVIRONMENT=6;
			}
			//console.log("MySRCENVIRONMENT "+this.src_ENVIRONMENT);
		},
		
		//Funcion para ir a la proxima pantalla (Inicio)
		toAprobar: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			oRouter.navTo("master",{origin:this.src_ENVIRONMENT});
		},
		
		toCalcular: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("calcular",{origin:this.src_ENVIRONMENT});
		},
		
		//Funcion para salir de la aplicaciÃ³n (ir a la pantalla login)
		onClose: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		
		//******Funcion para regresar a la pantalla anterior (Inicio)
		onBack : function () {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("inicio");
		}
		
	});
	
	return InicioController;

});