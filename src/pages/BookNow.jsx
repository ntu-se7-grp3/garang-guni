const HAIKU = ["Time for new chapters", "Treasure await new hands", "Book your slot today"];

const splitLastWord = (str) => {
  const wordArr = str.split(" ");
  return [wordArr.slice(0, -1).join(" ") + " ", wordArr.slice(-1).toString()];
};

function BookNow() {

  return (
    <>
      <div>
        <div>
          <p>Turn your trash into cash</p>
          <div>
            {HAIKU.map((text, i) => {
              if (i === 1) {
                const [preHighlightWord, highlightWord] = splitLastWord(text);
                return <p key={i}>
                  {preHighlightWord}<span className="highlight">{highlightWord}</span>
                </p>
              }
              return <p key={i}>{text}</p>;
            })}
          </div>
          <p>Find the list of eligible items for trade <button>here!</button></p>
        </div>
        <div>
          <div style={{display:"flex"}}>
            <div className="chooseLocation"></div>
            <div className="chooseDate"></div>
            <button></button>
          </div>
        </div>
      </div>
    </>

  );

}

export default BookNow;