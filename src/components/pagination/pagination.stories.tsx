import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "./pagination";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pagination do Hubble DS. Navegação entre páginas de qualquer listagem — tabelas, cards, resultados de busca.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const total = 10;
    const pages = [0, 1, 2, "...", 8, 9];
    return (
      <div className="flex flex-col gap-3">
        <Typography variant="caption" color="muted">página {page + 1} de {total}</Typography>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} />
            </PaginationItem>
            {pages.map((p, i) =>
              p === "..." ? (
                <PaginationItem key={`e-${i}`}><PaginationEllipsis /></PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink isActive={p === page} onClick={() => setPage(p as number)}>
                    {(p as number) + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(total - 1, p + 1))} disabled={page === total - 1} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const FewPages: Story = {
  name: "Poucas páginas (sem ellipsis)",
  render: () => {
    const [page, setPage] = useState(0);
    const total = 5;
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} />
          </PaginationItem>
          {Array.from({ length: total }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink isActive={i === page} onClick={() => setPage(i)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setPage((p) => Math.min(total - 1, p + 1))} disabled={page === total - 1} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: { controls: { disable: true } },
};

export const FirstPage: Story = {
  name: "Estados — primeira e última página",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">primeira página (Anterior desabilitado)</Typography>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious disabled /></PaginationItem>
            <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink onClick={() => {}}>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink onClick={() => {}}>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink onClick={() => {}}>10</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext onClick={() => {}} /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">última página (Próxima desabilitado)</Typography>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious onClick={() => {}} /></PaginationItem>
            <PaginationItem><PaginationLink onClick={() => {}}>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink onClick={() => {}}>8</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink onClick={() => {}}>9</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>10</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext disabled /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
