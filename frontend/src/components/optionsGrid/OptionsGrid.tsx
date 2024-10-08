import React, { useState } from "react";
import classes from "./OptionsGrid.module.css";
import { Option } from "../../Types/Quize";

type OptionsGridProps = {
  content: Option[];
  selectOptions: (index: number) => void;
};

const OptionsGrid: React.FC<OptionsGridProps> = ({
  content,
  selectOptions,
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  function clickOptionHandler(i: number) {
    setSelectedImage((_) => i);
    selectOptions(i);
  }

  return (
    <>
      {content.map((ele, i) => (
        <div
          key={i}
          className={`${classes.imageItem} ${
            selectedImage === i ? `${classes.selected}` : ""
          }`}
          onClick={() => clickOptionHandler(i)}
          style={{ padding: ele.text ? "15px" : "0px" }}
        >
          {ele.text && <span className={classes.text}>{ele.text}</span>}
          {ele.ImageUrl && (
            <img
              src={ele.ImageUrl}
              className={classes.imageUrl}
              alt={`${classes.Sample} ${i}`}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default OptionsGrid;
