sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var count=0,oTable,oView,iconTabBar;
	return Controller.extend("Coinbo.controller.Parametrizar", 
	{
		setData: function()
		{
			oView= this.getView(),oTable;
			iconTabBar= oView.byId("tabBar");
			
			switch(iconTabBar.getSelectedKey())
			{
				case "0": oTable= oView.byId("reprTable");
				//console.log(iconTabBar.getSelectedKey());
					break;
				case "1": oTable= oView.byId("comisTable");
				
				//console.log(iconTabBar.getSelectedKey());
					break;
				case "2": oTable= oView.byId("penalTable");
				//console.log(iconTabBar.getSelectedKey());
					break;
			}
		},
		onDelete: function()
		{
			this.setData();//Set de tablas y datos globales
			var oModel    = oTable.getModel();  
		//	console.log(oModel.getProperty("/data"));
		    var aRows     = oModel.getProperty("/data");       
    		var aContexts = oTable.getSelectedContexts();  
    		console.log(aContexts);
    		for (var i=aContexts.length -1; i>=0; i--) {  
        		var oThisObj = aContexts[i].getObject();  
        		var index = $.map(aRows, function(obj, index) {  
            		if(obj === oThisObj) {  
                		return index;  
            		}  
        		});  
    			 aRows.splice(index, 1);  
			 }  
			oModel.setProperty("/data", aRows);  
    		oTable.removeSelections(true);   //No queda seleccionado ningun item
			
		},
		onBack: function()
		{
			window.history.go(-1);
		},
		onClose: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		onItemSelect: function()
		{
			this.setData();
			console.log(oTable.getSelectedItems());	
			if(oTable.getSelectedItems().length!=0 && oTable.getSelectedItems().length!=1)
			{
				oView.byId("BtnEdit").setEnabled(false); // Deshabilitar el botón de edición con multiples elementos seleccionados
			}
			else
			{
				oView.byId("BtnEdit").setEnabled(true); // Habilitar el botón para editar un elemento
			}
		},
			onInit : function () {
					var oModel = new sap.ui.model.json.JSONModel({
					data:[
							{
								//checked:true,
								cod: "021",
				    			desc: "Preventista Huevo(Local)"
							},
							{
								//checked:true,
								cod: "022",
				    			desc: "Preventista Huevo(Foráneo)"
							},
							{
								//checked:true,
								cod: "023",
				    			desc: "Preventista Mayorista BCM"
							},
							{
								//checked:true,
								cod: "024",
				    			desc: "Preventista Supermercado BCM"
							},
							{
								//checked:true,
								cod: "025",
				    			desc: "Autoventista Aves(Local)"
							},
							{
								//checked:true,
								cod: "026",
				    			desc: "Autoventista Aves(Foráneo)"
							},
							{
								//checked:true,
								cod: "027",
				    			desc: "Autoventista Huevo(Local)"
							},
							{
								//checked:true,
								cod: "028",
				    			desc: "Autoventista Huevo(Foráneo)"
							}
						]
						});
				var oModel_Comis = new sap.ui.model.json.JSONModel({
					data:[
							{
								//checked:true,
								cod: "100",
				    			desc: "Comisión por Caja de Huevo"
							},
							{
								//checked:true,
								cod: "110",
				    			desc: "Comisión por Caja de Huevo Roto"
							},
							{
								//checked:true,
								cod: "300",
				    			desc: "Comisión Aves Enteras"
							},
							{
								//checked:true,
								cod: "310",
				    			desc: "Comisión Aves Despresadas"
							},
							{
								//checked:true,
								cod: "320",
				    			desc: "Comisión Aves Menudencias/Sub-Prouctos"
							}
						]
						});
						var oModel_Penal = new sap.ui.model.json.JSONModel({
						data:[
							{
								//checked:true,
								cod: "001",
								rango:"3-7",
								porc:"10%",
								tipo:"100",
								aplica:"Todos"
							},
							{
								//checked:true,
								cod: "002",
								rango:"7-14",
								porc:"25%",
								tipo:"100",
								aplica:"Todos"
							},
							{
								//checked:true,
								cod: "003",
								rango:"14-45",
								porc:"50%",
								tipo:"100",
								aplica:"Todos"
							}
						]
						});
							
				var oView= this.getView();
				var oTable= oView.byId("reprTable").setModel(oModel);  
				var oTable2= oView.byId("comisTable").setModel(oModel_Comis);
				var oTable3= oView.byId("penalTable").setModel(oModel_Penal);
				
				
				
			
    		/*	 var oTemplate = new sap.m.ColumnListItem(  
				  {cells: [   
				          new sap.m.Text({text : "{cod}"}),  
				          new sap.m.Text({text : "{tipo}"})  
				          ]  
				  });   */
    			 
    		/*	var oView = this.getView(); 
    			
    			
    			var oTable = oView.byId("comisionesTable");     //Get Hold of Table that has been created in view  
				var oContext = oView.getBindingContext();
				oTable.bindItems("root", oTemplate);  
				*/
				
    			
				//oTable.bindRows("root");
    			//console.log(sap.ui.getCore().getModel("MyModel"));
			}
	});

});