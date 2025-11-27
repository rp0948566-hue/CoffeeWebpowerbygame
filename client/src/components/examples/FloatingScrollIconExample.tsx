import { FloatingScrollIcon } from '../FloatingScrollIcon';

export default function FloatingScrollIconExample() {
  return (
    <div className="h-[200px] relative">
      <p className="text-muted-foreground text-sm">Scroll the page to see the coffee icon rotate</p>
      <FloatingScrollIcon />
    </div>
  );
}
