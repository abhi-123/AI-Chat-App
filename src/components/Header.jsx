function Header({ isOnline }) {
  return (
    <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
      <h2 className="text-white font-semibold text-lg sm:text-xl">AI Chat</h2>
      <div className="flex items-center gap-2 text-sm">
        <span
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>

        <span className="text-gray-300">{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
}

export default Header;
