var Q = require('q');
var RequestModel = require('./RequestModel');
var urljoin = require('url-join');

class v2 extends RequestModel
{
	constructor (agentBaseUrl, certOptions, headers)
	{
		super(certOptions, headers);
		this.agentBaseUrl = agentBaseUrl;
	}

	send (threadId, format, message)
	{
		var body = {
			format: format.toUpperCase(),
			message: message
		};

		var options = {
			json: true,
			body: body
		};

		return this.request(urljoin(this.agentBaseUrl, '/v2/stream/', threadId, '/message/create'), 'POST', options)
	}
}

class v3 extends RequestModel
{
	constructor (agentBaseUrl, certOptions, headers)
	{
		super(certOptions, headers);
		this.agentBaseUrl = agentBaseUrl;
	}

	send (threadId, message, json)
	{
		var formData = {
			message: message,
			data: JSON.stringify(json || {})
		};

		var options = {
			json: true,
			formData: formData
		};

		return this.request(urljoin(this.agentBaseUrl, '/v3/stream/', threadId, '/message/create'), 'POST', options)
	}
}

class MessageModel extends RequestModel
{
	constructor (agentBaseUrl, certOptions, headers)
	{
		super(certOptions, headers);

		this.agentBaseUrl = agentBaseUrl;
		this.v2 = new v2(agentBaseUrl, certOptions, headers);
		this.v3 = new v3(agentBaseUrl, certOptions, headers);
	}

	send (threadId, format, message)
	{
		this.v2.send(threadId, format, message);
	}
}

module.exports = MessageModel;