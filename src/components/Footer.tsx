export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:px-10">
        <img src="/logo-full.png" alt="RealtyAdMedia" className="h-28 w-auto" />
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold text-steel">
          <li><a className="hover:text-brand" href="#about">About</a></li>
          <li><a className="hover:text-brand" href="#meta-ads">Meta Ads</a></li>
          <li><a className="hover:text-brand" href="#google-ads">Google Ads</a></li>
          <li><a className="hover:text-brand" href="#web-design">Web Design</a></li>
          <li><a className="hover:text-brand" href="#locations">Locations</a></li>
          <li><a className="hover:text-brand" href="#contact">Contact</a></li>
        </ul>
      </div>
      <p className="border-t border-black/5 py-5 text-center text-sm text-steel">
        &copy; {new Date().getFullYear()} RealtyAdMedia. All rights reserved.
      </p>
    </footer>
  );
}
