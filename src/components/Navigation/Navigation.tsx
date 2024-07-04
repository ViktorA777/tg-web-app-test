import { Tab, Tabs, TabsProps } from "@mui/material";
import { Link } from "react-router-dom";
import { IDataMainNavigation } from "../../types/types";

interface INavigation extends TabsProps {
  data: IDataMainNavigation[];
}

export const Navigation = ({ data, ...props }: INavigation) => {
  return (
    <div>
      <Tabs {...props}>
        {data.map((item) => (
          <Tab
            key={item.id}
            component={Link}
            to={item?.to}
            icon={item?.icon}
            label={item?.label}
          />
        ))}
      </Tabs>
    </div>
  );
};
