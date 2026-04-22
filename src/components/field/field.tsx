import * as React from "react";
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/label/label";

// ─── Form (FormProvider re-export) ───────────────────────────────────────────

const Form = FormProvider;

// ─── FormField ────────────────────────────────────────────────────────────────

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName };

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

// ─── useFormField ─────────────────────────────────────────────────────────────

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) throw new Error("useFormField must be used within <FormField>");

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// ─── FormItem ─────────────────────────────────────────────────────────────────

type FormItemContextValue = { id: string };

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

// ─── FormLabel ────────────────────────────────────────────────────────────────

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

const FormLabel = React.forwardRef<React.ElementRef<typeof Label>, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return (
      <Label
        ref={ref}
        htmlFor={formItemId}
        className={cn(error && "text-destructive-foreground", className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-destructive-foreground" aria-hidden>*</span>
        )}
      </Label>
    );
  }
);
FormLabel.displayName = "FormLabel";

// ─── FormControl ──────────────────────────────────────────────────────────────

const FormControl = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// ─── FormDescription ──────────────────────────────────────────────────────────

const FormDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-caption text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

// ─── FormMessage ──────────────────────────────────────────────────────────────

const FormMessage = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<"p">>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message ?? "") : children;
    if (!body) return null;
    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-caption text-destructive-foreground", className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField };
