export default function UxLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="ux-layout bg-pink-400 w-[80%] h-[55rem] flex items-center justify-center text-center rounded-2xl shadow-lg">

        <main>{children}</main>

      </div>
    );
  }