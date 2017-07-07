sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Coinbo.controller.Table2", {
			onInit : function () {
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("calcular").attachPatternMatched(this.getOriginAndSetEnviron,this);// Llama al metodo getOrigin.. para hacer set
																					//de parametros necesarios provenientes de la anterior ruta
			},
			//Metodo para navegar de vuelta con el boton back
			onBack: function()
			{
				sap.ui.core.UIComponent.getRouterFor(this).navTo("option",{origin:this.src_ENVIRONMENT});
			},
			//Metodo para hacer set de variables de entorno
			getOriginAndSetEnviron: function(oEvt)
			{
				var oModel;
				var oTool=this.getView().byId("toolbarCalcular");
				var oLabel=this.getView().byId("labelTitle");
				this.src_ENVIRONMENT=oEvt.getParameter("arguments").origin;//Variable que indica que tile fue tocado
				
				switch(oEvt.getParameter("arguments").origin)//Dependiendo del tile que toco el usuario, se hace un binding de diferente de modelo
				{
					//Se cambia el titulo de la pagina y de la barra de texto de la vista en base al tile tocado
					//Y se hace set del modelo en la vista
					case "0": 
						oLabel.setText("Comisiones");
						oTool.setText("Lista de Comisiones por Ventas");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_table2.json")); 
						this.getView().setModel(oModel);
						break;
					case "1":
						oLabel.setText("Incentivos");
						oTool.setText("Lista de Incentivos Planta Clasificadora");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_planta.json")); 
						this.getView().setModel(oModel);
						break;
					case "2":
						oLabel.setText("Incentivos");
						oTool.setText("Lista de Incentivos Núcleo Avícola");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_nucleos.json")); 
						this.getView().setModel(oModel);
						break;
					case "3":
						oLabel.setText("Bonificaciones");
						oTool.setText("Lista de Bonifación por Traslado de Huevos");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_trasladoHuevos.json")); 
						this.getView().setModel(oModel);
						break;
					case "4":
						oTool.setText("Lista de Bonificaciones por Traslado de Aves");
						oLabel.setText("Bonificaciones");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_despachoAves.json")); 
						this.getView().setModel(oModel);
						break;
					case "5":
						oLabel.setText("Bonificaciones");
						oTool.setText("Lista de Bonificaciones por Traslado de Alimentos & Materia Prima");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_trasladoAlimentoMateria.json")); 
						this.getView().setModel(oModel);
						break;
					case "6":
						oLabel.setText("Otros traslados");
						oTool.setText("Lista de Otros Traslados");
						oModel= new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata","/model_trasladoAlimentoMateria.json")); 
						this.getView().setModel(oModel);
						break;
				}
			},
			//Metodo para ir a login
			onClose: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("login");
			},
			//Metodo que direcciona la logica a seguir en base al tipo de calculo que debemos realizar, segun el tile que fue tocado
			onCalculate: function()
			{
				switch(this.src_ENVIRONMENT)
				{
					case "0":this.onCalculateComision();
						break;
					case "1":this.onCalculatePlanta();
						break;
					case "2":this.onCalculateNucleo();
						break;
					case "3":this.onCalculateBonifHuevos();
						break;
					case "4":
						this.onCalculateAves();
						break;
					case "5":
						this.onCalculateAlimentoMateria();
						break;
				}
			},
			onCalculatePlanta: function()
			{
				var oModelPlanta;	
				var oModel,oView,oTable,aRows,aContexts,i,temp,iter,path,total,temp2,temp_resto,temp;	
				
				var vObjeto,vCajas,vTipoEmpleado;
				
				oModelPlanta=sap.ui.getCore().getModel("calcularIncentivoPlanta");
				
				oView=this.getView();
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();
				for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{
    				vObjeto=aContexts[i].getObject();
    				vCajas=vObjeto.cajas;
    				vTipoEmpleado=vObjeto.tipoEmpleado;
    				total=0;
    				if(vObjeto.cajas>oModelPlanta.getProperty("/param/min"))
    				{
    					temp=vObjeto.cajas;
	        			iter=1;
		        		temp_resto=0;
	        			while(temp>0)
		        		{
		        			temp2=oModelPlanta.getProperty("/param/"+iter.toString()+"/cantidad")-temp_resto;
		        			temp_resto= temp >= temp2 ? temp2 : temp;
		        			total+=((oModelPlanta.getProperty("/param/"+iter.toString()+"/"+vTipoEmpleado)*
		        					temp_resto*oModelPlanta.getProperty("/param/"+iter.toString()+"/meta")));
		        			temp-=temp2;
		        			temp_resto=oModelPlanta.getProperty("/param/"+iter.toString()+"/cantidad");
		        			iter++;
		        		}
    				}
    				console.log("Total: "+total);
    			}
			},
			onCalculateNucleo: function()
			{
				var oModelNucleo;	
				var oModel,oView,oTable,aRows,aContexts,i,temp,iter,path,total,mortalidad,temp2,temp_resto,temp4,supervivencia;	
				
				var vObjeto,vAvesIniciales,vAvesEntregadas,vCA,vTipoNucleo,vUbicacionNucleo,vTipoEmpleado;
				
				oModelNucleo=sap.ui.getCore().getModel("calcularIncentivoNucleo");
				
				oView=this.getView();
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();
				for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{
    				vObjeto=aContexts[i].getObject();
					switch(vObjeto.tipoNucleo)//Calculos de forma distinta dependiendo tipo de nucleo
					{
						case "pollo":
							
							
							break;
							
						case "pollona":
							vAvesEntregadas=vObjeto.avesEntregadas;
							supervivencia=(vObjeto.avesEntregadas)/vObjeto.avesIniciales;
							if(supervivencia>oModelNucleo.getProperty("/param/pollona/min"))//Si la supervivencia es mayor a cierto parametro
							{
								total=vAvesEntregadas*oModelNucleo.getProperty("/param/pollona/pagar");
								if(vObjeto.seguridadHigiene)//Si cumple con medidas de seguridad e higiene recibe comision extra
								{
									
									total+=(vAvesEntregadas*oModelNucleo.getProperty("/param/pollona/seguridadHigiene"));
								}
								total*=oModelNucleo.getProperty("/param/pollona/comision/"+vObjeto.tipoEmpleado);//Distribucion de la comision
							}
							console.log("Total: "+total);
							break;
							
						case "postura":
							vAvesEntregadas=vObjeto.avesEntregadas;
							vAvesIniciales=vObjeto.avesIniciales;
							mortalidad=(vAvesIniciales-vAvesEntregadas)/vAvesIniciales;
						//	console.log(mortalidad);
								//console.log("Esto "+oModelNucleo.getProperty("/param/postura/comision/"+vObjeto.tipoEmpleado));
							if(mortalidad<=oModelNucleo.getProperty("/param/postura/mortalidad"))//Siempre que la mortalidad no supere un parametro
							{
								total=vAvesEntregadas*oModelNucleo.getProperty("/param/postura/pagar");
								//console.log(vObjeto.seguridadHigiene);
								if(vObjeto.seguridadHigiene)//Si se cumple seguridad e higiene 
								{
								
									total+=(vAvesEntregadas*oModelNucleo.getProperty("/param/postura/nucleo/"+vObjeto.nucleo));//Seguridad e Higiene
																							//cumplida se paga diferente por cada nucleo
																							console.log(total);
								}
							
								total*=oModelNucleo.getProperty("/param/postura/comision/"+vObjeto.tipoEmpleado);//Distribucion de la comision
								
								
							}
							console.log("Total: "+total);
							break;
					}
    			}
			},
			onCalculateAves:function()
			{
				var oModelAves;	
				var oModel,oView,oTable,aRows,aContexts,i,temp,iter,path,total,temp2,temp_resto,temp4;	
				
				var vObjeto,vTransportado,vDestino,vAve,vCamion,vTipoEmpleado;
				
				oModelAves=sap.ui.getCore().getModel("calcularTrasladoAves");
				
				oView=this.getView();
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();
				for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{
    				vObjeto=aContexts[i].getObject();
    				vDestino=vObjeto.destino;
	        		vAve=vObjeto.tipoAve;
	        		vTransportado=vObjeto.transportado;
	        		vCamion=vObjeto.camion;
	        		vTipoEmpleado=vObjeto.tipoEmpleado;
	        		if(vAve=="polloB")//Bonificacion por pollo beneficiado
	        		{
	        			temp=vTransportado;
	        			iter=1;
		        		total=0;
		        		temp4=0;
	        			while(temp>0)
		        		{
		        			temp2=oModelAves.getProperty("/param/"+iter.toString()+"/"+vDestino+"/cantidad")-temp4;
		        			console.log(temp2);
		        			temp_resto= temp >= temp2 ? temp2 : temp;
		        			total+=((oModelAves.getProperty("/param/"+iter.toString()+"/"+vDestino+"/pagar")*
		        					temp_resto*oModelAves.getProperty("/param/"+iter.toString()+"/"+vDestino+"/"+vTipoEmpleado)));
		        			temp-=temp2;
		        			temp4=oModelAves.getProperty("/param/"+iter.toString()+"/"+vDestino+"/cantidad");
		        			iter++;
		        		}
		        		console.log("Total: "+total);
	        		}
	        		else//Bonificacion por traslado de aves
	        		{
	        			total=oModelAves.getProperty("/param/avesvivas/"+vDestino+"/"+vAve+"/"+vCamion);
	        		}
    				console.log(total);
    				
    			}
				
				
				
			},
			onCalculateAlimentoMateria: function()
			{
				var oModelAlimentoMateria;	
				var oModel,oView,oTable,aRows,aContexts,i,temp,iter,path,total,temp2,temp_resto,temp4;	
				
				var vObjeto,vTransportado,vDestino,vMateriaPrima;
				
				oModelAlimentoMateria=sap.ui.getCore().getModel("calcularTrasladoAlimentoMateria");
				
				oView=this.getView();
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();
				for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{
    				vObjeto=aContexts[i].getObject();
    				vDestino=vObjeto.destino;
	        		vMateriaPrima=vObjeto.materiaPrima;
	        		vTransportado=vObjeto.transportado;
	        		if(vMateriaPrima)//Bonificacion por materia prima
	        		{
	        			total=vTransportado*oModelAlimentoMateria.getProperty("/param/materia/"+vDestino);
	        		}
	        		else
	        		{
	        			total=vTransportado*oModelAlimentoMateria.getProperty("/param/alimento/"+vDestino);
	        		}
    				console.log(total);
    			}
				
			},
			onCalculateBonifHuevos: function()
			{
				var oModelDespachoGranel,oModelConsumoLocal;	
				var oModel,oView,oTable,aRows,aContexts,i,temp,iter,path,total,temp2,temp_resto,temp4;
				
				var vObjeto,vTipoEmpleado,vUnidad,vTransportado,vDestino,vTipoMovimiento,vConsumo;
				oModelDespachoGranel=sap.ui.getCore().getModel("calcularTrasladoGranel");
				oModelConsumoLocal=sap.ui.getCore().getModel("calcularDespachoLocal");
				
				
				oView=this.getView();
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();
    			
				for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{  
    				vObjeto=aContexts[i].getObject();
    				
    				vTipoEmpleado=vObjeto.tipoEmpleado;
	        		vUnidad=vObjeto.unidad;
	        		vTransportado=vObjeto.transportado;
	        		vDestino=vObjeto.destino;
	        		vTipoMovimiento=vObjeto.tipoMovimiento;
	        		vConsumo=vObjeto.consumoHumano;
	        		if(vConsumo)//La bonificacion es por traslado de huevos de consumo local
	        		{
	        			if(vDestino=="local")//Construyendo path para buscar en parametros de json
		        		{
		        			path="/local";
		        		}
		        		else
		        		{
		        			path="/foraneo";
		        		}
	        			if(vUnidad=="media")
			        	{
			        		path+="/media";
			        	}
			        	else
			        	{
			        		path+="/caja";
			        	}
        				temp= vTransportado;
        				console.log("Transportado "+vTransportado);
		        		//console.log(v3);
		        		iter=1;
		        		total=0;
		        		temp4=0;
		        		if(vTipoEmpleado=="ayudante" || vTipoEmpleado=="chofer")
		        		{
		        			while(temp>0)
			        		{
			        			//console.log(oModelConsumoLocal.getProperty("/param/"));
			        		//	console.log("/param/"+iter.toString()+path+"/"+vTipoEmpleado);
			        			temp2=oModelConsumoLocal.getProperty("/param/"+iter.toString()+path+"/cantidad")-temp4;
			        			console.log("Cantidad "+temp2);
			        			//console.log(total);
			        			temp_resto= temp >= temp2 ? temp2 : temp;
			        		//	console.log("Staying with "+temp_resto);
			        			total+=((oModelConsumoLocal.getProperty("/param/"+iter.toString()+path+"/pagar")*
			        					temp_resto*oModelConsumoLocal.getProperty("/param/"+iter.toString()+path+"/"+vTipoEmpleado)));
			        		//	console.log(total);
			        			temp-=temp2;
			        			temp4=oModelConsumoLocal.getProperty("/param/"+iter.toString()+path+"/cantidad");
			        			iter++;
			        		}
			        		console.log("Total: "+total);
		        		}
		        		if(vTipoEmpleado=="contratista")
		        		{
		        		//	console.log(oModelConsumoLocal.getProperty("/param/contratista/"+vDestino+"/"+vUnidad));
		        			total=oModelConsumoLocal.getProperty("/param/contratista/"+vDestino+"/"+vUnidad)*vTransportado;
			        		console.log("Total: "+total);
		        		}
	        		}
	        		else //Bonificacion por traslado de huevos a granel
	        		{
	        			temp= vTransportado;
        				console.log("Transportado "+vTransportado);
		        		//console.log(v3);
		        		iter=1;
		        		total=0;
		        		temp4=0;
		        		while(temp>0)
		        		{
		        			//console.log(oModelConsumoLocal.getProperty("/param/"));
		        		//	console.log("/param/"+iter.toString()+path+"/"+vTipoEmpleado);
		        			temp2=oModelDespachoGranel.getProperty("/param/"+iter.toString()+"/cantidad")-temp4;
		        			console.log("Cantidad "+temp2);
		        			//console.log(total);
		        			temp_resto= temp >= temp2 ? temp2 : temp;
		        		//	console.log("Staying with "+temp_resto);
		        			total+=((oModelDespachoGranel.getProperty("/param/"+iter.toString()+"/pagar")*
		        					temp_resto*oModelDespachoGranel.getProperty("/param/"+iter.toString()+"/"+vTipoEmpleado)));
		        		//	console.log(total);
		        			temp-=temp2;
		        			temp4=oModelDespachoGranel.getProperty("/param/"+iter.toString()+"/cantidad");
		        			iter++;
		        		}
			        	console.log("Total: "+total);
	        		}
    			}
				
			},
			onCalculateComision: function()
			{
				var oView= this.getView();
			
				//Obtener parametrización models
				var oModelCalcCom=sap.ui.getCore().getModel("calcularComision"); //Prueba 16.02
				var oModelParam=sap.ui.getCore().getModel("param");
				var oModelPenal=sap.ui.getCore().getModel("penalizacion");
				var oModelBs=sap.ui.getCore().getModel("bolivaresPorCaja");
				var oModelDeduc=sap.ui.getCore().getModel("deduccionNotaDebito");
				var oModelRecup=sap.ui.getCore().getModel("recuperacionCh");
				
				//Variables de parametrizacion
				var tipoA,tipoV,cajasCobSinMora,cajasCobConMora,deducibleAplic,paramCalcComision,
					paramCalcComisionBs,montoNotaDebito,paramParaDescuento,diasRecuperarCh,paramReemb;
					
				//Variables de entrada
				var i,oTable,oModel,aRows,aContexts,vCajasSinMora,vCajasConMora,vTipo,vDiasRecup,vMontoNetoDebito,vAvesDesp,vAvesEnt;
				
				//Variables de salida
				var sComisCajasHuev=0,sDeducCheqDev=0,sRecupCheqDev=0,sMontoTotal=0,sComisAvesEnteras=0,sComisAvesDespr=0;
				
				//Variables del sistema
				var vObjeto,temp,temp1,temp2,temp_resto,temp4,iter;
				
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
				
				console.log("HELLO");
				
				oTable= oView.byId("comisionesTable");
				oModel= oTable.getModel();  
				aRows = oModel.getProperty("/data");       
    			aContexts = oTable.getSelectedContexts();  
    		//	console.log(aContexts);
    			for (i=aContexts.length -1; i>=0; i--) //Recorrro seleccionados
    			{  
    				vObjeto=aContexts[i].getObject();
    				
    				
    				
	        		vCajasSinMora=aContexts[i].getObject().cajasSinMora;
	        		vCajasConMora=aContexts[i].getObject().cajasConMora;
	        		vTipo=aContexts[i].getObject().tipo;
	        		vDiasRecup=aContexts[i].getObject().diasRecuperarCh;
	        		vMontoNetoDebito=aContexts[i].getObject().montoNetoDebito;
	        		if(vTipo=="025")
	        		{
	        			vAvesDesp=aContexts[i].getObject().avesDespresadas;
	        			vAvesEnt=aContexts[i].getObject().avesEnteras;
	        		}
	        		//Calcular
	        		//var v1=vCajasConMora*(deducibleAplic/100);
	        		//console.log(v1);
	        		//var v2= vCajasConMora - (vCajasConMora*(deducibleAplic/100));
	        		//console.log(v2);
	        		
	        		if(vTipo=="021")
	        		{
	        				temp= vCajasSinMora + (vCajasConMora - (vCajasConMora*(deducibleAplic/100)));
			        		//console.log(v3);
			        		iter=0;
			        		temp4=0;//Inicializa temp4 en 0 para que no afecte el primer pago
			        		while(temp>0)
			        		{
			        			temp2=oModelBs.getProperty("/param/"+iter.toString()+"/pagar");
			        			//console.log("Pagar:"+pagar);
			        			temp_resto=oModelBs.getProperty("/param/"+iter.toString()+"/cantidad")-temp4;
			        		//	console.log("Cantidad:"+cantidad);
			        			temp1= temp >= temp_resto ? temp_resto : temp; 
			        			//console.log("V5:"+v5);
			        			sComisCajasHuev+= Math.abs((temp1))*temp2;
			        			//console.log("/"+sComisCajasHuev);
			        			temp-=temp1; 
			        			temp4=oModelBs.getProperty("/param/"+iter.toString()+"/cantidad");//Guarda valor de temp2 para siguiente iteracion restar
			        			iter++;
			        		}
			        		console.log("Tipo? "+vTipo); 
			        		console.log("Salida1: "+sComisCajasHuev);//Salida1
			        		
			        		sDeducCheqDev=vMontoNetoDebito*(paramParaDescuento/100);//Salida2 
			        		console.log("Salida2: "+sDeducCheqDev);//Salida2
			        		
			        		sRecupCheqDev=vMontoNetoDebito *(paramReemb/100);
			        		
			        	//	console.log(diasRecuperarCh + " "+paramReemb);
			        		console.log("Salida3: "+sRecupCheqDev);//salida3
			        		
			        		//var v6=sDeducCheqDev-sRecupCheqDev;//Diferencia
			        		
			        		sMontoTotal=sComisCajasHuev-(sDeducCheqDev-sRecupCheqDev);
			        		console.log("Salida4: "+sMontoTotal);//Salida4
			        		
			        		sap.m.MessageToast.show("Comisión cajas de huevos: "+sComisCajasHuev+".         Deducción por cheque devuelto: "+sDeducCheqDev+
			        				".         \n Recuperación Cheque Devuelto: "+sRecupCheqDev+"\n          Monto total: "+sMontoTotal, {
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
	        		else	//Autoventista
	        		{
	        			
	        			temp=vAvesEnt;
	        			iter=0;
	        			temp4=0;
	        			console.log("Aves Enteras: "+vAvesEnt);
		        		while(temp>0)
		        		{
		        			temp2=oModelCalcCom.getProperty("/param/"+vTipo.toString()+"/300/"+iter.toString()+"/pagar");
		        			console.log("Pagar:"+temp2);
		        			temp_resto=oModelCalcCom.getProperty("/param/"+vTipo.toString()+"/300/"+iter.toString()+"/cantidad")-temp4;
		        			console.log("Cantidad:"+temp_resto);
		        			temp1= temp >= temp_resto ? temp_resto : temp; 
		        			//console.log("V5:"+v5);
		        			sComisAvesEnteras+= Math.abs((temp1))*temp2;
		        			console.log("/ "+sComisAvesEnteras);
		        			temp-=temp_resto; 
		        			temp4=oModelCalcCom.getProperty("/param/"+vTipo.toString()+"/300/"+iter.toString()+"/cantidad");
		        			iter++;
		        		}
		        		
		        		console.log("-----------------");
		        		temp=vAvesDesp;
	        			iter=0;
	        			temp4=0;
		        		while(temp>0)
		        		{
		        			temp2=oModelCalcCom.getProperty("/param/"+vTipo.toString()+"/310/"+iter.toString()+"/pagar");
		        			console.log("Pagar:"+temp2);
		        			temp_resto=oModelCalcCom.getProperty("/param/"+vTipo.toString()+"/310/"+iter.toString()+"/cantidad")-temp4;
		        			console.log("Cantidad:"+temp_resto);
		        			temp1= temp >= temp_resto ? temp_resto : temp; 
		        			//console.log("V5:"+v5);
		        			sComisAvesDespr+= Math.abs((temp1))*temp2;
		        			console.log("-->"+sComisAvesDespr);
		        			temp-=temp_resto; 
		        			temp4=oModelCalcCom.getProperty("/param/"+vTipo.toString()+"/310/"+iter.toString()+"/cantidad");
		        			iter++;
		        		}
		        		
		        		console.log(sComisAvesDespr+sComisAvesEnteras);
		        		
		        		
	        		}
	        	
				}
			}
	});

});