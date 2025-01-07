import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

const SCard = ({ title, children, icon }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 ease-in-out hover:scale-105">
      {icon && <div className="text-[var(--primary-color)] mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );
};

export default SCard;
