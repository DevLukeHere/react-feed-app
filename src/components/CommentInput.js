import { Grid, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Fragment } from "react";

export default function CommentInput() {
  return (
    <Fragment>
      <Grid container alignItems="center" sx={{ mt: 2, mb: 2 }}>
        <Grid item>
          <TextField
            id="outlined-textarea"
            label="Comment"
            placeholder="Comment here"
            multiline
          />
        </Grid>
        <Grid item>
          <IconButton sx={{ ml: 2 }}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  );
}
