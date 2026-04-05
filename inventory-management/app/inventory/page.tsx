"use client";

import { useGetProductsQuery } from "@/state/api";
import React from "react";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="py-4 text-gray-700 dark:text-gray-300">Loading...</div>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 mt-5 !text-gray-700 dark:!text-gray-300"
        sx={{
          border: "none",
          backgroundColor: "var(--datagrid-row-bg)",
          color: "var(--datagrid-cell-text)",

          // Force ALL children to inherit bg
          "& *": {
            borderColor: "var(--datagrid-border) !important",
          },

          // Header — every possible selector
          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader, & .MuiDataGrid-container--top, & .MuiDataGrid-container--top [role='row'], & .MuiDataGrid-filler, & .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-scrollbarFiller--header":
            {
              backgroundColor: "var(--datagrid-header-bg) !important",
              color: "var(--datagrid-header-text) !important",
            },

          "& .MuiDataGrid-columnHeaderTitle": {
            color: "var(--datagrid-header-text) !important",
            fontWeight: "600 !important",
          },

          // Rows — every possible selector
          "& .MuiDataGrid-virtualScroller, & .MuiDataGrid-virtualScrollerContent, & .MuiDataGrid-virtualScrollerRenderZone":
            {
              backgroundColor: "var(--datagrid-row-bg) !important",
            },

          "& .MuiDataGrid-row": {
            backgroundColor: "var(--datagrid-row-bg) !important",
          },

          "& .MuiDataGrid-row:hover, & .MuiDataGrid-row.Mui-hovered": {
            backgroundColor: "var(--datagrid-row-hover) !important",
          },

          // Cells
          "& .MuiDataGrid-cell, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within":
            {
              color: "var(--datagrid-cell-text) !important",
              backgroundColor: "var(--datagrid-row-bg) !important",
              outline: "none !important",
            },

          // Footer
          "& .MuiDataGrid-footerContainer, & .MuiDataGrid-footerContainer *": {
            backgroundColor: "var(--datagrid-header-bg) !important",
            color: "var(--datagrid-header-text) !important",
          },

          // Checkbox
          "& .MuiCheckbox-root, & .MuiCheckbox-root svg": {
            color: "var(--datagrid-checkbox) !important",
          },

          // Separator
          "& .MuiDataGrid-columnSeparator svg": {
            color: "var(--datagrid-border) !important",
          },
        }}
      />
    </div>
  );
};

export default Inventory;
