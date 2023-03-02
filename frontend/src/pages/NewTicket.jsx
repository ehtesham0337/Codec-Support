import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { createTicket, reset } from "../features/tickets/ticketSlice";

const NewTicket = () => {
  const { user } = useSelector((state) => state?.auth);
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state?.ticket
  );
  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" className="btn btn-reverse btn-block" />
      <section className="heading">
        <h1>Create a Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              rows={5}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
