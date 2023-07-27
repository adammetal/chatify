import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthProvider";
import store from "../firestore";
import { collection, query } from "@firebase/firestore";
import { Paper, Button, Grid } from "@mui/material";

const roomsRef = collection(store, "chat-rooms").withConverter({
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

const roomsQuery = query(roomsRef);

function Chat() {
  const user = useAuth();
  const navigate = useNavigate();
  const [rooms, loading] = useCollectionData(roomsQuery);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {loading
        ? "Chat rooms loading"
        : rooms.map((room) => (
            <Grid item xs={12} md={6} lg={4} key={room.id}>
              <Paper sx={{ padding: "10px" }}>
                <h1>{room.name}</h1>
                <Link to={`/chat/${room.id}`}>
                  <Button variant="contained">Go to this room</Button>
                </Link>
              </Paper>
            </Grid>
          ))}
    </Grid>
  );
}

export default Chat;
