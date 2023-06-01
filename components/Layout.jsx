import { Fragment } from 'react'
export default function Layout({ children }) {
  let hosts = ['Rob Sutcliffe', 'Firefields Design']

  return (
    <>
      <header className="lg:w-112 xl:w-120 relative bg-red-500/95 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:items-start lg:overflow-y-auto">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-black">Created by</span>
          <span className="text-w mt-6 flex gap-6 font-bold">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-red-900">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </span>
        </div>
        <div className="relative z-10 mx-auto bg-black px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:px-8 lg:py-12 xl:px-12">
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="mt-3 text-lg font-light leading-8 text-gray-300">
              Some kind of heading coming soon...
            </p>
          </div>
        </div>
      </header>
      <main className="lg:ml-112 xl:ml-120 lg:relative lg:mb-28">
        <div className="relative">{children}</div>
      </main>
      <footer className="py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
