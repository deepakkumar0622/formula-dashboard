import { Archive, Eye, Pencil } from "lucide-react";

type Props = {
  data: any;
  gridApi: any;
  onEdit: (row: any) => void;
};

export default function ActionRenderer(props: any) {
    const { data, api } = props;
  const softDelete = () => {
    data.deleted = !data.deleted;
    api.applyTransaction({ update: [data] });
  };
  const onEdit = (row: any) => {
    props.onEdit(row);
    console.log("Editing row:", row);
  };
  const hardDelete = () => {
    if (confirm("Archive Item?")) {
      api.applyTransaction({ remove: [data] });
    }
  };

  return (
    <div className="flex gap-2">
      <Pencil className="h-4 w-4 cursor-pointer" onClick={() => onEdit({ ...data })} />
      <Eye
        className="h-4 w-4 cursor-pointer"
        onClick={softDelete}
      />
      <Archive
        className="h-4 w-4 cursor-pointer"
        onClick={hardDelete}
      />
    </div>
  );
}
