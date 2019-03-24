import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD8oEmENBbkekuvrWTk-5ek6H9tM26VlTo",
    authDomain: "bits-786a3.firebaseapp.com",
    databaseURL: "https://bits-786a3.firebaseio.com",
    projectId: "bits-786a3",
    storageBucket: "bits-786a3.appspot.com",
    messagingSenderId: "67750392774"
};

app.initializeApp(config);

export default app;
