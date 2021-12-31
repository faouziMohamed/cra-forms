export default function Footer() {
  const footerCls = `
    flex flex-col items-center justify-center gap-1 w-full  
    border-t-[1px] border-double border-[#6363636f] mt-3
    bg-[#53da47c] divide-y divide-[#cccbcb]
    `;
  return (
    <footer className={footerCls}>
      <div className='text-center w-full pt-1'>
        Club de Recherche Académique de Kénitra - Section Informatique &copy;{' '}
        {new Date().getFullYear()}
      </div>
      <div className='text-center w-full  pt-1'>
        Créée par{' '}
        <a
          className='text-[#148a0a]'
          href='https://github.com/faouziMohamed'
          target='_blank'
          rel='noopener noreferrer'
        >
          Faouzi Mohamed
        </a>
      </div>
    </footer>
  );
}
