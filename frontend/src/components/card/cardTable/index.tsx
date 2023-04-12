import "./cardTable.css";
type CardTableProps = {
  className?: string;
  id?: string | number;
  name?: string;
  email: string;
  image: string;
  position: string;
};
export default function CardTable({
  className,
  name,
  email,
  image,
  position,
  id,
}: CardTableProps) {
  const useStyle: React.CSSProperties = {};
  return (
    <div className={`${className}`}>
      <div className="flex flex-col">
        <h1 className="text-blue-700  font-bold text-xl tracking-wide ">
          {name}
        </h1>
        <h2 className="text-gray-500  font-medium text-sm tracking-normal mb-1">
          {email}
        </h2>
        <p className="text-green-600 font-normal text-xs tracking-normal">
          {position}
        </p>
      </div>
      <div className="bg-blue-700 p-1 rounded-md" style={useStyle}>
        <img
          src={`${image}`}
          alt="image-profile"
          className="object-cover h-full w-10 image"
        />
      </div>
    </div>
  );
}
