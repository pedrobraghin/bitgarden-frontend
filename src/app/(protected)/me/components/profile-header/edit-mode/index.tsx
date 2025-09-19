import { EditModeProps } from "../types";
import { Button } from "@/components";
import { CiSaveDown2 } from "react-icons/ci";
import { BasicInfo } from "./basic-info";
import { AboutInfo } from "./about-info";
import { LocationInfo } from "./location-info";
import { CareerInfo } from "./career-info";
import { useCallback, useEffect, useState } from "react";
import { useEditUserStore } from "@/lib/zustand";
import { useUser } from "@/hooks";

export function EditMode({ onSave, onCancel }: Readonly<EditModeProps>) {
  const [loading, setLoading] = useState(false);
  const { hasUnsavedChanges, resetUnsavedChanges, errors } = useEditUserStore();
  const { updateUser } = useUser();

  const hasErrors = Boolean(errors.apiError?.length);

  const handleFinalize = useCallback(async () => {
    setLoading(true);

    if (hasUnsavedChanges) {
      const success = await updateUser();
      if (!success || hasErrors) {
        setLoading(false);
        return;
      }
    }

    onSave();
  }, [onSave, hasUnsavedChanges, updateUser, hasErrors]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    return () => {
      if (hasUnsavedChanges) {
        resetUnsavedChanges();
      }
      setLoading(false);
    };
  }, [resetUnsavedChanges, hasUnsavedChanges]);

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Editar dados do perfil</h1>
        {hasErrors && (
          <div className="border border-red-400/80 rounded-md px-4 py-2">
            <span className="400">
              Erro ao atualizar perfil. Tente novamente
            </span>
          </div>
        )}
      </div>
      {/* Informações básicas */}
      <BasicInfo />

      {/* Sobre você */}
      <AboutInfo />

      {/* Localização */}
      <LocationInfo />

      {/* Trabalho */}
      <CareerInfo />

      <div className="flex justify-end items-center gap-4">
        <Button
          label="Cancelar"
          type="default"
          style="outlined"
          onClick={handleCancel}
        />
        <Button
          label="Finalizar"
          type="confirm"
          onClick={handleFinalize}
          loading={loading}
          icon={<CiSaveDown2 size={18} />}
        />
      </div>
    </div>
  );
}
