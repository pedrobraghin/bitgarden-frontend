import { FaArrowRight } from "react-icons/fa";
import { FormEvent, useCallback, useState } from "react";

import { Button, TextInput } from "@/components";
import { useProjectsStore } from "@/lib/zustand";
import { useProjects } from "@/hooks/use-projects";

interface CreateProjectProps {
  onFinish: () => void;
  onCancel: () => void;
}

export function CreateProject({
  onCancel,
  onFinish,
}: Readonly<CreateProjectProps>) {
  const { setNewProjectData } = useProjectsStore();
  const { createProject } = useProjects();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError(false);

      const project = await createProject();

      if (!project) {
        setIsLoading(false);
        setError(true);

        return;
      }

      onFinish();
    },
    [createProject, onFinish]
  );

  return (
    <div className="min-w-md p-5">
      <span>Criar novo projeto</span>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextInput
          label="Nome"
          placeholder="ex.: BitGarden"
          minLength={3}
          onChange={(e) => setNewProjectData({ name: e.target.value })}
          required
        />
        <TextInput
          label="Descrição"
          placeholder="ex.: Plataforma para times de Desenvolvimento."
          onChange={(e) => setNewProjectData({ description: e.target.value })}
          minLength={3}
          required
        />
        <div className="self-end flex gap-2 items-center">
          <Button label="Cancelar" style="outlined" onClick={onCancel} />
          <Button
            label="Criar"
            type="confirm"
            submit="submit"
            icon={<FaArrowRight />}
            loading={isLoading}
          />
        </div>
      </form>
      <div>
        {error && (
          <span className="text-sm text-red-400">
            Error ao criar projeto. Tente novamente.
          </span>
        )}
      </div>
    </div>
  );
}
