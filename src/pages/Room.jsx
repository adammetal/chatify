import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import store from "../firestore";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import FileUpload from "../components/FileUpload";
import Messages from "../components/Messages";

const messagesCollRef = collection(store, "chat-messages");

function Room() {
  const auth = useAuth();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [room, loading] = useDocumentData(doc(store, "chat-rooms", id));

  const sendMessage = async () => {
    setIsLoading(true);
    await addDoc(messagesCollRef, {
      message,
      uid: auth.uid,
      room: id,
      created: serverTimestamp()
    });

    if (file) {
      await addDoc(messagesCollRef, {
        file,
        uid: auth.uid,
        room: id,
        created: serverTimestamp()
      });
    }

    setMessage("");
    setFile("");
    setIsLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={4}>
        <Typography variant="h2">{room.name}</Typography>
        <Box sx={{ p: 2 }}>
          <Messages roomId={id} />
        </Box>

        <Box sx={{ p: 2, display: "flex" }}>
          <TextField
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            variant="outlined"
            fullWidth
            label="Your message"
            disabled={isLoading}
            value={message}
          />
          <Button
            onClick={sendMessage}
            variant="outlined"
            endIcon={<SendIcon />}
            disabled={isLoading}
          >
            Send
          </Button>
        </Box>

        <Box sx={{ p: 2 }}>
          <FileUpload
            onUploadDone={(url) => {
              setFile(url);
            }}
            uid={auth.uid}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Room;
