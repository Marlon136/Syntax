export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-5 bg-neutral-50 border-b border-[#264653]/20">

      <div className="text-xl font-bold text-orange-500">
        Syntax
      </div>

      <div className="flex gap-6 text-sm text-[#264653]">

        <button className="hover:text-orange-500 transition">
          Courses
        </button>

        <button className="hover:text-orange-500 transition">
          Paths
        </button>

        <button className="hover:text-orange-500 transition">
          Pricing
        </button>

        <button className="hover:text-orange-500 transition">
          Community
        </button>

      </div>

      <div className="flex gap-3">

        <button className="text-[#264653] hover:text-orange-500">
          Log in
        </button>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
          Sign Up
        </button>

      </div>

    </nav>
  );
}