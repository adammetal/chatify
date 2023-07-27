import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import auth from "../auth";

function Login() {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    signInWithGoogle();
  };

  if (error) {
    return (
      <Paper
        elevation={4}
        sx={{ m: 4, p: 4, display: "flex", justifyContent: "center" }}
      >
        Something went wrong
      </Paper>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{ m: 4, p: 4, display: "flex", justifyContent: "center" }}
    >
      {!loading ? (
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      ) : (
        "In progress"
      )}
    </Paper>
  );
}

export default Login;
