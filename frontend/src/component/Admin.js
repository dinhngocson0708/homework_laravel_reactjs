import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import DataTable from "react-data-table-component";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await axios.get("http://localhost:8000/api/getProduct_one").then((res) => {
      this.setState(() => ({ products: res.data }));
    });
  }

  previewImage() {
    $(document).ready(function (e) {
      $("#inputImage").change(function () {
        let reader = new FileReader();
        reader.onload = (e) => {
          $("#preview-image-before-upload").attr("src", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      });
    });
  }

  previewEditImage() {
    $(document).ready(function (e) {
      $("#editImage").change(function () {
        let reader = new FileReader();
        reader.onload = (e) => {
          $("#preview-image-before-edit").attr("src", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      });
    });
  }

  async onSubmitHandle(e) {
    e.preventDefault();

    console.log(e);
    const fd = new FormData();
    fd.append("uploadImage", this.state.fileUpload);

    if ($("#inputImage").val().split("\\")[2]) {
      await axios
        .post(`http://localhost:8000/api/upload-image`, fd)
        .then((res) => {});
    }

    await axios
      .post("http://localhost:8000/api/add-product_one", {
        name: $("#inputName").val(),
        description: $("#inputDescription").val(),
        price: $("#inputPrice").val(),
        image: $("#inputImage").val().split("\\")[2],
      })
      .then((res) => {
        $("#inputImage").val("");
        alert("Thêm thành công");
        $("#closeModalAddBtn").click();
        this.componentDidMount();
        console.log("add sản phẩm", res.data);
      })
      .catch("Thêm không thành công");
  }

  
  handleChange = (file) => {
    this.setState({ fileUpload: file[0] });
  };

 
  columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Image",
      sortable: true,
      cell: (row) => (
        <img
          data-tag="allowRowEvents"
          src={`http://localhost:8000/source/image/product_one/${row.image}`}
          alt="preview"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      wrap: true,
      compact: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      wrap: true,
      compact: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      wrap: true,
      compact: true,
    },
    {
      name: "Action",
      selector: "id",
      cell: (row) => (
        <div>
          <button
            data-tag="allowRowEvents"
            className="btn btn-sm btn-warning"
            style={{ width: "80px" }}
            onClick={() => {
              this.editProduct(row.id);
            }}
            type="button"
            data-toggle="modal"
            data-target="#modelEditProduct"
          >
            Edit
          </button>
          <button
            data-tag="allowRowEvents"
            type="button"
            className="btn btn-sm btn-danger"
            style={{ width: "80px" }}
            onClick={() => this.deleteProduct(row.id)}
          >
            Delete
          </button>
        </div>
      ),
      compact: true,
    },
  ];
  render() {
    return (
      <div>
        {/* add product */}
        <div>
          <div
            className="modal fade"
            id="modelAddProduct"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal Add Product</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    id="closeModalAddBtn"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={this.onSubmitHandle}
                    encType="multipart/form-data"
                  >
                    <div className="form-group">
                      <label htmlFor="inputName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="inputName"
                        id="inputName"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPrice">Price</label>
                      <input
                        type="number"
                        min={10000}
                        className="form-control"
                        name="inputPrice"
                        id="inputPrice"
                        placeholder="Enter price"
                        required
                      />
                    </div>
                    
                   
                    <div className="form-group">
                      <label htmlFor="inputImage">Image file</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="inputImage"
                        id="inputImage"
                        onChange={(e) => this.handleChange(e.target.files)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <img
                        id="preview-image-before-upload"
                        src="https://www.riobeauty.co.uk/images/product_image_not_found.gif"
                        alt="xem trước"
                        style={{ maxHeight: 250 }}
                      />
                      {this.previewImage()}
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputDescription">Description</label>
                      <input
                        type="text"
                        name="inputDescription"
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* show product */}
        <div className="container">
          <button
            type="button"
            data-toggle="modal"
            data-target="#modelAddProduct"
            className="btn btn-primary"
            style={{ width: 80 }}
          >
            Add
          </button>
          <DataTable
            title="Show Products"
            columns={this.columns}
            data={this.state.products}
            paginationPerPage={5}
            defaultSortField="id"
            pagination
          />
        </div>
      </div>
    );
  }
}

export default Admin;
