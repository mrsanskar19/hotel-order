import { cn } from "@/lib/utils";

type AppContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AppContainer({ children, className }: AppContainerProps) {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className={cn("w-full max-w-md bg-white shadow-2xl flex flex-col relative", className)}>
        {children}
      </div>
    </div>
  );
}
