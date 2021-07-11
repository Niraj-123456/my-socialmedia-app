import { storage } from "../firebase";
import { useState, useEffect } from "react";

const useStorage = (file) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const ref = storage.ref(`/images/${file.name}`);
    const onUploadTask = ref.put(file);
    onUploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setImgUrl(url);
          });
      }
    );
  }, [file]);

  return { imgUrl };
};

export default useStorage;
