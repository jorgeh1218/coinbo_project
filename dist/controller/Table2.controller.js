sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Coinbo.controller.Table2", {
			onInit : function () {
				//Set jsons
				var oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/param.json")); 
				sap.ui.getCore().setModel(oModel,"param");
				oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/bolivaresPorCaja.json"));
				sap.ui.getCore().setModel(oModel,"bolivaresPorCaja");
				oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/deduccionNotaDebito.json"));
				sap.ui.getCore().setModel(oModel,"deduccionNotaDebito");
				oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/penalizacion.json"));
				sap.ui.getCore().setModel(oModel,"penalizacion");
				oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/recuperacionCh.json"));
				sap.ui.getCore().setModel(oModel,"recuperacionCh");
				
				
				var oModel = new sap.ui.model.json.JSONModel({
					data:[
							{
								checked:true,
								cod: "435678",
				    			monto: "12.589,76",
								fecha: "11/01/2016",
								nombre:"Dania De Jesús",
								cajasSinMora:295.5,
								cajasConMora:7,
								montoNetoDebito:27362.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "912840",
				    			monto: "15.500,99",
								fecha: "13/01/2016",
								nombre:"Verónica Montoya",
								cajasSinMora:95.5,
								cajasConMora:7,
								montoNetoDebito:2762.5,
								diasRecuperarCh:2,
								tipo:"0021"
							
							},
							{
								checked:true,
								cod: "650312",
				    			monto: "9.653,76",
								fecha: "14/01/2016",
								nombre:"José Pagés",
								cajasSinMora:2565.5,
								cajasConMora:7,
								montoNetoDebito:23362.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "229856",
				    			monto: "1.500,50",
								fecha: "12/01/2016",
								nombre:"Ely Blanco",
								cajasSinMora:300.5,
								cajasConMora:1,
								montoNetoDebito:28362.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "123539",
				    			monto: "2.500,99",
								fecha: "15/01/2016",
								nombre:"Moisés Alvarado",
								cajasSinMora:235.5,
								cajasConMora:7,
								montoNetoDebito:17362.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "540682",
				    			monto: "3.750,89",
								fecha: "18/01/2016",
								nombre:"Jorge Hidalgo",
								cajasSinMora:395.5,
								cajasConMora:7,
								montoNetoDebito:27362.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "784003",
				    			monto: "3.750,89",
								fecha: "18/01/2016",
								nombre:"Elias Sánchez",
								cajasSinMora:285.5,
								cajasConMora:7,
								montoNetoDebito:27362.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "123749",
				    			monto: "3.750,89",
								fecha: "18/01/2016",
								nombre:"Ivelise Díaz",
								cajasSinMora:305.5,
								cajasConMora:7,
								montoNetoDebito:28562.5,
								diasRecuperarCh:2,
								tipo:"0021"
							},
							{
								checked:true,
								cod: "118396",
				    			monto: "3.750,89",
								fecha: "18/01/2016",
								nombre:"Gabriel Nuñez",
								cajasSinMora:295.5,
								cajasConMora:7,
								montoNetoDebito:27962.5,
								diasRecuperarCh:2,
								tipo:"0021"
							}
						]
						});
						
				var oView= this.getView();
				var oTable= oView.setModel(oModel);  
				
			
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
			onCalculate: function()
			{
				var oView= this.getView();
				//Obtener parametrización models
				var oModelParam=sap.ui.getCore().getModel("param");
				var oModelPenal=sap.ui.getCore().getModel("penalizacion");
				var oModelBs=sap.ui.getCore().getModel("bolivaresPorCaja");
				var oModelDeduc=sap.ui.getCore().getModel("deduccionNotaDebito");
				var oModelRecup=sap.ui.getCore().getModel("recuperacionCh");
				
				//Variables de parametrizacion
				var tipoA,tipoV,cajasCobSinMora,cajasCobConMora,deducibleAplic,paramCalcComision,
					paramCalcComisionBs,montoNotaDebito,paramParaDescuento,diasRecuperarCh,paramReemb;
					
				//Variables de entrada
				var i,oTable,oModel,aRows,aContexts,vCajasSinMora,vCajasConMora,vTipo,vDiasRecup,vMontoNetoDebito;
				
				//Variables de salida
				var sComisCajasHuev=0,sDeducCheqDev=0,sRecupCheqDev=0,sMontoTotal=0;
				
				//Variables del sistema
				var temp,temp1,temp2,temp3;
				
				//param
				tipoA= oModelParam.getProperty("/param/autov");
				tipoV= oModelParam.getProperty("/param/prev");
				
				//penalizacion
				deducibleAplic=oModelPenal.getProperty("/param/002");
				
				//bolivarespc
				paramCalcComision=oModelBs.getProperty("/param/0/cantidad");
				paramCalcComisionBs=oModelBs.getProperty("/param/0/pagar");
				
				//deduccion
				paramParaDescuento= oModelDeduc.getProperty("/param/001");
				
				//recuperacion
				diasRecuperarCh=oModelRecup.getProperty("/param/0/chequeDevuelto");
				paramReemb=oModelRecup.getProperty("/param/0/porcent");

				//Cálculo
				
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();  
    		//	console.log(aContexts);
    			for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{  
	        		vCajasSinMora=aContexts[i].getObject().cajasSinMora;
	        		vCajasConMora=aContexts[i].getObject().cajasConMora;
	        		vTipo=aContexts[i].getObject().tipo;
	        		vDiasRecup=aContexts[i].getObject().diasRecuperarCh;
	        		vMontoNetoDebito=aContexts[i].getObject().montoNetoDebito;
	        		
	        		//Calcular
	        		//var v1=vCajasConMora*(deducibleAplic/100);
	        		//console.log(v1);
	        		//var v2= vCajasConMora - (vCajasConMora*(deducibleAplic/100));
	        		//console.log(v2);
	        		temp= vCajasSinMora + (vCajasConMora - (vCajasConMora*(deducibleAplic/100)));
	        		//console.log(v3);
	        		var iter=0;
	        		while(temp>0)
	        		{
	        			temp2=oModelBs.getProperty("/param/"+iter.toString()+"/pagar");
	        			//console.log("Pagar:"+pagar);
	        			temp3=oModelBs.getProperty("/param/"+iter.toString()+"/cantidad");
	        		//	console.log("Cantidad:"+cantidad);
	        			temp1= temp >= temp3 ? temp3 : temp; 
	        			//console.log("V5:"+v5);
	        			sComisCajasHuev+= Math.abs((temp1))*temp2;
	        			//console.log("/"+sComisCajasHuev);
	        			temp-=temp3; 
	        			iter++;
	        		}
	        		
	        		console.log("Salida1: "+sComisCajasHuev);//Salida1
	        		
	        		sDeducCheqDev=vMontoNetoDebito*(paramParaDescuento/100);//Salida2 
	        		console.log("Salida2: "+sDeducCheqDev);//Salida2
	        		
	        		sRecupCheqDev=vMontoNetoDebito *(paramReemb/100);
	        		
	        	//	console.log(diasRecuperarCh + " "+paramReemb);
	        		console.log("Salida3: "+sRecupCheqDev);//salida3
	        		
	        		//var v6=sDeducCheqDev-sRecupCheqDev;//Diferencia
	        		
	        		sMontoTotal=sComisCajasHuev-(sDeducCheqDev-sRecupCheqDev);
	        		console.log("Salida4: "+sMontoTotal);//Salida4
	        		
	        		sap.m.MessageToast.show("Comisión cajas de huevos: "+sComisCajasHuev+".         Deducción por cheque devuelto: "+sDeducCheqDev+".         \n Recuperación Cheque Devuelto: "+sRecupCheqDev+"\n          Monto total: "+sMontoTotal, {
						    duration: 12000,                  // default
						    width: "50em",                   // default
						    my: "center bottom",             // default
						    at: "center bottom",             // default
						    of: window,                      // default
						    offset: "0 0",                   // default
						    collision: "fit fit",             // default
						    onClose: null,                   // default
						    autoClose: true,                 // default
						    animationTimingFunction: "ease", // default
						    animationDuration: 1000,         // default
						    closeOnBrowserNavigation: true   // default
						});
				}  
			}
	});

});