export default function Category({ title, children, id }) {
  return (
    <section
      id={id}
      className='  mx-auto max-w-full md:mx-0  md:min-w-[689px] '
    >
      <p className='-mb-1 flex justify-center rounded-t-md border bg-white py-2 text-xs font-bold text-slate-900 dark:border-slate-700/40 dark:bg-slate-800/40 dark:text-slate-200'>
        {title}
      </p>
      <div className='grid-col-1 grid justify-center gap-2 rounded-b-md border bg-white pt-2 shadow-md dark:border-slate-700/40 dark:bg-slate-800/40 dark:shadow-slate-100/5 md:grid-cols-2 md:justify-start md:gap-[0.2rem]'>
        {children}
      </div>
    </section>
  )
}

//flex flex-wrap px-1 gap-[0.2rem]
