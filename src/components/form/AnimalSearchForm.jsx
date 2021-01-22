import { Accordion, Panel } from "baseui/accordion";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import React, { useEffect, useState } from "react";
import { RESCUE_API_URL } from "utils/AppConsts";
import KeyValueList, { dataToQueryStringList } from "components/form/KeyValueList";
import { Label1 } from "baseui/typography";
import { requestWithToken } from "services/Request";
import { Pagination } from "baseui/pagination";
import { Select } from 'baseui/select';
import {Modal, ModalHeader, ModalBody, ROLE} from 'baseui/modal';
import { Textarea, SIZE } from "baseui/textarea";

const SearchFilters = ({ setData }) => {
  const [filterRadius, setFilterRadius] = useState({ postalcode: 95122, miles: 100 });
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  }

  const mutateKey = (mutateFunc, key, value) => {
    mutateFunc(old_data => {
      let new_data = { ...old_data };
      new_data[key] = value;

      return new_data;
    });
  }

  useEffect(() => {
    setData({ data: { filterRadius } });
  }, [setData, filterRadius]);

  return (
    <React.Fragment>
      <Label1>filterRadius</Label1>
      <FormControl
        label={"Postal Code"}
      >
        <Input
          value={filterRadius["postalcode"]}
          onChange={(e) => mutateKey(setFilterRadius, "postalcode", e.target.value)}
        />
      </FormControl>
      <FormControl
        label={"Miles Radius"}
      >
        <Input
          value={filterRadius["miles"]}
          onChange={(e) => mutateKey(setFilterRadius, "miles", e.target.value)}
        />
      </FormControl>
      <Button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        JSON Body
      </Button>
      <Modal
        isOpen={open}
        onClose={close}
        role={ROLE.dialog}
      >
        <ModalHeader>JSON Body</ModalHeader>
        <ModalBody>
          <Textarea 
            value={JSON.stringify({ data: { filterRadius } }, null, 2)}
            size={SIZE.compact}
            overrides={{
              Input: {
                style: {
                  minHeight: "200px",
                  resize: "vertical"
                }
              }
            }}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

// baseweb select note
// options = [{ animal: ... }, { animal: ... }]
// value = [{ animal: ... }]
// to access endpoint value[0].animal
const AnimalSearchForm = ({ animals = ["dogs"], onResponse = () => { } }) => {
  const [endpoint, setEndpoint] = useState([{ animal: animals[0] }]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState([{ id: "1", limit: "10" }]);
  const [body, setBody] = useState();
  const [response, setResponse] = useState(undefined);

  const onSubmit = (e = { preventDefault: () => { } }, page) => {
    e.preventDefault();
    let qs_params = { page, ...dataToQueryStringList(params) };
    setLoading(true);
    requestWithToken("POST", `${RESCUE_API_URL}public/animals/search/available/${endpoint[0].animal}`, { params: qs_params, data: body })
      .then(res => {
        setResponse(res.data);
        onResponse(res.data);
      })
      .catch(error => {
        setResponse(undefined);
        onResponse(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <FormControl
        label={() => "Endpoint"}
      >
        <div style={{ display: "flex", alignItems: "center", }}>
          <div
            style={{
              width: "50%",
              overflowWrap: "break-word"
            }}
          >
            {RESCUE_API_URL}
            {"public/animals/search/available/"}
          </div>
          <Select
            required
            options={animals.map(item => ({ animal: item }))}
            labelKey="animal"
            valueKey="animal"
            value={endpoint}
            onChange={({ value }) => setEndpoint(value)}
          />
        </div>
      </FormControl>
      <FormControl>
        <Accordion
          renderAll
        >
          <Panel title="Query Strings">
            <KeyValueList data={params} setData={setParams} />
          </Panel>
          <Panel title="Search Filters">
            <SearchFilters setData={setBody} />
          </Panel>
        </Accordion>
      </FormControl>
      <FormControl>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <Button type={"submit"} disabled={loading}>
            Submit
          </Button>
          {
            response &&
            <Pagination
              currentPage={response.meta.pageReturned}
              numPages={response.meta.pages}
              onPageChange={({ nextPage }) => {
                onSubmit(undefined, nextPage);
              }}
              overrides={{
                NextButton: {
                  props: {
                    type: "button",
                    disabled: loading || response.meta.pageReturned === response.meta.pages,
                  }
                },
                PrevButton: {
                  props: {
                    type: "button",
                    disabled: loading || response.meta.pageReturned === 1,
                  }
                },
                Select: {
                  props: {
                    disabled: loading
                  }
                }
              }}
            />
          }
        </div>
      </FormControl>
    </form>
  );
};

export default AnimalSearchForm;
