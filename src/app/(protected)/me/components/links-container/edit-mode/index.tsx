import { Button, TextInput } from "@/components";
import { useUser } from "@/hooks";
import { useEditUserStore } from "@/lib/zustand";
import { useCallback, useEffect, useState } from "react";
import { FaLink, FaPlus } from "react-icons/fa";

export type EditModeProps = {
  onSave: () => void;
  onCancel: () => void;
};

export function EditMode({ onSave, onCancel }: Readonly<EditModeProps>) {
  const {
    setProfileData,
    hasUnsavedChanges,
    resetUnsavedChanges,
    errors,
    profileData: { githubUrl, linkedinUrl, websiteUrl },
  } = useEditUserStore();

  const [loading, setLoading] = useState(false);
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
    <div className="p-5 flex flex-col gap-5 items-start min-w-72">
      <h1>Adicionar links para o perfil</h1>
      <div className="flex flex-col gap-2 w-full">
        <TextInput
          icon={<FaLink />}
          id="githubUrl"
          name="githubUrl"
          label="GitHub"
          defaultValue={githubUrl}
          placeholder="ex.: pedrobraghin"
          onChange={(e) => setProfileData({ githubUrl: e.target.value })}
        />
        <TextInput
          icon={<FaLink />}
          id="linkedinUrl"
          name="linkedinUrl"
          label="LinkedIn"
          defaultValue={linkedinUrl}
          placeholder="ex.: pedrobraghin"
          onChange={(e) => setProfileData({ linkedinUrl: e.target.value })}
        />
        <TextInput
          icon={<FaLink />}
          id="websiteUrl"
          name="websiteUrl"
          label="Portfólio"
          defaultValue={websiteUrl}
          placeholder="ex.: www.bitgarden.com.br"
          onChange={(e) => setProfileData({ websiteUrl: e.target.value })}
        />
      </div>

      <div className="flex justify-end items-center gap-4 w-full">
        <Button label="Cancelar" style="outlined" onClick={handleCancel} />
        <Button
          label="Salvar"
          icon={<FaPlus />}
          type="confirm"
          loading={loading}
          onClick={handleFinalize}
        />
      </div>
    </div>
  );
}
