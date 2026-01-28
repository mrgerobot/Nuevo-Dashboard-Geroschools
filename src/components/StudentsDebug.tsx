import { useStudents } from "@/contexts/StudentsProvider";

export function StudentsDebug() {
  const { students, loading, error } = useStudents();

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      <div><b>Students debug</b></div>
      <div>loading: {String(loading)}</div>
      <div>error: {error ?? "none"}</div>
      <div>count: {students?.length ?? 0}</div>
      <pre style={{ marginTop: 8, maxHeight: 220, overflow: "auto" }}>
        {JSON.stringify(students?.[0] ?? null, null, 2)}
      </pre>
    </div>
  );
}
