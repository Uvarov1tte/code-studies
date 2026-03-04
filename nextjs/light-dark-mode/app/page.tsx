import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Title } from "@/components/ui/title";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
      <div className="max-w-3xl text-center space-y-10">
        <Title/>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          deserunt fuga placeat quis sapiente tempore repellendus enim eaque
          illo dicta officia reprehenderit dolores ea nulla, voluptates
          cupiditate neque ipsum assumenda.
        </p>
        <div className="space-x-2">
          <Button>Button 1</Button>
          <Button variant="secondary">Button 2</Button>
        </div>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
}
