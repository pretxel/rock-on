import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import "../../ui/layouts/app_body.html"
import "../../ui/layouts/app_body.js"
import "../../ui/components/main/main.js"
import "../../ui/components/play/play.js"
import "../../ui/components/listItem/listItem.js"

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route("/",{
  name: "home",
  action(params, queryParams){
    BlazeLayout.render("App_body",{
      main : "main",
    })
  }
})

FlowRouter.route("/play/:matchId",{
  name: "play",
  action(params, queryParams){
    BlazeLayout.render("App_body",{
      main : "play",
    })
  }
})

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});
