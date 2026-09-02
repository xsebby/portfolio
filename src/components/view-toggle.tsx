import AnimatedText from "@/components/animated-text";
import { useView } from "@/context/view-context";

export function ViewToggle() {
  const { view, toggleView } = useView();
  const label =
    view === "dev" ? "switch to vfx view" : "switch to dev view";

  return (
    <button
      type="button"
      onClick={toggleView}
      className={`mt-2 text-zinc-500 transition-colors cursor-pointer text-left ${
        view === "vfx" ? "hover:text-violet-400" : "hover:text-emerald-400"
      }`}
    >
      <span key={view} className="inline-block">
        <AnimatedText
          text={label}
          element="span"
          className="text-zinc-500"
          artificialDelay={0.35}
          fast
        />
      </span>
    </button>
  );
}
