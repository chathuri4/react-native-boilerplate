// import express from 'express';
const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin');
const authActions = require('./authActions')
const verifyAuth = authActions.verifyAuth

admin.initializeApp();

const app = express();
const cors = require('cors');
app.use(cors({ origin: true }));

app.post('/auth/action', verifyAuth)

exports.api = functions.https.onRequest(app)

exports.onResetPassword = functions.https.onRequest((request, response) => {
  const { mode, oobCode, apiKey } = request.query

  console.log('reset passowrd,', request, response)

  //open app page to reset password
  return response.redirect("https://www.lizard-apps.com")
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
