class CustomError extends Error

	construct: (message, filename, lineNumber) ->
		super()
		error = new Error()

		if (error.stack)
			# Remove one stack level:
			if (typeof(Components) != 'undefined')
				# Mozilla:
				@stack = error.stack.substring(error.stack.indexOf('\n')+1)
			else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined')
				# Google Chrome/Node.js:
				@stack = error.stack.replace(/\n[^\n]*/,'')
			else
				@stack = error.stack

		@message = if message? error.message else message
		@fileName = if fileName? error.fileName else fileName
		@lineNumber = if lineNumber? error.lineNumber else lineNumber
