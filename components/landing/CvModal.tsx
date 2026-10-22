"use client";

import React from "react";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { Dialog } from "@/components/ui/Dialog";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
}

export const CvModal: React.FC<CvModalProps> = ({
  isOpen,
  onClose,
  cvUrl = "/cv_erga.pdf",
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      labelledBy="cv-dialog-title"
      size="md"
      title="Curriculum Vitae"
      meta="Erga Wanda Afriza · PDF"
      footer={
        <>
          <a className="btn btn--ghost btn--sm" href={cvUrl} target="_blank" rel="noopener noreferrer">
            <FiExternalLink size={13} className="btn__icon" />
            Buka di tab baru
          </a>
          <a className="btn btn--primary btn--sm" href={cvUrl} download>
            <FiDownload size={13} className="btn__icon" />
            Unduh PDF
          </a>
        </>
      }
    >
      <iframe
        src={cvUrl}
        title="Pratinjau CV Erga Wanda Afriza"
        className="cv-frame"
      />
    </Dialog>
  );
};
