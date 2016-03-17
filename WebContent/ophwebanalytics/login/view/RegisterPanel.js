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

Ext.define('OphWebAnalytics.view.RegisterPanel', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.register',
	
	layout: 'form',
	width: '50%',
    title: 'Registration',
    border: false,
    bodyPadding: '10 10 10 10',
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 120
    },
    defaultType: 'textfield',
    dockedItems: [{
    	xtype : 'toolbar',
    	id    : 'registertb', 
    	hidden: true,
    	layout: 'fit',
    	style : {
    		'border-width': '0px'
    	},
    	items : [{
    		xtype: 'tbtext',
    		id: 'sregister',
    		hidden: true,
    		text: 'The registration was successfully completed. A confirmation e-mail will be sent in a short time.',
    		style: {
                marginTop: '4px',
                'font-weight': 'bold'
            }
    	},{
    		xtype: 'tbtext',
    		id: 'fregister',
    		hidden: true,
    		text: 'Something went wrong in the registration. Please, contact the system administrator.',
    		style: {
                marginTop: '4px',
                'font-weight': 'bold'
            }
    	}]
    }],
    items: [{
    	id        : 'regfname',
    	name      : 'fname',
        fieldLabel: 'First Name',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false
    },{
    	id        : 'reglname',
    	name      : 'lname',
        fieldLabel: 'Last Name',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false
    },{
    	vtype     : 'email',
    	id        : 'regemail',
    	name      : 'email',
        fieldLabel: 'Email',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false
    },{
    	id        : 'regpwd',
    	name      : 'password',
        fieldLabel: 'Password',
        inputType : 'password',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false
    },{
    	id        : 'regpwd2',
        name      : 'password2',
        fieldLabel: 'Repeat Password',
        inputType : 'password',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        allowBlank: false,
        validator: function(value) {
            var password = this.previousSibling('[name=password]');
            return (value === password.getValue()) ? true : 'Passwords do not match.';
        }
    },
    {
    	id        : 'regorgname',
        name      : 'orgname',
        fieldLabel: 'Organization Name'
    },{
    	xtype     : 'combobox',
    	id        : 'regorgtype',
        name      : 'orgtype',
        fieldLabel: 'Organization Type',
        store     : Ext.create('Ext.data.Store', {
                       fields: ['abbr', 'name'],
                       data  : [{'abbr':'Academic Institution', 'name':'Academic Institution'},
                                {'abbr':'Research Institution', 'name':'Research Institution'},
                                {'abbr':'NGO/Civil society organization', 'name':'NGO/Civil society organization'},
                                {'abbr':'National Public Authority', 'name':'National Public Authority'},
                                {'abbr':'Local Public Authority', 'name':'Local Public Authority'},
                                {'abbr':'Industry', 'name':'Industry'},
                                {'abbr':'Individual', 'name':'Individual'}]
        			}),		
        editable  : false,
        value     : 'Please, select a type...',
        queryMode : 'local',
        displayField: 'name',
        valueField: 'abbr',

    }],

    buttons: [{
        text: 'Register',
        id  : 'registersubmit'
    },{
        text: 'Cancel',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('registertb').hide();
        }
    }]
});
