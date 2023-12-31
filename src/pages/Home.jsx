import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to chatify</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nam
        aspernatur assumenda, consequuntur ut ad impedit? Magni minus eveniet
        laborum, eaque dolorum doloribus fugit sapiente? Nisi quis atque rerum,
        dolor accusantium commodi, impedit veniam sequi dolores iste quidem
        minima blanditiis? Deserunt ab necessitatibus quis mollitia enim dolore
        voluptatem distinctio architecto.
      </p>
      <div>
        <Link to="/login">
          <Button variant="contained" type="button">
            Here you can sign in
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/chat">
          <Button variant="contained" type="button">
            Here you can see the chat rooms
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
