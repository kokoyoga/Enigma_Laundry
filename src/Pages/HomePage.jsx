import NavbarHomePage from "@/Components/NavbarHomePage";
import { Button, Link } from "@heroui/react";
function Home() {
  return (
    <>
      <NavbarHomePage />
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h1>Welcome to Enigma Laundry</h1>
        ----------------------------
        <Link href="/customerPage">
          <Button color="transparant">Customer Detail</Button>
        </Link>
      </div>
    </>
  );
}
export default Home;
