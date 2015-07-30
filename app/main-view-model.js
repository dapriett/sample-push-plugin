var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var application = require("application");
var pushPlugin = require('nativescript-push-notifications');

var dialogs = require("ui/dialogs");
var Everlive = require('./everlive.js');

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        var self = this;

        self.everlive = new Everlive('<ENTER_YOUR_API_KEY_HERE>');

        var isDeviceRegistered = false;
        var disableButton = false;

        _super.call(self);

        //Set default values for buttons and messages.
        self.set("headerText", "Welcome to Telerik Backend Services push notifications Native Script sample app.");
        self.set("registrationMessage", "Tap the button to enable push notifications on this device.");
        self.set("buttonText", "Enable Notifications");

        //On token refresh call register again to obtain the new token.
        //pushPlugin.onTokenRefresh(function () {
        //    pushPlugin.register(context, '11111111', function (data){
        //        self.set("registrationMessage", "Device Registration Refreshed!");
        //    });
        //});

        //Callback for device registration success
        self._deviceRegistrationSuccess = function (success) {
            self.set("isLoading",false);
            self.disableButton = false;

            self.isDeviceRegistered = true;
            self.set("buttonText", "Disable Notifications");
            self.set("headerText", "Successful registration for push notifications!");
            self.set("registrationMessage", "This device has been initialized for push notifications and is now registered in Telerik Backend Services.");

        };
        //Callback for device registration error
        self._deviceRegistrationError = function (error) {
            self.set("isLoading",false);
            self.disableButton = false;

            self.set("headerText", "Registration not successful!");
            self.set("registrationMessage", "Error while registering: " + JSON.stringify(error));
            self.set("buttonText", "Enable Notifications");

            console.log(error);
        };

        //Callback for device unregister success.
        self._unregisterDeviceSuccess = function() {
            self.isDeviceRegistered = false;
            self.disableButton = false;
            self.set("isLoading",false);

            self.set("buttonText", "Enable Notifications");
            self.set("headerText", "Device unregistered successfully!");
            self.set("registrationMessage", "Push token was invalidated and the device was unregistered from Telerik Backend Services. No push notifications will be received.");
        };

        //Callback for device unregister error.
        self._unregisterDeviceError = function(error) {
            self.isDeviceRegistered = false;
            self.disableButton = false;
            self.set("isLoading",false);

            self.set("buttonText", "Disable Notifications");
            self.set("headerText", "Could not unregister device!");
            self.set("registrationMessage", "Error while unregestering device: " + JSON.stringify(error));
        };

        // Configure the Push Notifications settings - for iOS and for Android
        self.pushSettings = {
            //iOS - specific settings
            iOS: {
                badge: true,
                sound: true,
                alert: true
            },
            notificationCallbackIOS: function(userInfo) {
                //Show a dialog with the push notification
                dialogs.alert({
                    title: "Push Notification",
                    message: JSON.stringify(userInfo.alert),
                    okButtonText: "OK"
                }).then(function () {
                    console.log("Dialog closed!");
                });            
            },
            //Android - specific settings
            android: {
                projectNumber: '<ENTER_YOUR_PROJECT_NUMBER>'
            },
            notificationCallbackAndroid: function callback(data) {
                //Show a dialog with the push notification
                dialogs.alert({
                    title: "Push Notification",
                    message: JSON.stringify(data),
                    okButtonText: "OK"
                }).then(function () {
                    console.log("Dialog closed!");
                });
            }
        };
    }

    MainViewModel.prototype.registerDevice = function (args) {
        var self = this;

        //Adjust button and text message
        self.set("buttonText", "Loading...");
        self.set("registrationMessage", "Registering device...");
        self.set("isLoading",true);
        self.disableButton = true;

        //Call the everlive register for push method
        self.everlive.push.register(self.pushSettings, self._deviceRegistrationSuccess, self._deviceRegistrationError);
    }

    MainViewModel.prototype.unregisterDevice = function (args) {
        var self = this;

        self.set("buttonText", "Loading...");
        self.set("registrationMessage", "Unregistering device...");

        self.set("isLoading",true);
        self.disableButton = true;

        self.everlive.push.unregister(self._unregisterDeviceSuccess, self._unregisterDeviceError);
    }

    MainViewModel.prototype.registrationTapAction = function (args) {
        var self = this;
        if(!self.isLoading) {
            if (self.isDeviceRegistered) {
                self.unregisterDevice();
            } else {
                self.registerDevice();
            }
        }
    }

    return MainViewModel;
})(observable.Observable);

exports.MainViewModel = MainViewModel;
exports.mainViewModel = new MainViewModel();
