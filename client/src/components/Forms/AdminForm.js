import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ListContext } from "../../context/ListContext";
import { adminValidation } from "../FormValidation/formValidation";

const AdminForm = ({ setExpanded, setDisplay }) => {
  const [fields, setFields] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [addedFields, setAddedFields] = useState([]);

  const {
    loading: { actionLoading },
    createNewList
  } = useContext(ListContext);

  useEffect(() => {
    const handleAdd = () => {
      setAddedFields([
        "Full Name",
        ...fields.split(",").map(field => field.trim())
      ]);
    };
    if (!fields.endsWith(",")) {
      handleAdd();
    }
  }, [fields]);

  const handleCancel = () => {
    setFields("");
    setExpanded(false);
    setDisplay(true);
  };

  const validateForm = () => setError(adminValidation(title));

  const handleSubmit = event => {
    event.preventDefault();

    if (!error) {
      const nonEmptyFields = addedFields.filter(field => field !== "");
      createNewList({
        _id: Math.random() + Date.now(),
        title,
        fields: nonEmptyFields,
        members: []
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        error={Boolean(error)}
        helperText={error}
        value={title}
        onChange={e => setTitle(e.target.value)}
        size="small"
        id="title"
        name="title"
        label="Title"
        fullWidth
        autoFocus
        style={{ marginBottom: 20 }}
      />
      <TextField
        value={fields}
        onChange={e => setFields(e.target.value)}
        size="small"
        id="fields"
        name="fields"
        label="fields"
        helperText="Separate your list with comma(,)"
        fullWidth
      />
      <div style={{ marginBottom: 25 }}>
        {addedFields.map((field, index) => (
          <Chip
            key={field + index}
            label={field}
            style={{ margin: "10px 10px 0 0" }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          onClick={validateForm}
          disabled={actionLoading}
        >
          {actionLoading ? <CircularProgress size={25} /> : "Done"}
        </Button>
      </div>
    </form>
  );
};

export default AdminForm;
