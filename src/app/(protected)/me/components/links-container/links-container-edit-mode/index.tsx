import { Button, TextInput } from "@/components";
import { useUser } from "@/hooks";
import { useEditUserStore, useUserStore } from "@/lib/zustand";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaLink, FaPlus } from "react-icons/fa";

export type EditModeProps = {
  onSave: () => void;
  onCancel: () => void;
};

export function LinksContainerEditMode({
  onSave,
  onCancel,
}: Readonly<EditModeProps>) {
  const { setProfileData, hasUnsavedChanges, resetUnsavedChanges, errors } =
    useEditUserStore();

  const {
    user: {
      profile: { githubUrl, linkedinUrl, websiteUrl },
    },
  } = useUserStore();

  const githubUsername = githubUrl?.split("/").at(-1);
  const linkedinUsername = linkedinUrl?.split("/").at(-1);

  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();
  const divRef = useRef<HTMLDivElement | null>(null);

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
  }, [onSave, updateUser, hasUnsavedChanges, , hasErrors]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleFinalize();
      }
    },
    [handleFinalize]
  );

  useEffect(() => {
    return () => {
      if (hasUnsavedChanges) {
        resetUnsavedChanges();
      }
      setLoading(false);
    };
  }, [resetUnsavedChanges, hasUnsavedChanges]);

  useEffect(() => {
    const divElement = divRef.current;

    if (!divElement) {
      return;
    }

    divElement.addEventListener("keydown", handleKeyDown);

    return () => {
      divElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div ref={divRef} className="p-5 flex flex-col gap-5 items-start min-w-lg">
      <h1>Adicionar links para o perfil</h1>
      <div className="flex flex-col gap-2 w-full">
        <TextInput
          icon={<FaLink />}
          id="githubUrl"
          name="githubUrl"
          label="GitHub"
          defaultValue={githubUsername}
          placeholder="ex.: pedrobraghin"
          onChange={(e) => setProfileData({ githubUrl: e.target.value })}
        />
        <TextInput
          icon={<FaLink />}
          id="linkedinUrl"
          name="linkedinUrl"
          label="LinkedIn"
          defaultValue={linkedinUsername}
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
      {hasErrors && (
        <div>
          <span className="text-sm text-amber-300">
            Ocorreu um erro ao tentar atualizar os dados. Tente novamente.
          </span>
        </div>
      )}
    </div>
  );
}
