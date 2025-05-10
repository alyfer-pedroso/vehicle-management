import type { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <header className="w-full py-4 bg-blue-20">
      <div className="w-full max-w-[1188px] mx-auto px-6">
        <Link to="/?radio=tracked">
          <h1 className="text-white font-medium text-[1.1rem]">Alyfer Leandro de Araújo Pedroso</h1>
        </Link>
      </div>
    </header>
  );
};
