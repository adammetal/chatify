import { v4 } from "uuid";
import { TextField, Button } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import PropTypes from "prop-types";
import { useState } from "react";

import storage from "../storage";

function FileUpload({ onUploadDone, uid }) {
  const [upload, loading, snaphot, error] = useUploadFile();

  const [file, setFile] = useState();

  function handleFileInputChange(e) {
    setFile(e.target?.files?.[0]);
  }

  async function handleUploadFile() {
    const fileRef = ref(storage, `${uid}/${v4()}`);
    const result = await upload(fileRef, file);
    const url = await getDownloadURL(result.ref);

    setFile(null);
    onUploadDone(url);
  }

  return (
    <>
      <TextField type="file" onChange={handleFileInputChange} />
      <Button disabled={!file || loading} onClick={handleUploadFile}>
        Upload
      </Button>
      <pre>{JSON.stringify(snaphot, null, 2)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  );
}

FileUpload.propTypes = {
  onUploadDone: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default FileUpload;
