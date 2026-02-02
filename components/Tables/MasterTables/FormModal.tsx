import { useState } from "react";

type Props = {
  data: any;
  type?:string;
  onClose: () => void;
  onSave: (data: any) => void;
};

export default function FormModal({ type, data, onClose, onSave }: Props) {
  const [formData, setFormData] = useState(data);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-lg font-semibold mb-4">{type?.toUpperCase()}</h2>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) =>
            key === "deleted" ? null : (
              <div key={key}>
                <label className="text-sm text-gray-600 capitalize">
                  {key}
                </label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={formData[key] ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              </div>
            )
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-1 rounded border"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 rounded bg-blue-600 text-white"
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
