export default async function FormBuilderPage({ params }) {
  const { id } = await params;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Form Builder — {id}</h1>
    </div>
  );
}
