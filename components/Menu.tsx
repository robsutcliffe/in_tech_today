import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Menu() {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Post Summaries
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
