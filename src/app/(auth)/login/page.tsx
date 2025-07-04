import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <Button formAction={login}>Log in</Button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
