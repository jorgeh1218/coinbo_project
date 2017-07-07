sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Coinbo.controller.Master", {
		onInit: function(evt)
		{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("master").attachPatternMatched(this.getParamsAndSet,this);
			this.oList= this.getView().byId("list");
			
			var oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_view1.json"));
			this.getView().setModel(oModel);	
		},
		getParamsAndSet: function(evt)
		{
			var title= this.getView().byId("masterPage");
			console.log(title.getTitle());
			this.src_ENVIRONMENT=evt.getParameter("arguments").origin;
			switch(evt.getParameter("arguments").origin)
			{
				case "0":  title.setTitle("Comisiones");
					break;
				case "1":title.setTitle("Incentivos Planta");
					break;
				case "2":title.setTitle("Incentivos Núcleo");
					break;
				case "3":title.setTitle("Bonificaciones Huevos");
					break;
				case "4":title.setTitle("Bonificaciones Alimentos & MP");
					break;
				case "5":title.setTitle("Bonificaciones Aves");
					break;
			}
		},
		onNavBack: function()
		{
		//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//	oRouter.navTo("View1");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("option",{origin:this.src_ENVIRONMENT});
			
		},
		onUpdateFinished: function(oEvent)
		{
			 this._updateListItemCount(oEvent.getParameter("total"));
		    // hide pull to refresh if necessary
		    this.getView().byId("pullToRefresh").hide();
		},
		_updateListItemCount : function (iTotalItems) {
		    // only update the counter if the length is final
		     var sTitle;
		    if (this.oList.getBinding("items").isLengthFinal()) 
		    {
		    	sTitle = this.getView().byId("masterPage");
    			this.getView().getModel().setProperty("/title", sTitle);
		    }
		   
		},
		onSelectionChange: function(oEvent)
		{
			 this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		},
		showDetail : function (oItem) {
		    var id=oItem.getBindingContext().sPath;
		    //var bReplace = !Device.system.phone;
		    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		    oRouter.navTo("detail", {
		     origin : id.split("/")[2]
		    });
		    
	   }
	});

});