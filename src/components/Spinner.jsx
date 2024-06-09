export default function Spinner() {
  return (
    <div className="bg-[#111317]   flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50 container mx-auto">
      <div>
        <span className="loading loading-ball text-white loading-lg h-24 dark:bg-sky-500"></span>
      </div>
    </div>
  );
}
