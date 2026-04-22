import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./field";
import { Input } from "@/components/input/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/select/select";
import { Checkbox } from "@/components/checkbox/checkbox";
import { Button } from "@/components/button/button";

const meta: Meta = {
  title: "Inputs/Field",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Wrapper de campos de formulário integrado com React Hook Form. Gerencia id, aria-describedby, aria-invalid e exibe erros automaticamente.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Schema simples ───────────────────────────────────────────────────────────

const simpleSchema = z.object({
  username: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
});

export const Default: Story = {
  name: "Campo simples",
  render: () => {
    const form = useForm<z.infer<typeof simpleSchema>>({
      resolver: zodResolver(simpleSchema),
      defaultValues: { username: "" },
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-4 max-w-sm">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="joaosilva" {...field} />
                </FormControl>
                <FormDescription>Este será seu nome público.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="small">Enviar</Button>
        </form>
      </Form>
    );
  },
  parameters: { controls: { disable: true } },
};

// ─── Schema completo ──────────────────────────────────────────────────────────

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Insira um e-mail válido."),
  role: z.string({ required_error: "Selecione uma função." }),
  terms: z.boolean().refine((v) => v === true, "Você deve aceitar os termos."),
});

export const CompleteForm: Story = {
  name: "Formulário completo",
  render: () => {
    const form = useForm<z.infer<typeof profileSchema>>({
      resolver: zodResolver(profileSchema),
      defaultValues: { name: "", email: "", terms: false },
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-4 max-w-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" hasError={!!form.formState.errors.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="joao@exemplo.com"
                    hasError={!!form.formState.errors.email}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Nunca compartilharemos seu e-mail.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Função</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger hasError={!!form.formState.errors.role}>
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="flex flex-col gap-1 leading-none">
                  <FormLabel>Aceito os termos de uso</FormLabel>
                  <FormDescription>Ao marcar, você concorda com nossa política de privacidade.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" size="small">Criar conta</Button>
        </form>
      </Form>
    );
  },
  parameters: { controls: { disable: true } },
};

// ─── Estado de erro ───────────────────────────────────────────────────────────

const errorSchema = z.object({
  email: z.string().email("Insira um endereço de e-mail válido."),
});

export const WithErrors: Story = {
  name: "Com erros de validação",
  render: () => {
    const form = useForm<z.infer<typeof errorSchema>>({
      resolver: zodResolver(errorSchema),
      defaultValues: { email: "invalido@" },
    });

    // trigger validation on mount to show errors
    const { trigger } = form;
    (async () => { await trigger(); })();

    return (
      <Form {...form}>
        <form className="flex flex-col gap-4 max-w-sm">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    hasError={!!form.formState.errors.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
  parameters: { controls: { disable: true } },
};
