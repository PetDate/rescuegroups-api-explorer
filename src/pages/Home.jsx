import React from "react";
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import ApiResponseForm from "components/form/ApiResponseForm";

const Home = () => {
  return (
    <section
      style={{
        paddingTop: "60px",
      }}
    >
      <Grid align={ALIGNMENT.center} o>
        <Cell span={[4, 8, 12]}>
          <ApiResponseForm />
        </Cell>
      </Grid>
    </section>
  );
};

export default Home;
