export default function ImageUploader({ onChange }) {
  return (
    <label className="block w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
      <span className="text-sm text-slate-500">Upload cake images</span>
      <input
        type="file"
        className="sr-only"
        accept="image/*"
        multiple
        onChange={onChange}
      />
    </label>
  );
}
