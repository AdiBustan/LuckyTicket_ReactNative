import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getApp } from "firebase/app";

export async function uploadImage(uri: string) {
    try {
        const storage = getStorage()
        // Convert the URI to a Blob
        const response = await fetch(uri);
        const blob = await response.blob();
    
        // Create a reference to the file you want to upload
        const fileName = uri.split('/').pop();
        const storageRef = ref(storage, `images/${fileName}`);
    
        // Upload the file
        const snapshot = await uploadBytes(storageRef, blob);
    
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
}

export async function getDownloadImage(imgName: string) : Promise<string> {
    const storage = getStorage();
    let urlToSend = ""
    await getDownloadURL(ref(storage, 'images/' + imgName))
    .then((url) => {
        console.log("======== url:  " + url)
        urlToSend = url
    })
    .catch((error) => {
        return urlToSend
    });
    return urlToSend
}