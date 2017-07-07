sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Coinbo.controller.Detail", {
		onInit: function()
		{
		
			var oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_view1.json"));
			this.getView().setModel (oModel);
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this.getOriginAndSetEnviron,this);
			
				
		},
		getOriginAndSetEnviron: function(oEvt)
		{
		 	
		  var oModel=this.getView().getModel();
		  console.log(oModel);		
		  this.src_ENVIRONMENT= oEvt.getParameter("arguments").origin;
		  this.getView().bindElement({path:"/data/"+this.src_ENVIRONMENT});
			
		  var cod = oModel.getProperty("/data/" + this.src_ENVIRONMENT + "/cod");
		  var fecha = oModel.getProperty("/data/" + this.src_ENVIRONMENT + "/fecha");
		  
		  
			
		}
		,onNavBack: function()
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("option",{origin:this.src_ENVIRONMENT});
			//window.history.go(-1);
			
		}
	});

});