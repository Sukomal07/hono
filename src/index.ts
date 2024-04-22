import { Hono, Next } from "hono";
import { Context } from "hono/jsx";

const app = new Hono();

app.get("/", async (c) => {
  // const body = await c.req.json();
  // console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({
    success: true,
    message: "Hello there ",
  });
});
app.get("/ping", async (c) => {
  return c.json({
    success: true,
    message: "server is running",
  });
});

app.use(async (c, next) => {
  if (c.req.header("Authorization")) {
    // Do validation
    await next();
  } else {
    return c.text("You dont have access");
  }
});

app.get("/", async (c) => {
  const body = await c.req.parseBody();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({ msg: "as" });
});

export default app;
