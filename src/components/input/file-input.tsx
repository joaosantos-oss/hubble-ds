import * as React from "react";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupSeparator,
} from "./input-group";

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
  placeholder?: string;
  buttonLabel?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      hasError,
      placeholder = "Nenhum arquivo selecionado",
      buttonLabel = "Escolher arquivo",
      disabled,
      multiple,
      accept,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [label, setLabel] = React.useState("");

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 1) {
        setLabel(`${files.length} arquivos selecionados`);
      } else if (files && files.length === 1) {
        setLabel(files[0].name);
      } else {
        setLabel("");
      }
      onChange?.(e);
    };

    return (
      <InputGroup hasError={hasError} className={cn("cursor-pointer", className)}>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          {...props}
        />
        <InputGroupAddon className="px-0">
          <InputGroupButton
            type="button"
            disabled={disabled}
            className="px-3 h-full rounded-l-md rounded-r-none"
            onClick={() => inputRef.current?.click()}
          >
            {buttonLabel}
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupSeparator />
        <span
          className={cn(
            "flex-1 min-w-0 px-3 py-2 text-body-sm font-sans truncate self-center select-none",
            label ? "text-foreground" : "text-muted-foreground",
            disabled && "opacity-50"
          )}
        >
          {label || placeholder}
        </span>
      </InputGroup>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
export type { FileInputProps };
