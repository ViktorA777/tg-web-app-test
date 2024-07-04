import { Tab, Tabs, TabsProps } from "@mui/material";

type TCategories = {
  id: string;
  label: string;
};

interface IFilterTabs extends TabsProps {
  categories: TCategories[];
}

export const FilterTabs = ({ categories, ...props }: IFilterTabs) => {
  return (
    <Tabs {...props}>
      {categories.map((category) => (
        <Tab value={category.id} key={category.id} label={category.label} />
      ))}
    </Tabs>
  );
};
