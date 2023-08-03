import PropTypes from "prop-types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import store from "../firestore";
import { Box, Paper, Typography } from "@mui/material";

const messagesRef = collection(store, "chat-messages").withConverter({
  fromFirestore(snap) {
    return {
      id: snap.id,
      ...snap.data(),
    };
  },
  toFirestore(doc) {
    return doc;
  },
});

function Messages({ roomId }) {
  const [messages, loading] = useCollectionData(
    query(messagesRef, where("room", "==", roomId), orderBy('created', 'asc'))
  );

  if (loading === true) {
    return <h1>Loading</h1>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {messages?.map((message) => (
        <Paper sx={{p: 2}} key={message.id} elevation={4}>
          {message.file ? (
            <img style={{ maxWidth: "300px" }} src={message.file} />
          ) : (
            <Typography variant="p">{message.message}</Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}

Messages.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Messages;
