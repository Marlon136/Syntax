export default function Footer() {
  return (
    <footer className="bg-neutral-100 px-16 py-12 text-sm text-[#264653] border-t border-[#264653]/20">

      <div className="grid grid-cols-4 gap-6">

        <div>
          <p className="font-bold text-[#264653]">Syntax</p>
          <p>Learning platform</p>
        </div>

        <div>
          <p className="font-bold text-[#264653]">Platform</p>
          <p>Java</p>
          <p>Python</p>
          <p>Web</p>
        </div>

        <div>
          <p className="font-bold text-[#264653]">Company</p>
          <p>About</p>
          <p>Careers</p>
        </div>

        <div>
          <p className="font-bold text-[#264653]">Connect</p>
          <p>Twitter</p>
          <p>GitHub</p>
        </div>

      </div>

    </footer>
  );
}