import React from "react";
import { IUser } from "../../models/IUser";
type InfiniteScrollProps<T> = {
  items: Array<T>;
  renderItem: (ItemProps: {
    item: T;
    idx: number;
    array: Array<T>;
    key: string | number;
  }) => React.ReactNode;
  emptyList?: React.ReactNode;
  className?: string;
};
export default function InfiniteScroll({
  items,
  renderItem,
  emptyList,
  className,
}: InfiniteScrollProps<IUser>) {
  return (
    <div className={`${className}`}>
      {items?.map((item, idx, array) => {
        return (
          <React.Fragment key={item.id}>
            {renderItem({ item, idx, array, key: item.id })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
