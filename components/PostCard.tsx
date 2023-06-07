import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PostCard({ post }) {
  return (
    <Card key={post.id}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary" gutterBottom>
            {post.blog}
          </Typography>
          <Stack direction="row" spacing={1}>
            {post.tags.map((tag, idx) => (
              <Chip label={tag} key={idx} variant="outlined" size="small" />
            ))}
          </Stack>
        </Stack>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <List>
          {post.summary.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <BoltIcon />
              </ListItemIcon>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider light />
      <CardActions>
        <Button
          fullWidth
          component={Link}
          href={post.href}
          rel="noopener noreferrer"
          target="_blank"
          color="primary"
        >
          Read Full Article <ArrowForwardIcon sx={{ fontSize: "16px" }} />
        </Button>
      </CardActions>
    </Card>
  );
}
