/**
EuBrazilCC UC3 Gateway
Copyright 2014-2015 EUBrazilCC (EU‐Brazil Cloud Connect)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

Ext.define('OphWebAnalytics.view.LoginPanel', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.login',
	
	layout: 'anchor',
    border: false,
    anchor: '100% 100%',
    bodyPadding: '10 10 10 10',
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 120
    },
    defaultType: 'textfield',
    dockedItems: [{
    	xtype : 'toolbar',
    	id    : 'logintb', 
    	hidden: true,
    	layout: 'fit',
    	style : {
    		'border-width': '0px'
    	},
    	items : [{
    		xtype: 'tbtext',
    		text: 'Wrong e-mail or password.',
    		style: {
                marginTop: '4px',
                'font-weight': 'bold'
            }
    	}]
    }],
    items: [{
    	vtype     : 'email',
    	id        : 'emailfield',
    	name      : 'email',
        fieldLabel: 'Email',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false,
        anchor    : '100%'
    },{
    	id        : 'pwdfield',
    	name      : 'password',
    	fieldLabel: 'Password',
        inputType : 'password',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false,
        anchor    : '100%'
    }],
    buttons: [{
        text: 'Sign in',
        id  : 'loginsubmit'
    },{
        text: 'Cancel',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }]
});
