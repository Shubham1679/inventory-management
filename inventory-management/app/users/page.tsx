"use client";

import { useGetUsersQuery } from "@/state/api";
import React from "react";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4 text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 mt-5 !text-gray-700 dark:!text-gray-300"
        sx={{
          border: "none",
          backgroundColor: "var(--datagrid-row-bg)",
          color: "var(--datagrid-cell-text)",

          "& *": {
            borderColor: "var(--datagrid-border) !important",
          },

          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader, & .MuiDataGrid-container--top, & .MuiDataGrid-container--top [role='row'], & .MuiDataGrid-filler, & .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-scrollbarFiller--header": {
            backgroundColor: "var(--datagrid-header-bg) !important",
            color: "var(--datagrid-header-text) !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            color: "var(--datagrid-header-text) !important",
            fontWeight: "600 !important",
          },

          "& .MuiDataGrid-virtualScroller, & .MuiDataGrid-virtualScrollerContent, & .MuiDataGrid-virtualScrollerRenderZone": {
            backgroundColor: "var(--datagrid-row-bg) !important",
          },

          "& .MuiDataGrid-row": {
            backgroundColor: "var(--datagrid-row-bg) !important",
          },

          "& .MuiDataGrid-row:hover, & .MuiDataGrid-row.Mui-hovered": {
            backgroundColor: "var(--datagrid-row-hover) !important",
          },

          "& .MuiDataGrid-cell, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            color: "var(--datagrid-cell-text) !important",
            backgroundColor: "var(--datagrid-row-bg) !important",
            outline: "none !important",
          },

          "& .MuiDataGrid-footerContainer, & .MuiDataGrid-footerContainer *": {
            backgroundColor: "var(--datagrid-header-bg) !important",
            color: "var(--datagrid-header-text) !important",
          },

          "& .MuiCheckbox-root, & .MuiCheckbox-root svg": {
            color: "var(--datagrid-checkbox) !important",
          },

          "& .MuiDataGrid-columnSeparator svg": {
            color: "var(--datagrid-border) !important",
          },
        }}
      />
    </div>
  );
};

export default Users;