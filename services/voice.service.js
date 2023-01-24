const dialogflow = require('@google-cloud/dialogflow')
const uuid = require('uuid')

class VoiceService {
    constructor() { }

    async detectIntent(text) {

        const sessionId = uuid.v4()

        const projectId = process.env.GCP_PROJECT_ID

        const sessionClient = new dialogflow.SessionsClient({
            keyFilename: 'dialogflow-support-test-0ccb70d4a682.json'
        })

        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: 'en-US'
                }
            }
        }

        const responses = await sessionClient.detectIntent(request)

        console.log(responses[0].queryResult.intent.displayName)

        const queryResult = responses[0].queryResult;

        let responseObject = {
            responseText: queryResult.fulfillmentText,
            intent: queryResult.intent.displayName
        }

        if (queryResult.intent.displayName == 'Open page') {
            responseObject['pageNumber'] = queryResult.parameters.fields.pageNumber.numberValue
        }

        if (queryResult.intent.displayName == 'Show Pokemon') {
            responseObject['pokemonNumber'] = queryResult.parameters.fields.pokemonNumber.numberValue
        }

        return responseObject

    }

}

module.exports = VoiceService