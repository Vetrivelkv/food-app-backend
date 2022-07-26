const express = require("express");
const router = express.Router();
const firebaseAuthModel = require("../models/firebaseAuthModel");
const { getAuth } = require("firebase-admin/auth");

router.get("/getAuth", async function (req, res, next) {
  try {
    const idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaWR0b2tlbi01YWE3MSIsImF1ZCI6ImlkdG9rZW4tNWFhNzEiLCJhdXRoX3RpbWUiOjE2NTg4MDc0MzMsInVzZXJfaWQiOiJ5dTBKcVNFd3B4VmhHd0xvc2RMSmtVSmVqcGkyIiwic3ViIjoieXUwSnFTRXdweFZoR3dMb3NkTEprVUplanBpMiIsImlhdCI6MTY1ODgwNzQzMywiZXhwIjoxNjU4ODExMDMzLCJlbWFpbCI6InZldHJpMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidmV0cmkxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.J54Zh9t9q7IY_zYi0Ko4Ixy1SDZkAtwucKACEzDyCsR0v1rlNMeAnCKmREJAqlDdjPw_AURqF82ShFW0JehaDsmeTH2Wes9kcuZBI5W4Rw0hx-JcgNcJlkdr1WkxS8bmJ23M1f7avs_Vf9JKRMM-lbjr2uJXdDY4mz7vH6jQsxGVY0CrNLoe57nTNB4G8PaSN4W9ud4rTxrrbmPwBefN9tut-I0f2SmQohGOR6BcOdVhM1-5jiYl9S2-qH42wU2DfjCcg1jcYy6PLuhTHE_799bk8SSewPAmlDt-SWFWoQVlUFSYF7Ovgv3wCAjOYeYUNQSnVshb5RQbVdc2PneR4A";

    const results = await getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
      })
      .catch((error) => {
        throw error;
      });
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
