import { useState, Fragment } from "react";
import { useSignIn } from "../hooks/useSignIn";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function SignInDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, loading } = useSignIn();

  const handleClick = () => {
    console.log("email:", email);
    console.log("password:", password);

    signIn(email, password);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: "#ffffff" }}
      >
        Sign In
      </Button>
      <Dialog open={open}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="sign-in-email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="sign-in-password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Sign In</Button>
        </DialogActions>
        {error && <Typography variant="caption">{error}</Typography>}
      </Dialog>
    </Fragment>
  );
}
