export default function LeftSide() {
  return (
    <header
      className="
        bg-emerald-500
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:flex
        lg:w-112
        lg:items-start
        lg:overflow-y-auto
        xl:w-120"
    >
      <div
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
      >
        <span className="font-mono text-emerald-100/80">Created By</span>
        <span className="mt-6 flex gap-6 font-bold text-emerald-900 tracking-wide font-medium">
          Rob Sutcliffe
          <span className="text-emerald-100/50">/</span>
          Firefields Design
        </span>
      </div>
      <div
        className="
            relative
            z-10
            mx-auto
            px-4
            pb-4
            pt-10
            bg-gray-800
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
          <p className="mt-3 text-lg font-medium leading-8 text-slate-100">
            Summaries of current trending tech posts
          </p>
        </div>
      </div>
    </header>
  );
}
