import React, { useState, useEffect } from "react";
import "./CustomersPage.css";

// Setting up our states
function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [curPage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    store_id: 1,
    address_id: 1,
    active: true
  });
  const perPage = 20;

useEffect(() => {
  fetch(`http://127.0.0.1:5000/customersTable?page=${curPage}`)
    .then(res => res.json())
    .then(data => {
      setCustomers(data.customers);
      setTotal(data.total);
    })
    .catch(err => console.error(err));
}, [curPage]);

  const maxPage = Math.ceil(total / perPage);

// Use preventDeafult to stop refreshing, calls refreshTable to show updated table and puts in new customer information
  const addCustomer = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.error) });
      } return res.json();
    })
    .then(() => {
      alert("Customer Added!")
      setNewCustomer({ first_name: "", last_name: "", email: "", store_id: 1, address_id: 1, active: true });
      modalClose()
      refreshTable();
    })
    .catch(err => console.error(err));
  };

// Function to delete customer 
  const deleteCustomer = (id) => {
    fetch(`http://127.0.0.1:5000/customers/${id}`, { method: "DELETE" })
      .then(() => refreshTable())
      .catch(err => console.error(err));
  };

  // Refresh table function so everytime a customer is added or deleted, we can see it refresh right away and see it updated
  const refreshTable = () => {
    fetch(`http://127.0.0.1:5000/customersTable?page=${curPage}`)
      .then(res => res.json())
      .then(data => {
        setCustomers(data.customers);
        setTotal(data.total);
      })
      .catch(err => console.error(err));
  };

  const modalClose = () => {
    setShowModal(false);
    setNewCustomer({
      first_name: "",
      last_name: "",
      email: "",
      store_id: 1,
      address_id: 1,
      active: true
    });
  };

  return (
    <div className="customersPage">
      <h1>Customers</h1>
      <div className = "addButton">
        <button onClick={() => setShowModal(true)}>Add Customer</button>
      </div>

      {showModal && (
        <div className="modalOutside" onClick={modalClose}>
          <div 
            className="modalContent"
            onClick={inside => inside.stopPropagation()}
          >
            <h2>Add Customer</h2>
            <form onSubmit={addCustomer}>
              <input
                type="text"
                placeholder="First Name"
                value={newCustomer.first_name}
                onChange={e => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newCustomer.last_name}
                onChange={e => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
              <div className="modalButtons">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="customersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Store ID</th>
            <th>Address ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Created</th>
            <th>Last Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.customer_id} className="filmRowClicked">
              <td>{c.customer_id}</td>
              <td>{c.store_id || 1}</td>
              <td>{c.address_id || 1}</td>
              <td>{c.first_name}</td>
              <td>{c.last_name}</td>
              <td>{c.email}</td>
              <td>{c.active ? "Yes" : "No"}</td>
              <td>{c.create_date}</td>
              <td>{c.last_update}</td>
              <td>
                <div className= "xDelete">
                  <button onClick={() => deleteCustomer(c.customer_id)}>X</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Area, we want pages to be gray when they cannot go back/forward */}
      <div className="pagination">
        <button onClick={() => setPage(1)} disabled={curPage === 1}>First</button>
        <button onClick={() => setPage(curPage - 1)} disabled={curPage === 1}>Previous</button>
        <span> Page {curPage} of {maxPage} </span>
        <button onClick={() => setPage(curPage + 1)} disabled={curPage === maxPage}>Next</button>
        <button onClick={() => setPage(maxPage)} disabled={curPage === maxPage}>Last</button>
      </div>
    </div>
  );
}

export default CustomerPage;
