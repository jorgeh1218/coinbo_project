sap.ui.define([

        'sap/ui/model/json/JSONModel',
		'sap/m/Button',
		'sap/m/Dialog',
		'sap/m/MessageToast',
		'sap/m/Text',
		'sap/m/Input',
		'sap/ui/core/mvc/Controller',
		'sap/ui/layout/HorizontalLayout',
		'sap/ui/layout/VerticalLayout',
		'jquery.sap.global'
	], function(JSONModel, Button, Dialog, MessageToast, Text, Input, Controller, HorizontalLayout, VerticalLayout, jQuery) {
	"use strict";

	var LoginController = Controller.extend("Coinbo.controller.Login", {
		
		//Funcion para mostrar el logo
		onInit : function (evt) {
			var oImgModel = new JSONModel(jQuery.sap.getModulePath("Coinbo.mockdata", "/img.json"));
			this.getView().setModel(oImgModel, "img");
		},
		
		//Funcion para ir a la proxima pantalla (Inicio)
		onPress: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("inicio");
		},
		
		onPress2: function (oEvent) {
			//var oTileNextUno = this.getView().byId("tileuno");
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("option");
		},

	
		
		//Funcion controladora del dialogo (settings)
		onSubmitDialog: function () {

			var dialog = new Dialog({
				title: 'Seguridad',
				type: 'Message',
				content: [
					new Text({ text: 'Ingrese clave con permisos de administrador' }),
					new Input('submitDialogTextarea', {
						liveChange: function(oEvent) {
							var sText = oEvent.getParameter('value');
							var parent = oEvent.getSource().getParent();

							parent.getBeginButton().setEnabled(sText.length > 0);
						},
						width: '100%',
						placeholder: 'Obligatorio'
					})
				],
				beginButton: new Button({
					text: 'Submit',
					enabled: false,
					press: function () {
						//var oKeysModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.wt.mockdata", "/keys.json"));
						//this.getView().setModel(oKeysModel, "rol");
						
						//var oKeyAdmin = new sap.ui.model.type.String();
						//this.getView().byId("Email").bindProperty("value",{path:"SampleData>/Email",type:oEmailType});
						
						
						//sPath = "{keys>/rol/admin}"
						//this.oKeysModel.remove(sPath);
						
						var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
						//var admin = oKeysModel.getData({admin}, true);
						
						//oKeysModel.setData({admin: sText});
						MessageToast.show("Correcto");
						dialog.close();
							
						//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						//oRouter.navTo("settings");
						
						
						//if (sText == admin){
							//MessageToast.show("Correcto");
						    //dialog.close();
						//}
						//else{
						//	MessageToast.show("Incorrecto");
						//    dialog.close();
						//}
						
						//MessageToast.show('Note is: ' + sText);
						//dialog.close();
					}
				}),
				
	
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
						
						
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		}

		
		
	});
	
	


	return LoginController;

});