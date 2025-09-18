import { Button, Modal } from "@/components";
import { useCallback, useState } from "react";

export interface ExternalLinkProps {
  url?: string;
  label: string;
  withWarning?: boolean;
  left?: React.ReactNode;
}

export function ExternalLink({
  label,
  url,
  left,
  withWarning,
}: Readonly<ExternalLinkProps>) {
  const [showWarning, setShowWarning] = useState(false);

  const openExternalLink = useCallback(() => {
    if (showWarning) {
      setShowWarning(false);
    }
    window.open(url, "_blank");
  }, [url, showWarning]);

  const handleOpenLink = useCallback(() => {
    if (withWarning) {
      return setShowWarning(true);
    }

    openExternalLink();
  }, [openExternalLink, withWarning]);

  return (
    <>
      <Modal visible={showWarning}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col gap-2 bg-gray-800 p-6 rounded-md">
            <span>Você está abrindo um link externo! Deseja continuar? </span>
            <div className="flex justify-end gap-4">
              <Button
                label="Continuar"
                type="confirm"
                onClick={openExternalLink}
              />
              <Button
                label="Cancelar"
                type="cancel"
                onClick={() => setShowWarning(false)}
              />
            </div>
          </div>
        </div>
      </Modal>

      <button onClick={handleOpenLink}>
        <div className="flex items-center gap-3 pl-4 pr-6 py-3 border transition-colors border-transparent hover:border-neutral-300/30 rounded-lg cursor-pointer">
          {left}
          <span>{label}</span>
        </div>
      </button>
    </>
  );
}
