import { bgColor, textColor } from '../utils/constants';

function Square({ value }) {
  return (
    <div style={{ backgroundColor: bgColor[value], color: textColor[value] }}>
      {value}
    </div>
  );
}

export default Square;
