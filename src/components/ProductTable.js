import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./ProductTable.css";

const ProductTable = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProd, setFilterProd] = useState([]);

  const getProducts = async () => {
    try {
      const {
        data: { products },
      } = await axios.get("https://dummyjson.com/products");
      setProduct(products);
      setFilterProd(products);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };
  const cols = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img width={50} height={50} src={row.thumbnail} alt={row.title} />
      ),
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    const result = product.filter((p) => {
      return p.title.toLowerCase().match(search.toLowerCase());
    });
    setFilterProd(result);
  }, [search, product]);
  return (
    <DataTable
      className="dataTable"
      title="Product Table"
      columns={cols}
      data={filteredProd}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="500px"
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search"
          style={{ width: "350px", height: "50px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="left"
    />
  );
};

export default ProductTable;
