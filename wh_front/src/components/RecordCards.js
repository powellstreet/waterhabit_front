import React from "react";

const RecordCards = () => {
  return (
    <div>
        This is RecordsCards!
      {/* <Grid
        container
        spacing={3}
        justify="center"
        className={classes.stampGrid}
      >
        {records.map((el, idx) => {
          return el >= goal ? (
            <Grid
              item
              xs={1}
              spacing={5}
              style={{ backgroundColor: "skyblue" }}
            >
              <Stamp key={idx} day={idx + 1} intake={el} />
            </Grid>
          ) : (
            <Grid item xs={1} spacing={5} style={{ backgroundColor: "orange" }}>
              <Stamp key={idx} intake={el} />
            </Grid>
          );
        })}
      </Grid> */}
    </div>
  );
};

export default RecordCards;
