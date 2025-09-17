import { Button, Modal } from "@/components";
import { useCallback, useState } from "react";

export interface ExternalLinkProps {
  url?: string;
  label: string;
  left?: React.ReactNode;
  withWarning?: boolean;
}

export function ExternalLink({
  label,
  url,
  left,
  withWarning,
}: Readonly<ExternalLinkProps>) {
  const [showWarning, setShowWarning] = useState(false);

  const openExternalLink = useCallback(() => {
    window.open(url, "_blank");
  }, [url]);

  const handleOpenLink = useCallback(() => {
    if (withWarning) {
      return setShowWarning(true);
    }

    openExternalLink();
  }, [openExternalLink, withWarning]);

  return (
    <>
      <Modal visible={showWarning}>
        <div className="flex flex-col gap-2">
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
      </Modal>

      <button onClick={handleOpenLink}>
        <div className="flex items-center gap-3 pl-4 pr-6 py-3 border transition-colors border-transparent hover:border-neutral-300/30 rounded-lg">
          {left}
          <span>{label}</span>
        </div>
      </button>
    </>
  );
}
