import { Button } from "@components";
import { RssIcon } from "@heroicons/react/20/solid";

export default function LeftSide() {
  const openGitHub = () =>
    window.open("https://github.com/robsutcliffe/in_tech_today", "_blank");
  const Icon = ({ ...props }) => {
    return (
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="currentColor"
        {...props}
      >
        <path d="M8 .198a8 8 0 0 0-8 8 7.999 7.999 0 0 0 5.47 7.59c.4.076.547-.172.547-.384 0-.19-.007-.694-.01-1.36-2.226.482-2.695-1.074-2.695-1.074-.364-.923-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.224 1.873.87 2.33.666.072-.518.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.954 0-.873.31-1.586.823-2.146-.09-.202-.36-1.016.07-2.118 0 0 .67-.214 2.2.82a7.67 7.67 0 0 1 2-.27 7.67 7.67 0 0 1 2 .27c1.52-1.034 2.19-.82 2.19-.82.43 1.102.16 1.916.08 2.118.51.56.82 1.273.82 2.146 0 3.074-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38A7.972 7.972 0 0 0 16 8.199a8 8 0 0 0-8-8Z"></path>
      </svg>
    );
  };
  return (
    <header
      className="
        bg-yellow-400
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:flex
        lg:w-112
        lg:items-start
        lg:overflow-y-auto
        xl:w-120"
    >
      <a
        className="
        hidden
        lg:sticky
        lg:top-0
        lg:flex
        lg:w-16
        lg:flex-none
        lg:items-center
        lg:whitespace-nowrap
        lg:py-12
        lg:text-sm
        lg:leading-7
        lg:[writing-mode:vertical-rl]"
        href="https://www.linkedin.com/in/robsutcliffe/"
        target="_blank"
      >
        <span className="font-mono text-black/80">Created By</span>
        <span className="mt-6 flex gap-6 text-black tracking-wider font-bold ">
          Rob Sutcliffe
          <span className="text-black/80">/</span>
          Firefields Design
        </span>
      </a>
      <div
        className="
            relative
            z-10
            mx-auto
            px-4
            pb-4
            pt-10
            bg-black
            sm:px-6
            md:max-w-2xl
            md:px-4
            lg:min-h-full
            lg:flex-auto
            lg:px-8
            lg:py-12
            xl:px-12"
      >
        <div className="mt-10 text-center lg:mt-12 lg:text-left">
          <div className="border-2 max-h-64 mx-auto aspect-square border-dotted border-white/20 rounded-full m-12 pl-8 pb-8 pt-4 pr-4 text-white/30">
            <RssIcon />
          </div>
          <p className="mt-3 text-lg font-medium leading-8 italic text-gray-200">
            This app takes blog posts from several sources and summaries them
            using AI to help guage which will be interesting to read next.
          </p>
          <div className="w-full mt-8 justify-center flex">
            <Button text="Fork This App" onClick={openGitHub} Icon={Icon} />
          </div>
        </div>
      </div>
    </header>
  );
}
