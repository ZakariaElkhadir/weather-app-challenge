import { Settings, ChevronDown } from "lucide-react";
const Header = () => {
  return (
    <header className="flex justify-between p-18">
      <div>
        <img src={"/assets/images/logo.svg"} />
      </div>
      <div>
        <button className="bg-[var(--neutral-700)] hover:bg-neutral-700 transition-colors p-2 rounded-md flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Units</span>
          <ChevronDown />
        </button>
      </div>
    </header>
  );
};
export default Header;
