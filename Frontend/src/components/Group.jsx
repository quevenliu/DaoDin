import Image from "next/image";

export default function Group({ path }) {
  return (
    <div className="group mt-8">
      
      {path === "/profile" ? (
        <div className="px-8 py-4 flex justify-between items-center bg-backgroundColor rounded-[20px] group-hover:rounded-b-none">
          <h3 className="px-8 text-4xl font-bold">Group</h3>
        </div>
      ) : (
        <div>
          <div className="px-8 py-4 flex justify-between items-center bg-backgroundColor rounded-[20px] group-hover:rounded-b-none">
            <h3 className="px-8 text-4xl font-bold">Group</h3>
            <Image
              src="/menu.svg"
              alt="menu"
              className="w-12 h-12"
              width={48}
              height={48}
            />
          </div>
          <div className="px-8 py-6 hidden group-hover:flex justify-between gap-8 bg-[#FDE0E0] rounded-b-[20px]">
            <p className="p-3 bg-[#F5B8B8] rounded-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus perferendis ratione unde nulla culpa quidem reiciendis,
              consequatur doloremque vitae quia, corrupti nihil maxime atque
              iure ea et modi quod minima. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Temporibus perferendis ratione unde
              nulla culpa quidem reiciendis, consequatur doloremque vitae quia,
              corrupti nihil maxime atque iure ea et modi quod minima. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Temporibus
              perferendis ratione unde nulla culpa quidem reiciendis,
              consequatur doloremque vitae quia, corrupti nihil maxime atque
              iure ea et modi quod minima.
            </p>
            <button
              type="button"
              className="w-[10%] px-6 py-2 self-end bg-primaryColor text-xl font-bold text-white rounded-[50px] shrink-0"
            >
              Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
