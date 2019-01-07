var cardController = require('../controller/cardController');
var deckController = require('../controller/deckController');
var express = require('express');
var api = express.Router();
api.route('/card')
    .get(cardController.getallCard)
    ///^\/users\/(\d+)$/

api.post('/findCard',cardController.findCard)
api.get(/^\/card\/(\d+)$/,cardController.findCardByID)
api.get(/^\/card\/class\/([aA-zZ]+)$/,cardController.findCardByClass)
api.get(/^\/card\/rare\/([aA-zZ]+)$/,cardController.findCardByRare)
api.get(/^\/card\/kind\/([aA-zZ]+)$/,cardController.findCardByKind)
api.post('/createDeck', deckController.createDeck)
api.route('/deck')
    .get(deckController.getAllDeck)
api.get(/^\/deckcontent\/(\d+)$/,deckController.getDeckContent)
api.get(/^\/deck\/(\d+)$/,deckController.findDeck)
api.delete(/^\/deck\/(\d+)$/,deckController.deleteDeck)

module.exports = api;