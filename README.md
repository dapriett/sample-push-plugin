# Prerequisites

In order to run this sample, you have to enable the Push Notifications functionality in your Backend Services project. You can see more details how to setup the Android and iOS platforms in the Backend Services here:

http://docs.telerik.com/platform/backend-services/features/push-notifications/setup

# Getting Started

- Add the NativeScript Push Plugin

		tns plugin add nativescript-push-notifications 	

- Go to main-view-model and set the correct settings:
	-	 Set your Everlive API Key at:

			self.everlive = new Everlive('<ENTER_YOUR_API_KEY_HERE>');
	-	 Android: Set your project number
 
			projectNumber: '<ENTER_YOUR_PROJECT_NUMBER>'
	
## Android

- Add the android platform to the sample

		tns platform add android 

- Add google play services, as GCM is part of it. It's present in the android-sdk. Add it like this: 

		tns library add android C:\Users\your_user_name\AppData\Local\Android\android-sdk\extras\google\google_play_services\libproject\google-play-services_lib\libs


- Run the application

		tns run android

- Click Register to register the device in Backend Services and you can start sending push notifications from your account.

## iOS

- Add the iOS platform to the sample

		tns platform add ios

- Set the correct bundle ID in the package.json at the root level of the project. The ID should be the same as in your Certificate for Push Notifications.

```javascript
	"nativescript": {
		"id": "com.telerik.PushNotificationApp",
		...
	}
````

- Run the applications

		tns run ios

	  