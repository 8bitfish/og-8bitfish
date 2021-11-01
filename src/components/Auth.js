const handleSignup = () => {
  const email = "myemail@gmail.com";
  const password = "password";
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      db.collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          account: accounts[0],
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
};

const handleSignin = () => {
  const email = "myemail@gmail.com";
  const password = "password";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);

      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};
