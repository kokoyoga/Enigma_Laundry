import React from "react";
import { Form, Input, Button, Card, Link } from "@heroui/react";

function LoginPage() {
  const [action, setAction] = React.useState(null);

  return (
    <Card className="flex flex-col h-screen items-center justify-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4 items-center justify-center"
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid Username"
          label="Username"
          labelPlacement="outside"
          name="Username"
          placeholder="Enter your Username"
          type="Username"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="Password"
          placeholder="Enter your Password"
          type="password"
        />

        <div className="flex gap-2">
          <Button color="primary" type="submit">
            SignUp
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
      <Link href="/">
        <Button color="transparant">Back to Home Page</Button>
      </Link>
    </Card>
  );
}

export default LoginPage;
