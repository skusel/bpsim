import Select from 'react-select';

export default function PredictorSelector({ className, style, availablePredictors, onPredictorChanged, enableHistoryBits, onHistoryBitsChanged, onPredictClicked }) {
  const selectStyles = {
    control: (baseStyles) => {
      return {
        ...baseStyles, 
        backgroundColor: 'white',
        color: 'black',
        border: "2px solid #003366",
        boxShadow: "none",
        cursor: "pointer",

        ':hover': {
          ...baseStyles[':hover'],
          backgroundColor: 'white',
          color: 'black',
          border: "2px solid #003366"
        },

        ':active': {
          ...baseStyles[':active'],
          backgroundColor: 'white',
          color: 'black',
          border: "2px solid #003366"
        }
      };
    },
    option: (baseStyles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...baseStyles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#003366"
          : isFocused
          ? "#afdbf5"
          : undefined,
        color: isDisabled
          ? "#cccccc"
          : isSelected
          ? "white"
          : isFocused
          ? "black"
          : "black",
        cursor: isDisabled ? 'not-allowed' : 'default',
        
        ':active': {
          ...baseStyles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#003366"
              : "white"
            : undefined,
          color: !isDisabled
            ? isSelected
              ? "white"
              : "black"
            : undefined
        },
      };
    },
    input: (baseStyles) => ({ ...baseStyles }),
    placeholder: (baseStyles) => ({ ...baseStyles }),
    singleValue: (baseStyles, { data }) => ({ ...baseStyles })
  };

  return (
    <div className={className} style={style}>
      <h1>Branch Predictor</h1>
      <div className="col-6" style={{display: "inline-block"}}>
        <Select
          styles={selectStyles}
          defaultValue={availablePredictors[0]}
          options={availablePredictors}
          onChange={newPredictor => onPredictorChanged(newPredictor.value)}
        />
      </div>
      <div className="col-3" style={{display: "inline-block"}}>
        <input
          id="twolevel"
          className="col-10"
          style={{display: "block", marginLeft: "8.33%"}}
          type="number" 
          placeholder="History Bits"
          min="0"
          max="10"
          maxLength={2}
          disabled={enableHistoryBits ? "" : "disabled"}
          onChange={e => onHistoryBitsChanged(e.target.value)}
        />
      </div>
      <div className="col-3" style={{display: "inline-block"}}>
        <button
          className="col-11"
          style={{display: "block", marginLeft: "8.33%"}}
          onClick={onPredictClicked}
        >
          Predict
        </button>
      </div>
    </div>
  );
}
