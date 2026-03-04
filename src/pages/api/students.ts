export async function GET() {
  const url =
    "https://docs.google.com/spreadsheets/d/1UPyxNTTF5R7wy3kV7WEdhTBvVFQ35gMxi10eIiHvuIY/edit?usp=sharing";

  const response = await fetch(url);
  const text = await response.text();

  const json = JSON.parse(
    text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
  );

  const headers = json.table.cols.map((c: any) => c.label);

  const col = (name: string) => headers.indexOf(name);

  const students = json.table.rows.map((row: any, index: number) => {
    const cells = row.c;

    return {
      id: cells[col("Matricula")]?.v ?? "",
      correoInstitucional: cells[col("Email")]?.v ?? "",
      nombreCompleto: `${cells[col("Nombre")]?.v ?? ""} ${cells[col("Apellido")]?.v ?? ""}`.trim(),
      semestre: "",
      grupoDivision: "",
      campusSede: "",
      correoPersonal: "",
      telefono: "",
      carreraInteres1: cells[col("Carrera 1")]?.v ?? "",
      carreraInteres2: cells[col("Carrera 2")]?.v ?? "",
      carreraInteres3: cells[col("Carrera 3")]?.v ?? "",
      institucionInteres1: cells[col("Institucion 1")]?.v ?? "",
      institucionInteres2: cells[col("Institucion 2")]?.v ?? "",
      institucionInteres3: cells[col("Institucion 3")]?.v ?? "",
      probabilidadElegirTec: cells[col("probabilidadElegirTec")]?.v ?? "",
    };
  });

  return Response.json(students);
}