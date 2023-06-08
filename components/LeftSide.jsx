export default function LeftSide() {
  return (
    <header
      className="
        bg-slate-50
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
        <span className="font-mono text-slate-500">overline</span>
        <span className="mt-6 flex gap-6 font-bold text-slate-900"></span>
      </div>
      <div
        className="
            relative
            z-10
            mx-auto
            px-4
            pb-4
            pt-10
            sm:px-6
            md:max-w-2xl
            md:px-4
            lg:min-h-full
            lg:flex-auto
            lg:border-x
            lg:border-slate-200
            lg:px-8
            lg:py-12
            xl:px-12"
      >
        <div className="mt-10 text-center lg:mt-12 lg:text-left">
          <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
            Somekind of sub heading coming soon.
          </p>
        </div>
      </div>
    </header>
  );
}