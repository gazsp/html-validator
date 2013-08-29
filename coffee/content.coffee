
# TODO: Nice pop up with error results
# TODO: Enable / disable logging to console

class ExtensionContent
	constructor: ->
		self = @

		$(document).ready ->
			self.doValidation()

		chrome.extension.onMessage.addListener (request, sender, sendResponse) =>
			if request.action == "actionClicked"
				sendResponse
					message: 'ok'
			else
				sendResponse {}


	doValidation: ->
		self = @

		# Get document HTML
		node = document.doctype;
		doctype = node.name +
			(node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') +
			(!node.publicId && node.systemId ? ' SYSTEM' : '') +
			(node.systemId ? ' "' + node.systemId + '"' : '')
		html  = "<!DOCTYPE #{doctype}>\n"
		html += document.documentElement.outerHTML

		# Get correct URL
		if doctype.toLowerCase() == 'html'
			url = 'http://html5.validator.nu/'
		else
			url = 'http://validator.nu/'

		# Send to validator service
		$.ajax
			type: 'POST'
			url: "#{url}?out=json"
			data: html
			processData: false
			contentType: false
			timeout: 3000
			headers:
				'Content-Type': 'text/html'
			dataType: 'json'

			success: (data, statux, xhr) ->
				chrome.runtime.sendMessage
					action: "updateBadge"
					text: "#{data.messages.length}"

				if data.messages.length == 0
					window.console.info "No validation errors"
				else
					for k,v of data.messages
						window.console.warn("#{v.lastLine}: #{v.message}")

			error: (xhr, type, error) ->
				chrome.runtime.sendMessage
					action: "updateBadge"
					text: "!"
				return
				# window.console.error "Failed to contact validation service", type, error
				# window.console.endGroup


new ExtensionContent
