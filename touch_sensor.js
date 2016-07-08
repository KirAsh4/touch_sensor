/* global Module */

/* Magic Mirror
 * Module: touch_sensor
 *
 * MIT Licensed.
 */

Module.register('touch_sensor',{	
	defaults: {
		gpioPIN: 5,
		messages: [
			"That tickles!",
			"Stop that!",
			"Was it as good for you as it was for me?",
			"Stop touching me!",
			"HEY!",
			"Did that feel good?",
			"Are you having fun yet?",
			"Don't forget to wash your finger later ...",
			"Must you keep touching me?",
			"Can't a Sensor get some rest around here?",
			"I need touch pad sanitizer.",
			"Are you done yet?",
		]
	},	
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "SENSOR_TOUCHED") {
			this.sendNotification(notification, payload);
			var alertMsg = this.randomMsg();
			this.sendNotification("SHOW_ALERT", {type: "notification", title: "Touch Sensor", message: alertMsg});
		}
	},	
	start: function() {
		this.sendSocketNotification('SENSOR_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
		this.lastMsgIndex = -1;
	},

	randomIndex: function(messages) {
		if (messages.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * messages.length);
		};

		var msgIndex = generate();

		while (msgIndex === this.lastMsgIndex) {
			msgIndex = generate();
		}

		this.lastMsgIndex = msgIndex;

		return msgIndex;
	},

	randomMsg: function() {
		var msgs = this.config.messages;
		var index = this.randomIndex(msgs);
		return msgs[index];
	}
});
