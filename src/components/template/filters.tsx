import type { FC } from "react";

import { useFilterForm } from "@/hooks";
import { Container, FilterList, SearchInput } from "@/components/template";
import { Button } from "@/components/ui";

export const Filters: FC = () => {
  const filterForm = useFilterForm();
  const { register, handleSubmit } = filterForm;

  return (
    <Container className="border-0 rounded-none bg-transparent w-full flex flex-wrap justify-between items-center gap-4 pt-8 pb-5.5  border-b border-blue-30">
      <FilterList filterForm={filterForm} />

      <form onSubmit={handleSubmit} className="min-w-1/2 flex justify-end gap-4">
        <SearchInput {...register("filter")} />
        <Button type="submit" className="bg-blue-40 hover:bg-blue-30 cursor-pointer w-full max-w-42 py-[1.4rem] rounded-lg">
          Novo
        </Button>
      </form>
    </Container>
  );
};
