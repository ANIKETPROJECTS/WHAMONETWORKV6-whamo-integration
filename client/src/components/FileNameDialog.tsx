import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (fileName: string) => void;
  title: string;
  defaultFileName: string;
}

export function FileNameDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  defaultFileName,
}: FileNameDialogProps) {
  const [fileName, setFileName] = useState(defaultFileName);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!fileName.trim()) {
      setError("Please enter a file name");
      return;
    }
    setError("");
    onConfirm(fileName.trim());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="filename">File Name</Label>
            <Input
              id="filename"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              placeholder="Enter file name..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirm();
              }}
            />
            {error && <span className="text-sm text-destructive">{error}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
