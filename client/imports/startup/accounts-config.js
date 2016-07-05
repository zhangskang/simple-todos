/**
 * Created by _zsk on 2016/7/2.
 */

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});