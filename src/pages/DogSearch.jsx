import { Cell, Grid, ALIGNMENT } from "baseui/layout-grid";
import AnimalSearchForm from "components/form/AnimalSearchForm";
import React, { useState } from "react";
import AnimalSearchResponse from "components/form/AnimalSearchResponse";

const DogSearch = () => {
  const [response, setResponse] = useState(undefined);

  return (
    <section
      style={{
        marginTop: "10vh",
      }}
    >
      <Grid align={ALIGNMENT.center} >
        <Cell span={[4, 8, 12]}>
          <AnimalSearchForm 
            animal={"dogs"}
            onResponse={setResponse}
          />
          <AnimalSearchResponse response={response} />
        </Cell>
      </Grid>
    </section>
  );
};

export default DogSearch;