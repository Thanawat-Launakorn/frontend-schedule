import React from "react";
import ISettingTime from "../../models/ISettingTime";
type SettingScrollLayoutProps<T> = {
  className?: string;
  items: Array<T>;
  renderItem: (itemProps: {
    item: T;
    idx: number;
    key: string | number;
    array: Array<T>;
  }) => React.ReactNode;
  emptyList?: React.ReactNode;
};
export default function SettingScrollLayout({
  className,
  items,
  renderItem,
}: SettingScrollLayoutProps<ISettingTime>) {
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
