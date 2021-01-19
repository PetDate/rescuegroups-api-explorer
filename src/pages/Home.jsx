import React, { useState } from "react";
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import ApiResponseForm from "components/form/ApiEndpointForm";
import { Label1 } from "baseui/typography";
import JSONPretty from "react-json-pretty";

const Home = () => {
  const [response, setResponse] = useState(undefined);

  return (
    <section
      style={{
        marginTop: "10vh",
      }}
    >
      <Grid align={ALIGNMENT.center} o>
        <Cell span={[4, 8, 12]}>
          <ApiResponseForm onResponse={setResponse} />
          {response && <div
            style={{ display: "block" }}
          >
            <Label1>Result:</Label1>
            <JSONPretty data={response} />
          </div>}
        </Cell>
      </Grid>
    </section>
  );
};

export default Home;
