import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import ModalForNewTransaction from "./Micro_Components/ModalForNewTransaction";

function NavbarX() {
  return (
    <Navbar className="shadow-">
      <NavbarBrand>
        <img src="./assets/Capture.PNG" alt="" />
        <p className="font-bold text-inherit">Enigma Laundry</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="flex">
        <Link href="/RegisterPage">
          <Button color="secondary">SignUp</Button>
        </Link>

        <Link href="/LoginPage">
          <Button color="secondary">SignIn</Button>
        </Link>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarX;
