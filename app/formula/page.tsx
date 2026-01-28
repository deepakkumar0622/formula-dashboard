"use client";

import AgGrid from "@/components/Tables/AgGrid";
import Tabulator from "@/components/Tables/Tabulator";
import { ArrowUp, Plus, PlusCircle, Table, Table2, Upload } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [type, setType] = useState(true);

  return (
    <div>
      {/*header*/}
      <div className=" flex justify-between">
        <div>
          <p className="font-semibold text-xl">Formulas</p>
          <p className="font-medium text-gray-400 text-sm">
            Browse and manage formulas across all workspaces.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="cursor-pointer border border-gray-200 text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200">
            <Upload size={15} />
            Import
          </button>
          <button className="cursor-pointer border text-white flex gap-2  items-center bg-black px-4 py-2 rounded-lg font-medium text-base hover:bg-black/80 transition-all ease-in duration-200">
            <Plus size={15} />
            New Formula
          </button>
        </div>
      </div>
      {/* Filter tabs */}
      <div className="border border-gray-200 bg-gray-100 p-3 rounded-xl flex gap-20 my-4 w-full">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-500 text-sm">Status :</p>
          <select
            name=""
            id=""
            className="w-42 text-gray-500 border border-gray-300 h-7 px-2 rounded-sm"
          >
            <option value="">All</option>
            <option value="">Draft</option>
            <option value="">Versioned</option>
            <option value="">Exported</option>
            <option value="">Sent to Robot</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-500 text-sm">Type : </p>
          <select
            name=""
            id=""
            className="w-42 border text-gray-500 border-gray-300 h-7 px-2 rounded-sm "
          >
            <option value="">All</option>
            <option value="">Fine fragrance</option>
            <option value="">Personal care</option>
          </select>
        </div>
      </div>
      {/* table */}
      <div>
        {type ? (
          <div>
            <AgGrid />
          </div>
        ) : (
          <div>
            {" "}
            <Tabulator />{" "}
          </div>
        )}
      </div>
      {/* Buttons */}
      <div>
        <div className="flex items-center gap-4 justify-center mt-5">
          <button
            onClick={() => setType(true)}
            className={`cursor-pointer border border-gray-200 text-black flex gap-2 items-center  px-4 py-2 rounded-lg font-medium text-sm  transition-all ease-in duration-200 ${type ? "bg-black text-white border-white" : ""}`}
          >
            <Table />
            Ag-grid
          </button>
          <button
            onClick={() => setType(false)}
            className={`cursor-pointer border border-gray-200 text-black flex gap-2 items-center  px-4 py-2 rounded-lg font-medium text-sm  transition-all ease-in duration-200 ${type ? "" : "bg-black text-white border-white"}`}
          >
            <Table2 />
            Tabulator
          </button>
        </div>
      </div>
    </div>
  );
};
export default page;
