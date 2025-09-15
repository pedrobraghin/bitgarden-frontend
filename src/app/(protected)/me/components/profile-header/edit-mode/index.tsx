import { EditModeProps } from "../types";
import { Button } from "@/components";
import { CiSaveDown2 } from "react-icons/ci";
import { BasicInfo } from "./basic-info";
import { AboutInfo } from "./about-info";
import { LocationInfo } from "./location-info";
import { CareerInfo } from "./career-info";
import { useState } from "react";

export function EditMode({ onSave }: Readonly<EditModeProps>) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Editar dados do perfil</h1>
        <Button
          label="Finalizar"
          type="default"
          onClick={() => {
            setLoading(true);
            onSave();
          }}
          loading={loading}
          icon={<CiSaveDown2 size={18} />}
        />
      </div>

      {/* Informações básicas */}
      <BasicInfo />

      {/* Sobre você */}
      <AboutInfo />

      {/* Localização */}
      <LocationInfo />

      {/* Trabalho */}
      <CareerInfo />
    </div>
  );
}
