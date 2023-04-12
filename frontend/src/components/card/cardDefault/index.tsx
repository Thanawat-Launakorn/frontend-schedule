import "./card.css";
type CardProps = {
  className?: string;
  id?: string | number;
  title: string;
  description: string;
  position: string;
};
export default function Card({
  className,
  title,
  description,
  position,
  id,
}: CardProps) {
  return (
    <div className={`${className}`}>
      <h1 className="lg:text-md  font-bold text-black tracking-tight mb-1">
        {title}
      </h1>
      <p className="lg:text-sm text-xs font-normal text-gray-500 lg:mb-7 mb-3 leading-6">
        {description}
      </p>
      <span className="lg:text-xs font-normal text-blue-600 tracking-wider uppercase">
        {position}
      </span>
    </div>
  );
}
