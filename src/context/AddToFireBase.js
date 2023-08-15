import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from 'uuid'; // Import uuid for generating unique image filenames
const useAddAdToFirebase = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const addAd = async (adData) => {
    setIsAdding(true);
    setError(null);
    try {
      const imageFile = adData.image; // Get the image File from adData
      const imageRef = ref(storage, 'adImages/'+ imageFile.name);
      // const imageRef = ref(storage, `adImages/${uuid()}_${imageFile.name}`); // Generate a unique image filename
      // Upload the image to Firebase Storage
      const uploadTask = uploadBytesResumable(imageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking logic if needed
        },
        (err) => {
          console.log("Error uploading image: ", err);
        },
        async () => {
          // Get the image download URL after successful upload
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          // Add the modified adData to Firestore with the image URL
          //addDoc(collection (db, 'users'), values);
          const docRef = await addDoc(collection(db, 'ads'), {
            title: adData.title,
            description: adData.description,
            price: adData.price,
            location : adData.location,
            category : adData.category,
            image: imageUrl,
          });
          console.log('Document written with ID: ', docRef.id);
          setSuccess(true);
        }
      );
    } catch (e) {
      console.error('Error adding document: ', e);
      setError(e.message);
    } finally {
      setIsAdding(false);
    }
  };
  useEffect(() => {
    setSuccess(false); // Reset success state when the component unmounts or re-renders
  }, []);
  return { isAdding, success, error, addAd };
};
export default useAddAdToFirebase;