sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	this.src_ENVIRONMENT = ''; 
	
	return Controller.extend("Coinbo.controller.View1", {
		
		onPress: function(oEvt)
		{
		
			
		},
		onInit: function()
		{
			var oModel;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("aprobar").attachPatternMatched(this.getOriginAndSetEnviron,this);
		},
		
		getOriginAndSetEnviron: function(oEvt)
		{
			//var oPage=this.getView().byId("pageTitle");
			var oView= this.getView();
			var oLabel=oView.byId("labelTitle");
			var oModel;
			//Set Title
			switch(oEvt.getParameter("arguments").origin)
			{
				case "0": 
					 oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_view1.json")); 
					oLabel.setText("Comisiones por Ventas");
					break;
				case "1":
					 oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_view1_2.json")); 
					 oLabel.setText("Incentivos Planta Clasificadora");
					break;
				case "2":
					oLabel.setText("Incentivos Núcleo Avícola");
					break;
				case "3":
					oLabel.setText("Bonifación por Traslado de Huevos");
					break;
				case "4":
				oLabel.setText("Bonificaciones por Traslado de Alimentos & Materia Prima");
					break;
				case "5":
					oLabel.setText("Bonificaciones por Traslado de Aves");
					break;
				case "6":
					oLabel.setText("Otros Traslados");
					break;
			}
		//sap.ui.getCore().setModel(oModel,"view1");
			this.getView().setModel(oModel);
			//var oTable= oView.byId("VTable").setModel(oModel); 
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