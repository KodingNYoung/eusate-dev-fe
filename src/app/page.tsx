import Logo from "@/components/atoms/Logo";
import Typography from "@/components/atoms/Typography";

export default function Home() {
  return (
    <div>
      <Typography as="h1" variant="bold-9xl" className="font-app">
        Hello world
      </Typography>
      <Logo type="icon-black" />
    </div>
  );
}
