import { HighlighterDataType } from "../hooks/useComputePosition";

const Highlighter = ({ x=0 , y=0 , width ,height}: HighlighterDataType) => {

  return (
    <div
      style={{
        top: y,
        left: x,
        width,
        height,
      }}
      className="tbox-absolute tbox-axe-anim tbox-border-2 tbox-p-1 tbox-shadow-lg tbox-border-solid tbox-border-primary tbox-pointer-events-none tbox-rounded-md tbox-highlighter "
    ></div>
  );
};

export default Highlighter;
