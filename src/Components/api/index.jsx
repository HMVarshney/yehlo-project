import firebase from './firestore';

const getData = async ()=>{
    const db = await firebase.firestore().collection("users").get();
    const data = db.docs.map(doc=>doc.data());

    return data
};

export {getData}