import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../utils/fetchUtils'

export default function(){
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const headers = {
        'X-Algolia-API-Key': algoliaConfig.key,
        'X-Algolia-Application-Id': algoliaConfig.appId,
    }
    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use('/api/user', getUserRoute)
    })

    async function getUserRoute(req, res, next){
        const identity = req.identity
        const userData = await getUserById(identity)

        if(userData.status == 200){
            sendJSON(userData.json, res)
            return
        }

        createUser(req.identity)
        sendJSON(makeUserPayload(identity), res)
        next()
    }

    async function createUser(identity){
        try {
            unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                headers,
                method: 'PUT',
                body: JSON.stringify(makeUserPayload(identity))
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getUserById(userId){
        try {
            unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                headers,
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    function sendJSON(data, res){
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
    }

    function makeUserPayload(identity){
        return {
            name: identity.name,
            email: identity.email,
            image: identity.image,
            homeId: [],
            reviewCount: 0,
            description: '',
            joined: new Date().toISOString()
        }
    }
}