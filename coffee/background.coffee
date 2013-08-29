
class MyExtension

	@active = false

	constructor: ->
		self = @

		chrome.browserAction.onClicked.addListener (tab) ->
			@active = !@active
			console.log @active
			chrome.tabs.sendMessage tab.id, { action: "actionClicked", state: @active }, (response) ->
				# alert response.message

		chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
			if request.action == 'updateBadge'
				if parseInt(request.text) == 0
					color = '#9ee33b'
				else
					color = '#c01802'

				self.performCallbackInActiveTab (tab) ->
					textData =
						text: request.text
						tabId: tab.id
					chrome.browserAction.setBadgeText(textData)

					colorData =
						color: color
						tabId: tab.id
					chrome.browserAction.setBadgeBackgroundColor(colorData)


	performCallbackInActiveTab: (callback) ->
		self = @

		chrome.tabs.query
			currentWindow: true
			active: true,
			(tabArray) ->
				callback(tabArray[0])

new MyExtension