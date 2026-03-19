export default function Footer() {
  return (
    <footer className="bg-[#2a4d60] px-16 py-12 text-sm text-neutral-50 border-t border-[#264653]/20">

      <div className="grid grid-cols-4 gap-6">

        <div>
          <p className="font-bold text-[#f0a262]">This is SyntaX</p>
          <p>Learning platform</p>
          <p>Progress traking</p>
        </div>

        <div>
          <p className="font-bold text-[#f0a262]">Connect with us</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>GitHub</p>
        </div>

        <div></div>

        <div>
          <p className="font-bold text-[#47a599]">Help & Suggestions</p>
          <p>Questions and Answers</p>
        </div>

      </div>

    </footer>
  );
}