import React, { useContext, useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MemberForm from "../components/Forms/MemberForm";
import { fetchList } from "../context/api/ListsAPI";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

const socket =
  process.env.NODE_ENV === "production"
    ? io(window.location.host)
    : io("localhost:5000");

const InputPage = () => {
  document.title = "List Makerr - Add to list";

  const params = useParams();
  const [list, setList] = useState({});
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState({
    firstname: "",
    lastname: ""
  });

  const {
    state: { user }
  } = useContext(UserContext);

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      "Full Name": `${fullname.firstname} ${fullname.lastname}`
    }));
  }, [fullname]);

  useEffect(() => {
    (async () => {
      try {
        const { list } = await fetchList(params.id);
        setList(list);
        list.fields.forEach(field => {
          const createdFieldName = field;
          setForm(prevForm => ({ ...prevForm, [createdFieldName]: "" }));

          user.fullName &&
            setFullname({
              firstname: user.fullName.split(" ")[0],
              lastname: user.fullName.split(" ")[1]
            });
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id, user.fullName]);

  useEffect(() => {
    socket.on("statusChanged", () => {
      window.location.reload();
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  if (loading)
    return (
      <Backdrop open={loading} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <MemberForm
      list={list}
      socket={socket}
      fullname={fullname}
      setFullname={setFullname}
      form={form}
      setForm={setForm}
    />
  );
};
export default InputPage;
